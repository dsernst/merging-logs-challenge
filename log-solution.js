var Log = require("./Logs").Log,
    Printer = require("./Logs").Printer;

/**
 * Challenge Number 1!
 */

/*
 A Log only has one method: pop() which will return an object with a 'date' and 'msg'.
 Log records are guaranteed to be in chronological order.
 Eventually a Log will end and return boolean FALSE.

 Use 'printer.print(log)' to print each record of the merged output as they are ready.
 This function will ensure that what you print is in fact in chronological order.
 */

var printer = new Printer();
var logs = [
    new Log(),
    new Log(),
    new Log(),
    new Log(),
    new Log()
];

var syncSortedMerge = function (logs) {

};

syncSortedMerge(logs);

/**
 * Challenge Number 2!
 */

/*
 A Log only has one method: popAsync() which will call a callback with signature (err, log) where log is an object with a 'date' and a 'msg'.
 Log records are guaranteed to be in chronological order.
 Eventually a Log will end and callback with (err, false);
 */

var printer = new Printer();
var asyncLogs = [
    new Log(),
    new Log(),
    new Log(),
    new Log(),
    new Log()
];

var asyncSortedMerge = function (logs) {

};

asyncSortedMerge(asyncLogs);
