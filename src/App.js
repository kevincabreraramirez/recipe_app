import React from "react";
import "./App.css";
import Home from "./views/home/home";
import Recipe from "./views/recipe/recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={< Home />}></Route>
                <Route path="/recipe/:id" exact element={< Recipe />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
