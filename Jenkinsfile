pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                print 'Checkout'
                checkout([
                $class: 'GitSCM',
                branches: [[name: '*/master']],
                userRemoteConfigs: [ [
                    credentialsId: 'jirawatchn',
                    url: 'https://github.com/JirawatChn/ecms-frontend.git'
                ] ]
                ])
                print "Checkout done"
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ecms-frontend ."
                sh "docker create --name ecms-frontend ecms-frontend:lastest"
                sh "docker run -d --name ecms-frontend -p 8080:80 ecms-frontend:lastest"
                print 'Building Docker'
            }
        }
        stage('Test') {
            steps {
                print 'Test'
            }
        }
    }
}
