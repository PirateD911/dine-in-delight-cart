
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center w-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your delicious meal is being prepared!
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="font-medium mb-2">Order Summary</p>
          <p className="text-sm text-gray-600 mb-1">Order ID: #DND{Math.floor(Math.random() * 10000)}</p>
          <p className="text-sm text-gray-600">Estimated delivery time: 30-45 minutes</p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90">
            <Link to="/menu">Order More Food</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full flex items-center justify-center">
            <Link to="/reservation">
              <Calendar className="mr-2 h-4 w-4" />
              Reserve a Table
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
