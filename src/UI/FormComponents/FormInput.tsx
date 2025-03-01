import capitalizeFirstLetter from "@/util/capitalizeFirstLetter";
import cn from "@/util/cn";
import { ComponentPropsWithoutRef } from "react";
import { FieldValues, Path, UseFormRegister, UseFormTrigger } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
    error: string | undefined;
    register: UseFormRegister<T>;
    trigger: UseFormTrigger<T>;
    field: Path<T>;
    type?: string;
    triggerError?: boolean;
    showLabel?: boolean;
    labelName?: string;
    icon?: JSX.Element;
} & ComponentPropsWithoutRef<"input">;

const FormInput = <T extends FieldValues>({
    error,
    register,
    trigger,
    field,
    type = "text",
    triggerError = true,
    showLabel = true,
    labelName,
    icon,
    ...props
}: FormInputProps<T>) => {
    return (
        <div className="mt-2 pb-6 w-full relative">
            {showLabel && (
                <label htmlFor={field} className="mb-2 block text-sm font-medium text-gray-900">
                    {capitalizeFirstLetter(labelName ?? field)}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    id={field}
                    className={cn(
                        error ? "border-red-500" : "border-inherit ",
                        "block w-full  rounded-xl border-2 p-2.5 text-sm text-customDarkBlue outline-none focus:border-blue-500 focus:ring-blue-500"
                    )}
                    placeholder={capitalizeFirstLetter(field)}
                    {...register(field)}
                    onBlur={() => trigger(field)}
                    {...props}
                />
                {icon}
            </div>
            {error && triggerError && <span className="text-sm text-red-500 absolute bottom-0">{error}</span>}
        </div>
    );
}

export default FormInput;