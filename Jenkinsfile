pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-docker-image"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Prak1701/p54.git'
            }
        }

        stage('Build Docker') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Docker') {
            steps {
                bat 'docker run -d --name my-container -p 3000:3000 %IMAGE_NAME%'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker containers...'
            bat 'docker rm -f my-container || exit 0'
        }
    }
}
