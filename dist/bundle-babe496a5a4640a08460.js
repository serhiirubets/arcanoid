!function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=5)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.config=void 0,e.config={block:{rows:4,cols:8,width:60,height:20,gap:4,startX:65,startY:35},ball:{width:20,height:20},platform:{width:100,height:14},game:{width:640,height:360}}},function(t,e,o){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.MovableComponent=void 0;var r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.velocity=6,e.dx=0,e}return n(e,t),e}(o(2).BaseComponent);e.MovableComponent=r},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BaseComponent=void 0;var i=function(){function t(t,e){this.width=t,this.height=e,this.x=0,this.y=0}return t.prototype.setCoords=function(t,e){this.x=t,this.y=e},t}();e.BaseComponent=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Key=void 0,function(t){t.arrowRight="ArrowRight",t.arrowLeft="ArrowLeft",t.space=" "}(e.Key||(e.Key={}))},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.loadAudio=e.loadPicture=e.getRandomNumber=e.getCenterXCoord=void 0,e.getCenterXCoord=function(t,e){return t/2-e/2},e.getRandomNumber=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var o=t-.5+Math.random()*(e-t+1);return Math.round(o)},e.loadPicture=function(t,e){return new Promise((function(o){t.src=e,t.addEventListener("load",(function(){return o()}))}))},e.loadAudio=function(t){return new Promise((function(e){t.addEventListener("canplaythrough",(function(){return e()}),{once:!0})}))}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(6),n=document.querySelector("#canvas");new i.Game(n).start()},function(t,e,o){"use strict";var i=this&&this.__spreadArrays||function(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var i=Array(t),n=0;for(e=0;e<o;e++)for(var r=arguments[e],s=0,a=r.length;s<a;s++,n++)i[n]=r[s];return i},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var r=o(7),s=o(4),a=o(8),c=o(9),l=o(0),u=o(3),h=n(o(11)),p=n(o(12)),f=n(o(13)),d=n(o(14)),y=n(o(15)),v={backgroundImage:h.default,ballImage:p.default,platformImage:f.default,blockImage:d.default},b={bump:y.default},m=function(){function t(t){var e=this;this.canvas=t,this.sprites={},this.sounds={},this.ball=new a.Ball(this),this.platform=new r.Platform(this.ball),this.blocks=new c.Blocks(l.config.block.rows,l.config.block.cols),this.isRunning=!0,this.score=0,this.onWindowKeydown=function(t){t.key!==u.Key.arrowLeft&&t.key!==u.Key.arrowRight?t.key===u.Key.space&&e.platform.fire():e.platform.start(t.key)},this.onWindowKeyup=function(){e.platform.stop()},this.ctx=this.canvas.getContext("2d"),this.setFonts()}return t.prototype.setFonts=function(){this.ctx.font="20px Arial",this.ctx.fillStyle="#fff"},t.prototype.start=function(){this.preload(),this.setEvents(),this.run()},t.prototype.setEvents=function(){window.addEventListener("keydown",this.onWindowKeydown),window.addEventListener("keyup",this.onWindowKeyup)},t.prototype.setUpAssets=function(){var t=this;Object.keys(v).forEach((function(e){t.sprites[e]=new Image,t.sprites[e].src=v[e]})),Object.keys(b).forEach((function(e){t.sounds[e]=new Audio(b[e])}))},t.prototype.preloadImageAssets=function(){var t=this;return Object.keys(v).map((function(e){return s.loadPicture(t.sprites[e],v[e])}))},t.prototype.preloadAudioAssets=function(){var t=this;return Object.keys(b).map((function(e){return s.loadAudio(t.sounds[e])}))},t.prototype.preloadAssets=function(){this.preloadedAssets=i(this.preloadImageAssets(),this.preloadAudioAssets())},t.prototype.preload=function(){this.setUpAssets(),this.blocks.create(),this.platform.setCoords(s.getCenterXCoord(this.canvas.width,l.config.platform.width),300),this.ball.setCoords(s.getCenterXCoord(this.canvas.width,l.config.ball.width),280),this.preloadAssets()},t.prototype.renderPlatform=function(){this.ctx.drawImage(this.sprites.platformImage,this.platform.x,this.platform.y)},t.prototype.renderBackground=function(){this.ctx.drawImage(this.sprites.backgroundImage,0,0)},t.prototype.renderBall=function(){this.ctx.drawImage(this.sprites.ballImage,this.ball.frame*this.ball.width,0,this.ball.width,this.ball.height,this.ball.x,this.ball.y,this.ball.width,this.ball.height)},t.prototype.renderBlocks=function(){var t=this;this.blocks.blocks.forEach((function(e){e.active&&t.ctx.drawImage(t.sprites.blockImage,e.x,e.y)}))},t.prototype.clearCanvas=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.render=function(){var t=this;this.clearCanvas(),Promise.all(this.preloadedAssets).then((function(){t.renderBackground(),t.renderPlatform(),t.renderBall(),t.renderBlocks(),t.renderScoreText()}))},t.prototype.collideBlocks=function(){for(var t=0,e=this.blocks.blocks;t<e.length;t++){var o=e[t];o.active&&this.ball.collide(o)&&(this.ball.bumpBlock(o),this.addScore(),this.bumpPlay())}},t.prototype.collidePlatform=function(){this.ball.collide(this.platform)&&(this.ball.bumpPlatform(this.platform),this.bumpPlay())},t.prototype.bumpPlay=function(){this.sounds.bump.play()},t.prototype.updateState=function(){this.collideBlocks(),this.collidePlatform(),this.ball.collideCanvasSides(),this.platform.collideCanvasSides(),this.platform.move(),this.ball.move()},t.prototype.stop=function(){this.isRunning=!1,this.ball.stop()},t.prototype.run=function(){var t=this;this.isRunning&&window.requestAnimationFrame((function(){t.updateState(),t.render(),t.run()}))},t.prototype.end=function(t){this.stop(),alert(t),window.location.reload()},t.prototype.addScore=function(){this.score++,this.score>=this.blocks.blocks.length&&this.end("Successfully finish")},t.prototype.renderScoreText=function(){this.ctx.fillText("Score: "+this.score,290,23)},t}();e.Game=m},function(t,e,o){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.Platform=void 0;var r=o(1),s=o(3),a=o(0),c=function(t){function e(e){var o=t.call(this,a.config.platform.width,a.config.platform.height)||this;return o.ball=e,o}return n(e,t),e.prototype.start=function(t){t===s.Key.arrowLeft?this.dx=-this.velocity:this.dx=this.velocity},e.prototype.move=function(){this.dx&&(this.x+=this.dx,this.ball&&(this.ball.x+=this.dx))},e.prototype.fire=function(){this.ball&&(this.ball.start(),this.ball=null)},e.prototype.stop=function(){this.dx=0},e.prototype.getTouchOffset=function(t){var e=this.x+this.width-t;return 2*(this.width-e)/this.width-1},e.prototype.collideCanvasSides=function(){var t=this.x+this.dx,e=t+this.width,o=a.config.game.width;(t<0||e>o)&&(this.dx=0)},e}(r.MovableComponent);e.Platform=c},function(t,e,o){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.Ball=void 0;var r=o(1),s=o(4),a=o(0),c=function(t){function e(e){var o=t.call(this,a.config.ball.width,a.config.ball.height)||this;return o.game=e,o.velocity=3,o.dy=0,o.dx=0,o.frame=0,o}return n(e,t),e.prototype.animate=function(){var t=this;this.timer=window.setInterval((function(){t.frame++,t.frame>3&&(t.frame=0)}),100)},e.prototype.start=function(){this.dy=-this.velocity,this.dx=s.getRandomNumber(-this.velocity,this.velocity),this.animate()},e.prototype.move=function(){this.dx&&(this.x+=this.dx),this.dy&&(this.y+=this.dy)},e.prototype.stop=function(){this.dx=0,this.dy=0,clearInterval(this.timer)},e.prototype.collide=function(t){var e=this.x+this.dx,o=this.y+this.dy;return e+this.width>t.x&&e<t.x+t.width&&o+this.height>t.y&&o<t.y+t.height},e.prototype.bumpBlock=function(t){this.dy*=-1,t.bump()},e.prototype.bumpPlatform=function(t){if(t.dx&&(this.x+=t.dx),this.dy>0){this.dy=-this.velocity;var e=this.x+this.width/2;this.dx=this.velocity*t.getTouchOffset(e)}},e.prototype.collideCanvasSides=function(){var t=this.x+this.dx,e=this.y+this.dy,o=t,i=o+this.width,n=e,r=n+this.height,s=a.config.game.width,c=a.config.game.height;o<0?(this.x=0,this.dx=this.velocity,this.game.bumpPlay()):i>s?(this.x=s-this.width,this.dx=-this.velocity,this.game.bumpPlay()):n<0?(this.dy=this.velocity,this.y=0,this.game.bumpPlay()):r>c&&(this.game.bumpPlay(),this.game.end("Game is finished"))},e}(r.MovableComponent);e.Ball=c},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Blocks=void 0;var i=o(10),n=o(0),r=function(){function t(t,e){this.row=t,this.cols=e,this.blocks=[]}return t.prototype.create=function(){for(var t=n.config.block,e=t.width,o=t.height,r=t.startX,s=t.startY,a=0;a<this.row;a++)for(var c=0;c<this.cols;c++){var l=new i.Block(e,o),u=(e+n.config.block.gap)*c+r,h=(o+n.config.block.gap)*a+s;l.setCoords(u,h),this.blocks.push(l)}},t}();e.Blocks=r},function(t,e,o){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.Block=void 0;var r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.active=!0,e}return n(e,t),e.prototype.bump=function(){this.active=!1},e}(o(2).BaseComponent);e.Block=r},function(t,e,o){"use strict";o.r(e),e.default=o.p+"assets/background.png"},function(t,e,o){"use strict";o.r(e),e.default=o.p+"assets/ball.png"},function(t,e,o){"use strict";o.r(e),e.default=o.p+"assets/platform.png"},function(t,e,o){"use strict";o.r(e),e.default=o.p+"assets/block.png"},function(t,e,o){"use strict";o.r(e),e.default=o.p+"assets/bump.mp3"}]);