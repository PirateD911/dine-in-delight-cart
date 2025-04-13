
import { useState } from 'react';
import { menuItems } from '@/data/menu-data';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const Menu = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients for an unforgettable dining experience.
          </p>
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
                <MenuCard key={item.id} item={item} addToCart={addItem} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <MenuCard key={item.id} item={item} addToCart={addItem} />
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
}

const MenuCard = ({ item, addToCart }: MenuCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md menu-card-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-restaurant-primary font-medium">${item.price.toFixed(2)}</span>
          <Button 
            onClick={() => 
              addToCart({
                id: item.id, 
                name: item.name, 
                price: item.price,
                image: item.image
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
