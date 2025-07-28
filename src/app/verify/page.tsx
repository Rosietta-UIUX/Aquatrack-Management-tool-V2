"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    code: "",
  });

  useEffect(() => {
    // Check if there's an email in local storage
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      // If there is, set the email and mark as authenticated
      setEmail(storedEmail);
    }
  }, []);

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      email: "",
      code: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!code) {
      newErrors.code = "Code is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/email-verification/verify`,
          { email, code }
        );
        toast.success("Verified ✅");
        push("/onboarding");
      } catch (error) {
        toast.error("Invalid Credentials");
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`/api/auth/email-verification/resend`, {
        email,
      });
      toast.success("Check your email for new otp");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <section className="h-screen flex items-center justify-center ">
        <div className="form-container lg:w-4/12 w-10/12 mx-auto">
          <div className="lg:w-8/12 w-10/12 mx-auto text-center">
            <h1 className="font-bold text-xl lg:text-2xl text-center mb-8">
              Verify your email
            </h1>
            <p className="text-gray-500 text-md mt-2 ">
              Verification code sent to this email{" "}
              <span className="font-semibold">{`*****${email.slice(7)}`}</span>
            </p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="form-control mt-8">
              <InputOTP
                className="mx-auto flex items-center justify-center"
                maxLength={4}
                value={code}
                name="code"
                id="code"
                onChange={(value) => setCode(value)}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                render={({ slots }) => (
                  <InputOTPGroup className="space-x-4">
                    {slots.map((slot, index) => (
                      <InputOTPSlot
                        key={index}
                        {...slot}
                        className="lg:h-16 lg:w-16 w-14 h-12 bg-gray-200 rounded-lg"
                      />
                    ))}{" "}
                  </InputOTPGroup>
                )}
              />
              {errors?.code && (
                <p className="text-red-500 text-xs text-center mt-1">
                  {errors?.code}
                </p>
              )}
            </div>
            <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
              {loading ? "Verifying..." : "Verify email"}
            </Button>
            <p className="text-center mt-8">
              Didn&apos;t get the code yet?{" "}
              <Button
                onClick={handleResend}
                variant="ghost"
                className="text-[--primary] ">
                Resend code
              </Button>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyForm;
