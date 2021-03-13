// const mysql = require('mysql');
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pioneer44",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
  promptUser();
});

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees",
          "View All Employees By Roles",
          "View All Employees By Department",
          "Update Employee",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Employees By Roles":
          viewAllRoles();
          break;
        case "View All Employees By Department":
          viewAllDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRolePrompt();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

const managerArray = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", 
  function(err, res) {
  if (err) throw err
    for (var i = 0; i < res.length; i++) {
    managerArray.push(res[i].first_name);
    }

  })
  return managerArray;
}

const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", 
  function(err, res) {
  if (err) throw err
    for (var i = 0; i < res.length; i++) {
    roleArray.push(res[i].title);
    }

  })
  return roleArray;
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

function viewAllRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the Employee's first name?",
      name: "first",
    },
    {
      type: "input",
      message: "What is the Employee's last name?",
      name: "last",
    },
    {
      type: "list",
      message: "What is the Employee's role?",
      name: "role",
      choices: selectRole()
    },
    {
      type: "list",
      message: "Who is the Employee's manager?",
      name: "manager",
      choices: selectManager()
      
    },
  ])};


function addRolePrompt() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the new role?",
      name: "name",
    },
    viewAllRoles()
  ]);
}
