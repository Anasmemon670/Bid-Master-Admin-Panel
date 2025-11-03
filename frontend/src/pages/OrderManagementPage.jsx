import React from 'react';
import { Search, Download, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
const orders = [{
  id: 'ORD-1001',
  buyer: 'John Doe',
  seller: 'Jane Smith',
  product: 'Gaming Laptop',
  amount: '$850',
  paymentStatus: 'Completed',
  deliveryStatus: 'Shipped',
  date: '2025-10-15'
}, {
  id: 'ORD-1002',
  buyer: 'Sarah Williams',
  seller: 'Mike Johnson',
  product: 'Mountain Bike',
  amount: '$320',
  paymentStatus: 'Completed',
  deliveryStatus: 'Delivered',
  date: '2025-10-14'
}, {
  id: 'ORD-1003',
  buyer: 'Tom Brown',
  seller: 'Jane Smith',
  product: 'Smart Watch',
  amount: '$180',
  paymentStatus: 'Pending',
  deliveryStatus: 'Pending',
  date: '2025-10-16'
}, {
  id: 'ORD-1004',
  buyer: 'Alice Cooper',
  seller: 'John Doe',
  product: 'Leather Jacket',
  amount: '$95',
  paymentStatus: 'Completed',
  deliveryStatus: 'Shipped',
  date: '2025-10-15'
}, {
  id: 'ORD-1005',
  buyer: 'Bob Wilson',
  seller: 'Sarah Williams',
  product: 'Vintage Camera',
  amount: '$210',
  paymentStatus: 'Completed',
  deliveryStatus: 'Delivered',
  date: '2025-10-12'
}];
export function OrderManagementPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "Orders & Transactions"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Track all platform transactions")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "h-4 w-4 mr-2"
  }), "Export CSV"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "h-4 w-4 mr-2"
  }), "Export PDF"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400 mb-1"
  }, "Pending Orders"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white"
  }, "12")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Package, {
    className: "h-6 w-6 text-white"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400 mb-1"
  }, "In Transit"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white"
  }, "34")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Truck, {
    className: "h-6 w-6 text-white"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400 mb-1"
  }, "Delivered"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white"
  }, "189")), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "h-6 w-6 text-white"
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by order ID, buyer, or seller...",
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all-payment"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-48"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Payment Status"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all-payment"
  }, "All Payments"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "completed"
  }, "Completed"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pending"
  }, "Pending"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "failed"
  }, "Failed"))), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all-delivery"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-48"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Delivery Status"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all-delivery"
  }, "All Deliveries"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pending"
  }, "Pending"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "shipped"
  }, "Shipped"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "delivered"
  }, "Delivered")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "All Orders"), /*#__PURE__*/React.createElement(CardDescription, null, "Complete transaction history")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableHead, null, "Order ID"), /*#__PURE__*/React.createElement(TableHead, null, "Buyer"), /*#__PURE__*/React.createElement(TableHead, null, "Seller"), /*#__PURE__*/React.createElement(TableHead, null, "Product"), /*#__PURE__*/React.createElement(TableHead, null, "Amount"), /*#__PURE__*/React.createElement(TableHead, null, "Payment"), /*#__PURE__*/React.createElement(TableHead, null, "Delivery"), /*#__PURE__*/React.createElement(TableHead, null, "Date"))), /*#__PURE__*/React.createElement(TableBody, null, orders.map(order => /*#__PURE__*/React.createElement(TableRow, {
    key: order.id,
    className: "hover:bg-gray-50 dark:hover:bg-gray-900"
  }, /*#__PURE__*/React.createElement(TableCell, {
    className: "text-blue-600"
  }, order.id), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, order.buyer), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, order.seller), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, order.product), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, order.amount), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: order.paymentStatus === 'Completed' ? 'default' : 'secondary',
    className: order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : ''
  }, order.paymentStatus)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: order.deliveryStatus === 'Delivered' ? 'default' : order.deliveryStatus === 'Shipped' ? 'secondary' : 'outline',
    className: order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' : ''
  }, order.deliveryStatus)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, order.date)))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Showing 1 to ", orders.length, " of ", orders.length, " results"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    disabled: true
  }, "Previous"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Next"))))));
}