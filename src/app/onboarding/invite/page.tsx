"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import fetchToken from "@/lib/auth";

const ProfileOnboardingForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "no_of_farms_owned" || name === "capital"
        ? parseInt(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      first_name: "",
      last_name: "",
    };

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          "Content-Type": "application/json",
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/onboarding/team-member`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(formData),
          }
        );

        const resdata = await res.json();
        if (resdata?.status == true || resdata?.status == 200) {
          if (resdata?.data?.attributes?.team_member_onboarded) {
            push("/account");
            toast.success("Account Verified");
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <section className=" h-screen flex items-center justify-center lg:py-20 py-10">
      <div className="form-container lg:w-4/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
          Complete your profile
        </h1>
        <form onSubmit={handleSignup} className="mt-10">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-6">
            <div className="form-control mt-4">
              <label htmlFor="fullname" className="text-sm">
                First name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                className="h-[50px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs">{errors.first_name}</p>
              )}
            </div>
            <div className="form-control mt-4">
              <label htmlFor="lastname" className="text-sm">
                Last name
              </label>
              <Input
                type="text"
                placeholder="Enter your last name"
                className="h-[50px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs">{errors.last_name}</p>
              )}
            </div>
          </div>
          <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Loading..." : "Complete my profile"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfileOnboardingForm;
