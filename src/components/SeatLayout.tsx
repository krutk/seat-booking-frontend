'use client';

import { Seat } from '@/types';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { SEATS_PER_ROW, TOTAL_ROWS, getRowNumber } from '@/lib/seatUtils';

interface SeatLayoutProps {
  seats: Seat[];
  onSeatSelect: (seatNumber: number) => void;
  selectedSeats: number[];
}

export default function SeatLayout({ seats, onSeatSelect, selectedSeats }: SeatLayoutProps) {
  const rows: Seat[][] = [];
  
  // Group seats by row
  for (let i = 0; i < TOTAL_ROWS; i++) {
    const rowSeats = seats.filter((seat) => getRowNumber(seat.seat_number) === i + 1);
    rows.push(rowSeats);
  }

  return (
    <Card className="p-4 md:p-6 space-y-6 overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Train Layout</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span>Available</span>
          </div>
        </div>
      </div>

      <div className="min-w-[600px] grid gap-4 md:gap-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 justify-start">
            <div className="w-8 flex items-center justify-center font-mono text-sm">
              {rowIndex + 1}
            </div>
            <div className="flex gap-2">
              {row.map((seat) => (
                <button
                  key={seat.seat_number}
                  onClick={() => !seat.is_booked && onSeatSelect(seat.seat_number)}
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                    "hover:scale-105 active:scale-95",
                    seat.is_booked && "bg-red-500 text-white cursor-not-allowed",
                    selectedSeats.includes(seat.seat_number) && "bg-green-500 text-white",
                    !seat.is_booked && !selectedSeats.includes(seat.seat_number) && 
                    "bg-blue-500 text-white hover:bg-blue-600",
                    rowIndex === TOTAL_ROWS - 1 && "last-row"
                  )}
                  disabled={seat.is_booked}
                >
                  {seat.seat_number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
