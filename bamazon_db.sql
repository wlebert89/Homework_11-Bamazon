DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ring of Protection", "Magic Items", 2000, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rapier", "Weapon", 20, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Potion of Invisibility", "Magic Items", 300, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mithral Chain Shirt", "Armor", 1100, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scroll of Cat's Grace", "Magic Items", 150, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crossbow, heavy", "Weapons", 50, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rhino Hide", "Armor", 5165, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bag of Holding, Type II", "Magic Items", 5000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scale Mail", "Armor", 50, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broom of Flying", "Magic Items", 17000, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Waraxe, Dwarven", "Weapon", 30, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Potion of Barkskin", "Magic Items", 900, 15);

SELECT * FROM products;