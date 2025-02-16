import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";
const SHIPMENT_URL = "/shipment";

export const shipmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // user sign-up api endpoint
    createShipment: build.mutation({
      query: (shipmentData) => {
        console.log("shipment data rudux", shipmentData);
        return {
          url: `${SHIPMENT_URL}/create`,
          method: "POST",
          body: shipmentData,
        };
      },
      invalidatesTags: [tagTypes.SHIPMENT],
    }),
  }),
});

export const { useCreateShipmentMutation } = shipmentApi;
