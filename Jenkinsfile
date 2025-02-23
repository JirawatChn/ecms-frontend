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
                bat "docker rm -f ecmsfrontendrun || true" // Remove existing container if it exists
                bat "docker run -d --name ecmsfrontendrun -p 54100:3000 ecmsfrontend:latest"
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
