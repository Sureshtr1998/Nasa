/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SliderCard from './SliderCard'


const Sliders = (props) => {

    const [show, setShow] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [scrollPosition, setScrollPosition] = useState(0);
    const [infos, setInfos] = useState([])
    let dataInfos = []

    useEffect(() => {
        fetchData()
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    useEffect(() => {
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        if (scrollPosition / height >= 1) {
            fetchData()
        }
    }, [scrollPosition])

    useEffect(() => {
        let sorted = infos.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        setInfos(sorted)
    }, [infos])
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };


    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                style={{ display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }


    const sliderSettings = {
        slidesToShow: 5,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: false,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    const formatDate = (date, end = false) => {
        var d = new Date(date)
        let day
        let month
        let year
        if (end) {
            d.setDate(d.getDate() + 1)
        }
        month = '' + (d.getMonth() + 1)
        day = '' + d.getDate()
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const fetchData = async () => {
        setShow(true)
        let date = startDate
        let end_date = formatDate(startDate)
        let start_date = date.setDate(date.getDate() - 21)
        start_date = formatDate(start_date, true)
        let data = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${start_date}&end_date=${end_date}&thumbs=true`)

        dataInfos = data.data

        setInfos(prevArray => prevArray.length ? [...prevArray, ...dataInfos] : dataInfos)

        let finalDate = new Date(start_date)
        finalDate.setDate(finalDate.getDate() - 1)
        setStartDate(finalDate)
        setShow(false)
    }

    return <div>
        <div className='sliderContainer'>
            {
                Array.from({ length: infos.length / 7 }, (_, i) => i + 1).map(t => {
                    return <Slider className='mt-4' key={t} {...sliderSettings}>
                        {infos?.map((info, index) => {
                            if (index < t * 7 && index >= (t - 1) * 7) {
                                return <div key={info.date}>
                                    <SliderCard triggerFunc={props.triggerFunc} data={info} />
                                </div>
                            }
                        })}
                    </Slider>
                })

            }
            {show && <img
                className='spinner' src="https://www.joshwcomeau.com/images/keyframe-animations/loader.svg"
            />
            }
        </div>


    </div>

}

export default Sliders