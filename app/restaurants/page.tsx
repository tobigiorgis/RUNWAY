// "use client"; // Client component

// import { useState, useTransition } from "react";

// // Define types for place details
// type PlaceDetails = {
//   name: string;
//   rating?: number;
//   formatted_address: string;
//   formatted_phone_number?: string;
//   opening_hours?: {
//     weekday_text: string[];
//   };
//   photos?: {
//     photo_reference: string;
//   }[];
//   reviews?: {
//     text: string;
//   }[];
// };

// export default function Home() {
//   const [url, setUrl] = useState<string>("");
//   const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
//   const [isPending, startTransition] = useTransition();

//   // Function to fetch place details using the shortened Google Maps URL
//   const fetchPlaceDetails = async (shortUrl: string) => {
//     startTransition(() => {
//       fetch(`/api/getPlaceDetails?shortUrl=${encodeURIComponent(shortUrl)}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.result) {
//             setPlaceDetails(data.result);
//           } else {
//             console.error("Error fetching place details:", data.error);
//           }
//         })
//         .catch((error) => console.error("Fetch error:", error));
//     });
//   };

//   // Handle form submission
//   const handleUrlSubmit = () => {
//     if (url) {
//       fetchPlaceDetails(url);
//     } else {
//       alert("Please enter a valid Google Maps link.");
//     }
//   };

//   return (
//     <main className={`flex h-full py-20 flex-col bg-white items-center`}>
//       <h1>Google Maps Place Details</h1>
//       <input
//         type="text"
//         placeholder="Paste Google Maps link here"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         style={{ width: "300px", marginRight: "10px" }}
//       />
//       <button onClick={handleUrlSubmit} disabled={isPending}>
//         {isPending ? "Loading..." : "Get Details"}
//       </button>

//       {placeDetails && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>{placeDetails.name}</h2>
//           <p>Rating: {placeDetails.rating || "N/A"}</p>
//           <p>Address: {placeDetails.formatted_address}</p>
//           <p>Phone: {placeDetails.formatted_phone_number || "N/A"}</p>
//           <p>
//             Opening Hours:{" "}
//             {placeDetails.opening_hours
//               ? placeDetails.opening_hours.weekday_text.join(", ")
//               : "N/A"}
//           </p>
//           {placeDetails.photos && placeDetails.photos.length > 0 && (
//             <img
//               src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
//               alt={placeDetails.name}
//               style={{ maxWidth: "300px" }}
//             />
//           )}
//           {placeDetails.reviews && placeDetails.reviews.length > 0 && (
//             <div>
//               <h3>Reviews:</h3>
//               {placeDetails.reviews.map((review, index) => (
//                 <p key={index}>{review.text}</p>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </main>
//   );
// }
