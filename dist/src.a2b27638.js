// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
var holes = document.querySelectorAll(".hole");
var moles = document.querySelectorAll(".mole");
var startButton = document.querySelector("#start");
// TODO: Add the missing query selectors:
var score = document.querySelector("#score"); // Use querySelector() to get the score element
var timerDisplay = document.querySelector("#timer"); // use querySelector() to get the timer element.
//const audioHit = new Audio("./assets/hit.mp3");
//const audioStart = new Audio("./assets/cyber.mp3");

var time = 10;
var timer;
var lastHole = 0;
var points = 0;
var difficulty = "normal";
startButton.addEventListener("click", startGame);

/*
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  }
  if (difficulty === "normal") {
    return 1000;
  }
  if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of
 * it (lastHole = hole) and return the hole
 *
 * Example:
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

function chooseHole(holes) {
  // TODO: Write your code here.
  // 1. Generate a random integer from 0 to 8 and assign it to an index variable.
  // 2. Get a random hole with the random index (e.g., const hole = holes[index]).
  // 3. if hole === lastHole, then call chooseHole(holes) again because you don't want to return the same hole.
  // 4. if hole is not the same as the lastHole, then keep track of it (lastHole = hole) and return the hole.
  var index = randomInteger(0, 8);
  var hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}
function toggleVisibility(hole) {
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  hole.classList.toggle("show");
  return hole;
}

/**
 *
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden. The function calls
 * `toggleVisibility` to show or hide the mole. The function should return
 * the timeoutID
 *
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  // TODO: call the toggleVisibility function so that it adds the 'show' class.

  var timeoutID = setTimeout(function () {
    toggleVisibility(hole);
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
 * This function simply calls the `showAndHide` function with a specific
 * delay and hole. The function needs to call `setDelay()` and `chooseHole()`
 * to call `showAndHide(hole, delay)`.
 **/

function showUp() {
  var delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  var hole = chooseHole(holes); // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

/**
 *
 * The purpose of this function is simply to determine if the game should
 * continue or stop. The game continues if there is still time `if(time > 0)`.
 * If there is still time then `showUp()` needs to be called again so that
 * it sets a different delay and a different hole. If there is no more time
 * then it should call the `stopGame()` function. The function also needs to
 * return the timeoutId if the game continues or the string "game stopped"
 * if the game is over.
 *
 *  // if time > 0:
 *  //   timeoutId = showUp()
 *  //   return timeoutId
 *  // else
 *  //   gameStopped = stopGame()
 *  //   return gameStopped
 *
 */

function gameOver() {
  if (time > 0) {
    timeoutID = showUp();
    return timeoutID;
  } else {
    var gameStopped = stopGame();
    return gameStopped;
  }
}

/**
 *
 * This is the function that starts the game when the `startButton`
 * is clicked.
 *
 */
function startGame() {
  showUp();
  points = 0;
  clearScore();
  setDuration(15);
  startTimer();
  //audioStart.currentTime = 1.5;
  //audioStart.play();
  //audioStart.volume = 0.3;
  setEventListeners();
  return "game started";
}

/**
 *
 * This function increments the points global variable and updates the scoreboard.
 * Use the `points` global variable that is already defined and increment it by 1.
 * After the `points` variable is incremented proceed by updating the scoreboard
 * that you defined in the `index.html` file. To update the scoreboard you can use
 * `score.textContent = points;`. Use the comments in the function as a guide
 * for your implementation:
 *
 */
function updateScore() {
  // TODO: Write your code here
  points++;
  // Increment the points global variable by 1 point
  score.textContent = points;
  // Update score.textContent with points.
  return points;
}

/**
 *
 * This function clears the score by setting `points = 0`. It also updates
 * the board using `score.textContent = points`. The function should return
 * the points.
 *
 */
function clearScore() {
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}

/**
 *
 * This is the event handler that gets called when a player
 * clicks on a mole. The setEventListeners should use this event
 * handler (e.g. mole.addEventListener('click', whack)) for each of
 * the moles.
 *
 */
function whack() {
  // TODO: Write your code here.
  updateScore();
  //audioHit.currentTime = 0;
  //audioHit.play();
  return points;
}

/**
 *
 * Adds the 'click' event listeners to the moles. See the instructions
 * for an example on how to set event listeners using a for loop.
 */
function setEventListeners() {
  // TODO: Write your code here
  moles.forEach(function (mole) {
    return mole.addEventListener("click", whack);
  });
  return moles;
}

/**
 *
 * Starts the timer using setInterval. For each 1000ms (1 second)
 * the updateTimer function get called. This function is already implemented
 *
 */
function startTimer() {
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 *
 * Updates the control board with the timer if time > 0
 *
 */
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 *
 * This function sets the duration of the game. The time limit, in seconds,
 * that a player has to click on the sprites.
 *
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 *
 * This function is called when the game is stopped. It clears the
 * timer using clearInterval. Returns "game stopped".
 *
 */
function stopGame() {
  //stopAudio(song);  //optional
  //audioStart.pause();
  //audioStart.currentTime = 0;
  clearInterval(timer);
  return "game stopped";
}

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63519" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map