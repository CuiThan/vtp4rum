var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Setting = require('../common/Setting')

var VerifyToken = require('../auth/VerifyToken');
var requestPromise = require('request-promise');
var request = require('request');

var Group = require('../business_object/group');
var TopicCategory =require('../business_object/topic_category');
var Topic =require('../business_object/topic');
var VTP4rumCommonAPI = require('./CommonAPI')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/getgroup',VerifyToken, function(req, res) {
    var  curentUser = new Object();
    curentUser.uid = 1;

    var options = {
        uri: Setting.BASE_URL + Setting.GET_GROUP,
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        body : {
            '_uid': curentUser.uid,
        },
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(function (repos) {
            var result = [];

            for (let i = 0; i < repos.categories.length; i++) {
                result.push(new Group(repos.categories[i]));
            }

            res.status(200).send(result);
        })
        .catch(function (err) {
            res.status(200).send(err);
        });
});

router.post('/get_topics_by_group',VerifyToken, function(req, res) {
    //var curentUser = getUserByEmail(req.body.email);
    var  curentUser = new Object();
    curentUser.uid = 1;

    if (req.body.cid == undefined)
    {
        res.status(200).send('GroupId is required!!!');
        return;
    }
    if (req.body.pageIndex == undefined)
    {
        res.status(200).send('PageIndex is required!!!');
        return;
    }

    var options = {
        uri: Setting.BASE_URL + Setting.GROUP_POST + req.body.cid,
        qs :{
            'page' : req.body.pageIndex
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        body : {
          '_uid': curentUser.uid,
        },
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(function (repos) {
            var result = new TopicCategory(repos);

            res.status(200).send(result);
        })
        .catch(function (err) {
            var errMsg = new Object();
            errMsg.name = err.name;
            errMsg.statusCode = err.statusCode;
            errMsg.message = err.message;
            errMsg.error = err.error;

            res.status(200).send(errMsg);
        });
});

router.post('/get_topic',VerifyToken, function(req, res) {
    //var curentUser = getUserByEmail(req.body.email);
    var  curentUser = new Object();
    curentUser.uid = 1;

    if (req.body.tid == undefined)
    {
        res.status(200).send('TopicId is required!!!');
        return;
    }
    if (req.body.pageIndex == undefined)
    {
        res.status(200).send('PageIndex is required!!!');
        return;
    }

    var options = {
        uri: Setting.BASE_URL + Setting.GET_TOPIC + req.body.tid,
        qs :{
            'page' : req.body.pageIndex
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization' : Setting.BEARER_TOKEN
        },
        body : {
            '_uid': curentUser.uid,
        },
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(function (repos) {
            var result = new Topic(repos);

            res.status(200).send(result);
        })
        .catch(function (err) {
            var errMsg = new Object();
            errMsg.name = err.name;
            errMsg.statusCode = err.statusCode;
            errMsg.message = err.message;
            errMsg.error = err.error;

            res.status(200).send(errMsg);
        });
});

router.post('/create_topic',VerifyToken, function(req, res) {
    if (req.body.email == undefined)
    {
        res.status(200).send('Email is required!!!');
        return;
    }
    VTP4rumCommonAPI.getUserByEmail(req, createTopic, res);
});

router.post('/post_topic',VerifyToken, function(req, res) {
    if (req.body.email == undefined)
    {
        res.status(200).send('Email is required!!!');
        return;
    }

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
            var  curentUser = new Object();
            curentUser.uid = repos.uid;

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

            if (req.body.toPid != undefined)
            {
                jsonBody = {
                    _uid: curentUser.uid,
                    content : req.body.content,
                };
            }
            else {
                jsonBody = {
                    _uid: curentUser.uid,
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
            })
                .then(function (repos) {
                    res.status(200).send(repos);
                })
                .catch(function (err) {
                    var errMsg = new Object();
                    errMsg.name = err.name;
                    errMsg.statusCode = err.statusCode;
                    errMsg.message = err.message;
                    errMsg.error = err.error;

                    res.status(200).send(errMsg);
                });
        }).catch(function (err) {
            return err;
        });
});

router.post('/like',VerifyToken, function(req, res) {
    if (req.body.email == undefined)
    {
        res.status(200).send('Email is required!!!');
        return;
    }

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
            var  curentUser = new Object();
            curentUser.uid = repos.uid;

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
                _uid: curentUser.uid,
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
            })
                .then(function (repos) {
                    res.status(200).send(repos);
                })
                .catch(function (err) {
                    var errMsg = new Object();
                    errMsg.name = err.name;
                    errMsg.statusCode = err.statusCode;
                    errMsg.message = err.message;
                    errMsg.error = err.error;

                    res.status(200).send(errMsg);
                });
        }).catch(function (err) {
            return err;
        });

});


module.exports = router;
