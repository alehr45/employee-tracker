// const mysql = require('mysql');
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require('console.table');

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
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
                  "View All Employees?", 
                  "View All Employees By Roles?",
                  "View all Employees By Departments", 
                  "Update Employee",
                  "Add Employee",
                  "Add Role",
                  "Add Department"
                ]
        }
    ]).then(function(val) {
            switch (val.choice) {
                case "View All Employees?":
                  viewAllEmployees();
                break;
        
        
                }
        })
    }

function viewAllEmployees() {
    connection.query("SELECT first_name, last_name, FROM employee;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      promptUser()
  })};