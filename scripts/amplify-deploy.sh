#!/bin/bash
set -e
IFS='|'

BRANCH_NAME=${1}
APP_ID=$(aws amplify list-apps --query 'apps[0].appId' | tr -d '"')

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"amplify\",\
\"region\":\"us-east-1\"\
}"

AMPLIFY="{\
\"projectName\":\"jainewebapp\",\
\"envName\":\"${BRANCH_NAME}\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

npm install -g @aws-amplify/cli

amplify init \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes

yarn 

echo "Deploy Front & Back End"

amplify publish -y

exit 0;
