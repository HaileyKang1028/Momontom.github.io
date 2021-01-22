const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LOCALSTORAGE = "currentUser",
    SHOWING_CLASSNAME = "showing";


function saveName(text){
    localStorage.setItem(USER_LOCALSTORAGE, text);
}

function handleSubmit(event) {
    // when user press enter, it supposed to disappear the content
    // but, preventDefalut make removing the defalt
    event.preventDefault();
    // User input content will remain
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CLASSNAME);
    // if something submit this form
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CLASSNAME);
    greeting.classList.add(SHOWING_CLASSNAME);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LOCALSTORAGE);
    if(currentUser === null) {
        // if there are not currentUser ask for his name
        askForName();
    } else { //she is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();