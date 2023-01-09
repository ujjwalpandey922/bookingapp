import "./Hotel.css";
import Header from "../../components/Headerr/Header";
import Navbar from "../../components/Navbar/Navbar";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight ,AiOutlineCloseCircle} from "react-icons/ai";

import MailList from "../../components/MainList/MailList";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useSearchContext from "../../hooks/useSearchContext";
import useAuthContext from "../../hooks/useAuthContext";
import Reserve from "../../components/reserve/Reserve";
const Hotel = () => {
  const [openImg, setOpenImg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgNumber, setImgNumber] = useState(0);
  const param = useParams();
 const {data,loading,error,reFetch} = useFetch(`http://localhost:5000/api/hotels/find/${param.id}`);
 const {...state } = useSearchContext();
 const {user} = useAuthContext();
 const navTo = useNavigate();
  const handleOpen =(i)=>{
    setImgNumber(i);
    setOpenImg(true)
  }

  //----------------NUMBER OF DAYS --------------
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
 const days = dayDifference(state.dates[0].endDate, state.dates[0].startDate);
  
  //-----------------TOGGLE IMAGES---------------------------
  const arrows=(direction) =>{
    let NewNumb;
      if(direction==="l"){
          NewNumb = (imgNumber ===0? data.photos.length-1 : imgNumber-1) 
      }
      else if(direction==="r"){
        NewNumb = (imgNumber===data.photos.length-1? 0 : imgNumber+1)
      }
      setImgNumber(NewNumb)
  }

  const handleReserve =()=>{
    if(user){
      setOpenModal(true);
    }else{
      navTo('/login')
    }
  }
  return <div>
    <Navbar/>
    <Header type="list"/>
   { loading ? "LOADING" : <div className="hotelContainer">
        {openImg && <div className="slider">
        <AiOutlineArrowLeft className="arrow" onClick={()=>arrows("l")}/>
        <AiOutlineCloseCircle className="closeSlider" onClick={()=>setOpenImg(false)}/>
        <div className="sliderWrapper">
          <img src={data.photos[imgNumber]} alt="img" />
        </div>
        <AiOutlineArrowRight className="arrow"  onClick={()=>arrows("r")}/>
        </div>
        }
      <div className="hotelWrapper">
        <h1 className="hotelTitle">{data.name}</h1>
        <button className="booking" onClick={handleReserve}>BOOK NOW</button>
        <div className="hotelAddress">
          <MdLocationOn/>
          <span>{data.address}</span>
        </div>
        <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over  ₹{data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImage">
            {data.photos?.map((e,i)=>(
              <div className="imageContainer" key={i}>
                <img src={e} alt="images"  className="image" onClick={()=>handleOpen(i)}/>
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of {data.rating}!
              </span>
              <h2>
                <b>₹{data.cheapestPrice * days * state.personInfo.room}</b> ({days} nights)
              </h2>
              <button onClick={handleReserve} >Reserve or Book Now!</button>
            </div>
          </div>
       
      </div>
      <MailList/>
      <Footer/>
    </div>}
    {
      openModal &&
      <Reserve setOpenModal={setOpenModal} hotelId={param.id}/>
    }
  </div>;
};

export default Hotel;
