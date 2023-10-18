const express = require('express');
const inquirer = require('inquirer');
const db = require('./connection/connection');

const PORT = process.envPORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This function allows a user to see all of the departments.
const departmentAll = () => {
    db.query(`SELECT name as Name FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Seeing all of the departments.');
        console.table(res);
        startingQuestion();
    });
};

// This function allows a user to add a department.
const departmentAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which department would you like to update?',
            name: 'dept'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO department(name) VALUES (?);`,
            [answers.dept],
            (err) => {
                if (err) throw err;
                console.log('Updated with new department in database.');
                console.table(answers);
                startingQuestion();
            });
    });
};

// This function allows a user to see all of the employees.
const employeeAll = () => {
    db.query(`SELECT first_name as "First Name", last_name as "Last Name", role_id as Role, manager_id as Manager FROM employees;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Seeing all of the employees.');
        console.table(res);
        startingQuestion();
    });
};

// This function allows a user to add an employee.
const employeeAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s role ID?',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'What is the employee\'s manager ID?',
            name: 'managerId'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
            [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
            (err) => {
                if (err) throw err;
                console.log('Added new employee');
                startingQuestion();
            });
    });
};

// This function allows a user to see all of the roles.
const roleAll = () => {
    db.query(`SELECT title as Title, salary as Salary, department_id as "Department ID" FROM role;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Seeing all of the roles.');
        console.table(res);
        startingQuestion();
    });
};

// This function allows a user to add a role.
const roleAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which role would you like to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department`s id number?',
            name: 'deptRole'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`,
            [answers.role, answers.salary, answers.deptRole],
            (err) => {
                if (err) throw err;
                console.log('Added the new role to the database.');
                console.table(answers);
                startingQuestion();
            });
    });
};

// This function allows a user to update an employee's role.
const employeeRoleUpdate = () => {
    db.query(`SELECT * FROM employees;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee ID of the employee you want to update?',
            name: 'updateEmployee',
        },
        {
            type: 'input',
            message: 'To what role will the employee be updated?',
            name: 'updatedEmployeeRole'
        }
    ]).then((answers) => {
        db.query(`UPDATE employees SET role_id = (?) WHERE id = (?);`,
            [answers.updatedEmployeeRole, answers.updateEmployee],
            (err) => {
                if (err) throw err;
                console.log('Updated the employee information.');
                startingQuestion();
            });
    });

};

// This is the initial list of questions to prompt a user.
const startingQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startingQuestion',
            message: 'Please select an option.',
            choices: [
                'List Departments',
                'List Roles',
                'List Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Quit'
            ]
        }
    ]).then((answer) => {
        if (answer.startingQuestion === 'List Departments') {
            departmentAll();
        };
        if (answer.startingQuestion === 'List Roles') {
            roleAll();
        };
        if (answer.startingQuestion === 'List Employees') {
            employeeAll();
        };
        if (answer.startingQuestion === 'Add A Department') {
            departmentAdd();
        };
        if (answer.startingQuestion === 'Add A Role') {
            roleAdd();
        };
        if (answer.startingQuestion === 'Add An Employee') {
            employeeAdd();
        };
        if (answer.startingQuestion === 'Update An Employee Role') {
            employeeRoleUpdate();
        };
        if (answer.startingQuestion === 'Quit') {
            quit();
        };
    });
};

db.connect((err) => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`You are now on port ${PORT}`);
    });
    startingQuestion();
});

const quit = () => {
    console.log('Quiting The Employee Tracker!');
    db.end();
    process.exit();
};