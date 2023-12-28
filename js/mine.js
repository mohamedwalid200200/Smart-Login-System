var user={};
var users=[];
var newNameInput=document.getElementById("newUserName");
var newEmailInput=document.getElementById("newUserEmail");
var newPassInput=document.getElementById("newUserPass");
var signUpBtn=document.getElementById("signUpBtn");
var loginEmail=document.getElementById("loginEmail");
var loginPass=document.getElementById("loginPass");
var loginButton=document.getElementById("loginBtn");
// ================Sign up===================
getUsers();
var nameRegex=/^\w{3,}$/i;
var emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var passwordRegex=/^\w{8,}$/i;
function validateName(){
    if(nameRegex.test(newNameInput.value)){
        return true;
    }
}
function validateEmail(){
    if(emailRegex.test(newEmailInput.value)){
        return true;
    }
}
function validatePass(){
    if(passwordRegex.test(newPassInput.value)){
        return true;
    }
}
function validate(){
    if(validateName() == true && validateEmail() == true && validatePass() == true){
        return true;
    }
}
function addUser(){
    user={ uName: newNameInput.value ,
        uEmail: newEmailInput.value ,
        uPass: newPassInput.value
    };
    inputsEmailValidiation();
    emptyUsers();
}
function getUsers(){
    if(localStorage.getItem("users")!=null){
        users=JSON.parse(localStorage.getItem("users"))}
}
function emptyUsers(){
    if (users.length == 0) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
}
}
function emailExist(){
    for (var i = 0; i < users.length; i++) {
        if(users[i].uEmail == newEmailInput.value){
            return true;
        }
    }
}
function inputsEmailValidiation(){
    if(newNameInput.value == "" || newEmailInput.value == "" || newPassInput.value == "" ){
        document.getElementById("emptyInput").classList.replace("d-none" , "d-block");
        document.getElementById("success").classList.replace("d-block" , "d-none");
        document.getElementById("exists").classList.replace("d-block" , "d-none");
        document.getElementById("invalid").classList.replace("d-block" , "d-none");
    }else{
        document.getElementById("emptyInput").classList.replace("d-block" , "d-none");
        if(emailExist() == true){
            document.getElementById("exists").classList.replace("d-none" , "d-block");
            document.getElementById("success").classList.replace("d-block" , "d-none");
            document.getElementById("invalid").classList.replace("d-block" , "d-none");
        } else {
            if (validate() == true){
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users))
            document.getElementById("success").classList.replace("d-none" , "d-block");
            document.getElementById("exists").classList.replace("d-block" , "d-none");
            document.getElementById("invalid").classList.replace("d-block" , "d-none");
            }else{
                document.getElementById("exists").classList.replace("d-block" , "d-none");
                document.getElementById("invalid").classList.replace("d-none" , "d-block");
            }
        }
    }
}
// ================Login and welcome page===================
var userName="";
function loginCheck(){
    for (var i = 0; i < users.length; i++) {
        if(users[i].uEmail == loginEmail.value && users[i].uPass == loginPass.value ){
            userName=users[i].uName
            localStorage.setItem('username',userName)
            return true;
        }
    }
}
function login(){
    if(loginEmail.value == "" || loginPass.value == ""){
        document.getElementById("emptyInput").classList.replace("d-none" , "d-block");
        document.getElementById("incorrect").classList.replace("d-block" , "d-none");
    }else{
        document.getElementById("emptyInput").classList.replace("d-block" , "d-none");
        if(loginCheck() == true){
            document.getElementById("emptyInput").classList.replace("d-block" , "d-none");
            document.getElementById("incorrect").classList.replace("d-block" , "d-none");
            document.getElementById("loginBtn").setAttribute("href","home.html");
        }
        else{
            document.getElementById("incorrect").classList.replace("d-none" , "d-block");
            document.getElementById("emptyInput").classList.replace("d-block" , "d-none");
        }
    }
}
userName=localStorage.getItem("username");
if(userName !=""){
    document.getElementById("welcome").innerHTML="Welcome " + userName;
}
// ================Logout===================
function logOut(){
    localStorage.removeItem("username");
}
