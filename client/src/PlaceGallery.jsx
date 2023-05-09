import {useState} from "react";

export default function PlaceGallery({place}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
        <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div>
            <img src={'http://localhost:4000/uploads/'+photo} alt=""/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-3xl overflow-hidden">
            <div>
            {place.photos?.[0] && (
                <div>
                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                </div>
            )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
                )}
                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
                    )}
                </div>
            </div>
            <div className="grid">
                {place.photos?.[3] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[3]} alt=""/>
                )}
                <div className="overflow-hidden">
                    {place.photos?.[4] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[4]} alt=""/>
                    )}
                </div>
            </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-4 right-4 py-2 px-2 rounded-xl bg-white border border-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <h3  className=" font-semibold text-md">Show all photos</h3>
        </button>
    </div>
  );
}