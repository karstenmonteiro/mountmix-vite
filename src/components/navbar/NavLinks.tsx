import { useLocation, useNavigate } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import ContactModal from "../contact/ContactModal";
import { Button } from "@/components/ui/button";

interface NavLinksProps {
  scrollToSection: (sectionId: string) => void;
  isMobile?: boolean;
  onMobileClick?: () => void;
}

const NavLinks = ({ scrollToSection, isMobile, onMobileClick }: NavLinksProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
    if (isMobile && onMobileClick) {
      onMobileClick();
    }
  };

  const linkClass = isMobile
    ? "text-foreground/90 hover:text-foreground block px-3 py-2 rounded-md w-full text-left"
    : "text-foreground/90 hover:text-foreground px-3 py-2 rounded-md";

  return (
    <>
      <button onClick={() => handleNavigation('services')} className={linkClass}>
        Services
      </button>
      <button onClick={() => handleNavigation('cocktails')} className={linkClass}>
        Cocktails
      </button>
      <button onClick={() => handleNavigation('about')} className={linkClass}>
        About
      </button>
      <ContactModal>
        <button className={linkClass}>
          <Mail className="h-5 w-5" />
        </button>
      </ContactModal>
      <a 
        href="https://instagram.com/mountain.mixology" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onMobileClick}
      >
        <Instagram className="h-5 w-5" />
      </a>
      <Button 
        variant="outline" 
        className={isMobile ? "w-full justify-start" : ""} 
        onClick={() => handleNavigation('contact')}
      >
        Book Now
      </Button>
    </>
  );
};

export default NavLinks;