DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT PRIMARY KEY UNSIGNED AUTO_INCREMENT,
   dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT PRIMARY KEY UNSIGNED AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
     manager_id INT UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    INDEX man_ind (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);