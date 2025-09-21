pipeline {
    agent any

    stages {

        // ===== FRONTEND =====
        stage('Build Frontend') {
            steps {
                dir('frontendcems/cems') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactcemsapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactcemsapi"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactcemsapi"
                xcopy /E /I /Y frontendcems\\cems\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactcemsapi"
                '''
            }
        }

        // ===== BACKEND =====
        stage('Build Backend') {
            steps {
                dir('backendcems/Event') {   // ✅ correct location of pom.xml
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootcemsapi.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootcemsapi.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootcemsapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootcemsapi"
                )
                copy "backendcems\\target\\springbootcemsapi.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootcemsapi.war"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Check logs.'
        }
    }
}
