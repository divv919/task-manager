export const Button = ({
  text,
  onClick,
  varient = "primary",
}: {
  text: string;
  onClick: () => void;
  varient?: "primary" | "secondary";
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        varient === "primary"
          ? "bg-amber-500 text-white hover:bg-amber-700"
          : "border hover:bg-neutral-200 hover:text-black border-amber-500 text-amber-500 "
      } rounded-md  cursor-pointer  text-[10px] md:text-[12px] lg:text-[14px]  px-[4px] md:px-[6px] lg:px-[8px] py-[4px] lg:py-[6px]`}
    >
      {text}
    </button>
  );
};
