
import { useState, useEffect } from 'react';
import { menuItems } from '@/data/menu-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Eye, EyeOff, Save, X } from 'lucide-react';
import { MenuItem } from '@/data/menu-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Exchange rate: 1 USD = 75 INR (example)
const USD_TO_INR = 75;

const MenuManager = () => {
  // Deep clone the menu items to avoid modifying the original data
  const [items, setItems] = useState<MenuItem[]>(() => 
    JSON.parse(JSON.stringify(menuItems))
  );
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'starters',
  });

  // Handle edit item
  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsSheetOpen(true);
  };

  // Handle delete item
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    }
  };

  // Toggle item availability
  const toggleAvailability = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          isAvailable: item.isAvailable === false ? true : false 
        };
      }
      return item;
    }));
    
    const item = items.find(item => item.id === id);
    if (item) {
      toast.success(`${item.name} is now ${item.isAvailable === false ? 'available' : 'unavailable'}`);
    }
  };

  // Handle save edited item
  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    
    setIsSheetOpen(false);
    setEditingItem(null);
    toast.success('Item updated successfully');
  };

  // Handle add new item
  const handleAddItem = () => {
    setNewItem({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'starters',
    });
    setIsAddingItem(true);
    setIsSheetOpen(true);
  };

  // Handle save new item
  const handleSaveNewItem = () => {
    if (!newItem.name || !newItem.description || !newItem.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const id = `item-${Date.now()}`;
    const createdItem: MenuItem = {
      id,
      name: newItem.name || '',
      description: newItem.description || '',
      price: Number(newItem.price) || 0,
      image: newItem.image || '',
      category: (newItem.category as MenuItem['category']) || 'starters',
      isAvailable: true,
    };

    setItems([...items, createdItem]);
    setIsSheetOpen(false);
    setIsAddingItem(false);
    toast.success('New item added successfully');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Menu Items</h2>
          <p className="text-gray-500">Manage your restaurant's menu</p>
        </div>
        <Button onClick={handleAddItem} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell>₹{(item.price * USD_TO_INR).toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.isAvailable === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.isAvailable === false ? 'Out of Stock' : 'In Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleAvailability(item.id)}
                    >
                      {item.isAvailable === false ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Add Item Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{isAddingItem ? 'Add New Item' : 'Edit Menu Item'}</SheetTitle>
            <SheetDescription>
              {isAddingItem 
                ? 'Add a new item to your menu' 
                : 'Make changes to your menu item here'}
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Item Name</label>
              <Input 
                id="name" 
                value={isAddingItem ? newItem.name : editingItem?.name || ''} 
                onChange={(e) => {
                  if (isAddingItem) {
                    setNewItem({...newItem, name: e.target.value});
                  } else if (editingItem) {
                    setEditingItem({...editingItem, name: e.target.value});
                  }
                }}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select 
                value={isAddingItem ? newItem.category as string : editingItem?.category || 'starters'}
                onValueChange={(value) => {
                  if (isAddingItem) {
                    setNewItem({...newItem, category: value as MenuItem['category']});
                  } else if (editingItem) {
                    setEditingItem({...editingItem, category: value as MenuItem['category']});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starters">Starters</SelectItem>
                  <SelectItem value="mains">Main Courses</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                value={isAddingItem ? newItem.description : editingItem?.description || ''}
                onChange={(e) => {
                  if (isAddingItem) {
                    setNewItem({...newItem, description: e.target.value});
                  } else if (editingItem) {
                    setEditingItem({...editingItem, description: e.target.value});
                  }
                }}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">Price (₹)</label>
              <Input
                id="price"
                type="number"
                value={isAddingItem 
                  ? (newItem.price ? newItem.price * USD_TO_INR : '') 
                  : (editingItem?.price ? editingItem.price * USD_TO_INR : '')
                }
                onChange={(e) => {
                  const rupeesValue = parseFloat(e.target.value);
                  const usdValue = rupeesValue / USD_TO_INR;
                  
                  if (isAddingItem) {
                    setNewItem({...newItem, price: usdValue});
                  } else if (editingItem) {
                    setEditingItem({...editingItem, price: usdValue});
                  }
                }}
              />
              <p className="text-xs text-gray-500">
                ${isAddingItem 
                  ? (newItem.price || 0).toFixed(2)
                  : (editingItem?.price || 0).toFixed(2)
                } USD
              </p>
            </div>

            <div className="grid gap-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input
                id="image"
                value={isAddingItem ? newItem.image : editingItem?.image || ''}
                onChange={(e) => {
                  if (isAddingItem) {
                    setNewItem({...newItem, image: e.target.value});
                  } else if (editingItem) {
                    setEditingItem({...editingItem, image: e.target.value});
                  }
                }}
              />
            </div>

            {!isAddingItem && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Availability</label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant={editingItem?.isAvailable === false ? "outline" : "default"}
                    className="flex-1"
                    onClick={() => {
                      if (editingItem) {
                        setEditingItem({...editingItem, isAvailable: true});
                      }
                    }}
                  >
                    In Stock
                  </Button>
                  <Button
                    type="button"
                    variant={editingItem?.isAvailable === false ? "default" : "outline"}
                    className="flex-1 ml-2"
                    onClick={() => {
                      if (editingItem) {
                        setEditingItem({...editingItem, isAvailable: false});
                      }
                    }}
                  >
                    Out of Stock
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <SheetFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={isAddingItem ? handleSaveNewItem : handleSaveEdit}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuManager;
