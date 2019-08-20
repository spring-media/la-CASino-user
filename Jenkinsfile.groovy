echo "Building Branch $env.BRANCH_NAME"
if ("master" != env.BRANCH_NAME && !env.CHANGE_ID) {
    echo "try to build branch != master without Pull-Request ID. Abort."
    currentBuild.result = 'SUCCESS'
    return
}

node('ecs-slave') {
    ansiColor('xterm') {
        withCredentials([
                [$class: 'StringBinding', credentialsId: 'NPM_AUTH_TOKEN', variable: 'NPM_AUTH_TOKEN']
        ]) {
            stage("Checkout") {
                checkout scm
            }

            stage ("Install dependencies") {
                sshagent(['06048bce-a762-4e2a-8125-e93c7ed5fbe9']) {
                    sh "npm config set //registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN"
                    sh "npm install"
                }
            }

            stage ("Build") {
                sh "npm run build"
            }

            if ("master" != env.BRANCH_NAME) {
                echo "try to build branch != master without Pull-Request ID. Abort."
                currentBuild.result = 'SUCCESS'
                return
            }

            stage ("Deploy production") {
                sh "npm publish"
            }

        }
    }
}
