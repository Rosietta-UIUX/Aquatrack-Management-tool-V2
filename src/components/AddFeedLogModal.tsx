"use client";
import { useState, useEffect } from "react";
import {
  useAddFeedLogMutation,
  useEditFeedLogMutation,
} from "@/redux/services/pondsApiSlice";
import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LogData } from "@/types";

const AddFeedLogModal = ({
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
  logData?: LogData;
}) => {
  const [feedBags, setFeedBags] = useState("");
  const [feedSize, setFeedSize] = useState("");
  const [addFeedLog, { isLoading: isAdding }] = useAddFeedLogMutation();
  const [editFeedLog, { isLoading: isEditing }] = useEditFeedLogMutation();

  useEffect(() => {
    if (logData) {
      setFeedBags(logData.log);
      setFeedSize(logData.feed_size || "");
    }
  }, [logData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (logData) {
        await editFeedLog({
          formdata: { feed_bags: feedBags, feed_size: feedSize },
          farmId,
          pondId,
          logId: logData.id,
        }).unwrap();
      } else {
        await addFeedLog({
          formdata: { feed_bags: feedBags, feed_size: feedSize },
          farmId,
          pondId,
        }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save feed log:", error);
    }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={logData ? "Edit Feed Log" : "Add Feed Log"}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Number of Feed Bags"
            value={feedBags}
            onChange={(e) => setFeedBags(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Size of Feed (mm)"
            value={feedSize}
            onChange={(e) => setFeedSize(e.target.value)}
          />
          <Button type="submit" disabled={isAdding || isEditing} className="btn-primary">
            {isAdding || isEditing ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFeedLogModal;
