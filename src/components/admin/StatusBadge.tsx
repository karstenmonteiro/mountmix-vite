import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: string | null;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-500"><CheckCircle className="w-4 h-4 mr-1" /> Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500"><XCircle className="w-4 h-4 mr-1" /> Rejected</Badge>;
    default:
      return <Badge className="bg-yellow-500"><Clock className="w-4 h-4 mr-1" /> Pending</Badge>;
  }
};

export default StatusBadge;