/*
	Copyright 2010 British Broadcasting Corporation

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
(function(){var d,j,f=window.document,c=(f.body||f.getElementsByTagName("head")[0]).lastChild.src;j=c.slice(0,c.lastIndexOf("/"))+"/../";if(!f.readyState){if(f.addEventListener){f.addEventListener("DOMContentLoaded",function(){f.removeEventListener("DOMContentLoaded",arguments.callee,false);f.readyState="complete";},false);}}window.Glow=function(l,n){n=n||{};var k,m=(n.debug)?".debug":"",o=n.base||j;d={versions:["2.0.0-alpha1","@SRC@"],"2.0.0-alpha1":{core:["core"+m+".js"],widgets:["core","widgets"+m+".js","widgets"+m+".css"]}};if(n._map){d=n._map;}l=a(l);if(Glow._build.instances[l]){return Glow._build.instances[l];}if(o.slice(-1)!=="/"){o+="/";}k=h(l,o);Glow._build.instances[l]=k;k.UID="glow"+Math.floor(Math.random()*(1<<30));k.load("core");return k;};var a=function(l){var k=d.versions,n=l+".";var m=k.length;while(m--){if((k[m]+".").indexOf(n)===0){return k[m];}}throw new Error('Version "'+l+'" does not exist');};var e=function(l,m){var k=d.versions,p=null,n=false;var o=k.length;while(--o>-1){if(d[k[o]]){p=d[k[o]];}if(k[o]===l){n=true;}if(n&&p){return p;}}throw new Error('No map available for version "'+l+'".');};var b=function(m){var l,k;l=f.getElementsByTagName("head")[0];k=f.createElement("script");k.src=m;k.type="text/javascript";l.insertBefore(k,l.firstChild);};var i=function(m){var k,l;k=f.getElementsByTagName("head")[0];l=f.createElement("link");l.href=m;l.type="text/css";l.rel="stylesheet";k.insertBefore(l,k.firstChild);};Glow._build={provided:[],instances:{}};Glow.provide=function(k){Glow._build.provided.push(k);};Glow.complete=function(n,l){var r,q,p;r=Glow._build.instances[l];if(!r){throw new Error("Cannot complete, unknown version of glow: "+l);}r._build.builders[n]=Glow._build.provided;Glow._build.provided=[];q=r._build.loading;p=r._build.builders;for(var o=0;o<q.length;o++){if(!p[q[o]]){break;}for(var m=0,k=p[q[o]].length;m<k;m++){p[q[o]][m](r);}if(r._removeReadyBlock){r._removeReadyBlock("glow_loading_"+q[o]);}p[q[o]]=undefined;q.splice(o,1);o--;}r._release();};var h=function(k,l){var n=function(o){return new n.NodeList(o);};n.version=k;n.base=l;n.map=e(k);n._build={loading:[],builders:{},history:{},callbacks:[]};for(var m in g){n[m]=g[m];}return n;};var g={load:function(){var n="",q,p;for(var o=0,k=arguments.length;o<k;o++){n=arguments[o];if(this._build.history[n]){continue;}this._build.history[n]=true;p=this.map[n];for(var m=0,l=p.length;m<l;m++){if(p[m].slice(-3)===".js"){q=this.base+this.version+"/"+p[m];if(this._addReadyBlock){this._addReadyBlock("glow_loading_"+n);}this._build.loading.push(n);b(q);}else{if(p[m].slice(-4)===".css"){q=this.base+this.version+"/"+p[m];i(q);}else{this.load(p[m]);}}}}return this;},loaded:function(k){this._build.callbacks.push(k);if(this._addReadyBlock){this._addReadyBlock("glow_loading_loadedcallback");}this._release();return this;},_release:function(){var k;if(this._build.loading.length!==0){return;}while(k=this._build.callbacks.shift()){k(this);if(this._removeReadyBlock){this._removeReadyBlock("glow_loading_loadedcallback");}}},ready:function(k){this.loaded(function(l){l.ready(function(){k(l);});});return this;}};})();