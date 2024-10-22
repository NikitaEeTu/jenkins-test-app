pipeline {
    agent any

    environment {
        IMAGE_NAME = "local-express-app"
        DOCKER_TAG = "${env.BUILD_ID}"
        TEST_CONTAINER_NAME = "express-app-test-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'git@github.com:NikitaEeTu/jenkins-test-app.git'
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

        stage('Deploy Application Locally') {
            steps {
                script {
                    sh """
                        docker run -d -p 3000:3000 --name express-app ${IMAGE_NAME}:${DOCKER_TAG}
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
