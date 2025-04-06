// import SmokeEffect from '@/components/SmokeEffects/SmokeEffect'
// import SmokeEffectIndividual from '@/components/SmokeEffects/SmokeEffectIndividual'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// import Autoplay from 'embla-carousel-autoplay'

// function UserTripCardItem({ trip }) {
//     const [photoUrls, setPhotoUrls] = useState([])

//     useEffect(() => {
//         trip && GetPlacePhotos()
//     }, [trip])

//     const GetPlacePhotos = async () => {
//         const data = {
//             textQuery: trip?.userSelection?.location?.label
//         }

//         try {
//             const resp = await GetPlaceDetails(data)
//             const photos = resp?.data?.places?.[0]?.photos

//             if (photos && photos.length > 0) {
//                 const urls = photos
//                     .slice(0, 10)
//                     .map((photo) => PHOTO_REF_URL.replace('{NAME}', photo?.name))
//                 setPhotoUrls(urls)
//             } else {
//                 setPhotoUrls(['/placeholder.jpg'])
//             }
//         } catch (error) {
//             console.error("Error fetching trip photos:", error)
//             setPhotoUrls(['/placeholder.jpg'])
//         }
//     }

//     return (
//         <Link
//             to={`/view-trip/${trip?.id}`}
//             className="group mb-4 border rounded-lg p-4 flex flex-col gap-5 bg-white shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black cursor-pointer"
//         >
//             <Carousel
//                 plugins={[Autoplay({ delay: 3000 })]}
//                 className="w-full rounded-xl overflow-hidden"
//             >
//                 <CarouselContent>
//                     {photoUrls.map((url, index) => (
//                         <CarouselItem key={index}>
//                             <img
//                                 src={url}
//                                 alt={`Trip image ${index + 1}`}
//                                 onError={(e) => {
//                                     e.currentTarget.onerror = null
//                                     e.currentTarget.src = '/placeholder.jpg'
//                                 }}
//                                 className="h-[390px] w-full object-cover"
//                             />
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//             </Carousel>

//             <div className="transition-all duration-300">
//                 <h2 className="font-bold text-lg text-black group-hover:text-white transition-all duration-300">
//                     {trip?.userSelection?.location?.label}
//                 </h2>
//                 <h2 className="text-sm text-gray-500 group-hover:text-white transition-all duration-300">
//                     {trip.userSelection.noOfDays} Days Trip With {trip?.userSelection.budget} Budget
//                 </h2>
//             </div>
//         </Link>
//     )
// }

// export default UserTripCardItem

// First, let's modify the UserTripCardItem component to include a delete button
// This will go in your UserTripCardItem.jsx file

import SmokeEffect from '@/components/SmokeEffects/SmokeEffect'
import SmokeEffectIndividual from '@/components/SmokeEffects/SmokeEffectIndividual'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
import { Trash2 } from 'lucide-react' // Import the trash icon
import { doc, deleteDoc } from 'firebase/firestore' // Import Firebase methods
import { db } from '@/service/firebaseConfig' // Import your Firebase db

function UserTripCardItem({ trip, onTripDeleted }) {
    const [photoUrls, setPhotoUrls] = useState([])

    useEffect(() => {
        trip && GetPlacePhotos()
    }, [trip])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        try {
            const resp = await GetPlaceDetails(data)
            const photos = resp?.data?.places?.[0]?.photos

            if (photos && photos.length > 0) {
                const urls = photos
                    .slice(0, 10)
                    .map((photo) => PHOTO_REF_URL.replace('{NAME}', photo?.name))
                setPhotoUrls(urls)
            } else {
                setPhotoUrls(['/placeholder.jpg'])
            }
        } catch (error) {
            console.error("Error fetching trip photos:", error)
            setPhotoUrls(['/placeholder.jpg'])
        }
    }

    // New function to handle trip deletion
    const handleDeleteTrip = async (e) => {
        e.preventDefault() // Prevent navigation
        e.stopPropagation() // Prevent event bubbling

        if (confirm('Are you sure you want to delete this trip?')) {
            try {
                // Delete the trip document from Firestore
                await deleteDoc(doc(db, 'AITrips', trip.id))
                // Notify parent component to refresh the list
                onTripDeleted(trip.id)
            } catch (error) {
                console.error("Error deleting trip:", error)
                alert('Failed to delete trip. Please try again.')
            }
        }
    }

    return (
        <div className="group mb-4 border rounded-lg p-4 flex flex-col gap-5 bg-white shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black cursor-pointer relative">
            <Link
                to={`/view-trip/${trip?.id}`}
                className="flex flex-col gap-5"
            >
                <Carousel
                    plugins={[Autoplay({ delay: 3000 })]}
                    className="w-full rounded-xl overflow-hidden"
                >
                    <CarouselContent>
                        {photoUrls.map((url, index) => (
                            <CarouselItem key={index}>
                                <img
                                    src={url}
                                    alt={`Trip image ${index + 1}`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null
                                        e.currentTarget.src = '/placeholder.jpg'
                                    }}
                                    className="h-[390px] w-full object-cover"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="transition-all duration-300">
                    <h2 className="font-bold text-lg text-black group-hover:text-white transition-all duration-300">
                        {trip?.userSelection?.location?.label}
                    </h2>
                    <h2 className="text-sm text-gray-500 group-hover:text-white transition-all duration-300">
                        {trip.userSelection.noOfDays} Days Trip With {trip?.userSelection.budget} Budget
                    </h2>
                </div>
            </Link>

            {/* Delete button - positioned absolute to the top right */}
            <button
                onClick={handleDeleteTrip}
                className="absolute top-6 right-6 bg-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 z-10"
                title="Delete Trip"
            >
                <Trash2 size={8} color="white" />
            </button>
        </div>
    )
}

export default UserTripCardItem