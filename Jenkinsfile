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
                print 'Building the project'
            }
        }
        stage('Test') {
            steps {
                print 'Test'
            }
        }
    }
}
