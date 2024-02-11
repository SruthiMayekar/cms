const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_database'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Create express app
const app = express();
app.use(bodyParser.json());

// Add route to handle add to cart request
app.post('/cart', (req, res) => {
  const { title, price } = req.body;

  // Check if item is already in the cart and increase the quantity
  db.query('SELECT * FROM cart_items WHERE product_title = ?', [title], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const item = results[0];
      db.query('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?', [item.id], (err, results) => {
        if (err) throw err;

        res.status(200).json({ message: 'Item added to cart', item });
      });
    } else {
      // If not, add a new item with quantity 1
      db.query('INSERT INTO cart_items (product_title, price, quantity) VALUES (?, ?, ?)', [title, price, 1], (err, results) => {
        if (err) throw err;

        res.status(201).json({ message: 'Item added to cart', item: { id: results.insertId, title, price, quantity: 1 } });
      });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});