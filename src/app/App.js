import NavBar from "../components/common/NavBar";

import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";

function App() {
    return (<>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/cart" element={<Dashboard/>}/>

            </Routes>
        </>

    );
}

export default App;
