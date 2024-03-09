# Question 1

The relationship between the "product" and "product_category" entities is established through a foreign key.

in a relational database, "Product" table have a foreign key column(category_id) that reference the primery key(id) of "Product_Category" table. this foreign key create a link between the two table, allow each product to be associated with specific category from the "Product_Category" table.

# Question 2

To ensure each product in the "Product" table has valid category, i implemented a foreign key constraint between the "Product" table's category_id column and the primery id of "Product_Category" table