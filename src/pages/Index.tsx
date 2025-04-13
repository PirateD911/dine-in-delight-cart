
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/menu-data';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { addItem } = useCart();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  const featuredDishes = menuItems.filter(item => 
    ["main-1", "main-3", "main-5", "dessert-1"].includes(item.id)
  );

  const heroImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1470&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Experience Culinary Excellence at DineDelight
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Exquisite dishes, cozy ambiance, and memorable dining experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-restaurant-primary hover:bg-restaurant-primary/90">
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/reservation">Reserve a Table</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-restaurant-dark mb-4">
              Why Choose DineDelight
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of exquisite cuisine, exceptional service, and unforgettable atmosphere.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-restaurant-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">Our dishes are crafted with the finest ingredients by our expert chefs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-restaurant-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Perfect Ambiance</h3>
              <p className="text-gray-600">Enjoy your meals in our carefully designed spaces for maximum comfort.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-restaurant-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Service</h3>
              <p className="text-gray-600">Our efficient team ensures your dining experience is timely and pleasant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-restaurant-primary/10 text-restaurant-primary hover:bg-restaurant-primary/20">Chef's Selection</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-restaurant-dark mb-4">
              Featured Dishes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our chef's special selection of delectable dishes crafted with passion and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-lg overflow-hidden shadow-md menu-card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-restaurant-primary font-medium">${dish.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      onClick={() => addItem({
                        id: dish.id, 
                        name: dish.name, 
                        price: dish.price,
                        image: dish.image
                      })}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="group">
              <Link to="/menu" className="flex items-center">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Table Reservation CTA */}
      <section className="py-16 bg-restaurant-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Badge className="mb-2 bg-restaurant-primary/20 text-restaurant-primary hover:bg-restaurant-primary/30">Reserve Now</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
                Book Your Table For Dining
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Reserve your table to experience our exceptional cuisine and service. Perfect for special occasions or a delightful everyday meal.
              </p>
              <Button asChild size="lg" className="bg-restaurant-primary hover:bg-restaurant-primary/90">
                <Link to="/reservation" className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Reserve a Table
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop" 
                  alt="Restaurant interior" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-5 -left-5 bg-white text-black p-4 rounded-lg shadow-lg">
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-sm mt-1">Mon - Fri: 11am - 10pm</p>
                  <p className="text-sm">Weekends: 10am - 11pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
