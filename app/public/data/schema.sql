CREATE DATABASE IF NOT EXISTS msisdb;

USE msisdb;

DROP TABLE IF EXISTS referee;

CREATE TABLE referee (

    rname varchar(96) PRIMARY KEY UNIQUE NOT NULL,

    age int,

    referee_grade char(2),

    referee_skill int,

    relevant_position varchar(24),

    report varchar(24)

    

);

INSERT INTO referee (rname, age, referee_grade, referee_skill, relevant_position, report) VALUES 

('Dominic Toretto', 35, 'A', 8, 'Front', 'report1'),
('Steve Rogers', 71, 'B', 6, 'Back', 'report2'),
('James Buchannan Barnes', 30, 'C', 5, 'Left', 'report3'),
('Tony Stark', 42, 'A', 10, 'Front', 'report4')
;