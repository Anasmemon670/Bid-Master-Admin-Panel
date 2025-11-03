import { Search, Download, Package, Truck, CheckCircle, Lock } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { UserRole } from './LoginPage';

const orders = [
  { 
    id: 'ORD-1001', 
    buyer: 'John Doe', 
    seller: 'Jane Smith', 
    product: 'Gaming Laptop', 
    amount: '$850', 
    paymentStatus: 'Completed',
    deliveryStatus: 'Shipped',
    date: '2025-10-15'
  },
  { 
    id: 'ORD-1002', 
    buyer: 'Sarah Williams', 
    seller: 'Mike Johnson', 
    product: 'Mountain Bike', 
    amount: '$320', 
    paymentStatus: 'Completed',
    deliveryStatus: 'Delivered',
    date: '2025-10-14'
  },
  { 
    id: 'ORD-1003', 
    buyer: 'Tom Brown', 
    seller: 'Jane Smith', 
    product: 'Smart Watch', 
    amount: '$180', 
    paymentStatus: 'Pending',
    deliveryStatus: 'Pending',
    date: '2025-10-16'
  },
  { 
    id: 'ORD-1004', 
    buyer: 'Alice Cooper', 
    seller: 'John Doe', 
    product: 'Leather Jacket', 
    amount: '$95', 
    paymentStatus: 'Completed',
    deliveryStatus: 'Shipped',
    date: '2025-10-15'
  },
  { 
    id: 'ORD-1005', 
    buyer: 'Bob Wilson', 
    seller: 'Sarah Williams', 
    product: 'Vintage Camera', 
    amount: '$210', 
    paymentStatus: 'Completed',
    deliveryStatus: 'Delivered',
    date: '2025-10-12'
  },
];

export function OrderManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1">Orders & Transactions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track all platform transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Orders</p>
                <p className="text-gray-900 dark:text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Transit</p>
                <p className="text-gray-900 dark:text-white">34</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Delivered</p>
                <p className="text-gray-900 dark:text-white">189</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by order ID, buyer, or seller..." className="pl-10" />
            </div>
            <Select defaultValue="all-payment">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-payment">All Payments</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-delivery">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Delivery Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-delivery">All Deliveries</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Complete transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <TableCell className="text-blue-600">{order.id}</TableCell>
                    <TableCell className="text-sm">{order.buyer}</TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {order.seller}
                    </TableCell>
                    <TableCell className="text-sm">{order.product}</TableCell>
                    <TableCell className="text-sm">{order.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={order.paymentStatus === 'Completed' ? 'default' : 'secondary'}
                        className={order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : ''}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.deliveryStatus === 'Delivered' ? 'default' :
                          order.deliveryStatus === 'Shipped' ? 'secondary' :
                          'outline'
                        }
                        className={
                          order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                          order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' :
                          ''
                        }
                      >
                        {order.deliveryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {order.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing 1 to {orders.length} of {orders.length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
