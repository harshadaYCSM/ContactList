import React from 'react';
import './index.css'

let count = 0;
let timerS ;
function LoaderPercent() {
    //document.getElementById("loader").style.display = "block";
    timerS = setInterval(function() {
        if (count > 99) {
            count = 0;
        } 
        count ++;
        //document.getElementById("countDisplay").innerHTML = count + "%";
    }, 200)

    return (
        <div id="countDisplay">
            <img src="./ContactList/loader.gif" id="loader"></img>
        </div>
    )
}

function stopLoading() {
    document.getElementById("loader").style.display = "none";
    count = 0;
    document.getElementById("countDisplay").innerHTML = "Load here";
    clearInterval(timerS);
}

export default LoaderPercent