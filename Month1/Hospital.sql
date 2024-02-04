#database creation
create database if not exists hospital_management;

#using databse
use hospital_management;

#creating user_roles and users
create table user_role(
 role_id int primary key, 
 role_name varchar(50) unique);

create table users(user_id int primary key , 
role_id int, 
foreign key(role_id) references user_role(role_id), 
first_name varchar(50), 
last_name varchar(50), 
contact_number varchar(10) check(length(contact_number) = 10), 
email varchar(100));

# creating patient table 
create table patient(
patient_id int primary key , 
first_name varchar(50), 
last_name varchar(50), 
birth_date date, 
gender enum('Male', 'Female', 'Other'),
contact_number varchar(10) check(length(contact_number) = 10),
email varchar(100),insurance_id int,
foreign key(insurance_id) references insurance(insurance_id));
 
 #creating diagnosis table
 create table diagnosis(
 diagnosis_id int primary key ,
 patient_id int,
 doctor_id int,
 foreign key(patient_id) references patient(patient_id),
 foreign key(doctor_id) references users(user_id), 
 reason varchar(200),
 diagnosis_date date,
 diagnosis_amount int);
 
 #creating insurance table
 create table insurance(
 insurance_id int primary key, 
 insurance_company varchar(100),
 expiry_date date);
 
 #creating bill table
 create table bill (
 bill_id int primary key  auto_increment, 
 patient_id int,foreign key(patient_id) references patient(patient_id),
 bill_date date,
 bill_amount int);
 
 # Q1. Write necessary queries to register new user roles and personas
 insert into user_role values (1,'Doctor');
 insert into users values (10,1, 'Aniket', 'shinde', '8594933221', 'aniketshinde@gmail.com');
 insert into patient values (100, 'Aditya', 'patil',  '2024-1-13', 'Male', '9484736493','adityapatil@gmail.com', 1000);
 
 # Q2. Write necessary queries to add to the list of diagnosis of the patient tagged by date.
 insert into diagnosis values(10000,100,10,'kidney stone', '2024-1-15',50000);
 
  # Q3. Write necessary queries to fetch required details of a particular patient.
 select p.*,d.doctor_id,d.reason,d.diagnosis_date, i.insurance_company, i.expiry_date from patient p join diagnosis d on p.patient_id = 
 d.patient_id join insurance i on i.insurance_id = p.insurance_id where p.patient_id = 100;
 
 # Q4. Write necessary queries to prepare bill for the patient at the end of checkout.
 insert into bill values (100000,100,'2024-1-20', 50000);

 #Q5. Write necessary queries to fetch and show data from various related tables (Joins)
 select p.*,d.doctor_id,d.reason,d.diagnosis_date, i.insurance_company, i.expiry_date,b.bill_date,b.bill_amount from patient p join 
 diagnosis d on p.patient_id = d.patient_id join insurance i on i.insurance_id = p.insurance_id join 
 bill b on b.patient_id = p.patient_id where p.patient_id = 100;
 
# Q6. Optimize repeated read operations using views/materialized views.
 create view patient_diagnosis as select concat(p.first_name," ",p.last_name) as 'Patients name', d.*, concat(u.first_name," ",u.last_name) as 'Doctors name' from diagnosis
 d join patient p on p.patient_id = d.patient_id join users u on u.user_id = d.doctor_id where p.patient_id = 100;
 
 #Q7. Optimize read operations using indexing wherever required. (Create index on at least 1 table)
 create index idx_patient_id on diagnosis(patient_id);
 
#Q8. Try optimizing bill generation using stored procedures.
delimiter //
create procedure bill_generation(in patient_id int)
begin
 declare total_bill int;
 select d.diagnosis_amount into total_bill from diagnosis d where d.patient_id = patient_id;
 insert into bill(patient_id,bill_date,bill_amount) values (patient_id,current_date(),total_bill);
 End //
 delimiter ;
 
#Q9. Add necessary triggers to indicate when patients medical insurance limit has expired.
delimiter //
create trigger check_insurance_expiry before insert on bill for each row
begin
	declare exp_date date;
    select expiry_date into exp_date from insurance where insurance.insurance_id = (select insurance_id from patient where patient_id = 
    NEW.patient_id);
    if NEW.bill_date > exp_date then 	
     SIGNAL SQLSTATE '45000'
  SET MESSAGE_TEXT = 'Billing cannot be done for a patient with expired insurance.';
    end if;
    end; // 
delimiter ;

#using trigger
 insert into insurance values (1001, 'LIC', '2026-10-21');
 update insurance set expiry_date = '2022-5-3' where insurance_id = 1001;
 insert into patient values (101, 'Amit', 'pawar',  '2024-8-13', 'Male', '9484768893','amitpawar@gmail.com', 1001);
 insert into diagnosis values(10001,101,10,'Fracture', '2024-3-18',30000);
 call bill_generation(100);
