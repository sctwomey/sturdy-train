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
        console.log('All of the departments are now listed.');
        console.table(res);
        beginPrompting();
    });
};

// This function allows a user to add a department.
const departmentAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What deparment would you like to add?',
            name: 'dept'
        }
    ]).then((data) => {
        db.query(`INSERT INTO department(name) VALUES (?);`,
            [data.dept],
            (err) => {
                if (err) throw err;
                console.log('The new department has been added to the database.');
                console.table(data);
                beginPrompting();
            });
    });
};

// This function allows a user to see all of the employees.
const employeeAll = () => {
    db.query(`SELECT first_name as "First Name", last_name as "Last Name", role_id as Role, manager_id as Manager FROM employees;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('All of the employees are now listed.');
        console.table(res);
        beginPrompting();
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
    ]).then((data) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
            [data.firstName, data.lastName, data.roleId, data.managerId],
            (err) => {
                if (err) throw err;
                console.log('The new employee has been added to the database.');
                beginPrompting();
            });
    });
};

// This function allows a user to see all of the roles.
const roleAll = () => {
    db.query(`SELECT title as Title, salary as Salary, department_id as "Department ID" FROM role;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('All of the roles are now listed.');
        console.table(res);
        beginPrompting();
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
    ]).then((data) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`,
            [data.role, data.salary, data.deptRole],
            (err) => {
                if (err) throw err;
                console.log('The new role has been added to the database.');
                console.table(data);
                beginPrompting();
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
    ]).then((data) => {
        db.query(`UPDATE employees SET role_id = (?) WHERE id = (?);`,
            [data.updatedEmployeeRole, data.updateEmployee],
            (err) => {
                if (err) throw err;
                console.log('Updated the employee information.');
                beginPrompting();
            });
    });
};

// This is the initial list of questions to prompt a user.
const beginPrompting = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'beginPrompting',
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
    ]).then((data) => {
        if (data.beginPrompting === 'List Departments') {
            departmentAll();
        };
        if (data.beginPrompting === 'List Roles') {
            roleAll();
        };
        if (data.beginPrompting === 'List Employees') {
            employeeAll();
        };
        if (data.beginPrompting === 'Add A Department') {
            departmentAdd();
        };
        if (data.beginPrompting === 'Add A Role') {
            roleAdd();
        };
        if (data.beginPrompting === 'Add An Employee') {
            employeeAdd();
        };
        if (data.beginPrompting === 'Update An Employee Role') {
            employeeRoleUpdate();
        };
        if (data.beginPrompting === 'Quit') {
            quit();
        };
    });
};

db.connect((err) => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`You are now on port ${PORT}`);
    });
    beginPrompting();
});

const quit = () => {
    console.log('Quiting The Employee Tracker!');
    db.end();
    process.exit();
};