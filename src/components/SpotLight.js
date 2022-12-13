import React, { useEffect, useState } from "react";
import axios from 'axios'
import Modal from 'react-modal';
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'

const SpotLight = (props) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const opts = {
        height: '400',
        width: '800'
    }
    const [currData, setCurrData] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);


    useEffect(() => {
        Modal.setAppElement('#spotLight');
        const getLatestImage = async () => {
            let data = await axios.get('https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7')
            setCurrData(data.data)
        }
        getLatestImage()
    }, [])

    useEffect(() => {
        setCurrData(props.data)
    }, [props.data])

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    return <div id='spotLight'>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button className="closeIcon" onClick={closeModal}>x</button>
            <div className="modalAsset pt-6">
                {currData.thumbnail_url ?
                    <YouTube videoId={youtube_parser(currData.url)} opts={opts} />
                    : <img className="" src={currData.url} alt='Nasa Logo' />}
            </div>
        </Modal>

        <div className="SpotLight">
            <div onClick={openModal} className="">
                <img className="spotImage" src={currData.thumbnail_url ? currData.thumbnail_url : currData.url} alt='Nasa Logo' />
            </div>
            <div className="">
                <ul className="dataDetails">
                    <li className="mt-4"> <span className="font-bold"> Title: </span> {currData.title}</li>
                    <li className="mt-4"><span className="font-bold"> Description: </span> {currData.explanation}</li>
                    <li className="mt-4"> <span className="font-bold"> Author: </span> {currData.copyright}</li>
                </ul>
            </div>
        </div>
    </div>
}


SpotLight.propTypes = {
    data: PropTypes.object.isRequired
}
export default SpotLight;