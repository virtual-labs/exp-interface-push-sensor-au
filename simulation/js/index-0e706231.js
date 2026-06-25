var ne = Object.defineProperty;
var ee = (t, n, e) =>
  n in t
    ? ne(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var on = (t, n, e) => (ee(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var re = { value: () => {} };
function Vt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new _t(e);
}
function _t(t) {
  this._ = t;
}
function ie(t, n) {
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
_t.prototype = Vt.prototype = {
  constructor: _t,
  on: function (t, n) {
    var e = this._,
      r = ie(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = oe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = sn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = sn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new _t(t);
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
function oe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function sn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = re), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Lt = "http://www.w3.org/1999/xhtml";
const cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Nt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    cn.hasOwnProperty(n) ? { space: cn[n], local: t } : t
  );
}
function se(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Lt && n.documentElement.namespaceURI === Lt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ce(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Nn(t) {
  var n = Nt(t);
  return (n.local ? ce : se)(n);
}
function ae() {}
function zt(t) {
  return t == null
    ? ae
    : function () {
        return this.querySelector(t);
      };
}
function ue(t) {
  typeof t != "function" && (t = zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, u, l = 0;
      l < s;
      ++l
    )
      (a = o[l]) &&
        (u = t.call(a, a.__data__, l, o)) &&
        ("__data__" in a && (u.__data__ = a.__data__), (c[l] = u));
  return new E(r, this._parents);
}
function le(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fe() {
  return [];
}
function In(t) {
  return t == null
    ? fe
    : function () {
        return this.querySelectorAll(t);
      };
}
function he(t) {
  return function () {
    return le(t.apply(this, arguments));
  };
}
function de(t) {
  typeof t == "function" ? (t = he(t)) : (t = In(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && (r.push(t.call(a, a.__data__, u, s)), i.push(a));
  return new E(r, i);
}
function An(t) {
  return function () {
    return this.matches(t);
  };
}
function Pn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var pe = Array.prototype.find;
function ge(t) {
  return function () {
    return pe.call(this.children, t);
  };
}
function _e() {
  return this.firstElementChild;
}
function me(t) {
  return this.select(t == null ? _e : ge(typeof t == "function" ? t : Pn(t)));
}
var ye = Array.prototype.filter;
function xe() {
  return Array.from(this.children);
}
function we(t) {
  return function () {
    return ye.call(this.children, t);
  };
}
function ve(t) {
  return this.selectAll(
    t == null ? xe : we(typeof t == "function" ? t : Pn(t))
  );
}
function be(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new E(r, this._parents);
}
function kn(t) {
  return new Array(t.length);
}
function Ee() {
  return new E(this._enter || this._groups.map(kn), this._parents);
}
function xt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
xt.prototype = {
  constructor: xt,
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
function $e(t) {
  return function () {
    return t;
  };
}
function Ce(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, u = o.length; s < u; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new xt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ne(t, n, e, r, i, o, s) {
  var c,
    a,
    u = new Map(),
    l = n.length,
    h = o.length,
    f = new Array(l),
    p;
  for (c = 0; c < l; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      u.has(p) ? (i[c] = a) : u.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = u.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), u.delete(p))
        : (e[c] = new xt(t, o[c]));
  for (c = 0; c < l; ++c) (a = n[c]) && u.get(f[c]) === a && (i[c] = a);
}
function Ie(t) {
  return t.__data__;
}
function Ae(t, n) {
  if (!arguments.length) return Array.from(this, Ie);
  var e = n ? Ne : Ce,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = $e(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      u = 0;
    u < o;
    ++u
  ) {
    var l = r[u],
      h = i[u],
      f = h.length,
      p = Pe(t.call(l, l && l.__data__, u, r)),
      _ = p.length,
      m = (c[u] = new Array(_)),
      C = (s[u] = new Array(_)),
      V = (a[u] = new Array(f));
    e(l, h, m, C, V, p, n);
    for (var P = 0, k = 0, d, g; P < _; ++P)
      if ((d = m[P])) {
        for (P >= k && (k = P + 1); !(g = C[k]) && ++k < _; );
        d._next = g || null;
      }
  }
  return (s = new E(s, r)), (s._enter = c), (s._exit = a), s;
}
function Pe(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ke() {
  return new E(this._exit || this._groups.map(kn), this._parents);
}
function Se(t, n, e) {
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
function Te(t) {
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
      var u = e[a], l = r[a], h = u.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = u[_] || l[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new E(c, this._parents);
}
function Me() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Re(t) {
  t || (t = Le);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), u, l = 0;
      l < c;
      ++l
    )
      (u = s[l]) && (a[l] = u);
    a.sort(n);
  }
  return new E(i, this._parents).order();
}
function Le(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Oe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Be() {
  return Array.from(this);
}
function De() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ge() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Xe() {
  return !this.node();
}
function He(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function qe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Fe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ye(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ve(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ze(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ue(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ke(t, n) {
  var e = Nt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Fe
        : qe
      : typeof n == "function"
      ? e.local
        ? Ue
        : ze
      : e.local
      ? Ve
      : Ye)(e, n)
  );
}
function Sn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function We(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ze(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Qe(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Je(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? We : typeof n == "function" ? Qe : Ze)(t, n, e ?? "")
      )
    : W(this.node(), t);
}
function W(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Sn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function je(t) {
  return function () {
    delete this[t];
  };
}
function tr(t, n) {
  return function () {
    this[t] = n;
  };
}
function nr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function er(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? je : typeof n == "function" ? nr : tr)(t, n))
    : this.node()[t];
}
function Tn(t) {
  return t.trim().split(/^|\s+/);
}
function Ut(t) {
  return t.classList || new Mn(t);
}
function Mn(t) {
  (this._node = t), (this._names = Tn(t.getAttribute("class") || ""));
}
Mn.prototype = {
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
function Rn(t, n) {
  for (var e = Ut(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Ln(t, n) {
  for (var e = Ut(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function rr(t) {
  return function () {
    Rn(this, t);
  };
}
function ir(t) {
  return function () {
    Ln(this, t);
  };
}
function or(t, n) {
  return function () {
    (n.apply(this, arguments) ? Rn : Ln)(this, t);
  };
}
function sr(t, n) {
  var e = Tn(t + "");
  if (arguments.length < 2) {
    for (var r = Ut(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? or : n ? rr : ir)(e, n));
}
function cr() {
  this.textContent = "";
}
function ar(t) {
  return function () {
    this.textContent = t;
  };
}
function ur(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function lr(t) {
  return arguments.length
    ? this.each(t == null ? cr : (typeof t == "function" ? ur : ar)(t))
    : this.node().textContent;
}
function fr() {
  this.innerHTML = "";
}
function hr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function dr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function pr(t) {
  return arguments.length
    ? this.each(t == null ? fr : (typeof t == "function" ? dr : hr)(t))
    : this.node().innerHTML;
}
function gr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function _r() {
  return this.each(gr);
}
function mr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function yr() {
  return this.each(mr);
}
function xr(t) {
  var n = typeof t == "function" ? t : Nn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function wr() {
  return null;
}
function vr(t, n) {
  var e = typeof t == "function" ? t : Nn(t),
    r = n == null ? wr : typeof n == "function" ? n : zt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function br() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Er() {
  return this.each(br);
}
function $r() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Cr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Nr(t) {
  return this.select(t ? Cr : $r);
}
function Ir(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ar(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Pr(t) {
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
function kr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Sr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Ar(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function Tr(t, n, e) {
  var r = Pr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, u = c.length, l; a < u; ++a)
        for (i = 0, l = c[a]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name) return l.value;
    }
    return;
  }
  for (c = n ? Sr : kr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function On(t, n, e) {
  var r = Sn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Mr(t, n) {
  return function () {
    return On(this, t, n);
  };
}
function Rr(t, n) {
  return function () {
    return On(this, t, n.apply(this, arguments));
  };
}
function Lr(t, n) {
  return this.each((typeof n == "function" ? Rr : Mr)(t, n));
}
function* Or() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Bn = [null];
function E(t, n) {
  (this._groups = t), (this._parents = n);
}
function st() {
  return new E([[document.documentElement]], Bn);
}
function Br() {
  return this;
}
E.prototype = st.prototype = {
  constructor: E,
  select: ue,
  selectAll: de,
  selectChild: me,
  selectChildren: ve,
  filter: be,
  data: Ae,
  enter: Ee,
  exit: ke,
  join: Se,
  merge: Te,
  selection: Br,
  order: Me,
  sort: Re,
  call: Oe,
  nodes: Be,
  node: De,
  size: Ge,
  empty: Xe,
  each: He,
  attr: Ke,
  style: Je,
  property: er,
  classed: sr,
  text: lr,
  html: pr,
  raise: _r,
  lower: yr,
  append: xr,
  insert: vr,
  remove: Er,
  clone: Nr,
  datum: Ir,
  on: Tr,
  dispatch: Lr,
  [Symbol.iterator]: Or,
};
function v(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Bn);
}
function Dr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function an(t, n) {
  if (((t = Dr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Gr = { passive: !1 },
  nt = { capture: !0, passive: !1 };
function Tt(t) {
  t.stopImmediatePropagation();
}
function U(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Xr(t) {
  var n = t.document.documentElement,
    e = v(t).on("dragstart.drag", U, nt);
  "onselectstart" in n
    ? e.on("selectstart.drag", U, nt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Hr(t, n) {
  var e = t.document.documentElement,
    r = v(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", U, nt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Ot(
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
    dy: u,
    dispatch: l,
  }
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
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
Ot.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function qr(t) {
  return !t.ctrlKey && !t.button;
}
function Fr() {
  return this.parentNode;
}
function Yr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Vr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zr() {
  var t = qr,
    n = Fr,
    e = Yr,
    r = Vr,
    i = {},
    o = Vt("start", "drag", "end"),
    s = 0,
    c,
    a,
    u,
    l,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", C)
      .on("touchmove.drag", V, Gr)
      .on("touchend.drag touchcancel.drag", P)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(l || !t.call(this, d, g))) {
      var y = k(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (v(d.view).on("mousemove.drag", _, nt).on("mouseup.drag", m, nt),
        Xr(d.view),
        Tt(d),
        (u = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((U(d), !u)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      u = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    v(d.view).on("mousemove.drag mouseup.drag", null),
      Hr(d.view, u),
      U(d),
      i.mouse("end", d);
  }
  function C(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        x = n.call(this, d, g),
        $ = y.length,
        D,
        z;
      for (D = 0; D < $; ++D)
        (z = k(this, x, d, g, y[D].identifier, y[D])) &&
          (Tt(d), z("start", d, y[D]));
    }
  }
  function V(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      $;
    for (x = 0; x < y; ++x)
      ($ = i[g[x].identifier]) && (U(d), $("drag", d, g[x]));
  }
  function P(d) {
    var g = d.changedTouches,
      y = g.length,
      x,
      $;
    for (
      l && clearTimeout(l),
        l = setTimeout(function () {
          l = null;
        }, 500),
        x = 0;
      x < y;
      ++x
    )
      ($ = i[g[x].identifier]) && (Tt(d), $("end", d, g[x]));
  }
  function k(d, g, y, x, $, D) {
    var z = o.copy(),
      S = an(D || y, g),
      tn,
      nn,
      at;
    if (
      (at = e.call(
        d,
        new Ot("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: $,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        x
      )) != null
    )
      return (
        (tn = at.x - S[0] || 0),
        (nn = at.y - S[1] || 0),
        function jn(kt, en, te) {
          var rn = S,
            St;
          switch (kt) {
            case "start":
              (i[$] = jn), (St = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (S = an(te || en, g)), (St = s);
              break;
          }
          z.call(
            kt,
            d,
            new Ot(kt, {
              sourceEvent: en,
              subject: at,
              target: f,
              identifier: $,
              active: St,
              x: S[0] + tn,
              y: S[1] + nn,
              dx: S[0] - rn[0],
              dy: S[1] - rn[1],
              dispatch: z,
            }),
            x
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
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
function Kt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Dn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ct() {}
var et = 0.7,
  wt = 1 / et,
  K = "\\s*([+-]?\\d+)\\s*",
  rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  M = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Ur = /^#([0-9a-f]{3,8})$/,
  Kr = new RegExp(`^rgb\\(${K},${K},${K}\\)$`),
  Wr = new RegExp(`^rgb\\(${M},${M},${M}\\)$`),
  Zr = new RegExp(`^rgba\\(${K},${K},${K},${rt}\\)$`),
  Qr = new RegExp(`^rgba\\(${M},${M},${M},${rt}\\)$`),
  Jr = new RegExp(`^hsl\\(${rt},${M},${M}\\)$`),
  jr = new RegExp(`^hsla\\(${rt},${M},${M},${rt}\\)$`),
  un = {
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
Kt(ct, it, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ln,
  formatHex: ln,
  formatHex8: ti,
  formatHsl: ni,
  formatRgb: fn,
  toString: fn,
});
function ln() {
  return this.rgb().formatHex();
}
function ti() {
  return this.rgb().formatHex8();
}
function ni() {
  return Gn(this).formatHsl();
}
function fn() {
  return this.rgb().formatRgb();
}
function it(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Ur.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? hn(n)
          : e === 3
          ? new b(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? lt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? lt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Kr.exec(t))
      ? new b(n[1], n[2], n[3], 1)
      : (n = Wr.exec(t))
      ? new b((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Zr.exec(t))
      ? lt(n[1], n[2], n[3], n[4])
      : (n = Qr.exec(t))
      ? lt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Jr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = jr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, n[4])
      : un.hasOwnProperty(t)
      ? hn(un[t])
      : t === "transparent"
      ? new b(NaN, NaN, NaN, 0)
      : null
  );
}
function hn(t) {
  return new b((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function lt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new b(t, n, e, r);
}
function ei(t) {
  return (
    t instanceof ct || (t = it(t)),
    t ? ((t = t.rgb()), new b(t.r, t.g, t.b, t.opacity)) : new b()
  );
}
function Bt(t, n, e, r) {
  return arguments.length === 1 ? ei(t) : new b(t, n, e, r ?? 1);
}
function b(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Kt(
  b,
  Bt,
  Dn(ct, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new b(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new b(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new b(F(this.r), F(this.g), F(this.b), vt(this.opacity));
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
    hex: dn,
    formatHex: dn,
    formatHex8: ri,
    formatRgb: pn,
    toString: pn,
  })
);
function dn() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function ri() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function pn() {
  const t = vt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${F(this.r)}, ${F(this.g)}, ${F(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function vt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function F(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = F(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function gn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function Gn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ct || (t = it(t)), !t)) return new N();
  if (t instanceof N) return t;
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
    new N(s, c, a, t.opacity)
  );
}
function ii(t, n, e, r) {
  return arguments.length === 1 ? Gn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Kt(
  N,
  ii,
  Dn(ct, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new b(
        Mt(t >= 240 ? t - 240 : t + 120, i, r),
        Mt(t, i, r),
        Mt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(_n(this.h), ft(this.s), ft(this.l), vt(this.opacity));
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
      const t = vt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${
        ft(this.s) * 100
      }%, ${ft(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function _n(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ft(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mt(t, n, e) {
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
const Xn = (t) => () => t;
function oi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function si(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function ci(t) {
  return (t = +t) == 1
    ? Hn
    : function (n, e) {
        return e - n ? si(n, e, t) : Xn(isNaN(n) ? e : n);
      };
}
function Hn(t, n) {
  var e = n - t;
  return e ? oi(t, e) : Xn(isNaN(t) ? n : t);
}
const mn = (function t(n) {
  var e = ci(n);
  function r(i, o) {
    var s = e((i = Bt(i)).r, (o = Bt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      u = Hn(i.opacity, o.opacity);
    return function (l) {
      return (
        (i.r = s(l)), (i.g = c(l)), (i.b = a(l)), (i.opacity = u(l)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function G(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Dt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Rt = new RegExp(Dt.source, "g");
function ai(t) {
  return function () {
    return t;
  };
}
function ui(t) {
  return function (n) {
    return t(n) + "";
  };
}
function li(t, n) {
  var e = (Dt.lastIndex = Rt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Dt.exec(t)) && (i = Rt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: G(r, i) })),
      (e = Rt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? ui(a[0].x)
        : ai(n)
      : ((n = a.length),
        function (u) {
          for (var l = 0, h; l < n; ++l) c[(h = a[l]).i] = h.x(u);
          return c.join("");
        })
  );
}
var yn = 180 / Math.PI,
  Gt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function qn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * yn,
      skewX: Math.atan(a) * yn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var ht;
function fi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Gt : qn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function hi(t) {
  return t == null ||
    (ht || (ht = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    ht.setAttribute("transform", t),
    !(t = ht.transform.baseVal.consolidate()))
    ? Gt
    : ((t = t.matrix), qn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Fn(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, h, f, p, _) {
    if (u !== h || l !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: G(u, h) }, { i: m - 2, x: G(l, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(u, l, h, f) {
    u !== l
      ? (u - l > 180 ? (l += 360) : l - u > 180 && (u += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: G(u, l) }))
      : l && h.push(i(h) + "rotate(" + l + r);
  }
  function c(u, l, h, f) {
    u !== l
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: G(u, l) })
      : l && h.push(i(h) + "skewX(" + l + r);
  }
  function a(u, l, h, f, p, _) {
    if (u !== h || l !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: G(u, h) }, { i: m - 2, x: G(l, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (u, l) {
    var h = [],
      f = [];
    return (
      (u = t(u)),
      (l = t(l)),
      o(u.translateX, u.translateY, l.translateX, l.translateY, h, f),
      s(u.rotate, l.rotate, h, f),
      c(u.skewX, l.skewX, h, f),
      a(u.scaleX, u.scaleY, l.scaleX, l.scaleY, h, f),
      (u = l = null),
      function (p) {
        for (var _ = -1, m = f.length, C; ++_ < m; ) h[(C = f[_]).i] = C.x(p);
        return h.join("");
      }
    );
  };
}
var di = Fn(fi, "px, ", "px)", "deg)"),
  pi = Fn(hi, ", ", ")", ")"),
  Z = 0,
  J = 0,
  Q = 0,
  Yn = 1e3,
  bt,
  j,
  Et = 0,
  Y = 0,
  It = 0,
  ot = typeof performance == "object" && performance.now ? performance : Date,
  Vn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Wt() {
  return Y || (Vn(gi), (Y = ot.now() + It));
}
function gi() {
  Y = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = zn.prototype = {
  constructor: $t,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Wt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        j !== this &&
        (j ? (j._next = this) : (bt = this), (j = this)),
      (this._call = t),
      (this._time = e),
      Xt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Xt());
  },
};
function zn(t, n, e) {
  var r = new $t();
  return r.restart(t, n, e), r;
}
function _i() {
  Wt(), ++Z;
  for (var t = bt, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Z;
}
function xn() {
  (Y = (Et = ot.now()) + It), (Z = J = 0);
  try {
    _i();
  } finally {
    (Z = 0), yi(), (Y = 0);
  }
}
function mi() {
  var t = ot.now(),
    n = t - Et;
  n > Yn && ((It -= n), (Et = t));
}
function yi() {
  for (var t, n = bt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (bt = e)));
  (j = t), Xt(r);
}
function Xt(t) {
  if (!Z) {
    J && (J = clearTimeout(J));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (J = setTimeout(xn, t - ot.now() - It)),
        Q && (Q = clearInterval(Q)))
      : (Q || ((Et = ot.now()), (Q = setInterval(mi, Yn))), (Z = 1), Vn(xn));
  }
}
function wn(t, n, e) {
  var r = new $t();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var xi = Vt("start", "end", "cancel", "interrupt"),
  wi = [],
  Un = 0,
  vn = 1,
  Ht = 2,
  mt = 3,
  bn = 4,
  qt = 5,
  yt = 6;
function At(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  vi(t, e, {
    name: n,
    index: r,
    group: i,
    on: xi,
    tween: wi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Un,
  });
}
function Zt(t, n) {
  var e = A(t, n);
  if (e.state > Un) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = A(t, n);
  if (e.state > mt) throw new Error("too late; already running");
  return e;
}
function A(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function vi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = zn(o, 0, e.time));
  function o(u) {
    (e.state = vn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, h, f, p;
    if (e.state !== vn) return a();
    for (l in r)
      if (((p = r[l]), p.name === e.name)) {
        if (p.state === mt) return wn(s);
        p.state === bn
          ? ((p.state = yt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[l])
          : +l < n &&
            ((p.state = yt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[l]);
      }
    if (
      (wn(function () {
        e.state === mt &&
          ((e.state = bn), e.timer.restart(c, e.delay, e.time), c(u));
      }),
      (e.state = Ht),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Ht)
    ) {
      for (
        e.state = mt, i = new Array((f = e.tween.length)), l = 0, h = -1;
        l < f;
        ++l
      )
        (p = e.tween[l].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(u) {
    for (
      var l =
          u < e.duration
            ? e.ease.call(null, u / e.duration)
            : (e.timer.restart(a), (e.state = qt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, l);
    e.state === qt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = yt), e.timer.stop(), delete r[n];
    for (var u in r) return;
    delete t.__transition;
  }
}
function bi(t, n) {
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
      (i = r.state > Ht && r.state < qt),
        (r.state = yt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ei(t) {
  return this.each(function () {
    bi(this, t);
  });
}
function $i(t, n) {
  var e, r;
  return function () {
    var i = R(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ci(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = R(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, u = i.length; a < u; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === u && i.push(c);
    }
    o.tween = i;
  };
}
function Ni(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = A(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? $i : Ci)(e, t, n));
}
function Qt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return A(i, r).value[n];
    }
  );
}
function Kn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? G
      : n instanceof it
      ? mn
      : (e = it(n))
      ? ((n = e), mn)
      : li
  )(t, n);
}
function Ii(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ai(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Pi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ki(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Si(t, n, e) {
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
function Ti(t, n, e) {
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
function Mi(t, n) {
  var e = Nt(t),
    r = e === "transform" ? pi : Kn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Ti : Si)(e, r, Qt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ai : Ii)(e)
      : (e.local ? ki : Pi)(e, r, n)
  );
}
function Ri(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Li(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Li(t, o)), e;
  }
  return (i._value = n), i;
}
function Bi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Ri(t, o)), e;
  }
  return (i._value = n), i;
}
function Di(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Nt(t);
  return this.tween(e, (r.local ? Oi : Bi)(r, n));
}
function Gi(t, n) {
  return function () {
    Zt(this, t).delay = +n.apply(this, arguments);
  };
}
function Xi(t, n) {
  return (
    (n = +n),
    function () {
      Zt(this, t).delay = n;
    }
  );
}
function Hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Gi : Xi)(n, t))
    : A(this.node(), n).delay;
}
function qi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function Fi(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function Yi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? qi : Fi)(n, t))
    : A(this.node(), n).duration;
}
function Vi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function zi(t) {
  var n = this._id;
  return arguments.length ? this.each(Vi(n, t)) : A(this.node(), n).ease;
}
function Ui(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function Ki(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ui(this._id, t));
}
function Wi(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, u = 0; u < s; ++u)
      (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function Zi(t) {
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
      var a = n[c], u = e[c], l = a.length, h = (s[c] = new Array(l)), f, p = 0;
      p < l;
      ++p
    )
      (f = a[p] || u[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new B(s, this._parents, this._name, this._id);
}
function Qi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Ji(t, n, e) {
  var r,
    i,
    o = Qi(n) ? Zt : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function ji(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? A(this.node(), e).on.on(t)
    : this.each(Ji(e, t, n));
}
function to(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function no() {
  return this.on("end.remove", to(this._id));
}
function eo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = zt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, u = (o[s] = new Array(a)), l, h, f = 0;
      f < a;
      ++f
    )
      (l = c[f]) &&
        (h = t.call(l, l.__data__, f, c)) &&
        ("__data__" in l && (h.__data__ = l.__data__),
        (u[f] = h),
        At(u[f], n, e, f, u, A(l, e)));
  return new B(o, this._parents, n, e);
}
function ro(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = In(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], u = a.length, l, h = 0; h < u; ++h)
      if ((l = a[h])) {
        for (
          var f = t.call(l, l.__data__, h, a),
            p,
            _ = A(l, e),
            m = 0,
            C = f.length;
          m < C;
          ++m
        )
          (p = f[m]) && At(p, n, e, m, f, _);
        o.push(f), s.push(l);
      }
  return new B(o, s, n, e);
}
var io = st.prototype.constructor;
function oo() {
  return new io(this._groups, this._parents);
}
function so(t, n) {
  var e, r, i;
  return function () {
    var o = W(this, t),
      s = (this.style.removeProperty(t), W(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Wn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function co(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = W(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ao(t, n, e) {
  var r, i, o;
  return function () {
    var s = W(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), W(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function uo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      u = a.on,
      l = a.value[o] == null ? c || (c = Wn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, (i = l)), (a.on = r);
  };
}
function lo(t, n, e) {
  var r = (t += "") == "transform" ? di : Kn;
  return n == null
    ? this.styleTween(t, so(t, r)).on("end.style." + t, Wn(t))
    : typeof n == "function"
    ? this.styleTween(t, ao(t, r, Qt(this, "style." + t, n))).each(
        uo(this._id, t)
      )
    : this.styleTween(t, co(t, r, n), e).on("end.style." + t, null);
}
function fo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function ho(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && fo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function po(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, ho(t, n, e ?? ""));
}
function go(t) {
  return function () {
    this.textContent = t;
  };
}
function _o(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function mo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? _o(Qt(this, "text", t))
      : go(t == null ? "" : t + "")
  );
}
function yo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function xo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && yo(i)), n;
  }
  return (r._value = t), r;
}
function wo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, xo(t));
}
function vo() {
  for (
    var t = this._name,
      n = this._id,
      e = Zn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      if ((a = s[u])) {
        var l = A(a, n);
        At(a, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease,
        });
      }
  return new B(r, this._parents, t, e);
}
function bo() {
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
    e.each(function () {
      var u = R(this, r),
        l = u.on;
      l !== t &&
        ((n = (t = l).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (u.on = n);
    }),
      i === 0 && o();
  });
}
var Eo = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Zn() {
  return ++Eo;
}
var L = st.prototype;
B.prototype = {
  constructor: B,
  select: eo,
  selectAll: ro,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: Wi,
  merge: Zi,
  selection: oo,
  transition: vo,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: ji,
  attr: Mi,
  attrTween: Di,
  style: lo,
  styleTween: po,
  text: mo,
  textTween: wo,
  remove: no,
  tween: Ni,
  delay: Hi,
  duration: Yi,
  ease: zi,
  easeVarying: Ki,
  end: bo,
  [Symbol.iterator]: L[Symbol.iterator],
};
function $o(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Co = { time: null, delay: 0, duration: 250, ease: $o };
function No(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Io(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = Zn()), ((e = Co).time = Wt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, u = 0; u < c; ++u)
      (a = s[u]) && At(a, t, n, u, s, e || No(a, n));
  return new B(r, this._parents, t, n);
}
st.prototype.interrupt = Ei;
st.prototype.transition = Io;
const Ft = Math.PI,
  Yt = 2 * Ft,
  H = 1e-6,
  Ao = Yt - H;
function Qn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Po(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Qn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class ko {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Qn : Po(n));
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
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      u = i - e,
      l = s - n,
      h = c - e,
      f = l * l + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > H)
      if (!(Math.abs(h * a - u * l) > H) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + u * u,
          C = p * p + _ * _,
          V = Math.sqrt(m),
          P = Math.sqrt(f),
          k = o * Math.tan((Ft - Math.acos((m + f - C) / (2 * V * P))) / 2),
          d = k / P,
          g = k / V;
        Math.abs(d - 1) > H && this._append`L${n + d * l},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > l * _)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * u)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      u = n + c,
      l = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > H || Math.abs(this._y1 - l) > H) &&
        this._append`L${u},${l}`,
      r &&
        (f < 0 && (f = (f % Yt) + Yt),
        f > Ao
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = u)},${(this._y1 = l)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Ft)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function So(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function To(t, n) {
  return fetch(t, n).then(So);
}
function Mo(t) {
  return (n, e) => To(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Ro = Mo("application/xml");
function tt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
tt.prototype = {
  constructor: tt,
  scale: function (t) {
    return t === 1 ? this : new tt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new tt(this.k, this.x + this.k * t, this.y + this.k * n);
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
tt.prototype;
class Pt {
  constructor(n, e, r, i, o, s, c) {
    on(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (v("#" + this.id).node() != null) return;
    const n = await Ro(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(v(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          zr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    v(this).raise().classed("active", !0);
  }
  dragended(n) {
    v(this).classed("active", !1);
  }
}
const Jt = [
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
  Lo = ["path26583", "path26585"],
  dt = { path26583: "+ve Terminal of LED", path26585: "-ve Terminal of LED" },
  Oo = ["res_1", "res_2"],
  pt = { res_1: "Resister", res_2: "Resister" },
  Bo = ["pin1", "pin2", "pin3", "pin4"],
  gt = {
    pin1: "Push-Button",
    pin2: "Push-Button",
    pin3: "Push-Button",
    pin4: "Push-Button",
  };
class Do {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 == 0) {
      let n = document.createElement("li");
      const e = X[this.connections[this.connections.length - 2].connector]
          ? X[this.connections[this.connections.length - 2].connector]
          : dt[this.connections[this.connections.length - 2].connector]
          ? dt[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? X[this.connections[this.connections.length - 1].connector]
          : dt[this.connections[this.connections.length - 1].connector]
          ? dt[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      } : ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Go {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const Xo = (t, n) => {
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
              s + "4" == i.connector
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
  En = (t, n) => {
    jt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  O = v("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Ho = new Pt("raspberry", O, "images/pi3dirk.svg", 1, !1),
  qo = new Pt(
    "resistorComponent",
    O,
    "images/resistor.svg",
    0.1,
    !1,
    300,
    250
  ),
  Fo = new Pt("led", O, "images/led.svg", 0.3, !1, 500, 80),
  Yo = new Pt("push_button", O, "images/pushButton.svg", 2, !1, 300, 20),
  jt = O.append("g").attr("id", "pathsGroup"),
  Vo = document.getElementById("rasberryPi"),
  zo = document.getElementById("ledlight"),
  Uo = document.getElementById("resistor"),
  $n = (t) =>
    Jt.includes(t.srcElement.id) ||
    Lo.includes(t.srcElement.id) ||
    Oo.includes(t.srcElement.id) ||
    Bo.includes(t.srcElement.id),
  Ko = document.getElementById("displayInfo"),
  Wo = document.getElementById("codeSubmit"),
  Zo = document.getElementById("pushButton");
Vo.addEventListener("click", async () => await Ho.load());
zo.addEventListener("click", () => Fo.load());
Uo.addEventListener("click", () => qo.load());
let Ct = !1;
Zo.addEventListener("click", async () => {
  await Yo.load(),
    v("#push_button").on("click", () => {
      if (v("#pressButton").node() != null) {
        v("#pressButton").remove(), (Ct = !0);
        return;
      }
      v("#push_button")
        .append("path")
        .attr("id", "pressButton")
        .attr(
          "d",
          "M15 17C15 19.2091 13.2091 21 11 21C8.79086 21 7 19.2091 7 17C7 14.7909 8.79086 13 11 13C13.2091 13 15 14.7909 15 17Z"
        )
        .attr("fill", "black")
        .attr("fill-opacity", "0.54"),
        (Ct = !1);
    });
});
const Jn = (t) => {
  Ct &&
    v(t)
      .transition()
      .duration(1e3)
      .attr("fill", "red")
      .transition()
      .duration(1e3)
      .attr("fill", "white")
      .on("end", () => Jn(t));
};
let w;
const I = new Do("connectionLog"),
  Cn = new Go("errorBox", "errorHeading", "errorText", "closeErrorBox");
let T = 0;
const Qo = document.querySelector("#undoButton");
Qo.addEventListener("click", () => {
  I.undoLastConnection(), jo();
});
const Jo = (t) => {
    jt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => {
        e.remove();
      });
  },
  jo = () => {
    if (w) {
      jt
        .selectAll(`path[id^="path${T}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (w = null),
        (T = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (I.connections.length > 0) {
      const n = I.connections[I.connections.length - 1].lineID;
      Jo(n),
        I.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
O.on("dblclick", (t) => {
  if ($n(t) && w == null) {
    (w = new ko()),
      w.moveTo(t.offsetX, t.offsetY),
      I.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      O.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(T, "path count");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !Jt.includes(t.srcElement.id)) {
    w && w.lineTo(t.offsetX, t.offsetY),
      w &&
        I.connections.length > 0 &&
        (I.connections[I.connections.length - 1].connectorEnd = null),
      w &&
        (En(w.toString(), `path${T}`),
        console.log("path created"),
        console.log(T));
    return;
  }
  if ($n(t) && w) {
    w.lineTo(t.offsetX, t.offsetY),
      En(w.toString(), `path${T}`),
      I.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      T++,
      O.style("cursor", "default"),
      (w = null),
      console.log("connectedPointSequence", connectedPointSequence),
      console.log("path created 2"),
      console.log(T);
    return;
  }
});
O.on("mouseover", (t) => {
  Jt.includes(t.srcElement.id) && (Ko.innerHTML = X[t.srcElement.id]);
});
Wo.addEventListener("click", () => {
  const t = Xo(I.getConnectionLog(), Ct);
  t == !0
    ? (Jn("#ledLight"), document.querySelector("#my-drawer-4").click())
    : t.error
    ? Cn.throw("Error", t.error)
    : Cn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
