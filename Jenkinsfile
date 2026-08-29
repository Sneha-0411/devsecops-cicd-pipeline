pipeline {
    agent any

    environment {
        REGISTRY = "snehadarbarwar/cicd-lab"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %REGISTRY% .'
            }
        }

        stage('Security Scan') {
            steps {
                bat 'docker save -o image.tar %REGISTRY%'
                bat 'docker run --rm -v "%WORKSPACE%:/workspace" aquasec/trivy:latest image --input /workspace/image.tar'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    powershell '$env:DOCKER_PASS | docker login -u $env:DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %REGISTRY%'
            }
        }

        stage('Cleanup') {
            steps {
                bat '''
                    docker rmi %REGISTRY%
                    del image.tar 2>nul
                    exit /b 0
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}