'use strict';

//App Variables
var Alexa = require('alexa-sdk');
var APP_ID = ""; //We'll come back to this later
var SKILL_NAME = 'Wake up Leah';

//List of compliments to be later given in a random order
var COMMENT_LIST = [
    "I need 2 minutes of bliss",
    "Just 2 more minutes",
    "Why do bad things happen to good people?",
    "This is BS, you don't even have a job",
    "Why did I marry a poor person?"
    ];

//Setup
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//Intent handlers that can be triggered.
var handlers = {
    'LaunchRequest': function () {
      // Output
      var speechOutput = "You can ask leah to wake up or, you can say exit... What can I help you with?";
      var reprompt = "What can I help you with?";
      this.emit(':ask', speechOutput, reprompt);
    },
    /*
        When a user says a recognised phrase to Alexa the GetComplimentIntent is triggered
        This picks a random compliment from the array above and emits the :tellWithCard event.
        This event shows a card within the Amazon Echo app, and outputs the speech from speechOutput.
    */
    'WakeUpIntent': function () {
        this.emit('GetCompliment');
    },
    'GetAlyssaIntent': function () {
        this.emit('GetAlyssa');
    },
    'GetCompliment': function () {
        // Get a random compliment from the COMPLIMENTS_LIST array
        var commentIndex = Math.floor(Math.random() * COMMENT_LIST.length);
        var randomComment = COMMENT_LIST[commentIndex];

        // Output
        var speechOutput = randomComment;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomCompliment)
    },

    'GetAlyssa': function () {

        // Output
        var speechOutput = "you should put some plastic sheets down before she voms everywhere!"

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
    },

    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask leah to wake up or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
