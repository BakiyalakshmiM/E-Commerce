E-COMMERCE WEBSITE

Assuming that the e-commerce website have multiple users, and trying to sell the products in a website.

Created the schema to store all the products of the users.

Email-id is the unique field. 

In the body name, phone, email field needs to be provided. In the product field have to give colour, size and amount.

While creating the product, will check whether the user alrey exist or not. If not we will create a new document and store it in a db. Attaching the body below

{
"name": " Name",
"phone": 9123456789,
"email": "mail@gmail.com",
"product": [
{
"colour": "Yellow",
"size": "Medium",
"amount": 500
}
]
}

If the user already exists, then only the products(colour, size and amount) gets appended to already existing document

Input:

{
"name": " Name",
"phone": 9123456789,
"email": "mail@gmail.com",
"product": [
{
"colour": "Orange",
"size": "Large",
"amount": 500
}
]
}

Output:

{
"name": " Name",
"phone": 9123456789,
"email": "mail@gmail.com",
"product": [
{
"colour": "Yellow",
"size": "Medium",
"amount": 500
},
{
"colour": "Orange",
"size": "Large",
"amount": 500
}
]
}

When the same user try to add the product twice or if any of the field is missing in the body, it will throw an error.

In the GET request, will show all the user's products available in the system.

In the PUT request, we take email id of the user, colour and size and update the document of the particular user.
Suppose if the email id or color and size doesn't exist, it will throw an error

PUT method body:
{
"colour": "Golden-Yellow",
"size": "Small",
"amount": 500
}

In the params of the put method we have to give the fields to which we want to update the document.

In the delete request,  we take email id of the user, colour and size and delete the product of the particular user.


API:

GET    : /products
POST   : /products
PATCH  : /products/:email/:colour/:size
DELETE : /products/:email/:colour/:size

