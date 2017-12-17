/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have defined and non-empty urls', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have defined and non-empty names', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* test suite named "The menu" */
    describe('The menu', function() {
        /*  test that ensures the menu element is
         *  hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*  test that ensures the menu changes
         *  visibility when the menu icon is clicked
         */
        /*  credit: knowledge of use of triggers for an input event from the
         *  following stackoverflow page:
         *  https://stackoverflow.com/questions/10823790/testing-a-click-event-with-jasmine-that-appends-a-style-sheet-to-the-head
         */
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /*  test that ensures when the loadFeed
       *  function is called and completes its work, there is at least
       *  a single .entry element within the .feed container.
       *  Remember, loadFeed() is asynchronous so this test will require
       *  the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done) {
          // assuming the same allFeeds array is in use as the one of length 4
          // that currently appears in app.js
          loadFeed(3, function() { done(); });
      });

      // assuming '.entry' here refers to the containing entry-link
      it('present after loadFeed', function(done) {
          expect($('.feed').children().length).toBeGreaterThan(0);
          done();
      });
    });


    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /*  test that ensures when a new feed is loaded
       *  by the loadFeed function that the content actually changes.
       */
      /*  credit: referenced advice from forum mentor about anonymous call backs
       *  here: https://discussions.udacity.com/t/feed-reader-testing/314023/6
       *  though I am not sure that I implemented this correctly
       */
        let feedA, feedB;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedA = $('.feed').html();
                loadFeed(1, function() { done(); });
            });
            feedB = $('.feed').html();
            done();
        });

        it('yields different feed', function(done) {
            expect(feedA).not.toEqual(feedB);
            done();
        });

    });


}());
