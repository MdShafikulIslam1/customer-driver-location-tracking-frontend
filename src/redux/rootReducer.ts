import dashboardReducer from "@/redux/feature/dasboardSlice/dashboardSlice";
import baseApi from "./api/baseApi";

const reducer = {
  dashboard: dashboardReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
