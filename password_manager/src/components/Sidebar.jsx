import React from 'react'
import "../App.css";
import {FaBars } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdPassword,MdOutlineHealthAndSafety } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar({children}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: "/passwords",
      name: "Passwords",
      icon: <RiLockPasswordFill />,
    },
    {
      path: "/addpassword",
      name: "Add Password",
      icon: <MdPassword />, 
    },
    {
      path: "/passgen",
      name: "Password Generator",
      icon: <IoMdCreate/>,
    },
    {
      path: "/passhealth",
      name: "Password Health",
      icon: <MdOutlineHealthAndSafety />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <BiLogOut />,
    },
  ];


  return (
    <div className="con">
      <div className="sidebar" style={{width: isOpen ? "270px" : "70px"}}>
        <div className="top_section">
          <h1 className="passman" style={{display: isOpen ? "block" : "none"}}>Password Manager</h1>
          <div onClick={toggle} className="bars" style={{marginLeft: isOpen ? "85px" : "0px"}}>
            <FaBars />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink className="link" to={item.path} key={index} activeclassname="active" >
            <div className="icon">{item.icon}</div>
            <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main className="dashItem">{children}</main>
    </div>
  )
}
