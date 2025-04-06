// import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay';
// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { IoIosSend } from "react-icons/io";


// // const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_MAP_API_KEY


// function InfoSection({ trip }) {

//     const [photoUrl, setPhotoUrl] = useState()

//     useEffect(() => {
//         trip && GetPlacePhoto()
//     }, [trip])


//     // const GetPlacePhoto = async () => {
//     //     const data = {
//     //         textQuery: trip?.userSelection?.location?.label
//     //     }
//     //     const result = await GetPlaceDetails(data).then(resp => {
//     //         console.log(resp.data.places[0].photos[3].name)

//     //         const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//     //         console.log(PhotoUrl)
//     //         setPhotoUrl(PhotoUrl)

//     //     })
//     // }

//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: trip?.userSelection?.location?.label
//         };

//         try {
//             const resp = await GetPlaceDetails(data);
//             const photos = resp?.data?.places?.[0]?.photos;

//             if (photos && photos.length > 0) {
//                 // Use the 3rd index if it exists, else fallback to first
//                 const photoName = photos[3]?.name || photos[0]?.name;
//                 const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
//                 setPhotoUrl(photoUrl);
//             } else {
//                 // No photos found
//                 setPhotoUrl('/placeholder.jpg');
//             }
//         } catch (error) {
//             console.error("Error fetching place photo:", error);
//             setPhotoUrl('/placeholder.jpg');
//         }
//     };


//     return (
//         <div>
//             <img src={photoUrl} alt="image"
//                 className='h-[600px] w-full object-cover rounded-xl' />

//             <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>

//                 <div className='flex flex-col gap-2'>
//                     <MotionWrapperDelay
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.5 }}
//                         transition={{ duration: 0.9, delay: 0.8 }}
//                         variants={{
//                             hidden: { opacity: 0, y: -100 },
//                             visible: { opacity: 1, y: 0 },
//                         }}
//                     ><h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2> </MotionWrapperDelay>

//                     <MotionWrapperDelay
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.5 }}
//                         transition={{ duration: 0.9, delay: 0.8 }}
//                         variants={{
//                             hidden: { opacity: 0, x: 100 },
//                             visible: { opacity: 1, x: 0 },
//                         }}
//                     >     <div className='flex gap-5'>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays} Days</h2>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip.userSelection?.budget} Budget</h2>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>🍷 No. Of Travelers: {trip.userSelection?.traveler}</h2>
//                         </div> </MotionWrapperDelay>

//                 </div>
//                 <div>

//                 </div>
//                 <Button

//                     variant="sex2" size="sm"><IoIosSend />Share</Button>
//             </div>

//         </div>
//     )
// }

// export default InfoSection


// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
// import { IoIosSend } from "react-icons/io"
// import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import Autoplay from 'embla-carousel-autoplay'

// function InfoSection({ trip }) {
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
//                     .map(photo => PHOTO_REF_URL.replace('{NAME}', photo?.name))
//                 setPhotoUrls(urls)
//             } else {
//                 setPhotoUrls(['/placeholder.jpg'])
//             }
//         } catch (error) {
//             console.error("Error fetching place photos:", error)
//             setPhotoUrls(['/placeholder.jpg'])
//         }
//     }

//     return (
//         <div>
//             {/* Carousel replacing the static image */}
//             <Carousel
//                 plugins={[Autoplay({ delay: 3000 })]}
//                 className='w-full h-[600px] rounded-xl overflow-hidden'
//             >
//                 <CarouselContent>
//                     {photoUrls.map((url, idx) => (
//                         <CarouselItem key={idx}>
//                             <img
//                                 src={url}
//                                 alt={`Place photo ${idx + 1}`}
//                                 onError={(e) => {
//                                     e.currentTarget.onerror = null
//                                     e.currentTarget.src = '/placeholder.jpg'
//                                 }}
//                                 className='h-[600px] w-full object-cover rounded-xl'
//                             />
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//             </Carousel>

//             <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4'>
//                 <div className='flex flex-col gap-2'>
//                     <MotionWrapperDelay
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.5 }}
//                         transition={{ duration: 0.9, delay: 0.8 }}
//                         variants={{
//                             hidden: { opacity: 0, y: -100 },
//                             visible: { opacity: 1, y: 0 },
//                         }}
//                     >
//                         <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
//                     </MotionWrapperDelay>

//                     <MotionWrapperDelay
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.5 }}
//                         transition={{ duration: 0.9, delay: 0.8 }}
//                         variants={{
//                             hidden: { opacity: 0, x: 100 },
//                             visible: { opacity: 1, x: 0 },
//                         }}
//                     >
//                         <div className='flex gap-5 flex-wrap'>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
//                                 📅 {trip.userSelection?.noOfDays} Days
//                             </h2>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
//                                 💵 {trip.userSelection?.budget} Budget
//                             </h2>
//                             <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
//                                 🍷 No. Of Travelers: {trip.userSelection?.traveler}
//                             </h2>
//                         </div>
//                     </MotionWrapperDelay>
//                 </div>

//                 <Button variant="sex2" size="sm">
//                     <IoIosSend className='mr-2' /> Share
//                 </Button>
//             </div>
//         </div>
//     )
// }

// export default InfoSection


import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { IoIosSend } from "react-icons/io"
import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa"
import { HiClipboardDocumentCheck } from "react-icons/hi2"

function InfoSection({ trip }) {
    const [photoUrls, setPhotoUrls] = useState([])
    const [showShareOptions, setShowShareOptions] = useState(false)

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
                    .map(photo => PHOTO_REF_URL.replace('{NAME}', photo?.name))

                setPhotoUrls(urls)
            } else {
                setPhotoUrls(['/placeholder.jpg'])
            }
        } catch (error) {
            console.error("Error fetching place photos:", error)
            setPhotoUrls(['/placeholder.jpg'])
        }
    }

    // Get the current URL for sharing
    const tripUrl = window.location.href

    return (
        <div>
            {/* Carousel replacing the static image */}
            <Carousel
                plugins={[Autoplay({ delay: 3000 })]}
                className='w-full h-[600px] rounded-xl overflow-hidden'
            >
                <CarouselContent>
                    {photoUrls.map((url, idx) => (
                        <CarouselItem key={idx}>
                            <img
                                src={url}
                                alt={`Place photo ${idx + 1}`}
                                onError={(e) => {
                                    e.currentTarget.onerror = null
                                    e.currentTarget.src = '/placeholder.jpg'
                                }}
                                className='h-[600px] w-full object-cover rounded-xl'
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4'>
                <div className='flex flex-col gap-2'>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, y: -100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    </MotionWrapperDelay>

                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <div className='flex gap-5 flex-wrap'>
                            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
                                📅 {trip.userSelection?.noOfDays} Days
                            </h2>
                            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
                                💵 {trip.userSelection?.budget} Budget
                            </h2>
                            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>
                                🍷 No. Of Travelers: {trip.userSelection?.traveler}
                            </h2>
                        </div>
                    </MotionWrapperDelay>
                </div>

                <div className="relative">
                    <Button
                        variant="sex2"
                        size="sm"
                        onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                        <IoIosSend className='mr-2' /> Share
                    </Button>

                    {/* Share options dropdown */}
                    {showShareOptions && (
                        <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200">
                            <div className="mb-3">
                                <h3 className="text-sm font-medium mb-2">Trip URL:</h3>
                                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                                    <p className="text-xs truncate max-w-48">{tripUrl}</p>
                                    <HiClipboardDocumentCheck
                                        className='text-yellow-500 h-5 w-5 cursor-pointer'
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(tripUrl);
                                            alert("Trip URL copied!");
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <FacebookShareButton url={tripUrl}>
                                    <FaFacebook className="text-blue-600 h-6 w-6 cursor-pointer" />
                                </FacebookShareButton>
                                <TwitterShareButton url={tripUrl}>
                                    <FaTwitter className="text-blue-400 h-6 w-6 cursor-pointer" />
                                </TwitterShareButton>
                                <WhatsappShareButton url={tripUrl}>
                                    <FaWhatsapp className="text-green-500 h-6 w-6 cursor-pointer" />
                                </WhatsappShareButton>
                                <LinkedinShareButton url={tripUrl}>
                                    <FaLinkedin className="text-blue-700 h-6 w-6 cursor-pointer" />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InfoSection