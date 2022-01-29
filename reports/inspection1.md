# Inspection - Team *T04* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *SqlDb.java, lines: 0-119* |
| Meeting | *March 8, 2020: Evening, Online* |
| Checklist | *https://github.com/csucs314s21/t04/blob/main/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Mari Dudek | 45 min |
| Lindsey Nielsen | 45 min |
| Nick Lertola | 45 min |
| Zach Aubin | 15 min |
| Sarah Walz | 45 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| SqlDb.java: 13 | We never use COLUMN. Remove it. | med | Nick Lertola | #397 |
| SqlDb.java: 16 | We could eliminate the problems by creating a public ArrayList<String, String> called Place instead of a class | med | Nick Lertola |  |
| SqlDb.java: 17 | We could eliminate the problems by creating a public ArrayList<Place> called Places instead of a class | med | Nick Lertola |  |
| SqlDb.java: 37 | The exception is printed but not thrown | med | Nick Lertola | #394 |
| SqlDb.java: 84 | The static field SqlDb.Credential.USER should be accessed in a static way | med | Nick Lertola | #395 |
| SqlDb.java: 61 | The parameter String column is not used in the method it is in | low | Lindsey Nielsen | #397 |
| SqlDb.java: 62 | Fix spacing in SqlDb request, it looks like different database requests | low | Mari Dudek | #396 | 
| SqlDb.java: 36,89 | Inconsistent indentation in try-catch blocks | low | Mari Dudek | #396 |
| SqlDb.java: 62 | Does not fit on the screen | low | Sarah Walz | |
| SqlDb.java: 60 | This method is not compatible with other databases | low | Sarah Walz | |
| SqlDb.java: 94 | This method is uncompatible with other databases | low | Sarah Walz | |
| SqlDb.java: 64 & 94 | If the database ever changes both functions would need to be changed making it hard to adapt | low | Sarah Walz | |
| SqlDb.java: 112 | Report is not used | low | Sarah Walz | #397 |
