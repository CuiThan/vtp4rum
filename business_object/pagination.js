"use strict";

// Food is a base class
class Pagination {

    constructor (obj) {
        this.currentPage = obj.currentPage;
        this.pageCount = obj.pageCount;
    }
}
module.exports = Pagination;