const connection = require('./connection');


class database {
    constructor(connection) {
        this.connection = connection;
    }

searchEmployees() {
    return this.connection
    .promise()
    .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
         );
    } 
searchDepartment(){
    return this.connection
    .promise()
    .query(
        "SELECT department.id, department.name FROM department;"
    );

}
searchRoles(){
    return this.connection
    .promise()
    .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
}

createEmployee(employee){
    return this.connection
    .promise() 
    .query(
        "INSERT INTO employee SET ?", employee);
}
createDepartment(department){
    return this.connection
    .promise()
    .query(
        "INSERT INTO department SET ?", department);
}
createRole(role){
    return this.connection
    .promise()
    .query(
        "INSERT INTO role SET ?", role);
}
updateEmployeeRole(employeeId, roleId){
    return this.connection
    .promise()
    .query(
        "UPDATE employee SET role_id = ? WHERE id =?", [roleId, employeeId]);
}
}



module. exports = new database(connection);