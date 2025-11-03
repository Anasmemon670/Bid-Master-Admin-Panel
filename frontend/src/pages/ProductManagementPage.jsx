import { useState } from 'react';
import { Search, Clock, CheckCircle, XCircle, Flag, Eye, Timer, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import React from 'react';

const pendingProducts = [{
  id: 1,
  name: 'Vintage Camera',
  seller: 'John Doe',
  category: 'Electronics',
  startingBid: '$150',
  image: 'camera',
  submitted: '2 hours ago'
}, {
  id: 2,
  name: 'Designer Watch',
  seller: 'Jane Smith',
  category: 'Fashion',
  startingBid: '$500',
  image: 'watch',
  submitted: '5 hours ago'
}, {
  id: 3,
  name: 'Antique Vase',
  seller: 'Mike Johnson',
  category: 'Home',
  startingBid: '$200',
  image: 'vase',
  submitted: '1 day ago'
}];
const liveAuctions = [{
  id: 1,
  name: 'Gaming Laptop',
  currentBid: '$850',
  highestBidder: 'User#1234',
  totalBids: 23,
  timeLeft: '2h 34m',
  status: 'hot'
}, {
  id: 2,
  name: 'Mountain Bike',
  currentBid: '$320',
  highestBidder: 'User#5678',
  totalBids: 12,
  timeLeft: '5h 12m',
  status: 'active'
}, {
  id: 3,
  name: 'Smart Watch',
  currentBid: '$180',
  highestBidder: 'User#9012',
  totalBids: 8,
  timeLeft: '1h 05m',
  status: 'ending'
}, {
  id: 4,
  name: 'Leather Jacket',
  currentBid: '$95',
  highestBidder: 'User#3456',
  totalBids: 5,
  timeLeft: '12h 45m',
  status: 'active'
}];
export function ProductManagementPage({
  userRole
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const isReadOnly = userRole === 'viewer';
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, isReadOnly && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "h-5 w-5 text-orange-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-orange-900 dark:text-orange-100"
  }, "Read-Only Mode"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-700 dark:text-orange-400 mt-1"
  }, "You are logged in as a Viewer. You can view data but cannot make changes."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "Products & Auctions"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Manage product approvals and live auctions")), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "pending",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "pending",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "h-4 w-4"
  }), "Pending Approvals", /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, pendingProducts.length)), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "live",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Timer, {
    className: "h-4 w-4"
  }), "Live Auctions", /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, liveAuctions.length))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "pending",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search products...",
    className: "pl-10"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Products Awaiting Approval"), /*#__PURE__*/React.createElement(CardDescription, null, "Review and approve new product listings")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableHead, null, "Product"), /*#__PURE__*/React.createElement(TableHead, null, "Seller"), /*#__PURE__*/React.createElement(TableHead, null, "Category"), /*#__PURE__*/React.createElement(TableHead, null, "Starting Bid"), /*#__PURE__*/React.createElement(TableHead, null, "Submitted"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-right"
  }, "Actions"))), /*#__PURE__*/React.createElement(TableBody, null, pendingProducts.map(product => /*#__PURE__*/React.createElement(TableRow, {
    key: product.id
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop`,
    alt: product.name,
    className: "w-full h-full object-cover"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, product.name))), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, product.seller), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, product.category)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, product.startingBid), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, product.submitted), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setSelectedProduct(product);
      setIsProductModalOpen(true);
    }
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "h-4 w-4"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "text-green-600 hover:text-green-700",
    disabled: isReadOnly,
    onClick: () => {
      if (isReadOnly) {
        toast.error('Access denied', {
          description: 'Only Super Admins and Moderators can approve products'
        });
      }
    }
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "h-4 w-4 mr-1"
  }), "Approve"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "text-red-600 hover:text-red-700",
    disabled: isReadOnly,
    onClick: () => {
      if (isReadOnly) {
        toast.error('Access denied', {
          description: 'Only Super Admins and Moderators can reject products'
        });
      }
    }
  }, /*#__PURE__*/React.createElement(XCircle, {
    className: "h-4 w-4 mr-1"
  }), "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "text-orange-600 hover:text-orange-700",
    disabled: isReadOnly
  }, /*#__PURE__*/React.createElement(Flag, {
    className: "h-4 w-4"
  }))))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "live",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, liveAuctions.map(auction => /*#__PURE__*/React.createElement(Card, {
    key: auction.id,
    className: "hover:shadow-lg transition-shadow"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 dark:text-white mb-1"
  }, auction.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Current Bid: ", /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600"
  }, auction.currentBid))), /*#__PURE__*/React.createElement(Badge, {
    variant: auction.status === 'hot' ? 'destructive' : auction.status === 'ending' ? 'default' : 'secondary'
  }, auction.status === 'hot' ? '🔥 Hot' : auction.status === 'ending' ? '⏰ Ending Soon' : 'Active')), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Highest Bidder"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, auction.highestBidder)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Total Bids"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, auction.totalBids))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "h-4 w-4 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-blue-700 dark:text-blue-400"
  }, "Time Left")), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-blue-700 dark:text-blue-400"
  }, auction.timeLeft)), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "h-4 w-4 mr-2"
  }), "View Details")))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: isProductModalOpen,
    onOpenChange: setIsProductModalOpen
  }, /*#__PURE__*/React.createElement(DialogContent, {
    className: "max-w-2xl"
  }, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, null, "Product Details"), /*#__PURE__*/React.createElement(DialogDescription, null, "Review product information before approval")), selectedProduct && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
  }, /*#__PURE__*/React.createElement(ImageWithFallback, {
    src: `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop`,
    alt: selectedProduct.name,
    className: "w-full h-full object-cover"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Product Name"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, selectedProduct.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Category"), /*#__PURE__*/React.createElement(Badge, null, selectedProduct.category)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Seller"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, selectedProduct.seller)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Starting Bid"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, selectedProduct.startingBid))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Description"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 dark:text-gray-300"
  }, "This is a high-quality product in excellent condition. All items are verified and authentic."))), /*#__PURE__*/React.createElement(DialogFooter, {
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "text-red-600",
    onClick: () => setIsProductModalOpen(false)
  }, /*#__PURE__*/React.createElement(XCircle, {
    className: "h-4 w-4 mr-2"
  }), "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "text-orange-600"
  }, /*#__PURE__*/React.createElement(Flag, {
    className: "h-4 w-4 mr-2"
  }), "Flag for Review"), /*#__PURE__*/React.createElement(Button, {
    className: "bg-green-600 hover:bg-green-700",
    onClick: () => setIsProductModalOpen(false)
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "h-4 w-4 mr-2"
  }), "Approve")))));
}