"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(true);
  const [hide, setHide] = useState(true);
  const [hide1, setHide1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password != formData.password_confirmation) {
      newErrors.password_confirmation = "Password did not match";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const res = await axios.post(`/api/register`, formData);
        if (window != undefined) {
          localStorage.setItem("userEmail", formData?.email);
        }

        if (res?.status == 200) {
          push("/verify");
          toast.success(res?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="lg:h-screen h-auto lg:py-0 py-10 flex items-center justify-center pt-10">
      <div className="form-container lg:w-4/12 w-10/12 mx-auto lg:mt-10 mt-10">
        <h1 className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Create an account
        </h1>
        <form onSubmit={handleSignup}>
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
          <div className="form-control mt-4">
            <label htmlFor="email" className="text-sm">
              Email address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-[50px] mt-1 px-6 bg-transparent outline-none border-gray-500"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="form-control mt-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="relative flex items-center">
              <Input
                type={hide ? "password" : "text"}
                placeholder="Enter password"
                className="h-[50px] mt-1 px-6 bg-transparent outline-none"
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
          <div className="form-control mt-4">
            <label htmlFor="password_confirmation" className="text-sm">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Input
                type={hide1 ? "password" : "text"}
                placeholder="Re-enter password"
                className="h-[50px] mt-1 px-6 bg-transparent outline-none"
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
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          <div className=" mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms2"
                required
                className="h-5 w-5 data-[state=checked]:bg-[--primary]"
              />
              <label
                htmlFor="terms2"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm ">
                I agree with the{" "}
                <Link href="/terms" className="text-[--primary] text-sm ">
                  Terms and conditions
                </Link>
              </label>
            </div>
          </div>
          <Button className=" mt-4 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Loading..." : "Create my account"}
          </Button>
          <p className="text-center mt-8">
            Already have an account?{" "}
            <Link className="text-[--primary] " href="/">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
