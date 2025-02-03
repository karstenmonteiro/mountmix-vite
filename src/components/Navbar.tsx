import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate("/")}
              className="text-xl font-bold cursor-pointer"
            >
              ShopHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/categories")}
            >
              Categories
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8">
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <p className="text-muted-foreground mt-4">No items in cart</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col space-y-4">
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      navigate("/products");
                      setIsMenuOpen(false);
                    }}
                  >
                    Products
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      navigate("/categories");
                      setIsMenuOpen(false);
                    }}
                  >
                    Categories
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;