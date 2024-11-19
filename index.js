"use strict"

const $ = selector => document.querySelector(selector);

// Initializing Variables
const imageCache = [];
let imageCounter = 0;
let image = null;

const mainImage = $("#slideshow");   // the img element for the show

const modeChange = () => {
    //Grabbing all html elements and switching their class
    let elements = document.querySelectorAll("*");

    elements.forEach((element) => {
        element.classList.toggle("lightMode");
    });
}

const runSlideShow = function() {
    imageCounter = (imageCounter + 1) % imageCache.length;
    image = imageCache[imageCounter];
    mainImage.src = image.src;
    mainImage.alt = image.alt;
};

document.addEventListener("DOMContentLoaded", () => {

	$("#change").addEventListener("click", modeChange);

    const links = $("#imageList").querySelectorAll("a");
    let timer;

    // process image links
    for ( let link of links ) {
        // Preload image and copy title properties
        image = new Image();
        image.src = link.href;
        image.alt = link.title;

        // add image to array 
        imageCache[imageCache.length] = image;
    }

    $("#startButton").addEventListener("click", () => {
        // Calling run slide show method
        runSlideShow();

        timer = setInterval(runSlideShow, 5000); // 5 second invertval between calling runSlideShow

        $("#startButton").disabled = true;
        $("#stopButton").disabled = false;
    });

    $("#stopButton").addEventListener("click", () => {
        // Clearing the timer
        clearInterval(timer);

        $("#startButton").disabled = false;
        $("#stopButton").disabled = true;
    });
});