import { NavLink } from "react-router-dom";
import LogoImage from "../../assets/LogoImage.png";
import { Link } from "react-router-dom";
import { useLoginData } from "@/context/AuthContext";
import useLogout from "@/reactQuery/hooks/useLogout";
import { FormEvent } from "react";

const Navigation: React.FC = () => {
    // get the login data from the context
    const { loginData } = useLoginData();
    // get the logout function from the useLogout hook
    const { logout } = useLogout();

    // handle the logout function
    const handleLogout = (e: FormEvent) => {
        e.preventDefault()
        logout();
    };
    return (
        <header className="bg-white shadow-sm px-20">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link to="/">
                        <img src={LogoImage} alt="За Земята Logo" className="w-[152px] h-auto mr-2" />
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                За нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/what-we-do"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                Какво правим
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                Новини
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/resources"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                Ресурси
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/get-involved"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                Включи се
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-semibold"
                                        : "text-gray-700 hover:text-green-500 transition"
                                }
                            >
                                Контакти
                            </NavLink>
                        </li>
                        {loginData && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-green-500 font-semibold"
                                                : "text-gray-700 hover:text-green-500 transition"
                                        }
                                    >
                                        Админ панел
                                    </NavLink>
                                </li>
                                <li>
                                    <form onSubmit={handleLogout}>
                                        <button
                                            className="text-gray-700 hover:text-green-500 transition"
                                            type="submit"
                                        >
                                            Изход
                                        </button>
                                    </form>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
