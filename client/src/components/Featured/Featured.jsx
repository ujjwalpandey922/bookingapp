import useFetch from "../../hooks/useFetch"
import "./Featured.css"
import mumbai from "../../assets/mumbai.jpg";
import  pune from "../../assets/pune.avif";
import lonavala from "../../assets/lonavala.avif";
const Featured = () => {
 const {data,loading,error} = useFetch("/api/hotels/countByCity?cities=pune,mumbai,lonavala");
 
  return (
    <div className="featured">
       { loading?"Loading" :
       <>
       <div className="featuredItem">
            <img
            src={pune}
            alt=""
            className="featuredImg"
            />
            <div className="featuredTitles">

            <h1>Pune</h1>
            <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img
            src={mumbai}
            alt=""
            className="featuredImg"
            />
            <div className="featuredTitles">
            <h1>Mumbai</h1>
            <h2>{data[1]} properties</h2>
            </div>
      </div>
      <div className="featuredItem">
            <img
            src={lonavala}
            alt=""
            className="featuredImg"
            />
            <div className="featuredTitles">
            <h1>Lonavala</h1>
            <h2>{data[2]} properties</h2>
            </div>
    </div>
       </>
    }
</div>
  )
}

export default Featured
