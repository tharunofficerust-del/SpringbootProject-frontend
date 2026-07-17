import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Vessels from "./pages/Vessels";
import Shipments from "./pages/Shipments";
import Delays from "./pages/Delays";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

    return (

        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/vessels" element={<Vessels />} />

                    <Route path="/shipments" element={<Shipments />} />

                    <Route path="/delays" element={<Delays />} />

                </Routes>

            </Layout>
            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />

        </BrowserRouter>

    );

}



export default App;