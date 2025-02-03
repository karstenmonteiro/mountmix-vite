import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import BookingHeader from "./BookingHeader";

interface BookingModalProps {
  children?: React.ReactNode;
}

const BookingModal = ({ children }: BookingModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">Book Now</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="py-6">
          <BookingHeader />
          <BookingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;