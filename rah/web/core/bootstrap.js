require.config({
    baseUrl: '/core',
    paths: {
		'angular': '/vendor/angular/angular',
		'angular-route': '/vendor/angular-route/angular-route',
		'bootstrap': '../lib/bootstrap/js/bootstrap.min',
		'jquery': '/vendor/jquery/dist/jquery',
		'luna': '/vendor/luna/luna',
		'angular-route-segment': '/vendor/angular-route-segment/build/angular-route-segment'
    },
	shim: {
		'app': {
			deps: ['angular', 'angular-route', 'angular-route-segment', 'luna']
		},
		'angular-route': {
			deps: ['angular']
		},
		'angular-route-segment': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'luna': {
			deps: ['bootstrap']
		}
	}
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);