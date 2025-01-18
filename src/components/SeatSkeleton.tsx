export default function SeatSkeleton() {
  // Create 12 rows with 7 seats each (last row has 3)
  return (
    <div className="p-6 space-y-6 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-muted animate-pulse rounded" />
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {Array.from({ length: 12 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 justify-center">
            <div className="w-8 flex items-center justify-center">
              <div className="h-6 w-6 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: rowIndex === 11 ? 3 : 7 }).map((_, seatIndex) => (
                <div
                  key={seatIndex}
                  className="w-12 h-12 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 