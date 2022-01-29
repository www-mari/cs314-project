# Sprint 4 - *t04* - *Pink Panthers*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Zach Aubin*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio < 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
### Epic 1 - Search More
For the search more epic, we will increase the number of columns that are searched in every Find request. 
This improvement will allow a user to search for a partial or whole city, state, country or airport code. 
The returned results will be more accurate and this will increase the number of results when searching for a 
specific city, state, ect.

### Epic 2 - Protocol Tour Feature
For the protocol tour feature epic, we will add support for the tour feature protocol. 
We will add the tour request and tour response json files to the server side and client 
side schemas. We will also create a tour testing file to be able to test all API tour 
requests. Additionally, we will implement the backend portion of the optimization 
during this epic. Testing and completing this epic is important because it will allow 
us to complete the remaining epics during this sprint.

### Epic 3 - Save Tour
For the save tour epic, we will create a download button that will open a pop-up window
where the user can choose whether they want to download a map or a tour and in 
what format they want (tour--> CSV/JSON or map--> SVG/KML). 
Once the user selected their format, they can then save the file locally to their machine. 
The website will also remember their format choices for next time. We will achieve this
by creating a user's state and adding the format information to that.  

### Epic 4 - Load Tour
For the load tour epic, we will create an upload button that will open a pop-up window 
where the user can choose which file they would like to upload either JSON or CSV. The 
upload button will be placed next to the download button to save space and for efficiency 
as both have to deal with these file types. Then the program will handle whichever file 
they choose and will convert it into a format used in atlas where finally the page will 
show the tour that the user has uploaded. 

### Epic 5 - Shorter Tour
Shorter Tour will use a button labeled "Optimize" that reorders the trip so that the total 
distance is equal to or less than the existing trip. Places or locations will be moved 
around, except for the first entry. If this feature is accessed from the web app, it will 
return something within one second. We plan to have the protocol respond to larger trip 
requests when not accessed through the page, that will be handled in Epic 2.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *5* |
| Tasks |  *23*   | *45* | 
| Story Points |  *41*  | *70* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/26* | *#507, #508, #510, #511, #512, #513, #515, #516, #518, #522, #555* | *#557, #543* | Code climate diff coverage test failures | 
| *3/29* | *#393, #396, #557, #562* | *#517, #568* | Optimization |
| *3/31* | *#517, #568, #572, #514, #519, #528* | *#543, #530* | Modals don't rerender unless closing and opening |
| *4/5* | *#394, #395, #397, #459, #543, #599, #616, #530* | *#520, #523* | Making tour request faster with opt2 possibly |
| *4/6* | *#505, #520, #524, 525, #529, 530, 631, 637* | *#627, #646, #523* | Making tour request pay attention to time |


## Review

### Epics completed  
5: Search More, Protocol Tour Feature, Save Tour, Load Tour, Shorter Tour

### Epics not completed 
None that weren't planned.

## Retrospective

### Things that went well
This sprint we completed everything we planned, and we did a good job planning our sprint in the beginning. We did a 
lot of pair programming and working as a group on some of the harder tasks. We improved our communication from last 
sprint as well. Also we met with a TA for 2 scrum meetings. 

### Things we need to improve
We need to improve on persistent and consistent effort throughout the sprint, and trying to start on tasks early. We can
also improve on asking for help from teammates or help desk instead of struggling alone for a while. Also we need to 
improve on our test coverage and not let it get worse throughout the sprint and leave it to the end to catch up. 

### One thing we will change next time
Make a separate issue for testing that mirrors each task/epic. 