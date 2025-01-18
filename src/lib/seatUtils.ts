export const SEATS_PER_ROW = 7;
export const TOTAL_SEATS = 80;
export const TOTAL_ROWS = Math.ceil(TOTAL_SEATS / SEATS_PER_ROW);

export function getRowNumber(seatNumber: number): number {
  return Math.ceil(seatNumber / SEATS_PER_ROW);
}

export function getAvailableSeatsInRow(seats: any[], rowNumber: number): number[] {
  return seats
    .filter(seat => 
      getRowNumber(seat.seat_number) === rowNumber && 
      !seat.is_booked
    )
    .map(seat => seat.seat_number);
}

export function findBestAvailableSeats(seats: any[], requestedCount: number): number[] {
  // Try to find seats in the same row first
  for (let rowNum = 1; rowNum <= TOTAL_ROWS; rowNum++) {
    const availableInRow = getAvailableSeatsInRow(seats, rowNum);
    if (availableInRow.length >= requestedCount) {
      return availableInRow.slice(0, requestedCount);
    }
  }

  // If no single row has enough seats, find nearest available seats
  const allAvailableSeats = seats
    .filter(seat => !seat.is_booked)
    .map(seat => seat.seat_number)
    .sort((a, b) => {
      const rowA = getRowNumber(a);
      const rowB = getRowNumber(b);
      return rowA - rowB;
    });

  return allAvailableSeats.slice(0, requestedCount);
} 