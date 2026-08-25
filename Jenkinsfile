
pipeline {
    agent any

    environment {
        registry = "YOUR_DOCKERHUB_USERNAME/cicd-lab"
        registryCredential = "dockerhub"
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(registry)
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh '''
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${registry}
                '''
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        docker.image(registry).push('latest')
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${registry}:latest || true"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}