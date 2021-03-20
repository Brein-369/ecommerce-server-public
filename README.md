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

