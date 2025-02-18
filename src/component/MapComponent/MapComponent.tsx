"use client";

import { ILocation } from "@/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "500px",
};

const center = { lat: 23.7666304, lng: 90.4134656 }; // Dhaka, Bangladesh

export default function MapComponent({customerLocation}:{customerLocation?:ILocation | null}) {
// const postion = useMovingLocation()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  // const [currentPosition, setCurrentPosition] = useState<google.maps.LatLng | null>(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentPosition(new google.maps.LatLng(latitude, longitude));
  //       },
  //       (error) => console.error(error),
  //       { enableHighAccuracy: true }
  //     );
  //   }
  // }, []);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={customerLocation ? customerLocation : center} zoom={14}>
     {customerLocation &&  <Marker position={customerLocation} />}
      {/* {center && <Marker position={center} />} */}
    </GoogleMap>
  );
}

 

