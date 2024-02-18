const { model } = require("mongoose");

class ErrorResponse extends Error{
    constructor(message, codeStatus){
        super(message);
        this.codeStatus = codeStatus;
    }
}

module.exports = ErrorResponse;