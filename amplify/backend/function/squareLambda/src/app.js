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

let tableName = "squareTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/squares";
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

app.get(path, function (req, res) {
  console.log("GET: " + path);

  if (req.query.id) {
    // Search by id
    console.log("Searching by id=" + decodeURI(req.query.id));

    let queryParams = {
      TableName: tableName,
      FilterExpression: '#id = :id',
      ExpressionAttributeNames: { "#id": "id" },
      ExpressionAttributeValues: {
        ':id': decodeURI(req.query.id)
      }
    }

    dynamodb.scan(queryParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: 'Could not load items: ' + err });
      } else {
        res.json(data.Items);
      }
    });
  } else {
    // Get All
    let params = {
      TableName: tableName
    }

    dynamodb.scan(params, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: 'Could not load items: ' + err });
      } else {
        console.log("Response: " + JSON.stringify(data));

        res.json(data.Items);
      }
    });
  }
});

/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {
  console.log("PUT: " + path);

  if (!req.body.queryStringParameters.id) {
    res.statusCode = 500;
    res.json({ error: "Missing Square ID", url: req.url, body: req.body });
  } else {
    console.log("Searching for square");
    const params = {};
    params["id"] = decodeURI(req.body.queryStringParameters.id);

    // Get initial object
    let getItemParams = {
      TableName: tableName,
      Key: params
    }
  
    dynamodb.get(getItemParams,(err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: 'Could not load square: ' + err.message});
      } else {
        console.log("Found square");
        if (!data.Item.hasOwnProperty('players')) {
          data.Item.players = [];
        }

        data.Item.players.push({
          name: req.body.body.name,
          countries: []});

        const numPeople = data.Item.players.length;
        const numNumbers = 26;
        const maxPerPerson = Math.floor(numNumbers / numPeople);
        const remainder = numNumbers % numPeople;

        // Populate country ids
        const availableNumbers = [];
        for (let i = 1; i <= numNumbers; i++) {
          availableNumbers.push(i);
        }

        // Randomize
        for (let i = availableNumbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
        }

        // Assign them to all players
        for (let i = 0; i < numPeople; i++) {
          data.Item.players[i].countries = [];
          const assignedNumbers = new Set(data.Item.players[i].countries);
          const numAssigned = assignedNumbers.size;
          let numToAssign = numAssigned < maxPerPerson ? maxPerPerson - numAssigned : 0;
          if (i < remainder) {
            numToAssign++;
          }
          if (numToAssign > 0) {
            for (let j = 0; j < numToAssign; j++) {
              const newNumber = availableNumbers[j];
              data.Item.players[i].countries.push(newNumber);
            }
            availableNumbers.splice(0, numToAssign);
          }
        }

        console.log("Updating square");
        // Update the item
        let putItemParams = {
          TableName: tableName,
          Item: data.Item
        }
        dynamodb.put(putItemParams, (putErr, putData) => {
          if (putErr) {
            res.statusCode = 500;
            res.json({ error: putErr, url: req.url, body: req.body });
          } else{
            res.json({ success: 'put call succeed!', url: req.url, data: putData })
          }
        });
      }
    });
  }  
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
