"use client";
import { useState, useEffect } from "react";
import {
  useAddMortalityLogMutation,
  useEditMortalityLogMutation,
} from "@/redux/services/pondsApiSlice";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddMortalityLogModal = ({
  farmId,
  pondId,
  open,
  setOpen,
  logData,
}: {
  farmId: string;
  pondId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  logData?: any;
}) => {
  const [mortality, setMortality] = useState("");
  const [addMortalityLog, { isLoading: isAdding }] =
    useAddMortalityLogMutation();
  const [editMortalityLog, { isLoading: isEditing }] =
    useEditMortalityLogMutation();

  useEffect(() => {
    if (logData) {
      setMortality(logData.log);
    }
  }, [logData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (logData) {
        await editMortalityLog({
          formdata: { mortality },
          farmId,
          pondId,
          logId: logData.id,
        }).unwrap();
      } else {
        await addMortalityLog({
          formdata: { mortality },
          farmId,
          pondId,
        }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save mortality log:", error);
    }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={logData ? "Edit Mortality Log" : "Add Mortality Log"}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Mortality Count"
            value={mortality}
            onChange={(e) => setMortality(e.target.value)}
          />
          <Button type="submit" disabled={isAdding || isEditing}>
            {isAdding || isEditing ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMortalityLogModal;
