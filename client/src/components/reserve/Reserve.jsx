import axios from "axios";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import useSearchContext from "../../hooks/useSearchContext";
import "./reserve.css";

const Reserve = ({ setOpenModal, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const BackendAddress =
    "https://bookingapp-l6as.onrender.com/" || "http://localhost:5000/";
  const { data, loading, error } = useFetch(
    `${BackendAddress}api/hotels/getrooms/${hotelId}`
  );
  const { ...state } = useSearchContext();
  const navTo = useNavigate();
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((e) => e != value)
    );
  };
  // getdateinrange -------------------

  const getDateInRange = (startDate, endDate) => {
    const startDay = new Date(startDate);
    const endDay = new Date(endDate);
    const newDate = new Date(startDay.getTime());
    const ListDate = [];
    while (newDate <= endDay) {
      ListDate.push(new Date(newDate).getTime());
      newDate.setDate(newDate.getDate() + 1);
    }
    return ListDate;
  };
  const allDates = getDateInRange(
    state.dates[0].startDate,
    state.dates[0].endDate
  );
  //handle CLICK --------------
  const handleClick = async () => {
    try {
      const allRooms = await Promise.all(
        selectedRooms.map((e) => {
          const res = axios.put(`/api/rooms/availableRooms/${e}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      if (allRooms.length === 0) {
        setOpenModal(false);
      } else {
        setOpenModal(false);
        navTo("/", { state: allRooms.length });
      }
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((e) =>
      allDates.includes(new Date(e).getTime())
    );

    return !isFound;
  };

  return (
    <div className="reserve">
      <div className="rcontainer">
        <AiFillCloseCircle
          onClick={() => setOpenModal(false)}
          className="rclose"
        />
        <em>Select your hotel room</em>
        <div className="rrooms">
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">
                  🛌 <u>{item.title} </u>
                </div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">₹ {item.price} /-</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumber.map((sroomNumber) => (
                  <div className="room" key={sroomNumber._id}>
                    <label>{sroomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={sroomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(sroomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reserve;
