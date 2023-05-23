const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
  test('titleConverter test', function () {
    assert.equal(
      translator.translate(
        'Mangoes are my favorite fruit.',
        'American to British'
      ),
      'Mangoes are my favourite fruit.'
    );
    assert.equal(
      translator.translate(
        'I ate yogurt for breakfast.',
        'American to British'
      ),
      'I ate yoghurt for breakfast.'
    );
    assert.equal(
      translator.translate(
        "We had a party at my friend's condo.",
        'American to British'
      ),
      "We had a party at my friend's flat."
    );
    assert.equal(
      translator.translate(
        'Can you toss this in the trashcan for me?',
        'American to British'
      ),
      'Can you toss this in the bin for me?'
    );
    assert.equal(
      translator.translate('The parking lot was full.', 'American to British'),
      'The car park was full.'
    );
    assert.equal(
      translator.translate(
        'Like a high tech Rube Goldberg machine.',
        'American to British'
      ),
      'Like a high tech Heath Robinson device.'
    );
    assert.equal(
      translator.translate(
        'To play hooky means to skip class or work.',
        'American to British'
      ),
      'To bunk off means to skip class or work.'
    );
    assert.equal(
      translator.translate(
        'No Mr. Bond, I expect you to die.',
        'American to British'
      ),
      'No Mr Bond, I expect you to die.'
    );
    assert.equal(
      translator.translate(
        'Dr. Grosh will see you now.',
        'American to British'
      ),
      'Dr Grosh will see you now.'
    );
    assert.equal(
      translator.translate('Lunch is at 12:15 today.', 'American to British'),
      'Lunch is at 12:15 today.'
    );

    assert.equal(
      translator.translate(
        'We watched the footie match for a while.',
        'British to American'
      ),
      'We watched the soccer match for a while.',
      'to American working'
    );
    assert.equal(
      translator.translate(
        'Paracetamol takes up to an hour to work.',
        'British to American'
      ),
      'Tylenol takes up to an hour to work.',
      'to American working'
    );
    assert.equal(
      translator.translate(
        'First, caramelise the onions.',
        'British to American'
      ),
      'First, caramelize the onions.',
      'to American working'
    );
    assert.equal(
      translator.translate(
        'I spent the bank holiday at the funfair.',
        'British to American'
      ),
      'I spent the public holiday at the carnival.',
      'to American working'
    );
    assert.equal(
      translator.translate(
        'I had a bicky then went to the chippy.',
        'British to American'
      ),
      'I had a cookie then went to the fish-and-chip shop.',
      'to American working'
    );
    assert.equal(
      translator.translate(
        "I've just got bits and bobs in my bum bag.",
        'British to American'
      ),
      "I've just got odds and ends in my fanny pack.",
      'to American working'
    );
    assert.equal(
      translator.translate(
        'The car boot sale at Boxted Airfield was called off.',
        'British to American'
      ),
      'The swap meet at Boxted Airfield was called off.',
      'to American working'
    );
    assert.equal(
      translator.translate('Have you met Mrs Kalyani?', 'British to American'),
      'Have you met Mrs. Kalyani?',
      'to American working'
    );
    assert.equal(
      translator.translate(
        "Prof Joyner of King's College, London.",
        'British to American'
      ),
      "Prof. Joyner of King's College, London.",
      'to American working'
    );
    assert.equal(
      translator.translate(
        'Tea time is usually around 4 or 4.30.',
        'British to American'
      ),
      'Tea time is usually around 4 or 4.30.',
      'to American working'
    );
  });
});
