process.env.PWD = process.cwd();
//let path       = require('path');
let logger     = require('morgan');
const express = require("express");
const app = express();
let moment = require('moment');
//let schedule = require('node-schedule');
//const lodash = require("lodash");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const User = require('./model/users');
const Pin = require('./model/pin');
const Staff = require('./model/staff');
const connect = require("./config/dbConfig");
//require the http module
const http = require("http").Server(app);
// require the socket.io module
const socket = require("socket.io");
//integrating socketio
io = socket(http);
const port = 4000;

//
//	Check for HTTPS
//
//app.use(force_https);

//
//	Expose the public folder to the world
//
app.use(express.static(__dirname + "/public"));

//
//	Remove the information about what type of framework is the site running on
//
app.disable('x-powered-by');

//
// HTTP request logger middleware for node.js
//
app.use(logger('dev'));

//
//	Parse all request as regular text, and not JSON objects
//
app.use(bodyParser.json());

//
//	Parse application/x-www-form-urlencoded
//
app.use(bodyParser.urlencoded({ extended: true}));

//////////////////////////////////////////////////////////////////////////////
function checkSouceAdd(add) {
    let addArr = add.split(":");
    let addArrLen = addArr.length;

    if(addArrLen == 4){
        let ipArr = addArr[3].split('.');
        let ipArrLen = ipArr.length;

        if(ipArrLen == 4){
            let legalIp = [104, 100];
            let allowedIp = legalIp.includes(parseInt(ipArr[3]));
            console.log(ipArr[3])
            if(allowedIp){
                //res.render('index', {});
                return true;
            } else {
                //redirect to noAccess
                //res.render('noAccess', {});
                return false;
            }
        } else {
            //redirect to noAccess
            //res.render('noAccess', {});
            return false;
        }        
    } else {
        //redirect to noAccess
        //res.render('noAccess', {});
        return false;
    } 
}
function countAvailablePins(arr){
    let len = arr.length;
    let availablePinLen = 0;

    arr.map((item, index) => {
        if(item.used == 'N'){
            availablePinLen++;
        }
    });
    return availablePinLen;
}

//routes
app.get('/', (req, res) => {
    let add = req.ip;
    let allowedSource = checkSouceAdd(add);

    if(allowedSource){
        res.render('index', {});
    } else {
        res.render('noAccess', {});
    }
     
});

app.get('/dash', function(req, res){ 
    
    let add = req.ip;
    let allowedSource = checkSouceAdd(add);

    if(allowedSource){
        Pin.find({amount: '1500'}, {}, (err, docs) => {
            if(err) throw error;
    
            let pinMArr = [];
            //TODO: creat a function processPin(), add the following op and replace in 3 other places
            docs.map((item, index) => {
                let tempArr = [];
                if(item.sold == 'N'){
                    tempArr['_id'] = item._id;
                    tempArr['used'] = item.used;
                    tempArr['usedBy'] = item.usedBy;
                    tempArr['digit'] = item.digit;
                    tempArr['numOfDays'] = item.numOfDays;
                    tempArr['amount'] = item.amount;
                    tempArr['hasSold'] = false;
                } else {
                    tempArr['_id'] = item._id;
                    tempArr['used'] = item.used;
                    tempArr['usedBy'] = item.usedByUserDetails;
                    tempArr['digit'] = item.digit;
                    tempArr['numOfDays'] = item.numOfDays;
                    tempArr['amount'] = item.amount;
                    tempArr['dateUsed'] = moment(item.dateUsed).format("ddd, MMM Do YYYY, h:mm:ss a");
                    tempArr['hasSold'] = true;
                    pinMArr.push(tempArr);                
                }

                pinMArr.push(tempArr);
            });
            
            //pinMArr = docs;
            let a = countAvailablePins(pinMArr);
            if(a > 150){//if unused pin is more than 15% of pins generated disable pin generation button
                pinMArrAvailablePins = false;
            } else {
                pinMArrAvailablePins = true
            }
    
            //get weekly pins
            Pin.find({amount: '500'}, {}, (err1, docs1) => {
                if(err1) throw error;
    
                let pinWArr = [];
                docs1.map((item, index) => {
                    let tempArr = [];
                    if(item.sold == 'N'){
                        tempArr['_id'] = item._id;
                        tempArr['used'] = item.used;
                        tempArr['usedBy'] = item.usedBy;
                        tempArr['digit'] = item.digit;
                        tempArr['numOfDays'] = item.numOfDays;
                        tempArr['amount'] = item.amount;
                        tempArr['hasSold'] = false;
                    } else {
                        tempArr['_id'] = item._id;
                        tempArr['used'] = item.used;
                        tempArr['usedBy'] = item.usedByUserDetails;
                        tempArr['digit'] = item.digit;
                        tempArr['numOfDays'] = item.numOfDays;
                        tempArr['amount'] = item.amount;
                        tempArr['dateUsed'] = moment(item.dateUsed).format("ddd, MMM Do YYYY, h:mm:ss a");
                        tempArr['hasSold'] = true;
                        pinWArr.push(tempArr);                  
                    }
    
                    pinWArr.push(tempArr);
                });
                //pinWArr = docs1;
                let b = countAvailablePins(pinWArr);
                if(b > 75){//if unused pin is more than 15% of pins generated disable pin generation button
                    pinWArrAvailablePins = false;
                } else {
                    pinWArrAvailablePins = true
                }
                
    
                //get daily pins
                Pin.find({amount: '200'}, {}, (err2, docs2) => {
                    if(err2) throw error;
    
                    let pinDArr = [];
                    docs2.map((item, index) => {
                        let tempArr = [];
                        if(item.sold == 'N'){
                            tempArr['_id'] = item._id;
                            tempArr['used'] = item.used;
                            tempArr['usedBy'] = item.usedBy;
                            tempArr['digit'] = item.digit;
                            tempArr['numOfDays'] = item.numOfDays;
                            tempArr['amount'] = item.amount;
                            tempArr['hasSold'] = false;
                        } else {
                            tempArr['_id'] = item._id;
                            tempArr['used'] = item.used;
                            tempArr['usedBy'] = item.usedByUserDetails;
                            tempArr['digit'] = item.digit;
                            tempArr['numOfDays'] = item.numOfDays;
                            tempArr['amount'] = item.amount;
                            tempArr['dateUsed'] = moment(item.dateUsed).format("ddd, MMM Do YYYY, h:mm:ss a");
                            tempArr['hasSold'] = true;
                            pinDArr.push(tempArr);                  
                        }
        
                        pinDArr.push(tempArr);
                    });
                    //pinDArr = docs2;
                    let c = countAvailablePins(pinDArr);
                    if(c > 30){//if unused pin is more than 15% of pins generated disable pin generation button
                        pinDArrAvailablePins = false;
                    } else {
                        pinDArrAvailablePins = true
                    }
                    
    
                    //get demo pins
                    Pin.find({amount: 'demo'}, {}, (err3, docs3) => {
                        if(err3) throw error;
    
                        let pinDemoArr = [];
                        docs3.map((item, index) => {
                            let tempArr = [];
                            if(item.sold == 'N'){
                                tempArr['_id'] = item._id;
                                tempArr['used'] = item.used;
                                tempArr['usedBy'] = item.usedBy;
                                tempArr['digit'] = item.digit;
                                tempArr['numOfDays'] = item.numOfDays;
                                tempArr['amount'] = item.amount;
                                tempArr['hasSold'] = false;
                                pinDemoArr.push(tempArr);
                            } else {
                                tempArr['_id'] = item._id;
                                tempArr['used'] = item.used;
                                tempArr['usedBy'] = item.usedByUserDetails;
                                tempArr['digit'] = item.digit;
                                tempArr['numOfDays'] = item.numOfDays;
                                tempArr['amount'] = item.amount;
                                tempArr['dateUsed'] = moment(item.dateUsed).format("ddd, MMM Do YYYY, h:mm:ss a");
                                tempArr['hasSold'] = true;
                                pinDemoArr.push(tempArr);                 
                            }
            
                            
                        });
                        //pinDemoArr = docs3;
                        let d = countAvailablePins(pinDemoArr);
                        if(d > 30){//if unused pin is more than 15% of pins generated disable pin generation button
                            pinDemoArrAvailablePins = false;
                        } else {
                            pinDemoArrAvailablePins = true
                        }
                        
                        res.render('dash', {
                            'pinsM': pinMArr,
                            'pinMArrAvailablePins': pinMArrAvailablePins,
                            'pinsW': pinWArr,
                            'pinWArrAvailablePins': pinWArrAvailablePins,
                            'pinsD': pinDArr,
                            'pinDArrAvailablePins': pinDArrAvailablePins,
                            'pinsDemo': pinDemoArr,
                            'pinDemoArrAvailablePins': pinDemoArrAvailablePins
                        });
                    }).sort({'used': -1});//.limit(100);
                }).sort({'used': -1});//.limit(100);
            }).sort({'used': -1});//.limit(100);
        }).sort({'used': -1});//.limit(100);   
    } else {
        res.render('noAccess', {});
    }   
     
});

app.get('/register', (req, res) => {
    let add = req.ip;
    let allowedSource = checkSouceAdd(add);

    if(allowedSource){
        res.render('register', {});
    } else {
        res.render('noAccess', {});
    }
    
});

app.get('/noAccess', (req, res) => {
    res.render('noAccess', {});
});

io.on("connection", io => {
    let sessionId = io.id;

    /**
     * When a subAdminOfficer submits a pin generation request
     */
    io.on("generatePin", inData => { 
        let whichSub = inData.whichSub;
        let pinArr = [];
        let days, amt;

        if(whichSub == 1){
            days = 28;
            amt = 1000;
            pinAmt = '1500';
        } else if(whichSub == 2){
            days = 7;
            amt = 500;
            pinAmt = '500';
        } else if(whichSub == 3){
            days = 1;
            amt = 250;
            pinAmt = '200';
        } else if(whichSub == 4){
            days = 1;
            amt = 250;
            pinAmt = 'demo';
        } 
        
        
        for(let a = 0; a < amt; a++){
            let randomNum = Math.floor(Math.random() * 1000000000000);

            if(pinArr.indexOf(randomNum) == -1){
                pinArr.push(randomNum);

                //send to server
                try{
                    //save user to the database
                    connect.then(db => {
                        let newPin = new Pin({
                            digit: randomNum,
                            numOfDays: days,
                            amount: pinAmt
                        });

                        newPin.save(function(err, obj){
                            if(err){
                                io.emit("pinGenFdbk", {status: 501});
                                throw err;                                
                            } 
                        });                
                    });
                } catch (inException) {// Handle any unexpected problems, ensuring the server doesn't go down.
                    //console.log(`${inException}`);
                }
            }
            if(a == (amt - 1)){
                console.log('last')
                //emit back to sender
                io.emit("pinGenFdbk", {status: 200});
            }
        }
    })

    io.on('staffLogin', inData => {

        Staff.find({
            username: inData.gatewayData.user,
            password: inData.gatewayData.pass,
        }).exec((err, staff) => {
            if(err) throw err;
            
            let len = staff.length;
            
            if(len > 0){                
                let mStaff = {
                    id: staff[0]['_id'],
                    firstname: staff[0]['firstname'],
                    lastname: staff[0]['lastname'],
                    othername: staff[0]['othername'],
                    username: staff[0]['username'],
                    password: staff[0]['password'],
                    phone: staff[0]['phone'],
                    date: staff[0]['dateJoined'],
                    auth: staff[0]['staffAuth'],
                    confirmed: staff[0]['confirmed']
                }
                
                io.emit("staffLoginSuccess", { mStaff });               
            } else {
                io.emit("staffLoginErrorr", { });
            }
        });   
    });
    io.on('staffRegister', inData => {
        Staff.find({
            firstname: inData.gatewayData.fName,
            lastname: inData.gatewayData.lName,
            phone: inData.gatewayData.phone,
        }).exec((err, staff) => {
            if(err) throw err;
            
            let len = staff.length;
            
            if(len > 0){                
                io.emit("staffRegExistingAccount", {});                
            } else {
                //save user to the database
                connect.then(db => {
                    let newUser = new Staff({
                        firstname: inData.gatewayData.fName,
                        lastname: inData.gatewayData.lName,
                        othername: inData.gatewayData.oName,
                        username: inData.gatewayData.user,
                        phone: inData.gatewayData.phone,
                        password: inData.gatewayData.pass,
                        email: inData.gatewayData.email
                    });
            
                    newUser.save(function(err, staff){
                        if(err){
                            let newStaff = {
                                status: 501
                            }
                            io.emit("staffRegisterFeedback", { newStaff });
                            throw err;
                        } else{
                            //return user details
                            let newStaff = {
                                // id: staff._id,
                                // fname: staff.firstname,
                                // oName: staff.othername,
                                // lName: staff.lastname,
                                // uname: staff.username,
                                // phone: staff.phone,
                                // auth: staff.staffAuth,
                                // confirmed: staff.confirmed,
                                status: 200
                            }          
                            io.emit("staffRegisterFeedback", { newStaff });                  
                        }                        
                    });                
                });
            }
        });   
    });
});



http.listen(port, () => {
    console.log("Running on Port: " + port);
});