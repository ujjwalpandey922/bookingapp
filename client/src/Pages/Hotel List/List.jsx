import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/Headerr/Header";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import useFetch from "../../hooks/useFetch";
import "./List.css";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [option, setOption] = useState(location.state.personInfo);
  const [dates, setDates] = useState(location.state.dates);
  const [openData, setOpenData] = useState(false);
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const BackendAddress =
    "https://bookingapp-l6as.onrender.com/" || "http://localhost:5000/";
  const { data, loading, error, reFetch } = useFetch(
    `${BackendAddress}api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 10000
    }`
  );
  const handleSearch = () => {
    reFetch();
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="sTitle">Search</h1>
            <div className="listSearchItem">
              <label htmlFor="distination">Destination</label>
              <input type="text" className="input" placeholder={destination} />
            </div>
            <div className="listSearchItem">
              <label htmlFor="distination">Check-in Date :</label>
              <span onClick={() => setOpenData(!openData)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyy")}`}</span>
            </div>
            {openData && (
              <DateRange
                ranges={dates}
                onChange={(i) => setDates([i.selection])}
                minDate={new Date()}
              />
            )}
            <div className="listSearchItem">
              <label htmlFor="distination">Options</label>
              <div className="listSearchItemPadding">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min Price <small>per nigth</small>
                  </span>
                  <input
                    type="text"
                    className="listOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max Price <small>per nigth</small>
                  </span>
                  <input
                    type="text"
                    className="listOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adults</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={option.adult}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="listOptionInput"
                    placeholder={option.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={option.room}
                  />
                </div>
              </div>
            </div>
            <button className="listSearchButton" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "LOADING"
            ) : (
              <>
                {data.length > 0
                  ? data.map((e) => <Search items={e} key={e._id} />)
                  : "FOUND NOTHING"}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
