import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectedTraveleslIST } from '@/constants/options'
import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import { Button } from '@/components/ui/button'
import SmokeEffect from '@/components/SmokeEffects/SmokeEffect'
import { toast } from 'sonner'
import { chatSession } from '@/service/AIModel'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'



function CreateTrip() {

    const [place, setPlace] = useState()
    const [formData, setFormData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useNavigate()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user')
        if (!user) {
            setOpenDialog(true)
            return
        }

        if (
            (formData?.noOfDays > 10 && !formData?.location) ||
            !formData?.budget ||
            !formData?.traveler // should be !formData?.traveler (negate it)
        ) {
            toast.success("Please Fill In All Details")
            return
        }
        setLoading(true)

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        // console.log("FINAL:", FINAL_PROMPT)

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log("🍹😎:", result?.response?.text())
        setLoading(false)
        SaveAITrip(result?.response?.text())

    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp)
            localStorage.setItem('user', JSON.stringify(resp.data))
            setOpenDialog(false)
            OnGenerateTrip()
        })
    }

    const SaveAITrip = async (TripData) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'))
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        })
        setLoading(false)
        router('/view-trip/' + docId)
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <SmokeEffect isVisible={true} />
            <h2 className='font-bold text-3xl'>Tell Us Your Travel Prefernces</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just Provide Some Basic Information, And Our Trip Planner Will Generate A Customized Itinerary Based On Your Prefrences 🏕🌴</p>

            <div className='mt-20 flex flex-col gap-10 '>
                {/* add some forms */}
                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What Is Your Destination Of Choice? 🌍
                    </h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                        }}
                    />
                </div>
            </div>

            <h2 className='text-xl my-3 font-medium'>
                How Many Days Are You Planning Your Trip? 🗓
                <Input
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    className="mt-2"
                    placeholder="Eg. 3 " type="number" />
            </h2>

            <div>
                <h2 className='text-xl my-3 font-medium'>
                    What Is Your Budget?
                </h2>
                <div className='grid grid-cols-3 gap-5 mt-5 '>
                    {SelectBudgetOptions.map((item, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border border-black rounded-lg hover:border-indigo-600 cursor-pointer hover:scale-105 transition-all hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black hover:text-white 
                                ${formData?.budget == item.title && 'bg-gradient-to-r from-indigo-500 via-purple-900 to-black text-white shadow-neon '}
                                `}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm '>{item.desc}</h2>

                            </div>
                        </FeatureMotionWrapper>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>
                    Who Do You Plan On Travelling With On Your Next Adventure?
                </h2>
                <div className='grid grid-cols-3 gap-5 mt-5 '>
                    {SelectedTraveleslIST.map((item, index) => (
                        <FeatureMotionWrapper index={index} key={index}>
                            <div
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border border-black rounded-lg hover:border-indigo-600 cursor-pointer hover:scale-105 transition-all hover:bg-gradient-to-r from-indigo-500 via-purple-900 to-black hover:text-white
                                ${formData?.traveler == item.people && 'bg-gradient-to-r from-indigo-500 via-purple-900 to-black text-white shadow-neon'}
                                `}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm '>{item.desc}</h2>

                            </div>
                        </FeatureMotionWrapper>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center my-10'>
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}
                    variant="sex2">
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                        : 'Generate Trip'
                    }
                </Button>
            </div>


            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>

                        <DialogDescription>
                            <img src="/trip.jpg" alt="" />
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign In To The App With Google Authentication Securely</p>
                            <Button
                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center"
                                variant="sex2">
                                <FcGoogle className='h-12 w-12' />Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTrip