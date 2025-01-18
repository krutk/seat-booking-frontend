// Frontend types (frontend/src/types/index.ts)
export interface User {
    id: number;
    email: string;
  }
  
  export interface Seat {
    id: number;
    seat_number: number;
    row_number: number;
    is_booked: boolean;
    booked_by: number | null;
    booking_time: string | null;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
    user: User;
  }
  
  export interface ApiError {
    message: string;
    error?: string;
  }