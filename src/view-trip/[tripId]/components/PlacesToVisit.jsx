// import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// function PlacesToVisit({ trip }) {
//     return (
//         <div>
//             <h2 className='font-bold text-lg mt-5'>Places To Visit</h2>

//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
//                 {Object.entries(trip.tripData?.itinerary || {})
//                     .sort(([a], [b]) => {
//                         const dayA = parseInt(a.replace(/\D/g, ''), 10);
//                         const dayB = parseInt(b.replace(/\D/g, ''), 10);
//                         return dayA - dayB;
//                     })
//                     .map(([day, activities], index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='mb-4 mt-5'>
//                                 <h2 className='font-bold text-medium mb-2'>{day.toUpperCase()}</h2>
//                                 <div className='my-3'>
//                                     {activities.map((activity, i) => (
//                                         <div key={i}>
//                                             <p className="text-sm font-medium text-orange-600 mb-2">
//                                                 🕒 {activity.time}
//                                             </p>
//                                             <PlaceCardItem activity={activity} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </FeatureMotionWrapper>
//                     ))}
//             </div>
//         </div>
//     )
// }

// export default PlacesToVisit


import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    // Check if trip and trip.tripData and trip.tripData.itinerary exist
    const itinerary = trip?.tripData?.itinerary || {};

    return (
        <div>
            <h2 className='font-bold text-lg mt-5'>Places To Visit</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                {Object.entries(itinerary)
                    .sort(([a], [b]) => {
                        const dayA = parseInt(a.replace(/\D/g, ''), 10);
                        const dayB = parseInt(b.replace(/\D/g, ''), 10);
                        return dayA - dayB;
                    })
                    .map(([day, activities], index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div className='mb-4 mt-5'>
                                <h2 className='font-bold text-medium mb-2'>{day.toUpperCase()}</h2>
                                <div className='my-3'>
                                    {Array.isArray(activities) ? activities.map((activity, i) => (
                                        <div key={i}>
                                            <p className="text-sm font-medium text-orange-600 mb-2">
                                                🕒 {activity.time}
                                            </p>
                                            <PlaceCardItem activity={activity} />
                                        </div>
                                    )) : <p>No activities found for this day</p>}
                                </div>
                            </div>
                        </FeatureMotionWrapper>
                    ))}
            </div>
        </div>
    )
}

export default PlacesToVisit