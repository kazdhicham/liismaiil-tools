import {SESClient, CloneReceiptRuleSetCommand} from '@aws-sdk/client-ses' 
const sesConfig = {
  accessKeyId: process.env.AWS_ACCESS_DEV_ID,
  accessSecret: process.env.AWS_ACCESS_DEV_SECRET,
  region:'eu-central-1'
}

exports.handler = async (event, context) => {

 
    console.log({event})
  const {from , subject, message} =   JSON.parse(event.body)
  if(!from || !subject || !message){
    return {
      headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credential": false,
      "Content-Type": "application/json",
    },
    statusCode: 400,
    body: JSON.stringify("from or suject or no message please set all inputs")
  }
  }
var params = {
  Destination: { /* required */
     CcAddresses: [
      'hicham.horsjeux@gmail.com',
    ], 
    ToAddresses: [
      'contact@liismaiil.org',
     
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Text: {
       Charset: "UTF-8",
       Data: message 
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: subject
     }
    },
  Source: from, /* required */
  ReplyToAddresses: [
     'kazdhicham@gmail.com',
    
  ],
};

// Create the promise and SES service object
 try {
  const command = new CloneReceiptRuleSetCommand(params);
 const client = await new SESClient({ ...sesConfig, Version: '2010-12-01'}).promise();

      await client.send(command);
  // process data.
   return {
      headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credential": false,
      "Content-Type": "application/json",
    },
    statusCode: 200,
    body: JSON.stringify("message sent"),
    success: true
  } 
} catch (error) {
  return {
      headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credential": false,
      "Content-Type": "application/json",
    },
    statusCode: 500,
    body: JSON.stringify(`${error} occured 
              Failed to send`),
              success:true
  }
  
  // error handling.
} 
  
     
  
}

 