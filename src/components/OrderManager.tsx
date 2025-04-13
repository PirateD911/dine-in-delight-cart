
import { useState, useEffect } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, CheckCircle, XCircle, FileText } from 'lucide-react';

interface Order {
  id: string;
  tableNumber: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  date: Date;
  customerName: string;
  customerPhone: string;
}

// Dummy orders data (will be replaced with Supabase data)
const dummyOrders: Order[] = [
  {
    id: 'ORD-001',
    tableNumber: '5',
    items: [
      { id: 'main-1', name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { id: 'drink-2', name: 'Craft Beer', quantity: 2, price: 5.99 }
    ],
    totalAmount: 26.97,
    status: 'pending',
    date: new Date(),
    customerName: 'Rahul Sharma',
    customerPhone: '9876543210'
  },
  {
    id: 'ORD-002',
    tableNumber: '3',
    items: [
      { id: 'starter-1', name: 'Bruschetta', quantity: 1, price: 8.99 },
      { id: 'main-3', name: 'Grilled Salmon', quantity: 1, price: 18.99 }
    ],
    totalAmount: 27.98,
    status: 'preparing',
    date: new Date(Date.now() - 3600000),
    customerName: 'Priya Patel',
    customerPhone: '8765432109'
  }
];

// Exchange rate: 1 USD = 75 INR
const USD_TO_INR = 75;

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(dummyOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter orders when filter or search changes
  useEffect(() => {
    let filtered = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery)
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
    
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Order Management</h2>
          <p className="text-gray-500">View and manage customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by order ID, table or customer..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total (₹)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.tableNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>₹{(order.totalAmount * USD_TO_INR).toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                        >
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      {(order.status === 'pending' || order.status === 'preparing') && (
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Order Details - {selectedOrder.id}</h3>
                <p className="text-gray-500">
                  {new Date(selectedOrder.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setIsViewModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Table Number</p>
                  <p className="font-medium">{selectedOrder.tableNumber}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Order Items</p>
                <div className="bg-gray-50 rounded-md p-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">×{item.quantity}</span>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity * USD_TO_INR).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>₹{(selectedOrder.totalAmount * USD_TO_INR).toFixed(2)}</span>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <div className="flex items-center">
                <span className="mr-2">Status:</span>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedOrder.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                  selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                {selectedOrder.status === 'pending' && (
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'preparing');
                      setIsViewModalOpen(false);
                    }}
                  >
                    Start Preparing
                  </Button>
                )}
                {selectedOrder.status === 'preparing' && (
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'completed');
                      setIsViewModalOpen(false);
                    }}
                  >
                    Complete Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
