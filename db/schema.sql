DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);
-- DEPARTMENT TABLE ----
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary INT,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- EMPLOYEE ROLE TABLE ----
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

USE employees;

INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");
INSERT INTO department (name)
VALUE ("Sales");


INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", "100000", 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", "65000", 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", "95000", 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", "75000", 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Account Manager", "85000", 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", "75000", 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", "115000", 4);