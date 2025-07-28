"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import SuccessModal from "./SuccessModal";
import toast from "react-hot-toast";
import axios from "axios";

const VerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleVerification = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = { email: ""};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const res = await axios.post(`/api/forget-password`, formData);
        
        if (res?.status == 200) {
          setLoading(false);
          setOpen(true);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error("Invalid Credentials");
        setLoading(false);
      }
    }
  };

  return (
    <section className=" lg:h-[86vh] h-[90vh] flex items-center justify-center ">
      <SuccessModal
        title="Verification Sent"
        text="An email with verification code has been sent to"
        email={formData.email}
        link="/forgot-password/otp"
        btnText="Continue"
        open={open}
        setOpen={setOpen}
      />
      <div className="form-container lg:w-3/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center">
          Forgot your password?
        </h1>
        <p className="text-center mt-3 text-gray-500 text-sm">
          Kindly enter your registered email and we will send you a verification
          code to reset your password.{" "}
        </p>
        <form onSubmit={handleVerification}>
          <div className="form-control mt-8">
            <label htmlFor="email">Email address</label>
            <Input
              type="email"
              placeholder="Enter email address"
              className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <Button className=" mt-10 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Sending..." : "Send verification code"}
          </Button>
          <div className="text-center mt-8">
            <Link className="text-[--primary] font-semibold" href="/signup">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerificationForm;
