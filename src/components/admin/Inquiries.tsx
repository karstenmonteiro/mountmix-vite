import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import InquiryResponseModal from "./InquiryResponseModal";

interface InquiriesProps {
  inquiries: any[];
  onRespond: (id: string, status: string, response: string) => void;
}

const Inquiries = ({ inquiries, onRespond }: InquiriesProps) => {
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  if (!inquiries || inquiries.length === 0) {
    return (
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle>Contact Form Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No inquiries found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <CardTitle>Contact Form Inquiries</CardTitle>
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
              {inquiries.map((inquiry) => (
                <TableRow 
                  key={inquiry.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell><StatusBadge status={inquiry.status} /></TableCell>
                  <TableCell>
                    {inquiry.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-green-500 hover:text-white transition-colors"
                        onClick={() => setSelectedInquiry(inquiry)}
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
      
      {selectedInquiry && (
        <InquiryResponseModal
          inquiry={selectedInquiry}
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onRespond={onRespond}
        />
      )}
    </Card>
  );
};

export default Inquiries;