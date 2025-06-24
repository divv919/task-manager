import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState, type ChangeEvent } from "react";

export const Card = ({
  title,
  status,
  id,
  reFetch,
}: {
  title: string;
  status: string;
  id: number;
  reFetch: () => void;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const changeStatus = async () => {
    console.log("id of status change is : ", id);

    try {
      await axios.put(import.meta.env.VITE_BACKEND_BASE + "api/tasks/" + id, {
        status:
          status === "Pending"
            ? "On Going"
            : status === "On Going"
            ? "Done"
            : "Pending",
      });
      reFetch();
    } catch (err) {
      alert("Error updating the status");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_BASE + "api/tasks/" + id);
      reFetch();
    } catch (err) {
      alert("Error deleting the status");
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(import.meta.env.VITE_BACKEND_BASE + "api/tasks/" + id, {
        title: editValue,
      });
      reFetch();
    } catch (err) {
      alert("Error updating the status");
      console.log(err);
    }
  };
  return (
    <div
      className={`${
        status === "Pending"
          ? "bg-red-200 border border-red-400"
          : status === "On Going"
          ? "bg-blue-200 border border-blue-400"
          : "bg-green-200 border  border-green-400"
      }  w-full aspect-video  p-[16px]  rounded-md flex flex-col justify-between group`}
    >
      {isEditOpen && (
        <div className="w-screen h-screen top-0 left-0 absolute z-20 bg-neutral-50 flex justify-center items-center ">
          <div className="max-w-[444px]  flex flex-col gap-[16px] relative  p-[24px] rounded-md border border-neutral-300">
            <Input
              type="string"
              placeholder="Enter updated Task"
              label="Name"
              value={editValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditValue(e.target.value)
              }
            />
            <div className="flex justify-start">
              <Button text="Edit Task" onClick={handleUpdate} />
            </div>
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setIsEditOpen(false);
                setEditValue(title);
              }}
            >
              X
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full flex justify-between relative">
        <div className="text-[20px] w-full font-semibold wrap-anywhere  ">
          {title}
        </div>
        <div className="absolute top-1 right-1 group-hover:opacity-100 opacity-0 transition-all duration-75 flex gap-[8px]">
          <div
            className="cursor-pointer h-fit w-fit p-[4px] bg-neutral-50 rounded-2xl "
            onClick={handleDelete}
          >
            <DeleteIcon />
          </div>
          <div
            className="cursor-pointer h-fit w-fit p-[4px] bg-neutral-50 rounded-2xl"
            onClick={() => setIsEditOpen(true)}
          >
            <EditIcon />
          </div>
        </div>
      </div>
      <p
        className={`${
          status === "Pending"
            ? "bg-red-400"
            : status === "On Going"
            ? "bg-blue-400"
            : "bg-green-400"
        } w-fit py-[8px] px-[12px] text-[12px] rounded-4xl text-white cursor-pointer`}
        onClick={changeStatus}
      >
        {status}
      </p>
    </div>
  );
};
