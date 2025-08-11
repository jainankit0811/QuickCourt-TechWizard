import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";

const AppRouter = () => {
    return (
        <div className="bg-white min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    {/* Add more routes as needed */}
                </Routes>
                <Routes path="/navbar" element={<Navbar></Navbar>}></Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;
