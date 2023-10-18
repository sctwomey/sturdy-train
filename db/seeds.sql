INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Human Resources"),
        ("Sales"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineering Manager", 120000, 1),
        ("Engineering Lead", 100000, 1),
        ("Staff Engineer", 80000, 1),
        ("Finance Manager", 85000, 2),
        ("HR Manager", 95000, 3),
        ("Accountant", 70000, 2),
        ("Sales Manager", 75000, 4),
        ("Salesman", 65000, 4),
        ("Legal Manager", 110000, 5),
        ("Lawyer", 95000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Jimmy", "Dore", 1, NULL), 
        ("Tom", "Sayer", 2, 1),
        ("Scott", "Daye", 1, NULL), 
        ("Jan", "Johnson", 3, 37),
        ("Sam", "Swanson", 4, 43),
        ("John", "Smith", 5, 14), 
        ("Mike", "Seevers", 1, NULL), 
        ("Nate", "Conrad", 6, 17), 
        ("Matt", "Lancen", 1, NULL), 
        ("Alex", "Vance", 1, NULL);