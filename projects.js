"use strict"

var dateExp = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);

function addValue(title, date, desc) {
    // Adding a list item to the ul with a id of display
    const inner = $("#display");
    const titleElement = document.createElement("ul");
    const dateElement = document.createElement("li");
    const descElement = document.createElement("li");
    titleElement.append(title.val());
    dateElement.append("Start Date: " + date.val());
    descElement.append("Description: " + desc.val());
    titleElement.append(dateElement);
    titleElement.append(descElement);
    inner.append(titleElement);
    $("#display ul:last-child").click(() => {
        titleElement.remove();
    });
    
    // Setting class based upon current mode
    if ($("body").attr("class") == "lightMode") {
        $("#display ul").addClass("lightMode");
        $("#display ul li").addClass("lightMode");
    }
}

const modeChange = () => {
    //Grabbing all html elements and switching their class
    let elements = document.querySelectorAll("*");

    elements.forEach((element) => {
        element.classList.toggle("lightMode");
    });
}

$("document").ready(() => {

    $("#change").click(modeChange);
    $("#addButton").click( () => {
        
        // Getting values from form
        const title = $("#title");
        const date = $("#start");
        const desc = $("#desc");

        let isValid = true;
        
        // Validating Data
        if (title.val() == "") {
            title.next().text("Title is required");
            isValid = false;
        } else {
            title.next().text("");
        }

        if (date.val() == "") {
            date.next().text("Date is required");
            isValid = false;
        } else if (!dateExp.test(date.val())){
            date.next().text("Date format must be mm/dd/yyyy or dd/mm/yyyy");
            isValid = false;
        } else {
            date.next().text("");
        }

        if (desc.val() == "") {
            desc.next().text("Description is required");
            isValid = false;
        } else {
            desc.next().text("");
        }

        if (isValid) {
            addValue(title, date, desc);
            title.val("");
            title.next().text("* required");
            date.val("");
            date.next().text("* required");
            desc.val("");
            desc.next("").text("* required");
        }
    });

});