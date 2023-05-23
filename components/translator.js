const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  titleConverter(text, locale) {
    let lowerText = text.toLowerCase();
    if (locale === 'British to American') {
      // For each title
      for (const [amer, brit] of Object.entries(americanToBritishTitles)) {
        // Find the first position of a match if there is one
        let regex = new RegExp(brit + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in text with the American title
          text =
            text.slice(0, position) +
            amer.slice(0, 1).toUpperCase() +
            amer.slice(1) +
            text.slice(position + brit.length);
          // Update lowerText
          lowerText = text.toLowerCase();
          // Check if there are any more matches for this title in text
          position = lowerText.indexOf(brit + ' ');
        }
      }
      return text;
    }
    if (locale === 'American to British') {
      // For each title
      for (const [amer, brit] of Object.entries(americanToBritishTitles)) {
        // Find the first position of a match if there is one
        let regex = new RegExp(amer + '{1}(?![a-zA-Z])');
        let position = lowerText.search(regex);
        // While there are matches for the current title in lowerText
        while (position > -1) {
          // Replace the title in text with the American title
          text =
            text.slice(0, position) +
            brit.slice(0, 1).toUpperCase() +
            brit.slice(1) +
            text.slice(position + amer.length);
          // Update lowerText
          lowerText = text.toLowerCase();
          // Check if there are any more matches for this title in text
          position = lowerText.indexOf(amer);
        }
      }
    }
    return text;
  }
  spellingSwap(text, locale) {
    let lowerText = text.toLowerCase();
    if (locale === 'American to British') {
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
          // Replace the title in text with the American title
          text =
            text.slice(0, position) + brit + text.slice(position + amer.length);
          // Update lowerText
          lowerText = text.toLowerCase();
          // Check if there are any more matches for this title in text
          position = lowerText.indexOf(amer);
        }
      }
    }
    if (locale === 'British to American') {
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
          // Replace the title in text with the American title
          text =
            text.slice(0, position) + amer + text.slice(position + brit.length);
          // Update lowerText
          lowerText = text.toLowerCase();
          // Check if there are any more matches for this title in text
          position = lowerText.indexOf(brit);
        }
      }
    }
    return text;
  }
  americanOnlyConvert(text, locale) {
    if (locale === 'British to American') {
      return text;
    }
    let lowerText = text.toLowerCase();
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
        // Replace the title in text with the American title
        text =
          text.slice(0, position) + brit + text.slice(position + amer.length);
        // Update lowerText
        lowerText = text.toLowerCase();
        // Check if there are any more matches for this title in text
        position = lowerText.indexOf(amer);
      }
    }
    return text;
  }

  britishOnlyConvert(text, locale) {
    if (locale === 'American to British') {
      return text;
    }
    let lowerText = text.toLowerCase();
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
        // Replace the title in text with the American title
        text =
          text.slice(0, position) + amer + text.slice(position + brit.length);
        // Update lowerText
        lowerText = text.toLowerCase();
        // Check if there are any more matches for this title in text
        position = lowerText.indexOf(brit);
      }
    }
    return text;
  }

  translate(text, locale) {
    let returnText = text;
    returnText = this.titleConverter(text, locale);
    returnText = this.spellingSwap(returnText, locale);
    returnText = this.americanOnlyConvert(returnText, locale);
    returnText = this.britishOnlyConvert(returnText, locale);
    if (returnText.slice(0, 1).match(/[a-z]/i)) {
      return returnText.slice(0, 1).toUpperCase() + returnText.slice(1);
    } else {
      return returnText;
    }
  }
}

module.exports = Translator;
