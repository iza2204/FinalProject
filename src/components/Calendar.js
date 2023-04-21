import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.scss";
import NavigationBar from "./Navi";
import LogoutIcon from "@mui/icons-material/Logout";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";




function Calendarsheet() {
    const allMonthValues = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // State for date selected by user
    const [selectedDate, setSelectedDate] = useState();

    // State for text above calander
    const [calendarText, setCalendarText] = useState(`No Date is selected`);


    // Function to update selected date and calander text
    const handleDateChange = (value) => {
        setSelectedDate(value);
        setCalendarText(`The selected Date is ${value.toDateString()}`);
    };

    // Function to handle selected Year change
    const handleYearChange = (value) => {
        const yearValue = value.getFullYear();
        setCalendarText(`${yearValue} Year  is selected`);
    };

    // Function to handle selected Month change
    const handleMonthChange = (value) => {
        const monthValue = allMonthValues[value.getMonth()];
        setCalendarText(`${monthValue} Month  is selected`);
    };

    return (
        <div>
            <NavigationBar />
            <div className="app-calendar">
                <h2 className="calendar-details">{calendarText}
                    <div>
                        Informacje o ilosci zadan
                        <li>

                        </li>
                        <li>

                        </li><li>

                    </li><li>

                    </li>



                    </div>
                </h2>

                <Calendar
                    onClickMonth={handleMonthChange}
                    onClickYear={handleYearChange}
                    onChange={handleDateChange}
                    value={selectedDate}
                />

            </div>
            <LogoutIcon onClick={handleSignOut} className="logout-icon" />
        </div>
    );
}

export default Calendarsheet;
