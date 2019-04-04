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
    displayProducts();
});

function selectItem(res) {
    inquirer.prompt([{
        type: "input",
        name: "productId",
        message: "What is the ID of the item you would like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (response) {
        if (response.productId <= res.length) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].id === parseInt(response.productId)) {
                    console.log("Selected item: \n");
                    console.log("Item ID: " + res[i].id);
                    console.log("Product: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Stock Quantity: " + res[i].stock_quantity);
                    console.log("");
                    
                    buy(res[i]);
                }
            }
        } else {
            console.log("\nPlease choose a valid ID.\n")
            selectItem(res);
        }
    });
}

function buy(product) {
    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (response) {
        if (response.quantity <= product.stock_quantity) {
            var quantity = product.stock_quantity - parseInt(response.quantity);
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{
                    stock_quantity: quantity
                },
                {
                    id: product.id
                }
            ], function (err, res) {
                console.log("Transaction successful!")
                connection.end();
            });
        } else {
            console.log("Insufficient quantity.")
            displayProducts();
        }
    });

}

function displayProducts() {
    console.log("\nDisplaying all products:\n");
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        selectItem(res);
    });
}