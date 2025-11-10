import "@fortawesome/fontawesome-free/css/all.min.css";
import { Authorize } from "./authorize.js";

// UI
const signinform = document.getElementById('signinform');
const googleloginbtn = document.getElementById('googleloginbtn');

// Login
signinform.addEventListener('submit',function(e){
    e.preventDefault();

    const signinemail = document.getElementById('signinemail').value.trim();
    const signinpassword = document.getElementById('signinpassword').value.trim();
    
    console.log(signinemail,signinpassword);

    const {loginUser} = Authorize();
    loginUser(signinemail,signinpassword);

});


// Google Login
googleloginbtn.addEventListener('click',function(){

    const {googleLogin} = Authorize();
    googleLogin();

});