import { ReactComponent as Logo } from "@/assets/svgs/login_logo.svg";
import { ReactComponent as Mail } from "@/assets/svgs/mail.svg";
import { ReactComponent as Eye } from "@/assets/svgs/eye.svg";
import FormInput from "@/UI/FormComponents/FormInput";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/share/schemas/authSchemas";
import useLogin from "@/reactQuery/hooks/useLogin";

type LoginFormDataType = {
    email: string;
    password: string;
};

const Login = () => {
    // useLogin hook to login the user
    const { mutate: login, error, isError, isPending } = useLogin();

    // state to toggle the password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // react-hook-form hook to handle the form
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<LoginFormDataType>({
        resolver: zodResolver(loginSchema),
    });

    // submit function to login the user
    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        login(data);
    };

    return (
        <div className="flex flex-grow items-center justify-center bg-gradient-to-l from-[#19ad52] via-[#c2e9d1] to-white overflow-hidden">
            <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-[auto_410px] gap-8 lg:gap-24 mx-4">
                <Logo className="w-full h-full" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center mb-8">
                        <h1 className="p-2 border-b border-[#0d381e] text-2xl font-semibold leading-7 w-fit">Вход</h1>
                    </div>
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
                    <FormInput
                        disabled={isPending}
                        error={errors.password?.message}
                        register={register}
                        trigger={trigger}
                        field="password"
                        placeholder="********"
                        labelName="Парола"
                        type={isPasswordVisible ? "text" : "password"}
                        icon={
                            isPasswordVisible ? (
                                <Eye
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor w-4 h-3"
                                />
                            ) : (
                                // TODO: change the icon with svg
                                <AiOutlineEyeInvisible
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 transform text-welcomeMsgColor"
                                />
                            )
                        }
                    />
                    <button className="w-full p-3 bg-[#0d381e] rounded-xl justify-center items-center gap-2 inline-flex text-[#f9f8f7] text-sm font-medium leading-4 mt-4 mb-8">
                        Вход
                    </button>
                    {isError && <span className="text-red-500 text-sm">{error?.message}</span>}
                </form>
            </div>
        </div>
    );
};

export default Login;
