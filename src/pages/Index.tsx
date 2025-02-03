import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Laptop",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5"
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/products")}
            className="bg-white text-primary hover:bg-white/90"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;