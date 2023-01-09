import useFetch from "../../hooks/useFetch";
import "./FavProperty.css"

const FavProperties = () => {
 const {data,loading,error} = useFetch("http://localhost:5000/api/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      { loading?"LOADING":
        <>
        {
          data.map((element)=>(

          <div className="fpItem" key={element._id}>
            <img
              src={element.photos.length>0?element.photos[0]:null}
              alt="hotel"
              className="fpImg"
            />
            <span className="fpName">{element.name}</span>
            <span className="fpCity">{element.city}</span>
            <span className="fpPrice">Starting from {element.cheapestPrice}</span>
            {element.rating && <div className="fpRating">
              <button>{element.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
          ))
        }
          
        </>
      }
  </div>
  )
}

export default FavProperties
