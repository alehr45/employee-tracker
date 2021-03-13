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
          addRole();
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
    managerArray.push(res[i].first_name, last_name);
    }

  })
  return managesArray;
}

function viewAllEmployees() {
  connection.query(
    "SELECT first_name, last_name FROM employee;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

function viewAllRoles() {
  connection.query(
    "SELECT role.title, role.salary FROM role;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

function viewAllDepartments() {
  connection.query("SELECT name FROM department;", 
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
      type: "input",
      message: "What is the Employee's role?",
      name: "role",
    },
  ]);
  connection.query("INSERT INTO employees first_name, last_name, role.id;", 
  function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
})};

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the new role?",
      name: "name",
    },
  ]);
}
