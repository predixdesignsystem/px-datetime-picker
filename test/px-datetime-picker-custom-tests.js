/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*******************************************************************************
 * Without Buttons
 ******************************************************************************/

describe('px-datetime-picker no buttons', function () {
  var pickerEl;

  beforeEach(function (done) {
    pickerEl = fixture('datetime-picker');

    flush(()=>{
      setTimeout(function() {
        done();
      }, 200);
    });
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });

  it('does not have time field', function () {

    var time = Polymer.dom(pickerEl.root).querySelector('#time');
    expect(time === null).to.be.true;
  });

  it('check that opened draws the panel for tests validity', function (done) {
    var panelEl = pickerEl.$.content.$.dropdown;
    expect(panelEl.offsetWidth, 'panel width before open').to.equal(0);
    expect(pickerEl.opened, 'panel is open').to.be.false;

    pickerEl.opened = true;

    panelEl = pickerEl.$.content.$.dropdown;
    async.until(
      ()=> {
        return panelEl.offsetWidth > 0;
      },
      (callback)=> {
        setTimeout(callback, 50);
      },
      ()=> {
        expect(panelEl.offsetWidth, 'panel width after open').to.be.within(230, 270);
        done();
      }
    );
  });

  it('collapseAt set to 720 it will open full screen', function (done) {
    var panelEl = pickerEl.$.content.$.dropdown;
    pickerEl.collapseAt = 720;
    expect(panelEl.offsetWidth, 'panel width before open').to.equal(0);
    expect(pickerEl.opened, 'panel is open').to.be.false;
    pickerEl.opened = true;


    panelEl = pickerEl.$.content.$.dropdown;
    async.until(
      ()=> {
        console.log(pickerEl.opened)
        return panelEl.offsetWidth > 0;
      },
      (callback)=> {
        setTimeout(callback, 50);
      },
      ()=> {
        expect(panelEl.offsetWidth, 'panel width after open').to.be.within(450, 550);
        done();
      }
    );
  });

  it('collapseAt set to null it never collapse', function (done) {
    var panelEl = pickerEl.$.content.$.dropdown;
    pickerEl.collapseAt = null;
    expect(panelEl.offsetWidth, 'panel width before open').to.equal(0);
    expect(pickerEl.opened, 'panel is open').to.be.false;
    pickerEl.opened = true;


    panelEl = pickerEl.$.content.$.dropdown;
    async.until(
      ()=> {
        console.log(pickerEl.opened)
        return panelEl.offsetWidth > 0;
      },
      (callback)=> {
        setTimeout(callback, 50);
      },
      ()=> {
        expect(panelEl.offsetWidth, 'panel width after open').to.be.within(230, 270);
        done();
      }
    );
  });


  it('the calendar opens on _open function', function (done) {

    expect(pickerEl.opened, 'panel is not visible before open').to.be.false;
    pickerEl.$.content._open();
    flush(() => {
      expect(pickerEl.opened, 'panel is visible after open').to.be.true;
      done();
    });
  });


  it('the calendar opens when date icon is clicked', function (done) {
    //click on the date icon
    flush(() => {
      var fieldEl = Polymer.dom(pickerEl.root).querySelector('px-datetime-field');
      var entryEl = Polymer.dom(fieldEl.root).querySelector('px-datetime-entry');
      var dateIconEl = Polymer.dom(entryEl.root).querySelector('px-icon');
      dateIconEl.click();
      expect(pickerEl.opened, 'panel is visible').to.be.true;
      done();
    });
  });


  it('host should propagate focus to the px-datetime-field', function () {
    var fieldEl = Polymer.dom(pickerEl.root).querySelector('px-datetime-field');
    pickerEl.focus();
    assert.equal(fieldEl, Polymer.dom(pickerEl.root).activeElement);
  });


  //This should pass but there is a bug that needs to be fixed.
  it('focusing on the field doesn\'t close calendar when opened', function (done) {
    pickerEl.opened = true;

    expect(pickerEl.opened, 'panel is visible after open').to.be.true;
    var fieldEl = Polymer.dom(pickerEl.root).querySelector('px-datetime-field');
    fieldEl.click();

    flush( () => {
      setTimeout(function() {
        expect(pickerEl.opened, 'panel is visible after clicking on fieldEl').to.be.true;
        done();
      }, 200);

    });
  });
});

describe('px-datetime-picker no buttons with moment set', function () {
  var pickerEl;

  beforeEach(function (done) {
    pickerEl = fixture('datetime-picker');
    pickerEl.momentObj = moment("2018-01-05T00:30:00.000Z").tz(pickerEl.timeZone);

    flush(()=>{
      setTimeout(function() {
        done();
      }, 200);
    });
  });

  it('Selecting a day will close panel and apply the value', function (done) {
    pickerEl.opened = true;

    flush( () => {
      expect(pickerEl.opened, 'panel is visible after open').to.be.true;
      expect(pickerEl.momentObj.toISOString(), 'dateTime value before selection').to.equal("2018-01-05T00:30:00.000Z");

      var dropdownEl = pickerEl.$.content.$.dropdown,
          calendarEl = Polymer.dom(dropdownEl).querySelector('px-calendar-picker'),
          allCells = Polymer.dom(calendarEl.root).querySelectorAll('px-calendar-cell');

        var btn = Polymer.dom(allCells[10].root).querySelector('button');
        btn.click();

      flush(() => {
        expect(pickerEl.opened, 'panel is visible after selection').to.be.false;
        expect(pickerEl.momentObj.toISOString(), 'dateTime value after selection').to.equal('2018-01-10T00:30:00.000Z');
        done();
      });
    });
  });


  it('Selecting today will close panel and apply the value', function (done) {
    pickerEl.opened = true;

    flush( () => {
      expect(pickerEl.opened, 'panel is visible after open').to.be.true;
      expect(pickerEl.momentObj.toISOString(), 'dateTime value before selection').to.equal('2018-01-05T00:30:00.000Z');

      var dropdownEl = pickerEl.$.content.$.dropdown,
      todayEl = Polymer.dom(dropdownEl).querySelector('.dt-p-today');

      todayEl.click();

      flush(function() {
        expect(pickerEl.opened, 'panel is visible after selection').to.be.false;

        //compare down to the day only cause clicking today will preserve previous time (00:30)
        expect(moment.tz().isSame(pickerEl.momentObj, 'day'), 'compare momentObj to now').to.be.true;

        done();
      });
    });
  });

});//end of describe 'px-datetime-picker no button'



/*******************************************************************************
 * With Buttons
 ******************************************************************************/

describe('px-datetime-picker with buttons', function () {
  var pickerEl, calendarEl, selectTenthDay;

  selectTenthDay = function (calendarEl) {
    var allCells = Polymer.dom(calendarEl.root).querySelectorAll('px-calendar-cell');
    var btn = Polymer.dom(allCells[10].root).querySelector('button')
    btn.click();
  }

  beforeEach(function (done) {
    pickerEl = fixture('datetime-picker-buttons');
    calendarEl = pickerEl.$.content.$.calendar;
    pickerEl.momentObj = moment("2018-01-05T00:30:00.000Z").tz(pickerEl.timeZone);
    flush(()=>{
      setTimeout(function() {
        done();
      }, 200);
    });
  });


  it('Selecting a day will not close panel nor apply the value', function (done) {

    pickerEl.opened = true;

    flush(() => {

      expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');

      selectTenthDay(calendarEl);

      flush(() => {

        expect(pickerEl.opened, 'pickerEl is open').to.be.true;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });


  it('Selecting today will not close panel nor apply the value', function (done) {

    pickerEl.opened = true;

    flush(() => {
      expect(pickerEl.opened, 'panel is open before selection').to.be.true;
      expect(pickerEl.momentObj.toISOString(), 'check datetime has not changed').to.equal('2018-01-05T00:30:00.000Z');

      var dropdownEl = pickerEl.$.content.$.dropdown,
      todayEl = Polymer.dom(dropdownEl).querySelector('.dt-p-today');
      todayEl.click();

      flush(() => {

        expect(pickerEl.opened, 'pickerEl is open').to.be.true;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });


  it('pressing cancel cancels selection', function (done) {
    flush(() => {
      pickerEl.opened = true;
      expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');

      selectTenthDay(calendarEl);

      var pickerButtons = Polymer.dom(pickerEl.$.content.root).querySelector('px-datetime-buttons');
      cancelButton = Polymer.dom(pickerButtons.root).querySelector('button');

      expect(cancelButton.id).to.equal('', 'make sure button is not the submit button');
      cancelButton.click();

      flush(() => {
        expect(pickerEl.opened, 'pickerEl is closed').to.be.false;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });


  it('pressing Escape cancels selection', function (done) {
    flush(() => {
      pickerEl.opened = true;
      expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');

      selectTenthDay(calendarEl);

      MockInteractions.pressAndReleaseKeyOn(pickerEl, undefined, [], 'Esc');

      flush(() => {
        expect(pickerEl.opened, 'pickerEl is closed').to.be.false;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });


  it('pressing the submit button applies selection', function (done) {
    flush(() => {
      pickerEl.opened = true;
      expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');

      selectTenthDay(calendarEl);

      var pickerButtons = Polymer.dom(pickerEl.$.content.root).querySelector('px-datetime-buttons');
      submit = Polymer.dom(pickerButtons.root).querySelector('#submitButton');


      submit.click();

      flush(() => {
        expect(pickerEl.opened, 'pickerEl is closed').to.be.false;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-10T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });


  it('pressing enter applies selection', function (done) {
    flush(() => {
      pickerEl.opened = true;
      expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');

      selectTenthDay(calendarEl);

      MockInteractions.pressAndReleaseKeyOn(pickerEl, undefined, [], 'Enter');

      flush(() => {
        expect(pickerEl.opened, 'pickerEl is closed').to.be.false;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-10T00:30:00.000Z', 'momentObj value');
        done();
      });
    });
  });

});//end of describe 'px-datetime-picker with buttons'



/*******************************************************************************
 * Time zones
 ******************************************************************************/

describe('synchronized date/time zones', function () {
  var pickerEl, fieldEl, calendarEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker');
    fieldEl = Polymer.dom(pickerEl.root).querySelector('px-datetime-field');
    dropdownEl = pickerEl.$.content.$.dropdown;
    calendarEl = pickerEl.$.content.$.calendar;
    pickerEl.momentObj = moment("2018-01-05T00:30:00.000Z").tz(pickerEl.timeZone);
  });


  it('calendar, field and datepicker have synchronized moment objects', function (done) {
    expect(pickerEl.momentObj.toISOString(), 'picker and field momentObj 1').to.equal(fieldEl.momentObj.toISOString());
    expect(pickerEl.momentObj.toISOString(), 'picker and calendar momentObj 1').to.equal(calendarEl.fromMoment.toISOString());

    done();
  });


  it('calendar, field and datepicker have synchronized time zones', function (done) {
    expect(pickerEl.timeZone, 'picker and field momentObj 1').to.equal(fieldEl.timeZone);
    expect(pickerEl.timeZone, 'picker and calendar momentObj 1').to.equal(calendarEl.timeZone);

    fieldEl.timeZone = 'America/Los_Angeles';

    expect(pickerEl.timeZone, 'picker and field momentObj 2').to.equal(fieldEl.timeZone);
    expect(pickerEl.timeZone, 'picker and calendar momentObj 2').to.equal(calendarEl.timeZone);

    done();
  });


});//end of describe 'synchronized date/time zones'


/*******************************************************************************
 * Full Container
 ******************************************************************************/
describe('Full Container', function () {
  var pickerEl;
  var calendarEl;
  var fitEl;

  beforeEach(function (done) {
    templateEl = fixture('datetime-picker-full-container');
    pickerEl = Polymer.dom(templateEl.root).querySelector('px-datetime-picker');
    dropdownContentEl = Polymer.dom(pickerEl.$.content.root).querySelector('.dt-container__box');
    fitEl = Polymer.dom(templateEl.root).querySelector('#fit');
    pickerEl.fitIntoElement = fitEl;
    pickerEl.fillContainer = true;
    pickerEl.collapseAt = 0;
    pickerEl.momentObj = moment("2018-01-05T00:30:00.000Z").tz(pickerEl.timeZone);
    setTimeout(function() {
      done();
    }, 200);
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });

  it('check that the calendar fills the container when open', function (done) {

    expect(pickerEl.opened, 'panel is open').to.be.false;
    expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
    expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);

    pickerEl.opened = true;

    async.until(
      ()=> {
        return dropdownContentEl.offsetWidth > 0;
      },
      (callback)=> {
        setTimeout(callback, 50);
      },
      ()=> {
        debugger
        expect(dropdownContentEl.offsetWidth, 'panel width after open').to.be.within(330, 355);
        expect(dropdownContentEl.offsetHeight, 'panel height after open').to.be.within(230, 255);
        done();
      }
    );
  });

  it('has time field', function () {
    var time = Polymer.dom(pickerEl.$.content.root).querySelector('#time');
    expect(time !== null).to.be.true;
  });
});//end of full container


/*******************************************************************************
 * Full Window
 ******************************************************************************/
describe('Full window', function () {
  var pickerEl;
  var calendarEl;

  beforeEach(function (done) {
    pickerEl = fixture('datetime-picker-full-window');
    dropdownContentEl = Polymer.dom(pickerEl.$.content.root).querySelector('.dt-container__box');
    pickerEl.momentObj = moment("2018-01-05T00:30:00.000Z").tz(pickerEl.timeZone);
    setTimeout(function() {
      done();
    }, 200);
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });

  it('check that the calendar fills the window when open', function (done) {
    expect(pickerEl.opened, 'panel is open').to.be.false;
    expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
    expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);

    pickerEl.opened = true;

    async.until(
      ()=> {
        return dropdownContentEl.offsetWidth > 0;
      },
      (callback)=> {
        setTimeout(callback, 50);
      },
      ()=> {
        expect(dropdownContentEl.offsetWidth, 'panel width after open').to.be.within((window.innerWidth - 20), window.innerWidth);
        expect(dropdownContentEl.offsetHeight, 'panel height after open').to.be.within((window.innerHeight - 20), window.innerHeight);
        done();
      }
    );
  });

  it('does not have time field', function () {

    var time = Polymer.dom(pickerEl.$.content.root).querySelector('#time');
    expect(time === null).to.be.true;
  });
});//end of full window

