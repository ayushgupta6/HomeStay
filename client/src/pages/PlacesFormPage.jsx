import { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotoUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (<h2 className="text-xl mt-4">{text}</h2>);
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeState ={ title, address, addedPhotos,
                            description, perks, extraInfo,
                            checkIn, checkOut, maxGuests, price};
        if(id) {
            await axios.put('/places', { id, ...placeState});
        }
        else {
            await axios.post('/places', placeState);
        }
        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {inputHeader('Title')}
                <input type="text" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                    placeholder="title, ex: My lovely Home" />
                {inputHeader('Address')}
                <input type="text" 
                    value={address} 
                    onChange={ev => setAddress(ev.target.value)} 
                    placeholder="Address of your place" />
                {inputHeader('Photos')}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {inputHeader('Description')}
                <textarea value={description} 
                    onChange={ev => setDescription(ev.target.value)} 
                    placeholder="Write the description of your home"  />
                {inputHeader('Perks')}
                <div className="grid gap-2 grid-col-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                {inputHeader('Extra info')}
                <textarea value={extraInfo} 
                    onChange={ev => setExtraInfo(ev.target.value)} />
                {inputHeader('Price, Check In,Out times and MaxGuests')}
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="mt-2 -mb-1">
                        <h3>Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14"/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>Check Out time</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>No of Guest Allowed</h3>
                        <input type="number" value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>Price Per Night</h3>
                        <input type="number" value={price}
                            onChange={ev => setPrice(ev.target.value)}></input>
                    </div>
                </div>
                <div className="my-4">
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    );
}