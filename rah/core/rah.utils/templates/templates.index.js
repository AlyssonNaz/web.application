var path = require('path');
var io = requireCore('rah.utils/io/io.index.js');
var settings = requireCore('rah.utils/settings/settings.index.js').templates;

function getTemplates() {
    var templates = [];
    io.forEachDir(settings.templatespath, true, function (file, filePath) {
        if (file.indexOf('.layout.html') > -1) {
            var name = file.replace('.layout.html', '');
            templates.push({
                name,
                path: filePath.replace('/views', '')
            });
        }
    });
    return templates;
}

function normalizeExt(file, extension) {
    if (path.parse(file).ext != extension) {
        return file + extension;
    }
}

function renderTemplates() {
    var templates = {};
    getTemplates().forEach(function (template) {
        templates[template.name] = function (res, params) {

            if (!params.title) {
                throw 'Título não informado!';
            }

            if (!params.root) {
                params.root = '/';
            }

            var result = {
                header: null,
                footer: null,
                data: params.data,
                title: params.title,
                subtitle: params.subtitle
            };

            if (params.view) {
                result.view = normalizeExt(path.join('../../', params.root, params.view), '.html')
            }

            if (params.header) {
                result.header = normalizeExt(path.join('../../', params.root, params.header), '.html');
            }

            if (params.footer) {
                result.footer = normalizeExt(path.join('../../', params.root, params.footer), '.html')
            }

            res.render(template.path, result);
        }
    }, this);
    return templates;
}


module.exports = renderTemplates();