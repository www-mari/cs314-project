# Inspection #2 - Team *T04* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.js, lines:25 - 231* |
| Meeting | *3/15/21, Online* |
| Checklist | *https://github.com/csucs314s21/t04/blob/main/reports/checklist.md* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Mari Dudek | 30 min |
| Nick Lertola | 45 min |
| Lindsey Nielsen | 30 min |
| Zach Aubin | 45 min |
| Sarah Walz | 45 min |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js: 109 | Redundant. We can just call addLocation(latlng) | med | nlertola | 440 |
| Atlas.js: 130 | renderCoordinatesInput and all associated methods should be moved to search component | med | nlertola | 435 |
| Atlas.js: 160 | renderFindInput and all associated methods should be moved to search component | med | nlertola | 435 |
| Atlas.js: 197 | found_total unused | med | nlertola | 439 |
| Atlas.js: 198 | places unused | med | nlertola | 435 |
| Atlas.js: 212 | remove commented out console log | med | nlertola | 435 |
| Atlas.js: 35 | constructorBinders(), too many functions | high | mjdudek | 437, 441 |
| Atlas.js: 104 | bracket indentation inconsistent | low | mjdudek | 439 |
| Atlas.js: 100, 177,... | methods are not organized intuitively  | med | spwalz | 439, 437, 435 |
| Atlas.js: 216, 254 | These two methods are very similar - code duplication  | high | spwalz | 435 |
| Atlas.js: 100 | Can move anything releaed to geolocation to another another file  | low | spwalz | |
| Atlas.js: 194 | Can move anything related to findPlaces to another file  | high | spwalz | 435 |
| Atlas.js: *n* | file is over 200 lines | high | zachaubin | 439, 437, 435, 441 |
| Atlas.js: *n* | file has more than 20 functions | high | zachaubin | 439, 437, 435, 441 |
| Atlas.js: *n* | file does not maintain call order | high | zachaubin | 439 |
| Atlas.js: 338 | method name capitalized "accordian" | med | zachaubin | 442 |
| Atlas.js: 338 | method name does not describe action | med | zachaubin | 442 |
| Atlas.js: 338 | no comments to describe otherwise unknown function | med | zachaubin | 442 |
| Atlas.js: 338 | 'plusOne' never used, deep equals '===' over '==' in js, collapse empty tags | med | zachaubin | 442 |
| Atlas.js: 111 | consider adding '.then(r => null);' so promise is not ignored | low | zachaubin | 443 |
| Atlas.js: 118 | rename to renderCoordinateFormatWarning | low | zachaubin | 444 |
| Atlas.js: 193 | method name does not indicate server call | med | zachaubin | 445 |
| Atlas.js: 193 | found_total and places never used | med | zachaubin | 435 |
| Atlas.js: 193 | missing semicolon for unused variable | med | zachaubin | 435 |
| Atlas.js: 215 | method name looks general but only does 'find' | med | zachaubin | 446 |
| Atlas.js: 231 | method name does not indicate server call | med | zachaubin | 446 |
| Atlas.js: 253 | duplicate code, should go with 215 | med | zachaubin | 435 |
