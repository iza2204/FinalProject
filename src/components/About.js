import React from 'react';
import "./about.scss";
import NavigationBar from "./Navi";

export default function AboutUs() {
    return(
        <body>
        <NavigationBar/>
        <div className="flex-container">
            <div className="flex-row">
                <div className="flex-item"> Tools
                    <div className="content-about">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda atque corporis dolore dolorem error excepturi, explicabo fuga fugit impedit labore modi nostrum quasi quisquam similique sint, tempora tenetur velit?
                    </div>
                </div>
                <div className="flex-item"> Who are we?
                    <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda atque corporis dolore dolorem error excepturi, explicabo fuga fugit impedit labore modi nostrum quasi quisquam similique sint, tempora tenetur velit?
                    </div>
                </div>
                <div className="flex-item"> Why TimeWizard?
                    <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda atque corporis dolore dolorem error excepturi, explicabo fuga fugit impedit labore modi nostrum quasi quisquam similique sint, tempora tenetur velit?
                    </div>
                </div>

            </div>

        </div>
        </body>
    )
}
