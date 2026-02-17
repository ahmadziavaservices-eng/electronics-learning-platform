import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';

export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  vendor: string;
  vendorUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

interface MarketplaceProps {
  products: MarketplaceProduct[];
  onAddToCart?: (product: MarketplaceProduct) => void;
}

export default function Marketplace({ products, onAddToCart }: MarketplaceProps) {
  const [cart, setCart] = useState<MarketplaceProduct[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('price');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleAddToCart = (product: MarketplaceProduct) => {
    setCart([...cart, product]);
    onAddToCart?.(product);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
          ElectroMart
        </h2>
        <p className="text-slate-300">
          Buy all the components you need for your electronics projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border-cyan-500/30 sticky top-20">
            <CardHeader>
              <CardTitle className="text-cyan-400">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Categories */}
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">Category</p>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        selectedCategory === cat
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">Sort By</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 text-sm"
                >
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Cart Summary */}
              <div className="bg-slate-800 border border-cyan-500/30 rounded-lg p-3 mt-4">
                <p className="text-sm text-slate-400 mb-1">Cart Items</p>
                <p className="text-2xl font-bold text-cyan-400">{cart.length}</p>
                <p className="text-sm text-slate-400 mt-2">Total</p>
                <p className="text-xl font-bold text-green-400">${totalPrice.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedProducts.map(product => (
              <Card
                key={product.id}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/30 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {product.vendor}
                      </CardDescription>
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="text-slate-400 hover:text-pink-400 transition"
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={favorites.includes(product.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">({product.reviews})</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <Badge key={tag} className="bg-slate-700 text-cyan-300 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-400">{product.currency}</p>
                    </div>

                    {product.inStock ? (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </Button>
                    ) : (
                      <Button disabled className="bg-slate-700 text-slate-400">
                        Out of Stock
                      </Button>
                    )}
                  </div>

                  <a
                    href={product.vendorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-sm text-cyan-400 hover:text-cyan-300 py-2 border border-cyan-500/30 rounded hover:bg-cyan-500/10 transition"
                  >
                    View on {product.vendor}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No products found in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
