"use client";
import MapComponent from "@/component/MapComponent/MapComponent";
import { useCreateShipmentMutation } from "@/redux/api/shipment";
import {
  setCustomerLocationSelected,
  setCustomerPosition
} from "@/redux/feature/dasboardSlice/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { DashboardStatus } from "@/types";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});



const DashboardPage = () => {

  const session = useSession()
  const userId = session.data?.user?._id;

  const {
    customerLocation,
    dashboardStatus,
    driverLocation,
    isCustomerLocationSelect,
  } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const [createShipment] = useCreateShipmentMutation()

  const [selectCustomerPosition, setSelectCustomerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry?.location) {
        setSelectCustomerPosition(place.geometry.location.toJSON());
      }
    }
  };

  const setCurrentPositionHandler = () => {
    dispatch(setCustomerPosition());
  };

  const confirmCustomerLocationHandler = async () => {
    if (!selectCustomerPosition) {
      alert("Please select a customer location");
      return;
    }

    try {

      dispatch(setCustomerLocationSelected(selectCustomerPosition));
      const shipmentData = {
        ...selectCustomerPosition,
        userId
      }

      const shipment = await createShipment(shipmentData).unwrap()

      console.log("shipment created successfully",shipment);
      
    } catch (error) {
      console.log("shipment created failed",error)
    }



  };

  if (!isLoaded) {
    return <p>loadding....</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6">
        {/* User Info Section */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-800">
              Name: Static name
            </p>
            <p className="text-sm text-gray-600">Email: Static email</p>
          </div>
          <div className="mt-10">
            {dashboardStatus === DashboardStatus.NO_SHIPMENT ? (
              <div>
                <button
                  onClick={() => setCurrentPositionHandler()}
                  className="block w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Set my location
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search for a place"
                  style={{ width: "300px" }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  ref={(input) => {
                    if (input && !searchBoxRef.current) {
                      searchBoxRef.current = new google.maps.places.SearchBox(
                        input
                      );
                      searchBoxRef.current.addListener(
                        "places_changed",
                        handlePlacesChanged
                      );
                    }
                  }}
                />
              </div>
            )}
          </div>
          {/* confirm customer location button */}

          {dashboardStatus === DashboardStatus.SHIPMENT_INITIATED && (
            <div className="mt-8">
              <button
                onClick={() => confirmCustomerLocationHandler()}
                className="block w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              >
                Confirm Location
              </button>
            </div>
          )}

          {dashboardStatus === DashboardStatus.CUSTOMER_LOCATION_SELECTED && (
            <div className="bg-blue-950 text-white p-4 rounded-lg shadow-md animate-pulse mt-8">
              <p className="text-sm text-gray-300 text-center">
                please wait a few seconds for connecting a driver
              </p>
            </div>
          )}
        </div>

        {/* Map Component Section */}
        <div className="col-span-3">
          <MapComponent customerLocation={customerLocation} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
