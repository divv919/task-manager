import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import EmptyPlaceholder from "../components/NotFound";

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addTaskName, setAddTaskName] = useState("");
  const { token, logout, authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { loading, error, reFetch, data } = useFetch(
    import.meta.env.VITE_BACKEND_BASE + "api/tasks"
  );

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleAddTask = async () => {
    await axios.post(
      import.meta.env.VITE_BACKEND_BASE + "api/tasks",
      { title: addTaskName, status: "Pending" },
      {
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
      }
    );
    reFetch();
    setAddTaskName("");
    setIsOpen(false);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!authLoading && !isAuthenticated) {
    navigate("/login");
  }

  if (error) {
    return (
      <div className=" w-screen h-screen text-[36px] font-bold tracking-tighter flex justify-center items-center">
        Error Loading This Page
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex gap-[24px] flex-wrap px-[44px] py-[88px]">
        <div className="w-[256px] aspect-square  bg-neutral-200"></div>
        <div className="w-[256px] aspect-square  bg-neutral-200"></div>

        <div className="w-[256px] aspect-square  bg-neutral-200"></div>

        <div className="w-[256px] aspect-square  bg-neutral-200"></div>

        <div className="w-[256px] aspect-square  bg-neutral-200"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-[24px] px-[44px] py-[24px] relative ">
      {isOpen && (
        <div className="w-screen flex justify-center items-center h-screen top-0 left-0 bg-neutral-50 absolute  z-50">
          <div className="w-[444px] flex flex-col gap-[16px] relative  p-[24px] rounded-md border border-neutral-300">
            <Input
              type="text"
              placeholder="Enter Task"
              label="Task Name"
              value={addTaskName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddTaskName(e.target.value)
              }
            />
            <div className="flex justify-start">
              <Button text="Add Task" onClick={handleAddTask} />
            </div>
            <div
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              X
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <h1 className="font-bold tracking-tight text-[26px]">All Your Tasks</h1>

        <div className="flex gap-[24px]">
          <Button text="Add Task" onClick={() => setIsOpen(true)} />
          <Button varient="secondary" text="Log Out" onClick={handleLogout} />
        </div>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]">
        {data?.map((task) => {
          return (
            <Card
              reFetch={reFetch}
              status={task.status}
              title={task.title}
              id={task.id}
            />
          );
        })}
        {data?.length === 0 && (
          <div className="w-full h-full xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1  flex justify-center items-center">
            <div className="flex flex-col gap-[24px] justify-center items-center max-w-[256px] aspect-square">
              <EmptyPlaceholder />
              <div className="tracking-tighter font-semibold">
                No Todos Found
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
