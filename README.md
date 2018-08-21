# Reddit-Sentiment

Web App that takes in a live stream from Reddit and analyzes keywords for sentiment using the sentiment package from npm. The data is then graphed using plotly. React framework is being used.

Working: Comments are successfully being streamed and keywords are being searched, so the main functions are in place.

Current Issue(s): Plotly graphs from JS don't dynamically update properly since you can't use plotly.restyle in react apps.
Links from reddit (you can put in links in your reddit comments for non-redditors out there) aren't purged and look ugly. Parsing links with regex is the likely solution.

Hosted on Heroku: Check out the working link on Heroku. (The app will take a 10-20 seconds to wake up because of how Heroku works).
You also need to give a few seconds for the reddit api to wake up as well. Comments will stop being streamed after 100 seconds since I don't want to throttle reddit's servers. Will add a "stop streaming" button, but that's low priority.

https://aqueous-retreat-72108.herokuapp.com/


