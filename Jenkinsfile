pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        IMAGE_NAME = "docnikita/test-jenkins-app"
        DOCKER_TAG = "${env.BUILD_ID}"
        TEST_CONTAINER_NAME = "express-app-test-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/NikitaEeTu/jenkins-test-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:${DOCKER_TAG} .
                    """
                }
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    sh """
                        docker run --name ${TEST_CONTAINER_NAME} ${IMAGE_NAME}:${DOCKER_TAG} npm test
                    """
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh """
                        docker run -d -p 3000:3000 ${IMAGE_NAME}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'docker rm -f ${TEST_CONTAINER_NAME} || true'
            sh 'docker rmi ${IMAGE_NAME}:${DOCKER_TAG} || true'
        }
    }
}
