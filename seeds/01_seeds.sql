INSERT INTO users 
(name, email, password)
VALUES ('Dave Smith', 'dave1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mike Jones', 'mike1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Peter Pan', 'peter1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('James Whelan', 'james1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Steve Roller', 'steve1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mark Mayandi', 'mark1234@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 45000, 5, 3, 4, 'Canada', '345 NorthValled Drive', 'Kingston', 'Ontario', '28142'),
(2, 'Blank corner', 'description', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg', 89240, 15, 5, 6, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '233422'),
(3, 'Habit mix', 'description', 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg', 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg', 100234, 10, 6, 8, 'Canada', '513 Powov Grove', 'jaebvap', 'Nova Scotia', '435433');

INSERT INTO reservations
(start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 1, 4),
('2014-10-21', '2014-10-21', 3, 5),
('2016-07-17', '2016-08-01', 3, 4),
('2018-05-01', '2018-05-27', 3, 6),
('2022-10-04', '2022-10-23', 1, 5),
('2023-05-27', '2023-05-28', 2, 4);

INSERT INTO property_reviews
(guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 4, 'messages'),
(5, 1, 7, 3, 'messages'),
(4, 1, 3, 5, 'messages'),
(3, 2, 1, 3, 'messages'),
(6, 3, 6, 3, 'messages'),
(5, 3, 4, 2, 'messages'),
(4, 2, 8, 5, 'messages'),
(4, 3, 5, 1, 'messages');
