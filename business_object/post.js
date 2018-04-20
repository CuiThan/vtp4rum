"use strict";
var User = require('../business_object/user')

// Food is a base class
class Post {

    constructor (obj) {
        this.editor = obj.editor;
        this.deleted = obj.deleted;
        this.votes = obj.votes;
        this.timestamp = obj.timestamp;
        this.tid = parseInt(obj.tid);
        this.content = obj.content;
        this.pid = obj.pid;
        this.edited = obj.edited;
        this.uid = obj.uid;
        this.liked = obj.upvotes;
        this.timestampISO = obj.timestampISO;
        this.editedISO = obj.editedISO;
        this.index = obj.index;
        this.user = new User(obj.user);
    }
}

module.exports = Post;