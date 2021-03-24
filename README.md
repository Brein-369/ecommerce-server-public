# ecommerce-server
API server untuk e-commerce website



## RESTful endpoints



# POST /login

Request Header
Not Needed

Request Body
```
  {
    "email": <input email>,
    "password": "<input password>",
  }
```

Response(200-ok)
```
  {
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<user access token>"
  }
```

Response(400-Bad Request)
```
{
  "message": "Invalid Email or Password"
}
```




# GET /products

Request Header (should be role admin)
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed

Response(200-ok)
```
[
    {
        "id": 3,
        "name": "no name",
        "image_url": "https://img.my-best.id/press_component/item_part_images/a9784919a998c8b61557bc422acdf173.jpg?ixlib=rails-4.2.0&auto=compress&q=70&lossless=0&w=640&h=640&fit=clip",
        "price": 1111,
        "stock": 1111,
        "CategoryId": 1,
        "createdAt": "2021-03-16T18:37:17.973Z",
        "updatedAt": "2021-03-17T14:28:27.570Z"
    },
    {
        "id": 19,
        "name": "tes",
        "image_url": "tesss",
        "price": 11,
        "stock": 11,
        "CategoryId": 2,
        "createdAt": "2021-03-17T17:38:25.343Z",
        "updatedAt": "2021-03-17T17:38:25.343Z"
    }
[
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# POST /products

Request Header(should be role admin)
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  "name": "<input product name>",
  "image_url": "<input image url>", 
  "price": "<input product price>",
  "stock" : "<input product stock>",
  "CategoryId" : "<input category id>"
}
```
Request Params
Not needed

Response(201-created)
```
{
    "id" : "<auto generated id>"
  "name": "<product name>",
  "image_url": "<product image url>", 
  "price": "<product price>", 
  "stock": "<product stock>", 
  "CategoryId": "<product category id>", 
}
```

Response(400-Bad Request)
```
{
    "message": "Bad Request",
    "detail": "invalid input syntax for integer: \"NaN\""
}
```

Response(400-Bad Request)
```
{
    "theErr": [
        "name is required",
        'price minimal 1',
        'stock minimal 1'
    ]
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "Access Token Error"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "you are not admin"
}
```


Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# GET /products/:id

Request Header(should be role admin)
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not needed

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "id": "<auto generate id>",
    "name": "<product name>",
    "image_url": "<product image url>",
    "price": <product price>,
    "stock": <product stock>,
    "CategoryId": <product category id>,
    "Category": {
        "id": <auto generate id>,
        "name": "<category name>"
    }
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "Access Token Error"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "you are not admin"
}
```


Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# PUT /products/:id

Request Header(should be role admin)
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  "name": "<input product name>",
  "image_url": "<input image url>", 
  "price": "<input product price>",
  "stock" : "<input product stock>",
  "CategoryId" : "<input category id>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "id" : <auto generated id>
  "name": "<product name>",
  "image_url": "<product image url>", 
  "price": <product price>, 
  "stock": <product stock>, 
  "CategoryId": <product category id>, 
}
  ```

Response(400-Bad Request)
```
{
    "message": "Bad Request",
    "detail": "invalid input syntax for integer: \"NaN\""
}
```

Response(400-Bad Request)
```
{
    "theErr": [
        "name is required",
        'price minimal 1',
        'stock minimal 1'
    ]
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "Access Token Error"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "you are not admin"
}
```


Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




-----
# DELETE /products/:id

Request Header(should be role admin)
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
  {
    "message": "Product deletion success"
  }
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "Access Token Error"
}
```
Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "you are not admin"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



# USERS

# POST /user/register

Request Header
Not Needed

Request Body
```
  {
    "email": <input email>,
    "password": "<input password>",
    "address": "<input address>",
    "phone": "<input phone>"
  }
```

Response(200-ok)
```
  {
    "email": <user email>,
    "address": "<user address>",
    "phone": "<user phone>"
  }
```

Response(400-Bad Request)
```
{
    "theErr": [
        "Phone should be in number",
        "Email Should be Unique",
        "Email should not be empty",
        "Password should be minimal 6 characters",
        "Password should not be empty"
    ]
}
```


# POST /user/login

Request Header
Not Needed

Request Body
```
  {
    "email": <input email>,
    "password": "<input password>",
  }
```

Response(200-ok)
```
  {
    "id": <id>,
    "email": "user email",
    "address": "user address",
    "phone": "user phone",
    "access_token": "<user access token>"
  }
```

Response(400-Bad Request)
```
{
  "message": "Invalid Email or Password"
}
```



# GET /user/products

Request Header (role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed

Response(200-ok)
```
[
    {
        "id": 3,
        "name": "no name",
        "image_url": "https://img.my-best.id/press_component/item_part_images/a9784919a998c8b61557bc422acdf173.jpg?ixlib=rails-4.2.0&auto=compress&q=70&lossless=0&w=640&h=640&fit=clip",
        "price": 1111,
        "stock": 1111,
        "CategoryId": 1,
        "createdAt": "2021-03-16T18:37:17.973Z",
        "updatedAt": "2021-03-17T14:28:27.570Z"
    },
    {
        "id": 19,
        "name": "tes",
        "image_url": "tesss",
        "price": 11,
        "stock": 11,
        "CategoryId": 2,
        "createdAt": "2021-03-17T17:38:25.343Z",
        "updatedAt": "2021-03-17T17:38:25.343Z"
    }
[
```
Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



# GET /user/wishlist

Request Header (role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed

Response(200-ok)
```
[
    {
        "id": 7,
        "UserId": 15,
        "ProductId": 26,
        "createdAt": "2021-03-24T19:05:20.517Z",
        "updatedAt": "2021-03-24T19:05:20.517Z",
        "Product": {
            "id": 26,
            "name": "barbel custom",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdKUaP_v33hv7Qawv0TIatK1nCvF-1gcmnA&usqp=CAU",
            "price": 2000000,
            "stock": 2,
            "CategoryId": 4,
            "createdAt": "2021-03-23T21:22:37.363Z",
            "updatedAt": "2021-03-24T18:52:39.285Z"
        }
    },
    {
        "id": 8,
        "UserId": 15,
        "ProductId": 3,
        "createdAt": "2021-03-24T19:05:21.843Z",
        "updatedAt": "2021-03-24T19:05:21.843Z",
        "Product": {
            "id": 3,
            "name": "no name",
            "image_url": "https://img.my-best.id/press_component/item_part_images/a9784919a998c8b61557bc422acdf173.jpg?ixlib=rails-4.2.0&auto=compress&q=70&lossless=0&w=640&h=640&fit=clip",
            "price": 1650000,
            "stock": 2,
            "CategoryId": 1,
            "createdAt": "2021-03-16T18:37:17.973Z",
            "updatedAt": "2021-03-24T18:52:39.300Z"
        }
    }
]
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




# POST /user/wishlist

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  "ProductId" : "<input product id>"
}
```
Request Params
Not needed

Response(201-created)
```
[
  {
    "id": 2,
    "UserId": 15,
    "ProductId": 26,
    "createdAt": "2021-03-24T17:57:26.827Z",
    "updatedAt": "2021-03-24T17:57:26.827Z"
  },
  true
]
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Wishlist not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



# GET /user/cart

Request Header (role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Body
Not Needed

Response(200-ok)
```
[
    {
        "id": 57,
        "UserId": 15,
        "ProductId": 26,
        "quantity": 1,
        "createdAt": "2021-03-24T19:16:28.809Z",
        "updatedAt": "2021-03-24T19:16:28.809Z",
        "Product": {
            "id": 26,
            "name": "barbel custom",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdKUaP_v33hv7Qawv0TIatK1nCvF-1gcmnA&usqp=CAU",
            "price": 2000000,
            "stock": 2,
            "CategoryId": 4,
            "createdAt": "2021-03-23T21:22:37.363Z",
            "updatedAt": "2021-03-24T18:52:39.285Z"
        }
    },
    {
        "id": 58,
        "UserId": 15,
        "ProductId": 3,
        "quantity": 1,
        "createdAt": "2021-03-24T19:16:29.887Z",
        "updatedAt": "2021-03-24T19:16:29.887Z",
        "Product": {
            "id": 3,
            "name": "no name",
            "image_url": "https://img.my-best.id/press_component/item_part_images/a9784919a998c8b61557bc422acdf173.jpg?ixlib=rails-4.2.0&auto=compress&q=70&lossless=0&w=640&h=640&fit=clip",
            "price": 1650000,
            "stock": 2,
            "CategoryId": 1,
            "createdAt": "2021-03-16T18:37:17.973Z",
            "updatedAt": "2021-03-24T18:52:39.300Z"
        }
    }
]
```
Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```





# POST /user/cart

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Body
```
{
  "ProductId" : "<input product id>"
}
```
Request Params
Not needed

Response(201-created)
```
[
    {
        "id": 44,
        "quantity": 1,
        "UserId": 15,
        "ProductId": 26,
        "updatedAt": "2021-03-24T17:05:07.902Z",
        "createdAt": "2021-03-24T17:05:07.902Z"
    },
    true
]
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Cart not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```



# DELETE user/cart/checkout

Request Header (role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Params
Not Needed

Response(200-ok)
```
{
    "message": "Checkout Success"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```





# DELETE user/wishlist/:id

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "message": "Wishlist Deletion Success"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
  "detail": "User Has no Authorization to this Wishlist"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Wishlist not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




# PATCH user/cart/addqty/:id

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "message": "Adding Cart Quantity Success"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
  "detail": "User Has no Authorization to this Cart"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Cart not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




# PATCH user/cart/subqty/:id

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "message": "Subtract Cart Quantity Success"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
  "detail": "User Has no Authorization to this Cart"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Cart not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```




# DELETE user/cart/:id

Request Header(role customer)
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
id = <id to be requested>
```

Response(200-ok)
```
{
    "message": "Cart Deletion Success"
}
```

Response(401-Bad Request)
```
{
  "message": "Authorization Error"
  "detail": "User authentication error"
  "detail": "User Has no Authorization to this Cart"
}
```

Response(404-Resource not found)
```
{
  "message": "Resource not found"
  "detail": "Cart not found"
}
```

Response(500-Internal Server Error)
```
{
  "message": "Internal Server Error"
}
```