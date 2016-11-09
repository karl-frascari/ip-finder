# Avenue Code UI Challenge - Part I #

### Requiriments ###
Node.js - https://nodejs.org/en/


### Intructions to run ###
* 1 - Clone git repository -- git clone https://karlFrascari2@bitbucket.org/karlFrascari2/ui-challenge.git
* 2 - Install dependencies -- npm install
* 3 - Execute npm start to Gulp build the project -- npm start
* 4 - Access http://localhost:3000/
* 5 - To run tests, just type npm test and watch it output


###Frameworks###
React, Redux;
Bootstrap,
Less,
Lodash,
Mocha,
Chai,
Enzyme,
Gulp,
Browserfy,
Babel,
Node Express,
Gmaps,
Underscore


### Requirements###

* The new form input field should only accept website domains starting with "www."  or with the host name, e.g., "www.nytimes.com", "nytimes.com" or "g1.com.br" or "www.g1.com.br".
**Done trough Regex**


* When the user hits the Locate button, an asynchronous call should be made to http://ip-api.com/json/:host, where :host corresponds to the user input.
**Done with a custom http service that I usually use in ES6 to encapsulet fetch method e clearfy the code**


* If this async call is successful, a second panel must be rendered, below the form, displaying a map showing the website's physical location from the latitude and longitude coordinates of the JSON response.
**The second panel is created as a React Component to help organization and keep the SRP**


* When the user hits the existing My location button, his position must also be displayed on the map, **alone or besides a website location** if the user used that feature before.
**I used the same method getUrlLocation(selfLocation) passing a parameter to indicate if is selfLocation or not**


* When the user hits the Reset location button, the user location must be cleared off from the map (but the website's location should still be displayed, if any).
**In this feature I used lodash to help to filter self locations types values**


* You should handle user input and server response validations for all scenarios.
**Covered**


###Notes: ###
* I did not use jQuery to make a self challenge for me :)
* I did not apply the TDD aproach beacause you ask me to do another test and the deadline was to close, however I use to apply it in most of my projects.
* I coudn't finish the tests, however I setup Mocha, Chai and Enzyme frameworks and describide the scenarios.
* I usually use material desing instead of Bootstrap.