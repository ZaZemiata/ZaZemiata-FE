import { NavLink } from 'react-router-dom';
import LogoImage from "../../assets/LogoImage.png"

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm px-20">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src={LogoImage} alt="За Земята Logo" className="w-[152px] h-auto mr-2" />
                </div>

                {/* Navigation Section */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                За нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/what-we-do"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                Какво правим
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                Новини
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/resources"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                Ресурси
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/get-involved"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                Включи се
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500 transition'
                                }
                            >
                                Контакти
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
