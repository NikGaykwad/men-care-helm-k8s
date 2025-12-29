CREATE DATABASE IF NOT EXISTS men_haircare_db;
USE men_haircare_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Seed Data (Optional)
INSERT INTO products (name, description, price, image_url, category, is_trending) VALUES
('Matte Clay', 'Strong hold with a matte finish.', 25.00, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3', 'Styling', TRUE),
('Nourishing Shampoo', 'Daily cleanse for healthy hair.', 18.00, 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3', 'Care', TRUE),
('Revitalizing Conditioner', 'Softens and strengthens.', 20.00, 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3', 'Care', FALSE),
('Texture Powder', 'Volume and texture implementation.', 22.00, 'https://images.unsplash.com/photo-1595348020949-87adf9642719?auto=format&fit=crop&q=80&w=1926&ixlib=rb-4.0.3', 'Styling', TRUE),
('Sea Salt Spray', 'Beach waves and volume.', 19.50, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3', 'Styling', FALSE);
