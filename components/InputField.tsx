import { Input } from "./ui/input";
import classNames from "classnames";
import { Label } from "./ui/label";

export const InputField = ({
  disabled = false,
  error,
  label,
  name,
  placeholder,
  register,
  type = "text",
  validation,
  value,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={classNames("form-input", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
