!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i:"function"==typeof define&&define.amd?define("JZZ.midi.SMF",["JZZ"],i):i(JZZ)}(0,function(a){if(!a.MIDI.SMF){var s="0.1.4",r=a.lib.now;((p.prototype=[]).constructor=p).prototype.dup=function(t){d("Copy-constructor not yet implemented")},p.prototype.load=function(t){"RIFF"==t.substr(0,4)&&"RMIDdata"==t.substr(8,8)&&(this.rmi=!0,t=t.substr(20,t.charCodeAt(16)+256*t.charCodeAt(17)+65536*t.charCodeAt(18)+16777216*t.charCodeAt(19))),this.loadSMF(t)},p.prototype.loadSMF=function(t){"MThd\0\0\0"!=t.substr(0,8)&&d("Not a MIDI file"),this.type=16*t.charCodeAt(8)+t.charCodeAt(9),this.ntrk=16*t.charCodeAt(10)+t.charCodeAt(11),127<t.charCodeAt(12)?(this.fps=256-t.charCodeAt(12),this.ppf=t.charCodeAt(13)):this.ppqn=256*t.charCodeAt(12)+t.charCodeAt(13),(2<this.type||0==this.type&&1<this.ntrk||!this.ppf&&!this.ppqn)&&d("Invalid MIDI header");for(var i=0,r=14;r<t.length;){var s=t.substr(r,4);"MTrk"==s&&i++;var h=(t.charCodeAt(r+4)<<24)+(t.charCodeAt(r+5)<<16)+(t.charCodeAt(r+6)<<8)+t.charCodeAt(r+7);r+=8;var o=t.substr(r,h);this.push(new c(s,o)),r+=h}r==t.length&&i==this.ntrk||d("Corrupted MIDI file")},p.prototype.dump=function(){for(var t="",i=this.ntrk=0;i<this.length;i++)this[i]instanceof l&&this.ntrk++,t+=this[i].dump();return t=(this.ppqn?h(this.ppqn):String.fromCharCode(256-this.fps)+String.fromCharCode(this.ppf))+t,t="MThd\0\0\0\0"+String.fromCharCode(this.type)+h(this.ntrk)+t},p.prototype.toString=function(){var t;for(t=this.ntrk=0;t<this.length;t++)this[t]instanceof l&&this.ntrk++;var i=["SMF:","  type: "+this.type];for(this.ppqn?i.push("  ppqn: "+this.ppqn):i.push("  fps: "+this.fps,"  ppf: "+this.ppf),i.push("  tracks: "+this.ntrk),t=0;t<this.length;t++)i.push(this[t].toString());return i.join("\n")},p.prototype.player=function(){var t,i=new y;i.ppqn=this.ppqn,i.fps=this.fps,i.ppf=this.ppf;var r=[];for(t=0;t<this.length;t++)this[t]instanceof l&&r.push(this[t]);2==this.type&&d("Playing MIDI file type 2 not yet implemented");var s=[];for(t=0;t<r.length;t++)s[t]=0;for(var h=0;;){var o,e=!0;for(t=0;t<r.length;t++){for(;s[t]<r[t].length&&r[t][s[t]].tt==h;){var n=r[t][s[t]],p=a.MIDI(n);p.track=t,i._data.push(p),s[t]++}s[t]>=r[t].length||(e&&(o=r[t][s[t]].tt),e=!1,o>r[t][s[t]].tt&&(o=r[t][s[t]].tt))}if(h=o,e)break}return i._duration=h,i},(((p.Chunk=c).prototype=[]).constructor=c).prototype.sub={MThd:function(){d("Illegal chunk type: MThd")},MTrk:function(t,i){return new l(i)}},c.prototype.dump=function(){return this.type+n(this.data.length)+this.data},c.prototype.toString=function(){return this.type+": "+this.data.length+" bytes"},(((p.MTrk=l).prototype=[]).constructor=l).prototype.dump=function(){var t,i,r="",s=0,h="";for(t=0;t<this.length;t++)if(r+=o(this[t].tt-s),s=this[t].tt,void 0!==this[t].dd)r+="ÿ",r+=String.fromCharCode(this[t].ff),r+=o(this[t].dd.length),r+=this[t].dd;else if(240==this[t][0]||240==this[t][0])for(r+=String.fromCharCode(this[t][0]),r+=o(this[t].length-1),i=1;i<this[t].length;i++)r+=String.fromCharCode(this[t][i]);else for(this[t][0]!=h&&(h=this[t][0],r+=String.fromCharCode(this[t][0])),i=1;i<this[t].length;i++)r+=String.fromCharCode(this[t][i]);return"MTrk"+n(r.length)+r},l.prototype.toString=function(){for(var t=["MTrk:"],i=0;i<this.length;i++)t.push(this[i].tt+": "+this[i].toString());return t.join("\n  ")},l.prototype.add=function(t,i){if(t=parseInt(t),(isNaN(t)||t<0)&&d("Invalid parameter"),(i=a.MIDI(i)).tt=t,this[this.length-1].tt<t&&(this[this.length-1].tt=t),47!=i.ff&&255!=i[0]){var r,s=C(i);for(r=0;r<this.length&&!(this[r].tt>t)&&!(this[r].tt==t&&C(this[r])>s);r++);this.splice(r,0,i)}},y.prototype.onEnd=function(){},y.prototype.onData=function(){},y.prototype.loop=function(t){t==parseInt(t)&&0<t?this._loop=t:this._loop=t?-1:0},y.prototype.play=function(){this.ppqn?this.mul=this.ppqn/500:this.mul=this.fps*this.ppf/1e3,this.event=void 0,this.playing=!0,this.paused=!1,this._ptr=0,this._pos=0,this._p0=0,this._t0=r(),this.tick()},y.prototype.stop=function(){this._pos=0,this.event="stop",this.paused=void 0},y.prototype.pause=function(){this.event="pause"},y.prototype.resume=function(){this.playing||(this.paused?(this.event=void 0,this._t0=r(),this.playing=!0,this.paused=!1,this.tick()):this.play())},y.prototype.sndOff=function(){for(var t=0;t<16;t++)this._emit(a.MIDI.allSoundOff(t))},y.prototype.tick=function(){var t,i=r();for(this._pos=this._p0+(i-this._t0)*this.mul;this._ptr<this._data.length&&!((t=this._data[this._ptr]).tt>this._pos);this._ptr++)81==t.ff&&this.ppqn&&(this.mul=1e3*this.ppqn/((t.dd.charCodeAt(0)<<16)+(t.dd.charCodeAt(1)<<8)+t.dd.charCodeAt(2)),this._p0=this._pos-(i-this._t0)*this.mul),this._emit(t);this._ptr>=this._data.length&&(this._loop&&-1!=this._loop&&this._loop--,this._loop?(this._ptr=0,this._p0=0,this._t0=i):this.stop(),this.onEnd()),"stop"==this.event&&(this.playing=!1,this.paused=!1,this._pos=0,this._ptr=0,this.sndOff(),this.event=void 0),"pause"==this.event&&(this.playing=!1,this.paused=!0,this._pos>=this._duration&&(this._pos=this._duration-1),this._p0=this._pos,this.sndOff(),this.event=void 0),this.playing&&a.lib.schedule(this._tick)},y.prototype.duration=function(){return this._duration},y.prototype.position=function(){return this._pos},y.prototype.jump=function(t){isNaN(parseFloat(t))&&d("Not a number: "+t),t<0&&(t=0),t>=this._duration&&(t=this._duration-1),this._pos=t,this._p0=t,this._t0=r(),this.playing||(this.paused=!!t),this._toPos(),this.playing&&this.sndOff()},y.prototype._toPos=function(){for(this._ptr=0;this._ptr<this._data.length&&(e=this._data[this._ptr],!(e.tt>=this._pos));this._ptr++)"ÿQ"==e.status&&this.ppqn&&(this.mul=1e3*this.ppqn/((e.data.charCodeAt(0)<<16)+(e.data.charCodeAt(1)<<8)+e.data.charCodeAt(2)),this._p0=this._pos-(r()-this._t0)*this.mul)},a.MIDI.SMF=p}function d(t){throw new Error(t)}function o(t){var i="";return 2097151<t&&(i+=String.fromCharCode(128+(t>>21&127))),16383<t&&(i+=String.fromCharCode(128+(t>>14&127))),127<t&&(i+=String.fromCharCode(128+(t>>7&127))),i+=String.fromCharCode(127&t)}function n(t){return String.fromCharCode(t>>24&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(255&t)}function h(t){return String.fromCharCode(t>>8)+String.fromCharCode(255&t)}function p(){var t,i,r=this instanceof p?this:r=new p,s=1,h=96;if(1==arguments.length){if(arguments[0]instanceof p)return r.dup(arguments[0]),r;if("string"==typeof arguments[0]&&"0"!=arguments[0]&&"1"!=arguments[0]&&"2"!=arguments[0])return r.load(arguments[0]),r;s=parseInt(arguments[0])}else 2==arguments.length?(s=parseInt(arguments[0]),h=parseInt(arguments[1])):3==arguments.length?(s=parseInt(arguments[0]),t=parseInt(arguments[1]),i=parseInt(arguments[2])):arguments.length&&d("Invalid parameters");return(isNaN(s)||s<0||2<s)&&d("Invalid parameters"),r.type=s,void 0===t?((isNaN(h)||h<0||65535<s)&&d("Invalid parameters"),r.ppqn=h):(24!=t&&25!=t&&29!=t&&30!=t&&d("Invalid parameters"),(isNaN(i)||i<0||255<s)&&d("Invalid parameters"),r.fps=t,r.ppf=i),r}function f(t){if(t.charCodeAt(0)<128)return t.charCodeAt(0);var i=127&t.charCodeAt(0);return i<<=7,t.charCodeAt(1)<128?i+t.charCodeAt(1):(i+=127&t.charCodeAt(1),i<<=7,t.charCodeAt(2)<128?i+t.charCodeAt(2):(i+=127&t.charCodeAt(2),i<<=7,t.charCodeAt(3)<128?i+t.charCodeAt(3):void d("Corrupted MIDI track")))}function u(t){switch(240&t){case 128:case 144:case 160:case 176:case 224:return 2;case 192:case 208:return 1;default:d("Corrupted MIDI track")}}function c(t,i){var r;if(this.sub[t])return this.sub[t](t,i);for("string"==typeof t&&4==t.length||d("Invalid chunk type: "+t),r=0;r<t.length;r++)(t.charCodeAt(r)<0||255<t.charCodeAt(r))&&d("Invalid chunk type: "+t);for("string"!=typeof i&&d("Invalid data type: "+i),r=0;r<i.length;r++)(i.charCodeAt(r)<0||255<i.charCodeAt(r))&&d("Invalid data character: "+i[r]);this.type=t,this.data=i}function l(t){if(void 0!==t)for(var i,r,s,h=0,o=0,e="";o<t.length;)i=f(t.substr(o,4)),o++,127<i&&o++,16383<i&&o++,2097151<i&&o++,h+=i,255==t.charCodeAt(o)?(r=t.substr(o,2),o+=2,s=f(t.substr(o,4)),o++,127<s&&o++,16383<s&&o++,2097151<s&&o++,this.push(new g(h,r,t.substr(o,s))),o+=s):240==t.charCodeAt(o)||247==t.charCodeAt(o)?(r=t.substr(o,1),o+=1,s=f(t.substr(o,4)),o++,127<s&&o++,16383<s&&o++,2097151<s&&o++,this.push(new g(h,r,t.substr(o,s))),o+=s):128&t.charCodeAt(o)?(e=t.substr(o,1),o+=1,s=u(e.charCodeAt(0)),this.push(new g(h,e,t.substr(o,s))),o+=s):128&e.charCodeAt(0)&&(s=u(e.charCodeAt(0)),this.push(new g(h,e,t.substr(o,s))),o+=s);else this.push(new g(0,"ÿ/",""))}function C(t){var i={0:0,3:1,2:2,84:3,81:4,88:5,89:6,32:7,33:7,6:8,4:9,1:16,5:16,127:17,47:20}[t.ff];if(void 0!==i)return i;if(t.length){var r=t[0]>>4;if(void 0!==(i={8:10,15:11,11:12,12:13,10:15,13:15,14:15}[r]))return i;if(9==r)return t[1]?14:10}return 18}function g(t,i,r){var s;if(this.tt=t,this.status=i,this.data=r,255==i.charCodeAt(0))s=a.MIDI.smf(i.charCodeAt(1),r);else{for(var h=[i.charCodeAt(0)],o=0;o<r.length;o++)h.push(r.charCodeAt(o));s=a.MIDI(h)}return s.tt=t,s}function y(){var t,i=new a.Widget;for(var r in i._info.name="MIDI Player",i._info.manufacturer="Jazz-Soft",i._info.version=s,i.playing=!1,i._loop=0,i._data=[],i._pos=0,i._tick=(t=i,function(){t.tick()}),y.prototype)y.prototype.hasOwnProperty(r)&&(i[r]=y.prototype[r]);return i}});