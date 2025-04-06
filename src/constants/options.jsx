export const SelectedTraveleslIST = [
  {
    id: 1,
    title: "Just Me",
    desc: "A Solo Traveler In Exploration",
    icon: "🛬",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two Travelers in Tandem",
    icon: "🍹",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A Group Of Fun Loving Adventures",
    icon: "🏠",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A Bunch Of Thrill-Seekers",
    icon: "🍻",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay Conscious Of Costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep Costs On The Average Side",
    icon: "💵",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont Worry About Costs",
    icon: "💸",
  },
];

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, price, hotel image url, geo coordinates, ratings, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Co-ordinates, ticket Pricing, rating, Time  travel each of the locations for{totalDays} days with each day plan with best time to visit in JSON format.   '