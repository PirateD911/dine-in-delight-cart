
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  isAvailable?: boolean;
}

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: "starter-1",
    name: "Bruschetta",
    description: "Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and herbs.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1572695157335-95a01129b34c?q=80&w=600&auto=format&fit=crop",
    category: "starters"
  },
  {
    id: "starter-2",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1595587870672-c79b97157541?q=80&w=600&auto=format&fit=crop",
    category: "starters"
  },
  {
    id: "starter-3",
    name: "Garlic Bread",
    description: "Toasted bread topped with garlic butter and herbs.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1619531038896-a4b85959481d?q=80&w=600&auto=format&fit=crop",
    category: "starters"
  },
  {
    id: "starter-4",
    name: "Crispy Calamari",
    description: "Tender calamari lightly battered and fried, served with marinara sauce.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1676037150398-e9b1fa4f937c?q=80&w=600&auto=format&fit=crop",
    category: "starters"
  },
  
  // Mains
  {
    id: "main-1",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: "main-2",
    name: "Spaghetti Carbonara",
    description: "Spaghetti with a creamy sauce made with eggs, cheese, bacon, and black pepper.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: "main-3",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection, served with roasted vegetables.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: "main-4",
    name: "Beef Tenderloin",
    description: "Premium beef tenderloin steak grilled to your preference, with mushroom sauce and potato puree.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: "main-5",
    name: "Vegetable Risotto",
    description: "Creamy Arborio rice slow-cooked with seasonal vegetables and Parmesan.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cd?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  {
    id: "main-6",
    name: "Chicken Parmesan",
    description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with pasta.",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=600&auto=format&fit=crop",
    category: "mains"
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Tiramisu",
    description: "Classic Italian dessert made with ladyfingers, coffee, mascarpone cheese, and cocoa.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "dessert-2",
    name: "Chocolate Fondant",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d8e3cc966?q=80&w=600&auto=format&fit=crop",
    category: "desserts"
  },
  {
    id: "dessert-3",
    name: "Panna Cotta",
    description: "Italian custard dessert topped with fresh berry compote.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    category: "desserts"
  },
  
  // Drinks
  {
    id: "drink-1",
    name: "House Red Wine",
    description: "Glass of our premium house red wine.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
    category: "drinks"
  },
  {
    id: "drink-2",
    name: "Craft Beer",
    description: "Selection of locally brewed craft beers.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1532634993-15f421e42ec0?q=80&w=600&auto=format&fit=crop",
    category: "drinks"
  },
  {
    id: "drink-3",
    name: "Italian Soda",
    description: "Refreshing sparkling water with your choice of fruit syrup.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop",
    category: "drinks"
  }
];
