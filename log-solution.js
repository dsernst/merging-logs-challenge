var Log = require("./Logs").Log;
var Printer = require("./Logs").Printer;

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

var Queue = require('data-structures').Queue;

var mergeSortByProperty = function (array, propertyName) {
  if (array.length === 1) {
    return array.slice();
  }

  var split = Math.floor(array.length / 2);
  var left = array.slice(0, split);
  var right = array.slice(split);

  left = mergeSortByProperty(left, propertyName);
  right = mergeSortByProperty(right, propertyName);

  var sorted = [];
  while (left.length > 0 || right.length > 0) {
    if (left.length === 0) {
      sorted.push(right.shift());
    } else if (right.length === 0 || left[0][propertyName] <= right[0][propertyName]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  return sorted;
};

var syncSortedMerge = function (logs) {
    var unfinishedLogSources = logs.slice();
    var unsortedRecentLogs;

    while (true) {
      console.log('new loop \n');
      unsortedRecentLogs = [];
      // get the newest log from each of our unfinished log sources
      unfinishedLogSources.forEach(function (log, index) {
        if (log.done) {
          // unfinishedLogSources.pop();
          // this log source is all finished, splice it out
          console.log('finished: ', index);
          unfinishedLogSources.splice(index, 1);
          return;
        }
        unsortedRecentLogs.push(log.pop());
      });

      // console.log(unsortedRecentLogs);
      mergeSortByProperty(unsortedRecentLogs, 'date').forEach(function (log) {
        printer.print(log);
      });
    }
  };

syncSortedMerge(logs);
// printer.print(logs);

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
