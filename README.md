# Employee-Tracker

## Description
The Employee Tracker Database is a relational database designed for managing employee information, departments, roles, and their relationships within an organization. It serves as the foundation for the Employee Tracker, a command-line application that allows users to interact with and manage employee data efficiently.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Link to Google Drive

  The following video shows an example of the application being used from the command line:

  [![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./assets/images/Homework-Video-Thumbnail.png)](https://drive.google.com/file/d/1lXWr1i_axXx6W2LYcffmgi2ia8GTC3bM/view?usp=sharing)

  ## Screenshot

  The following image shows the README application's appearance and functionality:

  ![Employee Tracker](./assets/images/Employee-Tracker.png "Screenshot")
  
  ## Table of Contents
  - [Description](#description)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Link to Google Drive](#link-to-google-drive)
  - [Screenshot](#screenshot)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation
To install and use the Employee Tracker application and database, follow these steps:

Clone the Repository:
git clone https://github.com/your-username/employee-tracker.git

Navigate to the Project Directory:
cd employee-tracker

Install Dependencies:
npm install

Database Setup:
Make sure you have MySQL installed on your machine.

Create a new database and run the schema.sql script to set up the database schema:
mysql -u your-username -p < db/schema.sql
Replace your-username with your MySQL username.

If you'd like to populate sample data, you can run the seeds.sql script as well:
mysql -u your-username -p < db/seeds.sql

Connection Configuration:
Open the server.js file in your text editor.

Locate the following lines and adjust them with your database connection details:
host: 'localhost',
user: 'your-username',
password: 'your-password',
database: 'employeetracker_db',

Start the Application:
npm start

Now, the Employee Tracker application is installed and ready to use.

## Usage
To use the Employee Tracker application, follow these steps:

Run the application:
npm start

Once the application starts, you will be presented with several options for managing employees within your company including viewing departments, roles, employees, adding departments, adding roles, adding employees, and updating an employee's role.

Use the arrow keys to select an option and follow the prompts to interact with the database. For example, you can view all employees, add new employees, update roles, and more.

Follow the on-screen instructions to navigate the application.

To exit the application, simply select the "Exit" option from the menu.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses) This project is licensed under the MIT License.

 ## Questions
If you have any questions or encounter any issues, please feel free to [open an issue](https://github.com/mxrtinee/Employee-Tracker/issues) or contact me directly:<br>
GitHub: [Mxrtinee](https://github.com/Mxrtinee)<br>
Email: [hello@martinestrada.dev](mailto:hello@martinestrada.dev)