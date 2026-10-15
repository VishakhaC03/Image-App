Image Application is a React Native application built with Expo and TypeScript that allows users to register, log in, explore images, search for image authors, save favorite images, download images to their device gallery, and manage their profiles.
The application uses the Picsum Photos API to retrieve images and AsyncStorage to persist user information, session status, and favorite images locally.
Features:
1. User Authentication
User registration with full name, email, gender, mobile number, address, city, and password.
Login using registered email and password.
2. Image Gallery
Fetches images from the Picsum Photos API.
Displays images using React Native's FlatList component.
Shows image authors and image IDs.
3. Image Details and Download
View images on a dedicated details screen.
Display the image author and ID.
4. Search and Filtering
Search images by author name.
Uses a custom debounce hook to reduce unnecessary filtering while typing.
5. Favorites Management
Add images to favorites using the heart icon.
Remove images from favorites.
View saved images on the Favorites screen.
6. Profile Management
View registered user information.
Edit name, email, mobile number, address, and city.
Validate email and mobile number before saving changes.

API Integration
Image Application uses the Picsum Photos API to retrieve image information.
API endpoint:

https://picsum.photos/v2/list?page=1&limit=10

The API returns information such as:
1. Image ID
2. Author name
3. Image width and height
4. Image URL
5. Download URL
Pagination parameters allow the application to request images in batches rather than loading the entire gallery at once.

API documentation: https://picsum.photos/

State Management and Data Persistence
The React Context API provides centralized management for:
1. Registered user information
2. Login session status
3. Favorite images
4. Profile updates
AsyncStorage stores user data, session status, and favorite images locally, allowing selected information to remain available after the application restarts.

Validation
The application includes reusable validation functions for:
Email address format
Ten-digit mobile numbers
Minimum password length of six characters
Required registration fields
Password and confirmation matching
Profile update fields

Future Enhancements
Implement secure backend authentication and password hashing.
Store favorites separately for each user account.
Add password reset and email verification.
Introduce image categories and advanced search.
Improve accessibility and responsive UI design.
Add automated unit and integration tests.
Improve API error handling and prevent duplicate pagination requests.
Add image caching and offline support.

Security Considerations
This project uses local authentication for demonstration purposes. Passwords are currently stored as plaintext in AsyncStorage, which is not appropriate for production applications.
A production-ready version should use secure backend authentication, server-side password hashing, appropriate session management, and secure storage for sensitive tokens.

Learning Outcomes
This project demonstrates practical experience with:
Building cross-platform applications using React Native and Expo.
Developing reusable, typed UI components.
Implementing navigation using React Navigation.
Managing shared application state with React Context.
Integrating REST APIs using fetch.
Implementing search, filtering, pagination, and pull-to-refresh.
Persisting application data using AsyncStorage.
Validating forms and handling errors.
Using native device capabilities for image downloads