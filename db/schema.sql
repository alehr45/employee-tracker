DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary INT,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

INSERT INTO department (name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", "100000", 1),
("Salesperson", "65000", 1),
("Lead Engineer", "95000", 2),
("Software Engineer", "75000", 2),
("Account Manager", "85000", 3),
("Accountant", "75000", 3),
("Legal Team Lead", "115000", 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
("Amanda", "Fulton", null, 1),
("Stephanie", "Dickerson", null, 2),
("Derrick", "Smith", null, 3),
("Bently", "Callahan", 1, 4),
("Chris", "Jackson", 4, 5),
("Lindsay", "Holt", 1, 6),
("Jim", "Fairfield", 2, 7);