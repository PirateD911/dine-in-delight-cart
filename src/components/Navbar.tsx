
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { items } = useCart();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    // Check if table is selected
    const tableNumber = localStorage.getItem("selectedTable");
    setSelectedTable(tableNumber);
  }, []);

  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold text-restaurant-dark">Dine<span className="text-restaurant-primary">Delight</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-restaurant-primary transition-colors">Home</Link>
            <Link to="/menu" className="font-medium text-gray-600 hover:text-restaurant-primary transition-colors">Menu</Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-restaurant-primary transition-colors">About</Link>
            
            {selectedTable && (
              <div className="font-medium text-restaurant-primary">
                Table: {selectedTable}
              </div>
            )}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            {!selectedTable ? (
              <Button 
                variant="default" 
                asChild 
                className="bg-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={() => navigate('/#select-table')}
              >
                <Link to="/#select-table">Select Table</Link>
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("selectedTable");
                  setSelectedTable(null);
                  window.location.reload();
                }}
              >
                Change Table
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-4 space-y-1 bg-white shadow-lg">
          <Link to="/" onClick={closeMenu} className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">Home</Link>
          <Link to="/menu" onClick={closeMenu} className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">Menu</Link>
          <Link to="/about" onClick={closeMenu} className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">About</Link>
          
          {selectedTable && (
            <div className="px-4 py-2 text-base font-medium text-restaurant-primary">
              Table: {selectedTable}
            </div>
          )}
          
          <div className="px-4 py-3">
            {!selectedTable ? (
              <Button 
                variant="default" 
                asChild 
                className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90"
                onClick={() => {
                  closeMenu();
                  navigate('/#select-table');
                }}
              >
                <Link to="/#select-table">Select Table</Link>
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  localStorage.removeItem("selectedTable");
                  setSelectedTable(null);
                  closeMenu();
                  window.location.reload();
                }}
              >
                Change Table
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
