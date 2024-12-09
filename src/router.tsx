import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import WhatWeDo from "./components/WhatWeDo/WhatWeDo";
import News from "./components/News/News";
import Resources from "./components/Resources/Resources";
import GetInvolved from "./components/GetInvolved/GetInvolved";
import Contacts from "./components/Contacts/Contacts";
import RootLayout from "./components/Layout/RootLayout";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <Home /> }, // Начало
                { path: "about", element: <About /> }, // За нас
                { path: "what-we-do", element: <WhatWeDo /> }, // Какво правим
                { path: "news", element: <News /> }, // Новини
                { path: "resources", element: <Resources /> }, // Ресурси
                { path: "get-involved", element: <GetInvolved /> }, // Включи се
                { path: "contact", element: <Contacts /> }, // Контакти
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
