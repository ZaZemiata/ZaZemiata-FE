import React from "react";
import capitalizeFirstLetter from "@/util/capitalizeFirstLetter";
import cn from "@/util/cn";

type SeveritySelectProps = {
    error?: string;
    field: string;
    labelName?: string;
    showLabel?: boolean;
    icon?: JSX.Element;
    className?: string;
    containerClassName?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SeveritySelect = React.forwardRef<HTMLSelectElement, SeveritySelectProps>(
    ({ error, field, labelName, showLabel = true, icon, className, containerClassName, ...props }, ref) => {
        return (
            <div className={cn(containerClassName || "", "w-full relative")}>
                {showLabel && (
                    <label htmlFor={field} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {capitalizeFirstLetter(labelName ?? field)}
                    </label>
                )}
                <div className="relative">
                    <select
                        id={field}
                        ref={ref}
                        className={cn(
                            error ? "border-red-500" : "border-inherit",
                            "block w-full rounded-xl border-2 p-2.5 text-sm text-customDarkBlue outline-none focus:border-blue-500 focus:ring-blue-500",
                            className || ""
                        )}
                        {...props}
                    >
                        <option value="LOW">Нисък</option>
                        <option value="MEDIUM">Среден</option>
                        <option value="HIGH">Висок</option>
                        <option value="CRITICAL">Критичен</option>
                    </select>
                    {icon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
                    )}
                </div>
                {error && <span className="text-sm text-red-500 absolute bottom-0">{error}</span>}
            </div>
        );
    }
);

SeveritySelect.displayName = "SeveritySelect";

export default SeveritySelect;
