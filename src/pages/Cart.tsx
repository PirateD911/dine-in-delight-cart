
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Exchange rate: 1 USD = 75 INR
const USD_TO_INR = 75;

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const handleCheckout = (values: z.infer<typeof formSchema>) => {
    // Here in a real app, we would send the order to the backend API
    // For now, we'll just simulate a successful order

    // Store order data in localStorage for demonstration
    const tableNumber = localStorage.getItem('selectedTable') || 'Unknown';
    const order = {
      items,
      tableNumber,
      totalAmount: totalPrice,
      customerName: values.name,
      customerPhone: values.phone,
      status: 'pending',
      date: new Date(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    
    // Clear the cart and navigate to success page
    clearCart();
    
    // Navigate to success page with customer name
    navigate('/checkout-success', { state: { customerName: values.name } });
  };

  // Handle clicking on Checkout button
  const openCheckout = () => {
    const tableNumber = localStorage.getItem('selectedTable');
    if (!tableNumber) {
      toast.error('Please select a table before checkout');
      navigate('/');
      return;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsCheckoutOpen(true);
  };

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-restaurant-dark mb-4">
            Your Cart
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your order before checking out
          </p>
        </div>

        {isEmpty ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4 w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={() => navigate('/menu')}
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">
                      ₹{(item.price * USD_TO_INR).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{(item.price * item.quantity * USD_TO_INR).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{(totalPrice * USD_TO_INR).toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-t gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/menu')}
              >
                Continue Shopping
              </Button>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button 
                  className="bg-restaurant-primary hover:bg-restaurant-primary/90"
                  onClick={openCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Checkout Sheet */}
        <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Complete your order</SheetTitle>
              <SheetDescription>
                Enter your details to complete the order
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-gray-50 rounded-md p-4 my-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Table Number</span>
                      <span className="font-medium">{localStorage.getItem('selectedTable')}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">₹{(totalPrice * USD_TO_INR).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <SheetFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                    >
                      Place Order
                    </Button>
                  </SheetFooter>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Cart;
