var express = require('express');
var router = express.Router();
var auth = requireCore('rah.auth');
var db = requireCore('rah.db');
var cache = requireCore('rah.cache');


router.post('/', auth.req, function (req, res, next) {
    var menu = db.model('menu');

    var menusCache = cache.get('gui.menus');
    if (menusCache) {
        res.json({menus: menusCache});
    } else {
        menu.findAll({include: [{model: db.model('menu'), as: 'Parent'}]}).then(function (menus) {
            cache.set('gui.menus', menus);
            res.json({menus: menus});
        }).catch(function (err) {
            res.status(404).json(err)
        });
    }
});

module.exports = router;
