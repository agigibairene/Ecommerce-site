import { Link } from "react-router-dom";
import Input from "../utils/Input";
import { useState } from "react";
import checkValidData from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";


export default function Login(){
    
        const [userInput, setUserInput] = useState({
            email: "",
            password: "",
            checked: false
        });

        const [errors, setErrors] = useState({});
        const navigate = useNavigate();

        function handleUserInput(event){
            const {name, value, type, checked} = event.target
            setUserInput(prevData =>{
                return {
                    ...prevData,
                    [name]: type === "checkbox" ? checked : value,                }
            })
        }

        function validateInput(){
            const {emailRegex, passwordRegex, usernameRegex} = checkValidData(userInput.email, userInput.password, "");
            const formErrors = {
                email: emailRegex ? "" : "Please enter a valid email address",
                password: passwordRegex ? "" : "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.",
                username: usernameRegex ? "" : ""
            }
            setErrors(formErrors);

            return Object.values(formErrors).every((error) => error === "");
        }

        async function handleSubmit(event){
            event.preventDefault();
            const isValid = validateInput();

            if (isValid){
                try{
                    const userCrendentials = await signInWithEmailAndPassword(auth, userInput.email, userInput.password);
                console.log(userCrendentials.user);
                navigate("/home");
                }
                catch (err) {
                    console.log(err);
                    const message = err.message
                    setErrors({
                        general:  message === "auth/wrong-password"
                        ? "Invalid password."
                        : "An unexpected error occurred."
                    })
                }
            }
            return;

            

        }

    return(
        <form onSubmit={handleSubmit} className="flex mt-12  shadow-lg shadow-white-500/50 bg-white w-4/12 px-8 py-12 rounded-md flex-col mx-auto">
            <h1 className="text-left font-bold text-xl">Login</h1>
            <Input name="email" type="text" placeholder="Email address" value={userInput.email} onChange={handleUserInput}/>
            {errors.email && <p className="text-red-500">{errors.email}</p>}


            <Input name="password" type="password" placeholder="Password" value={userInput.password} onChange={handleUserInput}/>
            {errors.password && <p className="text-red-500">{errors.password}</p>}


            <button className="bg-red-500 w-full py-3 text-white my-4 rounded-sm">Continue</button>
            <p className="">Create an account? <Link to="/signup" className="text-red-500 font-medium">Click here</Link></p>
            <div className="flex items-center space-x-2 mt-2">
                <input 
                    name="checked" 
                    checked={userInput.checked}
                    type="checkbox" 
                    onChange={handleUserInput}
                    className="w-4 h-4 bg-red-500 border-gray-300 rounded focus:ring-blue-500" 
                />
                <label 
                    htmlFor="checked" 
                    className="text-sm text-gray-700 w-96"
                >
                    By continuing, I agree to the Terms of Use & Privacy Policy.
                </label>
            </div>

        </form>
    )
}