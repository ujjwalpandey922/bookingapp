import "./Header.css"
import {MdHotel} from "react-icons/md"
import {MdOutlineFlight} from "react-icons/md"
import {AiFillCar} from "react-icons/ai"
import {GiBarracksTent} from "react-icons/gi"
import {FaBus} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {BsFillCalendar2DayFill} from "react-icons/bs"
import {GiPerson} from "react-icons/gi"
import { DateRange } from 'react-date-range';
import { useState } from "react"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import useSearchContext from "../../hooks/useSearchContext"
import useAuthContext from "../../hooks/useAuthContext"

const Header = ({type}) => {
    const { user } = useAuthContext();
    const [dates, setDates] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])
    const [personInfo, setPersonInfo] = useState({
        adult:2,
        children:0,
        room:1
    })
    const [toggleDate, setToggleDate] = useState(false)
    const [toggleInfo, setToggleInfo] = useState(false)
    const [destination, setDestination] = useState("")
    const navTo = useNavigate();

    const handleCounterButton=(type,counter)=>{
        setPersonInfo(pre=>({...pre,[type]:counter==="inc"? personInfo[type] + 1: personInfo[type] -1}))
    }
     const {dispatch} = useSearchContext();
    const handleSearch =()=>{
         dispatch({type:"NEW_SEARCH",payload:{destination,dates,personInfo}})
        navTo("/hotels",{state:{destination,dates,personInfo}})
    }
  return (
    <div className={type=="list"?"header list-mode":"header"}>
        <div className="header-Container">
            <div className="headerList-Item active">
                <MdHotel/>
                <span> Stay</span>
            </div>
            <div className="headerList-Item">
                <MdOutlineFlight/>
                <span> Fly</span>
            </div>
            <div className="headerList-Item">
                <AiFillCar/>
                <span> Rent a Car</span>
            </div>
            <div className="headerList-Item">
                <GiBarracksTent />
                <span> Explore</span>
            </div>
            <div className="headerList-Item">
                <FaBus/>
                <span> Bus Stop</span>
            </div>
        </div>
        {type !=="list" &&      
        <> 
        <h1 className="headerTitle">Welcome to Hotel Booking</h1>
        <p> Search low prices on hotels, homes and much more... </p>
        <button className={user?"custom dis":"custom"} onClick={()=>navTo("/registration")} >{user?`Hi ${user.userName}`:"Register / Log In"}</button>
        <div className="headerSearch">
            <div className="headerSearch-item">
                <AiOutlineSearch/>
                <input type="text" placeholder="Enter Where You Wanna Go" className="search" onChange={(e)=>setDestination(e.target.value)}/>
            </div>
            <div className="headerSearch-item" onClick={()=>setToggleDate(!toggleDate)}>
                <BsFillCalendar2DayFill/>
                <span>{`${format(dates[0].startDate,"dd/MM/yyy")} to ${format(dates[0].endDate,"dd/MM/yyy")}`}</span>
            </div>
                {toggleDate && <DateRange
                    className="calenderDate"
                    ranges={dates}
                    onChange={i => setDates([i.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                /> }
            <div className="headerSearch-item" onClick={()=>setToggleInfo(!toggleInfo)}>
                <GiPerson/>
                <span>{`${personInfo.adult}  ${personInfo.adult == 1 ?  "adult":"adults"} . ${personInfo.children} Children . ${personInfo.room} ${personInfo.room == 1 ?"room":"rooms"}  `}</span> 
            </div>
                {
                   toggleInfo &&     
                <div className="options">
                    <div className="option-items">
                        <span>Adult</span>
                        <div className="option-items-group">

                        <button className="counterButton" disabled={personInfo.adult<=1} onClick={()=>handleCounterButton("adult","dec")}>-</button>
                        <span>{personInfo.adult}</span>
                        <button className="counterButton" onClick={()=>handleCounterButton("adult","inc")}>+</button>
                        </div>
                    </div>
                    <div className="option-items">
                        <span>Children</span>
                        <div className="option-items-group">
                        <button className="counterButton" disabled={personInfo.children<=0} onClick={()=>handleCounterButton("children","dec")}>-</button>
                        <span>{personInfo.children}</span>
                        <button className="counterButton" onClick={()=>handleCounterButton("children","inc")}>+</button>

                        </div>

                    </div>
                    <div className="option-items">
                        <span>Room</span>
                        <div className="option-items-group">

                        <button className="counterButton" disabled={personInfo.room<=1} onClick={()=>handleCounterButton("room","dec")}>-</button>
                        <span>{personInfo.room}</span>
                        <button className="counterButton" onClick={()=>handleCounterButton("room","inc")}>+</button>

                        </div>
                    </div>
                </div>
                }                
            <button className="handleSearch" onClick={handleSearch}>Search</button>
        </div>
        </>
        }
    </div>
  )
}

export default Header
