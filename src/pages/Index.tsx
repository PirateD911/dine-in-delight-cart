
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChefHat } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  // Check if a table is already selected
  const selectedTable = localStorage.getItem("selectedTable");
  
  // If table is already selected, redirect to menu
  if (selectedTable) {
    navigate('/menu');
    return null;
  }

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber.trim()) {
      toast.error("Please enter a table number");
      return;
    }
    
    // Save table number to local storage
    localStorage.setItem("selectedTable", tableNumber);
    toast.success(`Table ${tableNumber} selected! You can now order food.`);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1L5 5M15 15L19 19M5 19L1 15M19 1L15 5M1 5L5 1M15 19L19 15M5 15L1 19M19 5L15 1\' stroke=\'%23F97316\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Content container */}
      <div className="w-full max-w-md px-6 py-12 bg-white rounded-2xl shadow-xl z-10 transform transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center text-center mb-8">
          {/* Logo icon */}
          <div className="w-16 h-16 bg-restaurant-primary/10 rounded-full flex items-center justify-center mb-6">
            <ChefHat className="w-8 h-8 text-restaurant-primary" />
          </div>

          {/* Restaurant Name */}
          <h1 className="font-serif text-4xl font-bold text-restaurant-dark mb-2">
            Dine<span className="text-restaurant-primary">Delight</span>
          </h1>
          <p className="text-gray-500 text-lg">Our every flavor tells a story.</p>
        </div>

        <form onSubmit={handleTableSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="table" className="block text-sm font-medium text-gray-700">
              Table Number
            </label>
            <Input
              id="table"
              type="text"
              placeholder="Enter your table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full border-2 border-gray-200 h-14 rounded-lg text-lg px-4"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit"
              className="flex-1 bg-restaurant-primary hover:bg-restaurant-primary/90 h-12 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-base"
            >
              Start Order <ArrowRight className="h-5 w-5" />
            </Button>

            <Button 
              type="button" 
              variant="outline"
              className="flex-1 h-12 border-2 text-base font-medium"
              onClick={() => navigate('/admin')}
            >
              Admin Login
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500">
        <p>© 2025 DineDelight. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
