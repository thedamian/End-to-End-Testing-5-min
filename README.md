# Notes for the End-to-End tests in 5 Minutes Presentation

## Urls used in the presentation
- https://developer.chrome.com/docs/devtools/recoreder
- https://coffee-cart.netlify.app/
- https://chat.floridajs.com


## Steps of the presentation
1) Go to the website or go to google
2) Open recoreder
3) give new name and start
4) do your website
5) Notice it's recording
6) complete and stop
7) reply and notice you can slow or fast replay
8) expand each Steps
9) you can remove or add a Steps
10) add a stap. Click on a new Steps
11) type to "click" then use "selector picker"
12) export JSON, REPLY and normal NODE
13) cancel reply each time
14) click the steps to pause 
15) resume execution or one step at a time
16) hover didn't record 
17) add a step, change type "hover" and selector picker
18) device type can be mouse, pen or touch
19) assertion "wait for element" or "wait for expression"
20) wait for element. Select selctor picker (edit) 
21) operator 
22) count to 1
30 "wait for expression" is javascript expression 


export otions;<BR>
npm libraries<BR>
npm install puppeteer @puppeteer/replay --save<BR>

npx @puppeteer/replay test-*.json or specific json