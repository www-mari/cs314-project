# Inspection #4 - Team *T04* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *TourRequest.java* |
| Meeting | *4/04/21, Online* |
| Checklist | *https://github.com/csucs314s21/t04/blob/main/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Mari Dudek | 30 min |
| Nick Lertola | 30 min |
| Lindsey Nielsen | 30  min |
| Zach Aubin | 30 min |
| Sarah Walz | 30 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| TourRequest.java | Order of methods not in call order | med | Zach Aubin | 617 |
| TourRequest.java | Rename 'rotate' and 'closest' to be more descriptive | med | Zach Aubin | 617 |
| TourRequest.java | Add comments, after renaming functions, to describe code | low | Zach Aubin | 617 |
| TourRequest.java | codeclimate complexity (how is cc complexity computed?): closest does a lot | low | Zach Aubin | 605 |
| TourRequest.java: 23 | Unnecessary comment | low | mjdudek | 599 |
| TourRequest.java: 24 | Empty if statement, different formatting maybe? | med | mjdudek | 605 |
| TourRequest.java: 90 | Cognitive complexity issue with closest() function | high | mjdudek | 605 |
| TourRequest.java: 91 | Should 3958 be hardcoded or is it supposed to be earthRadius? | high | mjdudek | 626 |
| TourRequest.java: 38 | The entire if statement is redudant because tour has same length as places and we already checked if places.size() == 0 in line 23 | med | Lindsey Nielsen | 605 |
| TourRequest.java: 63 | The condition i != index is not clear to the reader | low | Lindsey Nielsen | 605 |
| TourRequest.java: 66 | The condition shortestDistance.doubleValue() == -1.0 is not clear to the reader | low | Lindsey Nielsen | 605 |
| TourRequest.java: 44 | unexpected inputs can cause corruption | low | Lindsey Nielsen |  |
| TourRequest.java: 24 | Could flip the if statement so it is just one if and don't need the else | low | spwalz | 605 |
| TourRequest.java: | How to we keep track of our response time? | low | spwalz | 627 |
| TourRequest.java: 91, 121 | One distance request we call with earthradius (the variable) and one we just pass in 3958 | med | spwalz | 626 |
| TourRequest.java: 128 | Distance Request returns a long, but our function only returns a double, could that lead to rounding errors? | low | spwalz | 626 |
| TourRequest.java: 26 | Can be combined with line 27 | low | nlertola |  |
| TourRequest.java: 45 | Somewhere in here we need to break when the time limit is hit | high | nlertola | 627 |
| TourRequest.java: 50 | How long does getting the distance take? Would it be worth it to store the best distance as a variable outside the loop? | low | nlertola |  |
| TourRequest.java: 60 | This will never be hit | med | nlertola |  |
| TourRequest.java: 78 | I wonder how long it takes to make a distance request. Could speed it up with Zachs distance idea? | med | nlertola |  |
| TourRequest.java: 104 | Same as above | med | nlertola |  |
