# User Experience - Team *T04* 

The report summarizes a round of user experience testing performed on the team's application.

Each developer should ask the user to accomplish one or more simple tasks while monitoring their efforts.  
The user should attempt to complete the tasks without any aid from the developer.
Use a pseudonym to identify the user below. 
Age, nationality, and other background information can sometimes be helpful understanding the problems a user encountered.

One task is provided along with a 10 minute time limit.
Your team should identify additional tasks to explore your application more fully and alter the time limit if necessary.

Developers should not guide the user, but the user may ask for help as a last resort.  
Consider this a failure when it happens.  
Record the failures, problems they encountered, and any aid that is given along with anything you notice from their use of the application.
 
### Tasks

Each user should complete the following tasks in 10 minutes:

* Create a trip to several cities around the world you would like to visit.
* Search an airport and add it to the trip.
* Search coordinates and add them to the trip.
* Remove a place from your trip.
* Reverse the trip list.
* Find the total distance to the trip, and the distances between each location.
* Make the trip shorter (optimize).
* Save your trip as a .json or .csv file
* Find the team member About page.
* Clear your trip list.
* (Optional) Load the trip file that you previously saved.

### Demographics

| Pseudonym | Description |
| :--- | :--- |
| Sara | 19, freshman CS student |
| T | 20, English major |
| D | 30, machinist |
| J | 24, Teacher for children |
| Andrew | 53, Senior Computer Engineer |


### Observations

| User | problem, aid, observation | hi/med/low | github#  |
| :--- | :--- | :---: | :---: | 
| Sara | Tried to search cities in airport/coordinate searchbar | low | |
| Sara | Trip list isn't visible unless you scroll so she clicked the 'Save' button because she thought that added the city to the list | low | |
| Sara | Couldn't figure out how to reverse. I had to tell her it was in the Modify dropdown | med | |
| Sara | Found the distance dropdown accidentally while looking for reverse, and thought the move up/down arrows opened the dropdown. This might be a problem once the move up/down arrow functionality is added | med | #778 |
| T | Tried to search for "city, country" in the search bar and then the searchbar won't search | low | |
| T | Kept clicking enter key (which doesn't do anything) to run the search rather than clicking search button | low | #766 |
| T | Couldn't find the distance dropdown | low | #778 |
| D | Multiple searches for Reno, Dallas, and Austin failed | low | |
| D | Tooltips or "click hear to do \_\_\_" would help unless you already know how to everything on it | low | |
| J | Didn't understand the  filtering of results. Confused that filters didn't clear after multiple DB searches. | low | |
| J | Had trouble finding distances and what they were (no units) | low | #778 |
| J | Tried to search by city, country and specific searches with spaces in it. | low | |
| J | Confused on opening distance drop down. Move up and down arrows don't show up correctly on mac so she clicked on them in confusion. | low | #778 |
| Andrew | Cannot press enter to initiate the search | med | #766 |
| Andrew | Arrow to show distances need to change depending if it is open or not | low | #778 |
| Andrew | Reverse then optimizing does not optimize the trip | high | |
| Andrew | Disable Save button if no trip | low | |
