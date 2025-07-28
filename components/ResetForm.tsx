"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import SuccessModal from "./SuccessModal";
import toast from "react-hot-toast";
import fetchToken from "@/lib/auth";

const ResetForm = () => {
  // const { push } = useRouter();
  const [hide, setHide] = useState(true);
  const [hide1, setHide1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password != formData.password_confirmation) {
      newErrors.confirmPassword = "Password did not match";
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
          `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(formData),
          }
        );

        const resdata = await res.json();
        if (resdata?.status == true || resdata?.status == 200) {
          setOpen(true);
          toast.success(resdata?.message);
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
    <section className=" h-auto flex items-center justify-center lg:py-20 py-10">
      <SuccessModal
        text="Password Reset successfully"
        link="/"
        btnText="Log In"
        open={open}
        setOpen={setOpen}
      />
      <div className="form-container lg:w-4/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
          Create new password
        </h1>
        <form onSubmit={handleResetPassword}>
          <div className="form-control mt-6">
            <label htmlFor="password">New Password</label>
            <div className="relative flex items-center">
              <Input
                type={hide ? "password" : "text"}
                placeholder="Enter new password"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="eyes absolute right-6 cursor-pointer">
                {hide ? (
                  <FaEyeSlash
                    onClick={() => setHide(!hide)}
                    className="h-6 w-6 text-gray-400"
                  />
                ) : (
                  <FaEye
                    onClick={() => setHide(!hide)}
                    className="h-6 w-6 text-gray-400"
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative flex items-center">
              <Input
                type={hide1 ? "password" : "text"}
                placeholder="Re-enter password"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
              />
              <div className="eyes absolute right-6 cursor-pointer">
                {hide1 ? (
                  <FaEyeSlash
                    onClick={() => setHide1(!hide1)}
                    className="h-6 w-6 text-gray-400"
                  />
                ) : (
                  <FaEye
                    onClick={() => setHide1(!hide1)}
                    className="h-6 w-6 text-gray-400"
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Reseting..." : "Reset my password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetForm;
