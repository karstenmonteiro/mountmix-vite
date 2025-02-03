import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];
type ChatSession = Database['public']['Tables']['chat_sessions']['Row'];

const ChatInterface = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
    subscribeToSessions();
    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id);
      subscribeToMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return;
    }

    setSessions(data);
    if (data.length > 0 && !selectedSession) {
      setSelectedSession(data[0]);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data);
  };

  const subscribeToSessions = () => {
    const channel = supabase
      .channel('chat_sessions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_sessions' },
        (payload) => {
          console.log('Chat sessions change received:', payload);
          fetchSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToMessages = (sessionId: string) => {
    const channel = supabase
      .channel(`chat_messages_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log('New message received:', payload);
          fetchMessages(sessionId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendEmailNotification = async (message: string) => {
    if (!selectedSession) return;

    try {
      const { error } = await supabase.functions.invoke('send-chat-notification', {
        body: {
          recipientEmail: selectedSession.user_email,
          recipientName: selectedSession.user_name,
          senderName: 'Mountain Mixology Support',
          message: message,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending email notification:', error);
      toast({
        title: "Error",
        description: "Failed to send email notification.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedSession) return;
    
    setIsSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: selectedSession.id,
          content: newMessage,
          sender_type: 'admin',
        });

      if (error) throw error;

      // Send email notification
      await sendEmailNotification(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <CardTitle>Chat Support</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Sessions List */}
        <div className="w-1/3 border-r pr-4">
          <ScrollArea className="h-[600px]">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 cursor-pointer rounded-lg mb-2 ${
                  selectedSession?.id === session.id
                    ? "bg-purple/10"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <h3 className="font-semibold">{session.user_name}</h3>
                <p className="text-sm text-muted-foreground">{session.user_email}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(session.created_at), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 h-[500px] mb-4">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_type === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender_type === 'admin'
                        ? 'bg-purple text-white rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {format(new Date(message.created_at), 'h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="flex gap-2 mt-auto">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isSending) {
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isSending}
            >
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;