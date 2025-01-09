import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoMdCart } from "react-icons/io";
import "../styles/header.css";
import { useState } from "react";

const routes = [
    {name: "Shop", route: "/shop"},
    {name: "Men", route: "/men"},
    {name: "Women", route: "/women"},
    {name: "Kids", route: "/kids"},
]

export default function Header(){

    const [toggleBtn, setToggleBtn] = useState(true)

    function toggleLoginBtn(){
        setToggleBtn(toggle => !toggle)
    }

    return(
        <nav>
            <div className="logo">
                <img src={Logo} alt="Logo" />
                <p>SHOPPER</p>
            </div>

            <ul className="nav_list">
                {
                    routes.map(routeLink =>{
                        const { name, route} = routeLink;
                        return(
                            <li key={route}>
                                <NavLink className={({isActive})=> isActive ? "active" : ""} to={route}>{name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="right">
                <button className="border-2" onClick={toggleLoginBtn}>{toggleBtn ? "Log Out" : "Login"}</button>
                <IoMdCart className="icon"/>
                <div className="nav-cart-count">0</div>
            </div>
        </nav>
    )
}