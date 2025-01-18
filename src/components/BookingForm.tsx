'use client';

import { useState } from 'react';
import { bookSeats } from '@/lib/api';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { findBestAvailableSeats, getRowNumber, SEATS_PER_ROW } from '@/lib/seatUtils';

export default function BookingForm({ 
  onBookingComplete, 
  availableSeats, 
  selectedSeats, 
  setSelectedSeats,
  disabled 
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateSeatSelection = (seats: number[]) => {
    if (seats.length === 0) return 'Please select seats to book';
    if (seats.length > 7) return 'You can only book up to 7 seats at a time';
    
    // Check if better seat arrangement is possible
    const bestSeats = findBestAvailableSeats(availableSeats, seats.length);
    const selectedRows = new Set(seats.map(getRowNumber));
    const bestRows = new Set(bestSeats.map(getRowNumber));
    
    if (bestRows.size < selectedRows.size) {
      return 'Better seat arrangement is possible in a single row. Try suggested seats: ' + bestSeats.join(', ');
    }
    
    return null;
  };

  const suggestSeats = (count: number) => {
    const suggestedSeats = findBestAvailableSeats(availableSeats, count);
    setSelectedSeats(suggestedSeats);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validationError = validateSeatSelection(selectedSeats);
      if (validationError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: validationError,
        });
        return;
      }
      
      await bookSeats(selectedSeats);
      onBookingComplete();
      setSelectedSeats([]);
      
      toast({
        title: "Success!",
        description: "Your seats have been booked successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.response?.data?.message || 'Failed to book seats',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Book Seats</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Number of Seats</h3>
          <div className="grid grid-cols-7 gap-1 sm:flex sm:gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map(num => (
              <Button
                key={num}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => suggestSeats(num)}
                disabled={disabled || isLoading}
              >
                {num}
              </Button>
            ))}
          </div>
          
          <h3 className="font-medium mb-2">Selected Seats</h3>
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat: number) => (
                <div
                  key={seat}
                  className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                >
                  Seat {seat}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              {disabled 
                ? "Loading seats..." 
                : "No seats selected. Click on available seats to select them."}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={selectedSeats.length === 0 || isLoading || disabled}
        >
          {isLoading ? "Booking..." : "Book Selected Seats"}
        </Button>
      </form>
    </Card>
  );
}
