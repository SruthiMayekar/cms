from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name' # Replace with your MySQL connection URL
db = SQLAlchemy(app)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_title = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float)

# Route to receive cart items from the frontend and store them in the database
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.json
    for item in data['items']:
        order = Order(item_title=item['title'], quantity=item['quantity'], price=item['price'])
        db.session.add(order)
    db.session.commit()
    return jsonify({'message': 'Cart items added successfully'})
