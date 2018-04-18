"use strict";

// Food is a base class
class Group {

    constructor (obj) {
        this.cid = obj.cid;
        this.name = obj.name;
        this.description = obj.description;
        this.disable = obj.disable;
        this.parentCid = obj.parentCid != undefined ? obj.parentCid  : null;
        this.topic_count = obj.topic_count;
        this.post_count = obj.post_count;
        this.order = obj.order;
        this.numRecentReplies = obj.numRecentReplies;
        this.totalPostCount = obj.totalPostCount;
        this.totalTopicCount = obj.totalTopicCount;
        this.children = getChildren(obj);
    }
}
function getChildren(obj)
{
    var result = [];

    if (obj.children != undefined) {
        for (let i = 0; i < obj.children.length; i++) {
            result.push(new Group(obj.children[i]));
        }
    }
    return result;
}
module.exports = Group;