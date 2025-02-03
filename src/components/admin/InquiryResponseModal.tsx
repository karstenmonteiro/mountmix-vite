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

interface InquiryResponseModalProps {
  inquiry: any;
  isOpen: boolean;
  onClose: () => void;
  onRespond: (id: string, status: string, response: string) => void;
}

const InquiryResponseModal = ({
  inquiry,
  isOpen,
  onClose,
  onRespond,
}: InquiryResponseModalProps) => {
  const [response, setResponse] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
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
        inquiryId: inquiry.id,
        recipientEmail: inquiry.email,
        recipientName: inquiry.name,
        responseMessage: response,
      });

      // Send email
      const { data, error: emailError } = await supabase.functions.invoke("send-inquiry-response", {
        body: {
          inquiryId: inquiry.id,
          recipientEmail: inquiry.email,
          recipientName: inquiry.name,
          responseMessage: response,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        throw emailError;
      }

      console.log("Email response:", data);

      // Update inquiry status
      onRespond(inquiry.id, "responded", response);
      
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
          <DialogTitle>Respond to Inquiry</DialogTitle>
          <DialogDescription>
            Review the inquiry details and send your response.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{inquiry.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{inquiry.email}</p>
            </div>
            <div className="col-span-2">
              <label className="font-semibold">Message:</label>
              <p className="whitespace-pre-wrap">{inquiry.message}</p>
            </div>
            <div>
              <label className="font-semibold">Date:</label>
              <p>{format(new Date(inquiry.created_at), 'MMM d, yyyy')}</p>
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
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryResponseModal;