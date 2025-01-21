import React from "react";
import "./reviewcard.css";
const ReviewCard =() =>{
    return(
    <div class="revreviewcard">
        <div class="revheaderpart">
            <div class="revcircle">
            </div>
            <div class="revnameofuser">
                <h4 class="revuser">Alexandra Rivers</h4>
                <h4 class="revusername">@Alexandra_Rver </h4>
            </div>
            </div>
            <div>
                <h4 class="revreview">
                As a first-time homebuyer, I was overwhelmed by the options and paperwork. The team at Aavasa made the process seamless.They understood my needs and helped me find Show More...
                </h4>
            </div>
            <div class="revlowerpart">
                <div class="revrating">
                    <img src="/star.png" alt="star"/>
                    <img src="/star.png" alt="star"/>
                    <img src="/star.png" alt="star"/>
                    <img src="/star.png" alt="star"/>
                    <img src="/star.png" alt="star"/>

                </div>
                <h4 class="revtime"> 1 month ago</h4>
            </div>
        </div>
    )
}
export default ReviewCard;