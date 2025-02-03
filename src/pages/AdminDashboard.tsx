import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, MessageSquare, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardStats from "@/components/admin/DashboardStats";
import BookingRequests from "@/components/admin/BookingRequests";
import Inquiries from "@/components/admin/Inquiries";
import UserManagement from "@/components/admin/UserManagement";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch website stats
      const { data: statsData, error: statsError } = await supabase
        .from('website_stats')
        .select('*')
        .maybeSingle();

      if (statsError) throw statsError;
      setStats(statsData || { page_views: 0, booking_requests_count: 0, contact_form_submissions: 0 });

      // Fetch booking requests
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        throw bookingsError;
      }
      
      console.log('Fetched bookings:', bookingsData);
      setBookings(bookingsData || []);

      // Fetch inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);

      // Fetch users with roles
      const { data: usersWithRoles, error: usersError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      setUsers(usersWithRoles || []);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (type: 'booking' | 'inquiry', id: string, status: string, response: string) => {
    try {
      const table = type === 'booking' ? 'booking_requests' : 'inquiries';
      console.log('Updating', type, 'with id:', id);

      const { error } = await supabase
        .from(table)
        .update({
          status,
          admin_response: response,
          responded_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error(`Error updating ${type}:`, error);
        throw error;
      }

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`,
      });
      
      // Refresh data after update
      fetchData();
      
    } catch (error: any) {
      console.error(`Error handling ${type} response:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${type}`,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="w-4 h-4 mr-2" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="inquiries">
            <MessageSquare className="w-4 h-4 mr-2" />
            Inquiries
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats stats={stats} />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingRequests 
            bookings={bookings} 
            onRespond={(id, status, response) => handleResponse('booking', id, status, response)} 
          />
        </TabsContent>

        <TabsContent value="inquiries">
          <Inquiries 
            inquiries={inquiries} 
            onRespond={(id, status, response) => handleResponse('inquiry', id, status, response)} 
          />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;