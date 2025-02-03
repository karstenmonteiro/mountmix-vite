import { GlassWater, Wine, Beer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cocktails = [
  {
    name: "Mountain Mule",
    description: "Our signature take on the Moscow Mule, featuring local craft gin and fresh mountain herbs.",
    price: "$14",
    icon: GlassWater,
  },
  {
    name: "Alpine Spritz",
    description: "A refreshing blend of prosecco, elderflower liqueur, and fresh botanicals.",
    price: "$16",
    icon: Wine,
  },
  {
    name: "Peak Old Fashioned",
    description: "Small-batch bourbon, house-made bitters, and maple syrup from local producers.",
    price: "$18",
    icon: Beer,
  },
];

const Cocktails = () => {
  return (
    <section id="cocktails" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
            Signature Cocktails
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Discover our handcrafted cocktails, each designed to elevate your event with unique flavors and local ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocktails.map((cocktail, index) => (
            <Card key={index} className="glass hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">{cocktail.name}</CardTitle>
                  <cocktail.icon className="h-6 w-6 text-purple" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{cocktail.description}</p>
                <p className="text-gold font-semibold">{cocktail.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cocktails;