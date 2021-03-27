import React from "react";

export default function header(props){
        return(
            <div className="header">
                <button onClick={() => props.handleMonthChange(-1)}>Previous</button>
                <h2>{props.month}</h2>
                <button onClick={() => props.handleMonthChange(1)}>Next</button>
            </div>
        ) 
}