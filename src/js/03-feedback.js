const throttle = require("lodash.throttle");

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

pageReload();

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function pageReload() {
    const saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if(saveMessage?.email) {
        refs.input.value = saveMessage.email;
        formData.email = saveMessage.email;     
    }
    if(saveMessage?.message) {
        refs.textarea.value = saveMessage.message;
        formData.message = saveMessage.message;
    }
}
