# Sprint 5 - *t04* - *Pink Panthers*

## Goal
### *User Experience!*

## Sprint Leader: 
### *Sarah Walz*

## Definition of Done

* The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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

### Epic 1 - Server Settings
In the server settings epic there will be a table in the server connections modal popup that will display the what requests the current server supports. As the user types in a proposed new server, there will be a config request sent and the table will show the requests of what the proposed server will support. When the user clicks save the client will run on the new server. Testing will also be implimented throughout the sprint. 

### Epic 2 - Interoperability
For the interoperability epic, we plan to first ensure that our client connects to other teams' servers when switched 
in the footer. After we confirm this, we will meet with members from, at the very least, one other team. We will perform 
testing with them to ensure our server works with their client as well. We will test all functionality of our server 
and take note of any bugs or incorrect results. Once we gather this feedback we will work to improve our server based 
on the recorded issues.


### Epic 3 - User Experience
For the user experience epic, we each want to ask someone outside of this class and get their feedback. 
Once we have their feedback we also want to share that with each other as a group. 
From there we will create tasks to fix any issues that come up or to improve 
the user experience. With those changes, we also want to make sure we are maintain/improving our 
testing coverage. At the end of this epic, we are hoping to have improved our user experience 
along the guidelines Dave posted.  

### Epic 4 - Modify Tour
For the Modify Tour epic, we will add additional features so the user can modify the trip list. They will
be able to choose any location in the trip and set that location as the starting location and the trip list
will be moved to maintain the original order. We will add a button allowing the user to reverse the
order of the trip list. Also, we will add a feature to allow the user to move individual locations around
in the trip list. This will either be a drag & drop or up & down arrows. Lastly, the user will be able to 
add notes to specific trips in either a column or dropdown, and these notes will be saved to a file. 

### Epic 5 - Filter Tour
We have a basic search result filter in place, so we plan to mimic this functionality with a tour filter 
for review purposes only. It will be a popup with a simple search box, displaying each filtered term. If 
we finish all epics and cannot think of any other easter eggs, we may allow the user to modify the tour 
via the filter feature. 


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *4* |
| Tasks |  *26*   | *33* | 
| Story Points |  *47*  | *63* | 

This sprint we plan to work together to complete all planned tasks and story points. In the previous sprint, we 
completed everything we planned. We had a strong sprint 4 plan and often worked together by paired programming 
on harder tasks. Our communication and meeting planning also improved from sprint 3 to sprint 4. We expect it 
to continue improving throughout sprint 5. In this sprint we will begin our tasks earlier than in previous sprints 
so that we have more time to work and ask questions as needed. We believe that we will be able to complete all 
planned tasks and story points this sprint, like we did in sprint 4.

## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *4/23* | *#676, #679, #682, #688* | *#698* | Interop doesn't work |
| *4/27* | *#697, #698, #700, #737, #739* | *#691, #681* | UI design |
| *4/28* | *#739, #690, #701, #719, #729, #728, #694, #681, #677* | *#678, #691* | UI design |
| *5/3*  | *#683, #757, #695* | *#678, #691, #685, #686, #689* | UI Design |
| *5/5*  | *#727, #678, #685, #686, #689, #766, #770, #774, #680, #691, #692, #790* | *#786, #782, #702* | Server Stuff |
| *5/6*  | *#782, #702, #784, #786, #716* | *none* | *none* |


## Review

### Epics completed  
Server Settings, Interoperability, User Experience, Modify Tour

### Epics not completed 
Filter Tour

## Retrospective

### Things that went well
We have a lot of testing. We used user feedback to make our design look better. Planning in the beginning went well 
because we planned out each step of a task. We did our TA scrum meetings early.

### Things we need to improve
Starting earlier so that we can get everything we want to get done, done. Not work on the same tasks individually.
Listening to each other and keeping an open mind to things. 

### One thing we will change next time
Have a great summer. If we had another Sprint, start with the server before layout or design.
