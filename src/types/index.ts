export interface ILocation {
  lat: number;
  lng: number;
}

export enum DashboardStatus {
  NO_SHIPMENT = "NO_SHIPMENT",
  SHIPMENT_INITIATED = "SHIPMENT_INITIATED",
  CUSTOMER_LOCATION_SELECTED = "CUSTOMER_LOCATION_SELECTED",
  // PICKUP_SELECTED = "PICKUP_SELECTED",
  // DROP_SELECTED = "DROP_SELECTED",
  SEARCHING_ASSOCIATES = "SEARCHING_ASSOCIATES",
  ASSOCIATE_ASSIGNED = "ASSOCIATE_ASSIGNED",
  PICKUP_LOCATION_REACHED = "PICKUP_LOCATION_REACHED",
  TRANSPORTING = "TRANSPORTING",
  DROP_LOCATION_REACHED = "DROP_LOCATION_REACHED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface State {
  customerLocation: ILocation | null;
  isCustomerLocationSelect: boolean;
  driverLocation: ILocation | null;
  dashboardStatus: DashboardStatus;
}
