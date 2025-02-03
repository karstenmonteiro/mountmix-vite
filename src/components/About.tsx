import { Mountain, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-gold/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
            About Mountain Mixology
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Crafting unforgettable experiences through exceptional cocktails and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass p-6 rounded-lg text-center animate-fade-in">
            <Mountain className="h-10 w-10 mx-auto mb-4 text-purple" />
            <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
            <p className="text-foreground/80">
              Based in the heart of the mountains, we bring local flavors to every event.
            </p>
          </div>

          <div className="glass p-6 rounded-lg text-center animate-fade-in [animation-delay:200ms]">
            <Award className="h-10 w-10 mx-auto mb-4 text-purple" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-foreground/80">
              Using only the finest ingredients and craft spirits in our cocktails.
            </p>
          </div>

          <div className="glass p-6 rounded-lg text-center animate-fade-in [animation-delay:400ms]">
            <Clock className="h-10 w-10 mx-auto mb-4 text-purple" />
            <h3 className="text-xl font-semibold mb-2">10+ Years</h3>
            <p className="text-foreground/80">
              A decade of experience crafting memorable events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;