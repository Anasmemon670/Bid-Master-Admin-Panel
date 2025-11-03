import { useState } from 'react';
import { Search, Clock, CheckCircle, XCircle, Flag, Eye, Timer, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { UserRole } from './LoginPage';
import { toast } from 'sonner@2.0.3';

const pendingProducts = [
  { id: 1, name: 'Vintage Camera', seller: 'John Doe', category: 'Electronics', startingBid: '$150', image: 'camera', submitted: '2 hours ago' },
  { id: 2, name: 'Designer Watch', seller: 'Jane Smith', category: 'Fashion', startingBid: '$500', image: 'watch', submitted: '5 hours ago' },
  { id: 3, name: 'Antique Vase', seller: 'Mike Johnson', category: 'Home', startingBid: '$200', image: 'vase', submitted: '1 day ago' },
];

const liveAuctions = [
  { id: 1, name: 'Gaming Laptop', currentBid: '$850', highestBidder: 'User#1234', totalBids: 23, timeLeft: '2h 34m', status: 'hot' },
  { id: 2, name: 'Mountain Bike', currentBid: '$320', highestBidder: 'User#5678', totalBids: 12, timeLeft: '5h 12m', status: 'active' },
  { id: 3, name: 'Smart Watch', currentBid: '$180', highestBidder: 'User#9012', totalBids: 8, timeLeft: '1h 05m', status: 'ending' },
  { id: 4, name: 'Leather Jacket', currentBid: '$95', highestBidder: 'User#3456', totalBids: 5, timeLeft: '12h 45m', status: 'active' },
];

interface ProductManagementPageProps {
  userRole: UserRole;
}

export function ProductManagementPage({ userRole }: ProductManagementPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<typeof pendingProducts[0] | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const isReadOnly = userRole === 'viewer';

  return (
    <div className="space-y-6">
      {/* Read-Only Warning for Viewer */}
      {isReadOnly && (
        <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-start gap-3">
          <Lock className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <p className="text-sm text-orange-900 dark:text-orange-100">Read-Only Mode</p>
            <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
              You are logged in as a Viewer. You can view data but cannot make changes.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Products & Auctions</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage product approvals and live auctions</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending Approvals
            <Badge variant="secondary">{pendingProducts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="live" className="gap-2">
            <Timer className="h-4 w-4" />
            Live Auctions
            <Badge variant="secondary">{liveAuctions.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Products Awaiting Approval</CardTitle>
              <CardDescription>Review and approve new product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Starting Bid</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                            <ImageWithFallback 
                              src={`https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop`}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {product.seller}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {product.startingBid}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {product.submitted}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsProductModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            disabled={isReadOnly}
                            onClick={() => {
                              if (isReadOnly) {
                                toast.error('Access denied', { description: 'Only Super Admins and Moderators can approve products' });
                              }
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            disabled={isReadOnly}
                            onClick={() => {
                              if (isReadOnly) {
                                toast.error('Access denied', { description: 'Only Super Admins and Moderators can reject products' });
                              }
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-orange-600 hover:text-orange-700"
                            disabled={isReadOnly}
                          >
                            <Flag className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Auctions Tab */}
        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveAuctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 dark:text-white mb-1">{auction.name}</h3>
                      <p className="text-sm text-gray-500">Current Bid: <span className="text-blue-600">{auction.currentBid}</span></p>
                    </div>
                    <Badge 
                      variant={
                        auction.status === 'hot' ? 'destructive' :
                        auction.status === 'ending' ? 'default' :
                        'secondary'
                      }
                    >
                      {auction.status === 'hot' ? '🔥 Hot' : auction.status === 'ending' ? '⏰ Ending Soon' : 'Active'}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500">Highest Bidder</p>
                        <p className="text-sm">{auction.highestBidder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total Bids</p>
                        <p className="text-sm">{auction.totalBids}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700 dark:text-blue-400">Time Left</span>
                      </div>
                      <span className="text-sm text-blue-700 dark:text-blue-400">{auction.timeLeft}</span>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Details Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Review product information before approval</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <ImageWithFallback 
                  src={`https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Product Name</p>
                  <p className="text-sm">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <Badge>{selectedProduct.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Seller</p>
                  <p className="text-sm">{selectedProduct.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Starting Bid</p>
                  <p className="text-sm">{selectedProduct.startingBid}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is a high-quality product in excellent condition. All items are verified and authentic.
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="text-red-600" onClick={() => setIsProductModalOpen(false)}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button variant="outline" className="text-orange-600">
              <Flag className="h-4 w-4 mr-2" />
              Flag for Review
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsProductModalOpen(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
