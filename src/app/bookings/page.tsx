'use client';

import { useState, useEffect } from 'react';
import { getSeats } from '@/lib/api';
import SeatLayout from '@/components/SeatLayout';
import SeatSkeleton from '@/components/SeatSkeleton';
import BookingForm from '@/components/BookingForm';
import { Seat, ApiError } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Bookings() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSeats = async () => {
    try {
      setIsLoading(true);
      const response = await getSeats();
      setSeats(response.data);
    } catch (error) {
      const err = error as ApiError;
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || 'Failed to fetch seats',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      }
      if (prevSelectedSeats.length >= 7) {
        return prevSelectedSeats;
      }
      return [...prevSelectedSeats, seatNumber];
    });
  };

  const handleBookingComplete = () => {
    fetchSeats();
    setSelectedSeats([]);
  };

  return (
    <div className="container px-6 my-6 mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">Seat Reservation</h1>
        <p className="text-muted-foreground">Select up to 7 seats to book your journey</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="order-2 xl:order-1">
          {isLoading ? (
            <SeatSkeleton />
          ) : (
            <SeatLayout
              seats={seats}
              onSeatSelect={handleSeatSelect}
              selectedSeats={selectedSeats}
            />
          )}
        </div>

        <div className="order-1 xl:order-2 sticky top-20">
          <BookingForm
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            onBookingComplete={handleBookingComplete}
            availableSeats={seats.filter((seat) => !seat.is_booked)}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
