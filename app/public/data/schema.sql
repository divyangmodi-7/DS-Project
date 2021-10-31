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