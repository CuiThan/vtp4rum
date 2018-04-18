"use strict";

// Food is a base class
class Tag {

    constructor (obj) {
        this.value = obj.value;
        this.valueEscaped = obj.valueEscaped;
    }
}
module.exports = Tag;