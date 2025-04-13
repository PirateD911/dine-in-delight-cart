
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import MenuManager from './MenuManager';
import OrderManager from './OrderManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your restaurant data</p>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs 
        defaultValue="menu" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="p-6"
      >
        <TabsList className="grid grid-cols-2 w-[400px] mb-8">
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="mt-0">
          <MenuManager />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-0">
          <OrderManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
