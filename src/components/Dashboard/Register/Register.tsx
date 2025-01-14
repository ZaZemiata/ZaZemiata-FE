import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="flex justify-center m-8">
        <div className="mt-8 flex flex-col items-start space-y-4 w-[30%] ">
        {/* Email Field */}
        <label className="flex flex-col w-full">
            <span className="mb-2 text-sm font-medium">Email</span>
            <div className="relative">
            <input
                type="email"
                placeholder="john.doe@mail.com"
                className="w-full px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <FontAwesomeIcon
        icon={faEnvelope}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
        />
            </div>
        </label>

        {/* Password Field */}
        <label className="flex flex-col w-full">
            <span className="mb-2 text-sm font-medium">Password</span>
            <div className="relative">
            <input
                type={passwordVisible ? "text" : "password"}
                placeholder="6 characters"
                className="w-full px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
            </div>
        </label>

        {/* Confirm Password Field */}
        <label className="flex flex-col w-full">
            <span className="mb-2 text-sm font-medium">Confirm Password</span>
            <div className="relative">
            <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="6 characters"
                className="w-full px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
                <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
            </button>
            </div>
        </label>

        {/* Sign-Up Button */}
        <button className="w-full px-6 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none">
            Sign Up
        </button>
        </div>
    </div>
  );
};

export default Register;
