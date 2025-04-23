pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Prak1701/p54.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker-compose -f demodocker2/docker-compose.yml build'
            }
        }

        stage('Run Docker') {
            steps {
                sh 'docker-compose -f demodocker2/docker-compose.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker containers...'
            sh 'docker-compose -f demodocker2/docker-compose.yml down || true'
        }
    }
}
