var inquirer = require("inquirer");

var mysql = require("mysql");

var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?\n",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    }]).then(function (response) {
        switch (response.menu) {
            case "View Products for Sale":
                displayProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct()
                break;
            case "Quit":
                quit();
        }
    });
}

function displayProducts() {
    console.log("\nDisplaying all products:\n");
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

function viewLowInventory() {
    console.log("\nDisplaying low inventory:\n");
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

function addInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var choices = [];
        for (var i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);
        }
        inquirer.prompt([{
            name: "products",
            type: "list",
            message: "Which item would you like to restock?\n",
            choices: choices
        }]).then(function (response) {
            var product = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === response.products) {
                    product = res[i]
                    console.log("Selected item: \n");
                    console.log("Item ID: " + product.id);
                    console.log("Product: " + product.product_name);
                    console.log("Department: " + product.department_name);
                    console.log("Price: " + product.price);
                    console.log("Stock Quantity: " + product.stock_quantity);
                    console.log("");
                }
            }
            inquirer.prompt([{
                name: "quantity",
                type: "input",
                message: "How many of these would you like to add?\n",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }]).then(function (response) {
                var quantity = product.stock_quantity + parseInt(response.quantity);
                var query = "UPDATE products SET ? WHERE ?";
                connection.query(query, [{
                        stock_quantity: quantity
                    },
                    {
                        product_name: product.product_name
                    }
                ], function (err, res) {
                    console.log("\nInventory successfully updated!\n")
                    menu();
                });
            })
        });
    });
}

function addProduct() {
    inquirer.prompt([{
            type: "input",
            name: "product_name",
            message: "Enter the PRODUCT NAME:"
        },
        {
            type: "input",
            name: "department_name",
            message: "Enter the DEPARTMENT NAME:"
        },
        {
            type: "input",
            name: "price",
            message: "Enter the PRICE:"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Enter the QUANTITY:"
        },
    ]).then(function (response) {
        var query = "INSERT INTO products SET ?";
        connection.query(query, {
                product_name: response.product_name,
                department_name: response.department_name,
                price: response.price,
                stock_quantity: response.stock_quantity,
            },
            function (err) {
                if (err) throw err;
                console.log("\nNew item has been added to the inventory!\n")
                menu();
            });
    });
}

function quit() {
    console.log("\nSession Ended.\n");
    connection.end();
}