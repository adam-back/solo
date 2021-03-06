var ghostSentences = [];

var getStory = function(storyName) {
  var textURL = '../Text/' + storyName + '.txt';
  $.ajax({
    url: textURL,
    success: function(data) {
      var sentences = data.split('.');
      sentences.forEach(function(value, index, array) {
        ghostSentences.push(value + ".");
      });
    },
    error: function(error) {
      console.error('There was an error retrieving the story: ' + error);
    }
  });
};





$(document).ready(function() {
  //on page load, store a whole bunch of comments from a popular video on YouTube
  // page for commented videos http://vidstatsx.com/most-commented-videos-all-time
  
  //loads Siddhartha to begin with as default.
  getStory('Siddhartha');

  var addSentence = function(text) {
    // look for ending punctuation
    switch(text.charAt(text.length - 1)) {
      case '.':
        break;
      case '!':
        break;
      case '?':
        break;
      default: 
        // if no ending punctuation, add some
        text = text + ".";
    }

    var sentence = "<span class='userSentence'> " + text + "</span>"
    $('div.story').append(sentence);
  };

  var getRandomSentence = function() {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    var randomSentence = "";
    var sentenceIndex = getRandomArbitrary(0, ghostSentences.length -1)
    console.log(sentenceIndex);
    randomSentence = ghostSentences[sentenceIndex];
    console.log('string?', typeof randomSentence);
    return randomSentence;
  };  
  
  var writeMagically = function() {
    //randomly pick a ghost sentence
    var magicSentence = getRandomSentence();
    // make sure it does not include the words
    if(undesiredWords(magicSentence)) {
      //get a new sentence
      writeMagically();
    } else {
      addSentence(magicSentence);
    }
  };

  $("input[type='radio']").change(function() {
    //empty ghost sentences for new stuff.
    ghostSentences.splice(0, ghostSentences.length -1);
    getStory(this.value);
  });

  $('#submit').click(function(event) {
    event.preventDefault();
    var userSentence = $('#sentence').val()
    addSentence(userSentence);
    // Reset input field
    $('#sentence').val('');
    writeMagically();
  });

  $('#clear').click(function(event) {
    event.preventDefault();
    $('div.story').children().remove();
  });
});

var undesiredWords = function(sentence) {
  if(sentence.search("Chapter") >= 0 ||
    sentence.search("Siddhartha") >= 0 ||
    sentence.search("Katniss") >= 0 ||
    sentence.search("Govinda") >= 0 ||
    sentence.search("Kamala") >= 0 ||
    sentence.search('Gotama') >= 0 ||
    sentence.search("Peter") >= 0 ||
    sentence.search("Wendy") >= 0 ||
    sentence.search("Mr.") >= 0 ||
    sentence.search("Ms.") >= 0 ||
    sentence.search("Mrs.") >= 0 ||
    sentence.search("I") >= 0 ||
    sentence.length < 10 ||
    sentence.search(/\?/) >= 0 ){
    return true;
  } else {
    return false;
  }
};