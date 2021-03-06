MyGame = {
    input: {},
    components: {},
    renderer: {},
    utilities: {},
    assets: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [
            {
                scripts: ['../pages/menuSystem'],
                message: 'Menu System Loaded',
                onComplete: null,
            }, {
                scripts: ['../input/input'],
                message: 'Input loaded',
                onComplete: null
            }, {
                scripts: ['../pages/tower-defense', '../pages/options', '../pages/credits', '../pages/game-options', '../pages/high-scores', '../pages/keybindings', '../pages/main-menu', '../pages/score-screen', '../pages/readme'],
                message: 'Page scripts loaded',
                onComplete: null,
            }, {
                scripts: ['../utility/PriorityQueue', '../utility/pathfinder', '../utility/angles'],
                message: 'Utilities loaded',
                onComplete: null
            }, {
                scripts: ['../game/audioPrefabs'],
                message: 'Audio loaded',
            },  {
                scripts: ['../game/TowerDefense', '../game/prefabs', '../game/levels', '../game/particleSystem'],
                message: 'Game State Loaded',
                onComplete: null
            }, {
                scripts: ['../game/gameRenderer'],
                message: 'Renderer loaded',
                onComplete: null
            },
            ],
        assetOrder = [
            {
                key: 'maskman',
                source: '../../assets/monsters/maskman-png-copy.png'
            }, {
                key: 'greenDemon',
                source: '../../assets/monsters/greenDemon.png'
            }, {
                key : 'greyTurret',
                source: '../../assets/turrets/turrets.png'
            }, {
                key : 'fireball',
                source: '../../assets/projectiles/FireBomb.png'
            }, {
                key : 'upgradeStar',
                source: '../../assets/turrets/UpgradeStar.png'
            }, {
                key : 'littleBomb',
                source: '../../assets/projectiles/spr_missile.png'
            }, {
                key : 'littleBlueBomb',
                source: '../../assets/projectiles/spr_missile_blue.png'
            }, {
                key : 'littleRedBomb',
                source: '../../assets/projectiles/spr_missile_red.png'
            }, {
                key : 'plane',
                source: '../../assets/monsters/plane.png'
            }, {
                key : 'fireballair',
                source: '../../assets/projectiles/FireBombAir.png'
            }, {
                key : 'superLaserTurret',
                source: '../../assets/turrets/WallTurret-hd.png'
            }, {
                key : 'seekingTurret',
                source: '../../assets/turrets/tank2.png'
            }, {
                key : 'seekingMine',
                source: '../../assets/projectiles/Mine.png'
            }, {
                key : 'background',
                source: '../../assets/landscape/scifitiles-sheet.png'
            }, {
                key : 'laser',
                source: '../../assets/audio/laser.wav'
            }, {
                key : 'explosion',
                source: '../../assets/audio/explosion.wav'
            }, {
                key : 'death',
                source: '../../assets/audio/death.wav'
            }, {
                key : 'sold',
                source: '../../assets/audio/sold.wav'
            }, {
                key : 'plunk',
                source: '../../assets/audio/plunk.ogg'
            }

        ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'assets/url/asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest(),
            asset = null,
            fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('it is all loaded up');
        Menu.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());
