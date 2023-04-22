import React from 'react';
import "./about.scss";
import NavigationBar from "./Navi";

export default function AboutUs() {
    return(
        <body>
        <NavigationBar/>
        <div className="flex-container">
            <div className="flex-row">
                <div className="flex-item">1</div>
                <div className="flex-item">2</div>
                <div className="flex-item">3</div>

            </div>
            <div className="flex-row">
                <div className="flex-item">1</div>
                <div className="flex-item">2</div>
                <div className="flex-item">3</div>

            </div>
        </div>
        </body>
    )
}
