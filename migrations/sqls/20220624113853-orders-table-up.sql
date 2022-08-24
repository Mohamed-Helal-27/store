CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(215),
    user_id bigint REFERENCES users(id)
);