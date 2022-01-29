# Sprint 2 - *t04* - *Pink Panthers*

## Goal
### *More ways to add places to the trip.*

## Sprint Leader: 
### *Mari Dudek*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
Epic 1: Protocol find feature
We will add support for the find feature protocol. We will add the find request and find response files to 
the server side and client side schemas. We will build an API in Java to handle the request. We will 
also build tests to test the API. This will set up the back end so that we can make requests to find
a place in Epic 4.

Epic 2: Where am I?
We will get the user's current location. With that info, we will set the map to default to that location 
when the application starts. 
In this epic, we plan to create a button/icon that will return the map to the user's current location. 
Their current location will also have a marker stationed there and will appear in the history.

Epic 3: Where is?
This is where the user can enter latitude and longitude in two separate text boxes and click a go button to have the map move and marker placed to the desired place. This epic will also be able to handle bad values that the user inputs like letters when expected numbers and so on. This epic will also be able to to tell a user if the lat and long entered is not valid. The marker will also display the additional place details and will update the history with the desired location. 

Epic 4: Find Places
For find places, we will allow the user to be able to search for various things. We will design it to so that the user
can enter a string to match, a type, or a particular area. Their search results will pop up in a separate window and 
then the user can choose to add those to the location table. All of the search results they choose to add 
will be moved to the history and the marker will show the most recently added one.  


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *5* |
| Tasks |  *34*   | *34* | 
| Story Points |  *38*  | *38* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *2/10* | *0* | *2-copy over JSON files, build & ensure api...* | *Cleaning up our code* | 
| *2/12* | *5* | *5-update FindResponse/FindRequest, add ServerSeetings, find users location on start, add button* | *Learning tests* |
| *2/16* | *5* | *add testing cases to finish up Find Protocol Feature epic, add location to history on Find Me, troubleshoot  location & find button* |
| *2/17* | *2* | *about to finish up Where Am I? epic, add tests for find request, found, and places* | 
| *2/18* | *3* | *1-Where is Starting Point* | *Marker with extra details* |
| *2/22* | *6* | *1-Api call and all things Database* | *History pop up* |
| *2/24* | *1* | *1-Database stuff for find places epic* | *Cleaning up our code* |
| *2/25* | *4* | *N/A* | *Smells & duplications, incremental testing* | 


## Review

### Epics completed  
5 - Place details, Protocol Find Feature, Where am I?, Where is? and Find Places

### Epics not completed 
1 - Maps (already in the ice box, wasn't meant to be completed)

## Retrospective

### Things that went well
During this sprint, as a team, we worked together and completed our goals. Our communication was on point and we reached out for help without fear of judgment from other teammates. We met regularly for scrum meetings and got a lot accomplished. In addition to communication, we also worked together to develop solutions to tough problems then split up the commits for everyone working on said problem so work would be divided equally. We also worked almost every day of the sprint which helped our progress tremendously. 

### Things we need to improve
We need to improve on our beginning of the sprint plan because we had planned to do only 3 in the beginning when we should have planned to do 4 or 5. We also need to improve on identifying code smells and duplication before getting committed so our code climate doesn't go down. Another improvement could be working on testing before writing code so that we don't have our page break in development.

### One thing we will change next time
Next time we will add tests before writing code to eliminate the possibility of having our page break and help find bugs in the code. We will also work on recognizing code smells and duplication before committing them and instead make our code more concise.
