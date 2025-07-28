import { verifyPaystackTransaction } from "@/app/actions/action";
import Image from "next/image";
import React from "react";
import paymentImg from "@/public/successful-lfa4DD13LW.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  searchParams?: {
    trxref: string;
    reference: string;
  };
}

const ConfirmPayment: React.FC<PageProps> = async ({ searchParams }) => {
  try {
    if (searchParams) {
      if (searchParams.reference && searchParams.trxref) {
        //please retry payment verification multiple times to avoid errors associated with payment confirmation
        const paymentStatus = await verifyPaystackTransaction({
          reference: searchParams.reference,
        });

        if (paymentStatus) {
          if (
            paymentStatus.status === true &&
            paymentStatus.data.status === "success"
          ) {
            // console.log(paymentStatus);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 rounded-lg text-center">
          <Image
            className="w-full h-auto mx-auto rounded lg:flex hidden"
            src={paymentImg}
            alt="Success Image"
            width="300"
          />
          <Image
            className="w-full h-auto mx-auto rounded flex lg:hidden"
            src={paymentImg}
            alt="Success Image"
            width="300"
            height="200"
          />
          <h2 className="lg:text-4xl text-2xl font-semibold text-[--primary] mt-8 mb-4">
            Successful
          </h2>
          <p className="text-gray-600 mt-4 mb-8">
            Your payment was successfully processed
          </p>
          <Link href="/account">
            <Button
              variant="link"
              className="bg-[--primary] text-white lg:py-6 lg:px-10 px-6">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmPayment;
