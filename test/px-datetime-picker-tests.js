
describe('px-datetime-picker no buttons', function () {
  var pickerEl;

  beforeEach(function () {
    pickerEl = fixture('datetime-picker');
  });

  it('the calendar is hidden by default', function () {
    expect(pickerEl._opened).to.be.false;
  });


  it('check that _opened draws the panel for tests validity', function (done) {
    flush(function () {
      dropdownEl = pickerEl.querySelector('#dropdown');
      expect(dropdownEl.offsetWidth).to.equal(0);
    });

    flush(() => {
      expect(pickerEl._opened).to.be.false;
      async.until(
        function () {
          return pickerEl._opened;
        },
        function (callback) {
          pickerEl._opened = true;
          setTimeout(callback, 1000);
        },
        function (err, n) {
          dropdownEl = pickerEl.querySelector('#dropdown');
          expect(dropdownEl.offsetWidth).to.be.within(230, 270);
          done();
        }
      );
    });
  });


  it('the calendar opens on _open function', function (done) {
    flush(() => {
      expect(pickerEl._opened).to.be.false;
      async.until(
        function () {
          return pickerEl._opened;
        },
        function (callback) {
          pickerEl._open();
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(pickerEl._opened).to.be.true;
          done();
        }
      );
    });
  });


  it('the calendar opens when date icon is clicked', function (done) {
    //click on the date icon
    flush(function () {
      dateEl = pickerEl.querySelector('#date');
      dateIconEl = pickerEl.querySelector('px-icon');
      dateIconEl.click();
    });

    flush(function () {
      expect(pickerEl._opened).to.be.true;
      done();
    });
  });


  it('the calendar closes when clicking outside of panel', function (done) {
    //click on the date icon
    flush(function () {
      dateEl = pickerEl.querySelector('#date');
      dateIconEl = pickerEl.querySelector('px-icon');
      dateIconEl.click();
    });

    // while the panel is open click on the body to see if the panel closes
    flush(() => {
      expect(pickerEl._opened).to.be.true;
      async.whilst(
        function () {
          return pickerEl._opened;
        },
        function (callback) {
          document.body.click();
          setTimeout(callback, 1000);
        },
        function (err, n) {
          expect(pickerEl._opened).to.be.false;
          done();
        }
      );
    });
  });


  // This should pass but there is a bug that needs to be fixed.
  // it('focusing on the field doesn\'t close calendar when opened', function (done) {
  //   async.series([
  //     function (callback) {
  //       pickerEl._opened = true;
  //       callback(null, 'one');
  //     },
  //     function (callback) {
  //       expect(pickerEl._opened).to.be.true;
  //       var fieldEl = pickerEl.querySelector('px-datetime-field');
  //       fieldEl.click();

  //       callback(null, 'two');
  //     },
  //     function (callback) {
  //       expect(pickerEl._opened).to.be.true;

  //       callback(null, 'three');
  //     }
  //   ]);
  // });

  it('Selecting a day will close panel and apply the value', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl._opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl._opened).to.be.true;
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z');

        var allCells = calendarEl.querySelectorAll('px-calendar-cell'),
          i = 0;
        allCells.forEach(function (cell, index) {
          var btn = cell.querySelector('button');
          if (!btn.hidden) {
            i++;
          }
          if (i === 10) {
            btn.click();
            return;
          }
        });

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl._opened).to.be.false;
        expect(pickerEl.dateTime).to.equal('2018-01-11T00:30:00.000Z');
        done();

        callback(null, 'three');
      }
    ]);
  });

});//end of describe 'px-datetime-picker no button'




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
    allCells.forEach(function (cell, index) {
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
        pickerEl._opened = true;

        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        selectTenthDay();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl._opened, 'pickerEl is open').to.be.true;
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-11T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-05T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'three');
      }
    ]);
  });


  it('pressing cancel cancels selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl._opened = true;

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
        pickerEl._opened = true;

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
        pickerEl._opened = true;

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
            allButtons.forEach(function (btn, index) {
          if (btn.id === "submitButton") {
            btn.click();
          }
          i++;
        });

        callback(null, 'three');
      },
      function (callback) {
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-11T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-11T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });


  it('pressing enter applies selection', function (done) {
    var calendarEl = pickerEl.querySelector('px-calendar-picker');

    async.series([
      function (callback) {
        pickerEl._opened = true;

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
        expect(pickerEl.momentObj.toISOString()).to.equal('2018-01-11T00:30:00.000Z', 'momentObj value');
        expect(pickerEl.dateTime).to.equal('2018-01-11T00:30:00.000Z', 'dateTime value');
        done();

        callback(null, 'four');
      }
    ]);
  });

});//end of describe 'px-datetime-picker with buttons'
