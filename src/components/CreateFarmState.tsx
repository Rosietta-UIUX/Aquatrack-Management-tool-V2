import { useState } from "react";
import AddFarmModal from "./AddFarmModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const CreateFarmState = ({ vheight }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <section
      className={`h-[${
        vheight ? vheight : `30vh`
      }] flex items-center justify-center`}
    >
      <AddFarmModal open={open} setOpen={setOpen} />
      <div className="text-center">
        <div className="flex justify-center">
          <PlusCircle className="text-gray-400" size={64} />
        </div>
        <h2 className="font-semibold text-2xl mt-4">
          Create a farm to get started
        </h2>
        <p className="text-gray-500 mt-1">
          You don't have any farms yet. Create one to start managing your
          aquaculture business.
        </p>
        <Button
          onClick={() => setOpen(true)}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <PlusCircle className="mr-2" size={20} />
          Create Farm
        </Button>
      </div>
    </section>
  );
};

export default CreateFarmState;
