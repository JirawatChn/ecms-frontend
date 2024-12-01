# ECMS Website Application

เว็บไซด์นี้ใช้ API ในการดึงข้อมูลมาจาก Back-end
โดยจะมีทั้งหมด 2 versions คือ

Complete version :
เป็น Website Application version เชื่อมต่อกับ Database และ Back-end แล้ว

Github version :
เป็น Website Application version ที่ทำการใช้ข้อมูลตัวอย่างในการแสดงข้อมูล

Developer : 
Jirawat Chanasit

แบ่ง Users ออกเป็น 2 ส่วนในการทำงาน คือ
    -Emp
    -Hr

-- Login Page --
ผู้ใช้จะต้อง login ก่อนเข้าสู่ระบบ

โดยใน verion github สามารถทดลองเข้าสู่ระบบได้ด้วย

Emp
username : emp
password : emp

Hr
username : admin
username : admin

-- Emp Page --

Dashbaord Page : 
path /ecms/emp/dashboard 
แสดงข้อมูลพื้นฐานพนักงาน

Course Page : 
path /ecms/emp/course  
ใช้ในการค้นหาคอร์สอบรมที่ทำการเปิดให้ลงทะเบียน

Course Managements Page : 
path /emp/course/manage 
ใช้ในการดูคอร์สอบรมที่ได้ทำการลงทะเบียนไว้แล้วและการส่งคำขอถอนการอบรม

Tranings Page : 
path /emp/trainings
ใช้ในการดูคอร์สอบรมที่ได้ทำการลงทะเบียน

Training Details Page : 
path /emp/trainings/details/:courseId/:sessionId
ใช้ในการดูรายละเอียดคอร์สอบรมที่ได้ทำการลงทะเบียน 

Training History Page : 
path /emp/trainings/history
ใช้ในการดูประวัติคอร์สอบรมที่ได้เคยลงทะเบียนและผลลัพธ์การอบรม

Training History Details Page : 
path /emp/trainings/history/:reqId
ใช้ในการดูรายละเอียดประวัติคอร์สอบรมที่ได้เคยลงทะเบียน

Reimbursement Page : 
path /emp/reimbursement
ใช้ในการดูรายการขอเบิกค่าอบรมและผลลัพธ์คำร้อง

Reimbursement Page : 
path /emp/reimbursement/request
ใช้ในการส่งคำร้องขอเบิกค่าอบรม

Reimbursement Details Page : 
path /emp/reimbursement/details/:reqId
ใช้ในการดูรายการขอเบิกค่าอบรมและผลลัพธ์คำร้อง

Personal Information Page : 
path /emp/details
ใช้ในการดูข้อมูลส่วนตัวของพนักงาน

-- Hr Page --

Dashbaord Page : 
path /hr/dashboard 
แสดงข้อมูลโดยย่อของระบบ

Course Page : 
path /hr/course
ใช้ในการดูคอร์สอบรมทั้งหมดของระบบ

Create New Course Page : 
path /hr/create/course
ใช้ในการสร้างคอร์สอบรม

Create New Session Page : 
path /hr/create/session
ใช้ในการสร้างรอบอบรม

Course Details Page : 
path /hr/course/details/:courseId/:sessionId
ใช้ในการดูรายละเอียดคอร์สอบรม

Edit Course Page : 
path /hr/course/edit/:courseId/:sessionId
ใช้ในการแก้ไขคอร์สอบรม

Training Results Page : 
path /hr/results
ใช้ในการดูคำร้องขอผลลัพธ์การอบรมของพนักงานทั้งหมด

Results Details Page : 
path /hr/results/details/:reqId
ใช้ในการดูรายละเอียดคำร้องขอผลลัพธ์การอบรมของพนักงาน

Withdraw Requests Page : 
path /hr/withdraw/requests
ใช้ในการดูคำขอถอนการอบรมของพนักงานทั้งหมด

Withdraw Details Page : 
path /hr/withdraw/details/:reqId
ใช้ในการดูรายละเอียดคำขอถอนการอบรมของพนักงานทั้งหมด

Reimbursement Requests Page : 
path /hr/reimbursement/requests
ใช้ในการดูคำขอเบิกค่าอบรมของพนักงานทั้งหมด

Withdraw Details Page : 
path /hr/reimbursement/details/:reqId
ใช้ในการดูรายละเอียดคำขอขอเบิกค่าอบรมของพนักงานทั้งหมด

Employee Page : 
path /hr/emp
ใช้ในการดูพนักงานทั้งหมดในระบบ

Employee Details Page : 
path /hr/emp/details/:empId
ใช้ในการดูรายละเอียดพนักงาน

Edit Employee Page : 
path /hr/emp/edit/:empId
ใช้ในการแก้ไขข้อมูลพนักงาน

Create Employee Page : 
path /hr/emp/create
ใช้ในการสร้างพนักงานใหม่

Personal Information Page : 
path /hr/profile
ใช้ในการดูข้อมูลส่วนตัว

Edit Personal Information Page : 
path /hr/edit/profile
ใช้ในการแก้ไขข้อมูลส่วนตัว

