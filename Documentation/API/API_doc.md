Base url: 10.125.52.56:3000/api

1. `GET /test`
    - Description: Test endpoint to check if the API is working.
    - Authentication: No
    - Request Body: None

1. `POST /user/signUp`
    - Description: Endpoint for user registration.
    - Authentication: No
   - Request Body:
       - `username`: The username of the user. This field is required.
       - `password`: The password of the user. This field is required.
       - `email`: The email of the user. This field is required.
       - `phoneNumber`: The phone number of the user. This field is required.
   - Example: `{ "username": "user1", "password": "password1", "email": "user1@example.com", "phoneNumber": "1234567890" }`

1. `POST /user/logIn`
    - Description: Endpoint for user login.
    - Authentication: No
   - Request Body:
       - `username`: The username of the user. This field is required.
       - `password`: The password of the user. This field is required.
   - Example: `{ "username": "user1", "password": "password1" }`

1. `GET /user/getAllRestaurant`
    - Description: Endpoint to get all restaurants.
   - Authentication: No
    - Request Body: None

1. `POST /user/getAllArticlesFromRestaurant`
    - Description: Endpoint to get all articles from a specific restaurant.
   - Authentication: No
        - `restaurantId`: The id of the restaurant. This field is required.
    - Example: `{ "restaurantId": 1 }`

1. `POST /user/makeOrder`
    - Description: Endpoint for users to place an order. The user needs to provide an array of `ArticleId` that they want to order and the
      address where the order should be delivered.
    - Authentication: Yes
    - Request Body:
        - `articleIdArray`: An array of `ArticleId` that the user wants to order. This field is required.
        - `street`: The street of the delivery address. This field is required.
        - `city`: The city of the delivery address. This field is required.
        - `postalCode`: The postal code of the delivery address. This field is required.
        - `country`: The country of the delivery address. This field is required.
    - Example: `{ "articleIdArray": [1, 2, 3], "street": "123 Main St", "city": "Anytown", "postalCode": "12345", "country": "Anyland" }`

1. `POST /manager/signUp`
    - Description: Endpoint for restaurant manager registration.
    - Authentication: No
   - Request Body:
       - `firstName`: The first name of the restaurant manager. This field is required.
       - `lastName`: The last name of the restaurant manager. This field is required.
       - `email`: The email of the restaurant manager. This field is required.
       - `password`: The password of the restaurant manager. This field is required.
   - Example: `{ "firstName": "John", "lastName": "Doe", "email": "johndoe@example.com", "password": "password1" }`

1. `POST /manager/logIn`
    - Description: Endpoint for restaurant manager login.
    - Authentication: No
   - Request Body:
       - `email`: The email of the restaurant manager. This field is required.
       - `password`: The password of the restaurant manager. This field is required.
   - Example: `{ "email": "johndoe@example.com", "password": "password1" }`

1. `POST /manager/addRestaurant`
    - Description: Endpoint for restaurant manager to add a restaurant.
    - Authentication: Yes
   - Request Body:
       - `name`: The name of the restaurant. This field is required.
       - `street`: The street of the restaurant. This field is required.
       - `city`: The city of the restaurant. This field is required.
       - `postalCode`: The postal code of the restaurant. This field is required.
       - `country`: The country of the restaurant. This field is required.
   - Example: `{ "name": "Restaurant1", "street": "123 Main St", "city": "Anytown", "postalCode": "12345", "country": "Anyland" }`

1. `POST /manager/deleteRestaurant`
    - Description: Endpoint for managers to delete restaurant by id.
    - Authentication: Yes
    - Request Body:
        - `restaurantId`: The id of the restaurant to be deleted. This field is required.
    - Example: `{ "restaurantId": 1 }`

1. `GET /manager/getAllOwnedRestaurant`
    - Description: Endpoint for restaurant manager to get all owned restaurants.
    - Authentication: Yes
    - Request Body: None

1. `POST /manager/addArticle`
    - Description: Endpoint for restaurant manager to add an article.
    - Authentication: Yes
   - Request Body:
       - `restaurantId`: The id of the restaurant. This field is required.
       - `name`: The name of the article. This field is required.
       - `ingredients`: The ingredients of the article. This field is required.
       - `price`: The price of the article. This field is required.
       - `type` ('Entrée' | 'Plat' | 'Déssert' | 'Boisson'): The type of the article. This field is required.
       - `preparationTimeSec`: The preparation time of the article in seconds. This field is optional.
   - Example: `{ "restaurantId": 1, "name": "Article1", "ingredients": "Ingredient1, Ingredient2", "price": 10, "type": "Plat",
     "preparationTimeSec": 600 }`

1. `POST /manager/getRestaurantOpenOrders`
    - Description: Endpoint for restaurant manager to get all open orders for a specific restaurant.
    - Authentication: Yes
    - Request Body:
        - `restaurantId`: The id of the restaurant for which to fetch open orders. This field is required.
    - Example: `{ "restaurantId": 1 }`

1. `POST /manager/confirmOrder`
    - Description: Endpoint for restaurant manager to confirm an order.
    - Authentication: Yes
    - Request Body:
        - `orderId`: The id of the order to be confirmed. This field is required.
    - Example: `{ "orderId": 1 }`

1. `POST /manager/cancelOrder`
    - Description: Endpoint for restaurant manager to cancel an order.
    - Authentication: Yes
    - Request Body:
        - `orderId`: The id of the order to be cancelled. This field is required.
    - Example: `{ "orderId": 1 }`

1. `POST /deliverer/signUp`
    - Description: Endpoint for deliverer registration.
   - Authentication: No
   - Request Body:
       - `username`: The username of the deliverer. This field is required.
       - `password`: The password of the deliverer. This field is required.
   - Example: `{ "username": "deliverer1", "password": "password1" }`

1. `POST /deliverer/logIn`
    - Description: Endpoint for deliverer login.
   - Authentication: No
   - Request Body:
       - `username`: The username of the deliverer. This field is required.
       - `password`: The password of the deliverer. This field is required.
   - Example: `{ "username": "deliverer1", "password": "password1" }`

1. `GET /deliverer/getAllOpenOrders`
    - Description: Endpoint for deliverer to get all open orders.
    - Authentication: Yes
    - Request Body: None

1. `POST /deliverer/assignOrderToSelf`
    - Description: Endpoint for deliverer to assign an order to themselves.
    - Authentication: Yes
    - Request Body:
        - `orderId`: The id of the order to be assigned. This field is required.
    - Example: `{ "orderId": 1 }`
