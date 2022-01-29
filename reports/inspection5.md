# Inspection #4 - Team *T04* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *LoadModal.js* |
| Meeting | *4/26/21, Online* |
| Checklist | *https://github.com/csucs314s21/t04/blob/main/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Mari Dudek |  30 min |
| Nick Lertola | 30 min |
| Lindsey Nielsen | 30 min |
| Zach Aubin | 30 min |
| Sarah Walz | 30 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| LoadModal.js: 71 | Variable o should be renamed maybe | low | Mari | #728 |
| LoadModal.js: 47 | Unnecessary print statement | low | Sarah | #728 |
| LoadModal.js: 61 | The comment says to validate but do we actually validate? | high | Sarah | #727 |
| LoadModal.js: 60 | Rather than a general else, maybe check for 'json' bc they could just give us a bad extension | med | Sarah | #729 |
| LoadModal.js: 44 | Comment is more confusing than helpful | low | Sarah | #728 |
| LoadModal.js: 71 | Dave always complains that we load these indiviually | low | Sarah | #731 |
| LoadModal.js: 66 | If check needed for checking against the schema | high | Lindsey | #727 |
| LoadModal.js: 66 | If statement has no else attached | low | Lindsey |  |
| LoadModal.js: 74 | Variable counter is created and incremented but never used | low | Lindsey | #728 |
| LoadModal.js: 89 | Instead of a contiue function use a break function | low | Lindsey |  |
| LoadModal.js: 57 | If check could be broken quite easily | med | Lindsey | #729 |
| LoadModal.js: 23 | give it a className other than empty string | low | Z | #734 |
| LoadModal.js: 71 | variable 'o' needs more descriptive name | low | Z | #728 |
| LoadModal.js: 78 | excess whitespace | low | Z | #734 |
| LoadModal.js: 92 | maybe change 'var' in for loop to 'let' | low | Z | #734 |
| LoadModal.js: 88 | currentline to currentLine | low | Z | #734 |
| LoadModal.js: 76 | If this.props is used here and lines 23, 24, etc. then we don't need line 10. | low | nlertola |  |
| LoadModal.js: 73 | Can we just do this.addLocation(o);? | low | nlertola |  |
