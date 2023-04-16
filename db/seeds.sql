use employees_db;

insert INTO department
    (dept_name)
VALUES
    ('Engineer'),
    ('Finance'),
    ('Legal'),
    ('Sales')

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Software Engineer', 120000, 2),
    ('Lead Engineer' 150000, 2),
    ('Accountant', 125000, 3),
    ('Account Manager', 160000, 3),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4)

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
('Tim', 'Allen', 1, 1),
('Jon', 'Bob', 2, NULL),
('Bob', 'Ross', 4, NULL),
('John', 'Jones', 3, NULL),
('Steve', 'Jobs', 2, 4),
('Jane', 'Doe', 1, 2),
('Selena', 'Gomez', 3, 8),
('Ethan', 'Klein', 1, NULL),
('Robert', 'Doggert', 6, 2),
