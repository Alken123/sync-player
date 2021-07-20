/*
 * popcorn.js version 1.5.6
 * http://popcornjs.org
 *
 * Copyright 2011, Mozilla Foundation
 * Licensed under the MIT license
 */

(function(r,q){function t(a){G.put.call(this,a)}function y(a){this.parent=a;this.byStart=[{start:-1,end:-1}];this.byEnd=[{start:-1,end:-1}];this.animating=[];this.endIndex=this.startIndex=0;this.previousUpdateTime=-1;this.count=1}function H(a,b){return function(){if(c.plugin.debug)return a.apply(this,arguments);try{return a.apply(this,arguments)}catch(e){c.plugin.errors.push({plugin:b,thrown:e,source:a.toString()});this.emit("pluginerror",c.plugin.errors)}}}if(q.addEventListener){var w=Array.prototype,
A=Object.prototype,B=w.forEach,C=w.slice,v=A.hasOwnProperty,D=A.toString,I=r.Popcorn,z=[],E=false,x={events:{hash:{},apis:{}}},F=function(){return r.requestAnimationFrame||r.webkitRequestAnimationFrame||r.mozRequestAnimationFrame||r.oRequestAnimationFrame||r.msRequestAnimationFrame||function(a){r.setTimeout(a,16)}}(),G={put:function(a){for(var b in a)if(a.hasOwnProperty(b))this[b]=a[b]}},c=function(a,b){return new c.p.init(a,b||null)};c.version="1.5.6";c.isSupported=true;c.instances=[];c.p=c.prototype=
{init:function(a,b){var e,d=this;if(typeof a==="function")if(q.readyState==="complete")a(q,c);else{z.push(a);if(!E){E=true;var g=function(){q.removeEventListener("DOMContentLoaded",g,false);for(var l=0,n=z.length;l<n;l++)z[l].call(q,c);z=null};q.addEventListener("DOMContentLoaded",g,false)}}else{if(typeof a==="string")try{e=q.querySelector(a)}catch(h){throw Error("Popcorn.js Error: Invalid media element selector: "+a);}this.media=e||a;e=this.media.nodeName&&this.media.nodeName.toLowerCase()||"video";
this[e]=this.media;this.options=c.extend({},b)||{};this.id=this.options.id||c.guid(e);if(c.byId(this.id))throw Error("Popcorn.js Error: Cannot use duplicate ID ("+this.id+")");this.isDestroyed=false;this.data={running:{cue:[]},timeUpdate:c.nop,disabled:{},events:{},hooks:{},history:[],state:{volume:this.media.volume},trackRefs:{},trackEvents:new y(this)};c.instances.push(this);var j=function(){if(d.media.currentTime<0)d.media.currentTime=0;d.media.removeEventListener("loadedmetadata",j,false);var l,
n,o,k,f;l=d.media.duration;l=l!=l?Number.MAX_VALUE:l+1;c.addTrackEvent(d,{start:l,end:l});if(!d.isDestroyed){d.data.durationChange=function(){var i=d.media.duration,u=i+1,p=d.data.trackEvents.byStart,m=d.data.trackEvents.byEnd;p.pop();m.pop();for(var s=m.length-1;s>0;s--)m[s].end>i&&d.removeTrackEvent(m[s]._id);for(m=0;m<p.length;m++)p[m].end>i&&d.removeTrackEvent(p[m]._id);d.data.trackEvents.byEnd.push({start:u,end:u});d.data.trackEvents.byStart.push({start:u,end:u})};d.media.addEventListener("durationchange",
d.data.durationChange,false)}if(d.options.frameAnimation){d.data.timeUpdate=function(){c.timeUpdate(d,{});c.forEach(c.manifest,function(i,u){if(n=d.data.running[u]){k=n.length;for(var p=0;p<k;p++){o=n[p];(f=o._natives)&&f.frame&&f.frame.call(d,{},o,d.currentTime())}}});d.emit("timeupdate");!d.isDestroyed&&F(d.data.timeUpdate)};!d.isDestroyed&&F(d.data.timeUpdate)}else{d.data.timeUpdate=function(i){c.timeUpdate(d,i)};d.isDestroyed||d.media.addEventListener("timeupdate",d.data.timeUpdate,false)}};d.media.addEventListener("error",
function(){d.error=d.media.error},false);d.media.readyState>=1?j():d.media.addEventListener("loadedmetadata",j,false);return this}}};c.p.init.prototype=c.p;c.byId=function(a){for(var b=c.instances,e=b.length,d=0;d<e;d++)if(b[d].id===a)return b[d];return null};c.forEach=function(a,b,e){if(!a||!b)return{};e=e||this;var d,g;if(B&&a.forEach===B)return a.forEach(b,e);if(D.call(a)==="[object NodeList]"){d=0;for(g=a.length;d<g;d++)b.call(e,a[d],d,a);return a}for(d in a)v.call(a,d)&&b.call(e,a[d],d,a);return a};
c.extend=function(a){var b=C.call(arguments,1);c.forEach(b,function(e){for(var d in e)a[d]=e[d]});return a};c.extend(c,{noConflict:function(a){if(a)r.Popcorn=I;return c},error:function(a){throw Error(a);},guid:function(a){c.guid.counter++;return(a?a:"")+(+new Date+c.guid.counter)},sizeOf:function(a){var b=0,e;for(e in a)b++;return b},isArray:Array.isArray||function(a){return D.call(a)==="[object Array]"},nop:function(){},position:function(a){if(!a.parentNode)return null;a=a.getBoundingClientRect();
var b={},e=q.documentElement,d=q.body,g,h,j;g=e.clientTop||d.clientTop||0;h=e.clientLeft||d.clientLeft||0;j=r.pageYOffset&&e.scrollTop||d.scrollTop;e=r.pageXOffset&&e.scrollLeft||d.scrollLeft;g=Math.ceil(a.top+j-g);h=Math.ceil(a.left+e-h);for(var l in a)b[l]=Math.round(a[l]);return c.extend({},b,{top:g,left:h})},disable:function(a,b){if(!a.data.disabled[b]){a.data.disabled[b]=true;if(b in c.registryByName&&a.data.running[b])for(var e=a.data.running[b].length-1,d;e>=0;e--){d=a.data.running[b][e];d._natives.end.call(a,
null,d);a.emit("trackend",c.extend({},d,{plugin:d.type,type:"trackend"}))}return a}},enable:function(a,b){if(a.data.disabled[b]){a.data.disabled[b]=false;if(b in c.registryByName&&a.data.running[b])for(var e=a.data.running[b].length-1,d;e>=0;e--){d=a.data.running[b][e];d._natives.start.call(a,null,d);a.emit("trackstart",c.extend({},d,{plugin:d.type,type:"trackstart",track:d}))}return a}},destroy:function(a){var b=a.data.events,e=a.data.trackEvents,d,g,h,j;for(g in b){d=b[g];for(h in d)delete d[h];
b[g]=null}for(j in c.registryByName)c.removePlugin(a,j);e.byStart.length=0;e.byEnd.length=0;if(!a.isDestroyed){a.data.timeUpdate&&a.media.removeEventListener("timeupdate",a.data.timeUpdate,false);a.isDestroyed=true}c.instances.splice(c.instances.indexOf(a),1)}});c.guid.counter=1;c.extend(c.p,function(){var a={};c.forEach("load play pause currentTime playbackRate volume duration preload playbackRate autoplay loop controls muted buffered readyState seeking paused played seekable ended".split(/\s+/g),
function(b){a[b]=function(e){var d;if(typeof this.media[b]==="function"){if(e!=null&&/play|pause/.test(b))this.media.currentTime=c.util.toSeconds(e);this.media[b]();return this}if(e!=null){d=this.media[b];this.media[b]=e;d!==e&&this.emit("attrchange",{attribute:b,previousValue:d,currentValue:e});return this}return this.media[b]}});return a}());c.forEach("enable disable".split(" "),function(a){c.p[a]=function(b){return c[a](this,b)}});c.extend(c.p,{roundTime:function(){return Math.round(this.media.currentTime)},
exec:function(a,b,e){var d=arguments.length,g="trackadded",h,j;try{j=c.util.toSeconds(a)}catch(l){}if(typeof j==="number")a=j;if(typeof a==="number"&&d===2){e=b;b=a;a=c.guid("cue")}else if(d===1)b=-1;else if(h=this.getTrackEvent(a)){this.data.trackEvents.remove(a);t.end(this,h);c.removeTrackEvent.ref(this,a);g="cuechange";if(typeof a==="string"&&d===2){if(typeof b==="number")e=h._natives.start;if(typeof b==="function"){e=b;b=h.start}}}else if(d>=2){if(typeof b==="string"){try{j=c.util.toSeconds(b)}catch(n){}b=
j}if(typeof b==="number")e=e||c.nop();if(typeof b==="function"){e=b;b=-1}}d={id:a,start:b,end:b+1,_running:false,_natives:{start:e||c.nop,end:c.nop,type:"cue"}};if(h)d=c.extend(h,d);if(g==="cuechange"){d._id=d.id||d._id||c.guid(d._natives.type);this.data.trackEvents.add(d);t.start(this,d);this.timeUpdate(this,null,true);c.addTrackEvent.ref(this,d);this.emit(g,c.extend({},d,{id:a,type:g,previousValue:{time:h.start,fn:h._natives.start},currentValue:{time:b,fn:e||c.nop},track:h}))}else c.addTrackEvent(this,
d);return this},mute:function(a){a=a==null||a===true?"muted":"unmuted";if(a==="unmuted"){this.media.muted=false;this.media.volume=this.data.state.volume}if(a==="muted"){this.data.state.volume=this.media.volume;this.media.muted=true}this.emit(a);return this},unmute:function(a){return this.mute(a==null?false:!a)},position:function(){return c.position(this.media)},toggle:function(a){return c[this.data.disabled[a]?"enable":"disable"](this,a)},defaults:function(a,b){if(c.isArray(a)){c.forEach(a,function(e){for(var d in e)this.defaults(d,
e[d])},this);return this}if(!this.options.defaults)this.options.defaults={};this.options.defaults[a]||(this.options.defaults[a]={});c.extend(this.options.defaults[a],b);return this}});c.Events={UIEvents:"blur focus focusin focusout load resize scroll unload",MouseEvents:"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave click dblclick",Events:"loadstart progress suspend emptied stalled play pause error loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange"};
c.Events.Natives=c.Events.UIEvents+" "+c.Events.MouseEvents+" "+c.Events.Events;x.events.apiTypes=["UIEvents","MouseEvents","Events"];(function(a,b){for(var e=x.events.apiTypes,d=a.Natives.split(/\s+/g),g=0,h=d.length;g<h;g++)b.hash[d[g]]=true;e.forEach(function(j){b.apis[j]={};for(var l=a[j].split(/\s+/g),n=l.length,o=0;o<n;o++)b.apis[j][l[o]]=true})})(c.Events,x.events);c.events={isNative:function(a){return!!x.events.hash[a]},getInterface:function(a){if(!c.events.isNative(a))return false;var b=
x.events,e=b.apiTypes;b=b.apis;for(var d=0,g=e.length,h,j;d<g;d++){j=e[d];if(b[j][a]){h=j;break}}return h},all:c.Events.Natives.split(/\s+/g),fn:{trigger:function(a,b){var e,d=this.data.events[a];if(d){if(e=c.events.getInterface(a)){e=q.createEvent(e);e.initEvent(a,true,true,r,1);this.media.dispatchEvent(e);return this}for(e=d.slice();e.length;)e.shift().call(this,b)}return this},listen:function(a,b){var e=this,d=true,g=c.events.hooks[a],h,j;if(typeof b!=="function")throw Error("Popcorn.js Error: Listener is not a function");
if(!this.data.events[a]){this.data.events[a]=[];d=false}if(g){g.add&&g.add.call(this,{},b);if(g.bind)a=g.bind;if(g.handler){j=b;b=function(l){g.handler.call(e,l,j)}}d=true;if(!this.data.events[a]){this.data.events[a]=[];d=false}}this.data.events[a].push(b);!d&&c.events.all.indexOf(a)>-1&&this.media.addEventListener(a,function(l){if(e.data.events[a])for(h=e.data.events[a].slice();h.length;)h.shift().call(e,l)},false);return this},unlisten:function(a,b){var e,d=this.data.events[a];if(d){if(typeof b===
"string"){for(e=0;e<d.length;e++)d[e].name===b&&d.splice(e--,1);return this}else if(typeof b==="function"){for(;e!==-1;){e=d.indexOf(b);e!==-1&&d.splice(e,1)}return this}this.data.events[a]=null;return this}}},hooks:{canplayall:{bind:"canplaythrough",add:function(a,b){var e=false;if(this.media.readyState){setTimeout(function(){b.call(this,a)}.bind(this),0);e=true}this.data.hooks.canplayall={fired:e}},handler:function(a,b){if(!this.data.hooks.canplayall.fired){b.call(this,a);this.data.hooks.canplayall.fired=
true}}}}};c.forEach([["trigger","emit"],["listen","on"],["unlisten","off"]],function(a){c.p[a[0]]=c.p[a[1]]=c.events.fn[a[0]]});t.start=function(a,b){if(b.end>a.media.currentTime&&b.start<=a.media.currentTime&&!b._running){b._running=true;a.data.running[b._natives.type].push(b);if(!a.data.disabled[b._natives.type]){b._natives.start.call(a,null,b);a.emit("trackstart",c.extend({},b,{plugin:b._natives.type,type:"trackstart",track:b}))}}};t.end=function(a,b){var e;if((b.end<=a.media.currentTime||b.start>
a.media.currentTime)&&b._running){e=a.data.running[b._natives.type];b._running=false;e.splice(e.indexOf(b),1);if(!a.data.disabled[b._natives.type]){b._natives.end.call(a,null,b);a.emit("trackend",c.extend({},b,{plugin:b._natives.type,type:"trackend",track:b}))}}};y.prototype.where=function(a){return(this.parent.getTrackEvents()||[]).filter(function(b){var e,d;if(!a)return true;for(e in a){d=a[e];if(b[e]&&b[e]===d||b._natives[e]&&b._natives[e]===d)return true}return false})};y.prototype.add=function(a){var b=
this.byStart,e=this.byEnd,d;a&&a._id&&this.parent.data.history.push(a._id);a.start=c.util.toSeconds(a.start,this.parent.options.framerate);a.end=c.util.toSeconds(a.end,this.parent.options.framerate);for(d=b.length-1;d>=0;d--)if(a.start>=b[d].start){b.splice(d+1,0,a);break}for(b=e.length-1;b>=0;b--)if(a.end>e[b].end){e.splice(b+1,0,a);break}d<=this.parent.data.trackEvents.startIndex&&a.start<=this.parent.data.trackEvents.previousUpdateTime&&this.parent.data.trackEvents.startIndex++;b<=this.parent.data.trackEvents.endIndex&&
a.end<this.parent.data.trackEvents.previousUpdateTime&&this.parent.data.trackEvents.endIndex++;this.count++};y.prototype.remove=function(a){if(a instanceof t)a=a.id;if(typeof a==="object"){this.where(a).forEach(function(k){this.removeTrackEvent(k._id)},this.parent);return this}var b,e,d;d=this.byStart.length;for(var g=0,h=0,j=[],l=[],n=[],o=[];--d>-1;){b=this.byStart[g];e=this.byEnd[g];if(!b._id){j.push(b);l.push(e)}if(b._id){b._id!==a&&j.push(b);e._id!==a&&l.push(e);if(b._id===a)h=g}g++}d=this.animating.length;
g=0;if(d)for(;--d>-1;){b=this.animating[g];b._id||n.push(b);b._id&&b._id!==a&&n.push(b);g++}h<=this.startIndex&&this.startIndex--;h<=this.endIndex&&this.endIndex--;this.byStart=j;this.byEnd=l;this.animating=n;this.count--;d=this.parent.data.history.length;for(g=0;g<d;g++)this.parent.data.history[g]!==a&&o.push(this.parent.data.history[g]);this.parent.data.history=o};c.addTrackEvent=function(a,b){var e;if(!(b instanceof t)){if((b=new t(b))&&b._natives&&b._natives.type&&a.options.defaults&&a.options.defaults[b._natives.type]){e=
c.extend({},b);c.extend(b,a.options.defaults[b._natives.type],e)}if(b._natives){b._id=b.id||b._id||c.guid(b._natives.type);if(b._natives._setup){b._natives._setup.call(a,b);a.emit("tracksetup",c.extend({},b,{plugin:b._natives.type,type:"tracksetup",track:b}))}}a.data.trackEvents.add(b);t.start(a,b);this.timeUpdate(a,null,true);b._id&&c.addTrackEvent.ref(a,b);a.emit("trackadded",c.extend({},b,b._natives?{plugin:b._natives.type}:{},{type:"trackadded",track:b}))}};c.addTrackEvent.ref=function(a,b){a.data.trackRefs[b._id]=
b;return a};c.removeTrackEvent=function(a,b){var e=a.getTrackEvent(b);if(e){e._natives._teardown&&e._natives._teardown.call(a,e);a.data.trackEvents.remove(b);c.removeTrackEvent.ref(a,b);e._natives&&a.emit("trackremoved",c.extend({},e,{plugin:e._natives.type,type:"trackremoved",track:e}))}};c.removeTrackEvent.ref=function(a,b){delete a.data.trackRefs[b];return a};c.getTrackEvents=function(a){var b=[];a=a.data.trackEvents.byStart;for(var e=a.length,d=0,g;d<e;d++){g=a[d];g._id&&b.push(g)}return b};c.getTrackEvents.ref=
function(a){return a.data.trackRefs};c.getTrackEvent=function(a,b){return a.data.trackRefs[b]};c.getTrackEvent.ref=function(a,b){return a.data.trackRefs[b]};c.getLastTrackEventId=function(a){return a.data.history[a.data.history.length-1]};c.timeUpdate=function(a,b){var e=a.media.currentTime,d=a.data.trackEvents.previousUpdateTime,g=a.data.trackEvents,h=g.endIndex,j=g.startIndex,l=g.byStart.length,n=g.byEnd.length,o=c.registryByName,k,f,i;if(d<=e){for(;g.byEnd[h]&&g.byEnd[h].end<=e;){k=g.byEnd[h];
f=(d=k._natives)&&d.type;if(!d||o[f]||a[f]){if(k._running===true){k._running=false;i=a.data.running[f];i.splice(i.indexOf(k),1);if(!a.data.disabled[f]){d.end.call(a,b,k);a.emit("trackend",c.extend({},k,{plugin:f,type:"trackend",track:k}))}}h++}else{c.removeTrackEvent(a,k._id);return}}for(;g.byStart[j]&&g.byStart[j].start<=e;){k=g.byStart[j];f=(d=k._natives)&&d.type;if(!d||o[f]||a[f]){if(k.end>e&&k._running===false){k._running=true;a.data.running[f].push(k);if(!a.data.disabled[f]){d.start.call(a,b,
k);a.emit("trackstart",c.extend({},k,{plugin:f,type:"trackstart",track:k}))}}j++}else{c.removeTrackEvent(a,k._id);return}}}else if(d>e){for(;g.byStart[j]&&g.byStart[j].start>e;){k=g.byStart[j];f=(d=k._natives)&&d.type;if(!d||o[f]||a[f]){if(k._running===true){k._running=false;i=a.data.running[f];i.splice(i.indexOf(k),1);if(!a.data.disabled[f]){d.end.call(a,b,k);a.emit("trackend",c.extend({},k,{plugin:f,type:"trackend",track:k}))}}j--}else{c.removeTrackEvent(a,k._id);return}}for(;g.byEnd[h]&&g.byEnd[h].end>
e;){k=g.byEnd[h];f=(d=k._natives)&&d.type;if(!d||o[f]||a[f]){if(k.start<=e&&k._running===false){k._running=true;a.data.running[f].push(k);if(!a.data.disabled[f]){d.start.call(a,b,k);a.emit("trackstart",c.extend({},k,{plugin:f,type:"trackstart",track:k}))}}h--}else{c.removeTrackEvent(a,k._id);return}}}g.endIndex=h;g.startIndex=j;g.previousUpdateTime=e;g.byStart.length<l&&g.startIndex--;g.byEnd.length<n&&g.endIndex--};c.extend(c.p,{getTrackEvents:function(){return c.getTrackEvents.call(null,this)},
getTrackEvent:function(a){return c.getTrackEvent.call(null,this,a)},getLastTrackEventId:function(){return c.getLastTrackEventId.call(null,this)},removeTrackEvent:function(a){c.removeTrackEvent.call(null,this,a);return this},removePlugin:function(a){c.removePlugin.call(null,this,a);return this},timeUpdate:function(a){c.timeUpdate.call(null,this,a);return this},destroy:function(){c.destroy.call(null,this);return this}});c.manifest={};c.registry=[];c.registryByName={};c.plugin=function(a,b,e){if(c.protect.natives.indexOf(a.toLowerCase())>=
0)c.error("'"+a+"' is a protected function name");else{var d=typeof b==="function",g=["start","end","type","manifest"],h=["_setup","_teardown","start","end","frame"],j={},l=function(k,f){k=k||c.nop;f=f||c.nop;return function(){k.apply(this,arguments);f.apply(this,arguments)}};c.manifest[a]=e=e||b.manifest||{};h.forEach(function(k){b[k]=H(b[k]||c.nop,a)});var n=function(k,f){if(!f)return this;if(f.ranges&&c.isArray(f.ranges)){c.forEach(f.ranges,function(m){m=c.extend({},f,m);delete m.ranges;this[a](m)},
this);return this}var i=f._natives={},u="",p;c.extend(i,k);f._natives.type=f._natives.plugin=a;f._running=false;i.start=i.start||i["in"];i.end=i.end||i.out;if(f.once)i.end=l(i.end,function(){this.removeTrackEvent(f._id)});i._teardown=l(function(){var m=C.call(arguments),s=this.data.running[i.type];m.unshift(null);m[1]._running&&s.splice(s.indexOf(f),1)&&i.end.apply(this,m);m[1]._running=false;this.emit("trackend",c.extend({},f,{plugin:i.type,type:"trackend",track:c.getTrackEvent(this,f.id||f._id)}))},
i._teardown);i._teardown=l(i._teardown,function(){this.emit("trackteardown",c.extend({},f,{plugin:a,type:"trackteardown",track:c.getTrackEvent(this,f.id||f._id)}))});f.compose=f.compose||[];if(typeof f.compose==="string")f.compose=f.compose.split(" ");f.effect=f.effect||[];if(typeof f.effect==="string")f.effect=f.effect.split(" ");f.compose=f.compose.concat(f.effect);f.compose.forEach(function(m){u=c.compositions[m]||{};h.forEach(function(s){i[s]=l(i[s],u[s])})});f._natives.manifest=e;if(!("start"in
f))f.start=f["in"]||0;if(!f.end&&f.end!==0)f.end=f.out||Number.MAX_VALUE;if(!v.call(f,"toString"))f.toString=function(){var m=["start: "+f.start,"end: "+f.end,"id: "+(f.id||f._id)];f.target!=null&&m.push("target: "+f.target);return a+" ( "+m.join(", ")+" )"};if(!f.target){p="options"in e&&e.options;f.target=p&&"target"in p&&p.target}if(!f._id&&f._natives)f._id=c.guid(f._natives.type);if(f instanceof t){if(f._natives){f._id=f.id||f._id||c.guid(f._natives.type);if(f._natives._setup){f._natives._setup.call(this,
f);this.emit("tracksetup",c.extend({},f,{plugin:f._natives.type,type:"tracksetup",track:f}))}}this.data.trackEvents.add(f);t.start(this,f);this.timeUpdate(this,null,true);f._id&&c.addTrackEvent.ref(this,f)}else c.addTrackEvent(this,f);c.forEach(k,function(m,s){g.indexOf(s)===-1&&this.on(s,m)},this);return this};c.p[a]=j[a]=function(k,f){var i,u;if(k&&!f)f=k;else if(i=this.getTrackEvent(k)){u=f;var p={},m;for(m in i)if(v.call(u,m)&&v.call(i,m))p[m]=i[m];if(i._natives._update){this.data.trackEvents.remove(i);
if(v.call(f,"start"))i.start=f.start;if(v.call(f,"end"))i.end=f.end;t.end(this,i);d&&b.call(this,i);i._natives._update.call(this,i,f);this.data.trackEvents.add(i);t.start(this,i)}else{c.extend(i,f);this.data.trackEvents.remove(k);i._natives._teardown&&i._natives._teardown.call(this,i);c.removeTrackEvent.ref(this,k);if(d)n.call(this,b.call(this,i),i);else{i._id=i.id||i._id||c.guid(i._natives.type);if(i._natives&&i._natives._setup){i._natives._setup.call(this,i);this.emit("tracksetup",c.extend({},i,
{plugin:i._natives.type,type:"tracksetup",track:i}))}this.data.trackEvents.add(i);t.start(this,i);this.timeUpdate(this,null,true);c.addTrackEvent.ref(this,i)}this.emit("trackchange",{id:i.id,type:"trackchange",previousValue:p,currentValue:i,track:i});return this}i._natives.type!=="cue"&&this.emit("trackchange",{id:i.id,type:"trackchange",previousValue:p,currentValue:u,track:i});return this}else f.id=k;this.data.running[a]=this.data.running[a]||[];i=c.extend({},this.options.defaults&&this.options.defaults[a]||
{},f);n.call(this,d?b.call(this,i):b,i);return this};e&&c.extend(b,{manifest:e});var o={fn:j[a],definition:b,base:b,parents:[],name:a};c.registry.push(c.extend(j,o,{type:a}));c.registryByName[a]=o;return j}};c.plugin.errors=[];c.plugin.debug=c.version==="1.5.6";c.removePlugin=function(a,b){if(!b){b=a;a=c.p;if(c.protect.natives.indexOf(b.toLowerCase())>=0){c.error("'"+b+"' is a protected function name");return}var e=c.registry.length,d;for(d=0;d<e;d++)if(c.registry[d].name===b){c.registry.splice(d,
1);delete c.registryByName[b];delete c.manifest[b];delete a[b];return}}e=a.data.trackEvents.byStart;d=a.data.trackEvents.byEnd;var g=a.data.trackEvents.animating,h,j;h=0;for(j=e.length;h<j;h++){if(e[h]&&e[h]._natives&&e[h]._natives.type===b){e[h]._natives._teardown&&e[h]._natives._teardown.call(a,e[h]);e.splice(h,1);h--;j--;if(a.data.trackEvents.startIndex<=h){a.data.trackEvents.startIndex--;a.data.trackEvents.endIndex--}}d[h]&&d[h]._natives&&d[h]._natives.type===b&&d.splice(h,1)}h=0;for(j=g.length;h<
j;h++)if(g[h]&&g[h]._natives&&g[h]._natives.type===b){g.splice(h,1);h--;j--}};c.compositions={};c.compose=function(a,b,e){c.manifest[a]=e||b.manifest||{};c.compositions[a]=b};c.plugin.effect=c.effect=c.compose;var J=/^(?:\.|#|\[)/;c.dom={debug:false,find:function(a,b){var e=null;b=b||q;if(a){if(!J.test(a)){e=q.getElementById(a);if(e!==null)return e}try{e=b.querySelector(a)}catch(d){if(c.dom.debug)throw Error(d);}}return e}};var K=/\?/,L={ajax:null,url:"",data:"",dataType:"",success:c.nop,type:"GET",
async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8"};c.xhr=function(a){a.dataType=a.dataType&&a.dataType.toLowerCase()||null;if(a.dataType&&(a.dataType==="jsonp"||a.dataType==="script"))c.xhr.getJSONP(a.url,a.success,a.dataType==="script");else{a=c.extend({},L,a);a.ajax=new XMLHttpRequest;if(a.ajax){if(a.type==="GET"&&a.data){a.url+=(K.test(a.url)?"&":"?")+a.data;a.data=null}a.ajax.open(a.type,a.url,a.async);a.type==="POST"&&a.ajax.setRequestHeader("Content-Type",a.contentType);
a.ajax.send(a.data||null);return c.xhr.httpData(a)}}};c.xhr.httpData=function(a){var b,e=null,d,g=null;a.ajax.onreadystatechange=function(){if(a.ajax.readyState===4){try{e=JSON.parse(a.ajax.responseText)}catch(h){}b={xml:a.ajax.responseXML,text:a.ajax.responseText,json:e};if(!b.xml||!b.xml.documentElement){b.xml=null;try{d=new DOMParser;g=d.parseFromString(a.ajax.responseText,"text/xml");if(!g.getElementsByTagName("parsererror").length)b.xml=g}catch(j){}}if(a.dataType)b=b[a.dataType];a.success.call(a.ajax,
b)}};return b};c.xhr.getJSONP=function(a,b,e){var d=q.head||q.getElementsByTagName("head")[0]||q.documentElement,g=q.createElement("script"),h=false,j=[];j=/(=)\?(?=&|$)|\?\?/;var l,n;if(!e){n=a.match(/(callback=[^&]*)/);if(n!==null&&n.length){j=n[1].split("=")[1];if(j==="?")j="jsonp";l=c.guid(j);a=a.replace(/(callback=[^&]*)/,"callback="+l)}else{l=c.guid("jsonp");if(j.test(a))a=a.replace(j,"$1"+l);j=a.split(/\?(.+)?/);a=j[0]+"?";if(j[1])a+=j[1]+"&";a+="callback="+l}window[l]=function(o){b&&b(o);
h=true}}g.addEventListener("load",function(){e&&b&&b();h&&delete window[l];d.removeChild(g)},false);g.addEventListener("error",function(o){b&&b({error:o});e||delete window[l];d.removeChild(g)},false);g.src=a;d.insertBefore(g,d.firstChild)};c.getJSONP=c.xhr.getJSONP;c.getScript=c.xhr.getScript=function(a,b){return c.xhr.getJSONP(a,b,true)};c.util={toSeconds:function(a,b){var e=/^([0-9]+:){0,2}[0-9]+([.;][0-9]+)?$/,d,g,h;if(typeof a==="number")return a;typeof a==="string"&&!e.test(a)&&c.error("Invalid time format");
e=a.split(":");d=e.length-1;g=e[d];if(g.indexOf(";")>-1){g=g.split(";");h=0;if(b&&typeof b==="number")h=parseFloat(g[1],10)/b;e[d]=parseInt(g[0],10)+h}d=e[0];return{1:parseFloat(d,10),2:parseInt(d,10)*60+parseFloat(e[1],10),3:parseInt(d,10)*3600+parseInt(e[1],10)*60+parseFloat(e[2],10)}[e.length||1]}};c.p.cue=c.p.exec;c.protect={natives:function(a){return Object.keys?Object.keys(a):function(b){var e,d=[];for(e in b)v.call(b,e)&&d.push(e);return d}(a)}(c.p).map(function(a){return a.toLowerCase()})};
c.forEach({listen:"on",unlisten:"off",trigger:"emit",exec:"cue"},function(a,b){var e=c.p[b];c.p[b]=function(){if(typeof console!=="undefined"&&console.warn){console.warn("Deprecated method '"+b+"', "+(a==null?"do not use.":"use '"+a+"' instead."));c.p[b]=e}return c.p[a].apply(this,[].slice.call(arguments))}});r.Popcorn=c}else{r.Popcorn={isSupported:false};for(w="byId forEach extend effects error guid sizeOf isArray nop position disable enable destroyaddTrackEvent removeTrackEvent getTrackEvents getTrackEvent getLastTrackEventId timeUpdate plugin removePlugin compose effect xhr getJSONP getScript".split(/\s+/);w.length;)r.Popcorn[w.shift()]=
function(){}}})(window,window.document);
{"mode":"full","isActive":false}
