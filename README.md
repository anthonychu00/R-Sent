# Reddit-Sentiment

Web App that takes in a live stream from Reddit and analyzes keywords for sentiment using the sentiment package from npm. The data is then graphed using plotly. React framework is being used.

Working: Comments are successfully being streamed and keywords are being searched, so the main functions are in place.

Current Issue(s): Plotly graphs from JS don't dynamically update properly since you can't use plotly.restyle in react apps.
Links from reddit (you can put in links in your reddit comments for non-redditors out there) aren't purged and look ugly. Parsing links with regex is the likely solution.

Hosted on Heroku: Check out the working link on Heroku. (The app will take a 10-20 seconds to wake up because of how Heroku works).

https://aqueous-retreat-72108.herokuapp.com/


