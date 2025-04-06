// import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
// import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
// import { db } from '@/service/firebaseConfig'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import UserTripCardItem from './components/UserTripCardItem'

// function MyTrips() {

//     const navigate = useNavigate()

//     const [userTrips, setUserTrips] = useState([])

//     useEffect(() => {
//         GetUserTrips()
//     }, [])

//     // const GetUserTrips = async () => {
//     //     const user = JSON.parse(localStorage.getItem('user'))
//     //     if (!user) {
//     //         navigate('/');
//     //         return;
//     //     }

//     //     setUserTrips([]) // Reset trips before fetching new ones
//     //     // Fetch user trips from Firestore
//     //     const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
//     //     const querySnapshot = await getDocs(q);
//     //     querySnapshot.forEach((doc) => {
//     //         console.log(doc.id, ' => ', doc.data())
//     //         setUserTrips(prev => [...prev, doc.data()])
//     //     })
//     // }

//     const GetUserTrips = async () => {
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (!user) {
//             navigate('/');
//             return;
//         }



//         // Fetch user trips from Firestore
//         const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
//         const querySnapshot = await getDocs(q);
//         setUserTrips([]) // Reset trips before fetching new ones

//         const newTrips = []

//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, ' => ', doc.data())
//             const tripData = doc.data()

//             // Check if the trip already exists in the userTrips array before adding
//             if (!newTrips.some(existingTrip => existingTrip.id === tripData.id)) {
//                 newTrips.push(tripData)
//             }
//         })

//         // Set the user trips with unique entries
//         setUserTrips(newTrips)
//     }


//     return (
//         <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//             <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.9, delay: 0.8 }}
//                 variants={{
//                     hidden: { opacity: 0, y: -100 },
//                     visible: { opacity: 1, y: 0 },
//                 }}
//             >  <h2 className='font-bold text-3xl'>MyTrips</h2></MotionWrapperDelay>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
//                 {userTrips?.length > 0 ? userTrips.map((trip, index) => (
//                     <FeatureMotionWrapper index={index} key={index}>
//                         <UserTripCardItem trip={trip} />
//                     </FeatureMotionWrapper>
//                 ))
//                     : [1, 2, 3, 4, 5, 6].map((item, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='h-[300px] w-full bg-slate-500 animate-pulse rounded-lg'></div>
//                         </FeatureMotionWrapper>


//                     ))
//                 }
//             </div>

//         </div>
//     )
// }

// export default MyTrips


// import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
// import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
// import { db } from '@/service/firebaseConfig'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import UserTripCardItem from './components/UserTripCardItem'
// import { toast } from 'sonner'


// function MyTrips() {
//     const navigate = useNavigate()
//     const [userTrips, setUserTrips] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         GetUserTrips()
//     }, [])

//     const GetUserTrips = async () => {
//         setLoading(true)
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (!user) {
//             navigate('/');
//             return;
//         }

//         try {
//             // Fetch user trips from Firestore
//             const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
//             const querySnapshot = await getDocs(q);

//             const newTrips = []
//             querySnapshot.forEach((doc) => {
//                 const tripData = doc.data()
//                 // Add document ID to the trip data if not already included
//                 newTrips.push({
//                     ...tripData,
//                     id: doc.id // Make sure the ID is available
//                 })
//             })

//             // Set the user trips with unique entries
//             setUserTrips(newTrips)
//         } catch (error) {
//             console.error("Error fetching trips:", error)
//             // Show error toast if you have toast component
//             // toast({ title: "Error", description: "Failed to load trips", variant: "destructive" })
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Function to handle trip deletion
//     const handleTripDeleted = (tripId) => {
//         // Remove the deleted trip from state
//         setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId))
//         toast.success("Trip deleted successfully")
//     }

//     return (
//         <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//             <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.9, delay: 0.8 }}
//                 variants={{
//                     hidden: { opacity: 0, y: -100 },
//                     visible: { opacity: 1, y: 0 },
//                 }}
//             >
//                 <div className="flex justify-between items-center">
//                     <h2 className='font-bold text-3xl'>My Trips</h2>
//                     {userTrips.length > 0 && (
//                         <span className="text-gray-500">
//                             {userTrips.length} {userTrips.length === 1 ? 'trip' : 'trips'} found
//                         </span>
//                     )}
//                 </div>
//             </MotionWrapperDelay>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
//                 {loading ?
//                     // Show skeleton UI while loading
//                     [1, 2, 3, 4, 5, 6].map((item, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='h-[300px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
//                         </FeatureMotionWrapper>
//                     ))
//                     : userTrips.length > 0 ?
//                         // Show trips if available
//                         userTrips.map((trip, index) => (
//                             <FeatureMotionWrapper index={index} key={trip.id || index}>
//                                 <UserTripCardItem
//                                     trip={trip}
//                                     onTripDeleted={handleTripDeleted}
//                                 />
//                             </FeatureMotionWrapper>
//                         ))
//                         :
//                         // Show no trips message
//                         <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
//                             <p className="text-gray-500">No trips found. Create a new trip to get started!</p>
//                             <button
//                                 onClick={() => navigate('/create-trip')}
//                                 className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                             >
//                                 Create New Trip
//                             </button>
//                         </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default MyTrips

// import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
// import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
// import { db } from '@/service/firebaseConfig'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import UserTripCardItem from './components/UserTripCardItem'
// import { toast } from 'sonner'

// function MyTrips() {
//     const navigate = useNavigate()
//     const [allTrips, setAllTrips] = useState([]) // Store all trips
//     const [userTrips, setUserTrips] = useState([]) // Paginated trips
//     const [filteredTrips, setFilteredTrips] = useState([]) // For search functionality
//     const [loading, setLoading] = useState(true)
//     const [searchQuery, setSearchQuery] = useState('')
//     const [pageIndex, setPageIndex] = useState(0)
//     const pageSize = 2 // Number of trips per page

//     useEffect(() => {
//         GetUserTrips()
//     }, [])

//     const GetUserTrips = async () => {
//         setLoading(true)
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (!user) {
//             navigate('/');
//             return;
//         }

//         try {
//             // Fetch user trips from Firestore
//             const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
//             const querySnapshot = await getDocs(q);

//             const newTrips = []
//             querySnapshot.forEach((doc) => {
//                 const tripData = doc.data()
//                 // Add document ID to the trip data if not already included
//                 newTrips.push({
//                     ...tripData,
//                     id: doc.id // Make sure the ID is available
//                 })
//             })

//             // Set all trips and initial filtered trips
//             setAllTrips(newTrips)
//             setFilteredTrips(newTrips)

//             // Set paginated trips
//             setPaginatedTrips(newTrips, 0)
//         } catch (error) {
//             console.error("Error fetching trips:", error)
//             toast.error("Failed to load trips")
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Function to handle pagination
//     const setPaginatedTrips = (trips, page) => {
//         const start = page * pageSize;
//         setUserTrips(trips.slice(start, start + pageSize));
//     }

//     // Function to handle search (can be implemented later)
//     useEffect(() => {
//         if (!searchQuery) {
//             setFilteredTrips(allTrips);
//             setPaginatedTrips(allTrips, pageIndex);
//         } else {
//             const filtered = allTrips.filter((trip) =>
//                 trip?.userSelection?.location?.label?.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredTrips(filtered);
//             setPaginatedTrips(filtered, 0); // Reset to first page
//         }
//     }, [searchQuery, allTrips]);

//     // Function to handle page change
//     const handlePageChange = (newIndex) => {
//         setPageIndex(newIndex);
//         setPaginatedTrips(filteredTrips, newIndex);
//     }

//     // Function to handle trip deletion
//     const handleTripDeleted = (tripId) => {
//         // Remove the deleted trip from all states
//         const updatedTrips = allTrips.filter(trip => trip.id !== tripId);
//         setAllTrips(updatedTrips);
//         setFilteredTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));

//         // Check if current page should be adjusted
//         const currentPageItemCount = userTrips.filter(trip => trip.id !== tripId).length;
//         if (currentPageItemCount === 0 && pageIndex > 0) {
//             // If current page becomes empty and it's not the first page, go to previous page
//             handlePageChange(pageIndex - 1);
//         } else {
//             // Otherwise, just update current page
//             setPaginatedTrips(filteredTrips.filter(trip => trip.id !== tripId), pageIndex);
//         }

//         toast.success("Trip deleted successfully")
//     }

//     // Search input handler
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     }

//     return (
//         <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//             <MotionWrapperDelay
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.9, delay: 0.8 }}
//                 variants={{
//                     hidden: { opacity: 0, y: -100 },
//                     visible: { opacity: 1, y: 0 },
//                 }}
//             >
//                 <div className="flex justify-between items-center">
//                     <h2 className='font-bold text-3xl'>My Trips</h2>
//                     <div className="flex items-center gap-4">
//                         {filteredTrips.length > 0 && (
//                             <span className="text-gray-100 bg-gradient-to-r from-indigo-500 via-purple-900 to-black font-bold border p-2 rounded-lg">
//                                 {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} found
//                             </span>
//                         )}
//                         <input
//                             type="text"
//                             placeholder="Search trips..."
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>
//                 </div>
//             </MotionWrapperDelay>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
//                 {loading ?
//                     // Show skeleton UI while loading
//                     [1, 2, 3, 4, 5, 6].map((item, index) => (
//                         <FeatureMotionWrapper index={index} key={index}>
//                             <div className='h-[300px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
//                         </FeatureMotionWrapper>
//                     ))
//                     : userTrips.length > 0 ?
//                         // Show trips if available
//                         userTrips.map((trip, index) => (
//                             <FeatureMotionWrapper index={index} key={trip.id || index}>
//                                 <UserTripCardItem
//                                     trip={trip}
//                                     onTripDeleted={handleTripDeleted}
//                                 />
//                             </FeatureMotionWrapper>
//                         ))
//                         : filteredTrips.length > 0 ?
//                             // No trips on current page but we have filtered trips
//                             <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
//                                 <p className="text-gray-500">No trips found on this page.</p>
//                             </div>
//                             :
//                             // No trips at all
//                             <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
//                                 <p className="text-gray-500">No trips found. Create a new trip to get started!</p>
//                                 <button
//                                     onClick={() => navigate('/create-trip')}
//                                     className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                                 >
//                                     Create New Trip
//                                 </button>
//                             </div>
//                 }
//             </div>

//             {/* Pagination Controls */}
//             {filteredTrips.length > pageSize && (
//                 <div className="flex justify-between items-center mt-8">
//                     <div className="text-sm text-gray-500">
//                         Page {pageIndex + 1} of {Math.ceil(filteredTrips.length / pageSize)}
//                     </div>
//                     <div className="flex gap-3 mb-10">
//                         <button
//                             onClick={() => handlePageChange(pageIndex - 1)}
//                             disabled={pageIndex === 0}
//                             className={`px-4 py-2 rounded-lg ${pageIndex === 0
//                                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                                 : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                                 } transition-colors`}
//                         >
//                             Previous
//                         </button>

//                         <button
//                             onClick={() => handlePageChange(pageIndex + 1)}
//                             disabled={filteredTrips.length <= (pageIndex + 1) * pageSize}
//                             className={`px-4 py-2 rounded-lg ${filteredTrips.length <= (pageIndex + 1) * pageSize
//                                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                                 : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                                 } transition-colors`}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default MyTrips

import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCardItem from './components/UserTripCardItem'
import { toast } from 'sonner'
import SmokeEffectIndividual from '@/components/SmokeEffects/SmokeEffectIndividual'

function MyTrips() {
    const navigate = useNavigate()
    const [allTrips, setAllTrips] = useState([]) // Store all trips
    const [userTrips, setUserTrips] = useState([]) // Paginated trips
    const [filteredTrips, setFilteredTrips] = useState([]) // For search functionality
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [pageIndex, setPageIndex] = useState(0)
    const pageSize = 6 // Number of trips per page

    useEffect(() => {
        GetUserTrips()
    }, [])

    const GetUserTrips = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            navigate('/');
            return;
        }

        try {
            // Fetch user trips from Firestore
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
            const querySnapshot = await getDocs(q);

            const newTrips = []
            querySnapshot.forEach((doc) => {
                const tripData = doc.data()
                // Add document ID to the trip data if not already included
                newTrips.push({
                    ...tripData,
                    id: doc.id // Make sure the ID is available
                })
            })

            // Set all trips and initial filtered trips
            setAllTrips(newTrips)
            setFilteredTrips(newTrips)

            // Set paginated trips
            setPaginatedTrips(newTrips, 0)
        } catch (error) {
            console.error("Error fetching trips:", error)
            toast.error("Failed to load trips")
        } finally {
            setLoading(false)
        }
    }

    // Function to handle pagination
    const setPaginatedTrips = (trips, page) => {
        const start = page * pageSize;
        setUserTrips(trips.slice(start, start + pageSize));
    }

    // Function to handle search (can be implemented later)
    useEffect(() => {
        if (!searchQuery) {
            setFilteredTrips(allTrips);
            setPaginatedTrips(allTrips, pageIndex);
        } else {
            const filtered = allTrips.filter((trip) =>
                trip?.userSelection?.location?.label?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTrips(filtered);
            setPaginatedTrips(filtered, 0); // Reset to first page
        }
    }, [searchQuery, allTrips]);

    // Function to handle page change
    const handlePageChange = (newIndex) => {
        setPageIndex(newIndex);
        setPaginatedTrips(filteredTrips, newIndex);
    }

    // Function to handle trip deletion
    const handleTripDeleted = (tripId) => {
        // Remove the deleted trip from all states
        const updatedTrips = allTrips.filter(trip => trip.id !== tripId);
        setAllTrips(updatedTrips);
        setFilteredTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));

        // Check if current page should be adjusted
        const currentPageItemCount = userTrips.filter(trip => trip.id !== tripId).length;
        if (currentPageItemCount === 0 && pageIndex > 0) {
            // If current page becomes empty and it's not the first page, go to previous page
            handlePageChange(pageIndex - 1);
        } else {
            // Otherwise, just update current page
            setPaginatedTrips(filteredTrips.filter(trip => trip.id !== tripId), pageIndex);
        }

        toast.success("Trip deleted successfully")
    }

    // Search input handler
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <SmokeEffectIndividual isVisible={true} />
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
                <div className="text-center mb-8">
                    <h2 className='font-bold text-3xl mb-6'>My Trips</h2>

                    {/* Centered search input */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search trips..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {filteredTrips.length > 0 && (
                            <span className="text-gray-100 bg-gradient-to-r from-indigo-500 via-purple-900 to-black font-bold border p-2 rounded-lg">
                                {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} found
                            </span>
                        )}
                    </div>
                </div>
            </MotionWrapperDelay>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {loading ?
                    // Show skeleton UI while loading
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div className='h-[300px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                        </FeatureMotionWrapper>
                    ))
                    : userTrips.length > 0 ?
                        // Show trips if available
                        userTrips.map((trip, index) => (
                            <FeatureMotionWrapper index={index} key={trip.id || index}>
                                <UserTripCardItem
                                    trip={trip}
                                    onTripDeleted={handleTripDeleted}
                                />
                            </FeatureMotionWrapper>
                        ))
                        : filteredTrips.length > 0 ?
                            // No trips on current page but we have filtered trips
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                                <p className="text-gray-500">No trips found on this page.</p>
                            </div>
                            :
                            // No trips at all
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                                <p className="text-gray-500">No trips found. Create a new trip to get started!</p>
                                <button
                                    onClick={() => navigate('/create-trip')}
                                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Create New Trip
                                </button>
                            </div>
                }
            </div>

            {/* Pagination Controls */}
            {filteredTrips.length > pageSize && (
                <div className="flex justify-between items-center mt-8">
                    <div className="text-sm text-gray-500">
                        Page {pageIndex + 1} of {Math.ceil(filteredTrips.length / pageSize)}
                    </div>
                    <div className="flex gap-3 mb-10">
                        <button
                            onClick={() => handlePageChange(pageIndex - 1)}
                            disabled={pageIndex === 0}
                            className={`px-4 py-2 rounded-lg ${pageIndex === 0
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                } transition-colors`}
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => handlePageChange(pageIndex + 1)}
                            disabled={filteredTrips.length <= (pageIndex + 1) * pageSize}
                            className={`px-4 py-2 rounded-lg ${filteredTrips.length <= (pageIndex + 1) * pageSize
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                } transition-colors`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyTrips