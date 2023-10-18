const inquirer = require('inquirer');
const mysql = require('mysql2');

const cfonts = require('cfonts');

// Function to start the application of CFONT
cfonts.say('Martin Estradas \nSQL Employee Tracker', {
  font: 'block',
  align: 'left',
  colors: ['greenBright'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: 0,
  gradient: false,
  independentGradient: false,
  transitionGradient: false,
  env: 'node',
});

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root123@',
  database: 'employeetracker_db',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
  startApp();
});

// Function to display the main menu
function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const query = 'SELECT id, department_name AS name FROM departments';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to view all roles
function viewAllRoles() {
  const query = `
    SELECT roles.id, roles.title, roles.salary, departments.department_name AS department
    FROM roles
    INNER JOIN departments ON roles.department_id = departments.id
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const query = `
  SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, departments.department_name AS department, employee.manager_id
  FROM employee
  INNER JOIN roles ON employee.role_id = roles.id
  INNER JOIN departments ON roles.department_id = departments.id;  
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the department name:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO departments (department_name) VALUES (?)';
      db.query(query, [answers.department_name], (err, results) => {
        if (err) throw err;
        console.log('Department added successfully.');
        startApp();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for this role:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(query, [answers.title, answers.salary, answers.department_id], (err, results) => {
        if (err) throw err;
        console.log('Role added successfully.');
        startApp();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'number',
        name: 'role_id',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'number',
        name: 'manager_id',
        message: "Enter the employee's manager ID (if applicable):",
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      db.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, results) => {
        if (err) throw err;
        console.log('Employee added successfully.');
        startApp();
      });
    });
}

// Function to update an employee's role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'employee_id',
        message: 'Enter the ID of the employee whose role you want to update:',
      },
      {
        type: 'number',
        name: 'new_role_id',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      db.query(query, [answers.new_role_id, answers.employee_id], (err, results) => {
        if (err) throw err;
        console.log('Employee role updated successfully.');
        startApp();
      });
    });
}