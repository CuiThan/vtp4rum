"use strict";
var User = require('../business_object/user')
var Post = require('../business_object/post')
var Tag = require('../business_object/tag')
var Group = require('../business_object/group')
var Pagination = require('../business_object/pagination')

// Food is a base class
class Topic {

    constructor (obj) {
        this.viewcount = obj.viewcount;
        this.title = obj.title;
        this.pinned = obj.pinned;
        this.locked = obj.locked;
        this.lastposttime = obj.lastposttime;
        this.deleted = obj.deleted;
        this.timestamp = obj.timestamp;
        this.mainPid = obj.mainPid;
        this.tid = obj.tid;
        this.teaserPid = obj.teaserPid;
        this.cid = obj.cid;
        this.uid = obj.uid;
        this.postcount = obj.postcount;
        this.liked = obj.upvotes
        this.titleRaw = obj.titleRaw;
        this.timestampISO = obj.timestampISO;
        this.lastposttimeISO = obj.lastposttimeISO;
        this.tags = getTopicTags(obj);
        this.posts = getTopicPost(obj);
        this.category = getTopicCategory(obj);
        this.pagination = getPagination(obj);
        this.user = new User(obj);
    }
}
function getTopicTags(obj)
{
    var result = [];
    if (obj.tags != undefined) {
        for (let i = 0; i < obj.tags.length; i++) {
            result.push(new Tag(obj.tags[i]));
        }
    }
    return result;
}
function getTopicPost(obj)
{
    var result = [];
    if (obj.posts != undefined) {
        for (let i = 0; i < obj.posts.length; i++) {
            result.push(new Post(obj.posts[i]));
        }
    }
    return result;
}
function getTopicCategory(obj)
{
    var result = null;
    if (obj.category != undefined) {
        result = new Group(obj.category);
    }
    return result;
}

function getPagination(obj)
{
    var result = null;
    if (obj.pagination != undefined) {
        result = new Pagination(obj.pagination);
    }
    return result;
}

module.exports = Topic;