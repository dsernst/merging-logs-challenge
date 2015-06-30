var Log = require("./Logs").Log;
var Printer = require("./Logs").Printer;
var Heap = require('heap');
var Promise = require('bluebird');

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
  // initially all log sources are unfinished
  var unfinishedLogSources = logs.slice();

  // but we can check as we process them to filter out the ones that finish
  function isUnfinished(log) {
    return !log.done;
  }

  // this reduceable function will process incoming logs from the Log Sources
  function grabMostRecentLogs(memo, log) {
    memo.push(log.pop());
    return memo;
  }

  // this heap will keep our logs min-sorted as we get them
  var newestLogsHeap = new Heap(function (a, b) {
    return a.date - b.date;
  });

  while (unfinishedLogSources.length > 0) {
    // prune our finished log sources to tell our while loop when to finish
    unfinishedLogSources = unfinishedLogSources.filter(isUnfinished);

    // get the newest logs from each of our log sources
    unfinishedLogSources.reduce(grabMostRecentLogs, newestLogsHeap);
  }

  // print out all of our sorted logs, with a little extra error handling
  var numPrinted = 0;
  try {
    while (!newestLogsHeap.empty()) {
      printer.print(newestLogsHeap.pop());
      // newestLogsHeap.pop(); // to see how many total logs there are, uncomment this line and comment out the one above
      numPrinted++;
    }
  } finally {
    console.log('\nSuccessfully printed ', numPrinted, ' logs synchronously\n');
  }
};

// syncSortedMerge(logs);

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
  // this promisified reduceable function will process incoming logs from the log sources
  function grabMostRecentLogsAsync(memo, log) {
    return new Promise(function (resolve, reject) {
      log.popAsync(function (error, singleLog) {
        if (error) {
          reject(error);
        }
        memo.push(singleLog);
        resolve(memo);
      });
    });
  }

  // this heap will keep our logs min-sorted as we get them
  var newestLogsHeap = new Heap(function (a, b) {
    return a.date - b.date;
  });

  function getMostRecentLogs(logs) {
    return new Promise(function (resolve) {
      // prune out the log sources that finished
      var unfinishedLogSources = logs.filter(function isUnfinished(log) {
        return !log.done;
      });

      // get the newest logs from each of our log sources
      Promise.reduce(unfinishedLogSources, grabMostRecentLogsAsync, newestLogsHeap)
        .then(function () {
          resolve();
        });

      if (unfinishedLogSources.length > 0) {
        try {
          getMostRecentLogs(unfinishedLogSources);
        } catch (e) {
          if (!(e instanceof RangeError)) {
            console.log(e);
          }
        }
      }
    });
  }

  getMostRecentLogs(logs)
    .then(function () {
      // print out all of our sorted logs, with a little extra error handling
      var numPrinted = 0;
      try {
        while (!newestLogsHeap.empty()) {
          printer.print(newestLogsHeap.pop());
          // newestLogsHeap.pop(); // to see how many total logs there are, uncomment this line and comment out the one above
          numPrinted++;
        }
      } finally {
        console.log('\nSuccessfully printed ', numPrinted, ' logs asynchronously\n');
      }
    });
};

asyncSortedMerge(asyncLogs);
