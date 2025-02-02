import { Link, useNavigate } from "react-router-dom";
import Input from "../utils/Input";
import { useState } from "react";
import checkValidData from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function SignUp(){

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        password: "",
        checked: false
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    function handleUserInput(event){

        const {name, value, type, checked } = event.target
        setUserInput(prevData =>{
            return {
                ...prevData,
                [name]: type === 'checked' ? checked : value
            }
        })
    }

    
    function validateInput() {
        const {emailRegex, passwordRegex, usernameRegex} = checkValidData(userInput.email, userInput.password, userInput.username);
        setErrors({
            email: emailRegex ? "" : "Please enter a valid email address",
            password: passwordRegex ? "" : "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.",
            username: usernameRegex ? "" : "Full name is required"
        })

    }

    async function handleFormSubmit(event){
        event.preventDefault();
        if (validateInput()){
            try{
                const userCrendentials = await createUserWithEmailAndPassword(auth, userInput.email, userInput.password);
                console.log(userCrendentials.user);
                navigate("/home");
            }
            catch(error){
                const errorMessage = error.code
                setErrors({
                    general: errorMessage === "auth/email-already-in-use"
                    ? "Email is already in use."
                    : errorMessage === "auth/wrong-password"
                    ? "Invalid password."
                    : "An unexpected error occurred."
                })
            }
        }
    }

    return(
        <form onSubmit={handleFormSubmit} className="flex  shadow-lg shadow-white-500/50 mt-12 bg-white w-4/12 px-8 py-12 rounded-md flex-col mx-auto">
            <h1 className="text-left font-bold text-xl">Sign Up</h1>
            <Input name="username" type="text" onChange={handleUserInput} placeholder="User Name" value={userInput.username}/>
            {errors.username && <p className="text-red-500">{errors.username}</p>}

            <Input name="email" type="text" placeholder="Email address" onChange={handleUserInput} value={userInput.email}/>
            {errors.email && <p className="text-red-500">{errors.email}</p>}


            <Input name="password" type="password" placeholder="Password" onChange={handleUserInput} value={userInput.password}/>
            {errors.password && <p className="text-red-500">{errors.password}</p>}

            <button className="bg-red-500 w-full py-3 text-white my-4 rounded-sm outline-none">Continue</button>
            {errors.general && <p className="text-red-500">{errors.general}</p>}

            <p className="">Already have an account? <Link to="/login" className="text-red-500 font-medium">Click here</Link></p>
            <div className="flex items-center space-x-2 mt-2">
                <input 
                    name="checked" 
                    type="checkbox" 
                    checked={userInput.checked}
                    onChange={handleUserInput}
                    className="w-4 h-4 bg-red-500 border-gray-300 rounded focus:ring-blue-500" 
                />
                <label 
                    htmlFor="check" 
                    className="text-sm text-gray-700 w-96"
                >
                    By continuing, I agree to the Terms of Use & Privacy Policy.
                </label>
            </div>
        </form>
    )
}