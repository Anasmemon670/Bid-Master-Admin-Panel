# Flutter Firebase Integration Guide

This guide provides code examples for integrating Firebase services with the BidMaster Flutter mobile app.

## Prerequisites

1. Add Firebase dependencies to `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^2.24.2
  firebase_auth: ^4.15.3
  firebase_storage: ^11.5.6
  firebase_messaging: ^14.7.9
  cloud_firestore: ^4.13.6
  http: ^1.1.0
  image_picker: ^1.0.4
```

2. Initialize Firebase in `main.dart`:
```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}
```

## 1. Firebase Authentication Integration

### Register User
```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<Map<String, dynamic>> registerWithFirebase({
  required String email,
  required String password,
  required String role, // 'buyer' or 'seller'
}) async {
  try {
    // 1. Create Firebase user
    UserCredential userCredential = await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email, password: password);
    
    // 2. Get Firebase ID token
    String idToken = await userCredential.user!.getIdToken();
    
    // 3. Register with backend
    final response = await http.post(
      Uri.parse('https://your-api.com/api/auth/firebase-register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'idToken': idToken,
        'role': role,
      }),
    );
    
    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);
      return {
        'success': true,
        'token': data['token'], // App JWT token
        'user': data['user'],
      };
    } else {
      throw Exception('Registration failed');
    }
  } catch (e) {
    print('Registration error: $e');
    rethrow;
  }
}
```

### Login User
```dart
Future<Map<String, dynamic>> loginWithFirebase({
  required String email,
  required String password,
}) async {
  try {
    // 1. Sign in with Firebase
    UserCredential userCredential = await FirebaseAuth.instance
        .signInWithEmailAndPassword(email: email, password: password);
    
    // 2. Get Firebase ID token
    String idToken = await userCredential.user!.getIdToken();
    
    // 3. Authenticate with backend
    final response = await http.post(
      Uri.parse('https://your-api.com/api/auth/firebase-login'),
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
      throw Exception('Login failed');
    }
  } catch (e) {
    print('Login error: $e');
    rethrow;
  }
}
```

### Password Reset (Firebase built-in)
```dart
Future<void> resetPassword(String email) async {
  try {
    await FirebaseAuth.instance.sendPasswordResetEmail(email: email);
    print('Password reset email sent');
  } catch (e) {
    print('Password reset error: $e');
    rethrow;
  }
}
```

### Store and Use App JWT Token
```dart
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String _tokenKey = 'app_jwt_token';
  
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }
  
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }
  
  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }
  
  // Use token in API calls
  Future<Map<String, String>> getHeaders() async {
    final token = await getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }
}
```

## 2. Firebase Storage - Product Image Upload

### Upload Image to Firebase Storage
```dart
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

Future<String> uploadProductImage(File imageFile, String sellerId) async {
  try {
    // Create unique filename
    String fileName = 'products/$sellerId/${DateTime.now().millisecondsSinceEpoch}_${imageFile.path.split('/').last}';
    
    // Upload to Firebase Storage
    Reference ref = FirebaseStorage.instance.ref().child(fileName);
    UploadTask uploadTask = ref.putFile(imageFile);
    
    TaskSnapshot snapshot = await uploadTask;
    String downloadUrl = await snapshot.ref.getDownloadURL();
    
    return downloadUrl;
  } catch (e) {
    print('Image upload error: $e');
    rethrow;
  }
}

// Alternative: Upload via backend (recommended)
Future<String> uploadImageViaBackend(File imageFile, String token) async {
  try {
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://your-api.com/api/products/create'),
    );
    
    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('image', imageFile.path),
    );
    
    // Add other product fields
    request.fields['title'] = 'Product Title';
    request.fields['startingPrice'] = '100.00';
    // ... other fields
    
    var response = await request.send();
    if (response.statusCode == 201) {
      final responseData = await response.stream.bytesToString();
      final data = jsonDecode(responseData);
      return data['data']['image_url']; // URL saved in database
    } else {
      throw Exception('Upload failed');
    }
  } catch (e) {
    print('Backend upload error: $e');
    rethrow;
  }
}
```

## 3. Firebase Cloud Messaging (FCM) Integration

### Initialize FCM and Get Token
```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;

class FCMService {
  static final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  
  // Request permission (iOS)
  static Future<void> requestPermission() async {
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');
    }
  }
  
  // Get FCM token
  static Future<String?> getFCMToken() async {
    try {
      String? token = await _messaging.getToken();
      print('FCM Token: $token');
      return token;
    } catch (e) {
      print('Error getting FCM token: $e');
      return null;
    }
  }
  
  // Send FCM token to backend
  static Future<void> sendTokenToBackend(String token, String appToken) async {
    try {
      final response = await http.post(
        Uri.parse('https://your-api.com/api/notifications/token'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $appToken',
        },
        body: jsonEncode({
          'fcmToken': token,
        }),
      );
      
      if (response.statusCode == 200) {
        print('FCM token saved successfully');
      }
    } catch (e) {
      print('Error sending FCM token: $e');
    }
  }
  
  // Initialize FCM (call in main.dart or app initialization)
  static void initializeFCM(String appToken) async {
    // Request permission
    await requestPermission();
    
    // Get and send token
    String? fcmToken = await getFCMToken();
    if (fcmToken != null) {
      await sendTokenToBackend(fcmToken, appToken);
    }
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('Got a message whilst in the foreground!');
      print('Message data: ${message.data}');
      
      // Show local notification
      // You can use flutter_local_notifications package
    });
    
    // Handle background messages (must be top-level function)
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
    
    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      print('Notification opened app: ${message.data}');
      // Navigate to relevant screen
    });
    
    // Check if app was opened from notification
    RemoteMessage? initialMessage = await _messaging.getInitialMessage();
    if (initialMessage != null) {
      print('App opened from notification: ${initialMessage.data}');
      // Navigate to relevant screen
    }
  }
}

// Top-level function for background messages
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Handling a background message: ${message.messageId}');
}
```

### Setup in main.dart
```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  // Initialize FCM background handler
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  
  runApp(MyApp());
}
```

## 4. Firestore Real-time Bid Updates

### Listen to Real-time Bid Updates
```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class BidService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // Listen to product bid updates in real-time
  Stream<Map<String, dynamic>> listenToProductBids(int productId) {
    return _firestore
        .collection('products')
        .doc(productId.toString())
        .snapshots()
        .map((snapshot) {
      if (snapshot.exists) {
        return snapshot.data()!;
      }
      return {};
    });
  }
  
  // Listen to bids subcollection for bid history
  Stream<List<Map<String, dynamic>>> listenToBidHistory(int productId) {
    return _firestore
        .collection('products')
        .doc(productId.toString())
        .collection('bids')
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => doc.data()).toList();
    });
  }
  
  // Listen to auction end time
  Stream<Map<String, dynamic>> listenToAuctionTimer(int productId) {
    return _firestore
        .collection('products')
        .doc(productId.toString())
        .snapshots()
        .map((snapshot) {
      if (snapshot.exists) {
        final data = snapshot.data()!;
        final endTime = data['auction_end_time'] as Timestamp?;
        if (endTime != null) {
          final now = DateTime.now();
          final end = endTime.toDate();
          final remaining = end.difference(now);
          
          return {
            'hours_left': remaining.inHours,
            'minutes_left': remaining.inMinutes % 60,
            'seconds_left': remaining.inSeconds % 60,
            'is_ended': remaining.isNegative,
            'current_bid': data['current_bid'],
            'highest_bidder_name': data['highest_bidder_name'],
          };
        }
      }
      return {};
    });
  }
}
```

### Usage in Flutter Widget
```dart
class ProductBidWidget extends StatefulWidget {
  final int productId;
  
  const ProductBidWidget({required this.productId});
  
  @override
  _ProductBidWidgetState createState() => _ProductBidWidgetState();
}

class _ProductBidWidgetState extends State<ProductBidWidget> {
  final BidService _bidService = BidService();
  
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<Map<String, dynamic>>(
      stream: _bidService.listenToProductBids(widget.productId),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return CircularProgressIndicator();
        }
        
        final data = snapshot.data!;
        final currentBid = data['current_bid'] ?? 0.0;
        final bidderName = data['highest_bidder_name'] ?? 'No bids yet';
        
        return Column(
          children: [
            Text('Current Bid: \$$currentBid'),
            Text('Highest Bidder: $bidderName'),
            // Auction timer
            StreamBuilder<Map<String, dynamic>>(
              stream: _bidService.listenToAuctionTimer(widget.productId),
              builder: (context, timerSnapshot) {
                if (timerSnapshot.hasData) {
                  final timer = timerSnapshot.data!;
                  if (timer['is_ended'] == true) {
                    return Text('Auction Ended');
                  }
                  return Text(
                    'Time Left: ${timer['hours_left']}h ${timer['minutes_left']}m',
                  );
                }
                return SizedBox();
              },
            ),
          ],
        );
      },
    );
  }
}
```

## 5. Complete Integration Example

### App Initialization
```dart
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    _initializeApp();
  }
  
  Future<void> _initializeApp() async {
    // 1. Check if user is logged in
    final token = await AuthService().getToken();
    if (token != null) {
      // 2. Initialize FCM
      await FCMService.requestPermission();
      String? fcmToken = await FCMService.getFCMToken();
      if (fcmToken != null) {
        await FCMService.sendTokenToBackend(fcmToken, token);
      }
      
      // 3. Setup FCM listeners
      FCMService.initializeFCM(token);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // ... your app
    );
  }
}
```

## Environment Variables

Add to your `.env` file in backend:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
```

Or use service account JSON:
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

## Notes

1. **Password Reset**: Firebase handles password reset emails automatically. No backend integration needed.

2. **Real-time Updates**: Firestore provides real-time synchronization. Bids update automatically across all connected clients.

3. **Image Upload**: Can be done directly to Firebase Storage or via backend. Backend upload is recommended for security and database consistency.

4. **FCM Tokens**: Tokens may change. Re-send token after login and periodically refresh.

5. **Error Handling**: Always implement proper error handling and user feedback in production.

