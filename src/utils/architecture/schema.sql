DROP SCHEMA IF EXISTS TaskList;
CREATE SCHEMA TaskList;
USE TaskList;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id CHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(40) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed VARCHAR(60) NOT NULL,
    is_visible TINYINT(1) DEFAULT 1,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Users SET `id` = 'd981e01e-8b68-4f6a-9166-4e7fc479879e', `username` = 'atlc6', `email` = 'test6@test.com', `hashed` = '$argon2id$v=19$m=16384,t=3,p=1$SmdX3GsXbW1H+Zn60PI6TA$UmV+BNHvehoHz6+Uz0urdsW048RyG6rdrzAJ2WI3w3c';


DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (
	id CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(40) NOT NULL UNIQUE
);
INSERT INTO Categories SET `id` = '6637d3e4-852b-40b3-bb33-bb2da8da733f', `name` = 'home improvement';
INSERT INTO Categories SET `id` = '11e38d7e-6e96-4e6e-a4dc-3001e811f070', `name` = 'homework';
INSERT INTO Categories SET `id` = 'afaed730-0091-4543-843e-743ed0f60b2b', `name` = 'work';
INSERT INTO Categories SET `id` = '59681f41-0933-47cb-96d1-ccdeeb84cc8f', `name` = 'code projects';
INSERT INTO Categories SET `id` = '8c430aa9-11c8-4880-be2e-f9ff1c9f1fdc', `name` = 'electronics projects';
INSERT INTO Categories SET `id` = '66da6431-6bd5-497d-8f60-e1efd7069d07', `name` = 'misc projects';


DROP TABLE IF EXISTS Statuses;
CREATE TABLE Statuses (
	id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL UNIQUE
);
INSERT INTO Statuses SET `id` = '92cbb230-c95d-4763-a9ed-05c8b9f1fdbb', `name` = 'enqueued';
INSERT INTO Statuses SET `id` = 'e134de18-6057-4bc1-8b8d-9fde76d1fb7e', `name` = 'active';
INSERT INTO Statuses SET `id` = 'dec3038d-e18e-4e69-be75-9f3835ca85c7', `name` = 'inactive';
INSERT INTO Statuses SET `id` = '1b806945-901e-4929-864d-fd9e6e2d23a1', `name` = 'completed';

SELECT * FROM Statuses;

DROP TABLE IF EXISTS Tasks;
CREATE TABLE Tasks (
	id CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(512),
    user_id CHAR(36) NOT NULL,
    status_id VARCHAR(36) NOT NULL,
    complete_by VARCHAR(20) NOT NULL,
    is_late TINYINT(1) DEFAULT 0,
    is_completed TINYINT(1) DEFAULT 0,
    completed_at VARCHAR(20),
    is_visible TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (status_id) REFERENCES Statuses(id)
);


DROP TABLE IF EXISTS TaskCategories;
CREATE TABLE TaskCategories (
	task_id CHAR(36) NOT NULL,
    category_id CHAR(36) NOT NULL,
    FOREIGN KEY (task_id) REFERENCES Tasks(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- DROP TABLE IF EXISTS Lists;
-- CREATE TABLE Lists (
-- 	id CHAR(36) PRIMARY KEY NOT NULL,
--     name VARCHAR(40) NOT NULL,
--     description VARCHAR(512),
--     user_id CHAR(36) NOT NULL,
--     complete_by VARCHAR(20),
--     is_completed TINYINT(1) DEFAULT 0,
--     completed_at VARCHAR(20),
--     is_visible TINYINT(1) DEFAULT 1,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(id)
-- );

-- DROP TABLE IF EXISTS ListTasks;
-- CREATE TABLE ListsTasks (
-- 	task_id CHAR(36) NOT NULL,
--     list_id CHAR(36) NOT NULL,
--     FOREIGN KEY (task_id) REFERENCES Tasks(id),
--     FOREIGN KEY (list_id) REFERENCES Lists(id)
-- );