# Interop for t04

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Nick Lertola | 17 |
| Lindsey Nielsen | 12 |
| Zach Aubin | 22 |
| Mari Dudek | 11 |
| Sarah Walz | 24 |

### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| 24 | S | Our client allows you to choose how many search results you get back and when set to 10, 10 locations are shown, but when set to 20, 50 or 100, 16 locations appear |  |
| 12 | C | When connecting from their server to ours on their client, more info does not show anything for server settings |  |
| 12 | C | Their client never connects to our server |  |
| 12 | C | POST https://localhost:3140/api/config net::ERR_CONNECTION_REFUSED |  |
| 11 | C | Client never shows current and proposed server setting info |  |
| 11 | S | Loading a worldwide trip with t11 server gives a total distance of 0 |  |
| 11 | S | All distance requests fail: Atlas.js, processDistanceResponse FAILED |  |
| 11 | S | Optimize doesn't maintain starting location |  |
| 17 | C | Distance request works but they dont show total distance |  |


