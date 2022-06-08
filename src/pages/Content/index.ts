import { messagesHandler } from './modules/messages-handler';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

messagesHandler();
