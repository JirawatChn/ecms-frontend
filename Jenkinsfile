pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout frontend'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        credentialsId: 'jirawatchn',
                        url: 'https://github.com/JirawatChn/ecms-frontend.git'
                    ]]
                ])
            }
        }

        stage('Build') {
            steps {
                bat "docker build -t ecmsfrontend ."
                bat "docker rm -f ecmsfrontendrun || true"
                bat "docker run -d --name ecmsfrontendrun -p 3000:54100 ecmsfrontend:latest"
                echo 'Docker is running'
            }
        }

        stage('Checkout Test Repo') {
            steps {
                echo 'Checkout autotest'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        credentialsId: 'jirawatchn',
                        url: 'https://github.com/JirawatChn/ecms-autotest'
                    ]]
                ])
            }
        }

        stage('Run EMP Test') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat "pip install robotframework"
                    bat "pip install robotframework-seleniumlibrary"
                    bat "robot -d reports/emp emp-ecms.robot"
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportDir: 'reports/emp',
                        reportFiles: 'report.html',
                        reportName: 'EMP Test Report',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        stage('Run HR Test') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat "robot -d reports/hr hr-ecms.robot"
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportDir: 'reports/hr',
                        reportFiles: 'report.html',
                        reportName: 'HR Test Report',
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }
    }
}
