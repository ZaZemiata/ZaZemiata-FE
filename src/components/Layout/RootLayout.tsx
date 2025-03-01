import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navigation from "./NavigationBar";
import Footer from "./Footer";

const RootLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-grow flex">
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "50px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                    }}
                />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
