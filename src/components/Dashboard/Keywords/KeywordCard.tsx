import {  useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { addKeywordSchema } from "@/share/schemas/keywordSchema";
import SeveritySelect from "@/UI/FormComponents/SeveritySelect";
import { KeywordSubmitType, KeywordType, KeywordUpdateType } from "./types";
import useUpdateKeyword from "./hooks/useUpdateKeyword";
import cn from "@/util/cn";

type KeyWordCardProps = KeywordType & { keyWordFilter: string };

const KeyWordCard = (props: KeyWordCardProps) => {
    const [edit, setEdit] = useState(false);
    const [originalData, setOriginalData] = useState<KeywordSubmitType>({
        word: props.word,
        priority: props.priority,
        active: props.active,
    });

    const { mutate: updateKeyword, isError, error } = useUpdateKeyword();

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

    const onSubmit = (data: KeywordSubmitType) => {
        const updateData: KeywordUpdateType = { ...data, id: Number(props.id) };
        updateKeyword(updateData, {
            onSuccess: () => {
                setOriginalData(data); // Update the original data
                setEdit(false); // Exit edit mode
            },
        });
    };

    const onCancelUpdate = () => {
        setEdit(false);
        setValue("word", originalData.word);
        setValue("priority", originalData.priority);
        setValue("active", originalData.active);
    };

    const toggleEditMode = () => {
        if (edit) {
            onCancelUpdate(); // Cancel changes if exiting edit mode
        } else {
            setEdit(true);
        }
    };

    const handleActiveChange = (value: boolean) => {
        setValue("active", value); // Update the "active" field in the form
        trigger("active"); // Trigger validation for the field
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-[5rem_1fr_10rem_5rem_1fr] items-center p-4 border-b border-gray-200"
        >
            <input type="checkbox" checked={edit} onChange={toggleEditMode} />
            <div className="relative w-full">
                <input
                    type="text"
                    {...register("word")}
                    className="w-full bg-transparent outline-none border-none relative z-10"
                />
                {errors.word && <span className="text-sm text-red-500">{errors.word.message}</span>}
            </div>
            <SeveritySelect
                field="priority"
                showLabel={false}
                error={errors.priority?.message}
                {...register("priority", { required: "Моля изберете тежест." })}
                disabled={!edit}
            />
            <input type="checkbox" className="hidden" {...register("active")} />
            {edit ? (
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
                            className={cn(
                                getValues("active") === false ? "opacity-100" : "opacity-50",
                                "text-red-500"
                            )}
                        />
                    </button>
                </div>
            ) : props.active ? (
                <div className="flex justify-center items-center">
                    <FaCheckCircle className="text-green-500 " />
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <FaCircleXmark className="text-red-500" />
                </div>
            )}

            <div>
                {edit && (
                    <>
                        <div className="flex justify-end items-center space-x-2">
                            <button type="submit">update</button>
                            <button type="button" onClick={onCancelUpdate}>
                                cancel
                            </button>
                        </div>
                        {isError && (
                            <div className="flex justify-end">
                                <span className="text-red-500 text-sm">{error.message}</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};
export default KeyWordCard;
