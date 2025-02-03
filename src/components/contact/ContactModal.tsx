import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";
import ContactHeader from "./ContactHeader";

interface ContactModalProps {
  children?: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">Contact Us</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="py-6">
          <ContactHeader />
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;