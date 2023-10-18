INSERT INTO departments (department_name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Research and Development'),
('Legal'),
('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer', 555000.00, 1),
('Marketing Manager', 125000.00, 2),
('HR Director', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Senior Engineer', 185000.00, 5),
('IT Manager', 125000.00, 6),
('Customer Relations Manager', 75000.00, 7),
('Research and Development Manager ', 185000.00, 8),
('Legal Manager', 95000.00, 9),
('Maintenance Manager', 135000.00, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Smith', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Robert', 'Johnson', 3, 1),
  ('Sarah', 'Williams', 4, NULL),
  ('Michael', 'Brown', 5, 2),
  ('Emily', 'Davis', 6, 1),
  ('Daniel', 'Martinez', 7, 3),
  ('Maria', 'Garcia', 8, 3),
  ('James', 'Jones', 9, 1),
  ('Susan', 'Anderson', 10, 2);