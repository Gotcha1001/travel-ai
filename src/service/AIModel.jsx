import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan For Location: LasVegas, for 3 Days For a Couple with a cheap budget, Give me a Hotels options List with HotelName, Hotel address, price, hotel image url, geo coordinates, ratings, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Co-ordinates, ticket Pricing, rating, Time travel each of the locations for 3 days with each day plan with best time to visit in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "I'll generate a travel plan for Las Vegas with real hotel information and attractions. Here's the data in JSON format:\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, NV\",\n    \"duration\": \"3 days\",\n    \"budget\": \"cheap\",\n    \"travelers\": \"Couple\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$45-$85/night\",\n      \"hotelImageUrl\": \"https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1597775244/rlhgmavjk3tpjpwlpuuo.jpg\",\n      \"geoCoordinates\": \"36.1215,-115.1739\",\n      \"ratings\": \"3.8 stars\",\n      \"description\": \"Budget-friendly hotel with a circus theme, offering affordable rooms and casino access\"\n    },\n    {\n      \"hotelName\": \"The STRAT Hotel, Casino & Tower\",\n      \"hotelAddress\": \"2000 Las Vegas Blvd S, Las Vegas, NV 89104\",\n      \"price\": \"$60-$100/night\",\n      \"hotelImageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/67/ef/d1/exterior.jpg\",\n      \"geoCoordinates\": \"36.1475,-115.1565\",\n      \"ratings\": \"4.0 stars\",\n      \"description\": \"Affordable hotel with spectacular views and a famous observation tower\"\n    },\n    {\n      \"hotelName\": \"Ellis Island Hotel\",\n      \"hotelAddress\": \"4178 Koval Ln, Las Vegas, NV 89109\",\n      \"price\": \"$50-$90/night\",\n      \"hotelImageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/5f/60/a9/ellis-island-hotel.jpg\",\n      \"geoCoordinates\": \"36.1186,-115.1658\",\n      \"ratings\": \"3.9 stars\",\n      \"description\": \"No-frills budget hotel with an on-site brewery and casino, close to the Strip\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip\",\n        \"placeDetails\": \"Walk along the Las Vegas Strip, enjoy the free attractions like the Bellagio Fountains and Volcano at Mirage.\",\n        \"placeImageUrl\": \"https://images.unsplash.com/photo-1518776284976-e3393560424a\",\n        \"geoCoordinates\": \"36.1147,-115.1728\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.8 stars\",\n        \"time\": \"Afternoon/Evening\"\n      },\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Visit the vibrant Fremont Street Experience in Downtown Las Vegas with its famous light show and street performers.\",\n        \"placeImageUrl\": \"https://images.unsplash.com/photo-1518803194621-27188ba362c9\",\n        \"geoCoordinates\": \"36.1702,-115.1423\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.6 stars\",\n        \"time\": \"Evening\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Enjoy a scenic drive through stunning red rock formations and desert landscapes.\",\n        \"placeImageUrl\": \"https://images.unsplash.com/photo-1527319615780-6797f7943f57\",\n        \"geoCoordinates\": \"36.1607,-115.4262\",\n        \"ticketPricing\": \"$15 per vehicle\",\n        \"rating\": \"4.8 stars\",\n        \"time\": \"Morning/Afternoon\"\n      },\n      {\n        \"placeName\": \"Container Park\",\n        \"placeDetails\": \"Visit this unique shopping and dining venue made from shipping containers with free entertainment.\",\n        \"placeImageUrl\": \"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a\",\n        \"geoCoordinates\": \"36.1683,-115.1382\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": \"4.4 stars\",\n        \"time\": \"Evening\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Hoover Dam\",\n        \"placeDetails\": \"Take a half-day trip to see this engineering marvel that's close to Las Vegas.\",\n        \"placeImageUrl\": \"https://images.unsplash.com/photo-1527965082233-5b9fea2e58af\",\n        \"geoCoordinates\": \"36.0161,-114.7377\",\n        \"ticketPricing\": \"Free to visit, $10 for parking\",\n        \"rating\": \"4.7 stars\",\n        \"time\": \"Morning\"\n      },\n      {\n        \"placeName\": \"Pinball Hall of Fame\",\n        \"placeDetails\": \"Experience a collection of pinball machines from past to present at this affordable attraction.\",\n        \"placeImageUrl\": \"https://www.reviewjournal.com/wp-content/uploads/2021/05/15298274_web1_PINBALL-MAY11-21-004.jpg\",\n        \"geoCoordinates\": \"36.1157,-115.1716\",\n        \"ticketPricing\": \"Free entry, games cost 25-50¢ each\",\n        \"rating\": \"4.6 stars\",\n        \"time\": \"Afternoon\"\n      }\n    ]\n  }\n}\n```\n\nThis plan includes budget-friendly accommodations, free attractions, and affordable activities for a 3-day trip to Las Vegas. The itinerary covers must-see sites like the Strip and Fremont Street, as well as natural wonders like Red Rock Canyon and cultural attractions like the Pinball Hall of Fame." },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// // TODO: Following code needs to be updated for client-side apps.
// const candidates = result.response.candidates;
// for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//     for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//         const part = candidates[candidate_index].content.parts[part_index];
//         if (part.inlineData) {
//             try {
//                 const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//                 fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
//                 console.log(`Output written to: ${filename}`);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }
// console.log(result.response.text());


