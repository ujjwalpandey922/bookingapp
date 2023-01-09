import { useLocation } from "react-router-dom";
import FavProperties from "../../components/favProperties/FavProperties";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headerr/Header";
import MailList from "../../components/MainList/MailList";
import Navbar from "../../components/Navbar/Navbar";
import PropertyList from "../../components/Property/PropertyList";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if(location.state!==0 && location.state!==null){
      toast("Room Booked",{position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,})
    }
  }, [])
  console.log(location);
  return (
  <>
  <Navbar/>
  <Header/>
  <div className="list-container">
      <Featured/>   
      <h1>Browse By Property</h1>
      <PropertyList/>
      <h1>Homes guests Love</h1>
      <FavProperties/>
      <MailList/>
      <Footer/>
      <ToastContainer/>
  </div>
  </>
    )
};

export default Home;
