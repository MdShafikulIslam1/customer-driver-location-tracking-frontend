/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ILocation } from "@/types";
import {
    DirectionsRenderer,
    GoogleMap,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const customerPosition = {
  lat: 23.858334,
  lng: 90.26667,
};

const center = { lat: 23.7666304, lng: 90.4134656 }; // Dhaka, Bangladesh

const Map = ({
  driverLocation,
  customerLocation,
}: {
  driverLocation: ILocation | null;
  customerLocation: ILocation | null;
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  console.log("customer location in map component", customerLocation);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  // const [driverLocation, setDriverLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // }>({
  //   lat: 23.685,
  //   lng: 90.3563,
  // });

//   const onLoad = (map: google.maps.Map) => {
//     mapRef.current = map;
//     const bounds = new window.google.maps.LatLngBounds();
//     bounds.extend(driverLocation as ILocation);
//     bounds.extend(customerPosition);
//     map.fitBounds(bounds);
//   };

  const calculateRoute = () => {
    if (!isLoaded || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: customerLocation as ILocation, // নতুন ড্র্যাগকৃত লোকেশন
        destination: driverLocation as ILocation, // কাস্টমার অবস্থান
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("result", result);
          setDirections(result);
        } else {
          console.error("Directions request failed: " + status);
        }
      }
    );
  };

  useEffect(() => {
    if (customerLocation) {
      calculateRoute(); // ✅ কাস্টমার লোকেশন প্রথমবার সেট হলে কল হবে
    }
    // driverLocationChanged(driverLocation); // ✅ ড্রাইভার লোকেশন চেঞ্জ হলে কল হবে
  }, [driverLocation, customerLocation]); // ✅ দুই ক্ষেত্রেই কল হবে


  return (
    <div className="bg-slate-200">
      {isLoaded ? (
        <GoogleMap
        //   onLoad={onLoad}
          mapContainerStyle={containerStyle}
          center={center as ILocation}
          zoom={10}
        >
          {/* নতুন রুট */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: { strokeColor: "#FF0000", strokeWeight: 5 },
                suppressMarkers: true,
              }}
            />
          )}
          {/* ড্রাইভার মার্কার */}
          {driverLocation && (
            <Marker
              opacity={1}
              zIndex={999}
              position={driverLocation}
              label={"Driver"}
              title="Driver's current location"
            />
          )}

          {/* কাস্টমার মার্কার */}
          {customerLocation && (
            <Marker
              opacity={1}
              zIndex={999}
              position={customerLocation}
              label={"Customer"}
              title="Customer's current location"
            />
          )}
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}      
    </div>
  );
};

export default Map;
