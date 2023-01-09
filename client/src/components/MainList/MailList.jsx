import React from "react";
import "./MailList.css";

const MailList = () => {
  return (
    <div className="mail">
         <h1 className="mailTitle"> Save Time, Save Money </h1>
      <span>Give us your email and get the latest updates</span>
     <div className="mailContainer">
      <input type="text" placeholder="Enter Email" />
      <button >Subscribe</button>
     </div>
    </div>
  )
}

export default MailList
