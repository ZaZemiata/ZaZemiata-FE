import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { addKeywordSchema } from "@/share/schemas/keywordSchema";
import SeveritySelect from "@/UI/FormComponents/SeveritySelect";
import { KeywordSubmitType, KeywordType, KeywordUpdateType } from "./types";
import useUpdateKeyword from "./hooks/useUpdateKeyword";
import cn from "@/util/cn";
import { ReactComponent as Pencil } from "@/assets/svgs/pencil.svg";
import { ReactComponent as Trash } from "@/assets/svgs/trash.svg";
import useDeleteKeyword from "./hooks/useDeleteKeyword";

type KeyWordCardProps = KeywordType & { keyWordFilter: string; checked: boolean };

const KeyWordCard = (props: KeyWordCardProps) => {
    // Mode state for view, edit, delete modes. Default is "none"
    const [mode, setMode] = useState<"none" | "view" | "edit" | "delete">("none");

    useEffect(() => {
        if (props.checked) {
            setMode("view");
        } else {
            setMode("none");
        }
    }, [props.checked]);

    const toggleViewMode = () => {
        setMode(mode === "view" ? "none" : "view");
    };

    // State to store the original data
    const [originalData, setOriginalData] = useState<KeywordSubmitType>({
        word: props.word,
        priority: props.priority,
        active: props.active,
    });

    // useUpdateKeyword hook to update the keyword
    const { mutate: updateKeyword, isError, error } = useUpdateKeyword();

    // useDeleteKeyword hook to delete the keyword
    const { mutate: deleteKeyword } = useDeleteKeyword();

    // react-hook-form hook to handle
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<KeywordSubmitType>({
        resolver: zodResolver(addKeywordSchema),
        defaultValues: { ...props },
    });

    // submit function to update the keyword
    const onSubmit = (data: KeywordSubmitType) => {
        const updateData: KeywordUpdateType = { ...data, id: Number(props.id) };
        updateKeyword(updateData, {
            onSuccess: () => {
                setOriginalData(data); // Save updated data
                setMode("none"); // Exit edit mode
            },
        });
    };

    // function to handle the cancellation of the edit and delete modes
    const onCancel = () => {
        setMode("none");
        setValue("word", originalData.word);
        setValue("priority", originalData.priority);
        setValue("active", originalData.active);
    };

    // function to handle the change of the active status
    const handleActiveChange = (value: boolean) => {
        setValue("active", value);
        trigger("active");
    };

    // Define regex and parts conditionally
    const regex = props.keyWordFilter.trim() ? new RegExp(`(${props.keyWordFilter})`, "gi") : null;
    const parts = regex ? props.word.split(regex) : [props.word]; // Display the word as-is if the filter is empty

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-[5rem_1fr_10rem_5rem_1fr] items-center rounded-xl p-4 border-b border-gray-200 group hover:bg-slate-200"
        >
            <input type="checkbox" checked={mode !== "none"} onChange={toggleViewMode} />
            <div className="relative w-full px-5">
                <div
                    className={cn(mode === "edit" ? "hidden" : "pointer-events-none text-transparent")}
                    aria-hidden="true"
                >
                    {parts.map((part, index) =>
                        regex && regex.test(part) ? (
                            <span key={index} className="bg-blue-200 text-black">
                                {part}
                            </span>
                        ) : (
                            <span key={index} className="text-black">
                                {part}
                            </span>
                        )
                    )}
                </div>
                <input
                    type="text"
                    {...register("word")}
                    className={cn(
                        mode === "edit" ? "border-b border-black" : "border-none hidden",
                        "w-full bg-transparent outline-none relative z-10"
                    )}
                    disabled={mode !== "edit"}
                />
                {errors.word && <span className="text-sm text-red-500">{errors.word.message}</span>}
            </div>
            <SeveritySelect
                field="priority"
                showLabel={false}
                error={errors.priority?.message}
                {...register("priority", { required: "Моля изберете тежест." })}
                disabled={mode !== "edit"}
                containerClassName="px-5"
            />
            <input type="checkbox" className="hidden" {...register("active")} />
            {mode === "edit" ? (
                <div className="w-full flex justify-center items-center space-x-2">
                    <button type="button" onClick={() => handleActiveChange(true)}>
                        <FaCheckCircle
                            className={cn(
                                getValues("active") === true ? "opacity-100" : "opacity-50",
                                "text-green-500"
                            )}
                        />
                    </button>
                    <button type="button" onClick={() => handleActiveChange(false)}>
                        <FaCircleXmark
                            className={cn(getValues("active") === false ? "opacity-100" : "opacity-50", "text-red-500")}
                        />
                    </button>
                </div>
            ) : props.active ? (
                <div className="flex justify-center items-center">
                    <FaCheckCircle className="text-green-500" />
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <FaCircleXmark className="text-red-500" />
                </div>
            )}
            <div>
                <div
                    className={cn(
                        mode === "none"
                            ? "group-hover:opacity-100 opacity-0"
                            : mode === "view"
                            ? "opacity-100"
                            : "hidden",
                        "flex justify-end items-center space-x-2 px-5 transition-opacity"
                    )}
                >
                    <button type="button" onClick={() => setMode("edit")} aria-label="Edit">
                        <Pencil />
                    </button>
                    <button type="button" onClick={() => setMode("delete")} aria-label="Delete">
                        <Trash />
                    </button>
                </div>
                {mode === "edit" && (
                    <div className="flex justify-end items-center space-x-2 px-5">
                        <button
                            type="submit"
                            className="p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4"
                        >
                            Обнови
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4"
                        >
                            Отказ
                        </button>
                    </div>
                )}
                {mode === "delete" && (
                    <div className="flex justify-end items-center space-x-2 px-5">
                        <button
                            type="button"
                            onClick={()=> deleteKeyword(props.id)}
                            className="p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4"
                        >
                            Изтрии
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4"
                        >
                            Отказ
                        </button>
                    </div>
                )}
                {isError && (
                    <div className="flex justify-end">
                        <span className="text-red-500 text-sm">{error.message}</span>
                    </div>
                )}
            </div>
        </form>
    );
};

export default KeyWordCard;
