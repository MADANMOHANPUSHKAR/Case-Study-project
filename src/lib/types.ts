export interface Facility {
  id: string;
  name: string;
  type: "gym" | "pool";
  max_capacity: number;
}

export interface FacilityBooking {
  id: string;
  facility_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: "active" | "cancelled" | "checked_in";
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  capacity: number;
  is_workshop: boolean;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  user_id: string;
  status: "registered" | "attended";
}
