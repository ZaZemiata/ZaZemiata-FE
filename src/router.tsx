import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import WhatWeDo from "./components/WhatWeDo/WhatWeDo";
import News from "./components/News/News";
import Resources from "./components/Resources/Resources";
import GetInvolved from "./components/GetInvolved/GetInvolved";
import Contacts from "./components/Contacts/Contacts";
import RootLayout from "./components/Layout/RootLayout";
import AdminNav from "./components/Admin/AdminNav";
import Login from "./components/Login/Login";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <AuthContextProvider>
                    <RootLayout />
                </AuthContextProvider>
            ),
            children: [
                { index: true, element: <Home /> }, // Начало
                { path: "about", element: <About /> }, // За нас
                { path: "what-we-do", element: <WhatWeDo /> }, // Какво правим
                { path: "news", element: <News /> }, // Новини
                { path: "resources", element: <Resources /> }, // Ресурси
                { path: "get-involved", element: <GetInvolved /> }, // Включи се
                { path: "contact", element: <Contacts /> }, // Контакти
                { path: "admin", element: <AdminNav /> },
                { path: "login", element: <Login /> }, // Login component
            ],
        },
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default router;
