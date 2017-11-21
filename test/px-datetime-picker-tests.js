/*******************************************************************************
 * Without Buttons
 ******************************************************************************/

describe('px-datetime-picker no buttons', function () {
  var pickerEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker');
    calendarEl = Polymer.dom(pickerEl.root).querySelector('px-calendar-picker');
  });

  var selectTenthDay = function () {
    var allCells = Polymer.dom(calendarEl.root).querySelectorAll('px-calendar-cell'),
      i = 0;


      Array.prototype.forEach.call(allCells, function (cell, index) {
      var btn = Polymer.dom(cell.root).querySelector('button');
      if (!btn.hidden) {
        i++;
      }
      if (i === 10) {
        btn.click();
        return;
      }
    });
  };

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });


  it('check that opened draws the panel for tests validity', function (done) {
    flush(function () {
      panelEl = Polymer.dom(pickerEl.root).querySelector('#dropdown');
      expect(panelEl.offsetWidth, 'panel width before open').to.equal(0);
    });

    flush(() => {
      expect(pickerEl.opened, 'panel is open').to.be.false;
      async.until(
        function () {
          return pickerEl.opened;
        },
        function (callback) {
          pickerEl.opened = true;
          setTimeout(callback, 1000);
        },
        function (err, n) {
          panelEl = Polymer.dom(pickerEl.root).querySelector('#dropdown');
          expect(panelEl.offsetWidth, 'panel width after open').to.be.within(230, 270);
          done();
        }
      );
    });
  });


  it('the calendar opens on _open function', function (done) {
    flush(() => {
      expect(pickerEl.opened, 'panel is visible before open').to.be.false;
      async.until(
        function () {
          return pickerEl.opened;
        },
        function (callback) {
          pickerEl._open();
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(pickerEl.opened, 'panel is visible after open').to.be.true;
          done();
        }
      );
    });
  });


  it('the calendar opens when date icon is clicked', function (done) {
    //click on the date icon
    flush(function () {
      var fieldEl = Polymer.dom(pickerEl.root).querySelector('#field');
      var dateEl = Polymer.dom(fieldEl.root).querySelector('#date');
      var dateIconEl = Polymer.dom(dateEl.root).querySelector('px-icon');
      dateIconEl.click();
    });

    flush(function () {
      expect(pickerEl.opened, 'panel is visible').to.be.true;
      done();
    });
  });


  it('the calendar closes when clicking outside of panel', function (done) {
    //click on the date icon
    flush(function () {
      var fieldEl = Polymer.dom(pickerEl.root).querySelector('#field');
      var dateEl = Polymer.dom(fieldEl.root).querySelector('#date');
      var dateIconEl = Polymer.dom(dateEl.root).querySelector('px-icon');
      dateIconEl.click();
    });

    // while the panel is open click on the body to see if the panel closes
    flush(() => {
      expect(pickerEl.opened, 'panel is visible after open').to.be.true;
      async.whilst(
        function () {
          return pickerEl.opened;
        },
        function (callback) {
          document.body.click();
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(pickerEl.opened, 'panel is visible after click').to.be.false;
          done();
        }
      );
    });
  });


  // This should pass but there is a bug that needs to be fixed.
  // it('focusing on the field doesn\'t close calendar when opened', function (done) {
  //   async.series([
  //     function (callback) {
  //       pickerEl.opened = true;
  //       callback(null, 'one');
  //     },
  //     function (callback) {
  //       expect(pickerEl.opened, 'panel is visible after open').to.be.true;
  //       var fieldEl = Polymer.dom(pickerEl.root).querySelector('px-datetime-field');
  //       fieldEl.click();

  //       callback(null, 'two');
  //     },
  //     function (callback) {
  //       expect(pickerEl.opened, 'panel is visible after clicking on fieldEl').to.be.true;

  //       callback(null, 'three');
  //     }
  //   ]);
  // });

  it('Selecting a day will close panel and apply the value', function (done) {
    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is visible after open').to.be.true;
        expect(pickerEl.dateTime, 'dateTime value before selection').to.equal('2018-01-05T00:30:00.000Z');

        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is visible after selection').to.be.false;
        expect(pickerEl.dateTime, 'dateTime value after selection').to.equal('2018-01-10T00:30:00.000Z');
        done();

        callback(null, 'three');
      }
    ]);
  });


  it('Selecting today will close panel and apply the value', function (done) {
    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is visible after open').to.be.true;
        expect(pickerEl.dateTime, 'dateTime value before selection').to.equal('2018-01-05T00:30:00.000Z');

        todayEl = Polymer.dom(pickerEl.root).querySelector('.dt-p-today');
        todayEl.click();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is visible after selection').to.be.false;

        momentNow = moment();
        momentNowISO = momentNow.toISOString();
        pickerMomentISO = pickerEl.momentObj.toISOString();

        momentNowISOSlice = momentNowISO.slice(0,10);
        pickerMomentISOSlice = pickerMomentISO.slice(0,10);
        dateTimeSlice = pickerEl.dateTime.slice(0,10);

        expect(pickerMomentISOSlice, 'compare momentObj to now').to.equal(momentNowISOSlice);
        expect(dateTimeSlice, 'compare dateTime to now').to.equal(momentNowISOSlice);

        done();

        callback(null, 'three');
      }
    ]);
  });

});//end of describe 'px-datetime-picker no button'



/*******************************************************************************
 * With Buttons
 ******************************************************************************/

describe('px-datetime-picker with buttons', function () {
  var pickerEl;
  var calendarEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker-buttons');
    calendarEl = pickerEl.querySelector('px-calendar-picker');
  });

  var selectTenthDay = function () {
    var allCells = calendarEl.querySelectorAll('px-calendar-cell'),
      i = 0;
      Array.prototype.forEach.call(allCells, function (cell, index) {
      var btn = cell.querySelector('button');
      if (!btn.hidden) {
        i++;
      }
      if (i === 10) {
        btn.click();
        return;
      }
    });
  };

  it('Selecting a day will not close panel nor apply the value', function (done) {
        async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl.opened, 'pickerEl is open').to.be.true;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-10T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'three');
      }
    ]);
  });


  it('Selecting today will not close panel nor apply the value', function (done) {

    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is open before selection').to.be.true;
        expect(pickerEl.dateTime, 'check datetime has not changed').to.equal('2018-01-05T00:30:00.000Z');

        todayEl = Polymer.dom(pickerEl.root).querySelector('.dt-p-today');
        todayEl.click();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl.opened, 'panel is open after selection').to.be.true;

        momentNow = moment();
        momentNowISO = momentNow.toISOString();
        pickerMomentISO = pickerEl.momentObj.toISOString();

        momentNowISOSlice = momentNowISO.slice(0,10);
        pickerMomentISOSlice = pickerMomentISO.slice(0,10);

        expect(pickerMomentISOSlice, 'compare momentObj to now').to.equal(momentNowISOSlice);
        expect(pickerEl.dateTime, 'check datetime has not changed').to.equal('2018-01-05T00:30:00.000Z');


        done();

        callback(null, 'three');
      }
    ]);
  });


  it('pressing cancel cancels selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        var pickerButtons = pickerEl.querySelector('px-datetime-buttons');
        cancelButton = pickerButtons.querySelector('button');

        expect(cancelButton.id).to.equal('', 'make sure button is not the submit button');
        cancelButton.click();

        callback(null, 'three');
      },
      function (callback) {
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });


  it('pressing Escape cancels selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        MockInteractions.pressAndReleaseKeyOn(pickerEl, undefined, [], 'Esc');

        callback(null, 'three');
      },
      function (callback) {
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-05T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });


  it('pressing the submit button applies selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        var pickerButtons = pickerEl.querySelector('px-datetime-buttons');

        var allButtons = pickerButtons.querySelectorAll('button'),
            i = 0;
        Array.prototype.forEach.call(allButtons, function (btn, index) {
          if (btn.id === "submitButton") {
            btn.click();
          }
          i++;
        });

        callback(null, 'three');
      },
      function (callback) {
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-10T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-10T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });


  it('pressing enter applies selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl.opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        MockInteractions.pressAndReleaseKeyOn(pickerEl, undefined, [], 'Enter');

        callback(null, 'three');
      },
      function (callback) {
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-10T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-10T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });

});//end of describe 'px-datetime-picker with buttons'



/*******************************************************************************
 * Time zones
 ******************************************************************************/

describe('synchronized date/time zones', function () {
  var pickerEl;
  var calendarEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker');
    fieldEl = pickerEl.querySelector('px-datetime-field');
    calendarEl = pickerEl.querySelector('px-calendar-picker');
  });


  it('calendar, field and datepicker have synchronized moment objects', function (done) {
    expect(pickerEl.momentObj.toISOString(), 'picker and field momentObj 1').to.equal(fieldEl.momentObj.toISOString());
    expect(pickerEl.momentObj.toISOString(), 'picker and calendar momentObj 1').to.equal(calendarEl.fromMoment.toISOString());

    fieldEl.momentObj = fieldEl.momentObj.clone().subtract(1, 'day');

    expect(pickerEl.momentObj.toISOString(), 'picker and field momentObj 2').to.equal(fieldEl.momentObj.toISOString());
    expect(pickerEl.momentObj.toISOString(), 'picker and calendar momentObj 2').to.equal(calendarEl.fromMoment.toISOString());

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

  beforeEach(function () {
    templateEl = fixture('datetime-picker-full-container');
    pickerEl = Polymer.dom(templateEl.root).querySelector('px-datetime-picker');
    dropdownContentEl = Polymer.dom(pickerEl.root).querySelector('.dt-container__box');
    fitEl = Polymer.dom(templateEl.root).querySelector('#fit');
    pickerEl.fitIntoElement = fitEl;
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });

  it('check that the calendar fills the container when open', function (done) {
    flush(function () {
      expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
      expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
    });
    flush(() => {
      expect(pickerEl.opened, 'panel is open').to.be.false;
      async.until(
        function () {
          return pickerEl.opened;
        },
        function (callback) {
          pickerEl.opened = true;
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(dropdownContentEl.offsetWidth, 'panel width after open').to.be.within(330, 355);
          expect(dropdownContentEl.offsetHeight, 'panel height after open').to.be.within(230, 255);
          done();
        }
      );
    });
  });
});//end of full container


/*******************************************************************************
 * Full Window
 ******************************************************************************/
describe('Full window', function () {
  var pickerEl;
  var calendarEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker-full-window');
    dropdownContentEl = Polymer.dom(pickerEl.root).querySelector('.dt-container__box');
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl.opened).to.be.false;
  });

  it('check that the calendar fills the window when open', function (done) {
    flush(function () {
      expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
      expect(dropdownContentEl.offsetWidth, 'panel width before open').to.equal(0);
    });
    flush(() => {
      expect(pickerEl.opened, 'panel is open').to.be.false;
      async.until(
        function () {
          return pickerEl.opened;
        },
        function (callback) {
          pickerEl.opened = true;
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(dropdownContentEl.offsetWidth, 'panel width after open').to.be.within((window.innerWidth - 20), window.innerWidth);
          expect(dropdownContentEl.offsetHeight, 'panel height after open').to.be.within((window.innerHeight - 20), window.innerHeight);
          done();
        }
      );
    });
  });
});//end of full window
