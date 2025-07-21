-- Insertion des types de dons
INSERT INTO donation_types (name, code, description) VALUES
('Dîme', 'tithe', 'Dîme mensuelle - 10% des revenus'),
('Offrande', 'offering', 'Offrande libre pour les besoins de l\'église'),
('Don spécial', 'special', 'Don pour des projets spéciaux ou urgences');

-- Insertion de quelques donateurs de test
INSERT INTO donors (name, email, phone) VALUES
('Marie Dubois', 'marie.dubois@email.com', '+33123456789'),
('Pierre Martin', 'pierre.martin@email.com', '+33987654321'),
('Sophie Leroy', 'sophie.leroy@email.com', '+33456789123'),
('Jean Dupont', 'jean.dupont@email.com', '+33789123456');

-- Insertion de transactions de test
INSERT INTO transactions (donor_id, donation_type_id, amount, status, payment_date, message) VALUES
(1, 1, 150.00, 'completed', '2024-01-15 10:30:00', 'Dîme de janvier'),
(2, 2, 75.00, 'completed', '2024-01-14 14:20:00', 'Pour les missions'),
(3, 1, 120.00, 'completed', '2024-01-12 09:15:00', 'Dîme de janvier'),
(4, 2, 50.00, 'completed', '2024-01-11 16:45:00', 'Offrande du dimanche'),
(1, 3, 200.00, 'completed', '2024-01-13 11:30:00', 'Pour la rénovation');

-- Paramètres système
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('church_name', 'Église Évangélique de la Paix', 'Nom de l\'église'),
('currency', 'EUR', 'Devise utilisée'),
('qr_code_expiry_hours', '24', 'Durée de validité des QR codes en heures'),
('min_donation_amount', '1.00', 'Montant minimum pour un don'),
('max_donation_amount', '10000.00', 'Montant maximum pour un don');
