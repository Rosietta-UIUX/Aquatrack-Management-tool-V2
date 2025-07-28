import { useState } from "react";
import AddFarmModal from "./AddFarmModal";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import { Button } from "@/components/ui/button";

const CreateFarmState = ({ vheight }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <section
      className={`h-[${
        vheight ? vheight : `30vh`
      }] flex items-center justify-center`}>
      <AddFarmModal open={open} setOpen={setOpen} />
      <div className="relative lg:w-6/12 w-10/12 mx-auto">
        <div className="text absolute top-14 w-full text-center">
          <h2 className="font-bold lg:text-2xl text-xl mb-2">
            Create farm to Get started
          </h2>
          <Button
            onClick={() => setOpen(true)}
            className=" mt-10 font-semibold bg-[--primary] hover:bg-blue-500 px-20 h-[53px] text-white">
            Create farm
          </Button>
        </div>
        <Image
          src={emptyImg}
          alt="empty"
          height={300}
          width={200}
          layout="fixed"
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default CreateFarmState;
