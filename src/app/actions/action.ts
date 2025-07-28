"use server";
import fetchToken from "@/lib/auth";

interface PaystackParams {
  amount: number;
  currency: string;
  email: string;
  callback_url: string;
  reference: string;
}

interface VerifyParams {
  reference: string;
}

const secretKey: string = process.env.PAYSTACK_TEST_SECRET_KEY as string;
const url: string = process.env.PAYSTACK_PAYMENT_URL as string;
const apiurl: string = process.env.NEXT_PUBLIC_API_URL as string;

const getCommonHeaders = () => ({
  Authorization: `Bearer ${secretKey}`,
  "Content-Type": "application/json",
});

//paystack function for initiating payment and generating redirection url

export const paystackPay = async ({
  amount,
  currency,
  email,
  callback_url,
  reference,
}: PaystackParams) => {
  const options = {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({
      amount: `${amount * 100}`,
      currency: currency,
      email: email,
      callback_url: callback_url,
      reference: reference,
    }),
  };

  try {
    const response = await fetch(`${url}/transaction/initialize`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

//paystack function for confirming payment

export const verifyPaystackTransaction = async ({
  reference,
}: VerifyParams) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };


  try {
    
    const response = await fetch(
      `${apiurl}/verify-payment?reference=${reference}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
