# Project Name: Teacher Office appointment booking

# Description:

Teacher Office appointment booking system is web app based, used to show teachers schedule
For availability time. The students register and login, then they able to see teachers schedule, if its available, he/she
Can able to book.

# Problems:

1. Time saving
2. Students may not have clear visibility into teacher.

# Solutions

My project solves these problem above.
If student want to meet teacher it cannot found quickly, because the teacher has schedule, but this system solves that, you can check teacher availabilities , Teacher Office appointment booking he teacher is available , then you can book.

# Stack:

1. Front-end (react and tailwindcss)
2. Back-end (flask)
3. Database (Mysql )

# video URL: [(https://youtu.be/eu8tGy7FK0s?si=lcjGDN7XgQiu4xI2)]

# How to connect to the database

## Go to the file name: My_configration.py

# How to use system

### first you need to register admin,to register admin you can use either insomnia or postman.

you will have to send a POST request with this API-endpoint (/register-admin),  
with the following data in JSON format or
look for admin.py in backend :
{
"admin_name": "admin",
"admin_email":"example@gmail.com",
"admin_password": "123@@"
}

# Database (MYSQL)

1. Databasa Name: .................
2. admin table:
   create table admins(
   admin_id INT AUTO_INCREMENT PRIMARY KEY,
   admin_name varchar(255) not null,
   admin_email varchar(255) not null,
   admin_password varchar(255) not null,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

); 3. users table
CREATE TABLE users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(255) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
gender VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 4. Teacher table
CREATE TABLE teachers (
teacher_id INT PRIMARY KEY AUTO_INCREMENT,
teacher_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
teacher_password VARCHAR(255) NOT NULL,
gender varchar(255) not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. schedules table
   create table schedules(
   schedule_id int PRIMARY KEY AUTO_INCREMENT,
   teacher_id int,
   from_time time not null,
   to_time time not null,
   schedule_day varchar(255) not null,
   review VARCHAR(255) not null,
   FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

6. appointments table
   CREATE TABLE appointments (
   appointment_id INT PRIMARY KEY AUTO_INCREMENT,
   teacher_id INT,
   user_id INT,
   schedule_id INT,
   appointment_date DATE DEFAULT (CURRENT_DATE),
   appointment_time TIME DEFAULT (CURRENT_TIME),  
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   FOREIGN KEY (schedule_id) REFERENCES schedules(schedule_id)
   );
