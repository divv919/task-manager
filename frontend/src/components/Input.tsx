interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string | null;
  type: string;
}
export const Input = ({
  label,
  placeholder,
  error,
  onChange,
  value,
  type,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-[8px]">
      <label className="font-medium text-[16px] text-neutral-800 tracking-tight">
        {label}
      </label>
      <input
        maxLength={100}
        type={type}
        value={value}
        onChange={onChange}
        className={`${
          error ? "outline outline-red-600" : "focus:outline-1"
        }  border border-neutral-300 rounded-md px-[8px] py-[6px] text-[14px]`}
        placeholder={placeholder}
      ></input>
      {error && (
        <div className="text-[12px] tracking-tight font-medium text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
