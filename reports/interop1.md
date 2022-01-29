# Interop for t04

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Lindsey Nielsen | 23 |
| Mari Dudek | 24 |
| Sarah Walz | 7 |
| Nick Lertola | 21 |
| Zach Aubin | 2 |

### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| 7 | C | Team 7 has a short tour button (which I am guessing should optimize the tour) but it doesn't do anything with our server |  |
| 24 | C | Team 24 had a Calculate Distance button that did not do anything in connection with our server, except for console.log outputs |  |
| 24 | C | Team 24 had correct find search results but there was no option to add a result location to the trip |  |
