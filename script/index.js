// ^variables
let userName = document.getElementById('name');
let emailSign = document.getElementById('emailSign');
let passwordSign = document.getElementById('passwordSign');
let btnSign = document.getElementById('btnSign');
let emptyInput = document.querySelector('.emptyInput');
let registered = document.querySelector('.registered');
let success = document.querySelector('.success');
let emailLogin = document.getElementById('email');
let passwordlogin = document.getElementById('password');
let btnLogin = document.querySelector('.btnLogin');
let notIdentical = document.querySelector('.notIdentical')
let emptyInputs = document.querySelector('.emptyInputs');
let index;
let display=document.getElementById('display')
let userList;

// *events
if (location.href.includes('sign%20up')){
    btnSign.addEventListener('click', function () {
        signUp();
    })
    userName.oninput = function () {
        validateName();
    }
    emailSign.oninput = function () {
        validateEmail();
    }
    passwordSign.oninput = function () {
        validatePass();
    }
}
else if (location.href.includes('index')){
    btnLogin.addEventListener('click',function () {
        login();
    })
}
// * get from local srorage or initialize userlist as array
if(JSON.parse(localStorage.getItem('userList'))!=null){
    userList = JSON.parse(localStorage.getItem('userList'))
}
else{
    userList=[];
}
//^ sign up func
function signUp() {
    success.classList.replace('d-block', 'd-none')
    if(validateName()&&validateEmail()&&validatePass()&&isEmailNew()){
        emptyInput.classList.replace('d-block', 'd-none')
        registered.classList.replace('d-block', 'd-none')
        let user = {
            name: userName.value,
            email: emailSign.value,
            password: passwordSign.value
        }
        userList.push(user)
        // console.log(userList);
        storeUser();
        clearInput();
        success.classList.replace('d-none', 'd-block')
    }
    else{
        if (userName.value===''||emailSign.value===''||passwordSign.value==='') {
            emptyInput.classList.replace('d-none','d-block')
        }
    }
}
// ^clear input
function clearInput() {
    userName.value=null;
    emailSign.value=null;
    passwordSign.value=null;
    userName.classList.remove('is-valid')
    emailSign.classList.remove('is-valid')
    passwordSign.classList.remove('is-valid')
}
// *add to local storage func
function storeUser() {
    localStorage.setItem('userList',JSON.stringify(userList));
}

// ^sign up validation on all sign up inputs

function validateName(){
    let regex=/^[a-z A-Z]{3,30}$/g
    if(regex.test(userName.value)){
        userName.classList.add('is-valid')
        userName.classList.remove('is-invalid')
        return true
    }
    else{
        userName.classList.add('is-invalid')
        userName.classList.remove('is-valid')
        return false
    }
}

function validateEmail() {
    let regex =/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    if(regex.test(emailSign.value)){
        emailSign.classList.add('is-valid')
        emailSign.classList.remove('is-invalid')
        return true
    }
    else {
        emailSign.classList.add('is-invalid')
        emailSign.classList.remove('is-valid')
        return false
    }
}

function validatePass() {
    let regex = /^[a-zA-Z0-9#?!@$%^&*-_]{8,}/g
    if (regex.test(passwordSign.value)) {
        passwordSign.classList.add('is-valid')
        passwordSign.classList.remove('is-invalid')
        return true
    }
    else {
        passwordSign.classList.add('is-invalid')
        passwordSign.classList.remove('is-valid')
        return false
    }
}
function isEmailNew() {
    for (let i = 0; i < userList.length; i++) {
        if (emailSign.value === userList[i].email) {
            registered.classList.replace('d-none', 'd-block');
            return false
        }
    }
    return true
}

// *login func
function login() {
    clearMessages();
    for (let i = 0; i < userList.length; i++) {
        if(emailLogin.value===userList[i].email&&passwordlogin.value===userList[i].password){
            index=i;
            storeIndex();
            location.href =location.href.replace('index','home')
            return 
        }
    }
    if (emailLogin.value === '' || passwordlogin.value === '') {
        emptyInputs.classList.replace('d-none', 'd-block');
    }
    else {
        notIdentical.classList.replace('d-none', 'd-block');
    }
}
// *clear stored alerts
    function clearMessages() {
        notIdentical.classList.replace('d-block', 'd-none');
        emptyInputs.classList.replace('d-block', 'd-none');
    }
// ^store index at local srorage
function storeIndex() {
    localStorage.setItem('index',index)
}
function getIndex(){
    index=+localStorage.getItem('index')
}

// *display name
if (location.href.includes('home')) {
getIndex();
display.innerHTML=`${userList[index].name}`
}
