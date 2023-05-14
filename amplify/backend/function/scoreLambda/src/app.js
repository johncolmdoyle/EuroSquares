/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let squareTable = "squareTable-dev";
let bandTable = "bandTable-dev";

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/score";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.post(path, async(req, res) => {
  console.log("POST: " + path);

  let squaresParams = {
    TableName: squareTable
  }
  let bandsParams = {
    TableName: bandTable
  }

  const squareResponse =await dynamodb.scan(squaresParams).promise();

  const bandResponse = await dynamodb.scan(bandsParams).promise(); 

  let bands = bandResponse.Items;
  
  for (let i = 0; i < squareResponse.Items.length; i++) {
    let square = squareResponse.Items[i];
    if (square.hasOwnProperty("players")) {
      
      for(let j = 0; j < square.players.length; j++) {
        let player = square.players[j];
        // Init score to 0
        player.score = 0;

        if (player.hasOwnProperty("countries")){
          for (let k = 0; k < player.countries.length; k++) {
            let countryId = player.countries[k];

            for (let m = 0; m < bands.length; m++) {
              if (Number(bands[m].id) === countryId) {
                player.score = player.score + (bands[m].score?bands[m].score:0);
              }
            }
          }
        }
      }
      
      await dynamodb.update({
              TableName: squareTable,
              Key: { id: square.id },
              UpdateExpression: "SET #players = :players",
              ExpressionAttributeNames: {
                "#players": "players",
              },
              ExpressionAttributeValues: {
                ":players": square.players,
              },
            }).promise();
    }
  }
  res.json({ success: 'put call succeed!', url: req.url, data: {} })
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
