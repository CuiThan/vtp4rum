var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Setting = require('../common/Setting')

var request = require('request');
var requestPromise = require('request-promise');

var create4rumAccount = function (req, callback, orgRes) {
    var jsonBody = {
        _uid: 1,
        username : req.body.email.replace(/@[^@]+$/, ''),
        password : req.body.email,
        email : req.body.email
    }
    requestPromise({
        url: Setting.BASE_URL + Setting.FORUM_CREATE_USER_URL,
        method: "POST",
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.FORUM_TOKEN
        },
        json: true,   // <--Very important!!!
        body: jsonBody
    }).then(function (repos) {
        if (repos.code == 'ok') {
            callback(req, repos.payload.uid, orgRes);
        }
    }).catch(function (err) {
        var errMsg = new Object();
        errMsg.name = err.name;
        errMsg.statusCode = err.statusCode;
        errMsg.message = err.message;
        errMsg.error = err.error;
    });
};

var getUserByEmail = function (req, callback, orgRes) {
    var options = {
        uri: Setting.BASE_URL + Setting.GET_USER + req.body.email,
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        body : {
            '_uid' : 1,
        },
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(function (repos) {
            callback(req, repos.uid, orgRes);
        })
        .catch(function (err) {
            if (err.statusCode == 404){
                //khong tim thấy acc -> tạo acc
                create4rumAccount(req, callback, orgRes);
            };
        });
};

var createTopic = function (req, uid, orgRes) {
    if (req.body.cid == undefined)
    {
        orgRes.status(200).send('GroupId is required!!!');
        return;
    }
    if (req.body.title == undefined)
    {
        orgRes.status(200).send('Topic Title is required!!!');
        return;
    }
    if (req.body.content == undefined)
    {
        orgRes.status(200).send('Topic content is required!!!');
        return;
    }

    var jsonBody = {
        _uid: uid,
        cid : req.body.cid,
        title : req.body.title,
        content : req.body.content,
    };

    requestPromise({
        url: Setting.BASE_URL + Setting.CREATE_TOPIC,
        method: "POST",
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        json: true,   // <--Very important!!!
        body: jsonBody
    }).then(function (repos) {
        orgRes.status(200).send(repos);
    }).catch(function (err) {
        var errMsg = new Object();
        errMsg.name = err.name;
        errMsg.statusCode = err.statusCode;
        errMsg.message = err.message;
        errMsg.error = err.error;
        orgRes.status(200).send(errMsg);
    });

};

var postTopic = function (req, uid, orgRes) {
    if (req.body.tid == undefined)
    {
        res.status(200).send('TopicId is required!!!');
        return;
    }
    if (req.body.content == undefined)
    {
        res.status(200).send('Topic content is required!!!');
        return;
    }

    var jsonBody = {};

    if (req.body.toPid == undefined)
    {
        jsonBody = {
            _uid: uid,
            content : req.body.content,
        };
    }
    else {
        jsonBody = {
            _uid: uid,
            toPid : req.body.toPid,
            content : req.body.content,
        };
    };

    requestPromise({
        url: Setting.BASE_URL + Setting.CREATE_TOPIC + req.body.tid,
        method: "POST",
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        json: true,   // <--Very important!!!
        body: jsonBody
    }).then(function (repos) {
        orgRes.status(200).send(repos);
    }).catch(function (err) {
        var errMsg = new Object();
        errMsg.name = err.name;
        errMsg.statusCode = err.statusCode;
        errMsg.message = err.message;
        errMsg.error = err.error;

        orgRes.status(200).send(errMsg);
    });
};

var topicLike = function (req, uid, orgRes) {
    if (req.body.pid == undefined)
    {
        res.status(200).send('PostId is required!!!');
        return;
    }
    if (req.body.delta == undefined)
    {
        res.status(200).send('Delta is required!!!');
        return;
    }
    var  jsonBody = {
        _uid: uid,
        delta : req.body.delta,
    };

    requestPromise({
        url: Setting.BASE_URL + Setting.POST + req.body.pid + '/vote',
        method: "POST",
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        json: true,   // <--Very important!!!
        body: jsonBody
    }).then(function (repos) {
        orgRes.status(200).send(repos);
    }).catch(function (err) {
        var errMsg = new Object();
        errMsg.name = err.name;
        errMsg.statusCode = err.statusCode;
        errMsg.message = err.message;
        errMsg.error = err.error;

        orgRes.status(200).send(errMsg);
    });
};

var VTP4rumCommonAPI = {
    create4rumAccount : create4rumAccount,
    getUserByEmail : getUserByEmail,
    createTopic : createTopic,
    postTopic : postTopic,
    topicLike : topicLike
};

module.exports = VTP4rumCommonAPI;
