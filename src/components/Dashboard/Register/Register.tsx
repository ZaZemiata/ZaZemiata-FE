import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactComponent as Mail } from "@/assets/svgs/mail.svg";
import { ReactComponent as Eye } from "@/assets/svgs/eye.svg";
import { ReactComponent as EyeClose } from "@/assets/svgs/eyeClose.svg";
import { registerSchema } from "@/share/schemas/authSchemas"; // Define validation schema
import { RegisterFormDataType } from "@/share/types";
import useRegister from "@/reactQuery/hooks/useRegister";
import FormInput from "@/UI/FormComponents/FormInput";

const Register = () => {
    // Hook to manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Register mutation
    const { mutate: registerUser, isPending } = useRegister();

    // react-hook-form
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<RegisterFormDataType>({
        resolver: zodResolver(registerSchema),
    });

    // Submit handler
    const onSubmit: SubmitHandler<RegisterFormDataType> = (data) => {
        registerUser(data);
    };

    return (
        <div className="flex flex-grow items-center justify-center  overflow-hidden">
            <div className="w-[30%] m-10">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    {/* Email Field */}
                    <FormInput
                        disabled={isPending}
                        error={errors.email?.message}
                        register={register}
                        trigger={trigger}
                        field="email"
                        labelName="Електронна поща"
                        placeholder="John.doe@mail.com"
                        icon={
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-4" />
                        }
                    />

                    {/* Password Field */}
                    <FormInput
                        disabled={isPending}
                        error={errors.password?.message}
                        register={register}
                        trigger={trigger}
                        field="password"
                        labelName="Парола"
                        placeholder="********"
                        type={isPasswordVisible ? "text" : "password"}
                        icon={
                            isPasswordVisible ? (
                                <Eye
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-3"
                                />
                            ) : (
                                <EyeClose
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-3"
                                />
                            )
                        }
                    />

                    {/* Confirm Password Field */}
                    <FormInput
                        disabled={isPending}
                        error={errors.repassword?.message}
                        register={register}
                        trigger={trigger}
                        field="repassword"
                        labelName="Потвърдете Парола"
                        placeholder="********"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        icon={
                            isConfirmPasswordVisible ? (
                                <Eye
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-3"
                                />
                            ) : (
                                <EyeClose
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-3"
                                />
                            )
                        }
                    />

                    {/* Sign-Up Button */}
                    <button
                        className="w-full p-3 bg-[#19AD52] text-black hover:bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex hover:text-[#f9f8f7] text-sm font-medium leading-4 mt-4"
                        disabled={isPending}
                    >
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
