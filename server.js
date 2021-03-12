// const mysql = require('mysql');
const inquirer = require("inquirer");
const mysql = require("mysql2");

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
        "View All Employees",
        "View All Employee's By Roles",
        "View all Emplyees By Deparments",
        "Update Employee",
        "Add Employee",
        "Add Role",
        "Add Department",
      ],
    },
  ]);
}
