create database six_pillars;
use six_pillars;

create table `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    `created_at` DATETIME not null
);

alter table `users`
    drop column `username`;

alter table `users`
    add column `user_name` varchar(255) not null after `user_id`;
create table `notes` (
    `note_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` varchar(255) NOT null,
    `content` text,
    `created_at` DATETIME,
    `updated_at` DATETIME on update CURRENT_TIMESTAMP
);

alter table `notes`
    add column `has_attachment` TINYINT(1) not null;

alter table `notes`
    add column user_id int(11) not null after `note_id`;
create table `tags` (
    `tag_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `name` varchar(255) NOT NULL unique
);

create table `note_attatchments` (
    `attachment_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `note_id` int(11) NOT NULL,
    `file_path` varchar(255) NOT NULL,
    `created_at` timestamp default CURRENT_TIMESTAMP
);

select * from note_attatchments


select notes.*, users.user_name
from notes
join users on notes.user_id=users.user_id
where users.user_id = users.user_id;

alter table `users`
    drop column `confPassword`;
use six_pillars;
INSERT INTO users (user_name, password, email, created_at) VALUES
('user1', 'password1',  'user1@example.com', NOW()),
('user2', 'password2',  'user2@example.com', NOW()),
('user3', 'password3',  'user3@example.com', NOW()),
('user4', 'password4',  'user4@example.com', NOW()),
('user5', 'password5',  'user5@example.com', NOW()),
('user6', 'password6',  'user6@example.com', NOW()),
('user7', 'password7', 'user7@example.com', NOW()),
('user8', 'password8',  'user8@example.com', NOW()),
('user9', 'password9',  'user9@example.com', NOW()),
('user10', 'password10', 'user10@example.com', NOW());

-- Assuming user IDs start from 1 and go up to 10

-- Insert 10 notes for user 1
INSERT INTO notes (user_id, title, content, created_at, updated_at, has_attachment) VALUES
(1, 'Note 1', 'This is the content of Note 1', NOW(), NOW(), 0),
(1, 'Note 2', 'This is the content of Note 2', NOW(), NOW(), 1),
(1, 'Note 3', 'This is the content of Note 3', NOW(), NOW(), 0),
(1, 'Note 4', 'This is the content of Note 4', NOW(), NOW(), 1),
(1, 'Note 5', 'This is the content of Note 5', NOW(), NOW(), 0);

-- Insert 5 notes for user 2
INSERT INTO notes (user_id, title, content, created_at, updated_at, has_attachment) VALUES
(2, 'Note 6', 'This is the content of Note 6', NOW(), NOW(), 1),
(2, 'Note 7', 'This is the content of Note 7', NOW(), NOW(), 0),
(2, 'Note 8', 'This is the content of Note 8', NOW(), NOW(), 1),
(2, 'Note 9', 'This is the content of Note 9', NOW(), NOW(), 0),
(2, 'Note 10', 'This is the content of Note 10', NOW(), NOW(), 1);