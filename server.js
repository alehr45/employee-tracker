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
          "View Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
const managerArray = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArray.push(res[i].first_name);
      }
    }
  );
  return managerArray;
}

const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
  return roleArray;
}

function addRole() {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the new role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for the new role?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              promptUser();
            }
          );
        });
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "department", 
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.department,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          promptUser();
        }
      );
    });
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

function viewRoles() {
  connection.query(
    "SELECT role.title, role.id, role.salary FROM role ",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

function viewDepartments() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
}

function addEmployee() {
  inquirer
    .prompt([
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
        choices: selectRole(),
      },
      {
        type: "list",
        message: "Who is the Employee's manager?",
        name: "manager",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role);
      var managerId = selectManager().indexOf(val.choice);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          promptUser();
        }
      );
    });
}

function selectRole() {
  var roleArray = [];
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
  return roleArray;
}
