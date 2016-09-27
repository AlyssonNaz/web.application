var express = require('express');
var router = express.Router();
var auth = requireCore('rah.auth');
var db = requireCore('rah.db');
var cache = requireCore('rah.cache');


function organizeMenus(cachedMenus, menus) {
    menus.map(function (item) {

        if (!cachedMenus[item.dataValues.data.context])
            cachedMenus[item.dataValues.data.context] = {};

        var cache = cachedMenus[item.dataValues.data.context];


        if (!item.dataValues.Parent && !cache[item.dataValues.id].menu) {
            cache[item.dataValues.id] = {menu: item};
        } else {
            if (item.dataValues.Parent) {
                if (!cache[item.dataValues.Parent.id])
                    cache[item.dataValues.Parent.id] = {
                        menu: item.dataValues.Parent
                    };

                if (!cache[item.dataValues.Parent.id].menus)
                    cache[item.dataValues.Parent.id].menus = [];
            }

            cache[item.dataValues.Parent.id].menus.push(item);
        }
    });
}

router.post('/', auth.req, function (req, res, next) {
    var menu = db.model('menu');

    var menusCache = cache.get('gui.menus');

    if (!menusCache)
        menusCache = {};

    var contextCache = menusCache[req.token.context];

    if (contextCache) {
        res.json({menus: menusCache});
    } else {
        menu.findAll({include: [{model: db.model('menu'), as: 'Parent'}]}).then(function (menus) {

            organizeMenus(menusCache, menus);

            cache.set('gui.menus', menusCache);

            res.json({menus: menusCache[req.token.context]});

        }).catch(function (err) {
            res.status(404).json(err)
        });
    }
});

module.exports = router;
