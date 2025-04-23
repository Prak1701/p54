pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('demodocker2') {
                    echo 'Building Docker image...'
                    sh 'docker build -t myapp .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                dir('demodocker2') {
                    echo 'Running Docker container...'
                    sh 'docker run -d -p 8080:80 --name myappcontainer myapp'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker rm -f myappcontainer || true'
        }
    }
}
