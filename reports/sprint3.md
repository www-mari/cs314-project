# Sprint 3 - *t04* - *Pink Panthers*

## Goal
### *How far is it?*

## Sprint Leader: 
### *Lindsey Nielsen*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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
Epic 1: Protocol distance feature:
For the protocol distance feature epic, we will add support for the distance feature protocol. 
We will add the distance request and distance response json files to the server side and client 
side schemas. We will also create a distance testing file to be able to test all API distance 
requests. Testing and completing this epic is important because it will allow us to complete 
the remaining epics involving distance between places in this sprint. 


Epic 2: Calculate distances:
For the calculate distances epic, we will calculate the distance from one location to the next. 
We will show the distance from one place to the next in a new column on the trip history table. 
The last location will also show th distance back to the starting point of the trip. We will add 
another column to the trip history table showing the cumulative distance of the trip, increasing at 
each new location added. Lastly, we will display the total round trip distance on the Atlas page 
so the user can quickly see the total distance of their planned trip.

Epic 3: Show trip:
For the show trip epic, we will create a button that will let the user see a line on the map
showing the tour contained in the history. It will also include returning to the starting location.
The starting location will simply be the user's first entered location.  
In order to do this, we will use the leaflet tools at our disposal to create some nice
lines so the user can clearly see their trip. 

Epic 4: Mark selected:
With this epic, the user will be able to click on any of the locations in the trip table and the map will zoom to that location, putting the marker there and showing all the place details on the marker aswell. On desktop version there will be the additional hoverable feature on the table to help make the selection easier. On mobile, the user can just click the row in the table to mark selected. Clicking on the rows in the tables will not add a new location to the table, simply just take you there on the map. To do this we will use elements from reactstrap to make table hoverable and clickable. 

Epic 5: Units:
Units Epic will allow the user to represent distances in other standard distances, or create their own. 
We plan to allow kilometers, millimeters, nautical miles, and custom generated units. User will be able 
to specify their own custom 'unit name' and custom 'earth radius'. User preferences will be persistent 
across sessions using local storage, possibly as cookies. We will need something that gets distances as 
an API call, resulting from a user button press. We will need the web page to display the button to do so. 
Similarly we will need math to convert units to different types or a library that does it for us, and a 
set of drop-down menu style front-end so the user can easily select their "distance settings". These will 
need to be done from the other Epics before we can display the results for this one - final distance 
display as alternative units and saving user preferences will be the last step. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *4* |
| Tasks |  *41*   | *36* | 
| Story Points |  *63*  | *51* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/3* | *3- copied over for Distance Protocol, add feature* | *2- add sitance request and build TestDstance Reques* | *n/a* | 
| *3/8* | *7- build testDistance* | *2- create distance tests, finsh* | *midterm season* |
| *3/10* | *10- Most Calulate Distance Epic* | *1- Cumulative Distances* | *Distance Database* |
| *3/15* | *3- Inspection* | *2- Lines and Marker* | *Cleaning up Atlas* |
| *3/17* | *7- Moving marker, polylines, limit* | *2- Zoom and Testing* | *Testing* |

## Review

### Epics completed  
4: Protocol distance feature, Calculate distances, Show Trip, Mark selected

### Epics not completed 
1: Units

## Retrospective

### Things that went well
During this sprint we worked on breaking up Atlas into smaller parts to help our development process. We did focused on testing and completed more complicated testing in our code. We developed an understanding of making client to server calls with distance protocol implementation. We fixed some of our Api testing and distance was thoroughly tested. We met with a TA for a scrum meeting and with Dave for the first time and it was a pleasent experience.

### Things we need to improve
We need to improve on meeting more regularly with schedule times. During this sprint, the evolving nature and increasing complication of the epics and tasks revealed areas of our communication process which have room for improvement. We need to improve on sprint planning and by having everyone be there and spliting up epics more than what is provided in the description.

### One thing we will change next time
One thing we plan to do for next sprint is to list the order of tasks within the epics in order to avoid confusion on which issue to complete next. Another thing we will improve on is meeting regularly with everyone there and to generally improve our communication. 
