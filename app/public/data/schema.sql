CREATE DATABASE IF NOT EXISTS msisdb;

USE msisdb;

DROP TABLE IF EXISTS referee;

CREATE TABLE referee (
    id int Primary key auto_increment,
    rname varchar(96)  NOT NULL,
    age int,
    referee_grade char(2),
    referee_skill int,
    relevant_position varchar(24),
    report varchar(24)
);

INSERT INTO referee (id,rname, age, referee_grade, referee_skill, relevant_position, report) VALUES 

(1,'Dominic Toretto', 35, 'A', 8, 'Front', 'report1'),
(2,'Steve Rogers', 71, 'B', 6, 'Back', 'report2'),
(3,'James Buchannan Barnes', 30, 'C', 5, 'Left', 'report3'),
(4,'Tony Stark', 42, 'A', 10, 'Front', 'report4')
;

CREATE TABLE games(
    game_id int AUTO_INCREMENT NOT NULL,
    field_num int,
    start_time time,
    game_level int,
    num_of_refs int,
    PRIMARY KEY (game_id)
);

CREATE TABLE assignment(
    assignment_id int AUTO_INCREMENT NOT NULL,
    game_id int NOT NULL,
    id int,
    position varchar(9) NOT NULL,
    current_status enum('unassigned','assigned','tentative','accepted'),
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (id) REFERENCES referee(id)
);