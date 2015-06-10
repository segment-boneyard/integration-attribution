
var Test = require('segmentio-integration-tester');
var helpers = require('./helpers');
var facade = require('segmentio-facade');
var mapper = require('../lib/mapper');
var Attribution = require('..');
var should = require('should');
var assert = require('assert');

describe('Attribution', function () {
  var attribution;
  var settings;
  var test;

  beforeEach(function(){
    settings = { projectId: '1v6BJdx7LMY-uBnBGlf6jA' };
    attribution = new Attribution(settings);
    test = Test(attribution, __dirname);
    test.mapper(mapper);
  });

  it('should have correct settings', function(){
    test
      .name('Attribution')
      .endpoint('https://track.attributionapp.com')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.projectId');
  });

  describe('.validate()', function () {
    it('should be invalid when .projectId is missing', function(){
      delete settings.projectId;
      test.invalid({}, settings);
    });

    it('should be valid when settings are complete', function(){
      test.valid({}, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify', settings);
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track', settings);
      });
    });
  });

  describe('.track()', function () {
    it('should be able to track correctly', function(done){
      var json = test.fixture('track');
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200, done);
    });
  });

  describe('.identify()', function () {
    it('should be able to identify correctly', function(done){
      var json = test.fixture('identify');
      test
        .set(settings)
        .identify(json.input)
        .sends(json.output)
        .expects(200, done);
    });
  });

  describe('.page()', function(){
    it('should track page views correctly', function(done){
      var json = test.fixture('page');
      test
        .set(settings)
        .page(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should track named page views correctly', function(done){
      var json = test.fixture('page-named');
      test
        .set(settings)
        .page(json.input)
        .sends(json.output)
        .expects(200, done);
    });
  });

  describe('.screen()', function(){
    it('should track screens correctly', function(done){
      var json = test.fixture('screen');
      test
        .set(settings)
        .screen(json.input)
        .sends(json.output)
        .expects(200, done);
    });

    it('should track named screens correctly', function(done){
      var json = test.fixture('screen-named');
      test
        .set(settings)
        .screen(json.input)
        .sends(json.output)
        .expects(200, done);
    });
  });

  describe('.alias()', function (){
    it('should be able to alias correctly', function(done){
      var json = test.fixture('alias');
      test
        .set(settings)
        .alias(json.input)
        .sends(json.output)
        .expects(200, done);
    });
  });
});
