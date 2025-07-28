import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { GiCheckMark } from "react-icons/gi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useGetSubsQuery } from "@/redux/services/subApiSlice";
import { formatCurrency } from "@/utils";
import fetchToken from "@/lib/auth";
import { paystackPay } from "@/app/actions/action";
import Image from "next/image";
import mockupImg from "@/public/mockup.png";

const SubscriptionModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);
  const [months, setMonths] = useState("");
  const { data } = useGetSubsQuery(null);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handlePayment = async (e: any): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    const token = await fetchToken();
    try {
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          no_of_months: parseInt(months),
        }),
      };
      const paystackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/farmer/upgrade-plan`,
        options
      );
      const data = await paystackResponse.json();

      const paystackRes = await paystackPay({
        amount: data?.data?.paystack_data?.amount,
        email: data?.data?.paystack_data?.email,
        reference: data?.data?.paystack_data?.reference,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_NEXT_API}/account/confirmpayment`,
      });
      // setSubmitting(false);

      if (paystackRes.status === true) {
        window.location.href = paystackRes.data.authorization_url; //extract the redirection and user it for redirecting the donor to the unique page generated for them to make payment
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all w-11/12 lg:w-8/12">
                <div className="flex items-center justify-center border border-gray-600 rounded-full absolute top-4 right-4 lg:h-8 lg:w-8 h-7 w-7 cursor-pointer z-50">
                  <IoClose
                    onClick={() => setOpen(false)}
                    className=" lg:h-5 lg:w-5 h-4 w-4 text-gray-600"
                  />
                </div>
                <div className="flex">
                  <div className="left-side lg:w-8/12 bg-gray-200 rounded-lg px-10 pt-10 pb-8">
                    <h2 className="lg:text-2xl text-xl font-semibold text-gray-700">
                      Try Aquatrack Pro for free
                    </h2>
                    <div className="mt-8">
                      <div className="flex items-center space-x-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          Free 7 days trial, cancle any time
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          We`ll remind you before your trial ends
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handlePayment} className="form mt-8">
                      <RadioGroup
                        defaultValue="yearly"
                        className="space-y-4"
                        onValueChange={(value) => setMonths(value)}>
                        <div className="flex space-x-2">
                          <RadioGroupItem
                            value={
                              data?.data?.subscription?.attributes?.duration
                            }
                            id="r1"
                            className="h-6 w-6"
                          />

                          <label htmlFor="r1">
                            <div className="flex items-center space-x-3">
                              <p className="font-semibold text-base">Yearly</p>
                              {data?.data?.subscription?.attributes
                                ?.duration === 12 && (
                                <p className="bg-red-600 px-2 py-1 text-white text-xs rounded-full">
                                  Best value - Save ₦
                                  {formatCurrency(
                                    data?.data?.subscription?.attributes
                                      ?.best_value
                                  )}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-4 mt-2">
                              <p className="text-sm ">
                                ₦
                                {formatCurrency(
                                  data?.data?.subscription?.attributes
                                    ?.yearly_price
                                )}{" "}
                              </p>
                              <p className="text-sm ">
                                ( ₦
                                {formatCurrency(
                                  data?.data?.subscription?.attributes
                                    ?.yearly_price /
                                    data?.data?.subscription?.attributes
                                      ?.duration
                                )}{" "}
                                / monthly)
                              </p>
                            </div>
                          </label>
                        </div>

                        <div className="flex space-x-2">
                          <RadioGroupItem
                            value="1"
                            id="r2"
                            className="h-6 w-6"
                          />

                          <label htmlFor="r2">
                            <div className="flex items-center space-x-3">
                              <p className="font-semibold text-base">Monthly</p>
                            </div>
                            <div className="flex space-x-4 mt-2">
                              <p className="text-sm ">
                                ₦
                                {formatCurrency(
                                  data?.data?.subscription?.attributes
                                    ?.monthly_price
                                )}{" "}
                              </p>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>

                      <Button
                        disabled={months ? false : true}
                        className="w-full bg-[--primary] hover:bg-[--primary] py-6 font-semibold mt-8">
                        {submitting ? "Submitting..." : "Next"}
                      </Button>
                    </form>
                    <div className="mt-10">
                      <p className="text-xs text-gray-500">
                        By continuing, you agree to the{" "}
                        <Link href="/" className="underline">
                          Terms of Use{" "}
                        </Link>
                        applicable to the Aquatrack Pro and confirm you have
                        read our{" "}
                        <Link href="/" className="underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="right-side w-full text-center relative hidden lg:flex lg:flex-col">
                    <div className="h-[20vh]">
                      <h3 className="pt-12 mb-20 text-2xl">Go Pro</h3>
                    </div>
                    <div className="h-[60vh] w-full bg-canva absolute bottom-0">
                      <div className="mockup mx-auto text-center">
                        <Image
                          src={mockupImg}
                          alt="mockup image"
                          width={350}
                          height={400}
                          className="mx-auto mt-8 lg:flex hidden"
                        />
                        <Image
                          src={mockupImg}
                          alt="mockup image"
                          width={350}
                          height={300}
                          className="mx-auto mt-0 lg:hidden block"
                        />
                        <p className="mt-8 text-white lg:w-8/12 mx-auto">
                          Unlock more features and a better user experience with
                          AquaTrack Pro
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubscriptionModal;
