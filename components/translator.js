const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  titleConverter(text, locale) {
    let returnText = text;
    let lowerText = returnText.toLowerCase();
    if (locale === 'british-to-american') {
      // For each title
      for (const [amer, brit] of Object.entries(americanToBritishTitles)) {
        // Find the first position of a match if there is one
        let regex = new RegExp(brit + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in returnText with the American title
          returnText =
            returnText.slice(0, position) +
            '<span class="highlight">' +
            amer.slice(0, 1).toUpperCase() +
            amer.slice(1) +
            '</span>' +
            returnText.slice(position + brit.length);
          // Update lowerText
          lowerText = returnText.toLowerCase();
          // Check if there are any more matches for this title in returnText
          position = lowerText.indexOf(brit + ' ');
        }
      }
      return returnText;
    }
    if (locale === 'american-to-british') {
      // For each title
      for (const [amer, brit] of Object.entries(americanToBritishTitles)) {
        // Find the first position of a match if there is one
        let regex = new RegExp(amer + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in returnText with the American title
          returnText =
            returnText.slice(0, position) +
            '<span class="highlight">' +
            brit.slice(0, 1).toUpperCase() +
            brit.slice(1) +
            '</span>' +
            returnText.slice(position + amer.length);
          // Update lowerText
          lowerText = returnText.toLowerCase();
          // Check if there are any more matches for this title in returnText
          position = lowerText.indexOf(amer);
        }
      }
    }
    return returnText;
  }
  spellingSwap(text, locale) {
    let returnText = text;
    let lowerText = returnText.toLowerCase();
    if (locale === 'american-to-british') {
      //Create an array of keys in descending length order
      let descendingKeys = Object.keys(americanToBritishSpelling).sort(
        function (a, b) {
          return b.length - a.length;
        }
      );
      // Loop for every entry in descendingKeys length
      for (let i = 0; i < descendingKeys.length; i++) {
        let amer = descendingKeys[i];
        let brit = americanToBritishSpelling[amer];
        // Find the first position of a match if there is one
        let regex = new RegExp(amer + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in returnText with the American title
          returnText =
            returnText.slice(0, position) +
            '<span class="highlight">' +
            brit +
            '</span>' +
            returnText.slice(position + amer.length);
          // Update lowerText
          lowerText = returnText.toLowerCase();
          // Check if there are any more matches for this title in returnText
          position = lowerText.indexOf(amer);
        }
      }
    }
    if (locale === 'british-to-american') {
      // Create reversed object britishTo... so that we can sort array by length & reference the object using the key
      let britishToAmericanSpelling = {};
      for (const [amer, brit] of Object.entries(americanToBritishSpelling)) {
        britishToAmericanSpelling[brit] = amer;
      }
      //Create an array of keys in descending length order
      let descendingKeys = Object.keys(britishToAmericanSpelling).sort(
        function (a, b) {
          return b.length - a.length;
        }
      );
      // Loop for every entry in descendingKeys length
      for (let i = 0; i < descendingKeys.length; i++) {
        let brit = descendingKeys[i];
        let amer = britishToAmericanSpelling[brit];
        // Find the first position of a match if there is one
        let regex = new RegExp(brit + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        if (position > -1) {
        }
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in returnText with the American title
          returnText =
            returnText.slice(0, position) +
            '<span class="highlight">' +
            amer +
            '</span>' +
            returnText.slice(position + brit.length);
          // Update lowerText
          lowerText = returnText.toLowerCase();
          // Check if there are any more matches for this title in returnText
          position = lowerText.indexOf(brit);
        }
      }
    }
    return returnText;
  }
  americanOnlyConvert(text, locale) {
    if (locale === 'british-to-american') {
      return text;
    }
    let returnText = text;
    let lowerText = returnText.toLowerCase();
    //Create an array of keys in descending length order
    let descendingKeys = Object.keys(americanOnly).sort(function (a, b) {
      return b.length - a.length;
    });
    // Loop for every entry in descendingKeys length
    for (let i = 0; i < descendingKeys.length; i++) {
      let amer = descendingKeys[i];
      let brit = americanOnly[amer];
      // Find the first position of a match if there is one
      let regex = new RegExp(amer + '{1}(?![a-zA-Z])');
      let position = lowerText.search(regex);
      // While there are matches for the current title in lowerText
      while (position > -1) {
        // Replace the title in returnText with the American title
        returnText =
          returnText.slice(0, position) +
          '<span class="highlight">' +
          brit +
          '</span>' +
          returnText.slice(position + amer.length);
        // Update lowerText
        lowerText = returnText.toLowerCase();
        // Check if there are any more matches for this title in returnText
        position = lowerText.indexOf(amer);
      }
    }
    return returnText;
  }

  britishOnlyConvert(text, locale) {
    if (locale === 'american-to-british') {
      return text;
    }
    let returnText = text;
    let lowerText = returnText.toLowerCase();
    //Create an array of keys in descending length order
    let descendingKeys = Object.keys(britishOnly).sort(function (a, b) {
      return b.length - a.length;
    });
    // Loop for every entry in descendingKeys length
    for (let i = 0; i < descendingKeys.length; i++) {
      let brit = descendingKeys[i];
      let amer = britishOnly[brit];
      // Find the first position of a match if there is one
      let regex = new RegExp(brit + '{1}(?![a-zA-Z])');
      let position = lowerText.search(regex);
      // While there are matches for the current title in lowerText
      while (position > -1) {
        // Replace the title in returnText with the American title
        returnText =
          returnText.slice(0, position) +
          '<span class="highlight">' +
          amer +
          '</span>' +
          returnText.slice(position + brit.length);
        // Update lowerText
        lowerText = returnText.toLowerCase();
        // Check if there are any more matches for this title in returnText
        position = lowerText.indexOf(brit);
      }
    }
    return returnText;
  }

  timeConvert(text, locale) {
    let returnText = text;
    let regex = /a/;
    let replacement = '';
    if (locale === 'american-to-british') {
      regex = /[0-9]{1,2}[:]{1}[0-9]{2}(?![0-9])/g;
      replacement = '.';
    }
    if (locale === 'british-to-american') {
      regex = /[0-9]{1,2}[.]{1}[0-9]{2}(?![0-9])/g;
      replacement = ':';
    }
    // Find the first position of a match if there is one
    let position = returnText.search(regex);
    // While there are matches for the current time in returnText
    while (position > -1) {
      let foundTime = returnText.match(regex)[0];
      // Replace the title in returnText with the American title
      returnText =
        returnText.slice(0, position) +
        '<span class="highlight">' +
        foundTime.slice(0, foundTime.length - 3) +
        replacement +
        foundTime.slice(foundTime.length - 2) +
        '</span>' +
        returnText.slice(position + foundTime.length);
      // Check if there are any more matches for this title in returnText
      position = returnText.search(regex);
    }
    return returnText;
  }

  translate(text, locale) {
    let returnText = text;
    returnText = this.titleConverter(text, locale);
    returnText = this.spellingSwap(returnText, locale);
    returnText = this.americanOnlyConvert(returnText, locale);
    returnText = this.britishOnlyConvert(returnText, locale);
    returnText = this.timeConvert(returnText, locale);
    if (returnText.slice(0, 1).match(/[a-z]/i)) {
      return returnText.slice(0, 1).toUpperCase() + returnText.slice(1);
    } else {
      return returnText;
    }
  }
}

module.exports = Translator;
