import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StoryPage from "./pages/StoryPage";

const Navigation = () => {
    return (
<BrowserRouter>
<Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path='stories/:id' element={<StoryPage/>}/>
</Routes>
</BrowserRouter>
    )
}

export default Navigation;