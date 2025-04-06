// import React from 'react'
// import MotionWrapperDelay from '../FramerMotion/MotionWrapperDelay'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'

// function Hero() {
//     return (
//         <div className='flex flex-col item-center  gap-9'>
//             <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 variants={{
//                     hidden: { opacity: 0, y: -100 },
//                     visible: { opacity: 1, y: 0 },
//                 }}
//             >      <h1 className='font-extrabold text-[50px] text-center mt-16 text-[#231f89]'>
//                     <MotionWrapperDelay
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.5 }}
//                         transition={{ duration: 0.9, delay: 0.8 }}
//                         variants={{
//                             hidden: { opacity: 0, x: -100 },
//                             visible: { opacity: 1, x: 0 },
//                         }}
//                     >  <span className='text-[#6a50df]'>Discover Your Next Advneture With AI:</span> </MotionWrapperDelay>
//                     Peronsalized Itineraries At Your Fingertips</h1></MotionWrapperDelay>

//             <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.9, delay: 0.8 }}
//                 variants={{
//                     hidden: { opacity: 0, x: -100 },
//                     visible: { opacity: 1, x: 0 },
//                 }}
//             >  <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner And Travel Curator, Creating Custom Itinaries Tailored To Your Interests And Budget</p> </MotionWrapperDelay>

//             <div className="flex flex-col items-center  gap-9">

//                 <Link to={'/create-trip'}>
//                     <Button variant="sex2" className="w-full mb-10 sm:w-auto px-6 py-3">
//                         Get Started, It's Free
//                     </Button>
//                 </Link>

//             </div>
//             <div className="w-full flex justify-center mb-10 p-4 gradient-background2 ">
//                 <img
//                     src="/landing.jpg"
//                     alt="Landing"
//                     className='w-full max-w-4xl h-auto aspect-video rounded-xl shadow-lg mt-10 mx-auto border '
//                 />
//             </div>
//         </div>
//     )
// }

// export default Hero


import React, { useEffect } from 'react'
import MotionWrapperDelay from '../FramerMotion/MotionWrapperDelay'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import SmokeEffectIndividual from '../SmokeEffects/SmokeEffectIndividual'

function Hero() {
    // Array of image paths (update these with your actual image paths)
    const images = [
        "/landing.jpg",
        "/landing2.jpg",
        "/landing3.jpg",
        "/landing4.jpg"
    ]

    const autoplayPlugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )

    return (
        <div className='flex flex-col items-center gap-9'>
            <SmokeEffectIndividual isVisible={true} />
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <h1 className='font-extrabold text-[50px] text-center mt-16 text-[#231f89]'>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <span className='text-[#6a50df]'>Discover Your Next Adventure With AI:</span>
                    </MotionWrapperDelay>
                    Personalized Itineraries At Your Fingertips
                </h1>
            </MotionWrapperDelay>

            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >
                <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner And Travel Curator, Creating Custom Itineraries Tailored To Your Interests And Budget</p>
            </MotionWrapperDelay>

            <div className="flex flex-col items-center gap-9">
                <Link to={'/create-trip'}>
                    <Button variant="sex2" className="w-full  sm:w-auto px-6 py-3">
                        Get Started, It's Free
                    </Button>
                </Link>
            </div>

            <div className="w-full flex justify-center mb-4  p-6 ">
                <Carousel
                    className="w-full max-w-4xl"
                    plugins={[autoplayPlugin.current]}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <img
                                        src={image}
                                        alt={`Travel destination ${index + 1}`}
                                        className='w-full h-auto aspect-video rounded-xl shadow-lg border'
                                        onError={(e) => {
                                            // Fallback in case image doesn't load
                                            e.currentTarget.src = "/landing.jpg"
                                        }}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" /> */}
                </Carousel>
            </div>
        </div>
    )
}

export default Hero