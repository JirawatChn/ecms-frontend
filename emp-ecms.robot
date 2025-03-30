*** Settings ***
Documentation    Robot Framework test suite for ECMS
Library    SeleniumLibrary

*** Test Cases ***
TC-EMP-01 Emp login success
     Open Browser    http://localhost:3000/ecms/login    chrome
    Input Text    email    emp
    Input Password    password    admin
    Click Element    submit

# TC-EMP-02
#     Open Browser    http://localhost:3000/ecms/login    chrome
#     Input Text    email    emp
#     Click Element    submit

# TC-EMP-03
#     Open Browser    http://localhost:3000/ecms/login    chrome
#     Input Text    email    emp
#     Input Password    password    1234
#     Click Element    submit

# TC-EMP-15 Repeated Registration
#     Open Browser    http://localhost:3000/ecms/login    chrome
#     Maximize Browser Window
#     Input Text    email    emp
#     Input Password    password    admin
#     Click Element    submit
#     Sleep    3s
#     Click Element    course
#     Sleep    3s
#     Click Element    open-0
#     Sleep    3s
#     Click Element    select-0
#     Sleep    3s
#     Click Element    register