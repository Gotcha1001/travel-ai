// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// function HotelCardItem({ hotel }) {



//     const [photoUrl, setPhotoUrl] = useState()

//     useEffect(() => {
//         hotel && GetPlacePhoto()
//     }, [hotel])


//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: hotel?.hotelName
//         }
//         const result = await GetPlaceDetails(data).then(resp => {
//             console.log(resp.data.places[0].photos[3].name)

//             const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//             console.log(PhotoUrl)
//             setPhotoUrl(PhotoUrl)

//         })
//     }

//     return (
//         <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target="_blank" rel="noopener noreferrer">
//             {/* <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelAddress} target="_blank" rel="noopener noreferrer"> */}
//             <div className='hover:scale-105 transition-all cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black rounded-xl p-2 border border-gray-300 shadow-md group'>
//                 <img src={photoUrl} alt="Image"
//                     className='rounded-xl  h-[180px] w-full object-cover ' />
//                 <div className='my-3 flex flex-col gap-2'>
//                     <h2 className='font-medium group-hover:text-white'>
//                         {hotel?.hotelName}
//                     </h2>
//                     <h2 className='text-xs text-gray-500 group-hover:text-white'>
//                         📍 {hotel?.hotelAddress}
//                     </h2>
//                     <h2 className='text-sm text-gray-500 group-hover:text-white'>
//                         💰 {hotel?.price}
//                     </h2>
//                     <h2 className='text-sm text-gray-500 group-hover:text-white'>
//                         ⭐ {hotel?.ratings}
//                     </h2>
//                 </div>
//             </div>

//         </Link>
//     )
// }

// export default HotelCardItem

// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// function HotelCardItem({ hotel }) {
//     const [photoUrl, setPhotoUrl] = useState("placeholder.jpg") // start with placeholder

//     useEffect(() => {
//         hotel && GetPlacePhoto()
//     }, [hotel])

//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: hotel?.hotelName
//         }

//         try {
//             const resp = await GetPlaceDetails(data)
//             const photos = resp?.data?.places?.[0]?.photos

//             if (photos && photos.length > 0) {
//                 const photoName = photos[3]?.name || photos[0]?.name
//                 const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName)
//                 setPhotoUrl(photoUrl)
//             } else {
//                 setPhotoUrl('/placeholder.jpg')
//             }
//         } catch (error) {
//             console.error("Error fetching hotel photo:", error)
//             setPhotoUrl('/placeholder.jpg')
//         }
//     }

//     return (
//         <Link
//             to={
//                 'https://www.google.com/maps/search/?api=1&query=' +
//                 hotel.hotelName + ',' + hotel?.hotelAddress
//             }
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             <div className='hover:scale-105 transition-all cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black rounded-xl p-2 border border-gray-300 shadow-md group'>
//                 <img
//                     src={photoUrl}
//                     alt="Hotel"
//                     onError={(e) => {
//                         e.currentTarget.onerror = null
//                         e.currentTarget.src = '/placeholder.jpg'
//                     }}
//                     className='rounded-xl h-[180px] w-full object-cover'
//                 />
//                 <div className='my-3 flex flex-col gap-2'>
//                     <h2 className='font-medium group-hover:text-white'>
//                         {hotel?.hotelName}
//                     </h2>
//                     <h2 className='text-xs text-gray-500 group-hover:text-white'>
//                         📍 {hotel?.hotelAddress}
//                     </h2>
//                     <h2 className='text-sm text-gray-500 group-hover:text-white'>
//                         💰 {hotel?.price}
//                     </h2>
//                     <h2 className='text-sm text-gray-500 group-hover:text-white'>
//                         ⭐ {hotel?.ratings}
//                     </h2>
//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default HotelCardItem

import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

function HotelCardItem({ hotel }) {
    const [photoUrls, setPhotoUrls] = useState(["/placeholder.jpg"]) // default to placeholder

    useEffect(() => {
        hotel && GetPlacePhotos()
    }, [hotel])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }

        try {
            const resp = await GetPlaceDetails(data)
            const photos = resp?.data?.places?.[0]?.photos

            if (photos && photos.length > 0) {
                const urls = photos.slice(0, 5).map(photo => PHOTO_REF_URL.replace('{NAME}', photo?.name)) // Get top 5 images
                setPhotoUrls(urls)
            } else {
                setPhotoUrls(['/placeholder.jpg'])
            }
        } catch (error) {
            console.error("Error fetching hotel photos:", error)
            setPhotoUrls(['/placeholder.jpg'])
        }
    }

    return (
        <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel?.hotelAddress}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className='hover:scale-105 transition-all cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black rounded-xl p-2 border border-gray-300 shadow-md group'>
                {/* Carousel to show multiple hotel images */}
                <Carousel
                    plugins={[Autoplay({ delay: 3000 })]}
                    className='w-full h-[180px] rounded-xl overflow-hidden'
                >
                    <CarouselContent>
                        {photoUrls.map((url, idx) => (
                            <CarouselItem key={idx}>
                                <img
                                    src={url}
                                    alt={`Hotel Image ${idx + 1}`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null
                                        e.currentTarget.src = '/placeholder.jpg'
                                    }}
                                    className='rounded-xl h-[180px] w-full object-cover'
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className='my-3 flex flex-col gap-2'>
                    <h2 className='font-medium group-hover:text-white'>
                        {hotel?.hotelName}
                    </h2>
                    <h2 className='text-xs text-gray-500 group-hover:text-white'>
                        📍 {hotel?.hotelAddress}
                    </h2>
                    <h2 className='text-sm text-gray-500 group-hover:text-white'>
                        💰 {hotel?.price}
                    </h2>
                    <h2 className='text-sm text-gray-500 group-hover:text-white'>
                        ⭐ {hotel?.ratings}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
