-- Seed initial data for KNITTED_GOURMET platform

-- Insert product categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Confectioneries', 'confectioneries', 'Sweet treats and gourmet confections', '/placeholder.svg?height=200&width=200'),
('Crocheted Bags & Purses', 'crocheted-bags-purses', 'Handmade crocheted bags and purses', '/placeholder.svg?height=200&width=200'),
('Clothing', 'clothing', 'Fashion clothing and apparel', '/placeholder.svg?height=200&width=200'),
('Accessories', 'accessories', 'Fashion accessories and jewelry', '/placeholder.svg?height=200&width=200');

-- Insert subcategories for confectioneries
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Chocolates', 'chocolates', 'Premium chocolates and truffles', 1),
('Candies', 'candies', 'Gourmet candies and sweets', 1),
('Baked Goods', 'baked-goods', 'Fresh baked treats', 1);

-- Insert subcategories for bags
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Handbags', 'handbags', 'Crocheted handbags', 2),
('Tote Bags', 'tote-bags', 'Crocheted tote bags', 2),
('Evening Bags', 'evening-bags', 'Elegant evening bags', 2);

-- Create admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('admin@knittedgourmet.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Admin', 'User', 'admin', TRUE);

-- Create sample vendor user (password: vendor123)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('vendor@example.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Jane', 'Smith', 'vendor', TRUE);

-- Create vendor profile
INSERT INTO vendor_profiles (user_id, business_name, business_description, business_address, business_phone, is_approved) VALUES
(2, 'Sweet Creations', 'Artisan confectionery specializing in handmade chocolates and candies', '123 Baker Street, Sweet City, SC 12345', '(555) 123-4567', TRUE);

-- Insert sample products
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, price, compare_price, sku, quantity, is_active, is_featured) VALUES
(1, 5, 'Artisan Dark Chocolate Truffles', 'artisan-dark-chocolate-truffles', 'Handcrafted dark chocolate truffles made with premium Belgian chocolate and natural ingredients.', 'Premium dark chocolate truffles', 24.99, 29.99, 'CHOC-TRUF-001', 50, TRUE, TRUE),
(1, 5, 'Gourmet Milk Chocolate Box', 'gourmet-milk-chocolate-box', 'A selection of our finest milk chocolates in an elegant gift box.', 'Assorted milk chocolates', 34.99, 39.99, 'CHOC-BOX-001', 25, TRUE, TRUE),
(1, 6, 'Rainbow Gummy Bears', 'rainbow-gummy-bears', 'Colorful and delicious gummy bears made with natural fruit flavors.', 'Natural fruit gummy bears', 12.99, 15.99, 'GUMMY-001', 100, TRUE, FALSE);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES
(1, '/placeholder.svg?height=400&width=400', 'Dark chocolate truffles', TRUE),
(2, '/placeholder.svg?height=400&width=400', 'Milk chocolate gift box', TRUE),
(3, '/placeholder.svg?height=400&width=400', 'Rainbow gummy bears', TRUE);

-- Create admin access key (key: ADMIN_MASTER_KEY_2024)
INSERT INTO admin_keys (key_hash, description, is_active) VALUES
('$2b$10$adminkeyhashexample', 'Master admin access key', TRUE);
