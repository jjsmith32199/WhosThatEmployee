USE employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
('Tim', 'Allen', 1, NULL),
('Jon', 'Bob', 2, 1),
('Bob', 'Ross', 3, NULL),
('John', 'Jones', 4, 3),
('Steve', 'Jobs', 5, NULL),
('Jane', 'Doe', 6, 5),
('Soap', 'McTavish', 7, NULL),
('Ethan', 'Klein', 8, 7);

