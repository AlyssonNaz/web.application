var log = requireCore('rah.log');
var utils = requireCore('rah.utils');
var fs = require('fs');
var path = require('path');
var readline = require('readline');

var defaultRootApiFolder = 'api';
var defaultRootRoutesFolder = 'routes';

var modules = [];

function loadRoute(route, app) {
    utils.io.forEachDir(route, true, function (file, filePath) {
        var rt = path.parse(filePath);
        var dir = rt.dir.replace('./routes', '');

        if (rt.name == 'index.template')
            return;

        if (rt.name != 'index')
            dir += '/' + rt.name;

        app.use(dir, require('../../../' + filePath));

        var routePath = filePath.replace('./routes/', '');

        modules[routePath] = {};
        modules[routePath].routes = parseRoute(routePath);
        modules[routePath].views = parseViews(routePath);

        log.event('Success: .' + dir);
    });
}

function parseRoute(dir) {
    if (modules && modules[dir] && modules[dir].routes)
        return modules[dir].routes;
        
    if (dir.indexOf('.js') == -1)
        return [];

    var routes = [];
    fs.readFileSync('./routes/' + dir).toString().split('\n').forEach(function (line) {
        var route = {};

        if (line.indexOf('router.') > -1) {
            var data = line.split(',');

            route.url = data[0].split('(')[1].replace(/[']/g, '');
            route.method = data[0].split('(')[0].replace('router.', '');

            if (data[1].trim().indexOf('auth') > -1) route.auth = data[1].trim();
            else route.auth = 'n/a';

            route.state = utils.settings.routes.state.active;

            routes.push(route);
        }
    });

    return routes;
}

function createRoute(dir, route) {
    return new Promise(function (resolve, reject) {
        var file = fs.readFileSync('./routes/' + dir).toString();
        const template = "router.{method}('{url}', {auth}, function (req, res, next) { \n});"
            .replace('{method}', route.method)
            .replace('{url}', route.url)
            .replace('{auth}', route.auth);

        file = file.replace('module.exports = router;', template + '\n\nmodule.exports = router;');

        fs.writeFileSync('./routes/' + dir, file, 'utf8', function (err) {
            if (err) reject(Error(err));
        });

        route.state = utils.settings.routes.state.pending;

        if (modules && modules[dir] && modules[dir].routes)
            modules[dir].routes.push(route);

        resolve(route);
    });
}

function parseViews(dir) {
    dir = './views/' + dir.replace('.js', '');

    try {
        !fs.statSync(dir);
    }
    catch (err) {
        return null;
    }

    if (modules && modules[dir] && modules[dir].views)
        return modules[dir].views;

    var views = [];
    
    utils.io.forEachDir(dir, true, function (file, filePath) {

        var ds = path.parse(filePath);
        if (ds.ext === '.html') {
            var name = ds.name.split('.')[0];
            if (!views[name]) views[name] = {};

            var sufix = ds.name.split('.')[1];
            switch (sufix) {
                case 'header': {
                    views[name].header = ds.name;
                    break;
                }
                case 'footer': {
                    views[name].footer = ds.name;
                    break;

                }
                default: {
                    views[name].path = ds.dir;
                    views[name].name = name;
                    break;

                }
            }
        }
    });
    
    var result = []
    for(var view in views){
        views[view].id = result.length + 1;
        result.push(views[view]);   
    }
    return result;
}

module.exports = {
    default: function (app) {
        log.event('Carregando Rotas...');
        loadRoute('./' + defaultRootRoutesFolder, app);
    },
    parse: function (dir) {
        return parseRoute(dir);
    },
    parseViews: function (dir) {
        return parseViews(dir);
    },
    create: function (dir, route) {
        return createRoute(dir, route);
    }
}