import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingResponseModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onRespond: (id: string, status: string, response: string) => void;
}

const BookingResponseModal = ({
  booking,
  isOpen,
  onClose,
  onRespond,
}: BookingResponseModalProps) => {
  const [response, setResponse] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (status: 'approved' | 'rejected') => {
    if (!response.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response message",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      console.log("Sending response to:", {
        bookingId: booking.id,
        recipientEmail: booking.email,
        recipientName: booking.name,
        responseMessage: response,
        status: status
      });

      // Send email
      const { data, error: emailError } = await supabase.functions.invoke("send-booking-response", {
        body: {
          bookingId: booking.id,
          recipientEmail: booking.email,
          recipientName: booking.name,
          responseMessage: response,
          status: status
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        throw emailError;
      }

      console.log("Email response:", data);

      // Update booking status
      onRespond(booking.id, status, response);
      
      toast({
        title: "Success",
        description: "Response sent successfully",
      });
      
      onClose();
    } catch (error: any) {
      console.error("Error sending response:", error);
      toast({
        title: "Error",
        description: "Failed to send response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Respond to Booking Request</DialogTitle>
          <DialogDescription>
            Review the booking details and send your response.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{booking.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{booking.email}</p>
            </div>
            <div>
              <label className="font-semibold">Phone:</label>
              <p>{booking.phone}</p>
            </div>
            <div>
              <label className="font-semibold">Event Date:</label>
              <p>{format(new Date(booking.event_date), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <label className="font-semibold">Event Type:</label>
              <p>{booking.event_type}</p>
            </div>
            <div>
              <label className="font-semibold">Location:</label>
              <p>{booking.location}</p>
            </div>
            <div>
              <label className="font-semibold">Guests:</label>
              <p>{booking.guests}</p>
            </div>
            <div>
              <label className="font-semibold">Date Submitted:</label>
              <p>{format(new Date(booking.created_at), 'MMM d, yyyy')}</p>
            </div>
            <div className="col-span-2">
              <label className="font-semibold">Message:</label>
              <p className="whitespace-pre-wrap">{booking.message}</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Your Response:</label>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response here..."
              className="min-h-[150px]"
            />
          </div>
        </div>
        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleSubmit('rejected')}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Reject Booking"}
          </Button>
          <Button
            onClick={() => handleSubmit('approved')}
            disabled={isSending}
            className="bg-green-500 hover:bg-green-600"
          >
            {isSending ? "Sending..." : "Approve Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingResponseModal;