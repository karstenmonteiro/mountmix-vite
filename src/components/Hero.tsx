import { Button } from "@/components/ui/button";
import BookingModal from "./booking/BookingModal";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/lovable-uploads/af50175f-4b34-4140-b5cb-318086ab41c6.png')] bg-cover bg-center transition-all duration-500"
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 glass" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
            Elevate Your Events with Craft Cocktails
          </h1>
          <p className="text-lg md:text-xl mb-8 text-foreground/80">
            Professional cocktail catering services for memorable mountain experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingModal>
              <Button className="bg-purple hover:bg-purple-dark text-white px-8 py-6 text-lg">
                Book Your Event
              </Button>
            </BookingModal>
            <Button variant="outline" className="border-purple text-purple hover:bg-purple/10 px-8 py-6 text-lg">
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;