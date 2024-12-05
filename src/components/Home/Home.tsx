import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
          
            <NavigationBar />
            
            <main className="flex-grow p-4 px-20">
                <Outlet /> 
            </main>


            <footer className="text-center py-4 bg-[#19AD52]">
                <p>© 2024 За Земята</p>
            </footer>
        </div>
    );
};

export default Home;
