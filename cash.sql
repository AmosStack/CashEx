CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    currency_from VARCHAR(10),
    currency_to VARCHAR(10),
    amount DECIMAL(10,2),
    rate_used DECIMAL(10,2),
    total DECIMAL(10,2),
    type ENUM('buy','sell'),
    status ENUM('pending','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency_from VARCHAR(10),
    currency_to VARCHAR(10),
    buy_rate DECIMAL(10,2),
    sell_rate DECIMAL(10,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin','customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);