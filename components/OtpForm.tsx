"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const OtpForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ value: "" });

  useEffect(() => {
    // Check if window is defined (i.e., if we're in the browser)
    if (typeof window !== "undefined") {
      // Access localStorage safely
      const storedData = localStorage.getItem("email");
      if (storedData) {
        // If there is stored data, update the form state
        setEmail(JSON.parse(storedData));
      }
    }
  }, []);

  const handleVerification = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = { value: "" };

    if (!value) {
      newErrors.value = "Otp is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        setLoading(true);
        const res = await axios.post(`/api/verify`, {
          code: value,
        });

        if (res?.status == 200) {
          setLoading(false);
          toast.success("Verified successfully");
          push("/forgot-password/reset");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResend = () => {};

  return (
    <section className=" lg:h-[86vh] h-[90vh] flex items-center justify-center ">
      <div className="form-container lg:w-3/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center">
          Verification
        </h1>
        <p className="mt-3 text-gray-500 text-sm text-center">
          Kindly enter the verification code sent to{" "}
          <span className="font-bold text">{email}</span>{" "}
        </p>
        <form onSubmit={handleVerification}>
          <div className="form-control mt-8">
            <InputOTP
              className="mx-auto flex items-center justify-center"
              maxLength={4}
              value={value}
              name="otp"
              id="otp"
              onChange={(value) => setValue(value)}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              render={({ slots }) => (
                <InputOTPGroup className="space-x-4">
                  {slots.map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className="lg:h-16 lg:w-16 w-12 h-12 bg-gray-200 rounded-lg"
                    />
                  ))}{" "}
                </InputOTPGroup>
              )}
            />
            {errors?.value && (
              <p className="text-red-500 text-xs text-center mt-1">
                {errors?.value}
              </p>
            )}
          </div>
          <Button
            disabled={value?.length <= 3 ? true : false}
            className={`
               mt-10 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white
            ${value?.length <= 3 ? "bg-gray-300 text-gray-800" : ""} `}>
            {loading ? "Verifing..." : "Verify and continue"}
          </Button>
          {/* <div className="text-center mt-8">
            <p
              onClick={handleResend}
              className="text-[--primary] cursor-pointer">
              Resend Code
            </p>
          </div> */}
        </form>
      </div>
    </section>
  );
};

export default OtpForm;
