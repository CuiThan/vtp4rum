"use strict";

var User = require('../business_object/user')

// Food is a base class
class TopicList {
    constructor (obj) {
        this.tid = obj.tid;
        this.uid = obj.uid;
        this.cid = obj.cid;
        this.mainPid = obj.mainPid;
        this.title = obj.title;
        this.timestamp = obj.timestamp;
        this.lastposttime = obj.lastposttime;
        this.postcount = obj.postcount;
        this.viewcount = obj.viewcount;
        this.locked = obj.locked;
        this.deleted = obj.deleted;
        this.pinned = obj.pinned;
        this.teaserPid = obj.teaserPid;
        this.titleRaw = obj.titleRaw;
        this.timestampISO = obj.timestampISO;
        this.lastposttimeISO = obj.lastposttimeISO;

        this.category = new Object();
        this.category.cid = obj.category.cid;
        this.category.name = obj.category.name;

        this.user = new User(obj.user);
        //this.user.uid = obj.user.uid;
        //this.user.username = obj.user.username;
        //this.user.reputation = obj.user.reputation;
        //this.user.status = obj.user.status;
        //this.user.postcount = obj.user.postcount;
        //this.user.picture = obj.user.picture;
        //this.user.iconText = obj.user["icon:text"];
        //this.user.iconBGColor = obj.user["icon:bgColor"];

        if (obj.teaser != undefined) {
            this.teaser = new Object();
            this.teaser.pid = obj.teaser.pid;
            this.teaser.uid = obj.teaser.uid;
            this.teaser.timestamp = obj.teaser.timestamp;
            this.teaser.tid = obj.teaser.tid;
            this.teaser.content = obj.teaser.content;
            this.teaser.timestampISO = obj.teaser.timestampISO;
            this.teaser.index = obj.teaser.index;

            this.teaser.user = new User(obj.teaser.user);
            //this.teaser.user.uid = obj.teaser.user.uid;
            //this.teaser.user.username = obj.teaser.user.username;
            //this.teaser.user.picture = obj.teaser.user.picture;
            //this.teaser.user.iconText = obj.teaser.user["icon:text"];
            //this.teaser.user.iconBGColor = obj.teaser.user["icon:bgColor"]
        }
        this.tags = obj.tags;
        this.isOwner = obj.isOwner;
        this.ignored = obj.ignored;
        this.unread = obj.unread;
        this.bookmark = obj.bookmark;
        this.unreplied = obj.unreplied;
        this.votes = obj.votes;
    }
}
module.exports = TopicList;