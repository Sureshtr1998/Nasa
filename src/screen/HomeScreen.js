import React, { useState } from "react";
import Header from "../components/Header";
import SpotLight from "../components/SpotLight";
import Sliders from "../components/Sliders";
const HomeScreen = () => {

    const [data, setData] = useState({})

    const triggerFunc = (event) => {
        setData(event)
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    return (
        <div className="mt-8 ml-8 mr-8 mb-32">
            <Header />
            <SpotLight data={data} />
            <Sliders triggerFunc={triggerFunc} />
        </div>
    );
};

export default HomeScreen;
