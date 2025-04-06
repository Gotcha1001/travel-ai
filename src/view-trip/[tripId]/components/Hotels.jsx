import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
import { Hotel } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    return (
        <div>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >   <h2 className='font-bold text-xl mt-5'>Hotel Recomendations</h2> </MotionWrapperDelay>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <FeatureMotionWrapper index={index} key={index}>

                        <HotelCardItem hotel={hotel} />

                    </FeatureMotionWrapper>
                ))}
            </div>

        </div >
    )
}

export default Hotels