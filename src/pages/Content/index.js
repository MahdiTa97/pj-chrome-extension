import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// Save location
let prevUrl = window.location.href;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case 'TabUpdated':
      if (document.location.href !== prevUrl) {
        prevUrl = document.location.href;
      }
      break;

    default:
      break;
  }
});
