
import { useState, useEffect } from 'react';
import { menuItems } from '@/data/menu-data';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Exchange rate: 1 USD = 75 INR
const USD_TO_INR = 75;

const Menu = () => {
  const { addItem, items, updateQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if table is selected
    const tableNumber = localStorage.getItem("selectedTable");
    setSelectedTable(tableNumber);
  }, []);
  
  const categories = [
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' },
  ];
  
  const filteredItems = searchTerm
    ? menuItems.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems;
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <Badge className="mb-2">Our Offerings</Badge>
          <h1 className="text-4xl font-bold font-serif text-restaurant-dark mb-4">
            Explore Our Menu
          </h1>
          {selectedTable ? (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Table <span className="font-semibold">{selectedTable}</span> - Discover our carefully crafted dishes made with the finest ingredients.
            </p>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 max-w-2xl mx-auto mb-6">
              <p className="text-yellow-700">
                You haven't selected a table yet. Please select a table to continue ordering.
              </p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => navigate('/')}
              >
                Select a Table
              </Button>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or description..."
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-restaurant-primary focus:ring focus:ring-restaurant-primary/20 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  addToCart={addItem} 
                  cartItems={items} 
                  updateQuantity={updateQuantity} 
                  usdToInr={USD_TO_INR}
                />
              ))}
            </div>
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <MenuCard 
                      key={item.id} 
                      item={item} 
                      addToCart={addItem} 
                      cartItems={items} 
                      updateQuantity={updateQuantity} 
                      usdToInr={USD_TO_INR}
                    />
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

interface MenuCardProps {
  item: typeof menuItems[0];
  addToCart: (item: Omit<import('@/hooks/use-cart').CartItem, 'quantity'>) => void;
  cartItems: import('@/hooks/use-cart').CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  usdToInr: number;
}

const MenuCard = ({ item, addToCart, cartItems, updateQuantity, usdToInr }: MenuCardProps) => {
  // Check if the item is already in cart
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const isOutOfStock = item.isAvailable === false;

  const handleAddToCart = () => {
    if (!localStorage.getItem("selectedTable")) {
      toast.error("Please select a table first");
      return;
    }

    if (isOutOfStock) {
      toast.error(`${item.name} is currently out of stock`);
      return;
    }
    
    addToCart({
      id: item.id, 
      name: item.name, 
      price: item.price,
      image: item.image
    });
  };

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md menu-card-hover ${isOutOfStock ? 'opacity-75' : ''}`}>
      <div className="h-48 overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 transform rotate-12">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Out of Stock</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-restaurant-primary font-medium">₹{(item.price * usdToInr).toFixed(2)}</span>
          
          {isOutOfStock ? (
            <Button disabled className="opacity-60 cursor-not-allowed">
              Out of Stock
            </Button>
          ) : quantity === 0 ? (
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <Button 
                size="icon" 
                variant="outline"
                className="h-8 w-8 rounded-full bg-restaurant-primary text-white border-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={() => updateQuantity(item.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
