import React from "react";
import PropTypes from 'prop-types'

const SliderCard = ({ data, triggerFunc }) => {

    return <div>
        <div onClick={() => triggerFunc(data)} className="sliderCard">
            <img className="image" src={data.thumbnail_url ? data.thumbnail_url : data.url} />
            <hr />
            <div className="details mt-4">
                <p className="font-bold text-xs  mt-4"> {data.title} </p>
                <p className="font-bold text-xs mt-2"> {data.date}</p>
            </div>
        </div>
    </div>
}


SliderCard.propTypes = {
    data: PropTypes.object.isRequired,
    triggerFunc: PropTypes.func.isRequired
}

export default SliderCard