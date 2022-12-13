import React, { useEffect, useState } from "react";
import axios from 'axios'

const Header = () => {

    const [urlImage, setUrlImage] = useState('')

    useEffect(() => {
        const getImage = async () => {
            let url = 'https://api.nasa.gov/planetary/apod?api_key='
            let token = 'gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7'
            let data = await axios.get(url + token)
            setUrlImage(data.data.url)
        }
        getImage()
    }, [])

    return (
        <div>
            <div className="flow-root">
                <div className="float-left">
                    <img className="nasaAnimation w-16 pt-6" src='/nasa.png' alt='Nasa Logo' />
                </div>
                <div className="float-right">
                    <img className="w-32 apod" src={urlImage} alt='Astronomy Pic Of The Day' />
                </div>
            </div>
            <div className="mt-2">
                <a href='https://surecode.netlify.app' rel="noreferrer" target='_blank' className="text-lg font-bold">&lt; Suresh T R /&gt;</a>
            </div>
        </div>
    );
};

export default Header;
