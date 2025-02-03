import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { Menu, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  session: Session | null;
  onSignOut: () => void;
  isAdmin: boolean;
}

const MobileMenu = ({
  isOpen,
  setIsOpen,
  scrollToSection,
  session,
  onSignOut,
  isAdmin,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
              Menu
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col space-y-4">
            <NavLinks
              scrollToSection={scrollToSection}
              isMobile
              onMobileClick={() => setIsOpen(false)}
            />
            {session && isAdmin && (
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/admin/dashboard");
                  setIsOpen(false);
                }}
                className="w-full justify-start"
              >
                <UserCog className="h-5 w-5 mr-2" />
                Admin Dashboard
              </Button>
            )}
            {session ? (
              <Button
                variant="outline"
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;