pipeline {
    agent none

    environment {
        DOCKER_IMAGE = 'thilina123/employee-management-system-frontend'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Parallel Agent Test') {
            parallel {
                stage('Run on Built-In Node') {
                    agent {
                        label 'controller'
                    }

                    steps {
                        sh '''
                            echo "Running on Built-In Jenkins Controller Node"
                            docker --version || true
                        '''
                    }
                }

                stage('Run on Docker Agent') {
                    agent {
                        label 'docker'
                    }

                    steps {
                        sh '''
                            echo "Running on Docker Agent Node"
                            docker ps
                        '''
                    }
                }
            }
        }

        stage('Parell run checkout and docker build')
        {
            parallel
            {
                stage('Checkout') {
            agent {
                label 'controller'
            }

            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            agent {
                label 'docker'
            }

            steps {
                sh '''
                    echo "Building Docker image on docker agent"
                    whoami
                    hostname
                    pwd
                    docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
                    docker tag $DOCKER_IMAGE:$DOCKER_TAG $DOCKER_IMAGE:latest
                '''
            }
        }

            }
        }



        

        stage('Push Docker Image') {
            agent {
                label 'docker'
            }

            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push $DOCKER_IMAGE:$DOCKER_TAG
                        docker push $DOCKER_IMAGE:latest
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check node labels, Docker permission, Dockerfile, or Docker Hub credentials.'
        }
    }
}