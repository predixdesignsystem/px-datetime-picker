document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {

  describe('px-datetime-picker', function() {

    it('the calendar is hidden by default', function() {
      var pickerEl = fixture('DatetimePicker');

      expect(pickerEl._opened).to.be.false;
    });

    // it('the calendar opens when date icon is clicked', function(done){
    //   var pickerEl = fixture('DatetimePicker');

    //   //click on the date icon
    //   flush (function(){
    //     dateEl = pickerEl.querySelector('#date');
    //     dateIconEl = pickerEl.querySelector('px-icon');
    //     dateIconEl.click();
    //     done();
    //   });

    //   flush (function() {
    //     expect(pickerEl._opened).to.be.true;
    //   });
    // });

    // it('the calendar closes when clicking outside of panel', function(done){
    //   var pickerEl = fixture('DatetimePicker');

    //   //click on the date icon
    //   flush (function(){
    //     dateEl = pickerEl.querySelector('#date');
    //     dateIconEl = pickerEl.querySelector('px-icon');
    //     dateIconEl.click();
    //   });

    //   flush (function() {
    //     expect(pickerEl._opened).to.be.true;
    //   });

    //   flush (function() {
    //     document.body.click();
    //     expect(pickerEl._opened).to.be.false;
    //     done();
    //   });
    // });

    // it('check that _opened draws calendar opens on method _open', function(done){
    //   var pickerEl = fixture('DatetimePicker');

    //   //click on the date icon
    //   flush (function(){
    //     expect(pickerEl._opened).to.be.false;
    //     done();
    //   });
    // });










  });//end of describe
}
