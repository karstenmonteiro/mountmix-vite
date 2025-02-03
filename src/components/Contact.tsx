import BookingForm from "./booking/BookingForm";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
            Book Your Event
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Ready to elevate your next event? Fill out the form below to start planning your custom cocktail experience.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass p-8 rounded-lg animate-fade-in">
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;