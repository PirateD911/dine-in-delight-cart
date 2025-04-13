
import { Trophy, Utensils, Clock, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1470&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto px-6">
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
                Our Story
              </h1>
              <p className="text-xl text-white">
                A passion for exceptional cuisine and memorable dining experiences
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold font-serif text-restaurant-dark mb-6">
              Welcome to DineDelight
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2015, DineDelight was born from a simple yet profound vision: to create a dining sanctuary where exceptional food, warm hospitality, and beautiful surroundings come together to create unforgettable moments.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our restaurant stands as a testament to culinary excellence, where traditional techniques meet contemporary innovation. Every dish is crafted with precision, passion, and the finest locally-sourced ingredients.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Beyond just serving meals, we strive to create experiences that resonate with our guests long after they've left our tables. Our dedicated team works tirelessly to ensure that each visit to DineDelight exceeds expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=500&auto=format&fit=crop" 
                alt="Restaurant interior" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=500&auto=format&fit=crop" 
                alt="Chef preparing food" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=500&auto=format&fit=crop" 
                alt="Culinary dish" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop" 
                alt="Restaurant ambiance" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-restaurant-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide our decisions and actions every day as we strive to provide the best dining experience for our guests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-restaurant-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We pursue excellence in everything we do - from sourcing the finest ingredients to delivering impeccable service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-restaurant-primary/10 rounded-full flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality, ensuring that every dish that leaves our kitchen meets our exacting standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-restaurant-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creativity</h3>
              <p className="text-gray-600">
                We embrace creativity and innovation in our cuisine, constantly evolving while respecting culinary traditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-restaurant-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Consistency</h3>
              <p className="text-gray-600">
                We deliver consistent, reliable experiences that our guests can count on every time they visit us.
              </p>
            </div>
          </div>
        </div>
        
        {/* Chef Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                alt="Head Chef" 
                className="rounded-lg shadow-xl"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold font-serif text-restaurant-dark mb-6">
                Meet Our Chef
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chef Alessandro Romano brings over 20 years of international culinary experience to DineDelight. Trained in classical French techniques and with extensive experience across Europe and Asia, Chef Alessandro combines global influences with local ingredients to create dishes that are both familiar and exciting.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                "My philosophy is simple – respect for ingredients, attention to detail, and cooking with passion. Every dish should tell a story and create a moment of joy for our guests."
              </p>
              <p className="italic text-gray-500">- Chef Alessandro Romano</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
