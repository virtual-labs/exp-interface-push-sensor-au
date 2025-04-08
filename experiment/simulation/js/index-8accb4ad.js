var fe = Object.defineProperty;
var he = (t, n, e) =>
  n in t
    ? fe(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var gn = (t, n, e) => (he(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var de = { value: () => {} };
function Zt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new yt(e);
}
function yt(t) {
  this._ = t;
}
function pe(t, n) {
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
yt.prototype = Zt.prototype = {
  constructor: yt,
  on: function (t, n) {
    var e = this._,
      r = pe(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ge(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = _n(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = _n(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new yt(t);
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
function ge(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function _n(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = de), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Xt = "http://www.w3.org/1999/xhtml";
const mn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Xt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Pt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    mn.hasOwnProperty(n) ? { space: mn[n], local: t } : t
  );
}
function _e(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Xt && n.documentElement.namespaceURI === Xt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function me(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ln(t) {
  var n = Pt(t);
  return (n.local ? me : _e)(n);
}
function ye() {}
function Qt(t) {
  return t == null
    ? ye
    : function () {
        return this.querySelector(t);
      };
}
function ve(t) {
  typeof t != "function" && (t = Qt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new b(r, this._parents);
}
function xe(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function we() {
  return [];
}
function Rn(t) {
  return t == null
    ? we
    : function () {
        return this.querySelectorAll(t);
      };
}
function be(t) {
  return function () {
    return xe(t.apply(this, arguments));
  };
}
function Ee(t) {
  typeof t == "function" ? (t = be(t)) : (t = Rn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new b(r, i);
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
var $e = Array.prototype.find;
function Ce(t) {
  return function () {
    return $e.call(this.children, t);
  };
}
function Ie() {
  return this.firstElementChild;
}
function Ne(t) {
  return this.select(t == null ? Ie : Ce(typeof t == "function" ? t : Dn(t)));
}
var Pe = Array.prototype.filter;
function Ae() {
  return Array.from(this.children);
}
function ke(t) {
  return function () {
    return Pe.call(this.children, t);
  };
}
function Te(t) {
  return this.selectAll(
    t == null ? Ae : ke(typeof t == "function" ? t : Dn(t))
  );
}
function Se(t) {
  typeof t != "function" && (t = On(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new b(r, this._parents);
}
function Bn(t) {
  return new Array(t.length);
}
function Me() {
  return new b(this._enter || this._groups.map(Bn), this._parents);
}
function wt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
wt.prototype = {
  constructor: wt,
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
function Le(t) {
  return function () {
    return t;
  };
}
function Re(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new wt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Oe(t, n, e, r, i, o, s) {
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
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new wt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function De(t) {
  return t.__data__;
}
function Be(t, n) {
  if (!arguments.length) return Array.from(this, De);
  var e = n ? Oe : Re,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Le(t));
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
      p = Ge(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      C = (s[l] = new Array(_)),
      z = (a[l] = new Array(f));
    e(u, h, m, C, z, p, n);
    for (var P = 0, A = 0, d, g; P < _; ++P)
      if ((d = m[P])) {
        for (P >= A && (A = P + 1); !(g = C[A]) && ++A < _; );
        d._next = g || null;
      }
  }
  return (s = new b(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ge(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Xe() {
  return new b(this._exit || this._groups.map(Bn), this._parents);
}
function He(t, n, e) {
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
function Fe(t) {
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
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = l[_] || u[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new b(c, this._parents);
}
function qe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Ye(t) {
  t || (t = Ve);
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
  return new b(i, this._parents).order();
}
function Ve(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function ze() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ue() {
  return Array.from(this);
}
function Ke() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function We() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Ze() {
  return !this.node();
}
function Qe(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Je(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function je(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function tr(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function nr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function er(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function rr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function ir(t, n) {
  var e = Pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? je
        : Je
      : typeof n == "function"
      ? e.local
        ? rr
        : er
      : e.local
      ? nr
      : tr)(e, n)
  );
}
function Gn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function or(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function sr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function cr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function ar(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? or : typeof n == "function" ? cr : sr)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Gn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function lr(t) {
  return function () {
    delete this[t];
  };
}
function ur(t, n) {
  return function () {
    this[t] = n;
  };
}
function fr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function hr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? lr : typeof n == "function" ? fr : ur)(t, n))
    : this.node()[t];
}
function Xn(t) {
  return t.trim().split(/^|\s+/);
}
function Jt(t) {
  return t.classList || new Hn(t);
}
function Hn(t) {
  (this._node = t), (this._names = Xn(t.getAttribute("class") || ""));
}
Hn.prototype = {
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
function Fn(t, n) {
  for (var e = Jt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function qn(t, n) {
  for (var e = Jt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function dr(t) {
  return function () {
    Fn(this, t);
  };
}
function pr(t) {
  return function () {
    qn(this, t);
  };
}
function gr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Fn : qn)(this, t);
  };
}
function _r(t, n) {
  var e = Xn(t + "");
  if (arguments.length < 2) {
    for (var r = Jt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? gr : n ? dr : pr)(e, n));
}
function mr() {
  this.textContent = "";
}
function yr(t) {
  return function () {
    this.textContent = t;
  };
}
function vr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function xr(t) {
  return arguments.length
    ? this.each(t == null ? mr : (typeof t == "function" ? vr : yr)(t))
    : this.node().textContent;
}
function wr() {
  this.innerHTML = "";
}
function br(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Er(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function $r(t) {
  return arguments.length
    ? this.each(t == null ? wr : (typeof t == "function" ? Er : br)(t))
    : this.node().innerHTML;
}
function Cr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ir() {
  return this.each(Cr);
}
function Nr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Pr() {
  return this.each(Nr);
}
function Ar(t) {
  var n = typeof t == "function" ? t : Ln(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function kr() {
  return null;
}
function Tr(t, n) {
  var e = typeof t == "function" ? t : Ln(t),
    r = n == null ? kr : typeof n == "function" ? n : Qt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Sr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Mr() {
  return this.each(Sr);
}
function Lr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Rr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Or(t) {
  return this.select(t ? Rr : Lr);
}
function Dr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Br(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Gr(t) {
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
function Xr(t) {
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
function Hr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Br(n);
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
function Fr(t, n, e) {
  var r = Gr(t + ""),
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
  for (c = n ? Hr : Xr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Yn(t, n, e) {
  var r = Gn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function qr(t, n) {
  return function () {
    return Yn(this, t, n);
  };
}
function Yr(t, n) {
  return function () {
    return Yn(this, t, n.apply(this, arguments));
  };
}
function Vr(t, n) {
  return this.each((typeof n == "function" ? Yr : qr)(t, n));
}
function* zr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Vn = [null];
function b(t, n) {
  (this._groups = t), (this._parents = n);
}
function at() {
  return new b([[document.documentElement]], Vn);
}
function Ur() {
  return this;
}
b.prototype = at.prototype = {
  constructor: b,
  select: ve,
  selectAll: Ee,
  selectChild: Ne,
  selectChildren: Te,
  filter: Se,
  data: Be,
  enter: Me,
  exit: Xe,
  join: He,
  merge: Fe,
  selection: Ur,
  order: qe,
  sort: Ye,
  call: ze,
  nodes: Ue,
  node: Ke,
  size: We,
  empty: Ze,
  each: Qe,
  attr: ir,
  style: ar,
  property: hr,
  classed: _r,
  text: xr,
  html: $r,
  raise: Ir,
  lower: Pr,
  append: Ar,
  insert: Tr,
  remove: Mr,
  clone: Or,
  datum: Dr,
  on: Fr,
  dispatch: Vr,
  [Symbol.iterator]: zr,
};
function x(t) {
  return typeof t == "string"
    ? new b([[document.querySelector(t)]], [document.documentElement])
    : new b([[t]], Vn);
}
function Kr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function yn(t, n) {
  if (((t = Kr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Wr = { passive: !1 },
  rt = { capture: !0, passive: !1 };
function Rt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Zr(t) {
  var n = t.document.documentElement,
    e = x(t).on("dragstart.drag", K, rt);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, rt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Qr(t, n) {
  var e = t.document.documentElement,
    r = x(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, rt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ft = (t) => () => t;
function Ht(
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
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Ht.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Jr(t) {
  return !t.ctrlKey && !t.button;
}
function jr() {
  return this.parentNode;
}
function ti(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function ni() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ei() {
  var t = Jr,
    n = jr,
    e = ti,
    r = ni,
    i = {},
    o = Zt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", C)
      .on("touchmove.drag", z, Wr)
      .on("touchend.drag touchcancel.drag", P)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = A(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (x(d.view).on("mousemove.drag", _, rt).on("mouseup.drag", m, rt),
        Zr(d.view),
        Rt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    x(d.view).on("mousemove.drag mouseup.drag", null),
      Qr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function C(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        v = n.call(this, d, g),
        E = y.length,
        D,
        U;
      for (D = 0; D < E; ++D)
        (U = A(this, v, d, g, y[D].identifier, y[D])) &&
          (Rt(d), U("start", d, y[D]));
    }
  }
  function z(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      E;
    for (v = 0; v < y; ++v)
      (E = i[g[v].identifier]) && (K(d), E("drag", d, g[v]));
  }
  function P(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      E;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        v = 0;
      v < y;
      ++v
    )
      (E = i[g[v].identifier]) && (Rt(d), E("end", d, g[v]));
  }
  function A(d, g, y, v, E, D) {
    var U = o.copy(),
      k = yn(D || y, g),
      fn,
      hn,
      ut;
    if (
      (ut = e.call(
        d,
        new Ht("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: E,
          active: s,
          x: k[0],
          y: k[1],
          dx: 0,
          dy: 0,
          dispatch: U,
        }),
        v
      )) != null
    )
      return (
        (fn = ut.x - k[0] || 0),
        (hn = ut.y - k[1] || 0),
        function le(Mt, dn, ue) {
          var pn = k,
            Lt;
          switch (Mt) {
            case "start":
              (i[E] = le), (Lt = s++);
              break;
            case "end":
              delete i[E], --s;
            case "drag":
              (k = yn(ue || dn, g)), (Lt = s);
              break;
          }
          U.call(
            Mt,
            d,
            new Ht(Mt, {
              sourceEvent: dn,
              subject: ut,
              target: f,
              identifier: E,
              active: Lt,
              x: k[0] + fn,
              y: k[1] + hn,
              dx: k[0] - pn[0],
              dy: k[1] - pn[1],
              dispatch: U,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ft(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ft(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ft(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ft(!!d)), f)
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
function jt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function zn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function lt() {}
var it = 0.7,
  bt = 1 / it,
  W = "\\s*([+-]?\\d+)\\s*",
  ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  T = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ri = /^#([0-9a-f]{3,8})$/,
  ii = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  oi = new RegExp(`^rgb\\(${T},${T},${T}\\)$`),
  si = new RegExp(`^rgba\\(${W},${W},${W},${ot}\\)$`),
  ci = new RegExp(`^rgba\\(${T},${T},${T},${ot}\\)$`),
  ai = new RegExp(`^hsl\\(${ot},${T},${T}\\)$`),
  li = new RegExp(`^hsla\\(${ot},${T},${T},${ot}\\)$`),
  vn = {
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
jt(lt, st, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xn,
  formatHex: xn,
  formatHex8: ui,
  formatHsl: fi,
  formatRgb: wn,
  toString: wn,
});
function xn() {
  return this.rgb().formatHex();
}
function ui() {
  return this.rgb().formatHex8();
}
function fi() {
  return Un(this).formatHsl();
}
function wn() {
  return this.rgb().formatRgb();
}
function st(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ri.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? bn(n)
          : e === 3
          ? new w(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ht(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ht(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ii.exec(t))
      ? new w(n[1], n[2], n[3], 1)
      : (n = oi.exec(t))
      ? new w((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = si.exec(t))
      ? ht(n[1], n[2], n[3], n[4])
      : (n = ci.exec(t))
      ? ht((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ai.exec(t))
      ? Cn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = li.exec(t))
      ? Cn(n[1], n[2] / 100, n[3] / 100, n[4])
      : vn.hasOwnProperty(t)
      ? bn(vn[t])
      : t === "transparent"
      ? new w(NaN, NaN, NaN, 0)
      : null
  );
}
function bn(t) {
  return new w((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ht(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new w(t, n, e, r);
}
function hi(t) {
  return (
    t instanceof lt || (t = st(t)),
    t ? ((t = t.rgb()), new w(t.r, t.g, t.b, t.opacity)) : new w()
  );
}
function Ft(t, n, e, r) {
  return arguments.length === 1 ? hi(t) : new w(t, n, e, r ?? 1);
}
function w(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
jt(
  w,
  Ft,
  zn(lt, {
    brighter(t) {
      return (
        (t = t == null ? bt : Math.pow(bt, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new w(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new w(Y(this.r), Y(this.g), Y(this.b), Et(this.opacity));
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
    hex: En,
    formatHex: En,
    formatHex8: di,
    formatRgb: $n,
    toString: $n,
  })
);
function En() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function di() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function $n() {
  const t = Et(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Et(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = Y(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Cn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new I(t, n, e, r)
  );
}
function Un(t) {
  if (t instanceof I) return new I(t.h, t.s, t.l, t.opacity);
  if ((t instanceof lt || (t = st(t)), !t)) return new I();
  if (t instanceof I) return t;
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
    new I(s, c, a, t.opacity)
  );
}
function pi(t, n, e, r) {
  return arguments.length === 1 ? Un(t) : new I(t, n, e, r ?? 1);
}
function I(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
jt(
  I,
  pi,
  zn(lt, {
    brighter(t) {
      return (
        (t = t == null ? bt : Math.pow(bt, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? it : Math.pow(it, t)),
        new I(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new w(
        Ot(t >= 240 ? t - 240 : t + 120, i, r),
        Ot(t, i, r),
        Ot(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new I(In(this.h), dt(this.s), dt(this.l), Et(this.opacity));
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
      const t = Et(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${In(this.h)}, ${
        dt(this.s) * 100
      }%, ${dt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function In(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function dt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ot(t, n, e) {
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
function gi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function _i(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function mi(t) {
  return (t = +t) == 1
    ? Wn
    : function (n, e) {
        return e - n ? _i(n, e, t) : Kn(isNaN(n) ? e : n);
      };
}
function Wn(t, n) {
  var e = n - t;
  return e ? gi(t, e) : Kn(isNaN(t) ? n : t);
}
const Nn = (function t(n) {
  var e = mi(n);
  function r(i, o) {
    var s = e((i = Ft(i)).r, (o = Ft(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Wn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function B(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Dt = new RegExp(qt.source, "g");
function yi(t) {
  return function () {
    return t;
  };
}
function vi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function xi(t, n) {
  var e = (qt.lastIndex = Dt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = qt.exec(t)) && (i = Dt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: B(r, i) })),
      (e = Dt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? vi(a[0].x)
        : yi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var Pn = 180 / Math.PI,
  Yt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Zn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Pn,
      skewX: Math.atan(a) * Pn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var pt;
function wi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Yt : Zn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function bi(t) {
  return t == null ||
    (pt || (pt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    pt.setAttribute("transform", t),
    !(t = pt.transform.baseVal.consolidate()))
    ? Yt
    : ((t = t.matrix), Zn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Qn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: B(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: B(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
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
        for (var _ = -1, m = f.length, C; ++_ < m; ) h[(C = f[_]).i] = C.x(p);
        return h.join("");
      }
    );
  };
}
var Ei = Qn(wi, "px, ", "px)", "deg)"),
  $i = Qn(bi, ", ", ")", ")"),
  Q = 0,
  j = 0,
  J = 0,
  Jn = 1e3,
  $t,
  tt,
  Ct = 0,
  V = 0,
  At = 0,
  ct = typeof performance == "object" && performance.now ? performance : Date,
  jn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function tn() {
  return V || (jn(Ci), (V = ct.now() + At));
}
function Ci() {
  V = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = te.prototype = {
  constructor: It,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? tn() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : ($t = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      Vt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Vt());
  },
};
function te(t, n, e) {
  var r = new It();
  return r.restart(t, n, e), r;
}
function Ii() {
  tn(), ++Q;
  for (var t = $t, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function An() {
  (V = (Ct = ct.now()) + At), (Q = j = 0);
  try {
    Ii();
  } finally {
    (Q = 0), Pi(), (V = 0);
  }
}
function Ni() {
  var t = ct.now(),
    n = t - Ct;
  n > Jn && ((At -= n), (Ct = t));
}
function Pi() {
  for (var t, n = $t, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : ($t = e)));
  (tt = t), Vt(r);
}
function Vt(t) {
  if (!Q) {
    j && (j = clearTimeout(j));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout(An, t - ct.now() - At)),
        J && (J = clearInterval(J)))
      : (J || ((Ct = ct.now()), (J = setInterval(Ni, Jn))), (Q = 1), jn(An));
  }
}
function kn(t, n, e) {
  var r = new It();
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
var Ai = Zt("start", "end", "cancel", "interrupt"),
  ki = [],
  ne = 0,
  Tn = 1,
  zt = 2,
  vt = 3,
  Sn = 4,
  Ut = 5,
  xt = 6;
function kt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ti(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ai,
    tween: ki,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ne,
  });
}
function nn(t, n) {
  var e = N(t, n);
  if (e.state > ne) throw new Error("too late; already scheduled");
  return e;
}
function L(t, n) {
  var e = N(t, n);
  if (e.state > vt) throw new Error("too late; already running");
  return e;
}
function N(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ti(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = te(o, 0, e.time));
  function o(l) {
    (e.state = Tn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== Tn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === vt) return kn(s);
        p.state === Sn
          ? ((p.state = xt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = xt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (kn(function () {
        e.state === vt &&
          ((e.state = Sn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = zt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === zt)
    ) {
      for (
        e.state = vt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Ut), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ut && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = xt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Si(t, n) {
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
      (i = r.state > zt && r.state < Ut),
        (r.state = xt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Mi(t) {
  return this.each(function () {
    Si(this, t);
  });
}
function Li(t, n) {
  var e, r;
  return function () {
    var i = L(this, t),
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
function Ri(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = L(this, t),
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
function Oi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Li : Ri)(e, t, n));
}
function en(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = L(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return N(i, r).value[n];
    }
  );
}
function ee(t, n) {
  var e;
  return (
    typeof n == "number"
      ? B
      : n instanceof st
      ? Nn
      : (e = st(n))
      ? ((n = e), Nn)
      : xi
  )(t, n);
}
function Di(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Bi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Xi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Hi(t, n, e) {
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
function Fi(t, n, e) {
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
function qi(t, n) {
  var e = Pt(t),
    r = e === "transform" ? $i : ee;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Fi : Hi)(e, r, en(this, "attr." + t, n))
      : n == null
      ? (e.local ? Bi : Di)(e)
      : (e.local ? Xi : Gi)(e, r, n)
  );
}
function Yi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Vi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function zi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Vi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ui(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Yi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ki(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Pt(t);
  return this.tween(e, (r.local ? zi : Ui)(r, n));
}
function Wi(t, n) {
  return function () {
    nn(this, t).delay = +n.apply(this, arguments);
  };
}
function Zi(t, n) {
  return (
    (n = +n),
    function () {
      nn(this, t).delay = n;
    }
  );
}
function Qi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Wi : Zi)(n, t))
    : N(this.node(), n).delay;
}
function Ji(t, n) {
  return function () {
    L(this, t).duration = +n.apply(this, arguments);
  };
}
function ji(t, n) {
  return (
    (n = +n),
    function () {
      L(this, t).duration = n;
    }
  );
}
function to(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ji : ji)(n, t))
    : N(this.node(), n).duration;
}
function no(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    L(this, t).ease = n;
  };
}
function eo(t) {
  var n = this._id;
  return arguments.length ? this.each(no(n, t)) : N(this.node(), n).ease;
}
function ro(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    L(this, t).ease = e;
  };
}
function io(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ro(this._id, t));
}
function oo(t) {
  typeof t != "function" && (t = On(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new O(r, this._parents, this._name, this._id);
}
function so(t) {
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
  return new O(s, this._parents, this._name, this._id);
}
function co(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function ao(t, n, e) {
  var r,
    i,
    o = co(n) ? nn : L;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function lo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? N(this.node(), e).on.on(t)
    : this.each(ao(e, t, n));
}
function uo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function fo() {
  return this.on("end.remove", uo(this._id));
}
function ho(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Qt(t));
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
        kt(l[f], n, e, f, l, N(u, e)));
  return new O(o, this._parents, n, e);
}
function po(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Rn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = N(u, e),
            m = 0,
            C = f.length;
          m < C;
          ++m
        )
          (p = f[m]) && kt(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new O(o, s, n, e);
}
var go = at.prototype.constructor;
function _o() {
  return new go(this._groups, this._parents);
}
function mo(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function re(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function yo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function vo(t, n, e) {
  var r, i, o;
  return function () {
    var s = Z(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Z(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function xo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = L(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = re(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function wo(t, n, e) {
  var r = (t += "") == "transform" ? Ei : ee;
  return n == null
    ? this.styleTween(t, mo(t, r)).on("end.style." + t, re(t))
    : typeof n == "function"
    ? this.styleTween(t, vo(t, r, en(this, "style." + t, n))).each(
        xo(this._id, t)
      )
    : this.styleTween(t, yo(t, r, n), e).on("end.style." + t, null);
}
function bo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Eo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && bo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function $o(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Eo(t, n, e ?? ""));
}
function Co(t) {
  return function () {
    this.textContent = t;
  };
}
function Io(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function No(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Io(en(this, "text", t))
      : Co(t == null ? "" : t + "")
  );
}
function Po(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Ao(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Po(i)), n;
  }
  return (r._value = t), r;
}
function ko(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ao(t));
}
function To() {
  for (
    var t = this._name,
      n = this._id,
      e = ie(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = N(a, n);
        kt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new O(r, this._parents, t, e);
}
function So() {
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
      var l = L(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var Mo = 0;
function O(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function ie() {
  return ++Mo;
}
var R = at.prototype;
O.prototype = {
  constructor: O,
  select: ho,
  selectAll: po,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: oo,
  merge: so,
  selection: _o,
  transition: To,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: lo,
  attr: qi,
  attrTween: Ki,
  style: wo,
  styleTween: $o,
  text: No,
  textTween: ko,
  remove: fo,
  tween: Oi,
  delay: Qi,
  duration: to,
  ease: eo,
  easeVarying: io,
  end: So,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Lo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ro = { time: null, delay: 0, duration: 250, ease: Lo };
function Oo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Do(t) {
  var n, e;
  t instanceof O
    ? ((n = t._id), (t = t._name))
    : ((n = ie()), ((e = Ro).time = tn()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && kt(a, t, n, l, s, e || Oo(a, n));
  return new O(r, this._parents, t, n);
}
at.prototype.interrupt = Mi;
at.prototype.transition = Do;
const Kt = Math.PI,
  Wt = 2 * Kt,
  H = 1e-6,
  Bo = Wt - H;
function oe(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Go(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return oe;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Xo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? oe : Go(n));
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
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > H)
      if (!(Math.abs(h * a - l * u) > H) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          C = p * p + _ * _,
          z = Math.sqrt(m),
          P = Math.sqrt(f),
          A = o * Math.tan((Kt - Math.acos((m + f - C) / (2 * z * P))) / 2),
          d = A / P,
          g = A / z;
        Math.abs(d - 1) > H && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
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
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > H || Math.abs(this._y1 - u) > H) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Wt) + Wt),
        f > Bo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Kt)},${h},${(this._x1 =
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
function Ho(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Fo(t, n) {
  return fetch(t, n).then(Ho);
}
function qo(t) {
  return (n, e) => Fo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Yo = qo("application/xml");
function nt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
nt.prototype = {
  constructor: nt,
  scale: function (t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
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
nt.prototype;
class Tt {
  constructor(n, e, r, i, o, s, c) {
    gn(this, "dragged", (n) => {
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
    if (x("#" + this.id).node() != null) return;
    const n = await Yo(this.url);
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
      this.sensor.node().append(x(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          ei()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    x(this).raise().classed("active", !0);
  }
  dragended(n) {
    x(this).classed("active", !1);
  }
}
const rn = [
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
  G = {
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
  se = ["path26583", "path26585"],
  gt = { path26583: "+ve Terminal of LED", path26585: "-ve Terminal of LED" },
  Vo = ["res_1", "res_2"],
  _t = { res_1: "Resister", res_2: "Resister" },
  ce = ["pin1", "pin2", "pin3", "pin4"],
  mt = {
    pin1: "Push-Button",
    pin2: "Push-Button",
    pin3: "Push-Button",
    pin4: "Push-Button",
  };
class zo {
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
      const e = G[this.connections[this.connections.length - 2].connector]
          ? `${
              G[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : _t[this.connections[this.connections.length - 2].connector]
          ? _t[this.connections[this.connections.length - 2].connector]
          : mt[this.connections[this.connections.length - 2].connector]
          ? mt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = G[this.connections[this.connections.length - 1].connector]
          ? `${
              G[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : _t[this.connections[this.connections.length - 1].connector]
          ? _t[this.connections[this.connections.length - 1].connector]
          : mt[this.connections[this.connections.length - 1].connector]
          ? mt[this.connections[this.connections.length - 1].connector]
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
class Uo {
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
const Ko = (t, n) => {
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
          G[i.connector] == "GND")
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
          (o = G[i.connector]) != null &&
          o.includes("GPIO") &&
          G[i.connector].includes(document.querySelector("#ledPin").value)
        ) {
          r++;
          return;
        }
      }),
      n ? (console.log(r), r == 9) : { error: "Button is not pushed" }
    );
  },
  S = x("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Wo = new Tt("raspberry", S, "images/pi3dirk.svg", 1, !1),
  Zo = new Tt(
    "resistorComponent",
    S,
    "images/resistor.svg",
    0.1,
    !1,
    300,
    250
  ),
  Qo = new Tt("led", S, "images/led.svg", 0.3, !1, 500, 80),
  Jo = new Tt("push_button", S, "images/pushButton.svg", 2, !1, 300, 20),
  on = S.append("g").attr("id", "pathsGroup"),
  St = {
    rasberryPi:
      "Raspberry Pi: Acts as the power source and controller. A GPIO pin is connected to the push button to detect input, and another GPIO pin is connected to the LED anode to control its state. GND pins are used to complete the circuit.",
    ledlight:
      "LED: Emits light when current flows through it. The anode (longer leg) is connected to a Raspberry Pi GPIO pin, while the cathode (shorter leg) is connected to a resistor to limit current.",
    resistor:
      "Resistor: Limits current to protect the LED. One end is connected to the LED cathode, and the other end is connected to a Raspberry Pi GND pin.",
    pushButton:
      "Push Button: Acts as an input device. One pin is connected to a Raspberry Pi GPIO pin to detect presses, and the other pin is connected to a GND pin.",
  },
  sn = document.getElementById("rasberryPi"),
  cn = document.getElementById("ledlight"),
  an = document.getElementById("resistor"),
  ln = document.getElementById("pushButton"),
  M = document.getElementById("componentDescription"),
  ae = document.getElementById("displayInfo"),
  jo = document.getElementById("codeSubmit"),
  ts = document.getElementById("undoButton");
sn.addEventListener("click", async () => await Wo.load());
cn.addEventListener("click", () => Qo.load());
an.addEventListener("click", () => Zo.load());
let Nt = !1;
ln.addEventListener("click", async () => {
  await Jo.load(),
    x("#push_button").on("click", () => {
      if (x("#pressButton").node() != null) {
        x("#pressButton").remove(), (Nt = !0), et && un("#ledLight");
        return;
      }
      x("#push_button")
        .append("path")
        .attr("id", "pressButton")
        .attr(
          "d",
          "M15 17C15 19.2091 13.2091 21 11 21C8.79086 21 7 19.2091 7 17C7 14.7909 8.79086 13 11 13C13.2091 13 15 14.7909 15 17Z"
        )
        .attr("fill", "black")
        .attr("fill-opacity", "0.54"),
        (Nt = !1);
    });
});
sn.addEventListener("mouseover", () => {
  (M.textContent = St.rasberryPi), (M.style.display = "block");
});
cn.addEventListener("mouseover", () => {
  (M.textContent = St.ledlight), (M.style.display = "block");
});
an.addEventListener("mouseover", () => {
  (M.textContent = St.resistor), (M.style.display = "block");
});
ln.addEventListener("mouseover", () => {
  (M.textContent = St.pushButton), (M.style.display = "block");
});
[sn, cn, an, ln].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (M.textContent = "Hover over a component to see its description."),
      (M.style.display = "none");
  });
});
const Bt = (t) =>
    rn.includes(t.srcElement.id) ||
    se.includes(t.srcElement.id) ||
    Vo.includes(t.srcElement.id) ||
    ce.includes(t.srcElement.id),
  Mn = (t, n) => {
    on.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  };
let $;
const X = new zo("connectionLog"),
  Gt = new Uo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let F = 0,
  et;
const un = (t) => {
    if (!Nt) return;
    const n = document.getElementById("ledColor").value,
      e = x(t).attr("fill") || "white";
    x(t)
      .transition()
      .duration(1e3)
      .attr("fill", n)
      .transition()
      .duration(1e3)
      .attr("fill", e)
      .on("end", () => un(t));
  },
  ns = (t) => {
    on.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  es = () => {
    if ($) {
      on
        .selectAll(`path[id^="path${F}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        ($ = null),
        (F = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (X.connections.length > 0) {
      const n = X.connections[X.connections.length - 1].lineID;
      ns(n),
        X.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
ts.addEventListener("click", () => {
  X.undoLastConnection(), es();
});
S.on("dblclick", (t) => {
  if (Bt(t) && !$) {
    ($ = new Xo()),
      $.moveTo(t.offsetX, t.offsetY),
      X.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      S.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Bt(t)) {
    $ &&
      ($.lineTo(t.offsetX, t.offsetY),
      Mn($.toString(), `path${F}`),
      console.log("Path segment added"));
    return;
  }
  if (Bt(t) && $) {
    $.lineTo(t.offsetX, t.offsetY),
      Mn($.toString(), `path${F}`),
      X.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      F++,
      S.style("cursor", "default"),
      ($ = null),
      console.log("Path completed");
    return;
  }
});
S.on("mouseover", (t) => {
  rn.includes(t.srcElement.id) && (ae.innerHTML = G[t.srcElement.id]);
});
S.on("mouseout", (t) => {
  (rn.includes(t.srcElement.id) ||
    se.includes(t.srcElement.id) ||
    ce.includes(t.srcElement.id)) &&
    (ae.innerHTML = "CONNECTOR INFO");
});
jo.addEventListener("click", () => {
  if (!document.getElementById("ledColor").value) {
    Gt.throw("Error", "Please select an LED color.");
    return;
  }
  (et = Ko(X.getConnectionLog(), Nt)),
    et === !0
      ? (un("#ledLight"), document.querySelector("#my-drawer-4").click())
      : et.error
      ? Gt.throw("Error", et.error)
      : Gt.throw(
          "Error",
          "Please connect the components properly. Refer to the connection diagram."
        );
});
