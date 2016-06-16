// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Open/Close', function() {

    var picker = document.getElementById('px_date_picker_1'),
        field = Polymer.dom(picker.root).querySelector('px-datetime-field'),
        overlay = Polymer.dom(picker.root).querySelector('.overlay'),
        box = Polymer.dom(picker.root).querySelector('#box');

    setup(function() {
      picker._close();
    });

    test('calendar and overlay hidden by default', function() {

      assert.isFalse(picker._opened);
      assert.isTrue(overlay.classList.contains('visuallyhidden'));
      assert.isTrue(overlay.classList.contains('visuallyhidden'));
    });

    test('calendar opens on event and close with close function', function() {

      assert.isFalse(picker._opened);

      field.fire('px-datetime-entry-icon-clicked', {dateOrTime: 'Date'});

      assert.isTrue(picker._opened);
      assert.isFalse(overlay.classList.contains('visuallyhidden'));
      assert.isFalse(overlay.classList.contains('visuallyhidden'));

      picker._close();

      assert.isFalse(picker._opened);
    });

    test('calendar opens on function', function() {

      assert.isFalse(picker._opened);

      picker._open();

      assert.isTrue(picker._opened);
    });

    test('focusing field doesnt close calendar when opened', function() {

      picker._open();
      field.click();

      assert.isTrue(picker._opened);
    });

    test('click on overlay closes it', function() {

      picker._open();
      overlay.click();

      assert.isFalse(picker._opened);
    });

    test('pressing esc cancels selection', function() {

      var prevMom = picker.momentObj.clone();

      picker.showButtons = true;
      flush(function(){
        picker._open();

        assert.equal(prevMom.toISOString(), picker.momentObj.toISOString());

        //simulate some selection
        picker.momentObj = picker.momentObj.clone().add(1, 'day');
        assert.isFalse(prevMom.toISOString() === picker.momentObj.toISOString());

        //press esc
        var evt = new CustomEvent('keydown',{detail:{'key':'esc','keyIdentifier':'esc'}});
        picker.dispatchEvent(evt);

        //should be closed and date reset
        assert.isFalse(picker._opened);
        assert.equal(prevMom.toISOString(), picker.momentObj.toISOString());
        picker.showButtons = false
      });
    });
  });

  suite('synchronized date/time zones', function() {

    var picker = document.getElementById('px_date_picker_1'),
        field = Polymer.dom(picker.root).querySelector('px-datetime-field'),
        calendar = Polymer.dom(picker.root).querySelector('px-calendar-picker'),
        box = Polymer.dom(picker.root).querySelector('#box');

    test('calendar, field and datepicker have synchronized moment objects', function() {

      assert.equal(picker.momentObj.toISOString(), field.momentObj.toISOString());
      assert.equal(picker.momentObj.toISOString(), calendar.fromMoment.toISOString());

      field.momentObj = field.momentObj.clone().subtract(1, 'day');

      assert.equal(picker.momentObj.toISOString(), field.momentObj.toISOString());
      assert.equal(picker.momentObj.toISOString(), calendar.fromMoment.toISOString());
    });

    test('calendar, field and datepicker have synchronized time zones', function() {

      assert.equal(picker.timeZone, field.timeZone);
      assert.equal(picker.timeZone, calendar.timeZone);

      field.timeZone = 'UTC';

      assert.equal(picker.timeZone, field.timeZone);
      assert.equal(picker.timeZone, calendar.timeZone);
    });
  });
};
