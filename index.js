const { prompt } = require('inquirer');
const dataBase = require('./db');
require('console.table');

function appStart() {
    askPrompt();
}
appStart();
function askPrompt() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: "Hello! What would you like to do today?",
            choices: [
                {
                    name: "Add a new employee",
                    value: "ADD_EMPLOYEES",
                },
                {
                    name: "View all current employees",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "Add a new role",
                    value: "ADD_ROLE",
                },
                {
                    name: "View all current roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "Add a new department",
                    value: "ADD_DEPARTMENT",
                },
                {
                    name: "View all current departments",
                    value: "VIEW_DEPARTMENT",
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE_ROLE",
                },
                {
                    name: "Quit",
                    value:"QUIT",
                },
            ],
        },
    ]).then((answer) => {
        let choice = answer.choice;
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_EMPLOYEES":
                addEmployee();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "VIEW_DEPARTMENT":
                viewDepartment();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quitApp();
        }
    })
}

function viewEmployees() {
    dataBase.searchEmployees()
    .then(([rows]) => {
    let employees = rows;
    console.log('\n');
    console.table(employees);
    }).then (() => askPrompt());
}

function viewDepartment() {
    dataBase.searchDepartment()
    .then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    }).then (() => askPrompt());
}

function viewRoles() {
    dataBase.searchRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log('\n');
        console.table(roles);
    }).then (() => askPrompt());
}

function addEmployee() {
    prompt([ 
        {
        name: "first_name",
        message: "Enter new employee's first name"
        },
        {
        name: "last_name",
        message: "Enter new employee's last name"
        }
    ]).then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        dataBase.searchRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleSelect = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            prompt({
                type: "list",
                name: "roleId",
                message: "What role will this employee have?",
                choices: roleSelect
            }).then(res => {
                let roleId = res.roleId;
                dataBase.searchEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const managerChoice = employees.map(({ id, firstName, lastName}) =>
                    ({name: `${firstName} ${lastName}`, value: id}));
                    managerChoice.unshift({ name: "None", value: null});

    prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoice
        }).then(res => {
            let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
            }
                dataBase.createEmployee(employee);}).then(() => console.log(`New employee profile for, ${firstName} ${lastName} has been created`)).then(() => askPrompt())
                })
            })
        })
    })
}


function addDepartment(){
    prompt([
        {
            name: "name",
            message: "What department is beign added?"
        }
    ]).then(res => {
        let name = res;
        dataBase.createDepartment(name).then(() => console.log(`New department, ${name.name} has been created`))
        .then(() => askPrompt())
    })
}

function addRole(){
    dataBase.searchDepartment().then(([rows]) => {
        let departments = rows;
        const departmentSelect = departments.map(({ id, name}) => ({
            name: name,
            value: id
        }));
        prompt([
            {
                name: "title",
                message: "What new role is being added?"
            },
            {
                name: "salary",
                message: "What is the salary of this position?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does this role belong to",
                choices: departmentSelect
            }
        ]).then(role => {
            dataBase.createRole(role).then(() => console.log(`New role, ${role.title} has been created`))
            .then(() => askPrompt())
        })
    })
}
function updateEmployeeRole(){
    dataBase.searchEmployees().then(([rows]) => {
      let employees = rows;
      const employeeSelect = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeSelect
        }
      ]).then(res => {
        let employeeId = res.employeeId;
        dataBase.searchRoles().then(([rows]) => {
          let roles = rows;
          const roleSelect = roles.map(({ id, title }) => ({
            name: `${title}`,
            value: id
          }));
          prompt([
            {
              type: "list",
              name: "roleId",
              message: "Select a new role",
              choices: roleSelect
            }
          ]).then(res => dataBase.updateEmployeeRole(employeeId, res.roleId)).then(() => console.log("Employee role has been updated successfully")).then(() => askPrompt())
        });
      });
    })
  }

  function quitApp(){
    console.log('Goodbye');
    process.exit();
  }