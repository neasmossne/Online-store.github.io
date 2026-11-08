export const seedProducts = [
  { id: 'p-01', name: 'The Everyday Linen Shirt', category: 'Clothing', price: 58, compareAt: 72, color: 'Ivory', sizes: ['XS', 'S', 'M', 'L'], stock: 18, badge: 'Bestseller', image: 'photo-1598554747436-c9293d6a588f', description: 'A relaxed, breathable linen shirt made for slow mornings and long weekends.' },
  { id: 'p-02', name: 'Soft Structure Blazer', category: 'Clothing', price: 128, color: 'Olive', sizes: ['S', 'M', 'L', 'XL'], stock: 9, badge: 'New', image: 'photo-1591047139829-d91aecb6caea', description: 'Easy tailoring in a beautifully soft, lightweight woven fabric.' },
  { id: 'p-03', name: 'Sculpted Leather Tote', category: 'Accessories', price: 96, color: 'Chestnut', sizes: ['One size'], stock: 12, badge: '', image: 'photo-1548036328-c9fa89d128fa', description: 'An everyday carryall with a clean silhouette and thoughtful details.' },
  { id: 'p-04', name: 'Sunday Knit Tank', category: 'Clothing', price: 42, color: 'Oat', sizes: ['XS', 'S', 'M', 'L'], stock: 24, badge: '', image: 'photo-1627225924765-552d49cf47ad', description: 'A soft cotton-knit layer that feels just right, all year round.' },
  { id: 'p-05', name: 'The Weekend Trouser', category: 'Clothing', price: 84, color: 'Sand', sizes: ['XS', 'S', 'M', 'L', 'XL'], stock: 15, badge: 'New', image: 'photo-1483985988355-763728e1935b', description: 'A softly tailored high-rise trouser with a little room to move.' },
  { id: 'p-06', name: 'Quiet Hours Candle', category: 'Home', price: 34, color: 'Sage', sizes: ['One size'], stock: 31, badge: '', image: 'photo-1603006905003-be475563bc59', description: 'Cedar, fig leaf, and a little quiet. Hand-poured in small batches.' },
  { id: 'p-07', name: 'Everyday Leather Belt', category: 'Accessories', price: 48, color: 'Tan', sizes: ['S', 'M', 'L'], stock: 20, badge: '', image: 'photo-1548036328-c9fa89d128fa', description: 'A considered finishing touch, crafted in supple full-grain leather.' },
  { id: 'p-08', name: 'Sunday Market Basket', category: 'Accessories', price: 62, color: 'Natural', sizes: ['One size'], stock: 11, badge: 'Limited', image: 'photo-1591561954557-26941169b49e', description: 'Woven by hand to carry all the lovely little things.' },
]

export const imageUrl = (image, width = 900) => `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`
