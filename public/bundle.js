var app=function(){"use strict";function t(){}function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,e){for(var i in e)t[i]=1;return t}function s(t){t()}function n(t,e){t.appendChild(e)}function o(t,e,i){t.insertBefore(e,i)}function r(t){t.parentNode.removeChild(t)}function a(t,e){for(var i=0;i<t.length;i+=1)t[i]&&t[i].d(e)}function c(t){return document.createElement(t)}function l(t){return document.createTextNode(t)}function u(t,e,i){t.addEventListener(e,i,!1)}function d(t,e,i){t.removeEventListener(e,i,!1)}function h(t,e){t.data=""+e}function m(){return Object.create(null)}function p(t){t._lock=!0,f(t._beforecreate),f(t._oncreate),f(t._aftercreate),t._lock=!1}function v(t,e){t._handlers=m(),t._slots=m(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function f(t){for(;t&&t.length;)t.shift()()}var y={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var i=t in this._handlers&&this._handlers[t].slice();if(i)for(var s=0;s<i.length;s+=1){var n=i[s];if(!n.__calling)try{n.__calling=!0,n.call(this,e)}finally{n.__calling=!1}}},on:function(t,e){var i=this._handlers[t]||(this._handlers[t]=[]);return i.push(e),{cancel:function(){var t=i.indexOf(e);~t&&i.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||p(this.root)},_recompute:t,_set:function(t){var i=this._state,s={},n=!1;for(var o in t=e(this._staged,t),this._staged={},t)this._differs(t[o],i[o])&&(s[o]=n=!0);n&&(this._state=e(e({},i),t),this._recompute(s,this._state),this._bind&&this._bind(s,this._state),this._fragment&&(this.fire("state",{changed:s,current:this._state,previous:i}),this._fragment.p(s,this._state),this.fire("update",{changed:s,current:this._state,previous:i})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}};window.serverBase;var g={styleHook(t){let{question:e}=this.get();return e&&this.polyline&&t.id===e.id?{}:null},getSections(t,e){let i=e.getTileAttributeIndexes(),s=e.getGmxProperties().MetaProperties,n=(s.count&&Number(s.count.Value),null);i.section&&(n={},t.forEach(function(t){let e=t.properties[i.section];n[e]=!0})),this.allData=t,this.set({sectionsList:n})},reBuildQuestions(t){let{layerGame:e}=this.get(),i=e.getGmxProperties().MetaProperties,s=i.count?Number(i.count.Value):10,n=e.getTileAttributeIndexes(),o=[];this.allData.forEach(function(e){let i=e.properties[n.section];t[i]&&o.push(e)}),o=o.sort(Math.random).slice(0,s),this.set({questions:o})},setLayerGame(t){let e=this.gmxMap.layersByID[t]||this.gmxMap.layers[Math.floor(this.gmxMap.layers.length*Math.random())];if(e){let t=e.getDataManager(),i=e.getGmxProperties().name,s=t.addObserver({type:"resend",layerID:i,callback:function(t){t.count&&(this.getSections(t.added,e),s.deactivate())}.bind(this)});e.setStyleHook(this.styleHook.bind(this)),this.map.addLayer(e);let n=localStorage.getItem("_gameQuiz_"),o=n?JSON.parse(n):{};this.set({layerGame:e,score:o})}},showQuestionResult(t){this.polyline&&this.map.removeLayer(this.polyline);let{question:e}=this.get(),i=e.dataOption.bounds.toLatLngBounds(!0),s=i.getCenter(),n=i.contains(this._latlng),o=L.polyline([s,this._latlng],{color:"red"}).addTo(this.map);this.map.fitBounds(o.getBounds());let r=o.toGeoJSON().geometry;this.polyline=o;let a,c=L.gmxUtil.geoJSONGetLength(r),l=L.gmxUtil.getGeoJSONSummary(r),u={},d=0;n?(d=10,a={title:"ВАУ, КРУТО!",score:l},u.ok=d+" баллов",this.audioStarted&&this.audio.stop(0),this.audioStart(11.74689342403628,3.82984126984127)):(a={title:"НАДО БЫ ТОЧНЕЕ",score:l},this.audioStart(8.50453514739229,.20950113378684806)),u.question=e,u.len=c,u.strLen=l,this.set({resultQuestion:u,emotion:a})},nextQuestion(){this.map.closePopup(),this.map.removeLayer(this.polyline),this.polyline=null,this.root.nextQuestion(this.sc)},setPopupContent(t,e){let{question:i}=this.get(),s=L.DomUtil.create("div",""),n=L.DomUtil.create("div","",s),o=L.DomUtil.create("button","",s);if(t){let s=L.gmxUtil.geoJSONGetLength(t),r=L.gmxUtil.getGeoJSONSummary(t),a={},c=0;e?(c=10,n.innerHTML="Отлично вам начислено: <b>"+c+"</b> баллов",a.ok=c+" баллов",this.audioStarted&&this.audio.stop(0),this.audioStart(11.74689342403628,3.82984126984127)):(n.innerHTML="Растояние от центра объекта:<br><b>"+r+"</b>",this.audioStart(8.50453514739229,.20950113378684806)),a.question=i,a.len=s,a.strLen=r,this.set({resultQuestion:a}),this.sc=c,o.innerHTML="Следующий вопрос",L.DomEvent.on(o,"click",this.nextQuestion,this)}else n.innerHTML="Я считаю что это здесь!",o.innerHTML="Показать",L.DomEvent.on(o,"click",this.showQuestionResult,this);this.popup.setContent(s),this.popupContent=s},clickMap(t){this.marker&&this.map.removeLayer(this.marker),this._latlng=t.latlng,this.marker=L.marker(this._latlng,{icon:L.divIcon({className:"my-div-icon",iconSize:[4,4],iconAnchor:[10,10]})}).addTo(this.map),this.set({point:!0})},audioStart(t,e){if(this.sound){let i=new(window.AudioContext||window.webkitAudioContext),s=i.createBufferSource(),n=new XMLHttpRequest;n.open("GET","mp3/audio.mp3",!0),n.responseType="arraybuffer",n.onload=function(){i.decodeAudioData(n.response,function(n){s.buffer=n,s.start(i.currentTime+1,t,e),s.connect(i.destination)},function(t){console.log("Error with decoding audio data"+t.err)})},n.send()}},createMap(t){let e=t.state||{},i=t.mapID||"A557835E1B2344479C092FBB0158B529",s=t.layerID||"",n=(t.apiKey,e.map?e.map.position:{});this.sound=t.sound;var o=1==t.base?L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{attribution:'<a href="http://maps.sputnik.ru">Спутник</a> © Ростелеком | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxNativeZoom:18,maxZoom:21}):L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia29zbW9zbmlta2kiLCJhIjoiY2lvbW1tNXN0MDAwdnc4bHg5ZWw2YXJtYSJ9.ON9Ovi3fuHc5RAipmLb2EQ",{attribution:'&copy; <a href="//mapbox.com/">mapbox</a>',maxNativeZoom:18,maxZoom:21});let r=new L.Map("map",{attribution:'&copy; <a href="//scanex.ru/">scanex</a>',allWorld:!0,generalized:!1,layers:[o],center:new L.LatLng(n.y||26,n.x||83),zoom:n.z||7}).on("click",this.clickMap.bind(this),this);r.zoomControl.setPosition("bottomright");let a=[];L.gmx.loadMap(i,{leafletMap:r}).then(function(t){t.layers.forEach(function(t){r.removeLayer(t);let e=t.getGmxProperties(),i=e.MetaProperties,s={};for(let t in i){let e=i[t].Value;s[t]=e>0?Number(e):e}a.push({gmxLayer:t,metaHash:s,title:e.title,layerID:e.name}),t._gameZoom=s.zoom||3}),this.quizList=a,this.gmxMap=t,s?this.setLayerGame(s):this.set({quizList:this.quizList})}.bind(this)),this.map=r}};function _({changed:t,current:e,previous:i}){if(t.selectQuiz&&e.selectQuiz)this.marker&&(this.map.removeLayer(this.marker),this.marker=null),this.polyline&&(this.map.removeLayer(this.polyline),this.polyline=null),this.set({quizList:this.quizList});else if(t.layerID&&e.layerID)this.setLayerGame(e.layerID);else if(t.question&&e.question){let{layerGame:t}=this.get();this.marker&&(this.map.removeLayer(this.marker),this.marker=null),this.polyline&&(this.map.removeLayer(this.polyline),this.polyline=null),this.map.setZoom(t._gameZoom)}else t.sectionsList&&e.sectionsList?this.reBuildQuestions(e.sectionsList):t.calc&&e.calc&&this.showQuestionResult()}function b(n){var a,l;v(this,n),this._state=e({layerGame:null,quizList:null,questions:null,permalink:null,map:null},n.data),this._intro=!!n.intro,this._handlers.state=[_],_.call(this,{changed:i({},this._state),current:this._state}),this._fragment=(this._state,{c(){(a=c("div")).id="map"},m(t,e){o(t,a,e),l=!0},p:t,i(t,e){l||this.m(t,e)},o:s,d(t){t&&r(a)}}),this.root._oncreate.push(()=>{(function(){let{urlParams:t}=this.get();this.createMap(t)}).call(this),this.fire("update",{changed:i({},this._state),current:this._state})}),n.target&&(this._fragment.c(),this._mount(n.target,n.anchor),p(this)),this._intro=!0}e(b.prototype,y),e(b.prototype,g);window.serverBase;var q={checkSection(t,e){let{sectionsList:i}=this.get();i[t]=e,this.set({sectionsList:i})},start(){this.set({quizList:1}),this.nextQuestion(0,!0)},nextQuestion(t,e){let{questions:i,props:s,score:n,currentScore:o}=this.get(),r=i.shift();if(this.sc=this.sc||0,this.sc+=t||0,!r){n=n||{};let t=s.name,e=n[t]||[];e.push(this.sc);let i=e.length;n[t]=e.slice(i-5,i),window.localStorage.setItem("_gameQuiz_",JSON.stringify(n))}e&&(o=[]),this.set({questions:i,question:r,point:!1,calc:!1,resultQuestion:!1,currentScore:o})}};function x({changed:t,current:e,previous:i}){if(t.resultQuestion&&e.resultQuestion){let{currentScore:t}=this.get();t.push(e.resultQuestion),this.set({currentScore:t})}}function z(t,e){var i;return{c(){(i=c("div")).className="scrim svelte-1dd6u8b"},m(t,e){o(t,i,e)},d(t){t&&r(i)}}}function Q(t,e){var i;function s(e){t.set({question:""})}return{c(){(i=c("button")).textContent="Начать игру заново",u(i,"click",s),i.className="start svelte-1dd6u8b",i.disabled=e.isSectionsEmpty},m(t,e){o(t,i,e)},p(t,e){t.isSectionsEmpty&&(i.disabled=e.isSectionsEmpty)},d(t){t&&r(i),d(i,"click",s)}}}function S(t,e){var i,s,a,u,d,m=e.it.question.properties[1],p=e.it.strLen;return{c(){i=c("li"),s=l(m),a=l(": "),u=c("b"),d=l(p),i.className="svelte-1dd6u8b"},m(t,e){o(t,i,e),n(i,s),n(i,a),n(i,u),n(u,d)},p(t,e){t.currentScore&&m!==(m=e.it.question.properties[1])&&h(s,m),t.currentScore&&p!==(p=e.it.strLen)&&h(d,p)},d(t){t&&r(i)}}}function k(t,e){var i,s,m,p,v,f,y,g,_,L,b,q,x,z,Q,k,N,D=e.emotion.title,G=e.emotion.score;function I(e){t.nextQuestion()}for(var M=e.currentScore,w=[],E=0;E<M.length;E+=1)w[E]=S(0,P(e,M,E));return{c(){i=c("div"),s=c("span"),m=l(D),p=l("\r\n\t\t\t\t\t"),v=c("span"),f=l(G),y=l("\r\n\t\t\t\t"),(g=c("button")).textContent="Следующий вопрос",_=l("\r\n\t\t\t\t"),L=c("hr"),b=l("\r\n\t\t\t\t"),q=c("div"),x=c("ul");for(var t=0;t<w.length;t+=1)w[t].c();z=l("\r\n\t\t\t\t\t"),Q=c("hr"),k=l("\r\n\t\t\t\t\tОбщий результат: "),N=l(e.currentItog),s.className="emotionTitle",v.className="emotionScore svelte-1dd6u8b",i.className="emotion svelte-1dd6u8b",u(g,"click",I),g.className="start svelte-1dd6u8b",q.className="question-result svelte-1dd6u8b"},m(t,e){o(t,i,e),n(i,s),n(s,m),n(i,p),n(i,v),n(v,f),o(t,y,e),o(t,g,e),o(t,_,e),o(t,L,e),o(t,b,e),o(t,q,e),n(q,x);for(var r=0;r<w.length;r+=1)w[r].m(x,null);n(q,z),n(q,Q),n(q,k),n(q,N)},p(t,e){if(t.emotion&&D!==(D=e.emotion.title)&&h(m,D),t.emotion&&G!==(G=e.emotion.score)&&h(f,G),t.currentScore){M=e.currentScore;for(var i=0;i<M.length;i+=1){const s=P(e,M,i);w[i]?w[i].p(t,s):(w[i]=S(0,s),w[i].c(),w[i].m(x,null))}for(;i<w.length;i+=1)w[i].d(1);w.length=M.length}t.currentItog&&h(N,e.currentItog)},d(t){t&&(r(i),r(y),r(g)),d(g,"click",I),t&&(r(_),r(L),r(b),r(q)),a(w,t)}}}function N(e,i){var s,n,a;function h(t){e.set({calc:!0})}return{c(){(s=c("p")).textContent="Вы уверены?",n=l("\r\n\t\t\t"),(a=c("button")).textContent="Подтвердить выбор",s.className="standart svelte-1dd6u8b",u(a,"click",h),a.className="start svelte-1dd6u8b"},m(t,e){o(t,s,e),o(t,n,e),o(t,a,e)},p:t,d(t){t&&(r(s),r(n),r(a)),d(a,"click",h)}}}function D(e,i){var s;return{c(){(s=c("p")).textContent="Кликните по карте в предпологаемом месте расположения объекта",s.className="standart svelte-1dd6u8b"},m(t,e){o(t,s,e)},p:t,d(t){t&&r(s)}}}function G(t,e){var i,s,a,m=e.it;return{c(){var n,o;i=c("li"),s=c("input"),a=l(m),s._svelte={component:t,ctx:e},u(s,"change",B),n="type",o="checkbox",s.setAttribute(n,o),s.checked=!0},m(t,e){o(t,i,e),n(i,s),n(i,a)},p(t,i){e=i,s._svelte.ctx=e,(t.Object||t.sectionsList)&&m!==(m=e.it)&&h(a,m)},d(t){t&&r(i),d(s,"change",B)}}}function I(t,e){for(var i,s,n,h,m,p=e.Object.keys(e.sectionsList),v=[],f=0;f<p.length;f+=1)v[f]=G(t,T(e,p,f));function y(e){t.start()}return{c(){(i=c("h1")).textContent="Рубрики",s=l("\r\n\t\t\t"),n=c("ul");for(var t=0;t<v.length;t+=1)v[t].c();h=l("\r\n\t\t\t"),(m=c("button")).textContent="Начать игру",i.className="section",n.className="selectSectionsList svelte-1dd6u8b",u(m,"click",y),m.className="start svelte-1dd6u8b",m.disabled=e.isSectionsEmpty},m(t,e){o(t,i,e),o(t,s,e),o(t,n,e);for(var r=0;r<v.length;r+=1)v[r].m(n,null);o(t,h,e),o(t,m,e)},p(e,i){if(e.Object||e.sectionsList){p=i.Object.keys(i.sectionsList);for(var s=0;s<p.length;s+=1){const o=T(i,p,s);v[s]?v[s].p(e,o):(v[s]=G(t,o),v[s].c(),v[s].m(n,null))}for(;s<v.length;s+=1)v[s].d(1);v.length=p.length}e.isSectionsEmpty&&(m.disabled=i.isSectionsEmpty)},d(t){t&&(r(i),r(s),r(n)),a(v,t),t&&(r(h),r(m)),d(m,"click",y)}}}function M(e,i){var s;return{c(){(s=c("div")).innerHTML='<div class="lds-ellipsis svelte-1dd6u8b"><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div></div>',s.className="center svelte-1dd6u8b"},m(t,e){o(t,s,e)},p:t,d(t){t&&r(s)}}}function w(t,e){var i,s,n,a,h;function m(e){t.set({quizList:null,layerID:"124D910DFC294C03A882F8FBCE1AC4E4"})}return{c(){(i=c("h1")).textContent="Добро пожаловать!",s=l("\r\n\t\t"),(n=c("p")).textContent="Мы рады приветствовать вас в нашем интерактивном географическом квесте!\r\n\tВ этой игре мы предлагаем выбрать рубрики, в рамках воторых вам предстоит находить места на карте, зная только их названия. Думаете просто?",a=l("\r\n\t\t"),(h=c("button")).textContent="Давайте проверим!",i.className="title",u(h,"click",m),h.className="start svelte-1dd6u8b",h.disabled=e.isSectionsEmpty},m(t,e){o(t,i,e),o(t,s,e),o(t,n,e),o(t,a,e),o(t,h,e)},p(t,e){t.isSectionsEmpty&&(h.disabled=e.isSectionsEmpty)},d(t){t&&(r(i),r(s),r(n),r(a),r(h)),d(h,"click",m)}}}function E(t,e){var i,s,a,u=e.question?e.question.properties[1]:"";function d(t){return t.resultQuestion?k:t.point?N:D}var m=d(e),p=m(t,e);return{c(){i=c("div"),s=l(u),a=l("\r\n\t\t\t"),p.c(),i.className="question svelte-1dd6u8b"},m(t,e){o(t,i,e),n(i,s),n(i,a),p.m(i,null)},p(e,n){e.question&&u!==(u=n.question?n.question.properties[1]:"")&&h(s,u),m===(m=d(n))&&p?p.p(e,n):(p.d(1),(p=m(t,n)).c(),p.m(i,null))},d(t){t&&r(i),p.d()}}}function C(e,i){var s;return{c(){(s=c("div")).innerHTML='<div class="lds-ellipsis svelte-1dd6u8b"><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div><div class="svelte-1dd6u8b"></div></div>',s.className="center svelte-1dd6u8b"},m(t,e){o(t,s,e)},p:t,d(t){t&&r(s)}}}function O(t,e){var i;function s(t){return t.sectionsList?I:M}var n=s(e),a=n(t,e);return{c(){i=c("div"),a.c(),i.className="subcontent"},m(t,e){o(t,i,e),a.m(i,null)},p(e,o){n===(n=s(o))&&a?a.p(e,o):(a.d(1),(a=n(t,o)).c(),a.m(i,null))},d(t){t&&r(i),a.d()}}}function P(t,e,i){const s=Object.create(t);return s.it=e[i],s.each_value=e,s.it_index=i,s}function T(t,e,i){const s=Object.create(t);return s.it=e[i],s.each_value_1=e,s.it_index_1=i,s}function B(t){const{component:e,ctx:i}=this._svelte;e.checkSection(i.it,this.checked)}function H(t){v(this,t),this._state=e(e({Object:Object},{urlParams:{},quizList:null,selectQuiz:null,props:{},currentScore:[],score:null}),t.data),this._recompute({layerGame:1,currentScore:1,sectionsList:1},this._state),this._intro=!!t.intro,this._handlers.state=[x],x.call(this,{changed:i({},this._state),current:this._state}),this._fragment=function(t,e){var i,s,a,u,d,h,m,p={},v={urlParams:e.urlParams};void 0!==e.selectQuiz&&(v.selectQuiz=e.selectQuiz,p.selectQuiz=!0),void 0!==e.sectionsList&&(v.sectionsList=e.sectionsList,p.sectionsList=!0),void 0!==e.quizList&&(v.quizList=e.quizList,p.quizList=!0),void 0!==e.layerID&&(v.layerID=e.layerID,p.layerID=!0),void 0!==e.layerGame&&(v.layerGame=e.layerGame,p.layerGame=!0),void 0!==e.score&&(v.score=e.score,p.score=!0),void 0!==e.questions&&(v.questions=e.questions,p.questions=!0),void 0!==e.question&&(v.question=e.question,p.question=!0),void 0!==e.point&&(v.point=e.point,p.point=!0),void 0!==e.calc&&(v.calc=e.calc,p.calc=!0),void 0!==e.emotion&&(v.emotion=e.emotion,p.emotion=!0),void 0!==e.resultQuestion&&(v.resultQuestion=e.resultQuestion,p.resultQuestion=!0);var f=new b({root:t.root,store:t.store,data:v,_bind(e,i){var s={};!p.selectQuiz&&e.selectQuiz&&(s.selectQuiz=i.selectQuiz),!p.sectionsList&&e.sectionsList&&(s.sectionsList=i.sectionsList),!p.quizList&&e.quizList&&(s.quizList=i.quizList),!p.layerID&&e.layerID&&(s.layerID=i.layerID),!p.layerGame&&e.layerGame&&(s.layerGame=i.layerGame),!p.score&&e.score&&(s.score=i.score),!p.questions&&e.questions&&(s.questions=i.questions),!p.question&&e.question&&(s.question=i.question),!p.point&&e.point&&(s.point=i.point),!p.calc&&e.calc&&(s.calc=i.calc),!p.emotion&&e.emotion&&(s.emotion=i.emotion),!p.resultQuestion&&e.resultQuestion&&(s.resultQuestion=i.resultQuestion),t._set(s),p={}}});t.root._beforecreate.push(()=>{f._bind({selectQuiz:1,sectionsList:1,quizList:1,layerID:1,layerGame:1,score:1,questions:1,question:1,point:1,calc:1,emotion:1,resultQuestion:1},f.get())});var y=!e.question&&z(),g=e.question&&Q(t,e);function _(t){return t.quizList?w:t.question?E:t.layerGame?O:C}var L=_(e),q=L(t,e);return{c(){f._fragment.c(),i=l("\r\n"),y&&y.c(),s=l("\r\n"),a=c("div"),u=c("div"),g&&g.c(),d=l("\r\n\t"),h=c("div"),q.c(),u.className="title bg svelte-1dd6u8b",h.className="content svelte-1dd6u8b",a.className="controls svelte-1dd6u8b"},m(t,e){f._mount(t,e),o(t,i,e),y&&y.m(t,e),o(t,s,e),o(t,a,e),n(a,u),g&&g.m(u,null),n(a,d),n(a,h),q.m(h,null),m=!0},p(i,n){e=n;var o={};i.urlParams&&(o.urlParams=e.urlParams),!p.selectQuiz&&i.selectQuiz&&(o.selectQuiz=e.selectQuiz,p.selectQuiz=void 0!==e.selectQuiz),!p.sectionsList&&i.sectionsList&&(o.sectionsList=e.sectionsList,p.sectionsList=void 0!==e.sectionsList),!p.quizList&&i.quizList&&(o.quizList=e.quizList,p.quizList=void 0!==e.quizList),!p.layerID&&i.layerID&&(o.layerID=e.layerID,p.layerID=void 0!==e.layerID),!p.layerGame&&i.layerGame&&(o.layerGame=e.layerGame,p.layerGame=void 0!==e.layerGame),!p.score&&i.score&&(o.score=e.score,p.score=void 0!==e.score),!p.questions&&i.questions&&(o.questions=e.questions,p.questions=void 0!==e.questions),!p.question&&i.question&&(o.question=e.question,p.question=void 0!==e.question),!p.point&&i.point&&(o.point=e.point,p.point=void 0!==e.point),!p.calc&&i.calc&&(o.calc=e.calc,p.calc=void 0!==e.calc),!p.emotion&&i.emotion&&(o.emotion=e.emotion,p.emotion=void 0!==e.emotion),!p.resultQuestion&&i.resultQuestion&&(o.resultQuestion=e.resultQuestion,p.resultQuestion=void 0!==e.resultQuestion),f._set(o),p={},e.question?y&&(y.d(1),y=null):y||((y=z()).c(),y.m(s.parentNode,s)),e.question?g?g.p(i,e):((g=Q(t,e)).c(),g.m(u,null)):g&&(g.d(1),g=null),L===(L=_(e))&&q?q.p(i,e):(q.d(1),(q=L(t,e)).c(),q.m(h,null))},i(t,e){m||this.m(t,e)},o(t){m&&(f&&f._fragment.o(t),m=!1)},d(t){f.destroy(t),t&&r(i),y&&y.d(t),t&&(r(s),r(a)),g&&g.d(),q.d()}}}(this,this._state),this.root._oncreate.push(()=>{this.fire("update",{changed:i({},this._state),current:this._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),p(this)),this._intro=!0}e(H.prototype,y),e(H.prototype,q),H.prototype._recompute=function(t,e){t.layerGame&&this._differs(e.props,e.props=function({layerGame:t}){return t?t.getGmxProperties():{}}(e))&&(t.props=!0),t.currentScore&&this._differs(e.currentItog,e.currentItog=function({currentScore:t}){return L.gmxUtil.prettifyDistance(t.reduce((t,e)=>t+e.len,0))}(e))&&(t.currentItog=!0),t.sectionsList&&this._differs(e.isSectionsEmpty,e.isSectionsEmpty=function({sectionsList:t}){let e=!1;if(t){e=!0;for(let i in t)if(t[i]){e=!1;break}}return e}(e))&&(t.isSectionsEmpty=!0)};let j=(()=>{let t={};return location.search.substr(1).split("&").forEach(e=>{let i=e.split("=");t[i[0]]=i[1]}),t})();return new H({target:document.body,data:{urlParams:j,name:"world"}})}();
//# sourceMappingURL=bundle.js.map
