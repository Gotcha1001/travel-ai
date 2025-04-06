import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({ activity }) {



    const [photoUrl, setPhotoUrl] = useState("placeholder.jpg")

    useEffect(() => {
        activity && GetPlacePhoto()
    }, [activity])




    const GetPlacePhoto = async () => {
        const data = {
            textQuery: activity.placeName
        };

        try {
            const resp = await GetPlaceDetails(data);
            const photos = resp?.data?.places?.[0]?.photos;

            if (photos && photos.length > 0) {
                const photoName = photos[3]?.name || photos[0]?.name; // fallback to first photo
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(photoUrl);
            } else {
                setPhotoUrl('/placeholder.jpg'); // no photos
            }
        } catch (error) {
            console.error("Failed to fetch place photo:", error);
            setPhotoUrl('/placeholder.jpg'); // fallback on error
        }
    };


    return (

        <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity.placeName + ","} target="_blank" rel="noopener noreferrer">

            <div className="group mb-4 border rounded-lg p-4 flex flex-col md:flex-row gap-5 bg-white shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black cursor-pointer">

                {/* Image */}
                <div>
                    <img
                        src={photoUrl || '/placeholder.jpg'}
                        alt={activity.placeName}
                        onError={(e) => {
                            e.currentTarget.onerror = null; // prevent infinite loop
                            e.currentTarget.src = '/placeholder.jpg';
                        }}
                        className="w-[200px] h-[100px] rounded-xl object-cover"
                    />

                </div>

                {/* Details */}
                <div className="flex flex-col justify-between">
                    <p className="font-bold text-lg group-hover:text-white">{activity.placeName}</p>
                    <p className="text-sm text-gray-500 group-hover:text-white">{activity.placeDetails}</p>
                    <p className="text-sm text-gray-700 group-hover:text-white mt-2">💵 {activity.ticketPricing}</p>
                    <p className="text-sm group-hover:text-white">⭐ {activity.rating}</p>
                </div>
            </div>
        </Link>

    )
}

export default PlaceCardItem


// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import Autoplay from 'embla-carousel-autoplay'

// function PlaceCardItem({ activity }) {
//     const [photoUrls, setPhotoUrls] = useState(["/placeholder.jpg"]) // Default placeholder image

//     useEffect(() => {
//         activity && GetPlacePhotos()
//     }, [activity])

//     const GetPlacePhotos = async () => {
//         const data = {
//             textQuery: activity.placeName
//         };

//         try {
//             const resp = await GetPlaceDetails(data);
//             const photos = resp?.data?.places?.[0]?.photos;

//             if (photos && photos.length > 0) {
//                 const urls = photos.slice(0, 10).map(photo => PHOTO_REF_URL.replace('{NAME}', photo?.name)) // Get top 10 images
//                 setPhotoUrls(urls);
//             } else {
//                 setPhotoUrls(['/placeholder.jpg']);
//             }
//         } catch (error) {
//             console.error("Failed to fetch place photos:", error);
//             setPhotoUrls(['/placeholder.jpg']); // fallback on error
//         }
//     };

//     return (
//         <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity.placeName + ","} target="_blank" rel="noopener noreferrer">
//             <div className="group mb-4 border rounded-lg p-4 flex flex-col md:flex-row gap-5 bg-white shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black cursor-pointer">
//                 {/* Carousel for place images */}
//                 <div className="w-full h-[180px] rounded-xl overflow-hidden">
//                     <Carousel plugins={[Autoplay({ delay: 3000 })]}>
//                         <CarouselContent>
//                             {photoUrls.map((url, idx) => (
//                                 <CarouselItem key={idx}>
//                                     <img
//                                         src={url}
//                                         alt={`Place Image ${idx + 1}`}
//                                         onError={(e) => {
//                                             e.currentTarget.onerror = null;
//                                             e.currentTarget.src = '/placeholder.jpg';
//                                         }}
//                                         className="w-full h-[180px] object-cover rounded-xl"
//                                     />
//                                 </CarouselItem>
//                             ))}
//                         </CarouselContent>
//                     </Carousel>
//                 </div>

//                 {/* Place Details */}
//                 <div className="flex flex-col justify-between">
//                     <p className="font-bold text-lg group-hover:text-white">{activity.placeName}</p>
//                     <p className="text-sm text-gray-500 group-hover:text-white">{activity.placeDetails}</p>
//                     <p className="text-sm text-gray-700 group-hover:text-white mt-2">💵 {activity.ticketPricing}</p>
//                     <p className="text-sm group-hover:text-white">⭐ {activity.rating}</p>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default PlaceCardItem;
