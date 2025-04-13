
import { useState } from 'react';
import { toast } from 'sonner';
import { CalendarIcon, Clock, Users, Phone, Mail, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const availableTimes = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
];

const Reservation = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [guests, setGuests] = useState<string>("2");
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !phone || !email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Reservation request submitted!', {
      description: `Table for ${guests} on ${format(date, 'MMMM d, yyyy')} at ${time}`
    });
    
    // Reset form
    setDate(undefined);
    setTime(undefined);
    setGuests("2");
    setName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 pt-8">
          <h1 className="text-4xl font-bold font-serif text-restaurant-dark mb-4">
            Reserve Your Table
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Secure your spot for an unforgettable dining experience at DineDelight.
            Reservations are recommended, especially during peak hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Date Selection */}
                      <div>
                        <Label htmlFor="date">Date*</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal mt-2",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {/* Time Selection */}
                      <div>
                        <Label htmlFor="time">Time*</Label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger id="time" className="mt-2">
                            <SelectValue placeholder="Select time">
                              {time || (
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>Select time</span>
                                </div>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {availableTimes.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Guests Selection */}
                      <div>
                        <Label htmlFor="guests">Guests*</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger id="guests" className="mt-2">
                            <SelectValue placeholder="Number of guests">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <span>{guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Guest' : 'Guests'}
                                </SelectItem>
                              ))}
                              <SelectItem value="11+">11+ Guests (Large Party)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name*</Label>
                          <div className="relative mt-2">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input 
                              id="name" 
                              className="pl-10" 
                              placeholder="John Doe" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number*</Label>
                          <div className="relative mt-2">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input 
                              id="phone" 
                              className="pl-10" 
                              placeholder="(123) 456-7890" 
                              value={phone} 
                              onChange={(e) => setPhone(e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="email">Email Address*</Label>
                          <div className="relative mt-2">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input 
                              id="email"
                              type="email" 
                              className="pl-10" 
                              placeholder="your@email.com" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="special-requests">Special Requests</Label>
                      <textarea
                        id="special-requests"
                        className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-restaurant-primary focus:ring focus:ring-restaurant-primary/20 focus:ring-opacity-50"
                        rows={3}
                        placeholder="Any special dietary requirements or preferences..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      ></textarea>
                    </div>
                    
                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90" size="lg">
                      Reserve Table
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Reservation Info & Policies */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Reservation Information</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex">
                    <span className="font-medium w-28">Opening Hours:</span> 
                    <span className="text-gray-600">
                      Mon-Fri: 11:00 AM - 10:00 PM<br />
                      Sat-Sun: 10:00 AM - 11:00 PM
                    </span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-28">Phone:</span>
                    <span className="text-gray-600">(123) 456-7890</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-28">Email:</span>
                    <span className="text-gray-600">reservations@dinedelight.com</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Reservation Policies</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Reservations are held for 15 minutes past the reserved time.</p>
                  <p>• For parties of 6 or more, please call us directly.</p>
                  <p>• Cancellations should be made at least 4 hours in advance.</p>
                  <p>• Special events may require a credit card to secure reservation.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=500&auto=format&fit=crop" 
                alt="Restaurant ambiance" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="pt-4">
                <p className="text-center text-sm text-gray-600">
                  "We look forward to providing you with an exceptional dining experience!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
