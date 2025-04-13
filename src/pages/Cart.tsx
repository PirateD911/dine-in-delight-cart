
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate a payment process
    setTimeout(() => {
      toast.success('Payment successful!');
      clearCart();
      setIsProcessing(false);
      navigate('/checkout-success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-10 w-10 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">Your Cart</h1>
          <Button 
            variant="outline" 
            size="sm"
            className="text-gray-500"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="sm:ml-6 flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium">{item.name}</h3>
                            <p className="ml-4 font-medium text-restaurant-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-auto flex justify-between items-end">
                            <div className="flex items-center border rounded-md">
                              <button
                                type="button"
                                className="p-2"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4">{item.quantity}</span>
                              <button
                                type="button"
                                className="p-2"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-red-600 transition-colors"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button variant="outline" asChild className="inline-flex items-center">
                <Link to="/menu">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base">
                    <p>Tax (10%)</p>
                    <p>${(totalPrice * 0.1).toFixed(2)}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-medium">
                      <p>Total</p>
                      <p>${(totalPrice * 1.1).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Including VAT
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Alert className="mb-4">
                    <CreditCard className="h-4 w-4" />
                    <AlertTitle>Demo Payment</AlertTitle>
                    <AlertDescription>
                      This is a demo checkout. No real payment will be processed.
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                  >
                    {isProcessing ? 'Processing...' : 'Checkout'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
