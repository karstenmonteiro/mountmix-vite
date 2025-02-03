import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import BookingResponseModal from "./BookingResponseModal";
import type { Database } from "@/integrations/supabase/types";

type BookingRequest = Database['public']['Tables']['booking_requests']['Row'];

interface BookingRequestsProps {
  bookings: BookingRequest[];
  onRespond: (id: string, status: string, response: string) => void;
}

const BookingRequests = ({ bookings, onRespond }: BookingRequestsProps) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  if (!bookings || bookings.length === 0) {
    return (
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No booking requests found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <CardTitle>Booking Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow 
                  key={booking.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {format(new Date(booking.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell><StatusBadge status={booking.status || 'pending'} /></TableCell>
                  <TableCell>
                    {(!booking.status || booking.status === 'pending') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white transition-colors"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        Respond
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      {selectedBooking && (
        <BookingResponseModal
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onRespond={onRespond}
        />
      )}
    </Card>
  );
};

export default BookingRequests;