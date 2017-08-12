function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function getScriptUrl() {
    if (typeof (document.currentScript) != "undefined") {
        return document.currentScript.src;
    } else {
        return "https://accessories.w3apps.co/";
    }
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

var cartForm;
var cartSubmitButton;
var originalClickHandlers;
var accessoriesQueue = [];
var mainDiv = null;
var accessories = [];
var scriptRan = false;
var accessoriesOpenInNewWindow = false;
var originalAccessoriesCount = 0;
var availableAccessoriesCount = 0;
var accessoriesImageSize;
var groupVariantOptions = true;
var accessoriesCopyButton;
var accessoriesMoneyFormat = {};
var isW3TestShop = false;
var accessoriesData;

var scripts = document.getElementsByTagName("script");
var currentScriptUrl = getScriptUrl();

var domainUrl = "https://" + extractDomain(currentScriptUrl);

var accessoriesJS = function ($) {
    $.support.cors = true;
	
	if (!String.prototype.includes) {
     String.prototype.includes = function() {
         'use strict';
         return String.prototype.indexOf.apply(this, arguments) !== -1;
     };
	}

    (function ($) { $.flexslider = function (e, t) { var a = $(e); a.vars = $.extend({}, $.flexslider.defaults, t); var n = a.vars.namespace, i = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, s = ("ontouchstart" in window || i || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch, r = "click touchend MSPointerUp keyup", o = "", l, c = "vertical" === a.vars.direction, d = a.vars.reverse, u = a.vars.itemWidth > 0, v = "fade" === a.vars.animation, p = "" !== a.vars.asNavFor, m = {}, f = !0; $.data(e, "flexslider", a), m = { init: function () { a.animating = !1, a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0, 10), isNaN(a.currentSlide) && (a.currentSlide = 0), a.animatingTo = a.currentSlide, a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last, a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" ")), a.slides = $(a.vars.selector, a), a.container = $(a.containerSelector, a), a.count = a.slides.length, a.syncExists = $(a.vars.sync).length > 0, "slide" === a.vars.animation && (a.vars.animation = "swing"), a.prop = c ? "top" : "marginLeft", a.args = {}, a.manualPause = !1, a.stopped = !1, a.started = !1, a.startTimeout = null, a.transitions = !a.vars.video && !v && a.vars.useCSS && function () { var e = document.createElement("div"), t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]; for (var n in t) if (void 0 !== e.style[t[n]]) return a.pfx = t[n].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0; return !1 }(), a.ensureAnimationEnd = "", "" !== a.vars.controlsContainer && (a.controlsContainer = $(a.vars.controlsContainer).length > 0 && $(a.vars.controlsContainer)), "" !== a.vars.manualControls && (a.manualControls = $(a.vars.manualControls).length > 0 && $(a.vars.manualControls)), "" !== a.vars.customDirectionNav && (a.customDirectionNav = 2 === $(a.vars.customDirectionNav).length && $(a.vars.customDirectionNav)), a.vars.randomize && (a.slides.sort(function () { return Math.round(Math.random()) - .5 }), a.container.empty().append(a.slides)), a.doMath(), a.setup("init"), a.vars.controlNav && m.controlNav.setup(), a.vars.directionNav && m.directionNav.setup(), a.vars.keyboard && (1 === $(a.containerSelector).length || a.vars.multipleKeyboard) && $(document).bind("keyup", function (e) { var t = e.keyCode; if (!a.animating && (39 === t || 37 === t)) { var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1; a.flexAnimate(n, a.vars.pauseOnAction) } }), a.vars.mousewheel && a.bind("mousewheel", function (e, t, n, i) { e.preventDefault(); var s = a.getTarget(0 > t ? "next" : "prev"); a.flexAnimate(s, a.vars.pauseOnAction) }), a.vars.pausePlay && m.pausePlay.setup(), a.vars.slideshow && a.vars.pauseInvisible && m.pauseInvisible.init(), a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function () { a.manualPlay || a.manualPause || a.pause() }, function () { a.manualPause || a.manualPlay || a.stopped || a.play() }), a.vars.pauseInvisible && m.pauseInvisible.isHidden() || (a.vars.initDelay > 0 ? a.startTimeout = setTimeout(a.play, a.vars.initDelay) : a.play())), p && m.asNav.setup(), s && a.vars.touch && m.touch(), (!v || v && a.vars.smoothHeight) && $(window).bind("resize orientationchange focus", m.resize), a.find("img").attr("draggable", "false"), setTimeout(function () { a.vars.start(a) }, 200) }, asNav: { setup: function () { a.asNav = !0, a.animatingTo = Math.floor(a.currentSlide / a.move), a.currentItem = a.currentSlide, a.slides.removeClass(n + "active-slide").eq(a.currentItem).addClass(n + "active-slide"), i ? (e._slider = a, a.slides.each(function () { var e = this; e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (e) { e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId) }, !1), e.addEventListener("MSGestureTap", function (e) { e.preventDefault(); var t = $(this), n = t.index(); $(a.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (a.direction = a.currentItem < n ? "next" : "prev", a.flexAnimate(n, a.vars.pauseOnAction, !1, !0, !0)) }) })) : a.slides.on(r, function (e) { e.preventDefault(); var t = $(this), i = t.index(), s = t.offset().left - $(a).scrollLeft(); 0 >= s && t.hasClass(n + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : $(a.vars.asNavFor).data("flexslider").animating || t.hasClass(n + "active-slide") || (a.direction = a.currentItem < i ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0)) }) } }, controlNav: { setup: function () { a.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging() }, setupPaging: function () { var e = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging", t = 1, i, s; if (a.controlNavScaffold = $('<ol class="' + n + "control-nav " + n + e + '"></ol>'), a.pagingCount > 1) for (var l = 0; l < a.pagingCount; l++) { if (s = a.slides.eq(l), i = "thumbnails" === a.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"/>' : "<a>" + t + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions) { var c = s.attr("data-thumbcaption"); "" !== c && void 0 !== c && (i += '<span class="' + n + 'caption">' + c + "</span>") } a.controlNavScaffold.append("<li>" + i + "</li>"), t++ } a.controlsContainer ? $(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), a.controlNavScaffold.delegate("a, img", r, function (e) { if (e.preventDefault(), "" === o || o === e.type) { var t = $(this), i = a.controlNav.index(t); t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction)) } "" === o && (o = e.type), m.setToClearWatchedEvent() }) }, setupManual: function () { a.controlNav = a.manualControls, m.controlNav.active(), a.controlNav.bind(r, function (e) { if (e.preventDefault(), "" === o || o === e.type) { var t = $(this), i = a.controlNav.index(t); t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction)) } "" === o && (o = e.type), m.setToClearWatchedEvent() }) }, set: function () { var e = "thumbnails" === a.vars.controlNav ? "img" : "a"; a.controlNav = $("." + n + "control-nav li " + e, a.controlsContainer ? a.controlsContainer : a) }, active: function () { a.controlNav.removeClass(n + "active").eq(a.animatingTo).addClass(n + "active") }, update: function (e, t) { a.pagingCount > 1 && "add" === e ? a.controlNavScaffold.append($("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(t).closest("li").remove(), m.controlNav.set(), a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(t, e) : m.controlNav.active() } }, directionNav: { setup: function () { var e = $('<ul class="' + n + 'direction-nav"><li class="' + n + 'nav-prev"><a class="' + n + 'prev" href="#">' + a.vars.prevText + '</a></li><li class="' + n + 'nav-next"><a class="' + n + 'next" href="#">' + a.vars.nextText + "</a></li></ul>"); a.customDirectionNav ? a.directionNav = a.customDirectionNav : a.controlsContainer ? ($(a.controlsContainer).append(e), a.directionNav = $("." + n + "direction-nav li a", a.controlsContainer)) : (a.append(e), a.directionNav = $("." + n + "direction-nav li a", a)), m.directionNav.update(), a.directionNav.bind(r, function (e) { e.preventDefault(); var t; ("" === o || o === e.type) && (t = a.getTarget($(this).hasClass(n + "next") ? "next" : "prev"), a.flexAnimate(t, a.vars.pauseOnAction)), "" === o && (o = e.type), m.setToClearWatchedEvent() }) }, update: function () { var e = n + "disabled"; 1 === a.pagingCount ? a.directionNav.addClass(e).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(e).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(e).filter("." + n + "prev").addClass(e).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(e).filter("." + n + "next").addClass(e).attr("tabindex", "-1") : a.directionNav.removeClass(e).removeAttr("tabindex") } }, pausePlay: { setup: function () { var e = $('<div class="' + n + 'pauseplay"><a></a></div>'); a.controlsContainer ? (a.controlsContainer.append(e), a.pausePlay = $("." + n + "pauseplay a", a.controlsContainer)) : (a.append(e), a.pausePlay = $("." + n + "pauseplay a", a)), m.pausePlay.update(a.vars.slideshow ? n + "pause" : n + "play"), a.pausePlay.bind(r, function (e) { e.preventDefault(), ("" === o || o === e.type) && ($(this).hasClass(n + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())), "" === o && (o = e.type), m.setToClearWatchedEvent() }) }, update: function (e) { "play" === e ? a.pausePlay.removeClass(n + "pause").addClass(n + "play").html(a.vars.playText) : a.pausePlay.removeClass(n + "play").addClass(n + "pause").html(a.vars.pauseText) } }, touch: function () { function t(t) { t.stopPropagation(), a.animating ? t.preventDefault() : (a.pause(), e._gesture.addPointer(t.pointerId), w = 0, p = c ? a.h : a.w, f = Number(new Date), l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p) } function n(t) { t.stopPropagation(); var a = t.target._slider; if (a) { var n = -t.translationX, i = -t.translationY; return w += c ? i : n, m = w, y = c ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () { e._gesture.stop() }) : void ((!y || Number(new Date) - f > 500) && (t.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m = w / (0 === a.currentSlide && 0 > w || a.currentSlide === a.last && w > 0 ? Math.abs(w) / p + 2 : 1)), a.setProps(l + m, "setTouch")))) } } function s(e) { e.stopPropagation(); var t = e.target._slider; if (t) { if (t.animatingTo === t.currentSlide && !y && null !== m) { var a = d ? -m : m, n = t.getTarget(a > 0 ? "next" : "prev"); t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > p / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0) } r = null, o = null, m = null, l = null, w = 0 } } var r, o, l, p, m, f, g, h, S, y = !1, x = 0, b = 0, w = 0; i ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = a, e.addEventListener("MSGestureChange", n, !1), e.addEventListener("MSGestureEnd", s, !1)) : (g = function (t) { a.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (a.pause(), p = c ? a.h : a.w, f = Number(new Date), x = t.touches[0].pageX, b = t.touches[0].pageY, l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p, r = c ? b : x, o = c ? x : b, e.addEventListener("touchmove", h, !1), e.addEventListener("touchend", S, !1)) }, h = function (e) { x = e.touches[0].pageX, b = e.touches[0].pageY, m = c ? r - b : r - x, y = c ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o); var t = 500; (!y || Number(new Date) - f > t) && (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m /= 0 === a.currentSlide && 0 > m || a.currentSlide === a.last && m > 0 ? Math.abs(m) / p + 2 : 1), a.setProps(l + m, "setTouch"))) }, S = function (t) { if (e.removeEventListener("touchmove", h, !1), a.animatingTo === a.currentSlide && !y && null !== m) { var n = d ? -m : m, i = a.getTarget(n > 0 ? "next" : "prev"); a.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(n) > 50 || Math.abs(n) > p / 2) ? a.flexAnimate(i, a.vars.pauseOnAction) : v || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0) } e.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null }, e.addEventListener("touchstart", g, !1)) }, resize: function () { !a.animating && a.is(":visible") && (u || a.doMath(), v ? m.smoothHeight() : u ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : c ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (a.vars.smoothHeight && m.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal"))) }, smoothHeight: function (e) { if (!c || v) { var t = v ? a : a.viewport; e ? t.animate({ height: a.slides.eq(a.animatingTo).height() }, e) : t.height(a.slides.eq(a.animatingTo).height()) } }, sync: function (e) { var t = $(a.vars.sync).data("flexslider"), n = a.animatingTo; switch (e) { case "animate": t.flexAnimate(n, a.vars.pauseOnAction, !1, !0); break; case "play": t.playing || t.asNav || t.play(); break; case "pause": t.pause() } }, uniqueID: function (e) { return e.filter("[id]").add(e.find("[id]")).each(function () { var e = $(this); e.attr("id", e.attr("id") + "_clone") }), e }, pauseInvisible: { visProp: null, init: function () { var e = m.pauseInvisible.getHiddenProp(); if (e) { var t = e.replace(/[H|h]idden/, "") + "visibilitychange"; document.addEventListener(t, function () { m.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play() }) } }, isHidden: function () { var e = m.pauseInvisible.getHiddenProp(); return e ? document[e] : !1 }, getHiddenProp: function () { var e = ["webkit", "moz", "ms", "o"]; if ("hidden" in document) return "hidden"; for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden"; return null } }, setToClearWatchedEvent: function () { clearTimeout(l), l = setTimeout(function () { o = "" }, 3e3) } }, a.flexAnimate = function (e, t, i, r, o) { if (a.vars.animationLoop || e === a.currentSlide || (a.direction = e > a.currentSlide ? "next" : "prev"), p && 1 === a.pagingCount && (a.direction = a.currentItem < e ? "next" : "prev"), !a.animating && (a.canAdvance(e, o) || i) && a.is(":visible")) { if (p && r) { var l = $(a.vars.asNavFor).data("flexslider"); if (a.atEnd = 0 === e || e === a.count - 1, l.flexAnimate(e, !0, !1, !0, o), a.direction = a.currentItem < e ? "next" : "prev", l.direction = a.direction, Math.ceil((e + 1) / a.visible) - 1 === a.currentSlide || 0 === e) return a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), !1; a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), e = Math.floor(e / a.visible) } if (a.animating = !0, a.animatingTo = e, t && a.pause(), a.vars.before(a), a.syncExists && !o && m.sync("animate"), a.vars.controlNav && m.controlNav.active(), u || a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), a.atEnd = 0 === e || e === a.last, a.vars.directionNav && m.directionNav.update(), e === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()), v) s ? (a.slides.eq(a.currentSlide).css({ opacity: 0, zIndex: 1 }), a.slides.eq(e).css({ opacity: 1, zIndex: 2 }), a.wrapup(f)) : (a.slides.eq(a.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, a.vars.animationSpeed, a.vars.easing), a.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, a.vars.animationSpeed, a.vars.easing, a.wrapup)); else { var f = c ? a.slides.filter(":first").height() : a.computedW, g, h, S; u ? (g = a.vars.itemMargin, S = (a.itemW + g) * a.move * a.animatingTo, h = S > a.limit && 1 !== a.visible ? a.limit : S) : h = 0 === a.currentSlide && e === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? d ? (a.count + a.cloneOffset) * f : 0 : a.currentSlide === a.last && 0 === e && a.vars.animationLoop && "prev" !== a.direction ? d ? 0 : (a.count + 1) * f : d ? (a.count - 1 - e + a.cloneOffset) * f : (e + a.cloneOffset) * f, a.setProps(h, "", a.vars.animationSpeed), a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function () { clearTimeout(a.ensureAnimationEnd), a.wrapup(f) }), clearTimeout(a.ensureAnimationEnd), a.ensureAnimationEnd = setTimeout(function () { a.wrapup(f) }, a.vars.animationSpeed + 100)) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function () { a.wrapup(f) }) } a.vars.smoothHeight && m.smoothHeight(a.vars.animationSpeed) } }, a.wrapup = function (e) { v || u || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart")), a.animating = !1, a.currentSlide = a.animatingTo, a.vars.after(a) }, a.animateSlides = function () { !a.animating && f && a.flexAnimate(a.getTarget("next")) }, a.pause = function () { clearInterval(a.animatedSlides), a.animatedSlides = null, a.playing = !1, a.vars.pausePlay && m.pausePlay.update("play"), a.syncExists && m.sync("pause") }, a.play = function () { a.playing && clearInterval(a.animatedSlides), a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed), a.started = a.playing = !0, a.vars.pausePlay && m.pausePlay.update("pause"), a.syncExists && m.sync("play") }, a.stop = function () { a.pause(), a.stopped = !0 }, a.canAdvance = function (e, t) { var n = p ? a.pagingCount - 1 : a.last; return t ? !0 : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction ? !0 : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction ? !1 : e !== a.currentSlide || p ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction ? !1 : !0 : !1 }, a.getTarget = function (e) { return a.direction = e, "next" === e ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1 }, a.setProps = function (e, t, n) { var i = function () { var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo, i = function () { if (u) return "setTouch" === t ? e : d && a.animatingTo === a.last ? 0 : d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n; switch (t) { case "setTotal": return d ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e; case "setTouch": return d ? e : e; case "jumpEnd": return d ? e : a.count * e; case "jumpStart": return d ? a.count * e : e; default: return e } }(); return -1 * i + "px" }(); a.transitions && (i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", n), a.container.css("transition-duration", n)), a.args[a.prop] = i, (a.transitions || void 0 === n) && a.container.css(a.args), a.container.css("transform", i) }, a.setup = function (e) { if (v) a.slides.css({ width: "100%", "float": "left", marginRight: "-100%", position: "relative" }), "init" === e && (s ? a.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 }).eq(a.currentSlide).css({ opacity: 1, zIndex: 2 }) : 0 == a.vars.fadeFirstSlide ? a.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(a.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : a.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(a.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && m.smoothHeight(); else { var t, i; "init" === e && (a.viewport = $('<div class="' + n + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, d && (i = $.makeArray(a.slides).reverse(), a.slides = $(i), a.container.empty().append(a.slides))), a.vars.animationLoop && !u && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== e && a.container.find(".clone").remove(), a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), a.newSlides = $(a.vars.selector, a), t = d ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset, c && !u ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () { a.newSlides.css({ display: "block" }), a.doMath(), a.viewport.height(a.h), a.setProps(t * a.h, "init") }, "init" === e ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(t * a.computedW, "init"), setTimeout(function () { a.doMath(), a.newSlides.css({ width: a.computedW, "float": "left", display: "block" }), a.vars.smoothHeight && m.smoothHeight() }, "init" === e ? 100 : 0)) } u || a.slides.removeClass(n + "active-slide").eq(a.currentSlide).addClass(n + "active-slide"), a.vars.init(a) }, a.doMath = function () { var e = a.slides.first(), t = a.vars.itemMargin, n = a.vars.minItems, i = a.vars.maxItems; a.w = void 0 === a.viewport ? a.width() : a.viewport.width(), a.h = e.height(), a.boxPadding = e.outerWidth() - e.width(), u ? (a.itemT = a.vars.itemWidth + t, a.minW = n ? n * a.itemT : a.w, a.maxW = i ? i * a.itemT - t : a.w, a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1), a.computedW = a.itemW - a.boxPadding }, a.update = function (e, t) { a.doMath(), u || (e < a.currentSlide ? a.currentSlide += 1 : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1), a.animatingTo = a.currentSlide), a.vars.controlNav && !a.manualControls && ("add" === t && !u || a.pagingCount > a.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !u || a.pagingCount < a.controlNav.length) && (u && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), m.controlNav.update("remove", a.last))), a.vars.directionNav && m.directionNav.update() }, a.addSlide = function (e, t) { var n = $(e); a.count += 1, a.last = a.count - 1, c && d ? void 0 !== t ? a.slides.eq(a.count - t).after(n) : a.container.prepend(n) : void 0 !== t ? a.slides.eq(t).before(n) : a.container.append(n), a.update(t, "add"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.added(a) }, a.removeSlide = function (e) { var t = isNaN(e) ? a.slides.index($(e)) : e; a.count -= 1, a.last = a.count - 1, isNaN(e) ? $(e, a.slides).remove() : c && d ? a.slides.eq(a.last).remove() : a.slides.eq(e).remove(), a.doMath(), a.update(t, "remove"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.removed(a) }, m.init() }, $(window).blur(function (e) { focused = !1 }).focus(function (e) { focused = !0 }), $.flexslider.defaults = { namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", customDirectionNav: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function () { }, before: function () { }, after: function () { }, end: function () { }, added: function () { }, removed: function () { }, init: function () { } }, $.fn.flexslider = function (e) { if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function () { var t = $(this), a = e.selector ? e.selector : ".slides > li", n = t.find(a); 1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e) }); var t = $(this).data("flexslider"); switch (e) { case "play": t.play(); break; case "pause": t.pause(); break; case "stop": t.stop(); break; case "next": t.flexAnimate(t.getTarget("next"), !0); break; case "prev": case "previous": t.flexAnimate(t.getTarget("prev"), !0); break; default: "number" == typeof e && t.flexAnimate(e, !0) } } })($);

    if (Shopify.shop == "nine5-2.myshopify.com") {
        isW3TestShop = true;
    }
	
    var cssId = 'accessories-css';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = domainUrl + '/api/css?shopName=' + Shopify.shop + "&c=" + Math.random();
        link.media = 'all';
        head.appendChild(link);
    }

    mainDiv = $("#w3-product-accessories");

    if (mainDiv.length) {

        //console.log("loading accessories");

        mainDiv.append("<div id='accessories-container-heading'><h3></h3></div>");
        mainDiv.append("<div id='w3-accessories-loading'><span id='accessories-loading-text'></span><img style='width:16px; height:16px' src='https://accessories.w3apps.co/images/spin.gif'></div>");
		
        getCurrentProduct($);

        cartForm = mainDiv.closest("form");

		//makes it so the accessories app doesn't duplicate the button (but the checkbox add will stop working)
		if(cartForm.hasClass("w3-accessories-no-add")) {
			return false;
		}
		
		
        if (Shopify.shop == "e-cigs-offer.myshopify.com") {
            cartForm = $("form#product-actions[action$='cart/add']").first();
        }

        if (Shopify.shop == "survival-bug-out.myshopify.com") {
            cartForm = $("#add-to-cart-form");
        }

        if (!cartForm.length) {
            cartForm = $("form[action$='cart/add']").first();
        }

        if (!cartForm.length) {
            cartForm = $("#add-to-cart-form");
        }
		
		
		

        if (!cartForm.length) {
            //alert("Cannot find cart form!");
            console.log("couldn't find cart form for accessories app");


            return false;
        }
		
		cartSubmitButton = cartForm.find(".w3-add-to-cart");

		if (!cartSubmitButton.length) {
			if (cartForm.find("#preorder-me-btn").length > 0) {
				cartSubmitButton = cartForm.find(":submit:not(#preorder-me-btn)");
			} else {
				cartSubmitButton = cartForm.find(":submit:visible");
			}
		}

		if (!cartSubmitButton.length) {
			if (cartForm.find("#pre-order").length > 0) {
				cartSubmitButton = cartForm.find(":submit:not(#pre-order)");
			} else {
				cartSubmitButton = cartForm.find(":submit:visible");
			}
		}

        if (!cartSubmitButton.length) {
            cartForm = mainDiv.closest("form[action$='cart/add']");
            cartSubmitButton = cartForm.find(":submit:visible");
        }

        if (!cartSubmitButton.length) {
            cartSubmitButton = $(".add-to-cart").first();
        }

        if (!cartSubmitButton.length) {
            cartSubmitButton = cartForm.find("#AddToCart").first();
        }
		
		if (Shopify.shop == "vapmonster.myshopify.com") {
            cartSubmitButton = $("#AddToCart").first();
		}
		if (Shopify.shop == "kitchen-door-handles.myshopify.com") {
            cartSubmitButton = $("#AddToCart").first();
		}

		if (Shopify.theme == "launchpad-star") {
		    cartSubmitButton = $("#AddToCart").first();
		}

        accessoriesCopyButton = cartSubmitButton.clone();
        accessoriesCopyButton.removeAttr("onclick", "");
        accessoriesCopyButton.attr("id", "addToCartCopy");
        accessoriesCopyButton.attr("type", "button");
        accessoriesCopyButton.css("opacity", "1");
        accessoriesCopyButton.unbind();
        accessoriesCopyButton.off();

        cartSubmitButton.after(accessoriesCopyButton);

        cartSubmitButton.css("display", "none");

        cartSubmitButton.addClass("hide-cart-button");

        setTimeout(function () {
            cartSubmitButton.css("display", "none");
            cartSubmitButton.addClass("hide-cart-button");
        }, 5)

        cartForm.change(function () {
            accessoriesCopyButton.remove();

            //cartSubmitButton.removeClass("hide-cart-button");

            /*cartSubmitButton = cartForm.find(":submit:visible");

            console.log(cartForm.find(":submit :visible"));

            if (!cartSubmitButton.length) {
                cartForm = mainDiv.closest("form[action$='cart/add']");
                cartSubmitButton = cartForm.find(":submit:visible");
            }

            if (!cartSubmitButton.length) {
                cartSubmitButton = $(".add-to-cart").first();
            }*/

            var originalButtonStyle = cartSubmitButton.attr("style");

            cartSubmitButton.css("display", "none");
            cartSubmitButton.addClass("hide-cart-button");

            accessoriesCopyButton = cartSubmitButton.clone();
            accessoriesCopyButton.show();
            accessoriesCopyButton.removeClass("hide-cart-button");
            accessoriesCopyButton.css("opacity", "1");
            //accessoriesCopyButton.attr("style", originalButtonStyle);

            accessoriesCopyButton.removeAttr("onclick", "");
            accessoriesCopyButton.attr("id", "addToCartCopy");
            accessoriesCopyButton.attr("type", "button");
            accessoriesCopyButton.unbind();
            accessoriesCopyButton.off();
            
            cartSubmitButton.after(accessoriesCopyButton);

            accessoriesCopyButton.click(function () {
                
                checkForSelectedAccessories($);

				//console.log("accessoriesCopyButton.click() 1");
				
                addItems($);
            });
        });

        accessoriesCopyButton.click(function () {

            checkForSelectedAccessories($);

			//console.log("accessoriesCopyButton.click() 2");
			
            addItems($);

        });
    }

    
};

function checkForSelectedAccessories($) {

    //console.log("check for selected accessories");


    var guid = accessoriesGenerateGuid();

    if ((Shopify.shop == 'mandysmoon.myshopify.com') || (Shopify.shop == 'cdm2.myshopify.com')) {
        cartForm.find("#accessoryGroup").remove();
        cartForm.append("<input type='hidden' id='accessoryGroup' name='properties[AccessoryGroup]' />");
        cartForm.find("#accessoryGroup").val(guid);
    }

    $(".accessories-item").each(function () {
        var checkbox = $(this).find("input");

        if (checkbox.is(":checked")) {
            var select = $(this).find(".accessory-variant-select");
            var quantity = $(this).find("[name='quantity'], [name='accessoryQuantity']");

            var variant = select.val();

            var obj = {
                quantity: 1,
                id: variant,
                properties: {
                    'Accessory': 'Yes'
                }
            }

            if (quantity.length) {
                if (typeof(quantity.val()) != "undefined") {
                    if ($.isNumeric(quantity.val())) {
                        obj.quantity = quantity.val();
                    }
                }
            }

            if ((Shopify.shop == 'mandysmoon.myshopify.com') || (Shopify.shop == 'cdm2.myshopify.com')) {
                //console.log("test 8");
                obj.properties['AccessoryGroup'] = guid;
            }

            //console.log(obj);

            accessoriesQueue.push(obj);
        }

        checkbox.removeAttr("checked");

    });
}

String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAccessories($, id) {

    var shopUrl = Shopify.shop;

    var darr = shopUrl.split(".")
    var shopName =  darr[0];

    var productRequest = {
        product_id: id,
        shop_name: shopName
    }

    $.ajax({
        type: 'GET',
        url: domainUrl + "/api/accessories",
        data: productRequest,
        dataType: "jsonp",
        success: function (data) {
            accessoriesData = data;
            //console.log("Get accessories.");
            accessoriesOpenInNewWindow = data.open_new_window;
            accessoriesImageSize = data.image_size;
            groupVariantOptions = data.group_variant_options;
            accessoriesMoneyFormat.money_format = data.money_format;
            accessoriesMoneyFormat.currency = data.currency;

            mainDiv.find("#accessories-container-heading h3").text(data.add_accessories_text);
            mainDiv.find("#w3-accessories-loading").text(data.loading_text);

            if (data.info_text.length) {
                var infoTextDiv = $("<div id='accessories-info-text'>" + data.info_text + "</div>");

                mainDiv.find("#accessories-container-heading").after(infoTextDiv);
            }

            var products = data.accessories;

            originalAccessoriesCount = products.length;

            if (products.length == 0) {
                mainDiv.hide();
            }

            $.each(products, function (key, value) {
                buildAccessory($, value);
            });

            mainDiv.find("#w3-accessories-loading").remove();
        }, error: function (e) {
            //console.log("Error getting accessories.");
            //console.log(e.responseText);
        }
    });
}

function buildAccessory($, checkProduct) {

    $.ajax({
        method: "GET",
        url: "/products/" + checkProduct.Handle + ".js",
        dataType: "json",
        error: function() {
            availableAccessoriesCount = availableAccessoriesCount + 1;

            if (availableAccessoriesCount == originalAccessoriesCount) {
                accessoriesDoneLoading($);
            }
        },
        success: function (product) {
            var myProduct = product;

            availableAccessoriesCount = availableAccessoriesCount + 1;

            accessories.push(myProduct);

            if (myProduct.available == true) {

                //console.log(myProduct.variants);

                var productDiv = $("<div class='accessories-item'></div>");

                var leftCol = $("<div class='accessories-left " + accessoriesImageSize + "'></div>");
                var rightCol = $("<div class='accessories-right'></div>");

                var checkBox = $("<input type='checkbox' value='" + myProduct.id + "'>");
                leftCol.append(checkBox);

                

                if (myProduct.images.length >= 1) {
                    var imgUrl = myProduct.images[0];
                    var periodIndex = imgUrl.lastIndexOf(".");

                    imgUrl = imgUrl.insert(periodIndex, "_" + accessoriesImageSize);

                    var img = $("<img />")
                    img.attr("src", imgUrl);

                    var imgWrapper = $("<div class='accessories-img-wrapper'></div>");
                    imgWrapper.append(img);

                    if (accessoriesData.disable_quick_view == false) {
                        var btnQuickView = $("<a href='#' class='btn-accessories-quick-view'>" + accessoriesData.quick_view_text + "</a>");
                        btnQuickView.data("product-id", myProduct.id);
                        imgWrapper.append(btnQuickView);

                        btnQuickView.click(function (e) {
                            var id = $(this).data("product-id");

                            $("body #accessories-modal").remove();
                            $("body #accessories-modal-overlay").remove();

                            var overlay = $("<div id='accessories-modal-overlay'></div>");
                            var divModal = $("<div id='accessories-modal'></div>");
                            var modalClose = $("<a id='accessories-modal-close'>&#x2716;</a>")

                            divModal.css("top", $(window).scrollTop() + 50 + "px");

                            divModal.append(modalClose);

                            

                            

                            modalClose.click(function () {
                                $("body #accessories-modal").remove();

                                overlay.animate({ opacity: 0.0 }, 250, function () {
                                    $("body #accessories-modal-overlay").remove();
                                });
                            });

                            overlay.click(function () {
                                $("body #accessories-modal").remove();

                                overlay.animate({ opacity: 0.0 }, 250, function () {
                                    $("body #accessories-modal-overlay").remove();
                                });
                            });

                            var product = getAccessoryByID($, id);

                            var flexSlider = $("<div class='flexslider22'></div>");
                            var flexSliderUl = $("<ul class='slides22'></ul>");
                            flexSlider.append(flexSliderUl);

                            $.each(product.images, function (index, value) {
                                var li = $("<li></li>");

                                var periodIndex = value.lastIndexOf(".");
                                li.attr("data-thumb", value.insert(periodIndex, "_" + "small"));
                                
                                var img = $("<img />");
                                img.attr("src", value);

                                li.append(img);

                                flexSliderUl.append(li);
                            });

                            

                            var modalLeft = $("<div id='accessories-modal-left'></div>");
                            var modalRight = $("<div id='accessories-modal-right'></div>");

                            modalLeft.append(flexSlider);

                            modalRight.append($("<h2><a target='_blank' href='" + product.url + "'>" + product.title + "</a></h2>"));
                            modalRight.append($("<div class='accessory-description'>" + product.description + "</div>"));

                            

                            var buyButtonContainer = $("<form action='/cart/add'></div>");
                            
                            buyButtonContainer.append("<div class='accessory-modal-price accessory-price'></div>");

                            var select = $("<select id='product-select-" + product.id + "' name='id'></select>");

                            select.attr("data-product-id", product.id)

                            $.each(product.variants, function (index, variant) {
                                if (variant.available) {
									if(!variant.title.includes(" (BK ")) {
										var option = $("<option value='" + variant.id + "'>" + variant.title + "</option>");
										select.append(option);
									}
                                }
                            });


                            if (product.variants.length <= 1) {
                                select.css("display", "none");
                            }


                            buyButtonContainer.append(select);
                            buyButtonContainer.append($("<span class='accessories-quantity-text'>" + accessoriesData.quantity_text + "</span>"));
                            buyButtonContainer.append($("<input type='number' name='quantity' class='accessories-quantity' min='1' value='1' />"));
                            buyButtonContainer.append($("<button type='submit' name='add' class='accessories-modal-submit'>" + accessoriesData.add_to_cart_text + "</button>"));

                            modalRight.append(buyButtonContainer);
                            
                            divModal.append(modalLeft);
                            divModal.append(modalRight);

                            $("body").append(overlay);
                            $("body").append(divModal);

                            if (product.variants.length > 1) {

                                if (groupVariantOptions == false) {
                                    //fix options
                                    //var tempOptions = [];
                                    /*
                                    
                                    $.each(product.options, function (key, value) {
                                        tempOptions.push(value.name)
                                    });*/

                                    //myProduct.options = tempOptions;

                                    var selectCallback = function (variant, selector) {
                                        var singleSelector = $("#" + selector.domIdPrefix);

                                        if (variant == null) {
                                            var item = singleSelector.closest("form");
                                            item.find(".accessories-modal-submit").attr("disabled", "disabled");
                                            item.find(".accessories-modal-submit").html("<strong>" + accessoriesData.unavailable_text + "</strong>");

                                            item.find(".accessory-price").html("<strong>" + accessoriesData.unavailable_text + "</strong>");
                                        } else {
                                            if (variant.available == false) {
                                                var item = singleSelector.closest("form");
                                                item.find(".accessories-modal-submit").attr("disabled", "disabled");
                                                item.find(".accessories-modal-submit").html("<strong>" + accessoriesData.unavailable_text + "</strong>");

                                                item.find(".accessory-price").html("<strong>" + accessoriesData.unavailable_text + "</strong>");
                                            } else {
                                                setAccessoryPrice($, singleSelector, singleSelector.attr("data-product-id"));

                                                var item = singleSelector.closest("form");
                                                item.find(".accessories-modal-submit").removeAttr("disabled");
                                                item.find(".accessories-modal-submit").html(accessoriesData.add_to_cart_text);
                                            }
                                        }
                                    };

                                    new Shopify.OptionSelectors("product-select-" + product.id, { product: product, onVariantSelected: selectCallback });

                                }
                            }

                            $(".flexslider22").flexslider({
                                namespace: 'accessories-',
                                selector: '.slides22 > li',
                                prevText: "",
                                nextText: "",
                                controlNav: "thumbnails",
                                animation: "slide"
                            });

                            setAccessoryPrice($, select, product.id);

                            overlay.animate({ opacity: 0.5 }, 250);

                            if (typeof accessoriesQuickViewCallback != "undefined") {

                                accessoriesQuickViewCallback(divModal, product);

                            }

                            e.preventDefault();
                            return false;
                        });
                    }

                    leftCol.append(imgWrapper);

                    img.click(function () {
                        $(this).siblings(".btn-accessories-quick-view").click();
                    });

                }

                
                
                leftCol.append("<div style='clear:both;'></div>");

                var select = $("<select id='accessory-" + myProduct.id + "' class='accessory-variant-select' name='" + myProduct.id + "'></select>");

                $.each(myProduct.variants, function (index, variant) {

                    if (variant.available) {
                        var option = $("<option value='" + variant.id + "'>" + variant.title + "</option>");
                        select.append(option);
                    }
                });

                

                if (myProduct.variants.length <= 1) {
                    select.css("display", "none");
                }

                var anchorWrapper = $("<div class='accessories-title-wrap'></div>");

                anchorWrapper.append("<a class='accessories-title' href='" + myProduct.url + "'>" + myProduct.title + "</a>")

                if (accessoriesOpenInNewWindow == true) {
                    anchorWrapper.find("a").attr("target", "_blank");
                }

                

                rightCol.append(anchorWrapper);
                rightCol.append(select);
                rightCol.append("<div class='accessory-price'></div>");

                setAccessoryPrice($, select);

                select.change(function () {
                    setAccessoryPrice($, $(this));
                });

                productDiv.append(leftCol);
                productDiv.append(rightCol);
                productDiv.append("<div style='clear:both;'></div>");
                productDiv.css("height", "auto");

                mainDiv.append(productDiv);

                if (typeof accessoryItemAddedCallback != "undefined") {
                    if (accessoryItemAddedCallback.length) {
                        accessoryItemAddedCallback(productDiv);
                    }
                }
                

                $(window).resize();

                

                if (myProduct.variants.length > 1) {
                    

                    if (groupVariantOptions == false) {
                        //fix options
                        var tempOptions = [];

                        $.each(myProduct.options, function (key, value) {
                            tempOptions.push(value.name)
                        });

                        myProduct.options = tempOptions;

                        var selectCallback = function (variant, selector) {
                            var singleSelector = $("#" + selector.domIdPrefix);

                            if (variant == null) {
                                var item = singleSelector.closest(".accessories-item");
                                item.find("input").attr("disabled", "disabled");
                                item.find("input").removeAttr("checked");

                                item.find(".accessory-price").html("<strong>"+ accessoriesData.unavailable_text + "</strong>");
                            } else {
                                if (variant.available == false) {
                                    var item = singleSelector.closest(".accessories-item");
                                    item.find("input").attr("disabled", "disabled");
                                    item.find("input").removeAttr("checked");
                                    item.find(".accessory-price").html("<strong>" + accessoriesData.unavailable_text + "</strong>");
                                } else {
                                    setAccessoryPrice($, singleSelector);

                                    var item = singleSelector.closest(".accessories-item");
                                    item.find("input").removeAttr("disabled");
                                }
                            }
                        };

                        new Shopify.OptionSelectors("accessory-" + myProduct.id, { product: myProduct, onVariantSelected: selectCallback });

                    }
                }
            }

            if (availableAccessoriesCount == originalAccessoriesCount) {
                accessoriesDoneLoading($);

                if (typeof accessoriesDoneLoadingCallback != "undefined") {

                    accessoriesDoneLoadingCallback();

                }
            }

            
        }
    });
}

function getAccessoryByID($, id) {
    var prod = null;

    $.each(accessories, function (key, value) {

        if (value.id == id) {
            prod = value;
        }
    });

    return prod;
}

function accessoriesDoneLoading($) {
    $(window).resize();

    if (typeof Currency != "undefined") {
        if (typeof Currency.cookie != "undefined") {
            if (Currency.cookie.read() != null) {
                try {
                    Currency.convertAll(accessoriesMoneyFormat.currency, Currency.cookie.read(), '.accessory-price span.money', 'money_format');
                } catch (err) {
                    console.log(err);
                }
            }
        }

    }

    if (accessories.length <= 0) {
        mainDiv.hide();
    } else {
        mainDiv.slideDown();
    }
	
	if(mainDiv.find(".accessories-item").length == 0) {
		mainDiv.hide();
	}

    
}

function setAccessoryPrice($, selectElement, x) {
    var productId;

    if (typeof x === 'undefined') {
        productId = selectElement.attr("name");
    } else {
        productId = x;
    }
    
    var variantId = selectElement.val();

    var product = $.grep(accessories, function (e) { return e.id == productId; })[0];
    var variant = $.grep(product.variants, function (e) { return e.id == variantId; })[0];

    var price = "";

    var myMoneyFormat = accessoriesMoneyFormat.money_format;
     
    if(myMoneyFormat == null) {
        myMoneyFormat = $("#w3-money-format").text();
    }

    price = accessoriesFormatMoney(variant.price, myMoneyFormat);

    var priceDiv = selectElement.siblings(".accessory-price").first();
    priceDiv.html(price);

    /*var moneySpan = priceDiv.find(".money");

    console.log(moneySpan);

    if (moneySpan.length) {
        moneySpan.removeClass("money");
        moneySpan.addClass("acc-money");
    }*/

    //console.log(priceDiv.html());
    try {
        if (typeof Currency != "undefined") {
            if (typeof Currency.cookie != "undefined") {
                if (Currency.cookie.read() != null) {
                    //priceDiv.html(Currency.formatMoney(variant.price, myMoneyFormat));
                        Currency.convertAll(accessoriesMoneyFormat.currency, Currency.cookie.read(), '.accessory-price span.money', 'money_format');
                }
            }
        
        }
    } catch (err) {
        console.log(err);
    }
}

function getCurrentProduct($) {
    $.ajax({
        method: "GET",
        url: window.location.href + ".json",
        dataType: "json",
        success: function (data) {
            if (typeof (data.product) == 'undefined') {
                $("#w3-product-accessories").empty();

                return;
            }

            var id = data.product.id;

            getAccessories($, id);
        }
    });
}

function accessoriesFormatMoney(t, r) {
    function e(t, r) {
        return "undefined" == typeof t ? r : t
    }

    function o(t, r, o, n) {
        if (r = e(r, 2), o = e(o, ","), n = e(n, "."), isNaN(t) || null == t) return 0;
        t = (t / 100).toFixed(r);
        var a = t.split("."),
            i = a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + o),
            u = a[1] ? n + a[1] : "";
        return i + u
    }
    "string" == typeof t && (t = t.replace(".", ""));
    var n = "",
        a = /\{\{\s*(\w+)\s*\}\}/,
        i = r || this.money_format;
    switch (i.match(a)[1]) {
        case "amount":
            n = o(t, 2);
            break;
        case "amount_no_decimals":
            n = o(t, 0);
            break;
        case "amount_with_comma_separator":
            n = o(t, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            n = o(t, 0, ".", ",")
    }
    return i.replace(a, n)
}

function addItems($) {
    
    //console.log("addItems");

    if (accessoriesQueue.length >= 1) {
        var item = accessoriesQueue.pop();

        $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: item,
            dataType: "json",
            success: function (data) {
				console.log(data);
                addItems($);
            },
            error: function (data) {
                console.log("Error: " + data);
                addItems($);
            }
        });

    } else {
        //console.log("No items");
        cartSubmitButton.click();

        //cartForm.submit();

    }
}

if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.8)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
        jQuery191 = jQuery.noConflict(true);

        jQuery191(function () {
            accessoriesJS(jQuery191);
        });
        
    });
} else {
    jQuery(function () {
        accessoriesJS(jQuery);
    });
}

function accessoriesGenerateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}
