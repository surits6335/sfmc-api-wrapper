const https = require('https');
const logger = require('../utils/logger');
const soapRequest = require('easy-soap-request');
const fs = require('fs');
const parseString = require("xml2js").parseString;
const xml2js = require("xml2js");


const save = async (token, requestPayload) => {

    const sampleHeaders = {
      'Content-Type': 'text/xml;charset=UTF-8',
      'soapAction': 'Create'
    };

    return new Promise((resolve, reject) => {
        fs.readFile("template.xml", "utf-8", function(err, data) {
            if (err) reject(err);
    
            parseString(data, function(err, result) {
    
                if (err) reject(err);
    
                let json = result;
                json['soapenv:Envelope']['soapenv:Header'][0]['fueloauth'] = token;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['UserID'] = requestPayload.UserID;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['Password'] = requestPayload.Password;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['Name'] = requestPayload.Name;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['Email'] = requestPayload.Email;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['NotificationEmailAddress'] = requestPayload.NotificationEmailAddress;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['ActiveFlag'] = requestPayload.ActiveFlag;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['IsAPIUser'] = requestPayload.IsAPIUser;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['IsLocked'] = requestPayload.IsLocked;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['MustChangePassword'] = requestPayload.MustChangePassword;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['DefaultBusinessUnit'] = requestPayload.DefaultBusinessUnit;
                json['soapenv:Envelope']['soapenv:Body'][0]['CreateRequest'][0]['Objects'][0]['Roles'][0]['Role'][0]['ObjectID'][0] = requestPayload.RoleObjectID;

    
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(json);
    
                fs.writeFile("body.xml", xml, function(err, data) {
                    if (err) reject(err);
    
                    resolve(soapRequest({ url: process.env.SERVICE_URL, headers: sampleHeaders, xml: xml }));
                });
            });
        });
    });
}

const getToken = async() => {
    const data = JSON.stringify(
        {
            "grant_type": process.env.GRANT_TYPE,
            "client_id": process.env.CLIENT_ID,
            "client_secret": process.env.CLIENT_SECRET,
            "account_id": process.env.ACCOUNT_ID
        }
    );

    const options = {
        hostname: process.env.TOKEN_HOSTNAME,
        path: '/v2/token',
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
      
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
      
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
          });
      
        req.on('error', (err) => {
            reject(err);
        });
    
        req.write(data);
        req.end();
    })
}

module.exports = { save, getToken }