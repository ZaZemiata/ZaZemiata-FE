import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "@/util/cn";

import Modal from "@/UI/Components/Modal";
import SeveritySelect from "@/UI/FormComponents/SeveritySelect";
import { KeywordSubmitType } from "./types";
import FormInput from "@/UI/FormComponents/FormInput";
import useCreateKeyword from "./hooks/useCreateKeyword";
import { addKeywordSchema } from "@/share/schemas/keywordSchema";
import { ReactComponent as AddIconButtons } from "@/assets/svgs/addIconButtons.svg";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const AddKeyWords = () => {
    const [activity, setActivity] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: addKeyWord, isSuccess } = useCreateKeyword();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm<KeywordSubmitType>({
        resolver: zodResolver(addKeywordSchema),
        defaultValues: { word: "", priority: 'MEDIUM', active: true },
    });

    // submit function to login the user
    const onSubmit: SubmitHandler<KeywordSubmitType> = (data) => {
        data.active = activity;
        addKeyWord(data);
    };
    const handleActivitySelection = (value: boolean) => {
        setActivity(value);
        setValue("active", value); // Update the "active" field in the form
        clearErrors("active"); // Clear the error for "active"
        trigger("active"); // Trigger validation for the field
    };

    // function to handle the closing of the modal
    const handleClosingModal = useCallback(() => {
        clearErrors();
        setValue("word", "");
        setValue("priority", "LOW");
        setValue("active", null);
        setIsModalOpen(false);
    }, [clearErrors, setValue]);

    // useEffect to close the modal on success
    useEffect(() => {
        if (isSuccess) {
            handleClosingModal();
        }
    }, [isSuccess, handleClosingModal]);

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                <AddIconButtons className="w-9 h-9" />
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mx-5">
                    <h1 className="text-center text-2xl my-4">Добавяне на ключова дума</h1>

                    <FormInput
                        error={errors.word?.message}
                        register={register}
                        trigger={trigger}
                        field="word"
                        labelName="Ключова дума:"
                        placeholder="Ключова дума"
                    />
                    <SeveritySelect
                        field="priority"
                        labelName="Тежест:"
                        error={errors.priority?.message}
                        {...register("priority", { required: "Моля изберете тежест." })}
                        containerClassName="mt-2 pb-6"
                    />
                    <div className="pb-6 relative">
                        <div className="flex items-center space-x-4 ">
                            <p>Активност:</p>
                            <button type="button" onClick={() => handleActivitySelection(true)}>
                                <FaCheckCircle
                                    className={cn(
                                        activity === true ? "opacity-100" : "opacity-50",
                                        "text-green-500 cursor-pointer"
                                    )}
                                />
                            </button>
                            <button type="button" onClick={() => handleActivitySelection(false)}>
                                <FaCircleXmark
                                    className={cn(
                                        activity === false ? "opacity-100" : "opacity-50",
                                        "text-red-500 cursor-pointer"
                                    )}
                                />
                            </button>
                        </div>
                        {errors.active && <p className="text-red-500 absolute bottom-0">{errors.active.message}</p>}
                    </div>
                    <input type="checkbox" className="hidden" {...register("active")} />
                    <div className="flex justify-between mx-10 gap-3">
                        <button
                            type="submit"
                            className="w-full p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4 mt-4 mb-8"
                        >
                            Добавяне
                        </button>
                        <button
                            type="button"
                            className="w-full p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4 mt-4 mb-8"
                            onClick={() => handleClosingModal()}
                        >
                            Отказ
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddKeyWords;
