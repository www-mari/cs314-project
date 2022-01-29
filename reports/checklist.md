# Inspection Checklist for t04

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?

### Control faults
* For each conditional statement, is the condition correct?
* Is the condition clear to the reader and correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?
* Are all parameters and variables named consistently?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?
* Are the correct state variables being set?
* Can multiple state calls be consolidated?

### Exception faults
* Have all possible error conditions been considered?
* Is there adequate testing coverage?

### Maintainability Faults
* Is all the code DRY or can we break things into smaller functions?
* Are the classes organized intuitively? 
* Can sections of code be moved to their own component/util file?
* Are all lines short enought to fit on a 14" screen?
* Is the code written with future use in mind?

### Formatting faults
* Are there sections of commented-out code that need to be removed?
* Is indentation/spacing consistent?
* Are the starting point and end points of each code block easily identifiable? 

### Clean Code Faults
* Does the file exceed 250 lines of code?
* Does the file exceed 20 functions?
* Does the order of functions in file maintain call dependancies?

### Conventional Naming Faults
* Do the names of the classes, variables, and methods describe what they are or do?
* Does the name of a method reflect its intended purpose?
* Are there comments when the name of a class, variable, or method cannot be fully descriptive?
* Are the variable names pronounceable and make communication easy?
