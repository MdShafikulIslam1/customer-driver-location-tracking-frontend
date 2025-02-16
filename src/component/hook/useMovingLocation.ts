"use client";
import { useEffect, useState } from "react";

const useLiveLocation = () => {
  const [position, setPosition] = useState({ lat: 23.8103, lng: 90.4125 }); // Default: Dhaka

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    console.log("navigator.geolocation", navigator.geolocation);

    // Watch user's position
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return position;
};

export default useLiveLocation;
