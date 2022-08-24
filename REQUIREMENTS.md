# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: "/api/products" [GET]
- Show: "/api/products/:product_id" [GET]
- Create [token required]: "/api/products" [Post]

#### Users

- Index [token required]: "/api/users" [GET]
- Show [token required]: "/api/users/:user_id" [GET]
- Create N[token required]: "/api/users" [Post]

#### Orders

- Create [token required]: "/api/orders" [Post]
- addProduct [token required]: "/api/order-products/" [Post]
- Current Order by user (args: user id)[token required]: "/api/order-products/:user_id" [GET]

## Tables

#### products
(  id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    price INT NOT NULL
    );

#### users
(  id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_name VARCHAR(10) NOT NULL,
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10) NOT NULL,
    password VARCHAR(150) NOT NULL
    );

#### orders
( id SERIAL PRIMARY KEY,
    status VARCHAR(215),
    user_id bigint REFERENCES users(id))

#### order_products 
( id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
    );

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
