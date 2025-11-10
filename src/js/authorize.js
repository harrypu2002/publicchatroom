import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,signInWithPopup,GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";


export function Authorize(){

    // Signup
    const registerUser = async(fullname,email,password) => {

        const defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

        try{

            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            // console.log(user);

            await updateProfile(user,{
                displayName:fullname,
                photoURL: defaultprofileimg
            }).then(() => {

                // set name to localstorage
                setLocalName(user);

                // Redirect to index.html
                window.location.href = "../index.html";
            });

        }catch(error){
            console.log("Error registering users : ",error);
        }

    };

    // Signin
    const loginUser = (email,password) => {

        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {

            // console.log(userCredential.user);

            // set name to localstorage
            setLocalName(userCredential.user);
            
            // Redirect to index.html
            window.location.href = "../index.html";
            
        })
        .catch((error) => {
            console.log("Error logging in : ",error.message);
        });

    };

    // Signout
    const logoutUser = () => {

        signOut(auth).then(() => {

            // unset name from localstorage
            unsetLocalName();

            window.location.href = "../signin.html";
            
        }).catch((error) => {
            console.log("Error logging out = ",error.message);
        });

    };

    // Reset Password
    const resetPassword = async(email,msg) => {

        try{

            await sendPasswordResetEmail(auth,email);

            msg.textContent = "Password reset email send.Please check your inbox.";
            msg.style.fontSize = "11px";
            msg.style.color = "green";

        }catch{

            console.error("Error sending password reset email = ",error.message);

            msg.textContent = `Error ${error.message}`;
            msg.style.fontSize = "11px";
            msg.style.color = "red";

        }

    };
    
    // Google Signin
    const googleLogin = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {

            // console.log(result);

            // set name to localstorage
            setLocalName(result.user.displayName);

            // Redirect to index.html
            window.location.href = "../index.html";

        }).catch((error) => {
            console.error("Error with Google sign-in = ",error.message);
        });

    };

    // Auth Check
    const isLoggedIn = () => {

        onAuthStateChanged(auth,(userdata) => {

            if(userdata){
                return true;
            }else{
                // Redirect to sign.html
                window.location.href = "../signin.html";
            }

        });

    };

    // Get User Info
    const getUser = (callback) => {

        // callback("Hello sir");

        onAuthStateChanged(auth,(userdata) => {

            if(userdata){
                callback(userdata);
            }

        });

    };

    const setLocalName = (userdata) => {
        localStorage.setItem('username',userdata.displayName);
    };

    const unsetLocalName = () => {
        localStorage.removeItem('username');
    };

    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLoggedIn,getUser};

};