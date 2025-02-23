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
                bat "docker build -t ecmsfrontend ."
                bat "docker create --name ecmsfrontend ecmsfrontend:latest"
                bat "docker run -d --name ecmsfrontend -p 8080:80 ecmsfrontend:latest"
                echo 'Building Docker'
            }
        }
        stage('Test') {
            steps {
                print 'Test'
            }
        }
    }
}
