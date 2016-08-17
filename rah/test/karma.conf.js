module.exports = function (config)
{
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: ['jasmine', 'requirejs'],


		// list of files / patterns to load in the browser
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-route/angular-route.js',
			{pattern: 'app/scripts/**/*.js', included: false},
			{pattern: 'test/unit/**/*Spec.js', included: false},
			'test/test-main.js'
		],

		// list of files to exclude
		exclude: [
			'app/appBootstrap.js',
			'karma.conf.js'
		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],


		// web server port
		port: 9877,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		plugins: [
			'karma-requirejs',
			'karma-jasmine',
			'karma-phantomjs-launcher'
		],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
