import { NavLink } from "react-router-dom";
import LogoImage from "../../assets/LogoImage.png";
import { Link } from "react-router-dom";
import { useLoginData } from "@/context/AuthContext";
import useLogout from "@/reactQuery/hooks/useLogout";
import { FormEvent, useState } from "react";

const Navigation: React.FC = () => {
    // nav menu state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // get the login data from the context
    const { userData } = useLoginData();
    // get the logout function from the useLogout hook
    const { logout } = useLogout();

    // handle the menu toggle function
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // handle the logout function
    const handleLogout = (e: FormEvent) => {
        e.preventDefault()
        logout();
    };
    return (
        <header className="bg-white shadow-sm px-20 max-sm:px-2">
            <div className="container mx-auto px-4 flex lg:justify-between md:justify-between sm:justify-between justify-end items-center py-4">
                {/* Logo Section */}
                <div className="max-sm:hidden items-center">
                    <Link to="/">
                        <img src={LogoImage} alt="За Земята Logo" className="w-[152px] h-auto mr-2" />
                    </Link>
                </div>
                
                 {/* Burger button (visible only on mobile) */}
                <button className="lg:hidden border rounded-md px-1" onClick={toggleMenu}>
                    {/* TODO: Update burger icon */}
                    |||
                </button>

                {/* Navigation Section */}
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block max-lg:absolute max-lg:top-14 max-lg:right-2 max-lg:w-[150px] max-lg:bg-teal-50 max-lg:z-5 max-lg:p-2 max-lg:border max-lg:rounded-md`}>
                    <ul className="flex space-x-6 max-lg:flex-col max-lg:space-x-0">
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
                        {userData && (
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
