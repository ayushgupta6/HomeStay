import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [noOfGuests, setnoOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user)
            setName(user.name);
    }, [user]);

    let noOfNights = 0;
    if(checkIn && checkOut){
        noOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookingPlace() {
        const {data} = await axios.post('/bookings', {place: place._id, 
            checkIn, checkOut, noOfGuests, name,
            phone: mobile, 
            price: noOfNights*place.price 
        });
        setRedirect(`/account/bookings/${data._id}`);
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <p className="text-2xl text-center">
                Price: ₹{place.price}/per night
            </p>
            <div className="border border-gray-400 rounded-2xl mt-4">
                <div className="grid grid-cols-2">
                    <div className="py-2 px-4">
                        <p>Check In:</p>
                        <input 
                            value={checkIn} 
                            onChange={(ev) => setCheckIn(ev.target.value)} 
                            type="date"
                        />
                    </div>
                    <div className="py-2 px-4 border-l border-gray-400">
                        <p>Check Out:</p>
                        <input 
                            value={checkOut} 
                            onChange={(ev) => setCheckOut(ev.target.value)} 
                            type="date"    
                        />
                    </div>
                </div>
                <div className="py-2 px-4 border-t border-gray-400">
                    <p>No. of Guests:</p>
                    <input 
                        value={noOfGuests}
                        onChange={(ev) => setnoOfGuests(ev.target.value)} 
                        type="number"
                    />
                </div>
                {noOfNights>0 && (
                    <div>
                        <div className="py-2 px-4 border-t border-gray-400">
                            <p>Name of Guest:</p>
                            <input 
                                value={name}
                                onChange={(ev) => setName(ev.target.value)} 
                                type="text"
                            />
                        </div>
                        <div className="py-2 px-4">
                            <p>Mobile no. of Guest:</p>
                            <input 
                                value={mobile}
                                onChange={(ev) => setMobile(ev.target.value)} 
                                type="tel"
                            />
                        </div>
                    </div>
                )}
            </div>
            <button onClick={bookingPlace} className=" mt-4 primary">
                Book this Place 
                { noOfNights>0 && (
                    <span> at ₹{noOfNights*place.price} for {noOfNights} nights</span>
                )}
                 
            </button> 
        </div>
    );
}

export default BookingWidget;