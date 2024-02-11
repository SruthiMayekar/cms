from flask import Flask, request, render_template,redirect,session,flash
import mysql.connector

# Establish database connection
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Sruthi@123#',
    database='sruthi'
)

# Create Flask application
app = Flask(__name__, template_folder='template')
app.secret_key = '1254#$^&@'

# Route for the landing page
@app.route('/')
def home():
    return render_template('home.html')

# Route for the signup page
# @app.route('/s')
# def signup():
#     return render_template('signup.html')

# Route for the login page

# @app.route('/l')
# def login():
#     return render_template('login.html')
# Route for the login page
@app.route('/s', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        email = request.form['email']
        password = request.form['password']

        # Check if the email already exists
        cursor = conn.cursor()
        query = "SELECT * FROM customer WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        if user:
            flash('User already exists. Please log in.', 'warning')
            return redirect('/login')
        else:
            # Store new user data in the database
            sql = "INSERT INTO customer (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)"
            val = (firstname, lastname, email, password)
            cursor.execute(sql, val)
            conn.commit()
            flash('Account created successfully. Please log in.', 'success')
            return redirect('/login')

    return render_template('signup.html')

# Route for the login page
@app.route('/l', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Authenticate the user
        cursor = conn.cursor()
        query = "SELECT * FROM customer WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()
        cursor.close()

        if user:
            session['email'] = email
            flash('Login successful', 'success')
            return redirect('/')
        else:
            flash('Invalid email or password. Please try again.', 'danger')

    return render_template('login.html')



# Route for the menu page
@app.route('/menu')
def menu():
    return render_template('menu.html')

# Route for the payment page
@app.route('/payment')
def payment():
    return render_template('payment.html')

@app.route('/a')
def animation():
    return render_template('animation.html')


# Route to handle form submission
# @app.route('/submit', methods=["POST"])
# def submit():
#     # Get form data
#     firstname = request.form['firstname']
#     lastname = request.form['lastname']
#     email = request.form['email']
#     password = request.form['password']

#     # Store data in the database
#     cursor = conn.cursor()
#     sql = "INSERT INTO customer (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)"
#     val = (firstname, lastname, email, password) 
#     cursor.execute(sql, val)
#     conn.commit()
#     cursor.close()

#     # Redirect to the landing page after submission
#     return render_template('home.html')

@app.route('/payment', methods=["POST"])
def process_payment():
    fullname = request.form['fullname']
    email = request.form['email']
    address = request.form['address']
    city = request.form['city']
    pincode = request.form['Pincode']
    phoneno = request.form['Phoneno']

    # Store data in the database
    cursor = conn.cursor()
    dal = "INSERT INTO payment (fullname, email, address, city, pincode, phoneno) VALUES (%s, %s, %s, %s, %s, %s)"
    vali = (fullname, email, address, city, pincode, phoneno)
    cursor.execute(dal, vali)
    conn.commit()
    cursor.close()

    # return "Recived email"
    return render_template('home.html')



if __name__ == '__main__':
    app.run(debug=True)


# from flask import Flask, flash, request, redirect, render_template, url_for, session
# import mysql.connector

# app = Flask(__name__, template_folder='template')
# app.secret_key = 'your_secret_key'  # Add a secret key for session management

# conn = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='Sruthi@123#',
#     database='sruthi'
# )

# @app.route('/')
# def signup():
#     return render_template('signup.html')

# @app.route('/submit', methods=["POST"])
# def submit():
#     firstname = request.form['firstname']
#     lastname = request.form['lastname']
#     email = request.form['email']
#     password = request.form['password']

#     # Store data in the database
#     cursor = conn.cursor()
#     sql = "INSERT INTO customer (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)"
#     val = (firstname, lastname, email, password) 
#     cursor.execute(sql, val)
#     conn.commit()
#     cursor.close()
#     return render_template('home.html')

# @app.route('/login', methods=["POST", "GET"])
# def login():
#     if request.method == "POST":
#         email = request.form['email']
#         password = request.form['password']

#         cursor = conn.cursor()
#         sql = "SELECT * FROM customer WHERE email = %s AND password = %s"
#         val = (email, password)
#         cursor.execute(sql, val)
#         user = cursor.fetchone()
#         cursor.close()

#         if user:
#             session['user_id'] = user[0]  # Store user_id in the session
#             flash('Login successful', 'success')
#             return render_template('home.html')
#         else:
#             flash('Login failed. Please check your email and password.', 'danger')

#     return render_template('login.html')

# def signup():
#     return render_template('home.html')

# if __name__ == '__main__':
#     app.run(debug=True)

    
# # Route for the login page
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         email = request.form['email']
#         password = request.form['password']

#         # Authenticate the user
#         if authenticate_user(email, password):
#             # Authentication successful
#             session['email'] = email
#             return redirect('/home.html')  # Redirect to the dashboard or any other page
#         else:
#             # Authentication failed
#             return render_template('login.html', message='Invalid username or password')

#     return render_template('login.html', message='')

# # cursor = conn.cursor()

# # Function to authenticate user
# def authenticate_user(email, password):

#     # Connect to the database
#     var = mysql.connector.connect(**conn)
#     cursor = var.cursor()

#     # Query the database
#     query = "SELECT * FROM signup WHERE email = %s AND password = %s"
#     cursor.execute(query, (email, password))

#     # Fetch the result
#     result = cursor.fetchone()

#     # Close the database connection
#     cursor.close()
#     conn.close()

#     return result is not None

# @app.route('/home')
# def home():
#     # Your home page logic here
#     return render_template(url_for('home.html'))






