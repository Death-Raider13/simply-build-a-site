-- Seed initial data for KNITTED_GOURMET Nigeria platform

-- Insert Nigerian states
INSERT INTO nigerian_states (name, code, zone) VALUES
('Lagos', 'LA', 'South West'),
('Abuja', 'FC', 'North Central'),
('Kano', 'KN', 'North West'),
('Rivers', 'RI', 'South South'),
('Oyo', 'OY', 'South West'),
('Kaduna', 'KD', 'North West'),
('Ogun', 'OG', 'South West'),
('Anambra', 'AN', 'South East'),
('Imo', 'IM', 'South East'),
('Delta', 'DE', 'South South');

-- Insert product categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Nigerian Confectioneries', 'nigerian-confectioneries', 'Traditional and modern Nigerian sweets and treats', '/placeholder.svg?height=200&width=200&text=Nigerian+Sweets'),
('Crocheted Bags & Purses', 'crocheted-bags-purses', 'Handmade Nigerian-style crocheted bags and purses', '/placeholder.svg?height=200&width=200&text=Crocheted+Bags'),
('Nigerian Clothing', 'nigerian-clothing', 'Traditional and contemporary Nigerian fashion', '/placeholder.svg?height=200&width=200&text=Nigerian+Fashion'),
('Nigerian Accessories', 'nigerian-accessories', 'Jewelry, beads, and fashion accessories', '/placeholder.svg?height=200&width=200&text=Nigerian+Accessories');

-- Insert subcategories for confectioneries
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Chin Chin', 'chin-chin', 'Traditional Nigerian fried pastry snack', 1),
('Puff Puff', 'puff-puff', 'Nigerian deep-fried dough balls', 1),
('Biscuits & Cookies', 'biscuits-cookies', 'Nigerian-style biscuits and cookies', 1),
('Meat Pie', 'meat-pie', 'Nigerian savory pastries', 1);

-- Insert subcategories for bags
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Ankara Bags', 'ankara-bags', 'Bags made with Ankara fabric', 2),
('Traditional Bags', 'traditional-bags', 'Traditional Nigerian-style bags', 2),
('Modern Handbags', 'modern-handbags', 'Contemporary Nigerian handbags', 2);

-- Insert subcategories for clothing
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Ankara Clothing', 'ankara-clothing', 'Traditional Ankara fabric clothing', 3),
('Agbada', 'agbada', 'Traditional Nigerian flowing robe', 3),
('Dashiki', 'dashiki', 'Traditional West African garment', 3),
('Modern Nigerian Fashion', 'modern-nigerian-fashion', 'Contemporary Nigerian fashion', 3);

-- Create admin user (lateefedidi4@gmail.com with password lovers@1203)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('lateefedidi4@gmail.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Lateef', 'Edidi', 'admin', TRUE);

-- Create sample vendor users
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('adunni@sweetlagos.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Adunni', 'Okafor', 'vendor', TRUE),
('kemi@ankaracrafts.ng', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'Kemi', 'Adebayo', 'vendor', TRUE);

-- Create vendor profiles
INSERT INTO vendor_profiles (user_id, business_name, business_description, business_address, business_phone, state, city, is_approved) VALUES
(2, 'Sweet Lagos Confectionery', 'Premium Nigerian confectioneries and traditional sweets made with local ingredients', '15 Allen Avenue, Ikeja, Lagos State', '+234 803 123 4567', 'Lagos', 'Ikeja', TRUE),
(3, 'Ankara Crafts Nigeria', 'Beautiful handcrafted bags and accessories using authentic Nigerian Ankara fabrics', '22 Wuse Market, Abuja FCT', '+234 806 987 6543', 'Abuja', 'Wuse', TRUE);

-- Insert sample products with Nigerian pricing
INSERT INTO products (vendor_id, category_id, name, slug, description, short_description, price_naira, compare_price_naira, sku, quantity, is_active, is_featured) VALUES
(1, 5, 'Premium Chin Chin (500g)', 'premium-chin-chin-500g', 'Delicious homemade chin chin made with premium ingredients. Perfect for snacking or sharing with family and friends.', 'Premium homemade chin chin', 2500.00, 3000.00, 'CHIN-001', 50, TRUE, TRUE),
(1, 6, 'Sweet Puff Puff (12 pieces)', 'sweet-puff-puff-12pcs', 'Freshly made puff puff, soft and sweet. Perfect for breakfast or as a snack.', 'Fresh sweet puff puff', 1500.00, 1800.00, 'PUFF-001', 30, TRUE, TRUE),
(1, 7, 'Nigerian Meat Pie (6 pieces)', 'nigerian-meat-pie-6pcs', 'Traditional Nigerian meat pie with seasoned beef filling in flaky pastry.', 'Traditional meat pie', 3000.00, 3500.00, 'MEAT-001', 25, TRUE, FALSE),
(2, 8, 'Ankara Handbag - Floral Design', 'ankara-handbag-floral', 'Beautiful handcrafted handbag made with authentic Ankara fabric featuring vibrant floral patterns.', 'Ankara floral handbag', 8500.00, 10000.00, 'ANK-BAG-001', 15, TRUE, TRUE),
(2, 9, 'Traditional Woven Bag', 'traditional-woven-bag', 'Handwoven traditional Nigerian bag perfect for cultural events and everyday use.', 'Traditional woven bag', 6500.00, 7500.00, 'TRAD-BAG-001', 20, TRUE, TRUE);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES
(1, '/placeholder.svg?height=400&width=400&text=Chin+Chin', 'Premium Chin Chin package', TRUE),
(2, '/placeholder.svg?height=400&width=400&text=Puff+Puff', 'Sweet Puff Puff', TRUE),
(3, '/placeholder.svg?height=400&width=400&text=Meat+Pie', 'Nigerian Meat Pie', TRUE),
(4, '/placeholder.svg?height=400&width=400&text=Ankara+Bag', 'Ankara Handbag with floral design', TRUE),
(5, '/placeholder.svg?height=400&width=400&text=Traditional+Bag', 'Traditional woven bag', TRUE);

-- Create admin access key (key: NIGERIA_ADMIN_2024)
INSERT INTO admin_keys (key_hash, description, is_active) VALUES
('$2b$10$nigeriaadminkeyhashexample', 'Nigeria admin master key', TRUE);
