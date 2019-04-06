# Bamazon MySQL Project

### Overview

Bamazon is a node application that utilizes a MySQL database to keep track of product inventory and transactions.

Users are able to interact with the market on different levels based on which Javascript file they run.
    * bamazonCustomer.js allows user the buy items that are listed in the market.
    * bamazonManager.js allows the user to view low inventory, restock items, and add an entirely new product to the inventory.

### Customer View

When a user runs bamazonCustomer.js in node, they are first shown a list of all available items in the Bamazon market. They are then prompted with Inquirer NPM to enter the product ID of the item that they wish to purchase into the command line. There is validation to ensure that the user enters an actual number, and that the number they enter actually corresponds to an item in the inventory. If the user submits an invalid entry, they are told to "Please choose a valid ID." Once a valid entry is provided, the user is aksed how many of this particular item they would like to purhase. If the user submits a number that is higher than the item's current stock quantity, they are told that there is insufficient quanitity, and are returned to the main menu. If the user submits a valid number, the transaction is complete, and the item's stock quantity is adjusted in the MySQL database and is subsequently reflected in the inventory display in node.

### Manager View

When a user runs bamazonManager.js in node, they are given a list of options:
    * View Products for sale - allows the user to see the entire Bamazon inventory.
    * View Low Inventory - allows the user to view items with a stock quantity value less than 5.
    * Add to Inventory - allows the user to select any item in the Bamazon market (this time using a list rather than having to enter the item's ID number) and increase it's stock quantity.
    * Add New Product - allows the user to add an entirely new product to the market by entering all of the product's relevant information into the command line with a series of prompts.