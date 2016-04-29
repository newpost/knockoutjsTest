/*!
 * jQuery JavaScript Library v2.0.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-04-18
 */

/*!
 * Sizzle CSS Selector Engine v1.9.2-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-04-16
 */

(function(window, undefined) {
    function isArraylike(e) {
        var t = e.length,
            n = jQuery.type(e);
        return jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || n !== "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    }

    function createOptions(e) {
        var t = optionsCache[e] = {};
        return jQuery.each(e.match(core_rnotwhite) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = jQuery.expando + Math.random()
    }

    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? JSON.parse(n) : n
                } catch (i) {}
                data_user.set(e, t, n)
            } else n = undefined
        }
        return n
    }

    function returnTrue() {
        return !0
    }

    function returnFalse() {
        return !1
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {}
    }

    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1);
        return e
    }

    function winnow(e, t, n) {
        if (jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return jQuery.grep(e, function(e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (isSimple.test(t)) return jQuery.filter(t, e, n);
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function(e) {
            return core_indexOf.call(t, e) >= 0 !== n
        })
    }

    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType === 1 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function disableScript(e) {
        return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
    }

    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function setGlobalEval(e, t) {
        var n = e.length,
            r = 0;
        for (; r < n; r++) data_priv.set(e[r], "globalEval", !t || data_priv.get(t[r], "globalEval"))
    }

    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1) return;
        if (data_priv.hasData(e)) {
            s = data_priv.access(e), o = jQuery.extend({}, s), f = s.events, data_priv.set(t, o);
            if (f) {
                delete o.handle, o.events = {};
                for (i in f)
                    for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
            }
        }
        data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
    }

    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }

    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && manipulation_rcheckableType.test(e.type)) t.checked = e.checked;
        else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
    }

    function vendorPropName(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e) return t
        }
        return r
    }

    function isHidden(e, t) {
        return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
    }

    function getStyles(e) {
        return window.getComputedStyle(e, null)
    }

    function showHide(e, t) {
        var n, r, i, s = [],
            o = 0,
            u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", css_defaultDisplay(r.nodeName)))) : s[o] || (i = isHidden(r), (n && n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }

    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            o = 0;
        for (; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
        return o
    }

    function getWidthOrHeight(e, t, n) {
        var r = !0,
            i = t === "width" ? e.offsetWidth : e.offsetHeight,
            s = getStyles(e),
            o = jQuery.support.boxSizing && jQuery.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null) i = e.style[t];
            if (rnumnonpx.test(i)) return i;
            r = o && (jQuery.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function css_defaultDisplay(e) {
        var t = document,
            n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (iframe[0].contentWindow || iframe[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = actualDisplay(e, t), iframe.detach();
            elemdisplay[e] = n
        }
        return n
    }

    function actualDisplay(e, t) {
        var n = jQuery(t.createElement(e)).appendTo(t.body),
            r = jQuery.css(n[0], "display");
        return n.remove(), r
    }

    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t)) jQuery.each(t, function(t, i) {
            n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && jQuery.type(t) === "object")
            for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function addToPrefiltersOrTransports(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(n))
                while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                if (s) return !(a = f)
            }), a
        }
        var i = {}, s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && jQuery.extend(!0, e, r), e
    }

    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents,
            a = e.dataTypes;
        while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in u)
                if (u[i] && u[i].test(r)) {
                    a.unshift(i);
                    break
                }
        if (a[0] in n) s = a[0];
        else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        } if (s) return s !== a[0] && a.unshift(s), n[s]
    }

    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1])
            for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s)
                if (s === "*") s = a;
                else
            if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o)
                    for (i in f) {
                        u = i.split(" ");
                        if (u[1] === s) {
                            o = f[a + " " + u[0]] || f["* " + u[0]];
                            if (o) {
                                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                break
                            }
                        }
                    }
                if (o !== !0)
                    if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch (c) {
                        return {
                            state: "parsererror",
                            error: o ? c : "No conversion from " + a + " to " + s
                        }
                    }
            }
        }
        return {
            state: "success",
            data: t
        }
    }

    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }), fxNow = jQuery.now()
    }

    function createTweens(e, t) {
        jQuery.each(t, function(t, n) {
            var r = (tweeners[t] || []).concat(tweeners["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n)) return
        })
    }

    function Animation(e, t, n) {
        var r, i, s = 0,
            o = animationPrefilters.length,
            u = jQuery.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                if (i) return !1;
                var t = fxNow || createFxNow(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    s = 1 - r,
                    o = 0,
                    a = f.tweens.length;
                for (; o < a; o++) f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
            }, f = u.promise({
                elem: e,
                props: jQuery.extend({}, t),
                opts: jQuery.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: fxNow || createFxNow(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i) return this;
                    i = !0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r) return r
        }
        return createTweens(f, l), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
            p = e.style,
            d = {}, v = [],
            m = e.nodeType && isHidden(e);
        n.queue || (l = jQuery._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
            l.unqueued || c()
        }), l.unqueued++, h.always(function() {
            h.always(function() {
                l.unqueued--, jQuery.queue(e, "fx").length || l.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], jQuery.css(e, "display") === "inline" && jQuery.css(e, "float") === "none" && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", h.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        })), u = data_priv.get(e, "fxshow");
        for (r in t) {
            s = t[r];
            if (rfxtypes.exec(s)) {
                delete t[r], a = a || s === "toggle";
                if (s === (m ? "hide" : "show")) {
                    if (s !== "show" || u === undefined || u[r] === undefined) continue;
                    m = !0
                }
                v.push(r)
            }
        }
        o = v.length;
        if (o) {
            u = data_priv.get(e, "fxshow") || data_priv.access(e, "fxshow", {}), "hidden" in u && (m = u.hidden), a && (u.hidden = !m), m ? jQuery(e).show() : h.done(function() {
                jQuery(e).hide()
            }), h.done(function() {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in d) jQuery.style(e, t, d[t])
            });
            for (r = 0; r < o; r++) i = v[r], f = h.createTween(i, m ? u[i] : 0), d[i] = u[i] || jQuery.style(e, i), i in u || (u[i] = f.start, m && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }

    function genFx(e, t) {
        var n, r = {
                height: e
            }, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = cssExpand[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }
    var rootjQuery, readyList, core_strundefined = typeof undefined,
        location = window.location,
        document = window.document,
        docElem = document.documentElement,
        _jQuery = window.jQuery,
        _$ = window.$,
        class2type = {}, core_deletedIds = [],
        core_version = "2.0.0",
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        jQuery = function(e, t) {
            return new jQuery.fn.init(e, t, rootjQuery)
        }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        core_rnotwhite = /\S+/g,
        rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(e, t) {
            return t.toUpperCase()
        }, completed = function() {
            document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? r = [null, e, null] : r = rquickExpr.exec(e);
                if (r && (r[1] || !t)) {
                    if (r[1]) {
                        t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
                        if (rsingleTag.test(r[1]) && jQuery.isPlainObject(t))
                            for (r in t) jQuery.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return i = document.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = document, this.selector = e, this
                }
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e)
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = jQuery.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return jQuery.each(this, e, t)
        },
        ready: function(e) {
            return jQuery.ready.promise().done(e), this
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(jQuery.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
        var e, t, n, r, i, s, o = arguments[0] || {}, u = 1,
            a = arguments.length,
            f = !1;
        typeof o == "boolean" && (f = o, o = arguments[1] || {}, u = 2), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), a === u && (o = this, --u);
        for (; u < a; u++)
            if ((e = arguments[u]) != null)
                for (t in e) {
                    n = o[t], r = e[t];
                    if (o === r) continue;
                    f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
                }
            return o
    }, jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(e) {
            return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --jQuery.readyWait : jQuery.isReady) return;
            jQuery.isReady = !0;
            if (e !== !0 && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")
        },
        isFunction: function(e) {
            return jQuery.type(e) === "function"
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return e != null && e === e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return e == null ? String(e) : typeof e == "object" || typeof e == "function" ? class2type[core_toString.call(e)] || "object" : typeof e
        },
        isPlainObject: function(e) {
            if (jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e)) return !1;
            try {
                if (e.constructor && !core_hasOwn.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || typeof e != "string") return null;
            typeof t == "boolean" && (n = t, t = !1), t = t || document;
            var r = rsingleTag.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && jQuery(i).remove(), jQuery.merge([], r.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function(e) {
            var t, n;
            if (!e || typeof e != "string") return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = undefined
            }
            return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
        },
        noop: function() {},
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(e) {
            return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e);
            if (n)
                if (o)
                    for (; i < s; i++) {
                        r = t.apply(e[i], n);
                        if (r === !1) break
                    } else
                        for (i in e) {
                            r = t.apply(e[i], n);
                            if (r === !1) break
                        } else if (o)
                            for (; i < s; i++) {
                                r = t.call(e[i], i, e[i]);
                                if (r === !1) break
                            } else
                                for (i in e) {
                                    r = t.call(e[i], i, e[i]);
                                    if (r === !1) break
                                }
                        return e
        },
        trim: function(e) {
            return e == null ? "" : core_trim.call(e)
        },
        makeArray: function(e, t) {
            var n = t || [];
            return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : core_push.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return t == null ? -1 : core_indexOf.call(t, e, n)
        },
        merge: function(e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if (typeof n == "number")
                for (; i < n; i++) e[r++] = t[i];
            else
                while (t[i] !== undefined) e[r++] = t[i++];
            return e.length = r, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) r = !! t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e),
                u = [];
            if (o)
                for (; i < s; i++) r = t(e[i], i, n), r != null && (u[u.length] = r);
            else
                for (i in e) r = t(e[i], i, n), r != null && (u[u.length] = r);
            return core_concat.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = core_slice.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(core_slice.call(arguments)))
            }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
        },
        access: function(e, t, n, r, i, s, o) {
            var u = 0,
                a = e.length,
                f = n == null;
            if (jQuery.type(n) === "object") {
                i = !0;
                for (u in n) jQuery.access(e, t, u, n[u], !0, s, o)
            } else if (r !== undefined) {
                i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                    return f.call(jQuery(e), n)
                }));
                if (t)
                    for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
            }
            return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
        },
        now: Date.now,
        swap: function(e, t, n, r) {
            var i, s, o = {};
            for (s in t) o[s] = e.style[s], e.style[s] = t[s];
            i = n.apply(e, r || []);
            for (s in t) e.style[s] = o[s];
            return i
        }
    }), jQuery.ready.promise = function(e) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    }), rootjQuery = jQuery(document),
    function(e, t) {
        function it(e) {
            return Q.test(e + "")
        }

        function st() {
            var e, t = [];
            return e = function(n, r) {
                return t.push(n += " ") > i.cacheLength && delete e[t.shift()], e[n] = r
            }
        }

        function ot(e) {
            return e[y] = !0, e
        }

        function ut(e) {
            var t = c.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function at(e, t, n, r) {
            var i, s, o, u, a, f, h, v, m, E;
            (t ? t.ownerDocument || t : b) !== c && l(t), t = t || c, n = n || [];
            if (!e || typeof e != "string") return n;
            if ((u = t.nodeType) !== 1 && u !== 9) return [];
            if (p && !r) {
                if (i = G.exec(e))
                    if (o = i[1]) {
                        if (u === 9) {
                            s = t.getElementById(o);
                            if (!s || !s.parentNode) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && g(t, s) && s.id === o) return n.push(s), n
                    } else {
                        if (i[2]) return D.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = i[3]) && w.getElementsByClassName && t.getElementsByClassName) return D.apply(n, t.getElementsByClassName(o)), n
                    }
                if (w.qsa && (!d || !d.test(e))) {
                    v = h = y, m = t, E = u === 9 && e;
                    if (u === 1 && t.nodeName.toLowerCase() !== "object") {
                        f = vt(e), (h = t.getAttribute("id")) ? v = h.replace(et, "\\$&") : t.setAttribute("id", v), v = "[id='" + v + "'] ", a = f.length;
                        while (a--) f[a] = v + mt(f[a]);
                        m = X.test(e) && t.parentNode || t, E = f.join(",")
                    }
                    if (E) try {
                        return D.apply(n, m.querySelectorAll(E)), n
                    } catch (S) {} finally {
                        h || t.removeAttribute("id")
                    }
                }
            }
            return Tt(e.replace(U, "$1"), t, n, r)
        }

        function ft(e, t) {
            var n = t && e,
                r = n && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function lt(e, n, r) {
            var i;
            return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null
        }

        function ct(e, n, r) {
            var i;
            return r ? t : i = e.getAttribute(n, n.toLowerCase() === "type" ? 1 : 2)
        }

        function ht(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function pt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }

        function dt(e) {
            return ot(function(t) {
                return t = +t, ot(function(n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function vt(e, t) {
            var n, r, s, o, u, a, f, l = T[e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = i.preFilter;
            while (u) {
                if (!n || (r = z.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);
                n = !1;
                if (r = W.exec(u)) n = r.shift(), s.push({
                    value: n,
                    type: r[0].replace(U, " ")
                }), u = u.slice(n.length);
                for (o in i.filter)(r = K[o].exec(u)) && (!f[o] || (r = f[o](r))) && (n = r.shift(), s.push({
                    value: n,
                    type: o,
                    matches: r
                }), u = u.slice(n.length));
                if (!n) break
            }
            return t ? u.length : u ? at.error(e) : T(e, a).slice(0)
        }

        function mt(e) {
            var t = 0,
                n = e.length,
                r = "";
            for (; t < n; t++) r += e[t].value;
            return r
        }

        function gt(e, t, n) {
            var i = t.dir,
                s = n && i === "parentNode",
                o = S++;
            return t.first ? function(t, n, r) {
                while (t = t[i])
                    if (t.nodeType === 1 || s) return e(t, n, r)
            } : function(t, n, u) {
                var a, f, l, c = E + " " + o;
                if (u) {
                    while (t = t[i])
                        if (t.nodeType === 1 || s)
                            if (e(t, n, u)) return !0
                } else
                    while (t = t[i])
                        if (t.nodeType === 1 || s) {
                            l = t[y] || (t[y] = {});
                            if ((f = l[i]) && f[0] === c) {
                                if ((a = f[1]) === !0 || a === r) return a === !0
                            } else {
                                f = l[i] = [c], f[1] = e(t, n, u) || r;
                                if (f[1] === !0) return !0
                            }
                        }
            }
        }

        function yt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function bt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++)
                if (s = e[u])
                    if (!n || n(s, r, i)) o.push(s), f && t.push(u);
            return o
        }

        function wt(e, t, n, r, i, s) {
            return r && !r[y] && (r = wt(r)), i && !i[y] && (i = wt(i, s)), ot(function(s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || xt(t || "*", u.nodeType ? [u] : u, []),
                    m = e && (s || !t) ? bt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = bt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)
                        if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? H.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = bt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
            })
        }

        function Et(e) {
            var t, n, r, s = e.length,
                o = i.relative[e[0].type],
                u = o || i.relative[" "],
                f = o ? 1 : 0,
                l = gt(function(e) {
                    return e === t
                }, u, !0),
                c = gt(function(e) {
                    return H.call(t, e) > -1
                }, u, !0),
                h = [
                    function(e, n, r) {
                        return !o && (r || n !== a) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                    }
                ];
            for (; f < s; f++)
                if (n = i.relative[e[f].type]) h = [gt(yt(h), n)];
                else {
                    n = i.filter[e[f].type].apply(null, e[f].matches);
                    if (n[y]) {
                        r = ++f;
                        for (; r < s; r++)
                            if (i.relative[e[r].type]) break;
                        return wt(f > 1 && yt(h), f > 1 && mt(e.slice(0, f - 1)).replace(U, "$1"), n, f < r && Et(e.slice(f, r)), r < s && Et(e = e.slice(r)), r < s && mt(e))
                    }
                    h.push(n)
                }
            return yt(h)
        }

        function St(e, t) {
            var n = 0,
                s = t.length > 0,
                o = e.length > 0,
                u = function(u, f, l, h, p) {
                    var d, v, m, g = [],
                        y = 0,
                        b = "0",
                        w = u && [],
                        S = p != null,
                        x = a,
                        T = u || o && i.find.TAG("*", p && f.parentNode || f),
                        N = E += x == null ? 1 : Math.random() || .1;
                    S && (a = f !== c && f, r = n);
                    for (;
                        (d = T[b]) != null; b++) {
                        if (o && d) {
                            v = 0;
                            while (m = e[v++])
                                if (m(d, f, l)) {
                                    h.push(d);
                                    break
                                }
                            S && (E = N, r = ++n)
                        }
                        s && ((d = !m && d) && y--, u && w.push(d))
                    }
                    y += b;
                    if (s && b !== y) {
                        v = 0;
                        while (m = t[v++]) m(w, g, f, l);
                        if (u) {
                            if (y > 0)
                                while (b--)!w[b] && !g[b] && (g[b] = M.call(h));
                            g = bt(g)
                        }
                        D.apply(h, g), S && !u && g.length > 0 && y + t.length > 1 && at.uniqueSort(h)
                    }
                    return S && (E = N, a = x), w
                };
            return s ? ot(u) : u
        }

        function xt(e, t, n) {
            var r = 0,
                i = t.length;
            for (; r < i; r++) at(e, t[r], n);
            return n
        }

        function Tt(e, t, n, r) {
            var s, o, a, f, l, c = vt(e);
            if (!r && c.length === 1) {
                o = c[0] = c[0].slice(0);
                if (o.length > 2 && (a = o[0]).type === "ID" && t.nodeType === 9 && p && i.relative[o[1].type]) {
                    t = (i.find.ID(a.matches[0].replace(tt, nt), t) || [])[0];
                    if (!t) return n;
                    e = e.slice(o.shift().value.length)
                }
                s = K.needsContext.test(e) ? 0 : o.length;
                while (s--) {
                    a = o[s];
                    if (i.relative[f = a.type]) break;
                    if (l = i.find[f])
                        if (r = l(a.matches[0].replace(tt, nt), X.test(o[0].type) && t.parentNode || t)) {
                            o.splice(s, 1), e = r.length && mt(o);
                            if (!e) return D.apply(n, r), n;
                            break
                        }
                }
            }
            return u(e, c)(r, t, !p, n, X.test(e)), n
        }

        function Nt() {}
        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y = "sizzle" + -(new Date),
            b = e.document,
            w = {}, E = 0,
            S = 0,
            x = st(),
            T = st(),
            N = st(),
            C = !1,
            k = function() {
                return 0
            }, L = typeof t,
            A = 1 << 31,
            O = [],
            M = O.pop,
            _ = O.push,
            D = O.push,
            P = O.slice,
            H = O.indexOf || function(e) {
                var t = 0,
                    n = this.length;
                for (; t < n; t++)
                    if (this[t] === e) return t;
                return -1
            }, B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            j = "[\\x20\\t\\r\\n\\f]",
            F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            I = F.replace("w", "w#"),
            q = "\\[" + j + "*(" + F + ")" + j + "*(?:([*^$|!~]?=)" + j + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + I + ")|)|)" + j + "*\\]",
            R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + q.replace(3, 8) + ")*)|.*)\\)|)",
            U = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
            z = new RegExp("^" + j + "*," + j + "*"),
            W = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
            X = new RegExp(j + "*[+~]"),
            V = new RegExp("=" + j + "*([^\\]'\"]*)" + j + "*\\]", "g"),
            $ = new RegExp(R),
            J = new RegExp("^" + I + "$"),
            K = {
                ID: new RegExp("^#(" + F + ")"),
                CLASS: new RegExp("^\\.(" + F + ")"),
                TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + q),
                PSEUDO: new RegExp("^" + R),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                "boolean": new RegExp("^(?:" + B + ")$", "i"),
                needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
            }, Q = /^[^{]+\{\s*\[native \w/,
            G = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            et = /'|\\/g,
            tt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
            nt = function(e, t) {
                var n = "0x" + t - 65536;
                return n !== n ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
            };
        try {
            D.apply(O = P.call(b.childNodes), b.childNodes), O[b.childNodes.length].nodeType
        } catch (rt) {
            D = {
                apply: O.length ? function(e, t) {
                    _.apply(e, P.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        o = at.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, l = at.setDocument = function(e) {
            var n = e ? e.ownerDocument || e : b;
            if (n === c || n.nodeType !== 9 || !n.documentElement) return c;
            c = n, h = n.documentElement, p = !o(n), w.getElementsByTagName = ut(function(e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), w.attributes = ut(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByClassName = ut(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), w.sortDetached = ut(function(e) {
                return e.compareDocumentPosition(c.createElement("div")) & 1
            }), w.getById = ut(function(e) {
                return h.appendChild(e).id = y, !n.getElementsByName || !n.getElementsByName(y).length
            }), w.getById ? (i.find.ID = function(e, t) {
                if (typeof t.getElementById !== L && p) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, i.filter.ID = function(e) {
                var t = e.replace(tt, nt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (i.find.ID = function(e, n) {
                if (typeof n.getElementById !== L && p) {
                    var r = n.getElementById(e);
                    return r ? r.id === e || typeof r.getAttributeNode !== L && r.getAttributeNode("id").value === e ? [r] : t : []
                }
            }, i.filter.ID = function(e) {
                var t = e.replace(tt, nt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), i.find.TAG = w.getElementsByTagName ? function(e, t) {
                if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++]) n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, i.find.CLASS = w.getElementsByClassName && function(e, t) {
                if (typeof t.getElementsByClassName !== L && p) return t.getElementsByClassName(e)
            }, v = [], d = [];
            if (w.qsa = it(n.querySelectorAll)) ut(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
            }), ut(function(e) {
                var t = c.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
            });
            return (w.matchesSelector = it(m = h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ut(function(e) {
                w.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), v.push("!=", R)
            }), d = d.length && new RegExp(d.join("|")), v = v.length && new RegExp(v.join("|")), g = it(h.contains) || h.compareDocumentPosition ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !! r && r.nodeType === 1 && !! (n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, k = h.compareDocumentPosition ? function(e, t) {
                if (e === t) return C = !0, 0;
                var r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                if (r) return r & 1 || !w.sortDetached && t.compareDocumentPosition(e) === r ? e === n || g(b, e) ? -1 : t === n || g(b, t) ? 1 : f ? H.call(f, e) - H.call(f, t) : 0 : r & 4 ? -1 : 1;
                return e.compareDocumentPosition ? -1 : 1
            } : function(e, t) {
                var r, i = 0,
                    s = e.parentNode,
                    o = t.parentNode,
                    u = [e],
                    a = [t];
                if (e === t) return C = !0, 0;
                if (!s || !o) return e === n ? -1 : t === n ? 1 : s ? -1 : o ? 1 : f ? H.call(f, e) - H.call(f, t) : 0;
                if (s === o) return ft(e, t);
                r = e;
                while (r = r.parentNode) u.unshift(r);
                r = t;
                while (r = r.parentNode) a.unshift(r);
                while (u[i] === a[i]) i++;
                return i ? ft(u[i], a[i]) : u[i] === b ? -1 : a[i] === b ? 1 : 0
            }, c
        }, at.matches = function(e, t) {
            return at(e, null, null, t)
        }, at.matchesSelector = function(e, t) {
            (e.ownerDocument || e) !== c && l(e), t = t.replace(V, "='$1']");
            if (w.matchesSelector && p && (!v || !v.test(t)) && (!d || !d.test(t))) try {
                var n = m.call(e, t);
                if (n || w.disconnectedMatch || e.document && e.document.nodeType !== 11) return n
            } catch (r) {}
            return at(t, c, null, [e]).length > 0
        }, at.contains = function(e, t) {
            return (e.ownerDocument || e) !== c && l(e), g(e, t)
        }, at.attr = function(e, n) {
            (e.ownerDocument || e) !== c && l(e);
            var r = i.attrHandle[n.toLowerCase()],
                s = r && r(e, n, !p);
            return s === t ? w.attributes || !p ? e.getAttribute(n) : (s = e.getAttributeNode(n)) && s.specified ? s.value : null : s
        }, at.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, at.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            C = !w.detectDuplicates, f = !w.sortStable && e.slice(0), e.sort(k);
            if (C) {
                while (t = e[i++]) t === e[i] && (r = n.push(i));
                while (r--) e.splice(n[r], 1)
            }
            return e
        }, s = at.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (!i)
                for (; t = e[r]; r++) n += s(t);
            else if (i === 1 || i === 9 || i === 11) {
                if (typeof e.textContent == "string") return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
            } else if (i === 3 || i === 4) return e.nodeValue;
            return n
        }, i = at.selectors = {
            cacheLength: 50,
            createPseudo: ot,
            match: K,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(tt, nt), e[3] = (e[4] || e[5] || "").replace(tt, nt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && at.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[5] && e[2];
                    return K.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && $.test(n) && (t = vt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(tt, nt).toLowerCase();
                    return e === "*" ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = x[e + " "];
                    return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && x(e, function(e) {
                        return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = at.attr(r, e);
                        return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var s = e.slice(0, 3) !== "nth",
                        o = e.slice(-4) !== "last",
                        u = t === "of-type";
                    return r === 1 && i === 0 ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(),
                            b = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])
                                        if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                    d = v = e === "only" && !d && "nextSibling"
                                }
                                return !0
                            }
                            d = [o ? m.firstChild : m.lastChild];
                            if (o && b) {
                                l = m[y] || (m[y] = {}), f = l[e] || [], p = f[0] === E && f[1], h = f[0] === E && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if (c.nodeType === 1 && ++h && c === t) {
                                        l[e] = [E, p, h];
                                        break
                                    }
                            } else if (b && (f = (t[y] || (t[y] = {}))[e]) && f[0] === E) h = f[1];
                            else
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                        b && ((c[y] || (c[y] = {}))[e] = [E, h]);
                                        if (c === t) break
                                    } return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e);
                    return r[y] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function(e, n) {
                        var i, s = r(e, t),
                            o = s.length;
                        while (o--) i = H.call(e, s[o]), e[i] = !(n[i] = s[o])
                    }) : function(e) {
                        return r(e, 0, n)
                    }) : r
                }
            },
            pseudos: {
                not: ot(function(e) {
                    var t = [],
                        n = [],
                        r = u(e.replace(U, "$1"));
                    return r[y] ? ot(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--)
                            if (s = o[u]) e[u] = !(t[u] = s)
                    }) : function(e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop()
                    }
                }),
                has: ot(function(e) {
                    return function(t) {
                        return at(e, t).length > 0
                    }
                }),
                contains: ot(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                    }
                }),
                lang: ot(function(e) {
                    return J.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(tt, nt).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = p ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === c.activeElement && (!c.hasFocus || c.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !! e.checked || t === "option" && !! e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4) return !1;
                    return !0
                },
                parent: function(e) {
                    return !i.pseudos.empty(e)
                },
                header: function(e) {
                    return Z.test(e.nodeName)
                },
                input: function(e) {
                    return Y.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
                },
                first: dt(function() {
                    return [0]
                }),
                last: dt(function(e, t) {
                    return [t - 1]
                }),
                eq: dt(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: dt(function(e, t) {
                    var n = 0;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: dt(function(e, t) {
                    var n = 1;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: dt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; --r >= 0;) e.push(r);
                    return e
                }),
                gt: dt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; ++r < t;) e.push(r);
                    return e
                })
            }
        };
        for (n in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) i.pseudos[n] = ht(n);
        for (n in {
            submit: !0,
            reset: !0
        }) i.pseudos[n] = pt(n);
        u = at.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = N[e + " "];
            if (!s) {
                t || (t = vt(e)), n = t.length;
                while (n--) s = Et(t[n]), s[y] ? r.push(s) : i.push(s);
                s = N(e, St(i, r))
            }
            return s
        }, i.pseudos.nth = i.pseudos.eq, Nt.prototype = i.filters = i.pseudos, i.setFilters = new Nt, w.sortStable = y.split("").sort(k).join("") === y, l(), [0, 0].sort(k), w.detectDuplicates = C, ut(function(e) {
            e.innerHTML = "<a href='#'></a>";
            if (e.firstChild.getAttribute("href") !== "#") {
                var t = "type|href|height|width".split("|"),
                    n = t.length;
                while (n--) i.attrHandle[t[n]] = ct
            }
        }), ut(function(e) {
            if (e.getAttribute("disabled") != null) {
                var t = B.split("|"),
                    n = t.length;
                while (n--) i.attrHandle[t[n]] = lt
            }
        }), jQuery.find = at, jQuery.expr = at.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = at.uniqueSort, jQuery.text = at.getText, jQuery.isXMLDoc = at.isXML, jQuery.contains = at.contains
    }(window);
    var optionsCache = {};
    jQuery.Callbacks = function(e) {
        e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [],
            a = !e.once && [],
            f = function(c) {
                t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
                for (; u && o < s; o++)
                    if (u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
            }, l = {
                add: function() {
                    if (u) {
                        var n = u.length;
                        (function o(t) {
                            jQuery.each(t, function(t, n) {
                                var r = jQuery.type(n);
                                r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                            })
                        })(arguments), r ? s = u.length : t && (i = n, f(t))
                    }
                    return this
                },
                remove: function() {
                    return u && jQuery.each(arguments, function(e, t) {
                        var n;
                        while ((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
                    }), this
                },
                has: function(e) {
                    return e ? jQuery.inArray(e, u) > -1 : !! u && !! u.length
                },
                empty: function() {
                    return u = [], s = 0, this
                },
                disable: function() {
                    return u = a = t = undefined, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return a = undefined, t || l.disable(), this
                },
                locked: function() {
                    return !a
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], u && (!n || a) && (r ? a.push(t) : f(t)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return l
    }, jQuery.extend({
        Deferred: function(e) {
            var t = [
                ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                ["notify", "progress", jQuery.Callbacks("memory")]
            ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return jQuery.Deferred(function(n) {
                            jQuery.each(t, function(t, s) {
                                var o = s[0],
                                    u = jQuery.isFunction(e[t]) && e[t];
                                i[s[1]](function() {
                                    var e = u && u.apply(this, arguments);
                                    e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? jQuery.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, jQuery.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = core_slice.call(arguments),
                r = n.length,
                i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : jQuery.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? core_slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                }, u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    }), jQuery.support = function(e) {
        var t = document.createElement("input"),
            n = document.createDocumentFragment(),
            r = document.createElement("div"),
            i = document.createElement("select"),
            s = i.appendChild(document.createElement("option"));
        return t.type ? (t.type = "checkbox", e.checkOn = t.value !== "", e.optSelected = s.selected, e.reliableMarginRight = !0, e.boxSizingReliable = !0, e.pixelPosition = !1, t.checked = !0, e.noCloneChecked = t.cloneNode(!0).checked, i.disabled = !0, e.optDisabled = !s.disabled, t = document.createElement("input"), t.value = "t", t.type = "radio", e.radioValue = t.value === "t", t.setAttribute("checked", "t"), t.setAttribute("name", "t"), n.appendChild(t), e.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, e.focusinBubbles = "onfocusin" in window, r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = r.style.backgroundClip === "content-box", jQuery(function() {
            var t, n, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                s = document.getElementsByTagName("body")[0];
            if (!s) return;
            t = document.createElement("div"), t.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(t).appendChild(r), r.innerHTML = "", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", jQuery.swap(s, s.style.zoom != null ? {
                zoom: 1
            } : {}, function() {
                e.boxSizing = r.offsetWidth === 4
            }), window.getComputedStyle && (e.pixelPosition = (window.getComputedStyle(r, null) || {}).top !== "1%", e.boxSizingReliable = (window.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", n = r.appendChild(document.createElement("div")), n.style.cssText = r.style.cssText = i, n.style.marginRight = n.style.width = "0", r.style.width = "1px", e.reliableMarginRight = !parseFloat((window.getComputedStyle(n, null) || {}).marginRight)), s.removeChild(t)
        }), e) : e
    }({});
    var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;
    Data.uid = 1, Data.accepts = function(e) {
        return e.nodeType ? e.nodeType === 1 || e.nodeType === 9 : !0
    }, Data.prototype = {
        key: function(e) {
            if (!Data.accepts(e)) return 0;
            var t = {}, n = e[this.expando];
            if (!n) {
                n = Data.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, jQuery.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                s = this.cache[i];
            if (typeof t == "string") s[t] = n;
            else if (jQuery.isEmptyObject(s)) this.cache[i] = t;
            else
                for (r in t) s[r] = t[r]
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function(e, t, n) {
            return t === undefined || t && typeof t == "string" && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n, r, i = this.key(e),
                s = this.cache[i];
            if (t === undefined) this.cache[i] = {};
            else {
                jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : t in s ? r = [t] : (r = jQuery.camelCase(t), r = r in s ? [r] : r.match(core_rnotwhite) || []), n = r.length;
                while (n--) delete s[r[n]]
            }
        },
        hasData: function(e) {
            return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            delete this.cache[this.key(e)]
        }
    }, data_user = new Data, data_priv = new Data, jQuery.extend({
        acceptData: Data.accepts,
        hasData: function(e) {
            return data_user.hasData(e) || data_priv.hasData(e)
        },
        data: function(e, t, n) {
            return data_user.access(e, t, n)
        },
        removeData: function(e, t) {
            data_user.remove(e, t)
        },
        _data: function(e, t, n) {
            return data_priv.access(e, t, n)
        },
        _removeData: function(e, t) {
            data_priv.remove(e, t)
        }
    }), jQuery.fn.extend({
        data: function(e, t) {
            var n, r, i = this[0],
                s = 0,
                o = null;
            if (e === undefined) {
                if (this.length) {
                    o = data_user.get(i);
                    if (i.nodeType === 1 && !data_priv.get(i, "hasDataAttrs")) {
                        n = i.attributes;
                        for (; s < n.length; s++) r = n[s].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.substring(5)), dataAttr(i, r, o[r]));
                        data_priv.set(i, "hasDataAttrs", !0)
                    }
                }
                return o
            }
            return typeof e == "object" ? this.each(function() {
                data_user.set(this, e)
            }) : jQuery.access(this, function(t) {
                var n, r = jQuery.camelCase(e);
                if (i && t === undefined) {
                    n = data_user.get(i, e);
                    if (n !== undefined) return n;
                    n = data_user.get(i, r);
                    if (n !== undefined) return n;
                    n = dataAttr(i, r, undefined);
                    if (n !== undefined) return n;
                    return
                }
                this.each(function() {
                    var n = data_user.get(this, r);
                    data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                data_user.remove(this, e)
            })
        }
    }), jQuery.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = jQuery.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = jQuery._queueHooks(e, t),
                o = function() {
                    jQuery.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), s.cur = i, i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return data_priv.get(e, n) || data_priv.access(e, n, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(e, [t + "queue", n])
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = jQuery.queue(this, e, t);
                jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                jQuery.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = jQuery.Deferred(),
                s = this,
                o = this.length,
                u = function() {
                    --r || i.resolveWith(s, [s])
                };
            typeof e != "string" && (t = e, e = undefined), e = e || "fx";
            while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        attr: function(e, t) {
            return jQuery.access(this, jQuery.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                jQuery.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return jQuery.access(this, jQuery.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[jQuery.propFix[e] || e]
            })
        },
        addClass: function(e) {
            var t, n, r, i, s, o = 0,
                u = this.length,
                a = typeof e == "string" && e;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).addClass(e.call(this, t, this.className))
            });
            if (a) {
                t = (e || "").match(core_rnotwhite) || [];
                for (; o < u; o++) {
                    n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                    if (r) {
                        s = 0;
                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        n.className = jQuery.trim(r)
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, s, o = 0,
                u = this.length,
                a = arguments.length === 0 || typeof e == "string" && e;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).removeClass(e.call(this, t, this.className))
            });
            if (a) {
                t = (e || "").match(core_rnotwhite) || [];
                for (; o < u; o++) {
                    n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                    if (r) {
                        s = 0;
                        while (i = t[s++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        n.className = e ? jQuery.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return jQuery.isFunction(e) ? this.each(function(n) {
                jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, s = 0,
                        o = jQuery(this),
                        u = t,
                        a = e.match(core_rnotwhite) || [];
                    while (i = a[s++]) u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
                } else if (n === core_strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var t, n, r, i = this[0];
            if (!arguments.length) {
                if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
                return
            }
            return r = jQuery.isFunction(e), this.each(function(n) {
                var i, s = jQuery(this);
                if (this.nodeType !== 1) return;
                r ? i = e.call(this, n, s.val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function(e) {
                    return e == null ? "" : e + ""
                })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
            })
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (jQuery.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                            t = jQuery(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        s = jQuery.makeArray(t),
                        o = i.length;
                    while (o--) {
                        r = i[o];
                        if (r.selected = jQuery.inArray(jQuery(r).val(), s) >= 0) n = !0
                    }
                    return n || (e.selectedIndex = -1), s
                }
            }
        },
        attr: function(e, t, n) {
            var r, i, s = e.nodeType;
            if (!e || s === 3 || s === 8 || s === 2) return;
            if (typeof e.getAttribute === core_strundefined) return jQuery.prop(e, t, n);
            if (s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.boolean.test(t) ? boolHook : nodeHook);
            if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
            if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
            jQuery.removeAttr(e, t)
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                s = t && t.match(core_rnotwhite);
            if (s && e.nodeType === 1)
                while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.boolean.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!jQuery.support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, s, o = e.nodeType;
            if (!e || o === 3 || o === 8 || o === 2) return;
            return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), boolHook = {
        set: function(e, t, n) {
            return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, jQuery.each(jQuery.expr.match.boolean.source.match(/\w+/g), function(e, t) {
        var n = jQuery.expr.attrHandle[t] || jQuery.find.attr;
        jQuery.expr.attrHandle[t] = function(e, t, r) {
            var i = jQuery.expr.attrHandle[t],
                s = r ? undefined : (jQuery.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return jQuery.expr.attrHandle[t] = i, s
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    }), jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(e, t) {
                if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
            }
        }, jQuery.support.checkOn || (jQuery.valHooks[this].get = function(e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    });
    var rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
            if (!m) return;
            n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function(e) {
                return typeof jQuery === core_strundefined || !! e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(o.elem, arguments)
            }, o.elem = e), t = (t || "").match(core_rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) continue;
                c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                    namespace: d.join(".")
                }, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
            }
            e = null
        },
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
            if (!m || !(a = m.events)) return;
            t = (t || "").match(core_rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) {
                    for (p in a) jQuery.event.remove(e, p + t[f], n, r, !0);
                    continue
                }
                c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
                while (s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
                o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
            }
            jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
        },
        trigger: function(e, t, n, r) {
            var i, s, o, u, a, f, l, c = [n || document],
                h = core_hasOwn.call(e, "type") ? e.type : e,
                p = core_hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
            s = o = n = n || document;
            if (n.nodeType === 3 || n.nodeType === 8) return;
            if (rfocusMorph.test(h + jQuery.event.triggered)) return;
            h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
            if (!r && l.trigger && l.trigger.apply(n, t) === !1) return;
            if (!r && !l.noBubble && !jQuery.isWindow(n)) {
                u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
                for (; s; s = s.parentNode) c.push(s), o = s;
                o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
            }
            i = 0;
            while ((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && jQuery.acceptData(s) && f.apply && f.apply(s, t) === !1 && e.preventDefault();
            return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
        },
        dispatch: function(e) {
            e = jQuery.event.fix(e);
            var t, n, r, i, s, o = [],
                u = core_slice.call(arguments),
                a = (data_priv.get(this, "events") || {})[e.type] || [],
                f = jQuery.event.special[e.type] || {};
            u[0] = e, e.delegateTarget = this;
            if (f.preDispatch && f.preDispatch.call(this, e) === !1) return;
            o = jQuery.event.handlers.call(this, e, a), t = 0;
            while ((i = o[t++]) && !e.isPropagationStopped()) {
                e.currentTarget = i.elem, n = 0;
                while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())
                    if (!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
            }
            return f.postDispatch && f.postDispatch.call(this, e), e.result
        },
        handlers: function(e, t) {
            var n, r, i, s, o = [],
                u = t.delegateCount,
                a = e.target;
            if (u && a.nodeType && (!e.button || e.type !== "click"))
                for (; a !== this; a = a.parentNode || this)
                    if (a.disabled !== !0 || e.type !== "click") {
                        r = [];
                        for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
                        r.length && o.push({
                            elem: a,
                            handlers: r
                        })
                    }
            return u < t.length && o.push({
                elem: this,
                handlers: t.slice(u)
            }), o
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[jQuery.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return jQuery.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = jQuery.extend(new jQuery.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, jQuery.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, jQuery.Event = function(e, t) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        jQuery.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj;
                if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
            };
        jQuery.event.special[t] = {
            setup: function() {
                n++ === 0 && document.addEventListener(e, r, !0)
            },
            teardown: function() {
                --n === 0 && document.removeEventListener(e, r, !0)
            }
        }
    }), jQuery.fn.extend({
        on: function(e, t, n, r, i) {
            var s, o;
            if (typeof e == "object") {
                typeof t != "string" && (n = n || t, t = undefined);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
            if (r === !1) r = returnFalse;
            else if (!r) return this;
            return i === 1 && (s = r, r = function(e) {
                return jQuery().off(e), s.apply(this, arguments)
            }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if (typeof e == "object") {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            if (t === !1 || typeof t == "function") n = t, t = undefined;
            return n === !1 && (n = returnFalse), this.each(function() {
                jQuery.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                jQuery.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return jQuery.event.trigger(e, t, n, !0)
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    jQuery.fn.extend({
        find: function(e) {
            var t, n, r, i = this.length;
            if (typeof e != "string") return t = this, this.pushStack(jQuery(e).filter(function() {
                for (r = 0; r < i; r++)
                    if (jQuery.contains(t[r], this)) return !0
            }));
            n = [];
            for (r = 0; r < i; r++) jQuery.find(e, this[r], n);
            return n = this.pushStack(i > 1 ? jQuery.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
        },
        has: function(e) {
            var t = jQuery(e, this),
                n = t.length;
            return this.filter(function() {
                var e = 0;
                for (; e < n; e++)
                    if (jQuery.contains(this, t[e])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(winnow(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(winnow(this, e || [], !1))
        },
        is: function(e) {
            return !!e && (typeof e == "string" ? rneedsContext.test(e) ? jQuery(e, this.context).index(this[0]) >= 0 : jQuery.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
            for (; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                        n = s.push(n);
                        break
                    }
            return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
        },
        index: function(e) {
            return e ? typeof e == "string" ? core_indexOf.call(jQuery(e), this[0]) : core_indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? jQuery(e, t) : jQuery.makeArray(e && e.nodeType ? [e] : e),
                r = jQuery.merge(this.get(), n);
            return this.pushStack(jQuery.unique(r))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), jQuery.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return jQuery.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return jQuery.dir(e, "parentNode", n)
        },
        next: function(e) {
            return sibling(e, "nextSibling")
        },
        prev: function(e) {
            return sibling(e, "previousSibling")
        },
        nextAll: function(e) {
            return jQuery.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return jQuery.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return jQuery.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return jQuery.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return jQuery.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return jQuery.sibling(e.firstChild)
        },
        contents: function(e) {
            return jQuery.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : jQuery.merge([], e.childNodes)
        }
    }, function(e, t) {
        jQuery.fn[e] = function(n, r) {
            var i = jQuery.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), e[0] === "p" && i.reverse()), this.pushStack(i)
        }
    }), jQuery.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
                return e.nodeType === 1
            }))
        },
        dir: function(e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && e.nodeType !== 9)
                if (e.nodeType === 1) {
                    if (i && jQuery(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.col = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.fn.extend({
        text: function(e) {
            return jQuery.access(this, function(e) {
                return e === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? jQuery.filter(e, this) : this,
                i = 0;
            for (;
                (n = r[i]) != null; i++)!t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                return jQuery.clone(this, e, t)
            })
        },
        html: function(e) {
            return jQuery.access(this, function(e) {
                var t = this[0] || {}, n = 0,
                    r = this.length;
                if (e === undefined && t.nodeType === 1) return t.innerHTML;
                if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = jQuery.map(this, function(e) {
                return [e.nextSibling, e.parentNode]
            }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    s = e[t++];
                s && (jQuery(this).remove(), s.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = core_concat.apply([], e);
            var r, i, s, o, u, a, f = 0,
                l = this.length,
                c = this,
                h = l - 1,
                p = e[0],
                d = jQuery.isFunction(p);
            if (d || !(l <= 1 || typeof p != "string" || jQuery.support.checkClone || !rchecked.test(p))) return this.each(function(r) {
                var i = c.eq(r);
                d && (e[0] = p.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (l) {
                r = jQuery.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, r.childNodes.length === 1 && (r = i);
                if (i) {
                    s = jQuery.map(getAll(r, "script"), disableScript), o = s.length;
                    for (; f < l; f++) u = r, f !== h && (u = jQuery.clone(u, !0, !0), o && jQuery.merge(s, getAll(u, "script"))), t.call(this[f], u, f);
                    if (o) {
                        a = s[s.length - 1].ownerDocument, jQuery.map(s, restoreScript);
                        for (f = 0; f < o; f++) u = s[f], rscriptType.test(u.type || "") && !data_priv.access(u, "globalEval") && jQuery.contains(a, u) && (u.src ? jQuery._evalUrl(u.src) : jQuery.globalEval(u.textContent.replace(rcleanScript, "")))
                    }
                }
            }
            return this
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        jQuery.fn[e] = function(e) {
            var n, r = [],
                i = jQuery(e),
                s = i.length - 1,
                o = 0;
            for (; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), core_push.apply(r, n.get());
            return this.pushStack(r)
        }
    }), jQuery.extend({
        clone: function(e, t, n) {
            var r, i, s, o, u = e.cloneNode(!0),
                a = jQuery.contains(e.ownerDocument, e);
            if (!jQuery.support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
                o = getAll(u), s = getAll(e);
                for (r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
            }
            if (t)
                if (n) {
                    s = s || getAll(e), o = o || getAll(u);
                    for (r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
                } else cloneCopyEvent(e, u);
            return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
        },
        buildFragment: function(e, t, n, r) {
            var i, s, o, u, a, f, l = 0,
                c = e.length,
                h = t.createDocumentFragment(),
                p = [];
            for (; l < c; l++) {
                i = e[l];
                if (i || i === 0)
                    if (jQuery.type(i) === "object") jQuery.merge(p, i.nodeType ? [i] : i);
                    else
                if (!rhtml.test(i)) p.push(t.createTextNode(i));
                else {
                    s = s || h.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                    while (f--) s = s.firstChild;
                    jQuery.merge(p, s.childNodes), s = h.firstChild, s.textContent = ""
                }
            }
            h.textContent = "", l = 0;
            while (i = p[l++]) {
                if (r && jQuery.inArray(i, r) !== -1) continue;
                a = jQuery.contains(i.ownerDocument, i), s = getAll(h.appendChild(i), "script"), a && setGlobalEval(s);
                if (n) {
                    f = 0;
                    while (i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
                }
            }
            return h
        },
        cleanData: function(e) {
            var t, n, r, i = e.length,
                s = 0,
                o = jQuery.event.special;
            for (; s < i; s++) {
                n = e[s];
                if (jQuery.acceptData(n)) {
                    t = data_priv.access(n);
                    if (t)
                        for (r in t.events) o[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle)
                }
                data_user.discard(n), data_priv.discard(n)
            }
        },
        _evalUrl: function(e) {
            return jQuery.ajax({
                url: e,
                type: "GET",
                dataType: "text",
                async: !1,
                global: !1,
                success: jQuery.globalEval
            })
        }
    }), jQuery.fn.extend({
        wrapAll: function(e) {
            var t;
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = jQuery(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = jQuery.isFunction(e);
            return this.each(function(n) {
                jQuery(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block"
        }, cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        }, cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({
        css: function(e, t) {
            return jQuery.access(this, function(e, t, n) {
                var r, i, s = {}, o = 0;
                if (jQuery.isArray(t)) {
                    r = getStyles(e), i = t.length;
                    for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
                    return s
                }
                return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(e) {
            var t = typeof e == "boolean";
            return this.each(function() {
                (t ? e : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = curCSS(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var i, s, o, u = jQuery.camelCase(t),
                a = e.style;
            t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
            if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
            s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
            if (n == null || s === "number" && isNaN(n)) return;
            s === "number" && !jQuery.cssNumber[u] && (n += "px"), !jQuery.support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
            if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
        },
        css: function(e, t, n, r) {
            var i, s, o, u = jQuery.camelCase(t);
            return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
        }
    }), curCSS = function(e, t, n) {
        var r, i, s, o = n || getStyles(e),
            u = o ? o.getPropertyValue(t) || o[t] : undefined,
            a = e.style;
        return o && (u === "" && !jQuery.contains(e.ownerDocument, e) && (u = jQuery.style(e, t)), rnumnonpx.test(u) && rmargin.test(t) && (r = a.width, i = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = u, u = o.width, a.width = r, a.minWidth = i, a.maxWidth = s)), u
    }, jQuery.each(["height", "width"], function(e, t) {
        jQuery.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return e.offsetWidth === 0 && rdisplayswap.test(jQuery.css(e, "display")) ? jQuery.swap(e, cssShow, function() {
                    return getWidthOrHeight(e, t, r)
                }) : getWidthOrHeight(e, t, r)
            },
            set: function(e, n, r) {
                var i = r && getStyles(e);
                return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.support.boxSizing && jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
            }
        }
    }), jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(e, t) {
                if (t) return jQuery.swap(e, {
                    display: "inline-block"
                }, curCSS, [e, "marginRight"])
            }
        }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function(e, t) {
            jQuery.cssHooks[t] = {
                get: function(e, n) {
                    if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
                }
            }
        })
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, jQuery.expr.filters.visible = function(e) {
        return !jQuery.expr.filters.hidden(e)
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        jQuery.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {}, s = typeof n == "string" ? n.split(" ") : [n];
                for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = jQuery.prop(this, "elements");
                return e ? jQuery.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !manipulation_rcheckableType.test(e))
            }).map(function(e, t) {
                var n = jQuery(this).val();
                return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }), jQuery.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) buildParams(n, e[n], t, i);
        return r.join("&").replace(r20, "+")
    }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        jQuery.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), jQuery.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
        ajax_rquery = /\?/,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(e, t, n) {
        if (typeof e != "string" && _load) return _load.apply(this, arguments);
        var r, i, s, o = this,
            u = e.indexOf(" ");
        return u >= 0 && (r = e.slice(u), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, s || [e.responseText, t, e])
        }), this
    }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        jQuery.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(e, t) {
            function S(e, t, s, u) {
                var f, m, g, b, E, S = t;
                if (y === 2) return;
                y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
                if (f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
                else {
                    g = S;
                    if (e || !S) S = "error", e < 0 && (e = 0)
                }
                w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (t = e, e = undefined), t = t || {};
            var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
                c = l.context || l,
                h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
                p = jQuery.Deferred(),
                d = jQuery.Callbacks("once memory"),
                v = l.statusCode || {}, m = {}, g = {}, y = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (y === 2) {
                            if (!s) {
                                s = {};
                                while (t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return y === 2 ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return y || (e = g[n] = g[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return y || (l.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (y < 2)
                                for (t in e) v[t] = [v[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), S(0, t), this
                    }
                };
            p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
            if (y === 2) return w;
            a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (ajax_rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + ajax_nonce++) : r + (ajax_rquery.test(r) ? "&" : "?") + "_=" + ajax_nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
            for (f in l.headers) w.setRequestHeader(f, l.headers[f]);
            if (!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
                b = "abort";
                for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[f](l[f]);
                n = inspectPrefiltersOrTransports(transports, l, t, w);
                if (!n) S(-1, "No Transport");
                else {
                    w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
                        w.abort("timeout")
                    }, l.timeout));
                    try {
                        y = 1, n.send(m, S)
                    } catch (E) {
                        if (!(y < 2)) throw E;
                        S(-1, E)
                    }
                }
                return w
            }
            return w.abort()
        },
        getJSON: function(e, t, n) {
            return jQuery.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return jQuery.get(e, undefined, t, "script")
        }
    }), jQuery.each(["get", "post"], function(e, t) {
        jQuery[t] = function(e, n, r, i) {
            return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return jQuery.globalEval(e), e
            }
        }
    }), jQuery.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), jQuery.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = jQuery("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                    }), document.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[e] = !0, e
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (ajax_rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return s || jQuery.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", i = window[r], window[r] = function() {
            s = arguments
        }, n.always(function() {
            window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
        }), "script"
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(),
        xhrSuccessStatus = {
            0: 200,
            1223: 204
        }, xhrId = 0,
        xhrCallbacks = {};
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var e in xhrCallbacks) xhrCallbacks[e]();
        xhrCallbacks = undefined
    }), jQuery.support.cors = !! xhrSupported && "withCredentials" in xhrSupported, jQuery.support.ajax = xhrSupported = !! xhrSupported, jQuery.ajaxTransport(function(e) {
        var t;
        if (jQuery.support.cors || xhrSupported && !e.crossDomain) return {
            send: function(n, r) {
                var i, s, o = e.xhr();
                o.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields)
                    for (i in e.xhrFields) o[i] = e.xhrFields[i];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) o.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete xhrCallbacks[s], t = o.onload = o.onerror = null, e === "abort" ? o.abort() : e === "error" ? r(o.status || 404, o.statusText) : r(xhrSuccessStatus[o.status] || o.status, o.statusText, typeof o.responseText == "string" ? {
                            text: o.responseText
                        } : undefined, o.getAllResponseHeaders()))
                    }
                }, o.onload = t(), o.onerror = t("error"), t = xhrCallbacks[s = xhrId++] = t("abort"), o.send(e.hasContent && e.data || null)
            },
            abort: function() {
                t && t()
            }
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [
                function(e, t) {
                    var n, r, i = this.createTween(e, t),
                        s = rfxnum.exec(t),
                        o = i.cur(),
                        u = +o || 0,
                        a = 1,
                        f = 20;
                    if (s) {
                        n = +s[2], r = s[3] || (jQuery.cssNumber[e] ? "" : "px");
                        if (r !== "px" && u) {
                            u = jQuery.css(i.elem, e, !0) || n || 1;
                            do a = a || ".5", u /= a, jQuery.style(i.elem, e, u + r); while (a !== (a = i.cur() / o) && a !== 1 && --f)
                        }
                        i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
                    }
                    return i
                }
            ]
        };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(e, t) {
            jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Tween.propHooks[this.prop];
            return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !! e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, jQuery.each(["toggle", "show", "hide"], function(e, t) {
        var n = jQuery.fn[t];
        jQuery.fn[t] = function(e, r, i) {
            return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
        }
    }), jQuery.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = jQuery.isEmptyObject(e),
                s = jQuery.speed(t, n, r),
                o = function() {
                    var t = Animation(this, jQuery.extend({}, e), s);
                    o.finish = function() {
                        t.stop(!0)
                    }, (i || data_priv.get(this, "finish")) && t.stop(!0)
                };
            return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = e != null && e + "queueHooks",
                    s = jQuery.timers,
                    o = data_priv.get(this);
                if (i) o[i] && o[i].stop && r(o[i]);
                else
                    for (i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
                for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                (t || !n) && jQuery.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = data_priv.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    s = jQuery.timers,
                    o = r ? r.length : 0;
                n.finish = !0, jQuery.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this);
                for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        jQuery.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), jQuery.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
            complete: n || !n && t || jQuery.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !jQuery.isFunction(t) && t
        };
        r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete, r.complete = function() {
            jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
        }, r
    }, jQuery.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
        var e, t = jQuery.timers,
            n = 0;
        fxNow = jQuery.now();
        for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function(e) {
        e() && jQuery.timers.push(e) && jQuery.fx.start()
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(e) {
        return jQuery.grep(jQuery.timers, function(t) {
            return e === t.elem
        }).length
    }), jQuery.fn.offset = function(e) {
        if (arguments.length) return e === undefined ? this : this.each(function(t) {
            jQuery.offset.setOffset(this, e, t)
        });
        var t, n, r = this[0],
            i = {
                top: 0,
                left: 0
            }, s = r && r.ownerDocument;
        if (!s) return;
        return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== core_strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
            top: i.top + n.pageYOffset - t.clientTop,
            left: i.left + n.pageXOffset - t.clientLeft
        }) : i
    }, jQuery.offset = {
        setOffset: function(e, t, n) {
            var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
                c = jQuery(e),
                h = {};
            l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, jQuery.fn.extend({
        position: function() {
            if (!this[0]) return;
            var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
            return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {
                top: t.top - r.top - jQuery.css(n, "marginTop", !0),
                left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || docElem;
                while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
                return e || docElem
            })
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function(r) {
            return jQuery.access(this, function(e, r, i) {
                var s = getWindow(e);
                if (i === undefined) return s ? s[t] : e[r];
                s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        jQuery.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            jQuery.fn[r] = function(r, i) {
                var s = arguments.length && (n || typeof r != "boolean"),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return jQuery.access(this, function(t, n, r) {
                    var i;
                    return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    }), jQuery.fn.size = function() {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof module == "object" && typeof module.exports == "object" ? module.exports = jQuery : typeof define == "function" && define.amd && define("jquery", [], function() {
        return jQuery
    }), typeof window == "object" && typeof window.document == "object" && (window.jQuery = window.$ = jQuery)
})(window)
