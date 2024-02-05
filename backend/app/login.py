from app import app
from .modols.Admin_db import Admin
from .modols.teachers_db import Teachers
from .users_db import Users
from .users_db import Database
from flask import Flask , json, jsonify,request,session
from app.My_configration import MyConfiguration
my_configuration = MyConfiguration()
def check_connection():
    try:
        mysql_connect = Database(
            host=my_configuration.DB_HOSTNAME,
            port=3306,
            user=my_configuration.DB_USERNAME,
            password=my_configuration.DB_PASSWORD,
            database=my_configuration.DB_NAME
        )
        # Create an instance of the Store class
        mysql_connect.make_connection()
        user_instance = Users(mysql_connect.connection)
        admin_instance = Admin(mysql_connect.connection)
        teacher_instance = Teachers(mysql_connect.connection)

        return True, user_instance, admin_instance, teacher_instance
    except Exception as e:
        print(f'')
        return False, f'Error: {e}.'


app.config["SECRET_KEY"] = "abdi@12"

@app.route("/login", methods=["POST"])

def login():
    connection_status, user, admin, teacher = check_connection()
    try:

        user_type = request.json.get('user_type')  
        email = request.json.get('email')
        password = request.json.get('password')

        if not user_type or not email or not password:

            return jsonify({"message": "buuxi meelaha banaan"}), 400

        if user_type == 'student':

            login_result = user.login_user(email, password)

        elif user_type == 'teacher':

            login_result = teacher.login_teacher(email, password)

        elif user_type == 'admin':

            login_result = admin.admin_login(email, password)

        else:

            return jsonify({"message": "invalid user type"}), 400
        if login_result:
            print(f"admin datatypes")
            session['user_id'] = login_result[0][1] if login_result else None
            x = session.get("user_id")
            print(f"userka: {x}")

            return jsonify({"status": "success", "message": "login successful as ", "data": user_type, "values": login_result}), 200

        else:

            return jsonify({"status": "fail", "message": "emailka , passwor-ka ama nooca isticmaalaha"}), 401



    except Exception as e:

        return jsonify({"status": "error", "message": str(e)}), 500



