// const mysql = require('mysql');
const inquirer = require('inquirer');

function promptUser() {
    inquirer.prompt({
            name: 'questions',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View All Employees",
                "View By Department",
                "View By Manager",
                "View All Roles",
                "Add Employee",
                "Remove Employee",
                "Update Role",
                "Exit"
            ]
        });
    };

    promptUser();