import { DashboardStatus, State } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: State = {
  customerLocation: null,
  isCustomerLocationSelect: false,
  driverLocation: null,
  dashboardStatus: DashboardStatus.NO_SHIPMENT,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCustomerPosition(state) {
      state.isCustomerLocationSelect = false;
      state.dashboardStatus = DashboardStatus.SHIPMENT_INITIATED;
    },
    setCustomerLocationSelected(
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) {
      return {
        ...state,
        customerLocation: action.payload,
        isCustomerLocationSelect: false,
        dashboardStatus: DashboardStatus.CUSTOMER_LOCATION_SELECTED,
      };
    },
  },
});

export const { setCustomerPosition, setCustomerLocationSelected } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
