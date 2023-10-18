// Import required libraries
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');

// Function to start the application with a title
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
        'Update employee managers',
        'View employees by manager',
        'View employees by department',
        'Delete departments, roles, or employees',
        'View budget by department',
        'Exit',
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
        case 'Update employee managers':
          updateEmployeeManager();
          break;
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by department':
          viewEmployeesByDepartment();
          break;
        case 'Delete departments, roles, or employees':
          deleteDepartmentsRolesEmployees();
          break;
        case 'View budget by department':
          viewBudgetByDepartment();
          break;
        case 'Exit':
          exitApp();
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

// Function to update an employee's manager
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'employee_id',
        message: 'Enter the ID of the employee whose manager you want to update:',
      },
      {
        type: 'number',
        name: 'new_manager_id',
        message: 'Enter the new manager ID for the employee:',
      },
    ])
    .then((answers) => {
      const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
      db.query(query, [answers.new_manager_id, answers.employee_id], (err, results) => {
        if (err) throw err;
        console.log('Employee manager updated successfully.');
        startApp();
      });
    });
}

// Function to view employees by manager
function viewEmployeesByManager() {
  const query = `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      r.title, 
      d.department_name, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM 
      employee e
      INNER JOIN roles r ON e.role_id = r.id
      INNER JOIN departments d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY 
      manager_name, 
      e.last_name, 
      e.first_name
  `;

  db.query(query, (err, res) => {
    if (err) throw err;

    // Group employees by manager
    const employeesByManager = res.reduce((acc, cur) => {
      const managerName = cur.manager_name;
      if (acc[managerName]) {
        acc[managerName].push(cur);
      } else {
        acc[managerName] = [cur];
      }
      return acc;
    }, {});

    // Display employees by manager in a table
    for (const managerName in employeesByManager) {
      console.log(`\nManager: ${managerName}`);
      const employees = employeesByManager[managerName];
      console.table(employees, ['id', 'first_name', 'last_name', 'title', 'department_name']);
    }

    // Restart the application
    startApp();
  });
}

// Function to view employees by department
function viewEmployeesByDepartment() {
  // Prompt user to select a department
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the ID of the department to view employees:',
      },
    ])
    .then((answers) => {
      const departmentId = answers.department_id;

      // Query the database to retrieve employees in the selected department
      const query = `
        SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, departments.department_name AS department, employee.manager_id
        FROM employee
        INNER JOIN roles ON employee.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        WHERE departments.id = ?;
      `;

      db.query(query, [departmentId], (err, results) => {
        if (err) {
          console.error('Error retrieving employees by department: ' + err.stack);
        } else {
          console.table(results); // Display the list of employees
        }
        startApp(); // Back to the main menu
      });
    });
}

// Function to delete departments, roles, or employees
function deleteDepartmentsRolesEmployees() {
  inquirer
    .prompt({
      type: 'list',
      name: 'data',
      message: 'What would you like to delete?',
      choices: ['Employee', 'Role', 'Department'],
    })
    .then((answer) => {
      switch (answer.data) {
        case 'Employee':
          deleteEmployee();
          break;
        case 'Role':
          deleteRole();
          break;
        case 'Department':
          deleteDepartment();
          break;
        default:
          console.log(`Invalid data: ${answer.data}`);
          startApp();
          break;
      }
    });
}

// Function to delete an employee
function deleteEmployee() {
  const query = 'SELECT * FROM employee';
  db.query(query, (err, res) => {
    if (err) throw err;
    const employeeList = res.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    employeeList.push({ name: 'Go Back', value: 'back' }); // Add a "Go Back" option
    inquirer
      .prompt({
        type: 'list',
        name: 'id',
        message: 'Select the employee you want to delete:',
        choices: employeeList,
      })
      .then((answer) => {
        if (answer.id === 'back') {
          // Check if the user selected "Go Back"
          deleteDepartmentsRolesEmployees();
          return;
        }
        const query = 'DELETE FROM employee WHERE id = ?';
        db.query(query, [answer.id], (err, res) => {
          if (err) throw err;
          console.log(`Deleted employee with ID ${answer.id} from the database!`);
          // Restart the application
          startApp();
        });
      });
  });
}

// Function to delete a role
function deleteRole() {
  // Retrieve all available roles from the database
  const query = 'SELECT * FROM roles';
  db.query(query, (err, res) => {
    if (err) throw err;
    // Map through the retrieved roles to create an array of choices
    const choices = res.map((role) => ({
      name: `${role.title} (${role.id}) - ${role.salary}`,
      value: role.id,
    }));
    // Add a "Go Back" option to the list of choices
    choices.push({ name: 'Go Back', value: null });
    inquirer
      .prompt({
        type: 'list',
        name: 'roleId',
        message: 'Select the role you want to delete:',
        choices: choices,
      })
      .then((answer) => {
        // Check if the user chose the "Go Back" option
        if (answer.roleId === null) {
          // Go back to the deleteDepartmentsRolesEmployees function
          deleteDepartmentsRolesEmployees();
          return;
        }
        // Query to delete the role from the database
        const deleteQuery = 'DELETE FROM roles WHERE id = ?';
        db.query(deleteQuery, [answer.roleId], (err, res) => {
          if (err) throw err;
          console.log(`Deleted role with ID ${answer.roleId} from the database!`);
          // Restart the application
          startApp();
        });
      });
  });
}

// Function to delete a department
function deleteDepartment() {
  // Get the list of departments
  const query = 'SELECT * FROM departments';
  db.query(query, (err, res) => {
    if (err) throw err;
    const departmentChoices = res.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    // Prompt the user to select a department
    inquirer
      .prompt({
        type: 'list',
        name: 'departmentId',
        message: 'Which department do you want to delete?',
        choices: [
          ...departmentChoices,
          { name: 'Go Back', value: 'back' },
        ],
      })
      .then((answer) => {
        if (answer.departmentId === 'back') {
          // Go back to the previous menu
          deleteDepartmentsRolesEmployees();
        } else {
          const query = 'DELETE FROM departments WHERE id = ?';
          db.query(query, [answer.departmentId], (err, res) => {
            if (err) throw err;
            console.log(`Deleted department with ID ${answer.departmentId} from the database!`);
            // Restart the application
            startApp();
          });
        }
      });
  });
}

// Define an array to store department choices
const departmentChoices = [];

// Query the database to retrieve department names and IDs
db.query('SELECT id, department_name FROM departments', (err, results) => {
  if (err) {
    console.error('Error retrieving department choices: ' + err.stack);
    // Handle the error, possibly by providing a default array
  } else {
    // Populate the departmentChoices array with the retrieved data
    results.forEach((department) => {
      departmentChoices.push({
        name: department.department_name,
        value: department.id,
      });
    });
  }

  // Start the application once departmentChoices is populated
  startApp();
});

// Function to view total utilized budget of a department
function viewBudgetByDepartment() {
  // Prompt user to select a department
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department to view the total utilized budget:',
        choices: departmentChoices,
      },
    ])
    .then((answers) => {
      const departmentId = answers.departmentId;

      // Query the database to calculate the total salary budget for the selected department
      const query = 'SELECT SUM(roles.salary) AS total_budget FROM roles WHERE roles.department_id = ?';

      db.query(query, [departmentId], (err, results) => {
        if (err) {
          console.error('Error calculating budget: ' + err.stack);
        } else {
          // Check if the totalBudget is a valid number
          const totalBudget = parseFloat(results[0].total_budget);
          if (!isNaN(totalBudget)) {
            console.log(`Total budget for the selected department: $${totalBudget.toFixed(2)}`);
          } else {
            console.log('Budget information is not available.');
          }
        }
        startApp(); // Back to the main menu
      });
    });
}

// Function to exit the application
function exitApp() {
  console.log('Exiting the Employee Tracker application.');
  db.end();
}