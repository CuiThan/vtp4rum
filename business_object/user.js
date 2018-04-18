"use strict";

// Food is a base class
class User {

    constructor (obj) {
        this.uid = obj.uid;
        this.username = obj.username;
        this.picture = obj.picture;
        this.iconText = obj["icon:text"];
        this.iconBGColor = obj["icon:bgColor"];
        this.reputation = obj.reputation != undefined ? obj.reputation : null;
        this.status = obj.status != undefined ? obj.status : null;
        this.postcount = obj.postcount != undefined ? obj.postcount : null;
        this.lastonlineISO = obj.lastonlineISO != undefined ? obj.lastonlineISO : null;
        this.custom_profile_info = obj.custom_profile_info != undefined ? obj.custom_profile_info : null;
    }
}
module.exports = User;