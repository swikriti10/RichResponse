"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const restService = express();

restService.use(
  bodyParser.urlencoded({
      extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/slack-test", function (req, res) {

    const url = `http://services.odata.org/V3/Northwind/Northwind.svc/Customers?$format=json`;
    
        var slack_message = {

            expect_user_response: true,
            rich_response: {
                items: [
                  {
                      simpleResponse: {
                          textToSpeech: "This is the first simple response for a basic card"
                      }
                  },
                  {
                      basicCard: {
                          title: "hi",
                          formattedText: "hi",
                          subtitle: "hi",

                          image: {
                              url: "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                              accessibilityText: "Image alternate text"
                          },
                          buttons: [
                            {
                                title: "This is a button",
                                openUrlAction: {
                                    url: "https://assistant.google.com/"
                                }
                            }
                          ]
                      }
                  },
                  {
                      simpleResponse: {
                          textToSpeech: "This is the 2nd simple response ",
                          displayText: "This is the 2nd simple response"
                      }
                  }
                ],
                suggestions:
                [
                  { "title": "Basic Card" },
                  { "title": "List" },
                  { "title": "Carousel" },
                  { "title": "Suggestions" }
                ]
            }

        };

        return res.json({
            speech: "",
            displayText: "",
            source: "webhook-echo-sample",
            data: {
                google: slack_message
            }
        });

    
    
});



restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});




