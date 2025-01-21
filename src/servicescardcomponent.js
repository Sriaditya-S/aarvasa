import React from "react";
import "./servicescardcomponent.css";


const ServicesCardComp =({ heading, text, imageSrc}) =>{

    return(
        <div class="component">
            <div class="textforcard">
                <h4 class="heading">{heading} </h4>
                <h4 class="textinside">{text} </h4>
                <button class="readmore">Read More </button>
            </div>
            <div class="image">
                <img src={imageSrc} alt={heading} ></img>
            </div>

        </div>
    )

}
export default ServicesCardComp;