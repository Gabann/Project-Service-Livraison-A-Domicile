Base url: 10.125.52.56:3000/api

1. `GET /api/test`
    - Description: Test endpoint to check if the API is working.
    - Authentication: No
    - Request Body: None

2. `POST /api/user/signUp`
    - Description: Endpoint for user registration.
    - Authentication: No
    - Request Body: `{ "username" (required), "password" (required), "email" (required), "phoneNumber" (required) }`

3. `POST /api/user/logIn`
    - Description: Endpoint for user login.
    - Authentication: No
    - Request Body: `{ "username" (required), "password" (required) }`

4. `GET /api/user/getAllRestaurant`
    - Description: Endpoint to get all restaurants.
   - Authentication: No
    - Request Body: None

5. `POST /api/manager/signUp`
    - Description: Endpoint for restaurant manager registration.
    - Authentication: No
    - Request Body: `{ "firstName" (required), "lastName" (required), "email" (required), "password" (required) }`

6. `POST /api/manager/logIn`
    - Description: Endpoint for restaurant manager login.
    - Authentication: No
    - Request Body: `{ "email" (required), "password" (required) }`

7. `POST /api/manager/addRestaurant`
    - Description: Endpoint for restaurant manager to add a restaurant.
    - Authentication: Yes
    - Request Body: `{ "name" (required), "street" (required), "city" (required), "postalCode" (required), "country" (required) }`

8. `GET /api/manager/getAllOwnedRestaurant`
    - Description: Endpoint for restaurant manager to get all owned restaurants.
    - Authentication: Yes
    - Request Body: None

9. `POST /api/manager/addArticle`
    - Description: Endpoint for restaurant manager to add an article.
    - Authentication: Yes
    - Request
      Body: `{ "restaurantId" (required), "name" (required), "ingredients" (required), "price" (required), "type" (required), "preparationTimeSec" (optional) }`
