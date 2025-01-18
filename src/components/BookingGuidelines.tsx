import { Card } from "./ui/card";
import { Info } from "lucide-react";

export default function BookingGuidelines() {
  return (
    <Card className="p-6 mb-6 bg-muted/50">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5" />
        <h3 className="font-bold">Booking Guidelines</h3>
      </div>
      <ul className="grid gap-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          • You can book up to 7 seats at a time
        </li>
        <li className="flex items-center gap-2">
          • Seats in the same row will be prioritized
        </li>
        <li className="flex items-center gap-2">
          • The train has 80 seats with 7 seats per row (last row has 3 seats)
        </li>
        <li className="flex items-center gap-2">
          • Click on available seats to select them
        </li>
      </ul>
    </Card>
  );
} 