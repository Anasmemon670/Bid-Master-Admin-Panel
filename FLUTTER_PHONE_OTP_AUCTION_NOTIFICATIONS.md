# Flutter Integration: Phone OTP, Auction Auto-Close, Product Notifications

## 1. Phone-Based OTP Login (Iraq Only)

### Flutter Implementation

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PhoneOTPService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  // Step 1: Send OTP to Iraq phone number
  Future<void> sendOTP(String phoneNumber) async {
    try {
      // Validate Iraq phone number
      if (!phoneNumber.startsWith('+964')) {
        throw Exception('Only Iraq phone numbers (+964) are allowed');
      }
      
      // Verify phone number format
      if (!_isValidIraqPhone(phoneNumber)) {
        throw Exception('Invalid Iraq phone number format');
      }
      
      // Request verification code
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        timeout: const Duration(seconds: 60),
        verificationCompleted: (PhoneAuthCredential credential) async {
          // Auto-verification (Android only)
          await _signInWithCredential(credential);
        },
        verificationFailed: (FirebaseAuthException e) {
          throw Exception('Verification failed: ${e.message}');
        },
        codeSent: (String verificationId, int? resendToken) {
          // Store verification ID for later use
          _verificationId = verificationId;
          _resendToken = resendToken;
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          _verificationId = verificationId;
        },
      );
    } catch (e) {
      throw Exception('Failed to send OTP: $e');
    }
  }
  
  String? _verificationId;
  int? _resendToken;
  
  // Validate Iraq phone number format
  bool _isValidIraqPhone(String phone) {
    // Format: +964 followed by 9-10 digits
    final regex = RegExp(r'^\+964[0-9]{9,10}$');
    return regex.hasMatch(phone);
  }
  
  // Step 2: Verify OTP and login
  Future<Map<String, dynamic>> verifyOTP(String smsCode) async {
    try {
      if (_verificationId == null) {
        throw Exception('Verification ID not found. Please request OTP first.');
      }
      
      // Create credential
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
        verificationId: _verificationId!,
        smsCode: smsCode,
      );
      
      // Sign in with Firebase
      UserCredential userCredential = await _auth.signInWithCredential(credential);
      
      // Get Firebase ID token
      String idToken = await userCredential.user!.getIdToken();
      
      // Authenticate with backend
      final response = await http.post(
        Uri.parse('https://your-api.com/api/auth/phone-otp-login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'idToken': idToken,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'token': data['token'], // App JWT token
          'user': data['user'],
        };
      } else {
        throw Exception('Backend authentication failed');
      }
    } catch (e) {
      throw Exception('OTP verification failed: $e');
    }
  }
  
  // Helper method for auto-verification
  Future<void> _signInWithCredential(PhoneAuthCredential credential) async {
    try {
      UserCredential userCredential = await _auth.signInWithCredential(credential);
      String idToken = await userCredential.user!.getIdToken();
      
      final response = await http.post(
        Uri.parse('https://your-api.com/api/auth/phone-otp-login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'idToken': idToken}),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        // Store token and navigate to home
        await AuthService().saveToken(data['token']);
      }
    } catch (e) {
      print('Auto-verification error: $e');
    }
  }
  
  // Resend OTP
  Future<void> resendOTP(String phoneNumber) async {
    await sendOTP(phoneNumber);
  }
}

// Usage Example
class PhoneOTPLoginScreen extends StatefulWidget {
  @override
  _PhoneOTPLoginScreenState createState() => _PhoneOTPLoginScreenState();
}

class _PhoneOTPLoginScreenState extends State<PhoneOTPLoginScreen> {
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();
  final _otpService = PhoneOTPService();
  bool _otpSent = false;
  bool _loading = false;
  
  Future<void> _sendOTP() async {
    setState(() => _loading = true);
    try {
      await _otpService.sendOTP(_phoneController.text);
      setState(() {
        _otpSent = true;
        _loading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('OTP sent successfully')),
      );
    } catch (e) {
      setState(() => _loading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }
  
  Future<void> _verifyOTP() async {
    setState(() => _loading = true);
    try {
      final result = await _otpService.verifyOTP(_otpController.text);
      if (result['success']) {
        // Navigate to home screen
        Navigator.pushReplacementNamed(context, '/home');
      }
    } catch (e) {
      setState(() => _loading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _phoneController,
              decoration: InputDecoration(
                labelText: 'Iraq Phone Number',
                hintText: '+9647701234567',
                prefixText: '+964',
              ),
              keyboardType: TextInputType.phone,
              enabled: !_otpSent,
            ),
            if (!_otpSent) ...[
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _loading ? null : _sendOTP,
                child: Text('Send OTP'),
              ),
            ],
            if (_otpSent) ...[
              SizedBox(height: 20),
              TextField(
                controller: _otpController,
                decoration: InputDecoration(
                  labelText: 'Enter OTP',
                ),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _loading ? null : _verifyOTP,
                child: Text('Verify OTP'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

## 2. Real-Time Auction Auto-Close (Firestore Listener)

### Flutter Implementation

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class AuctionService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // Listen to auction status and timer in real-time
  Stream<Map<String, dynamic>> listenToAuction(int productId) {
    return _firestore
        .collection('products')
        .doc(productId.toString())
        .snapshots()
        .map((snapshot) {
      if (!snapshot.exists) {
        return {'status': 'not_found'};
      }
      
      final data = snapshot.data()!;
      final endTime = data['auction_end_time'] as Timestamp?;
      
      if (endTime == null) {
        return {
          'status': data['status'] ?? 'pending',
          'current_bid': data['current_bid'] ?? 0.0,
          'highest_bidder_name': data['highest_bidder_name'] ?? '',
        };
      }
      
      final now = DateTime.now();
      final end = endTime.toDate();
      final remaining = end.difference(now);
      
      return {
        'status': data['status'] ?? 'pending',
        'current_bid': data['current_bid'] ?? 0.0,
        'highest_bidder_name': data['highest_bidder_name'] ?? '',
        'auction_end_time': end,
        'hours_left': remaining.inHours,
        'minutes_left': remaining.inMinutes % 60,
        'seconds_left': remaining.inSeconds % 60,
        'is_ended': remaining.isNegative || data['status'] == 'sold',
        'is_live': data['status'] == 'approved' && !remaining.isNegative,
      };
    });
  }
  
  // Listen to bid history in real-time
  Stream<List<Map<String, dynamic>>> listenToBidHistory(int productId) {
    return _firestore
        .collection('products')
        .doc(productId.toString())
        .collection('bids')
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => {
        final data = doc.data();
        return {
          'id': doc.id,
          'amount': data['amount'] ?? 0.0,
          'bidder_name': data['bidder_name'] ?? '',
          'timestamp': data['timestamp']?.toDate(),
        };
      }).toList();
    });
  }
}

// Usage in Widget
class AuctionDetailScreen extends StatefulWidget {
  final int productId;
  
  const AuctionDetailScreen({required this.productId});
  
  @override
  _AuctionDetailScreenState createState() => _AuctionDetailScreenState();
}

class _AuctionDetailScreenState extends State<AuctionDetailScreen> {
  final AuctionService _auctionService = AuctionService();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<Map<String, dynamic>>(
        stream: _auctionService.listenToAuction(widget.productId),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return Center(child: CircularProgressIndicator());
          }
          
          final auction = snapshot.data!;
          
          return Column(
            children: [
              // Current Bid
              Text(
                'Current Bid: \$${auction['current_bid']}',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              
              // Auction Timer
              if (auction['is_live'] == true) ...[
                Text(
                  'Time Left: ${auction['hours_left']}h ${auction['minutes_left']}m ${auction['seconds_left']}s',
                  style: TextStyle(
                    fontSize: 18,
                    color: auction['hours_left'] < 1 ? Colors.red : Colors.black,
                  ),
                ),
              ],
              
              // Status
              if (auction['is_ended'] == true) ...[
                Text(
                  'Auction Ended',
                  style: TextStyle(fontSize: 20, color: Colors.grey),
                ),
                if (auction['status'] == 'sold') ...[
                  Text('Winner: ${auction['highest_bidder_name']}'),
                ],
              ],
              
              // Bid History
              Expanded(
                child: StreamBuilder<List<Map<String, dynamic>>>(
                  stream: _auctionService.listenToBidHistory(widget.productId),
                  builder: (context, bidSnapshot) {
                    if (!bidSnapshot.hasData) {
                      return CircularProgressIndicator();
                    }
                    
                    return ListView.builder(
                      itemCount: bidSnapshot.data!.length,
                      itemBuilder: (context, index) {
                        final bid = bidSnapshot.data![index];
                        return ListTile(
                          title: Text('\$${bid['amount']}'),
                          subtitle: Text(bid['bidder_name']),
                          trailing: Text(
                            '${bid['timestamp']?.toString().substring(0, 16)}',
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

## 3. Product Approval/Rejection Notifications (FCM)

### Flutter Implementation

```dart
import 'package:firebase_messaging/firebase_messaging.dart';

class ProductNotificationService {
  static final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  
  // Initialize notification handlers
  static void initialize() {
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Received notification: ${message.notification?.title}');
      
      final data = message.data;
      final type = data['type'];
      
      if (type == 'product_approved') {
        _handleProductApproved(data);
      } else if (type == 'product_rejected') {
        _handleProductRejected(data);
      }
    });
    
    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _handleNotificationTap(message.data);
    });
    
    // Check if app was opened from notification
    _messaging.getInitialMessage().then((message) {
      if (message != null) {
        _handleNotificationTap(message.data);
      }
    });
  }
  
  static void _handleProductApproved(Map<String, dynamic> data) {
    final productId = data['product_id'];
    final productTitle = data['product_title'];
    
    // Show local notification or update UI
    // You can use flutter_local_notifications package
    
    // Navigate to product detail if needed
    // Navigator.pushNamed(context, '/product/$productId');
  }
  
  static void _handleProductRejected(Map<String, dynamic> data) {
    final productId = data['product_id'];
    final productTitle = data['product_title'];
    final reason = data['reason'];
    
    // Show rejection notification with reason
    // You can use flutter_local_notifications package
    
    // Show dialog or navigate to product detail
    // Navigator.pushNamed(context, '/product/$productId?rejected=true');
  }
  
  static void _handleNotificationTap(Map<String, dynamic> data) {
    final type = data['type'];
    final productId = data['product_id'];
    
    if (type == 'product_approved' || type == 'product_rejected') {
      // Navigate to product detail screen
      // Navigator.pushNamed(context, '/product/$productId');
    }
  }
}

// Setup in main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  // Initialize product notification handlers
  ProductNotificationService.initialize();
  
  // Initialize FCM background handler
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  
  runApp(MyApp());
}

// Background message handler
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Handling background message: ${message.messageId}');
  
  final data = message.data;
  final type = data['type'];
  
  if (type == 'product_approved') {
    // Handle product approved in background
    print('Product approved: ${data['product_id']}');
  } else if (type == 'product_rejected') {
    // Handle product rejected in background
    print('Product rejected: ${data['product_id']}');
  }
}

// Widget to show product notifications
class ProductNotificationWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<RemoteMessage?>(
      stream: FirebaseMessaging.onMessage,
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return SizedBox.shrink();
        }
        
        final message = snapshot.data!;
        final data = message.data;
        
        if (data['type'] == 'product_approved') {
          return _buildApprovalNotification(context, message);
        } else if (data['type'] == 'product_rejected') {
          return _buildRejectionNotification(context, message);
        }
        
        return SizedBox.shrink();
      },
    );
  }
  
  Widget _buildApprovalNotification(BuildContext context, RemoteMessage message) {
    return Container(
      padding: EdgeInsets.all(16),
      color: Colors.green[100],
      child: Row(
        children: [
          Icon(Icons.check_circle, color: Colors.green),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  message.notification?.title ?? 'Product Approved',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(message.notification?.body ?? ''),
              ],
            ),
          ),
          IconButton(
            icon: Icon(Icons.close),
            onPressed: () {
              // Dismiss notification
            },
          ),
        ],
      ),
    );
  }
  
  Widget _buildRejectionNotification(BuildContext context, RemoteMessage message) {
    return Container(
      padding: EdgeInsets.all(16),
      color: Colors.red[100],
      child: Row(
        children: [
          Icon(Icons.cancel, color: Colors.red),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  message.notification?.title ?? 'Product Rejected',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(message.notification?.body ?? ''),
                if (message.data['reason'] != null)
                  Text(
                    'Reason: ${message.data['reason']}',
                    style: TextStyle(fontSize: 12, color: Colors.grey[700]),
                  ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(Icons.close),
            onPressed: () {
              // Dismiss notification
            },
          ),
        ],
      ),
    );
  }
}
```

## Complete Integration Example

```dart
// main.dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  // Initialize all notification services
  ProductNotificationService.initialize();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  
  runApp(MyApp());
}

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Background message: ${message.messageId}');
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BidMaster',
      home: HomeScreen(),
    );
  }
}
```

## Environment Setup

Add to `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^2.24.2
  firebase_auth: ^4.15.3
  firebase_messaging: ^14.7.9
  cloud_firestore: ^4.13.6
  http: ^1.1.0
  flutter_local_notifications: ^16.3.0
```

## Notes

1. **Phone OTP**: Only Iraq numbers (+964) are accepted. Firebase handles OTP sending automatically.
2. **Auction Auto-Close**: Firestore listener provides real-time updates. Cloud Function handles closing logic.
3. **Product Notifications**: FCM notifications are sent automatically when admin approves/rejects products.

