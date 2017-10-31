
describe('px-datetime-picker', function () {

  it('the calendar is hidden by default', function () {
    var pickerEl = fixture('DatetimePicker');

    expect(pickerEl._opened).to.be.false;
  });


  it('check that _opened draws the panel for tests validity', function (done) {
    var pickerEl = fixture('DatetimePicker');

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
    var pickerEl = fixture('DatetimePicker');

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
    var pickerEl = fixture('DatetimePicker');

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
    var pickerEl = fixture('DatetimePicker');

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


  it('focusing on the field doesn\'t close calendar when opened', function (done) {
    var pickerEl = fixture('DatetimePicker');

    async.series([
      function (callback) {
        pickerEl._opened = true;
        callback(null, 'one');
      },
      function (callback) {
        expect(pickerEl._opened).to.be.true;
        var fieldEl = pickerEl.querySelector('px-datetime-field');
        fieldEl.click();

        callback(null, 'two');
      },
      function (callback) {
        expect(pickerEl._opened).to.be.true;

        callback(null, 'three');
      }
    ]);


  });











});//end of describe
