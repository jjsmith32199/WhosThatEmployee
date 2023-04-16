const connection = require('./connection');

class database {
    constructor(connection) {
        this.connection = connection;
    }


searchEmployees() {
    return this.connection
    .promise(
    .query(
        //Continue here//
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name"
    )
    )
}




}


