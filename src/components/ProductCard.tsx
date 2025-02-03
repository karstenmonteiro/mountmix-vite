import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start space-y-2">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground">${price}</p>
        <Button 
          onClick={() => navigate(`/product/${id}`)}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;