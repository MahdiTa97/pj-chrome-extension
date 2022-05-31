import { apiClient } from '../lib/utils';

let idRe = /(?:\/([a-z]{2}))?\/book\/(?:info|view)\/([^#?/]+)/;

// function attr(docOrElem, selector, attr, index) {
//   var elem = index
//     ? docOrElem.querySelectorAll(selector).item(index)
//     : docOrElem.querySelector(selector);
//   return elem ? elem.getAttribute(attr) : null;
// }

function trim(s) {
  if (typeof s != 'string') {
    throw new Error('trim: argument must be a string');
  }

  s = s.replace(/^\s+/, '');
  return s.replace(/\s+$/, '');
}

function trimInternal(s) {
  if (typeof s != 'string') {
    throw new Error('trimInternal: argument must be a string');
  }

  s = s.replace(/[\xA0\r\n\s]+/g, ' ');
  return trim(s);
}

function getSearchResults(doc, checkOnly) {
  var items = {};
  var found = false;
  var rows = doc.querySelectorAll(
    'a.book-link[href*="/book/"], a.book-title[href*="/book/"]'
  );
  for (let row of rows) {
    let href = row.href;
    let title = trimInternal(row.textContent);
    if (!href || !title) continue;
    if (checkOnly) return true;
    found = true;
    items[href] = title;
  }
  return found ? items : false;
}

export function detectWeb(doc, url) {
  if (idRe.test(url)) {
    return 'book';
  } else if (getSearchResults(doc, true)) {
    return 'multiple';
  } else if (url.includes('/search')) {
    doc.querySelector('.main-wrapper');
  }
  return false;
}

function isEmpty(obj) {
  for (var i in obj) return false;
  return true;
}

const isFx = false;
const isBookmarklet = true;

function helper(translate, items, callback) {
  if (isEmpty(items)) {
    throw new Error('Translator called selectItems with no items');
  }

  // Some translators pass an array rather than an object to Zotero.selectItems.
  // This will break messaging outside of Firefox, so we need to fix it.
  if (Array.isArray(items)) {
    items = Object.entries(items);
  }

  if (translate._selectedItems) {
    // if we have a set of selected items for this translation, use them
    return translate._selectedItems;
  } else if (translate._handlers.select) {
    // whether the handler operates asynchronously
    var haveAsyncHandler = false;
    var returnedItems = null;

    var callbackExecuted = false;
    // if this translator provides an async callback for selectItems, rig things
    // up to pop off the async process
    var newCallback = (selectedItems) => {
      callbackExecuted = true;
      try {
        callback(selectedItems);
      } catch (e) {
        translate.complete(false, e);
        return false;
      }
      if (haveAsyncHandler) translate.decrementAsyncProcesses('selectItems()');
    };

    var returnValue = translate._runHandler('select', items, newCallback);
    if (returnValue !== undefined) {
      // handler may have returned a value, which makes callback unnecessary

      returnedItems = returnValue;
      haveAsyncHandler = false;
    } else {
      // if we don't have returnedItems set already, the handler is asynchronous
      haveAsyncHandler = !callbackExecuted;
    }

    if (haveAsyncHandler) {
      // we are running asynchronously, so increment async processes
      translate.incrementAsyncProcesses('selectItems()');
    } else if (!callbackExecuted) {
      // callback didn't get called from handler, so call it here
      callback(returnedItems);
    }
    return false;
  } else {
    // no handler defined; assume they want all of them
    callback(items);
    return items;
  }
}

function selectItems(translate, items, callback) {
  if (callback) {
    return helper(translate, items, callback);
  } else {
    return new Promise((resolve) => helper(translate, items, resolve));
  }
}

function wrapDocument(doc, docURL) {
  let url = require('url');
  docURL = url.parse(docURL);
  docURL.toString = () => this.href;
  var wrappedDoc = new Proxy(doc, {
    get: function (t, prop) {
      if (prop === 'location') {
        return docURL;
      } else if (prop === 'evaluate') {
        // If you pass the document itself into doc.evaluate as the second argument
        // it fails, because it receives a proxy, which isn't of type `Node` for some reason.
        // Native code magic.
        return function () {
          if (arguments[1] === wrappedDoc) {
            arguments[1] = t;
          }
          return t.evaluate.apply(t, arguments);
        };
      } else {
        if (typeof t[prop] == 'function') {
          return t[prop].bind(t);
        }
        return t[prop];
      }
    },
  });
  return wrappedDoc;
}

async function processDocuments(urls, processor, options = {}) {
  // Handle old signature: urls, processor, onDone, onError
  if (typeof arguments[2] == 'function' || typeof arguments[3] == 'function') {
    var onDone = arguments[2];
    var onError = arguments[3];
  }

  if (typeof urls == 'string') urls = [urls];
  var funcs = urls.map((url) => async () => {
    const response = await apiClient(url, {
      method: 'GET',
      body: {
        responseType: 'document',
      },
    });
    var doc = wrapDocument(response, url);
    return processor(doc, url);
  });

  // Run processes serially
  // TODO: Add some concurrency?
  var f;
  var results = [];
  while ((f = funcs.shift())) {
    try {
      results.push(await f());
    } catch (e) {
      if (onError) {
        onError(e);
      }
      throw e;
    }
  }

  // Deprecated
  if (onDone) {
    onDone();
  }

  return results;
}

export function doWeb(doc, url) {
  if (detectWeb(doc, url) === 'multiple') {
    selectItems(getSearchResults(doc, false), function (items) {
      if (items) processDocuments(Object.keys(items), scrape);
    });
  } else {
    scrape(doc, url);
  }
}

function attr(docOrElem, selector, attr, index) {
  var elem = index
    ? docOrElem.querySelectorAll(selector).item(index)
    : docOrElem.querySelector(selector);
  return elem ? elem.getAttribute(attr) : null;
}

function lpad(string, pad, length) {
  string = string ? string + '' : '';
  while (string.length < length) {
    string = pad + string;
  }
  return string;
}

function strToISO(str) {
  var date = this.strToDate(str);

  if (date.year) {
    var dateString = lpad(date.year, '0', 4);
    if (parseInt(date.month) === date.month) {
      dateString += '-' + lpad(date.month + 1, '0', 2);
      if (date.day) {
        dateString += '-' + lpad(date.day, '0', 2);
      }
    }
    return dateString;
  }
  return false;
}

const doGet = (doc, lang) => {
  let newDate;
  let hijri = false;
  for (let dateElem of doc.querySelectorAll('[id^="publishYear"]')) {
    let date = dateElem.textContent;
    if (!hijri && date.includes('هجری')) {
      // hijri
      newDate += lang === 'en' ? ' AH' : 'هـ ';
      hijri = true;
    } else if (date.includes('میلادی')) {
      // miladi (gregorian)
      newDate = strToISO(date);
      break;
    }
  }
  console.log('=====> newDate <=====', newDate);

  // for (let creator of item.creators) {
  //   if (creator.fieldMode && creator.lastName.includes('،')) {
  //     let newCreator = ZU.cleanAuthor(
  //       creator.lastName.replace(/،/g, ','),
  //       creator.creatorType,
  //       true
  //     );
  //     delete creator.fieldMode;
  //     Object.assign(creator, newCreator);
  //   }
  // }
};
function scrape(doc, url) {
  let [, lang, id] = url.match(idRe);
  let risURL = attr(doc, '#refDownload > a[href*="RIS" i]', 'href');
  if (!risURL) {
    risURL = `/api/citation/getCitationFile?format=RIS&bookId=${id}&language=${lang}`;
  }
  console.log('=====> doc, lang, risURL <=====', doc, lang, risURL);
  doGet(doc, lang);
}

function isWrappable(x) {
  if (typeof x === 'object') return x !== null;
  return typeof x === 'function';
}

function isWrapper(x) {
  return isWrappable(x) && typeof x.SpecialPowers_wrappedObject !== 'undefined';
}

function SpecialPowersHandler(wrappedObject, overrides) {
  this.wrappedObject = wrappedObject;
  this.overrides = overrides ? overrides : {};
}

function wrapPrivileged(obj, overrides) {
  // Primitives pass straight through.
  if (!isWrappable(obj)) return obj;

  // No double wrapping.
  if (isWrapper(obj)) throw new Error('Trying to double-wrap object!');

  let dummy;
  if (typeof obj === 'function') dummy = function () {};
  else dummy = Object.create(null);

  return new Proxy(dummy, new SpecialPowersHandler(obj, overrides));
}

function wrap(obj, overrides) {
  if (isWrapper(obj)) return obj;
  return wrapPrivileged(obj, overrides);
}
