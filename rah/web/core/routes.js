define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/home.html',
                dependencies: [
                    'controllers/HomeViewController'
                ]
            },
            '/about/:person': {
                templateUrl: '/views/about.html',
                dependencies: [
                    'controllers/AboutViewController',
                    'directives/app-color'
                ]
            },
            '/contact': {
                templateUrl: '/views/contact.html',
                dependencies: [
                    'controllers/ContactViewController'
                ]
            }
        }
    };
});