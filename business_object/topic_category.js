"use strict";
var TopicList = require('../business_object/topic_list');

// Food is a base class
class TopicCategory {
    constructor (obj) {
        this.cid = obj.cid;
        this.name = obj.name;
        this.description = obj.description;
        this.order = obj.order;
        this.description = obj.description;
        this.topic_count = obj.topic_count;
        this.post_count = obj.post_count;
        this.numRecentReplies = obj.numRecentReplies;
        this.disabled = obj.disabled;
        this.totalPostCount = obj.totalPostCount;
        this.totalTopicCount = obj.totalTopicCount;
        this.topics = getTopics(obj);
    }
}
function getTopics(obj)
{
    var result = [];
    if (obj.topics != undefined) {
        for (let i = 0; i < obj.topics.length; i++) {
            result.push(new TopicList(obj.topics[i]));
        }
    }
    return result;
}
module.exports = TopicCategory;