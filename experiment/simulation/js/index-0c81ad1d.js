var me = Object.defineProperty;
var _e = (t, n, e) =>
    n in t
        ? me(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (t[n] = e);
var pn = (t, n, e) => (_e(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver((i) => {
        for (const o of i)
            if (o.type === "childList")
                for (const s of o.addedNodes)
                    s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
    }).observe(document, { childList: !0, subtree: !0 });
    function e(i) {
        const o = {};
        return (
            i.integrity && (o.integrity = i.integrity),
            i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === "use-credentials"
                ? (o.credentials = "include")
                : i.crossOrigin === "anonymous"
                    ? (o.credentials = "omit")
                    : (o.credentials = "same-origin"),
            o
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const o = e(i);
        fetch(i.href, o);
    }
})();
var ye = { value: () => { } };
function tn() {
    for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
        if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
            throw new Error("illegal type: " + r);
        e[r] = [];
    }
    return new vt(e);
}
function vt(t) {
    this._ = t;
}
function xe(t, n) {
    return t
        .trim()
        .split(/^|\s+/)
        .map(function (e) {
            var r = "",
                i = e.indexOf(".");
            if (
                (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
                    e && !n.hasOwnProperty(e))
            )
                throw new Error("unknown type: " + e);
            return { type: e, name: r };
        });
}
vt.prototype = tn.prototype = {
    constructor: vt,
    on: function (t, n) {
        var e = this._,
            r = xe(t + "", e),
            i,
            o = -1,
            s = r.length;
        if (arguments.length < 2) {
            for (; ++o < s;)
                if ((i = (t = r[o]).type) && (i = ve(e[i], t.name))) return i;
            return;
        }
        if (n != null && typeof n != "function")
            throw new Error("invalid callback: " + n);
        for (; ++o < s;)
            if ((i = (t = r[o]).type)) e[i] = gn(e[i], t.name, n);
            else if (n == null) for (i in e) e[i] = gn(e[i], t.name, null);
        return this;
    },
    copy: function () {
        var t = {},
            n = this._;
        for (var e in n) t[e] = n[e].slice();
        return new vt(t);
    },
    call: function (t, n) {
        if ((i = arguments.length - 2) > 0)
            for (var e = new Array(i), r = 0, i, o; r < i; ++r)
                e[r] = arguments[r + 2];
        if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
    },
    apply: function (t, n, e) {
        if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(n, e);
    },
};
function ve(t, n) {
    for (var e = 0, r = t.length, i; e < r; ++e)
        if ((i = t[e]).name === n) return i.value;
}
function gn(t, n, e) {
    for (var r = 0, i = t.length; r < i; ++r)
        if (t[r].name === n) {
            ((t[r] = ye), (t = t.slice(0, r).concat(t.slice(r + 1))));
            break;
        }
    return (e != null && t.push({ name: n, value: e }), t);
}
var Yt = "http://www.w3.org/1999/xhtml";
const mn = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: Yt,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
};
function Tt(t) {
    var n = (t += ""),
        e = n.indexOf(":");
    return (
        e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
        mn.hasOwnProperty(n) ? { space: mn[n], local: t } : t
    );
}
function we(t) {
    return function () {
        var n = this.ownerDocument,
            e = this.namespaceURI;
        return e === Yt && n.documentElement.namespaceURI === Yt
            ? n.createElement(t)
            : n.createElementNS(e, t);
    };
}
function be(t) {
    return function () {
        return this.ownerDocument.createElementNS(t.space, t.local);
    };
}
function Ln(t) {
    var n = Tt(t);
    return (n.local ? be : we)(n);
}
function Ee() { }
function nn(t) {
    return t == null
        ? Ee
        : function () {
            return this.querySelector(t);
        };
}
function $e(t) {
    typeof t != "function" && (t = nn(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (
            var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
            u < s;
            ++u
        )
            (a = o[u]) &&
                (l = t.call(a, a.__data__, u, o)) &&
                ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
    return new E(r, this._parents);
}
function Ce(t) {
    return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ie() {
    return [];
}
function Rn(t) {
    return t == null
        ? Ie
        : function () {
            return this.querySelectorAll(t);
        };
}
function Ne(t) {
    return function () {
        return Ce(t.apply(this, arguments));
    };
}
function Pe(t) {
    typeof t == "function" ? (t = Ne(t)) : (t = Rn(t));
    for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
        for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
            (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
    return new E(r, i);
}
function On(t) {
    return function () {
        return this.matches(t);
    };
}
function Dn(t) {
    return function (n) {
        return n.matches(t);
    };
}
var ke = Array.prototype.find;
function Ae(t) {
    return function () {
        return ke.call(this.children, t);
    };
}
function Te() {
    return this.firstElementChild;
}
function Me(t) {
    return this.select(t == null ? Te : Ae(typeof t == "function" ? t : Dn(t)));
}
var Se = Array.prototype.filter;
function Be() {
    return Array.from(this.children);
}
function Le(t) {
    return function () {
        return Se.call(this.children, t);
    };
}
function Re(t) {
    return this.selectAll(
        t == null ? Be : Le(typeof t == "function" ? t : Dn(t)),
    );
}
function Oe(t) {
    typeof t != "function" && (t = On(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
            (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
    return new E(r, this._parents);
}
function Gn(t) {
    return new Array(t.length);
}
function De() {
    return new E(this._enter || this._groups.map(Gn), this._parents);
}
function Et(t, n) {
    ((this.ownerDocument = t.ownerDocument),
        (this.namespaceURI = t.namespaceURI),
        (this._next = null),
        (this._parent = t),
        (this.__data__ = n));
}
Et.prototype = {
    constructor: Et,
    appendChild: function (t) {
        return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function (t, n) {
        return this._parent.insertBefore(t, n);
    },
    querySelector: function (t) {
        return this._parent.querySelector(t);
    },
    querySelectorAll: function (t) {
        return this._parent.querySelectorAll(t);
    },
};
function Ge(t) {
    return function () {
        return t;
    };
}
function He(t, n, e, r, i, o) {
    for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
        (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Et(t, o[s]));
    for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Xe(t, n, e, r, i, o, s) {
    var c,
        a,
        l = new Map(),
        u = n.length,
        h = o.length,
        f = new Array(u),
        p;
    for (c = 0; c < u; ++c)
        (a = n[c]) &&
            ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
                l.has(p) ? (i[c] = a) : l.set(p, a));
    for (c = 0; c < h; ++c)
        ((p = s.call(t, o[c], c, o) + ""),
            (a = l.get(p))
                ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
                : (e[c] = new Et(t, o[c])));
    for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Fe(t) {
    return t.__data__;
}
function qe(t, n) {
    if (!arguments.length) return Array.from(this, Fe);
    var e = n ? Xe : He,
        r = this._parents,
        i = this._groups;
    typeof t != "function" && (t = Ge(t));
    for (
        var o = i.length,
        s = new Array(o),
        c = new Array(o),
        a = new Array(o),
        l = 0;
        l < o;
        ++l
    ) {
        var u = r[l],
            h = i[l],
            f = h.length,
            p = Ye(t.call(u, u && u.__data__, l, r)),
            m = p.length,
            _ = (c[l] = new Array(m)),
            N = (s[l] = new Array(m)),
            U = (a[l] = new Array(f));
        e(u, h, _, N, U, p, n);
        for (var A = 0, T = 0, d, g; A < m; ++A)
            if ((d = _[A])) {
                for (A >= T && (T = A + 1); !(g = N[T]) && ++T < m;);
                d._next = g || null;
            }
    }
    return ((s = new E(s, r)), (s._enter = c), (s._exit = a), s);
}
function Ye(t) {
    return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ve() {
    return new E(this._exit || this._groups.map(Gn), this._parents);
}
function ze(t, n, e) {
    var r = this.enter(),
        i = this,
        o = this.exit();
    return (
        typeof t == "function"
            ? ((r = t(r)), r && (r = r.selection()))
            : (r = r.append(t + "")),
        n != null && ((i = n(i)), i && (i = i.selection())),
        e == null ? o.remove() : e(o),
        r && i ? r.merge(i).order() : i
    );
}
function Ue(t) {
    for (
        var n = t.selection ? t.selection() : t,
        e = this._groups,
        r = n._groups,
        i = e.length,
        o = r.length,
        s = Math.min(i, o),
        c = new Array(i),
        a = 0;
        a < s;
        ++a
    )
        for (
            var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, m = 0;
            m < h;
            ++m
        )
            (p = l[m] || u[m]) && (f[m] = p);
    for (; a < i; ++a) c[a] = e[a];
    return new E(c, this._parents);
}
function We() {
    for (var t = this._groups, n = -1, e = t.length; ++n < e;)
        for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0;)
            (s = r[i]) &&
                (o &&
                    s.compareDocumentPosition(o) ^ 4 &&
                    o.parentNode.insertBefore(s, o),
                    (o = s));
    return this;
}
function Ke(t) {
    t || (t = Ze);
    function n(h, f) {
        return h && f ? t(h.__data__, f.__data__) : !h - !f;
    }
    for (
        var e = this._groups, r = e.length, i = new Array(r), o = 0;
        o < r;
        ++o
    ) {
        for (
            var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
            u < c;
            ++u
        )
            (l = s[u]) && (a[u] = l);
        a.sort(n);
    }
    return new E(i, this._parents).order();
}
function Ze(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Qe() {
    var t = arguments[0];
    return ((arguments[0] = this), t.apply(null, arguments), this);
}
function Je() {
    return Array.from(this);
}
function je() {
    for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
            var s = r[i];
            if (s) return s;
        }
    return null;
}
function tr() {
    let t = 0;
    for (const n of this) ++t;
    return t;
}
function nr() {
    return !this.node();
}
function er(t) {
    for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
        for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
            (c = i[o]) && t.call(c, c.__data__, o, i);
    return this;
}
function rr(t) {
    return function () {
        this.removeAttribute(t);
    };
}
function ir(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local);
    };
}
function or(t, n) {
    return function () {
        this.setAttribute(t, n);
    };
}
function sr(t, n) {
    return function () {
        this.setAttributeNS(t.space, t.local, n);
    };
}
function cr(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
}
function ar(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
    };
}
function lr(t, n) {
    var e = Tt(t);
    if (arguments.length < 2) {
        var r = this.node();
        return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
    }
    return this.each(
        (n == null
            ? e.local
                ? ir
                : rr
            : typeof n == "function"
                ? e.local
                    ? ar
                    : cr
                : e.local
                    ? sr
                    : or)(e, n),
    );
}
function Hn(t) {
    return (
        (t.ownerDocument && t.ownerDocument.defaultView) ||
        (t.document && t) ||
        t.defaultView
    );
}
function ur(t) {
    return function () {
        this.style.removeProperty(t);
    };
}
function fr(t, n, e) {
    return function () {
        this.style.setProperty(t, n, e);
    };
}
function hr(t, n, e) {
    return function () {
        var r = n.apply(this, arguments);
        r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
    };
}
function dr(t, n, e) {
    return arguments.length > 1
        ? this.each(
            (n == null ? ur : typeof n == "function" ? hr : fr)(t, n, e ?? ""),
        )
        : J(this.node(), t);
}
function J(t, n) {
    return (
        t.style.getPropertyValue(n) ||
        Hn(t).getComputedStyle(t, null).getPropertyValue(n)
    );
}
function pr(t) {
    return function () {
        delete this[t];
    };
}
function gr(t, n) {
    return function () {
        this[t] = n;
    };
}
function mr(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        e == null ? delete this[t] : (this[t] = e);
    };
}
function _r(t, n) {
    return arguments.length > 1
        ? this.each((n == null ? pr : typeof n == "function" ? mr : gr)(t, n))
        : this.node()[t];
}
function Xn(t) {
    return t.trim().split(/^|\s+/);
}
function en(t) {
    return t.classList || new Fn(t);
}
function Fn(t) {
    ((this._node = t), (this._names = Xn(t.getAttribute("class") || "")));
}
Fn.prototype = {
    add: function (t) {
        var n = this._names.indexOf(t);
        n < 0 &&
            (this._names.push(t),
                this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (t) {
        var n = this._names.indexOf(t);
        n >= 0 &&
            (this._names.splice(n, 1),
                this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (t) {
        return this._names.indexOf(t) >= 0;
    },
};
function qn(t, n) {
    for (var e = en(t), r = -1, i = n.length; ++r < i;) e.add(n[r]);
}
function Yn(t, n) {
    for (var e = en(t), r = -1, i = n.length; ++r < i;) e.remove(n[r]);
}
function yr(t) {
    return function () {
        qn(this, t);
    };
}
function xr(t) {
    return function () {
        Yn(this, t);
    };
}
function vr(t, n) {
    return function () {
        (n.apply(this, arguments) ? qn : Yn)(this, t);
    };
}
function wr(t, n) {
    var e = Xn(t + "");
    if (arguments.length < 2) {
        for (var r = en(this.node()), i = -1, o = e.length; ++i < o;)
            if (!r.contains(e[i])) return !1;
        return !0;
    }
    return this.each((typeof n == "function" ? vr : n ? yr : xr)(e, n));
}
function br() {
    this.textContent = "";
}
function Er(t) {
    return function () {
        this.textContent = t;
    };
}
function $r(t) {
    return function () {
        var n = t.apply(this, arguments);
        this.textContent = n ?? "";
    };
}
function Cr(t) {
    return arguments.length
        ? this.each(t == null ? br : (typeof t == "function" ? $r : Er)(t))
        : this.node().textContent;
}
function Ir() {
    this.innerHTML = "";
}
function Nr(t) {
    return function () {
        this.innerHTML = t;
    };
}
function Pr(t) {
    return function () {
        var n = t.apply(this, arguments);
        this.innerHTML = n ?? "";
    };
}
function kr(t) {
    return arguments.length
        ? this.each(t == null ? Ir : (typeof t == "function" ? Pr : Nr)(t))
        : this.node().innerHTML;
}
function Ar() {
    this.nextSibling && this.parentNode.appendChild(this);
}
function Tr() {
    return this.each(Ar);
}
function Mr() {
    this.previousSibling &&
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sr() {
    return this.each(Mr);
}
function Br(t) {
    var n = typeof t == "function" ? t : Ln(t);
    return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
    });
}
function Lr() {
    return null;
}
function Rr(t, n) {
    var e = typeof t == "function" ? t : Ln(t),
        r = n == null ? Lr : typeof n == "function" ? n : nn(n);
    return this.select(function () {
        return this.insertBefore(
            e.apply(this, arguments),
            r.apply(this, arguments) || null,
        );
    });
}
function Or() {
    var t = this.parentNode;
    t && t.removeChild(this);
}
function Dr() {
    return this.each(Or);
}
function Gr() {
    var t = this.cloneNode(!1),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Hr() {
    var t = this.cloneNode(!0),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Xr(t) {
    return this.select(t ? Hr : Gr);
}
function Fr(t) {
    return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function qr(t) {
    return function (n) {
        t.call(this, n, this.__data__);
    };
}
function Yr(t) {
    return t
        .trim()
        .split(/^|\s+/)
        .map(function (n) {
            var e = "",
                r = n.indexOf(".");
            return (
                r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
                { type: n, name: e }
            );
        });
}
function Vr(t) {
    return function () {
        var n = this.__on;
        if (n) {
            for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
                ((o = n[e]),
                    (!t.type || o.type === t.type) && o.name === t.name
                        ? this.removeEventListener(o.type, o.listener, o.options)
                        : (n[++r] = o));
            ++r ? (n.length = r) : delete this.__on;
        }
    };
}
function zr(t, n, e) {
    return function () {
        var r = this.__on,
            i,
            o = qr(n);
        if (r) {
            for (var s = 0, c = r.length; s < c; ++s)
                if ((i = r[s]).type === t.type && i.name === t.name) {
                    (this.removeEventListener(i.type, i.listener, i.options),
                        this.addEventListener(i.type, (i.listener = o), (i.options = e)),
                        (i.value = n));
                    return;
                }
        }
        (this.addEventListener(t.type, o, e),
            (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
            r ? r.push(i) : (this.__on = [i]));
    };
}
function Ur(t, n, e) {
    var r = Yr(t + ""),
        i,
        o = r.length,
        s;
    if (arguments.length < 2) {
        var c = this.node().__on;
        if (c) {
            for (var a = 0, l = c.length, u; a < l; ++a)
                for (i = 0, u = c[a]; i < o; ++i)
                    if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
        }
        return;
    }
    for (c = n ? zr : Vr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
    return this;
}
function Vn(t, n, e) {
    var r = Hn(t),
        i = r.CustomEvent;
    (typeof i == "function"
        ? (i = new i(n, e))
        : ((i = r.document.createEvent("Event")),
            e
                ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
                : i.initEvent(n, !1, !1)),
        t.dispatchEvent(i));
}
function Wr(t, n) {
    return function () {
        return Vn(this, t, n);
    };
}
function Kr(t, n) {
    return function () {
        return Vn(this, t, n.apply(this, arguments));
    };
}
function Zr(t, n) {
    return this.each((typeof n == "function" ? Kr : Wr)(t, n));
}
function* Qr() {
    for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
            (s = r[i]) && (yield s);
}
var zn = [null];
function E(t, n) {
    ((this._groups = t), (this._parents = n));
}
function ut() {
    return new E([[document.documentElement]], zn);
}
function Jr() {
    return this;
}
E.prototype = ut.prototype = {
    constructor: E,
    select: $e,
    selectAll: Pe,
    selectChild: Me,
    selectChildren: Re,
    filter: Oe,
    data: qe,
    enter: De,
    exit: Ve,
    join: ze,
    merge: Ue,
    selection: Jr,
    order: We,
    sort: Ke,
    call: Qe,
    nodes: Je,
    node: je,
    size: tr,
    empty: nr,
    each: er,
    attr: lr,
    style: dr,
    property: _r,
    classed: wr,
    text: Cr,
    html: kr,
    raise: Tr,
    lower: Sr,
    append: Br,
    insert: Rr,
    remove: Dr,
    clone: Xr,
    datum: Fr,
    on: Ur,
    dispatch: Zr,
    [Symbol.iterator]: Qr,
};
function y(t) {
    return typeof t == "string"
        ? new E([[document.querySelector(t)]], [document.documentElement])
        : new E([[t]], zn);
}
function jr(t) {
    let n;
    for (; (n = t.sourceEvent);) t = n;
    return t;
}
function _n(t, n) {
    if (((t = jr(t)), n === void 0 && (n = t.currentTarget), n)) {
        var e = n.ownerSVGElement || n;
        if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            return (
                (r.x = t.clientX),
                (r.y = t.clientY),
                (r = r.matrixTransform(n.getScreenCTM().inverse())),
                [r.x, r.y]
            );
        }
        if (n.getBoundingClientRect) {
            var i = n.getBoundingClientRect();
            return [
                t.clientX - i.left - n.clientLeft,
                t.clientY - i.top - n.clientTop,
            ];
        }
    }
    return [t.pageX, t.pageY];
}
const ti = { passive: !1 },
    ot = { capture: !0, passive: !1 };
function Gt(t) {
    t.stopImmediatePropagation();
}
function Z(t) {
    (t.preventDefault(), t.stopImmediatePropagation());
}
function ni(t) {
    var n = t.document.documentElement,
        e = y(t).on("dragstart.drag", Z, ot);
    "onselectstart" in n
        ? e.on("selectstart.drag", Z, ot)
        : ((n.__noselect = n.style.MozUserSelect),
            (n.style.MozUserSelect = "none"));
}
function ei(t, n) {
    var e = t.document.documentElement,
        r = y(t).on("dragstart.drag", null);
    (n &&
        (r.on("click.drag", Z, ot),
            setTimeout(function () {
                r.on("click.drag", null);
            }, 0)),
        "onselectstart" in e
            ? r.on("selectstart.drag", null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect));
}
const dt = (t) => () => t;
function Vt(
    t,
    {
        sourceEvent: n,
        subject: e,
        target: r,
        identifier: i,
        active: o,
        x: s,
        y: c,
        dx: a,
        dy: l,
        dispatch: u,
    },
) {
    Object.defineProperties(this, {
        type: { value: t, enumerable: !0, configurable: !0 },
        sourceEvent: { value: n, enumerable: !0, configurable: !0 },
        subject: { value: e, enumerable: !0, configurable: !0 },
        target: { value: r, enumerable: !0, configurable: !0 },
        identifier: { value: i, enumerable: !0, configurable: !0 },
        active: { value: o, enumerable: !0, configurable: !0 },
        x: { value: s, enumerable: !0, configurable: !0 },
        y: { value: c, enumerable: !0, configurable: !0 },
        dx: { value: a, enumerable: !0, configurable: !0 },
        dy: { value: l, enumerable: !0, configurable: !0 },
        _: { value: u },
    });
}
Vt.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);
    return t === this._ ? this : t;
};
function ri(t) {
    return !t.ctrlKey && !t.button;
}
function ii() {
    return this.parentNode;
}
function oi(t, n) {
    return n ?? { x: t.x, y: t.y };
}
function si() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ci() {
    var t = ri,
        n = ii,
        e = oi,
        r = si,
        i = {},
        o = tn("start", "drag", "end"),
        s = 0,
        c,
        a,
        l,
        u,
        h = 0;
    function f(d) {
        d.on("mousedown.drag", p)
            .filter(r)
            .on("touchstart.drag", N)
            .on("touchmove.drag", U, ti)
            .on("touchend.drag touchcancel.drag", A)
            .style("touch-action", "none")
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function p(d, g) {
        if (!(u || !t.call(this, d, g))) {
            var x = T(this, n.call(this, d, g), d, g, "mouse");
            x &&
                (y(d.view).on("mousemove.drag", m, ot).on("mouseup.drag", _, ot),
                    ni(d.view),
                    Gt(d),
                    (l = !1),
                    (c = d.clientX),
                    (a = d.clientY),
                    x("start", d));
        }
    }
    function m(d) {
        if ((Z(d), !l)) {
            var g = d.clientX - c,
                x = d.clientY - a;
            l = g * g + x * x > h;
        }
        i.mouse("drag", d);
    }
    function _(d) {
        (y(d.view).on("mousemove.drag mouseup.drag", null),
            ei(d.view, l),
            Z(d),
            i.mouse("end", d));
    }
    function N(d, g) {
        if (t.call(this, d, g)) {
            var x = d.changedTouches,
                v = n.call(this, d, g),
                $ = x.length,
                G,
                W;
            for (G = 0; G < $; ++G)
                (W = T(this, v, d, g, x[G].identifier, x[G])) &&
                    (Gt(d), W("start", d, x[G]));
        }
    }
    function U(d) {
        var g = d.changedTouches,
            x = g.length,
            v,
            $;
        for (v = 0; v < x; ++v)
            ($ = i[g[v].identifier]) && (Z(d), $("drag", d, g[v]));
    }
    function A(d) {
        var g = d.changedTouches,
            x = g.length,
            v,
            $;
        for (
            u && clearTimeout(u),
            u = setTimeout(function () {
                u = null;
            }, 500),
            v = 0;
            v < x;
            ++v
        )
            ($ = i[g[v].identifier]) && (Gt(d), $("end", d, g[v]));
    }
    function T(d, g, x, v, $, G) {
        var W = o.copy(),
            M = _n(G || x, g),
            un,
            fn,
            ht;
        if (
            (ht = e.call(
                d,
                new Vt("beforestart", {
                    sourceEvent: x,
                    target: f,
                    identifier: $,
                    active: s,
                    x: M[0],
                    y: M[1],
                    dx: 0,
                    dy: 0,
                    dispatch: W,
                }),
                v,
            )) != null
        )
            return (
                (un = ht.x - M[0] || 0),
                (fn = ht.y - M[1] || 0),
                function pe(Ot, hn, ge) {
                    var dn = M,
                        Dt;
                    switch (Ot) {
                        case "start":
                            ((i[$] = pe), (Dt = s++));
                            break;
                        case "end":
                            (delete i[$], --s);
                        case "drag":
                            ((M = _n(ge || hn, g)), (Dt = s));
                            break;
                    }
                    W.call(
                        Ot,
                        d,
                        new Vt(Ot, {
                            sourceEvent: hn,
                            subject: ht,
                            target: f,
                            identifier: $,
                            active: Dt,
                            x: M[0] + un,
                            y: M[1] + fn,
                            dx: M[0] - dn[0],
                            dy: M[1] - dn[1],
                            dispatch: W,
                        }),
                        v,
                    );
                }
            );
    }
    return (
        (f.filter = function (d) {
            return arguments.length
                ? ((t = typeof d == "function" ? d : dt(!!d)), f)
                : t;
        }),
        (f.container = function (d) {
            return arguments.length
                ? ((n = typeof d == "function" ? d : dt(d)), f)
                : n;
        }),
        (f.subject = function (d) {
            return arguments.length
                ? ((e = typeof d == "function" ? d : dt(d)), f)
                : e;
        }),
        (f.touchable = function (d) {
            return arguments.length
                ? ((r = typeof d == "function" ? d : dt(!!d)), f)
                : r;
        }),
        (f.on = function () {
            var d = o.on.apply(o, arguments);
            return d === o ? f : d;
        }),
        (f.clickDistance = function (d) {
            return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
        }),
        f
    );
}
function rn(t, n, e) {
    ((t.prototype = n.prototype = e), (e.constructor = t));
}
function Un(t, n) {
    var e = Object.create(t.prototype);
    for (var r in n) e[r] = n[r];
    return e;
}
function ft() { }
var st = 0.7,
    $t = 1 / st,
    Q = "\\s*([+-]?\\d+)\\s*",
    ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    ai = /^#([0-9a-f]{3,8})$/,
    li = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`),
    ui = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
    fi = new RegExp(`^rgba\\(${Q},${Q},${Q},${ct}\\)$`),
    hi = new RegExp(`^rgba\\(${S},${S},${S},${ct}\\)$`),
    di = new RegExp(`^hsl\\(${ct},${S},${S}\\)$`),
    pi = new RegExp(`^hsla\\(${ct},${S},${S},${ct}\\)$`),
    yn = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074,
    };
rn(ft, at, {
    copy(t) {
        return Object.assign(new this.constructor(), this, t);
    },
    displayable() {
        return this.rgb().displayable();
    },
    hex: xn,
    formatHex: xn,
    formatHex8: gi,
    formatHsl: mi,
    formatRgb: vn,
    toString: vn,
});
function xn() {
    return this.rgb().formatHex();
}
function gi() {
    return this.rgb().formatHex8();
}
function mi() {
    return Wn(this).formatHsl();
}
function vn() {
    return this.rgb().formatRgb();
}
function at(t) {
    var n, e;
    return (
        (t = (t + "").trim().toLowerCase()),
        (n = ai.exec(t))
            ? ((e = n[1].length),
                (n = parseInt(n[1], 16)),
                e === 6
                    ? wn(n)
                    : e === 3
                        ? new b(
                            ((n >> 8) & 15) | ((n >> 4) & 240),
                            ((n >> 4) & 15) | (n & 240),
                            ((n & 15) << 4) | (n & 15),
                            1,
                        )
                        : e === 8
                            ? pt(
                                (n >> 24) & 255,
                                (n >> 16) & 255,
                                (n >> 8) & 255,
                                (n & 255) / 255,
                            )
                            : e === 4
                                ? pt(
                                    ((n >> 12) & 15) | ((n >> 8) & 240),
                                    ((n >> 8) & 15) | ((n >> 4) & 240),
                                    ((n >> 4) & 15) | (n & 240),
                                    (((n & 15) << 4) | (n & 15)) / 255,
                                )
                                : null)
            : (n = li.exec(t))
                ? new b(n[1], n[2], n[3], 1)
                : (n = ui.exec(t))
                    ? new b((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
                    : (n = fi.exec(t))
                        ? pt(n[1], n[2], n[3], n[4])
                        : (n = hi.exec(t))
                            ? pt(
                                (n[1] * 255) / 100,
                                (n[2] * 255) / 100,
                                (n[3] * 255) / 100,
                                n[4],
                            )
                            : (n = di.exec(t))
                                ? $n(n[1], n[2] / 100, n[3] / 100, 1)
                                : (n = pi.exec(t))
                                    ? $n(n[1], n[2] / 100, n[3] / 100, n[4])
                                    : yn.hasOwnProperty(t)
                                        ? wn(yn[t])
                                        : t === "transparent"
                                            ? new b(NaN, NaN, NaN, 0)
                                            : null
    );
}
function wn(t) {
    return new b((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function pt(t, n, e, r) {
    return (r <= 0 && (t = n = e = NaN), new b(t, n, e, r));
}
function _i(t) {
    return (
        t instanceof ft || (t = at(t)),
        t ? ((t = t.rgb()), new b(t.r, t.g, t.b, t.opacity)) : new b()
    );
}
function zt(t, n, e, r) {
    return arguments.length === 1 ? _i(t) : new b(t, n, e, r ?? 1);
}
function b(t, n, e, r) {
    ((this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r));
}
rn(
    b,
    zt,
    Un(ft, {
        brighter(t) {
            return (
                (t = t == null ? $t : Math.pow($t, t)),
                new b(this.r * t, this.g * t, this.b * t, this.opacity)
            );
        },
        darker(t) {
            return (
                (t = t == null ? st : Math.pow(st, t)),
                new b(this.r * t, this.g * t, this.b * t, this.opacity)
            );
        },
        rgb() {
            return this;
        },
        clamp() {
            return new b(Y(this.r), Y(this.g), Y(this.b), Ct(this.opacity));
        },
        displayable() {
            return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
            );
        },
        hex: bn,
        formatHex: bn,
        formatHex8: yi,
        formatRgb: En,
        toString: En,
    }),
);
function bn() {
    return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function yi() {
    return `#${q(this.r)}${q(this.g)}${q(this.b)}${q((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function En() {
    const t = Ct(this.opacity);
    return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Ct(t) {
    return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
    return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
    return ((t = Y(t)), (t < 16 ? "0" : "") + t.toString(16));
}
function $n(t, n, e, r) {
    return (
        r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
                ? (t = n = NaN)
                : n <= 0 && (t = NaN),
        new P(t, n, e, r)
    );
}
function Wn(t) {
    if (t instanceof P) return new P(t.h, t.s, t.l, t.opacity);
    if ((t instanceof ft || (t = at(t)), !t)) return new P();
    if (t instanceof P) return t;
    t = t.rgb();
    var n = t.r / 255,
        e = t.g / 255,
        r = t.b / 255,
        i = Math.min(n, e, r),
        o = Math.max(n, e, r),
        s = NaN,
        c = o - i,
        a = (o + i) / 2;
    return (
        c
            ? (n === o
                ? (s = (e - r) / c + (e < r) * 6)
                : e === o
                    ? (s = (r - n) / c + 2)
                    : (s = (n - e) / c + 4),
                (c /= a < 0.5 ? o + i : 2 - o - i),
                (s *= 60))
            : (c = a > 0 && a < 1 ? 0 : s),
        new P(s, c, a, t.opacity)
    );
}
function xi(t, n, e, r) {
    return arguments.length === 1 ? Wn(t) : new P(t, n, e, r ?? 1);
}
function P(t, n, e, r) {
    ((this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r));
}
rn(
    P,
    xi,
    Un(ft, {
        brighter(t) {
            return (
                (t = t == null ? $t : Math.pow($t, t)),
                new P(this.h, this.s, this.l * t, this.opacity)
            );
        },
        darker(t) {
            return (
                (t = t == null ? st : Math.pow(st, t)),
                new P(this.h, this.s, this.l * t, this.opacity)
            );
        },
        rgb() {
            var t = (this.h % 360) + (this.h < 0) * 360,
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
            return new b(
                Ht(t >= 240 ? t - 240 : t + 120, i, r),
                Ht(t, i, r),
                Ht(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity,
            );
        },
        clamp() {
            return new P(Cn(this.h), gt(this.s), gt(this.l), Ct(this.opacity));
        },
        displayable() {
            return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
            );
        },
        formatHsl() {
            const t = Ct(this.opacity);
            return `${t === 1 ? "hsl(" : "hsla("}${Cn(this.h)}, ${gt(this.s) * 100}%, ${gt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
        },
    }),
);
function Cn(t) {
    return ((t = (t || 0) % 360), t < 0 ? t + 360 : t);
}
function gt(t) {
    return Math.max(0, Math.min(1, t || 0));
}
function Ht(t, n, e) {
    return (
        (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
                ? e
                : t < 240
                    ? n + ((e - n) * (240 - t)) / 60
                    : n) * 255
    );
}
const Kn = (t) => () => t;
function vi(t, n) {
    return function (e) {
        return t + e * n;
    };
}
function wi(t, n, e) {
    return (
        (t = Math.pow(t, e)),
        (n = Math.pow(n, e) - t),
        (e = 1 / e),
        function (r) {
            return Math.pow(t + r * n, e);
        }
    );
}
function bi(t) {
    return (t = +t) == 1
        ? Zn
        : function (n, e) {
            return e - n ? wi(n, e, t) : Kn(isNaN(n) ? e : n);
        };
}
function Zn(t, n) {
    var e = n - t;
    return e ? vi(t, e) : Kn(isNaN(t) ? n : t);
}
const In = (function t(n) {
    var e = bi(n);
    function r(i, o) {
        var s = e((i = zt(i)).r, (o = zt(o)).r),
            c = e(i.g, o.g),
            a = e(i.b, o.b),
            l = Zn(i.opacity, o.opacity);
        return function (u) {
            return (
                (i.r = s(u)),
                (i.g = c(u)),
                (i.b = a(u)),
                (i.opacity = l(u)),
                i + ""
            );
        };
    }
    return ((r.gamma = t), r);
})(1);
function H(t, n) {
    return (
        (t = +t),
        (n = +n),
        function (e) {
            return t * (1 - e) + n * e;
        }
    );
}
var Ut = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    Xt = new RegExp(Ut.source, "g");
function Ei(t) {
    return function () {
        return t;
    };
}
function $i(t) {
    return function (n) {
        return t(n) + "";
    };
}
function Ci(t, n) {
    var e = (Ut.lastIndex = Xt.lastIndex = 0),
        r,
        i,
        o,
        s = -1,
        c = [],
        a = [];
    for (t = t + "", n = n + ""; (r = Ut.exec(t)) && (i = Xt.exec(n));)
        ((o = i.index) > e &&
            ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
            (r = r[0]) === (i = i[0])
                ? c[s]
                    ? (c[s] += i)
                    : (c[++s] = i)
                : ((c[++s] = null), a.push({ i: s, x: H(r, i) })),
            (e = Xt.lastIndex));
    return (
        e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
        c.length < 2
            ? a[0]
                ? $i(a[0].x)
                : Ei(n)
            : ((n = a.length),
                function (l) {
                    for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
                    return c.join("");
                })
    );
}
var Nn = 180 / Math.PI,
    Wt = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
    };
function Qn(t, n, e, r, i, o) {
    var s, c, a;
    return (
        (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
        (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
        (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
        t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
        {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * Nn,
            skewX: Math.atan(a) * Nn,
            scaleX: s,
            scaleY: c,
        }
    );
}
var mt;
function Ii(t) {
    const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
        t + "",
    );
    return n.isIdentity ? Wt : Qn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ni(t) {
    return t == null ||
        (mt || (mt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            mt.setAttribute("transform", t),
            !(t = mt.transform.baseVal.consolidate()))
        ? Wt
        : ((t = t.matrix), Qn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Jn(t, n, e, r) {
    function i(l) {
        return l.length ? l.pop() + " " : "";
    }
    function o(l, u, h, f, p, m) {
        if (l !== h || u !== f) {
            var _ = p.push("translate(", null, n, null, e);
            m.push({ i: _ - 4, x: H(l, h) }, { i: _ - 2, x: H(u, f) });
        } else (h || f) && p.push("translate(" + h + n + f + e);
    }
    function s(l, u, h, f) {
        l !== u
            ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
                f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(l, u) }))
            : u && h.push(i(h) + "rotate(" + u + r);
    }
    function c(l, u, h, f) {
        l !== u
            ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(l, u) })
            : u && h.push(i(h) + "skewX(" + u + r);
    }
    function a(l, u, h, f, p, m) {
        if (l !== h || u !== f) {
            var _ = p.push(i(p) + "scale(", null, ",", null, ")");
            m.push({ i: _ - 4, x: H(l, h) }, { i: _ - 2, x: H(u, f) });
        } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
    }
    return function (l, u) {
        var h = [],
            f = [];
        return (
            (l = t(l)),
            (u = t(u)),
            o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
            s(l.rotate, u.rotate, h, f),
            c(l.skewX, u.skewX, h, f),
            a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
            (l = u = null),
            function (p) {
                for (var m = -1, _ = f.length, N; ++m < _;) h[(N = f[m]).i] = N.x(p);
                return h.join("");
            }
        );
    };
}
var Pi = Jn(Ii, "px, ", "px)", "deg)"),
    ki = Jn(Ni, ", ", ")", ")"),
    j = 0,
    nt = 0,
    tt = 0,
    jn = 1e3,
    It,
    et,
    Nt = 0,
    V = 0,
    Mt = 0,
    lt = typeof performance == "object" && performance.now ? performance : Date,
    te =
        typeof window == "object" && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
            };
function on() {
    return V || (te(Ai), (V = lt.now() + Mt));
}
function Ai() {
    V = 0;
}
function Pt() {
    this._call = this._time = this._next = null;
}
Pt.prototype = ne.prototype = {
    constructor: Pt,
    restart: function (t, n, e) {
        if (typeof t != "function")
            throw new TypeError("callback is not a function");
        ((e = (e == null ? on() : +e) + (n == null ? 0 : +n)),
            !this._next &&
            et !== this &&
            (et ? (et._next = this) : (It = this), (et = this)),
            (this._call = t),
            (this._time = e),
            Kt());
    },
    stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Kt());
    },
};
function ne(t, n, e) {
    var r = new Pt();
    return (r.restart(t, n, e), r);
}
function Ti() {
    (on(), ++j);
    for (var t = It, n; t;)
        ((n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next));
    --j;
}
function Pn() {
    ((V = (Nt = lt.now()) + Mt), (j = nt = 0));
    try {
        Ti();
    } finally {
        ((j = 0), Si(), (V = 0));
    }
}
function Mi() {
    var t = lt.now(),
        n = t - Nt;
    n > jn && ((Mt -= n), (Nt = t));
}
function Si() {
    for (var t, n = It, e, r = 1 / 0; n;)
        n._call
            ? (r > n._time && (r = n._time), (t = n), (n = n._next))
            : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (It = e)));
    ((et = t), Kt(r));
}
function Kt(t) {
    if (!j) {
        nt && (nt = clearTimeout(nt));
        var n = t - V;
        n > 24
            ? (t < 1 / 0 && (nt = setTimeout(Pn, t - lt.now() - Mt)),
                tt && (tt = clearInterval(tt)))
            : (tt || ((Nt = lt.now()), (tt = setInterval(Mi, jn))), (j = 1), te(Pn));
    }
}
function kn(t, n, e) {
    var r = new Pt();
    return (
        (n = n == null ? 0 : +n),
        r.restart(
            (i) => {
                (r.stop(), t(i + n));
            },
            n,
            e,
        ),
        r
    );
}
var Bi = tn("start", "end", "cancel", "interrupt"),
    Li = [],
    ee = 0,
    An = 1,
    Zt = 2,
    wt = 3,
    Tn = 4,
    Qt = 5,
    bt = 6;
function St(t, n, e, r, i, o) {
    var s = t.__transition;
    if (!s) t.__transition = {};
    else if (e in s) return;
    Ri(t, e, {
        name: n,
        index: r,
        group: i,
        on: Bi,
        tween: Li,
        time: o.time,
        delay: o.delay,
        duration: o.duration,
        ease: o.ease,
        timer: null,
        state: ee,
    });
}
function sn(t, n) {
    var e = k(t, n);
    if (e.state > ee) throw new Error("too late; already scheduled");
    return e;
}
function B(t, n) {
    var e = k(t, n);
    if (e.state > wt) throw new Error("too late; already running");
    return e;
}
function k(t, n) {
    var e = t.__transition;
    if (!e || !(e = e[n])) throw new Error("transition not found");
    return e;
}
function Ri(t, n, e) {
    var r = t.__transition,
        i;
    ((r[n] = e), (e.timer = ne(o, 0, e.time)));
    function o(l) {
        ((e.state = An),
            e.timer.restart(s, e.delay, e.time),
            e.delay <= l && s(l - e.delay));
    }
    function s(l) {
        var u, h, f, p;
        if (e.state !== An) return a();
        for (u in r)
            if (((p = r[u]), p.name === e.name)) {
                if (p.state === wt) return kn(s);
                p.state === Tn
                    ? ((p.state = bt),
                        p.timer.stop(),
                        p.on.call("interrupt", t, t.__data__, p.index, p.group),
                        delete r[u])
                    : +u < n &&
                    ((p.state = bt),
                        p.timer.stop(),
                        p.on.call("cancel", t, t.__data__, p.index, p.group),
                        delete r[u]);
            }
        if (
            (kn(function () {
                e.state === wt &&
                    ((e.state = Tn), e.timer.restart(c, e.delay, e.time), c(l));
            }),
                (e.state = Zt),
                e.on.call("start", t, t.__data__, e.index, e.group),
                e.state === Zt)
        ) {
            for (
                e.state = wt, i = new Array((f = e.tween.length)), u = 0, h = -1;
                u < f;
                ++u
            )
                (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
                    (i[++h] = p);
            i.length = h + 1;
        }
    }
    function c(l) {
        for (
            var u =
                l < e.duration
                    ? e.ease.call(null, l / e.duration)
                    : (e.timer.restart(a), (e.state = Qt), 1),
            h = -1,
            f = i.length;
            ++h < f;
        )
            i[h].call(t, u);
        e.state === Qt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
    }
    function a() {
        ((e.state = bt), e.timer.stop(), delete r[n]);
        for (var l in r) return;
        delete t.__transition;
    }
}
function Oi(t, n) {
    var e = t.__transition,
        r,
        i,
        o = !0,
        s;
    if (e) {
        n = n == null ? null : n + "";
        for (s in e) {
            if ((r = e[s]).name !== n) {
                o = !1;
                continue;
            }
            ((i = r.state > Zt && r.state < Qt),
                (r.state = bt),
                r.timer.stop(),
                r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
                delete e[s]);
        }
        o && delete t.__transition;
    }
}
function Di(t) {
    return this.each(function () {
        Oi(this, t);
    });
}
function Gi(t, n) {
    var e, r;
    return function () {
        var i = B(this, t),
            o = i.tween;
        if (o !== e) {
            r = e = o;
            for (var s = 0, c = r.length; s < c; ++s)
                if (r[s].name === n) {
                    ((r = r.slice()), r.splice(s, 1));
                    break;
                }
        }
        i.tween = r;
    };
}
function Hi(t, n, e) {
    var r, i;
    if (typeof e != "function") throw new Error();
    return function () {
        var o = B(this, t),
            s = o.tween;
        if (s !== r) {
            i = (r = s).slice();
            for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
                if (i[a].name === n) {
                    i[a] = c;
                    break;
                }
            a === l && i.push(c);
        }
        o.tween = i;
    };
}
function Xi(t, n) {
    var e = this._id;
    if (((t += ""), arguments.length < 2)) {
        for (var r = k(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
            if ((s = r[i]).name === t) return s.value;
        return null;
    }
    return this.each((n == null ? Gi : Hi)(e, t, n));
}
function cn(t, n, e) {
    var r = t._id;
    return (
        t.each(function () {
            var i = B(this, r);
            (i.value || (i.value = {}))[n] = e.apply(this, arguments);
        }),
        function (i) {
            return k(i, r).value[n];
        }
    );
}
function re(t, n) {
    var e;
    return (
        typeof n == "number"
            ? H
            : n instanceof at
                ? In
                : (e = at(n))
                    ? ((n = e), In)
                    : Ci
    )(t, n);
}
function Fi(t) {
    return function () {
        this.removeAttribute(t);
    };
}
function qi(t) {
    return function () {
        this.removeAttributeNS(t.space, t.local);
    };
}
function Yi(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = this.getAttribute(t);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function Vi(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = this.getAttributeNS(t.space, t.local);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function zi(t, n, e) {
    var r, i, o;
    return function () {
        var s,
            c = e(this),
            a;
        return c == null
            ? void this.removeAttribute(t)
            : ((s = this.getAttribute(t)),
                (a = c + ""),
                s === a
                    ? null
                    : s === r && a === i
                        ? o
                        : ((i = a), (o = n((r = s), c))));
    };
}
function Ui(t, n, e) {
    var r, i, o;
    return function () {
        var s,
            c = e(this),
            a;
        return c == null
            ? void this.removeAttributeNS(t.space, t.local)
            : ((s = this.getAttributeNS(t.space, t.local)),
                (a = c + ""),
                s === a
                    ? null
                    : s === r && a === i
                        ? o
                        : ((i = a), (o = n((r = s), c))));
    };
}
function Wi(t, n) {
    var e = Tt(t),
        r = e === "transform" ? ki : re;
    return this.attrTween(
        t,
        typeof n == "function"
            ? (e.local ? Ui : zi)(e, r, cn(this, "attr." + t, n))
            : n == null
                ? (e.local ? qi : Fi)(e)
                : (e.local ? Vi : Yi)(e, r, n),
    );
}
function Ki(t, n) {
    return function (e) {
        this.setAttribute(t, n.call(this, e));
    };
}
function Zi(t, n) {
    return function (e) {
        this.setAttributeNS(t.space, t.local, n.call(this, e));
    };
}
function Qi(t, n) {
    var e, r;
    function i() {
        var o = n.apply(this, arguments);
        return (o !== r && (e = (r = o) && Zi(t, o)), e);
    }
    return ((i._value = n), i);
}
function Ji(t, n) {
    var e, r;
    function i() {
        var o = n.apply(this, arguments);
        return (o !== r && (e = (r = o) && Ki(t, o)), e);
    }
    return ((i._value = n), i);
}
function ji(t, n) {
    var e = "attr." + t;
    if (arguments.length < 2) return (e = this.tween(e)) && e._value;
    if (n == null) return this.tween(e, null);
    if (typeof n != "function") throw new Error();
    var r = Tt(t);
    return this.tween(e, (r.local ? Qi : Ji)(r, n));
}
function to(t, n) {
    return function () {
        sn(this, t).delay = +n.apply(this, arguments);
    };
}
function no(t, n) {
    return (
        (n = +n),
        function () {
            sn(this, t).delay = n;
        }
    );
}
function eo(t) {
    var n = this._id;
    return arguments.length
        ? this.each((typeof t == "function" ? to : no)(n, t))
        : k(this.node(), n).delay;
}
function ro(t, n) {
    return function () {
        B(this, t).duration = +n.apply(this, arguments);
    };
}
function io(t, n) {
    return (
        (n = +n),
        function () {
            B(this, t).duration = n;
        }
    );
}
function oo(t) {
    var n = this._id;
    return arguments.length
        ? this.each((typeof t == "function" ? ro : io)(n, t))
        : k(this.node(), n).duration;
}
function so(t, n) {
    if (typeof n != "function") throw new Error();
    return function () {
        B(this, t).ease = n;
    };
}
function co(t) {
    var n = this._id;
    return arguments.length ? this.each(so(n, t)) : k(this.node(), n).ease;
}
function ao(t, n) {
    return function () {
        var e = n.apply(this, arguments);
        if (typeof e != "function") throw new Error();
        B(this, t).ease = e;
    };
}
function lo(t) {
    if (typeof t != "function") throw new Error();
    return this.each(ao(this._id, t));
}
function uo(t) {
    typeof t != "function" && (t = On(t));
    for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
        for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
            (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
    return new D(r, this._parents, this._name, this._id);
}
function fo(t) {
    if (t._id !== this._id) throw new Error();
    for (
        var n = this._groups,
        e = t._groups,
        r = n.length,
        i = e.length,
        o = Math.min(r, i),
        s = new Array(r),
        c = 0;
        c < o;
        ++c
    )
        for (
            var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
            p < u;
            ++p
        )
            (f = a[p] || l[p]) && (h[p] = f);
    for (; c < r; ++c) s[c] = n[c];
    return new D(s, this._parents, this._name, this._id);
}
function ho(t) {
    return (t + "")
        .trim()
        .split(/^|\s+/)
        .every(function (n) {
            var e = n.indexOf(".");
            return (e >= 0 && (n = n.slice(0, e)), !n || n === "start");
        });
}
function po(t, n, e) {
    var r,
        i,
        o = ho(n) ? sn : B;
    return function () {
        var s = o(this, t),
            c = s.on;
        (c !== r && (i = (r = c).copy()).on(n, e), (s.on = i));
    };
}
function go(t, n) {
    var e = this._id;
    return arguments.length < 2
        ? k(this.node(), e).on.on(t)
        : this.each(po(e, t, n));
}
function mo(t) {
    return function () {
        var n = this.parentNode;
        for (var e in this.__transition) if (+e !== t) return;
        n && n.removeChild(this);
    };
}
function _o() {
    return this.on("end.remove", mo(this._id));
}
function yo(t) {
    var n = this._name,
        e = this._id;
    typeof t != "function" && (t = nn(t));
    for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
        for (
            var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
            f < a;
            ++f
        )
            (u = c[f]) &&
                (h = t.call(u, u.__data__, f, c)) &&
                ("__data__" in u && (h.__data__ = u.__data__),
                    (l[f] = h),
                    St(l[f], n, e, f, l, k(u, e)));
    return new D(o, this._parents, n, e);
}
function xo(t) {
    var n = this._name,
        e = this._id;
    typeof t != "function" && (t = Rn(t));
    for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
        for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
            if ((u = a[h])) {
                for (
                    var f = t.call(u, u.__data__, h, a),
                    p,
                    m = k(u, e),
                    _ = 0,
                    N = f.length;
                    _ < N;
                    ++_
                )
                    (p = f[_]) && St(p, n, e, _, f, m);
                (o.push(f), s.push(u));
            }
    return new D(o, s, n, e);
}
var vo = ut.prototype.constructor;
function wo() {
    return new vo(this._groups, this._parents);
}
function bo(t, n) {
    var e, r, i;
    return function () {
        var o = J(this, t),
            s = (this.style.removeProperty(t), J(this, t));
        return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
    };
}
function ie(t) {
    return function () {
        this.style.removeProperty(t);
    };
}
function Eo(t, n, e) {
    var r,
        i = e + "",
        o;
    return function () {
        var s = J(this, t);
        return s === i ? null : s === r ? o : (o = n((r = s), e));
    };
}
function $o(t, n, e) {
    var r, i, o;
    return function () {
        var s = J(this, t),
            c = e(this),
            a = c + "";
        return (
            c == null && (a = c = (this.style.removeProperty(t), J(this, t))),
            s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
        );
    };
}
function Co(t, n) {
    var e,
        r,
        i,
        o = "style." + n,
        s = "end." + o,
        c;
    return function () {
        var a = B(this, t),
            l = a.on,
            u = a.value[o] == null ? c || (c = ie(n)) : void 0;
        ((l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r));
    };
}
function Io(t, n, e) {
    var r = (t += "") == "transform" ? Pi : re;
    return n == null
        ? this.styleTween(t, bo(t, r)).on("end.style." + t, ie(t))
        : typeof n == "function"
            ? this.styleTween(t, $o(t, r, cn(this, "style." + t, n))).each(
                Co(this._id, t),
            )
            : this.styleTween(t, Eo(t, r, n), e).on("end.style." + t, null);
}
function No(t, n, e) {
    return function (r) {
        this.style.setProperty(t, n.call(this, r), e);
    };
}
function Po(t, n, e) {
    var r, i;
    function o() {
        var s = n.apply(this, arguments);
        return (s !== i && (r = (i = s) && No(t, s, e)), r);
    }
    return ((o._value = n), o);
}
function ko(t, n, e) {
    var r = "style." + (t += "");
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (n == null) return this.tween(r, null);
    if (typeof n != "function") throw new Error();
    return this.tween(r, Po(t, n, e ?? ""));
}
function Ao(t) {
    return function () {
        this.textContent = t;
    };
}
function To(t) {
    return function () {
        var n = t(this);
        this.textContent = n ?? "";
    };
}
function Mo(t) {
    return this.tween(
        "text",
        typeof t == "function"
            ? To(cn(this, "text", t))
            : Ao(t == null ? "" : t + ""),
    );
}
function So(t) {
    return function (n) {
        this.textContent = t.call(this, n);
    };
}
function Bo(t) {
    var n, e;
    function r() {
        var i = t.apply(this, arguments);
        return (i !== e && (n = (e = i) && So(i)), n);
    }
    return ((r._value = t), r);
}
function Lo(t) {
    var n = "text";
    if (arguments.length < 1) return (n = this.tween(n)) && n._value;
    if (t == null) return this.tween(n, null);
    if (typeof t != "function") throw new Error();
    return this.tween(n, Bo(t));
}
function Ro() {
    for (
        var t = this._name,
        n = this._id,
        e = oe(),
        r = this._groups,
        i = r.length,
        o = 0;
        o < i;
        ++o
    )
        for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
            if ((a = s[l])) {
                var u = k(a, n);
                St(a, t, e, l, s, {
                    time: u.time + u.delay + u.duration,
                    delay: 0,
                    duration: u.duration,
                    ease: u.ease,
                });
            }
    return new D(r, this._parents, t, e);
}
function Oo() {
    var t,
        n,
        e = this,
        r = e._id,
        i = e.size();
    return new Promise(function (o, s) {
        var c = { value: s },
            a = {
                value: function () {
                    --i === 0 && o();
                },
            };
        (e.each(function () {
            var l = B(this, r),
                u = l.on;
            (u !== t &&
                ((n = (t = u).copy()),
                    n._.cancel.push(c),
                    n._.interrupt.push(c),
                    n._.end.push(a)),
                (l.on = n));
        }),
            i === 0 && o());
    });
}
var Do = 0;
function D(t, n, e, r) {
    ((this._groups = t), (this._parents = n), (this._name = e), (this._id = r));
}
function oe() {
    return ++Do;
}
var L = ut.prototype;
D.prototype = {
    constructor: D,
    select: yo,
    selectAll: xo,
    selectChild: L.selectChild,
    selectChildren: L.selectChildren,
    filter: uo,
    merge: fo,
    selection: wo,
    transition: Ro,
    call: L.call,
    nodes: L.nodes,
    node: L.node,
    size: L.size,
    empty: L.empty,
    each: L.each,
    on: go,
    attr: Wi,
    attrTween: ji,
    style: Io,
    styleTween: ko,
    text: Mo,
    textTween: Lo,
    remove: _o,
    tween: Xi,
    delay: eo,
    duration: oo,
    ease: co,
    easeVarying: lo,
    end: Oo,
    [Symbol.iterator]: L[Symbol.iterator],
};
function Go(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ho = { time: null, delay: 0, duration: 250, ease: Go };
function Xo(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]);)
        if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
    return e;
}
function Fo(t) {
    var n, e;
    t instanceof D
        ? ((n = t._id), (t = t._name))
        : ((n = oe()), ((e = Ho).time = on()), (t = t == null ? null : t + ""));
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
            (a = s[l]) && St(a, t, n, l, s, e || Xo(a, n));
    return new D(r, this._parents, t, n);
}
ut.prototype.interrupt = Di;
ut.prototype.transition = Fo;
const Jt = Math.PI,
    jt = 2 * Jt,
    F = 1e-6,
    qo = jt - F;
function se(t) {
    this._ += t[0];
    for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Yo(t) {
    let n = Math.floor(t);
    if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
    if (n > 15) return se;
    const e = 10 ** n;
    return function (r) {
        this._ += r[0];
        for (let i = 1, o = r.length; i < o; ++i)
            this._ += Math.round(arguments[i] * e) / e + r[i];
    };
}
class Vo {
    constructor(n) {
        ((this._x0 = this._y0 = this._x1 = this._y1 = null),
            (this._ = ""),
            (this._append = n == null ? se : Yo(n)));
    }
    moveTo(n, e) {
        this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
    }
    closePath() {
        this._x1 !== null &&
            ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
    }
    lineTo(n, e) {
        this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
    }
    quadraticCurveTo(n, e, r, i) {
        this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
    }
    bezierCurveTo(n, e, r, i, o, s) {
        this
            ._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 = +s)}`;
    }
    arcTo(n, e, r, i, o) {
        if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
            throw new Error(`negative radius: ${o}`);
        let s = this._x1,
            c = this._y1,
            a = r - n,
            l = i - e,
            u = s - n,
            h = c - e,
            f = u * u + h * h;
        if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
        else if (f > F)
            if (!(Math.abs(h * a - l * u) > F) || !o)
                this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
            else {
                let p = r - s,
                    m = i - c,
                    _ = a * a + l * l,
                    N = p * p + m * m,
                    U = Math.sqrt(_),
                    A = Math.sqrt(f),
                    T = o * Math.tan((Jt - Math.acos((_ + f - N) / (2 * U * A))) / 2),
                    d = T / A,
                    g = T / U;
                (Math.abs(d - 1) > F && this._append`L${n + d * u},${e + d * h}`,
                    this
                        ._append`A${o},${o},0,0,${+(h * p > u * m)},${(this._x1 = n + g * a)},${(this._y1 = e + g * l)}`);
            }
    }
    arc(n, e, r, i, o, s) {
        if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
            throw new Error(`negative radius: ${r}`);
        let c = r * Math.cos(i),
            a = r * Math.sin(i),
            l = n + c,
            u = e + a,
            h = 1 ^ s,
            f = s ? i - o : o - i;
        (this._x1 === null
            ? this._append`M${l},${u}`
            : (Math.abs(this._x1 - l) > F || Math.abs(this._y1 - u) > F) &&
            this._append`L${l},${u}`,
            r &&
            (f < 0 && (f = (f % jt) + jt),
                f > qo
                    ? this
                        ._append`A${r},${r},0,1,${h},${n - c},${e - a}A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
                    : f > F &&
                    this
                        ._append`A${r},${r},0,${+(f >= Jt)},${h},${(this._x1 = n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`));
    }
    rect(n, e, r, i) {
        this
            ._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}h${(r = +r)}v${+i}h${-r}Z`;
    }
    toString() {
        return this._;
    }
}
function zo(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    return t.text();
}
function Uo(t, n) {
    return fetch(t, n).then(zo);
}
function Wo(t) {
    return (n, e) => Uo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Ko = Wo("application/xml");
function rt(t, n, e) {
    ((this.k = t), (this.x = n), (this.y = e));
}
rt.prototype = {
    constructor: rt,
    scale: function (t) {
        return t === 1 ? this : new rt(this.k * t, this.x, this.y);
    },
    translate: function (t, n) {
        return (t === 0) & (n === 0)
            ? this
            : new rt(this.k, this.x + this.k * t, this.y + this.k * n);
    },
    apply: function (t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y];
    },
    applyX: function (t) {
        return t * this.k + this.x;
    },
    applyY: function (t) {
        return t * this.k + this.y;
    },
    invert: function (t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
    },
    invertX: function (t) {
        return (t - this.x) / this.k;
    },
    invertY: function (t) {
        return (t - this.y) / this.k;
    },
    rescaleX: function (t) {
        return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
    },
    rescaleY: function (t) {
        return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
    },
    toString: function () {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    },
};
rt.prototype;
class Bt {
    constructor(n, e, r, i, o, s, c) {
        pn(this, "dragged", (n) => {
            this.sensor.attr(
                "transform",
                "translate(" +
                [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
                ") scale(" +
                this.scale +
                ")",
            );
        });
        ((this.id = n),
            (this.svgContainer = e),
            (this.url = r),
            this.sensor,
            (this.scale = i),
            (this.offsetX = s),
            (this.offsetY = c),
            (this.movable = o),
            console.log("Component created: " + this.id),
            console.log("url: " + this.url),
            console.log("scale: " + this.scale));
    }
    async load() {
        if (y("#" + this.id).node() != null) return;
        const n = await Ko(this.url);
        ((this.sensor = this.svgContainer
            .append("g")
            .attr(
                "transform",
                "translate(" +
                [this.offsetX, this.offsetY] +
                ") scale(" +
                this.scale +
                ")",
            )
            .attr("id", this.id)),
            this.sensor.node().append(y(n.documentElement).node()),
            this.movable &&
            this.sensor.call(
                ci()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended),
            ));
    }
    dragstarted(n) {
        y(this).raise().classed("active", !0);
    }
    dragended(n) {
        y(this).classed("active", !1);
    }
}
const z = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
],
    X = {
        "connector0pin-0": "3.3v",
        "connector1pin-1": "GPIO 2",
        "connector2pin-3": "GPIO 3",
        "connector3pin-7": "GPIO 4",
        "connector4pin-4": "GND",
        "connector5pin-1": "GPIO 17",
        "connector6pin-1": "GPIO 27",
        "connector7pin-3": "GPIO 22",
        "connector8pin-0": "3.3v",
        "connector9pin-3": "GPIO 10",
        "connector10pin-2": "GPIO 9",
        "connector11pin-1": "GPIO 11",
        "connector12pin-7": "GND",
        "connector13pin-5": "RESERVED",
        "connector14pin-6": "GPIO 5",
        "connector15pin-5": "GPIO 6",
        "connector16pin-4": "GPIO 13",
        "connector17pin-2": "GPIO 19",
        "connector18pin-2": "GPIO 26",
        "connector19pin-1": "GND",
        "connector20pin-7": "GPIO 21",
        "connector21pin-2": "GPIO 20",
        "connector22pin-4": "GPIO 16",
        "connector23pin-1": "GND",
        "connector24pin-6": "GPIO 12",
        "connector25pin-5": "GND",
        "connector26pin-7": "RESERVED",
        "connector27pin-8": "GPIO 7",
        "connector28pin-5": "GPIO 8",
        "connector29pin-9": "GPIO 25",
        "connector30pin-2": "GND",
        "connector31pin-7": "GPIO 24",
        "connector32pin-3": "GPIO 23",
        "connector33pin-6": "GND",
        "connector34pin-4": "GPIO 18",
        "connector35pin-7": "UART 0 RX",
        "connector36pin-9": "UART 0 TX",
        "connector37pin-7": "GND",
        "connector38pin-2": "5V PWR",
        "connector39pin-2": "5V PWR",
        "_x30_.1.0.220.2.3-0": "HDMI",
        "_x30_.1.0.221.0.5.13-6": "Power",
        "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
        "_x30_.1.0.224.0.10-7": "USB 0",
        "_x30_.1.0.224.0.10_1_-3": "USB 1",
        "_x30_.1.0.226.0.1": "CSI Camera",
        "_x30_.1.0.227.1": "DSI Display",
    },
    ce = ["path26583", "path26585"],
    _t = { path26583: "+ve Terminal of LED", path26585: "-ve Terminal of LED" },
    Zo = ["res_1", "res_2"],
    yt = { res_1: "Resister", res_2: "Resister" },
    ae = ["pin1", "pin2", "pin3", "pin4"],
    xt = {
        pin1: "Push-Button",
        pin2: "Push-Button",
        pin3: "Push-Button",
        pin4: "Push-Button",
    };
class Qo {
    constructor(n) {
        ((this.logLocationId = n), (this.connections = []));
    }
    addConnection(n) {
        (this.connections.push(n), this.logConnectionsToHtml());
    }
    undoLastConnection() {
        if (this.connections.length) {
            const n = this.connections.pop(),
                e = document.getElementById(this.logLocationId),
                r = e.lastChild;
            (e.removeChild(r),
                this.logConnectionsToHtml(),
                console.log("Removed connection:", n));
        } else console.warn("No more connections to undo");
    }
    logConnectionsToHtml() {
        if (this.connections.length % 2 == 0) {
            let n = document.createElement("li");
            const e = X[this.connections[this.connections.length - 2].connector]
                ? `${X[this.connections[this.connections.length - 2].connector]} pin of Raspberry Pi`
                : _t[this.connections[this.connections.length - 2].connector]
                    ? _t[this.connections[this.connections.length - 2].connector]
                    : yt[this.connections[this.connections.length - 2].connector]
                        ? yt[this.connections[this.connections.length - 2].connector]
                        : xt[this.connections[this.connections.length - 2].connector]
                            ? xt[this.connections[this.connections.length - 2].connector]
                            : this.connections[this.connections.length - 2].connector,
                r = X[this.connections[this.connections.length - 1].connector]
                    ? `${X[this.connections[this.connections.length - 1].connector]} pin of Raspberry Pi`
                    : _t[this.connections[this.connections.length - 1].connector]
                        ? _t[this.connections[this.connections.length - 1].connector]
                        : yt[this.connections[this.connections.length - 1].connector]
                            ? yt[this.connections[this.connections.length - 1].connector]
                            : xt[this.connections[this.connections.length - 1].connector]
                                ? xt[this.connections[this.connections.length - 1].connector]
                                : this.connections[this.connections.length - 1].connector;
            ((n.innerHTML = `Connection no. ${this.connections.length / 2} : ${e} to ${r}`),
                document.getElementById(this.logLocationId).appendChild(n));
            return;
        }
    }
    getConnectionLog() {
        return this.connections;
    }
}
class Jo {
    constructor(n, e, r, i) {
        ((this.id = n),
            (this.headingId = e),
            (this.textId = r),
            (this.closeButtonId = i),
            document
                .getElementById(this.closeButtonId)
                .addEventListener("click", () => {
                    document.getElementById(this.id).style.display = "none";
                }));
    }
    throw(n, e) {
        ((document.getElementById(this.id).style.display = "flex"),
            (document.getElementById(this.headingId).innerHTML = n),
            (document.getElementById(this.textId).innerHTML = e));
    }
}
const jo = (t, n) => {
    if (t.length == 0) return { error: "No connection found" };
    const e = [
        "GPIO",
        "GND",
        "res_1",
        "res_2",
        "path26583",
        "path26585",
        ["pin1", "pin2"],
        ["pin3", "pin4"],
    ];
    let r = 0;
    return (
        t.forEach((i) => {
            var o;
            if (
                (e.forEach((s) => {
                    if (
                        Array.isArray(s)
                            ? s.find((c) => c == i.connector)
                            : s == i.connector
                    ) {
                        r++;
                        return;
                    }
                }),
                    X[i.connector] == "GND")
            ) {
                r++;
                return;
            }
            if (
                e.find(
                    (s) =>
                        s + "1" == i.connector ||
                        s + "2" == i.connector ||
                        s + "3" == i.connector ||
                        s + "4" == i.connector,
                )
            ) {
                r++;
                return;
            }
            if (
                (o = X[i.connector]) != null &&
                o.includes("GPIO") &&
                X[i.connector].includes(document.querySelector("#ledPin").value)
            ) {
                r++;
                return;
            }
        }),
        n ? (console.log(r), r == 9) : { error: "Button is not pushed" }
    );
},
    kt = document.getElementById("svg"),
    ts = kt.clientWidth,
    ns = window.innerHeight - kt.getBoundingClientRect().top,
    w = y("#svg")
        .append("svg")
        .attr("id", "svgContainer")
        .attr("viewBox", `0 0 ${ts} ${ns}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "100%"),
    es = (t) => {
        const n = document.getElementById("svgContainer"),
            e = n.createSVGPoint();
        return (
            (e.x = t.clientX),
            (e.y = t.clientY),
            e.matrixTransform(n.getScreenCTM().inverse())
        );
    };
window.addEventListener("resize", () => {
    const t = kt.clientWidth,
        n = window.innerHeight - kt.getBoundingClientRect().top;
    w.attr("viewBox", `0 0 ${t} ${n}`);
});
const Mn = (t, n, e) => {
    w.append("circle")
        .attr("cx", t)
        .attr("cy", n)
        .attr("r", 3)
        .attr("fill", "black")
        .attr("id", e);
},
    Sn = (t, n) => {
        an.append("path")
            .attr("d", t)
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("fill", "none")
            .attr("id", n);
    },
    rs = window.innerWidth < 850,
    Bn = {
        desktop: {
            raspberry: { scale: 1.3, x: 0, y: 0 },
            led: { scale: 0.3, x: 500, y: 80 },
            resistor: { scale: 0.1, x: 300, y: 250 },
            pushButton: { scale: 2, x: 350, y: 20 },
        },
        mobile: {
            raspberry: { scale: 0.5, x: 10, y: 10 },
            led: { scale: 0.15, x: 200, y: 80 },
            resistor: { scale: 0.05, x: 150, y: 200 },
            pushButton: { scale: 1, x: 150, y: 20 },
        },
    },
    I = rs ? Bn.mobile : Bn.desktop,
    is = new Bt(
        "raspberry",
        w,
        "images/pi3dirk.svg",
        I.raspberry.scale,
        !1,
        I.raspberry.x,
        I.raspberry.y,
    ),
    os = new Bt(
        "resistorComponent",
        w,
        "images/resistor.svg",
        I.resistor.scale,
        !1,
        I.resistor.x,
        I.resistor.y,
    ),
    ss = new Bt("led", w, "images/led.svg", I.led.scale, !1, I.led.x, I.led.y),
    cs = new Bt(
        "push_button",
        w,
        "images/pushButton.svg",
        I.pushButton.scale,
        !1,
        I.pushButton.x,
        I.pushButton.y,
    ),
    an = w.append("g").attr("id", "pathsGroup"),
    Lt = {
        rasberryPi:
            "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the push button to detect input, and another GPIO pin is connected to the LED anode to control its state. GND pins are used to complete the circuit.",
        ledlight:
            "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
        resistor:
            "Resistor: Limits current to protect the LED. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin.",
        pushButton:
            "Push Button: Acts as an input device. One pin is connected to a Raspberry Pi GPIO pin to detect presses, and the other pin is connected to a GND pin.",
    },
    le = document.getElementById("rasberryPi"),
    ue = document.getElementById("ledlight"),
    fe = document.getElementById("resistor"),
    he = document.getElementById("pushButton"),
    K = document.getElementById("componentDescription"),
    de = document.getElementById("displayInfo"),
    as = document.getElementById("codeSubmit"),
    ls = document.getElementById("undoButton");
le.addEventListener("click", async () => await is.load());
ue.addEventListener("click", () => ss.load());
fe.addEventListener("click", () => os.load());
let At = !1;
he.addEventListener("click", async () => {
    (await cs.load(),
        y("#push_button").on("click", () => {
            if (y("#pressButton").node() != null) {
                (y("#pressButton").remove(), (At = !0), it && ln("#ledLight"));
                return;
            }
            (y("#push_button")
                .append("path")
                .attr("id", "pressButton")
                .attr(
                    "d",
                    "M15 17C15 19.2091 13.2091 21 11 21C8.79086 21 7 19.2091 7 17C7 14.7909 8.79086 13 11 13C13.2091 13 15 14.7909 15 17Z",
                )
                .attr("fill", "black")
                .attr("fill-opacity", "0.54"),
                (At = !1));
        }));
});
const Rt = (t, n) => {
    (t.addEventListener("mouseover", () => {
        ((K.innerHTML = n),
            (K.style.visibility = "visible"),
            (K.style.opacity = "1"));
    }),
        t.addEventListener("mouseout", () => {
            ((K.innerHTML = "Hover over a component to see its description."),
                (K.style.visibility = "hidden"),
                (K.style.opacity = "0"));
        }));
};
Rt(le, Lt.rasberryPi);
Rt(ue, Lt.ledlight);
Rt(fe, Lt.resistor);
Rt(he, Lt.pushButton);
const Ft = (t) =>
    z.includes(t.srcElement.id) ||
    ce.includes(t.srcElement.id) ||
    Zo.includes(t.srcElement.id) ||
    ae.includes(t.srcElement.id);
let C;
const O = new Qo("connectionLog"),
    qt = new Jo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let R = 0,
    it;
const ln = (t) => {
    if (!At) return;
    const n = document.getElementById("ledColor").value,
        e = y(t).attr("fill") || "white";
    y(t)
        .transition()
        .duration(1e3)
        .attr("fill", n)
        .transition()
        .duration(1e3)
        .attr("fill", e)
        .on("end", () => ln(t));
},
    us = (t) => {
        an.selectAll(`path[id="${t}"]`)
            .nodes()
            .forEach((e) => e.remove());
    },
    fs = () => {
        if (C) {
            an.selectAll(`path[id^="path${R}"]`)
                .nodes()
                .forEach((r) => r.remove());
            const n = w.select(`#marker-start-${R}`);
            n.empty() || n.remove();
            const e = O.connections[O.connections.length - 1];
            (z.includes(e.connector) && y(`#${e.connector}`).style("fill", "#9a916c"),
                (C = null),
                console.log("Removed all incomplete paths"));
            return;
        }
        if (O.connections.length > 0) {
            const t = O.connections[O.connections.length - 1],
                n = t.lineID,
                e = parseInt(n.replace("path", ""));
            us(n);
            const r = w.select(`#marker-start-${e}`);
            r.empty() || r.remove();
            const i = w.select(`#marker-end-${e}`);
            (i.empty() || i.remove(),
                z.includes(t.connector) &&
                y(`#${t.connector}`).style("fill", "#9a916c"),
                console.log(`Removed paths with line ID: ${n}`));
        } else console.warn("No more connections to undo");
    };
ls.addEventListener("click", () => {
    (O.undoLastConnection(), fs());
});
w.on("dblclick", (t) => {
    const n = es(t),
        e = n.x,
        r = n.y;
    if (Ft(t) && !C) {
        ((C = new Vo()),
            C.moveTo(e, r),
            z.includes(t.srcElement.id)
                ? y(`#${t.srcElement.id}`).style("fill", "black")
                : Mn(e, r, `marker-start-${R}`),
            O.addConnection({
                lineID: `path${R}`,
                x: e,
                y: r,
                connector: t.srcElement.id,
                connectorEnd: null,
                incomplete: !0,
            }),
            w.style("cursor", "crosshair"),
            console.log("Path started"));
        return;
    }
    if (t.srcElement.id === "svgContainer" && !Ft(t)) {
        C &&
            (C.lineTo(e, r),
                Sn(C.toString(), `path${R}`),
                console.log("Path segment added"));
        return;
    }
    if (Ft(t) && C) {
        (C.lineTo(e, r),
            Sn(C.toString(), `path${R}`),
            z.includes(t.srcElement.id)
                ? y(`#${t.srcElement.id}`).style("fill", "black")
                : Mn(e, r, `marker-end-${R}`),
            O.addConnection({
                lineID: `path${R}`,
                x: e,
                y: r,
                connector: t.srcElement.id,
                connectorEnd: t.srcElement.id,
                incomplete: !1,
            }),
            R++,
            w.style("cursor", "default"),
            (C = null),
            console.log("Path completed"));
        return;
    }
});
w.on("mouseover", (t) => {
    z.includes(t.srcElement.id) && (de.innerHTML = X[t.srcElement.id]);
});
w.on("mouseout", (t) => {
    (z.includes(t.srcElement.id) ||
        ce.includes(t.srcElement.id) ||
        ae.includes(t.srcElement.id)) &&
        (de.innerHTML = "CONNECTOR INFO");
});
as.addEventListener("click", () => {
    if (!document.getElementById("ledColor").value) {
        qt.throw("Error", "Please select an LED color.");
        return;
    }
    ((it = jo(O.getConnectionLog(), At)),
        it === !0
            ? (ln("#ledLight"), document.querySelector("#my-drawer-4").click())
            : it.error
                ? qt.throw("Error", it.error)
                : qt.throw(
                    "Error",
                    "Please connect the components properly. Refer to the connection diagram.",
                ));
});
document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("my-drawer-4").checked = !1;
});
