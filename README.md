# ECMS Website Application

เว็บไซด์นี้ใช้ API ในการดึงข้อมูลมาจาก Back-end</br>
[https://github.com/JirawatChn/ecms-frontend](https://github.com/JirawatChn/ecms-frontend)</br>
</br>
<ui><b>ถ้าไม่ได้เชื่อมต่อกับ Back-end สามารถใช้ข้อมูลตัวอย่างได้จาก Branch noapi</b><ui>
</br>
Developer : </br>
Jirawat Chanasit</br>
</br>
แบ่ง Users ออกเป็น 2 ส่วนในการทำงาน คือ</br>
    -Emp</br>
    -Hr</br>
<hr>
</br>
-- Login Page --</br>
ผู้ใช้จะต้อง login ก่อนเข้าสู่ระบบ</br>
</br>
<hr>
-- Emp Page --</br>
</br>
Dashbaord Page : </br>
path /ecms/emp/dashboard </br>
แสดงข้อมูลพื้นฐานพนักงาน</br>
</br>
Course Page : </br>
path /ecms/emp/course  </br>
ใช้ในการค้นหาคอร์สอบรมที่ทำการเปิดให้ลงทะเบียน</br>
</br>
Course Managements Page : </br>
path /emp/course/manage </br>
ใช้ในการดูคอร์สอบรมที่ได้ทำการลงทะเบียนไว้แล้วและการส่งคำขอถอนการอบรม</br>
</br>
Tranings Page : </br>
path /emp/trainings</br>
ใช้ในการดูคอร์สอบรมที่ได้ทำการลงทะเบียน</br>
</br>
Training Details Page : </br>
path /emp/trainings/details/:courseId/:sessionId</br>
ใช้ในการดูรายละเอียดคอร์สอบรมที่ได้ทำการลงทะเบียน </br>
</br>
Training History Page : </br>
path /emp/trainings/history</br>
ใช้ในการดูประวัติคอร์สอบรมที่ได้เคยลงทะเบียนและผลลัพธ์การอบรม</br>
</br>
Training History Details Page : </br>
path /emp/trainings/history/:reqId</br>
ใช้ในการดูรายละเอียดประวัติคอร์สอบรมที่ได้เคยลงทะเบียน</br>
</br>
Reimbursement Page : </br>
path /emp/reimbursement</br>
ใช้ในการดูรายการขอเบิกค่าอบรมและผลลัพธ์คำร้อง</br>
</br>
Reimbursement Page : </br>
path /emp/reimbursement/request</br>
ใช้ในการส่งคำร้องขอเบิกค่าอบรม</br>
</br>
Reimbursement Details Page : </br>
path /emp/reimbursement/details/:reqId</br>
ใช้ในการดูรายการขอเบิกค่าอบรมและผลลัพธ์คำร้อง</br>
</br>
Personal Information Page : </br>
path /emp/details</br>
ใช้ในการดูข้อมูลส่วนตัวของพนักงาน</br>
</br>
<hr>
-- Hr Page --</br>
</br>
Dashbaord Page : </br>
path /hr/dashboard </br>
แสดงข้อมูลโดยย่อของระบบ</br>
</br>
Course Page : </br>
path /hr/course</br>
ใช้ในการดูคอร์สอบรมทั้งหมดของระบบ</br>
</br>
Create New Course Page : </br>
path /hr/create/course</br>
ใช้ในการสร้างคอร์สอบรม</br>
</br>
Create New Session Page : </br>
path /hr/create/session</br>
ใช้ในการสร้างรอบอบรม</br>
</br>
Course Details Page : </br>
path /hr/course/details/:courseId/:sessionId</br>
ใช้ในการดูรายละเอียดคอร์สอบรม</br>
</br>
Edit Course Page : </br>
path /hr/course/edit/:courseId/:sessionId</br>
ใช้ในการแก้ไขคอร์สอบรม</br>
</br>
Training Results Page : </br>
path /hr/results</br>
ใช้ในการดูคำร้องขอผลลัพธ์การอบรมของพนักงานทั้งหมด</br>
</br>
Results Details Page : </br>
path /hr/results/details/:reqId</br>
ใช้ในการดูรายละเอียดคำร้องขอผลลัพธ์การอบรมของพนักงาน</br>
</br>
Withdraw Requests Page : </br>
path /hr/withdraw/requests</br>
ใช้ในการดูคำขอถอนการอบรมของพนักงานทั้งหมด</br>
</br>
Withdraw Details Page : </br>
path /hr/withdraw/details/:reqId</br>
ใช้ในการดูรายละเอียดคำขอถอนการอบรมของพนักงานทั้งหมด</br>
</br>
Reimbursement Requests Page : </br>
path /hr/reimbursement/requests</br>
ใช้ในการดูคำขอเบิกค่าอบรมของพนักงานทั้งหมด</br>
</br>
Withdraw Details Page : </br>
path /hr/reimbursement/details/:reqId</br>
ใช้ในการดูรายละเอียดคำขอขอเบิกค่าอบรมของพนักงานทั้งหมด</br>
</br>
Employee Page : </br>
path /hr/emp</br>
ใช้ในการดูพนักงานทั้งหมดในระบบ</br>
</br>
Employee Details Page : </br>
path /hr/emp/details/:empId</br>
ใช้ในการดูรายละเอียดพนักงาน</br>
</br>
Edit Employee Page : </br>
path /hr/emp/edit/:empId</br>
ใช้ในการแก้ไขข้อมูลพนักงาน</br>
</br>
Create Employee Page : </br>
path /hr/emp/create</br>
ใช้ในการสร้างพนักงานใหม่</br>
</br>
Personal Information Page : </br>
path /hr/profile</br>
ใช้ในการดูข้อมูลส่วนตัว</br>
</br>
Edit Personal Information Page : </br>
path /hr/edit/profile</br>
ใช้ในการแก้ไขข้อมูลส่วนตัว</br>

