# Reddit-Sentiment

Web App that takes in a live stream from Reddit and analyzes keywords for sentiment using the sentiment package from npm. The data is then graphed using react-easy-charts. React framework is being used.

Hosted on Heroku: Check out the working link on Heroku. (The app will take a 10-20 seconds to wake up because of how Heroku works).
You also need to give a few seconds for the reddit api to wake up as well. Comments will stop being streamed after 100 seconds since I don't want to throttle reddit's servers.

EDIT: I just noticed Heroku failed to update the app in it's pipeline and that it is no longer pointing to the master branch and instead one of the initial versions. I'll take this opportunity to rewrite the app with newer React features such as hooks, and in general writing the app in a cleaner style with all that I've learned these past 2 years . For now, the link you see below will take you to a visually barebones application, but with all the functionality still intact. Will update as time permits with classes, work, etc.

https://aqueous-retreat-72108.herokuapp.com/
