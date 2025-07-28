"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoCameraOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useEditProfileMutation } from "@/redux/services/userApiSlice";
import fetchToken from "@/lib/auth";

const SettingsForm = ({ refetch, data }: any) => {
  const [editprofile] = useEditProfileMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [IsSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<any>({
    first_name: data?.attributes?.first_name || "",
    last_name: data?.attributes?.last_name || "",
    email: data?.attributes?.email || "",
    phone_number: data?.attributes?.phone_number || "",
  });

  
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewSrc("");
    }
  };

  const handleSaveImg = async () => {
    setIsSaving(true);
    try {
      if (selectedFile) {
        const formdata = new FormData();
        formdata.append("profile_picture", selectedFile);
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          Accept: "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/update-profile`,
          {
            method: "POST",
            headers,
            body: formdata,
          }
        );
        setIsSaving(false);
        const resdata = await res.json();
        setSelectedFile(null);
        refetch();
      }
    } catch (error) {
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    const formdata = {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      phone_number: formData?.phone_number,
      email: formData?.email,
    };

    try {
      await editprofile({ formdata }).unwrap();
      toast.success("Changes Saved ✔️");
      setFormData("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  return (
    <div className="lg:w-6/12 w-11/12 mx-auto mb-20">
      <div className="text-center">
        <div className="flex items-center justify-center mt-10 ">
          <div className="lg:w-30 lg:h-30 w-28 h-28 relative">
            <Avatar className="p-0 m-0 lg:w-30 lg:h-30 w-28 h-28 border-2 border-[#02579E]">
              <AvatarImage
                src={previewSrc ? previewSrc : data?.attributes?.profile_photo}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 left-0 h-full w-full rounded-full  flex items-center justify-center bg-gray-600/50">
              <label
                htmlFor="fileInput"
                className="flex justify-center items-center h-20 w-20 rounded-full p-2 cursor-pointer">
                <FaCamera className="lg:w-8 lg:h-8 h-10 w-10 text-white" />
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
        {selectedFile && (
          <button
            onClick={handleSaveImg}
            className="mt-2 bg-[--primary] text-white px-4 py-2 rounded-md text-sm">
            {isSaving ? "Saving..." : "Save image"}
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 my-8">
        <div className="grid lg:grid-cols-2 lg:gap-x-6 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="firstname"
              className=" text-gray-500 font-normal mb-3">
              First name
            </Label>
            <Input
              type="text"
              name="first_name"
              value={formData?.first_name}
              onChange={handleInputChange}
              placeholder="John"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="lastname"
              className=" text-gray-500 font-normal mb-3">
              Last name
            </Label>
            <Input
              type="text"
              name="last_name"
              value={formData?.last_name}
              onChange={handleInputChange}
              placeholder="Deo"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-1 lg:gap-x-4 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Phone number
            </Label>
            <Input
              type="text"
              name="phone_number"
              value={formData?.phone_number}
              onChange={handleInputChange}
              placeholder="+234 xxx xxx xxxx"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-1 lg:gap-x-4 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Email Address
            </Label>
            <Input
              disabled
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="johndeo@gmail.com"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-6">
          <Button className="mt-6 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] px-8 h-[53px] text-white">
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
