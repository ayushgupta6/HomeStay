import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(()=> {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);
    return(
        <div>
            <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
                {places.length>0 && places.map(place => (
                    <Link to={'/place/'+place._id} >
                        <div  className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className=" rounded-2xl  aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-gray-600 text-sm ">{place.title}</h3>
                        <h3 className="font-bold mt-1">{"₹"+place.price+'  per night'}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default IndexPage;