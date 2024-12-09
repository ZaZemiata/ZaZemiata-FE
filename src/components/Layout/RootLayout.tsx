import { Outlet } from "react-router-dom";
import Navigation from "./NavigationBar";
import Footer from "./Footer";

const RootLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-grow p-4 px-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
