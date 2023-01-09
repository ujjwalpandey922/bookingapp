import { Link } from "react-router-dom";
import "./search.css";

const Search = ({items}) => {
  return (
    <div className="searchItem">
    <img
      src={items.photos.length>0?items.photos[0]:null}
      alt="single image"
      className="siImg"
    />
    <div className="siDesc">
      <h1 className="siTitle">{items.name}</h1>
      <span className="siDistance">{items.distance}m from center</span>
      <span className="siTaxiOp">Free airport taxi</span>
      <span className="siSubtitle">
        Studio Apartment with Air conditioning
      </span>
      <span className="siFeatures">
        {items.desc}
      </span>
      <span className="siCancelOp">Free cancellation </span>
      <span className="siCancelOpSubtitle">
        You can cancel later, so lock in this great price today!
      </span>
    </div>
    <div className="siDetails">
      {items.rating &&<div className="siRating">
        <span>Excellent</span>
        <button>{items.rating}</button>
      </div>}
      <div className="siDetailTexts">
        <span className="siPrice">₹ {items.cheapestPrice}/-</span>
        <span className="siTaxOp">Includes taxes and fees</span>
        <Link to={`/hotels/${items._id} `}>

        <button className="siCheckButton">See availability</button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Search
