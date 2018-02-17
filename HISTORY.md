v2.1.0
==================
* Broke components up so iron-dropdown content is is a separate component, px-datetime-picker-content
* Added px-overlay-content to hoist px-datetime-picker-content up the dom
* Added hoist option, defaulted to false
* Added containerType option to specify which container it should hoist to

==================
* fixing demo pages for IE11

v2.0.4
==================
* Updated to newest px-datetime-common behavior versions

v2.0.3
==================
* added `sudo:required` to travis file

v2.0.2
==================
* fix links in docs

v2.0.1
==================
* Add editor for momentObj to demo

v2.0.0
==================
* Polymer 1.X/2.Xhybrid support
* `dateTime` property no longer exists. Please use only `momentObj` instead (which is a moment object.)
* Ability to have `momentObj` null so that the datepicker can be empty

v1.2.0
==================
* added properties fullContainer and fitIntoElement

v1.1.2
==================
* fixed/refactored tests
* fixed typo that caused button to always apply the change

v1.1.1
==================
* add device flags

v1.1.0
==================
* migrate to iron-dropdown

v1.0.4
==================
* updated css variables documentation

v1.0.3
==================
* add min and max date support

v1.0.2
==================
* Fix comment for analyzer

v1.0.1
==================
* runtime theming for demo

v1.0.0
==================
* component redesign
* combined -predix and -sketch sass files
* update dependencies for design refresh

v0.4.2
==================
* part of the timezone time issue fix. px-rangepicker issue #39

v0.4.1
==================
* update readme and remove old component image
* add resolution for webcomponentsjs

v0.4.0
==================
* added localization through resources, language, formats and Px.moment.changeLocale()

v0.3.14
==================
* converted time zone property to typeahead

v0.3.13
==================
* fixed border color and exposed css variable

v0.3.12
==================
* add Event Fired information

v0.3.11
==================
* merged PR fixing attached typo

v0.3.10
==================
* add link to Moment documentation

v0.3.9
==================
* added styling section to API documentation

v0.3.8
==================
* fixed timing bug that prevented the dateTime property from getting applied

v0.3.7
==================
* Moved theming style includes and updated ghp.sh
* updated api for new colors

v0.3.6
==================
* fix component link in demo

v0.3.5
==================
* Update to px-demo
* removed demosass
* Updated to cool grays

v0.3.4
==================
* Update colors design to pick up new colors

v0.3.3
==================
* changing ghp.sh to account for Alpha releases

v0.3.2
==================
* fixed demo (#9)

v0.3.1
==================
* Update missed design dependencies

v0.3.0
==================
* Updated dependencies

v0.2.16
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v0.2.15
==================
* updating slider dependency

v0.2.14
==================
* changing all devDeps to ^

v0.2.13
==================
* Update dependencies

v0.2.12
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.2.11
==================
* fixed the bug that prevented the up and down arrows from going to a past or future date if blocked

v0.2.10
==================
* update dependencies for dropdown

v0.2.9
==================
* removing px-theme style call

v0.2.8
==================
* changing Gruntfile.js to gulpfile.js

v0.2.7
==================
* added style variables for theming

v0.2.6
==================
* bower updating px-demo-snippet

v0.2.5
==================
* bumped calendar picker to fix icons not showing up

v0.2.4
==================
* Fixed codepen

v0.2.3
==================
* Update dependencies

v0.2.2
==================
* Latest gulpfile update to latest demo snippet component

v0.2.1
==================
* Fixing up dependency versions

v0.2.0
==================
* Grunt to gulp migration & style modules

v0.1.8
==================
* Fixed demo event counter

v0.1.7
==================
* added overflow to demoContainer and removed flex__wrap from mega-demo

v0.1.6
==================
* updated mega demo styles and bower px-demo-snippet to ^

v0.1.5
==================
* added image to readme, removed watch, added view on github

v0.1.4
==================
* Added vulcanize

v0.1.3
==================
* Updated wording in demo

v0.1.2
==================
* Added blockPastDates and blockFutureDates to px-datetime-field

v0.1.1
==================
* Added new demos

v0.1.0
==================
* Added blockPastDates

v0.0.2
==================
* Use local copy of moment.js

v0.0.2
==================
* upgrade bower dependencies

v0.0.1
==================
* Initial release
