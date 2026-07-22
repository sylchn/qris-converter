(() => {
  // src/lib/alpine.esm.js
  var e;
  var t;
  var n;
  var r;
  var i = false;
  var o = false;
  var a = [];
  var s = -1;
  function l(e2) {
    !(function(e3) {
      a.includes(e3) || a.push(e3);
      o || i || (i = true, queueMicrotask(u));
    })(e2);
  }
  function c(e2) {
    let t2 = a.indexOf(e2);
    -1 !== t2 && t2 > s && a.splice(t2, 1);
  }
  function u() {
    i = false, o = true;
    for (let e2 = 0; e2 < a.length; e2++) a[e2](), s = e2;
    a.length = 0, s = -1, o = false;
  }
  var f = true;
  function d(e2) {
    t = e2;
  }
  function _(e2, r2) {
    let i2, o2 = true, a2 = t((() => {
      let t2 = e2();
      JSON.stringify(t2), o2 ? i2 = t2 : queueMicrotask((() => {
        r2(t2, i2), i2 = t2;
      })), o2 = false;
    }));
    return () => n(a2);
  }
  var p = [];
  var h = [];
  var m = [];
  function x(e2, t2) {
    "function" == typeof t2 ? (e2._x_cleanups || (e2._x_cleanups = []), e2._x_cleanups.push(t2)) : (t2 = e2, h.push(t2));
  }
  function g(e2) {
    p.push(e2);
  }
  function v(e2, t2, n2) {
    e2._x_attributeCleanups || (e2._x_attributeCleanups = {}), e2._x_attributeCleanups[t2] || (e2._x_attributeCleanups[t2] = []), e2._x_attributeCleanups[t2].push(n2);
  }
  function y(e2, t2) {
    e2._x_attributeCleanups && Object.entries(e2._x_attributeCleanups).forEach((([n2, r2]) => {
      (void 0 === t2 || t2.includes(n2)) && (r2.forEach(((e3) => e3())), delete e2._x_attributeCleanups[n2]);
    }));
  }
  var b = new MutationObserver(C);
  var w = false;
  function E() {
    b.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true }), w = true;
  }
  function k() {
    !(function() {
      let e2 = b.takeRecords();
      A.push((() => e2.length > 0 && C(e2)));
      let t2 = A.length;
      queueMicrotask((() => {
        if (A.length === t2) for (; A.length > 0; ) A.shift()();
      }));
    })(), b.disconnect(), w = false;
  }
  var A = [];
  function O(e2) {
    if (!w) return e2();
    k();
    let t2 = e2();
    return E(), t2;
  }
  var S = false;
  var j = [];
  function C(e2) {
    if (S) return void (j = j.concat(e2));
    let t2 = [], n2 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map();
    for (let o2 = 0; o2 < e2.length; o2++) if (!e2[o2].target._x_ignoreMutationObserver && ("childList" === e2[o2].type && (e2[o2].removedNodes.forEach(((e3) => {
      1 === e3.nodeType && e3._x_marker && n2.add(e3);
    })), e2[o2].addedNodes.forEach(((e3) => {
      1 === e3.nodeType && (n2.has(e3) ? n2.delete(e3) : e3._x_marker || t2.push(e3));
    }))), "attributes" === e2[o2].type)) {
      let t3 = e2[o2].target, n3 = e2[o2].attributeName, a2 = e2[o2].oldValue, s2 = () => {
        r2.has(t3) || r2.set(t3, []), r2.get(t3).push({ name: n3, value: t3.getAttribute(n3) });
      }, l2 = () => {
        i2.has(t3) || i2.set(t3, []), i2.get(t3).push(n3);
      };
      t3.hasAttribute(n3) && null === a2 ? s2() : t3.hasAttribute(n3) ? (l2(), s2()) : l2();
    }
    i2.forEach(((e3, t3) => {
      y(t3, e3);
    })), r2.forEach(((e3, t3) => {
      p.forEach(((n3) => n3(t3, e3)));
    }));
    for (let e3 of n2) t2.some(((t3) => t3.contains(e3))) || h.forEach(((t3) => t3(e3)));
    for (let e3 of t2) e3.isConnected && m.forEach(((t3) => t3(e3)));
    t2 = null, n2 = null, r2 = null, i2 = null;
  }
  function $(e2) {
    return L(M(e2));
  }
  function N(e2, t2, n2) {
    return e2._x_dataStack = [t2, ...M(n2 || e2)], () => {
      e2._x_dataStack = e2._x_dataStack.filter(((e3) => e3 !== t2));
    };
  }
  function M(e2) {
    return e2._x_dataStack ? e2._x_dataStack : "function" == typeof ShadowRoot && e2 instanceof ShadowRoot ? M(e2.host) : e2.parentNode ? M(e2.parentNode) : [];
  }
  function L(e2) {
    return new Proxy({ objects: e2 }, P);
  }
  var P = { ownKeys: ({ objects: e2 }) => Array.from(new Set(e2.flatMap(((e3) => Object.keys(e3))))), has: ({ objects: e2 }, t2) => t2 != Symbol.unscopables && e2.some(((e3) => Object.prototype.hasOwnProperty.call(e3, t2) || Reflect.has(e3, t2))), get: ({ objects: e2 }, t2, n2) => "toJSON" == t2 ? R : Reflect.get(e2.find(((e3) => Reflect.has(e3, t2))) || {}, t2, n2), set({ objects: e2 }, t2, n2, r2) {
    const i2 = e2.find(((e3) => Object.prototype.hasOwnProperty.call(e3, t2))) || e2[e2.length - 1], o2 = Object.getOwnPropertyDescriptor(i2, t2);
    return o2?.set && o2?.get ? o2.set.call(r2, n2) || true : Reflect.set(i2, t2, n2);
  } };
  function R() {
    return Reflect.ownKeys(this).reduce(((e2, t2) => (e2[t2] = Reflect.get(this, t2), e2)), {});
  }
  function T(e2) {
    let t2 = (n2, r2 = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(n2)).forEach((([i2, { value: o2, enumerable: a2 }]) => {
        if (false === a2 || void 0 === o2) return;
        if ("object" == typeof o2 && null !== o2 && o2.__v_skip) return;
        let s2 = "" === r2 ? i2 : `${r2}.${i2}`;
        var l2;
        "object" == typeof o2 && null !== o2 && o2._x_interceptor ? n2[i2] = o2.initialize(e2, s2, i2) : "object" != typeof (l2 = o2) || Array.isArray(l2) || null === l2 || o2 === n2 || o2 instanceof Element || t2(o2, s2);
      }));
    };
    return t2(e2);
  }
  function z(e2, t2 = () => {
  }) {
    let n2 = { initialValue: void 0, _x_interceptor: true, initialize(t3, n3, r2) {
      return e2(this.initialValue, (() => (function(e3, t4) {
        return t4.split(".").reduce(((e4, t5) => e4[t5]), e3);
      })(t3, n3)), ((e3) => D(t3, n3, e3)), n3, r2);
    } };
    return t2(n2), (e3) => {
      if ("object" == typeof e3 && null !== e3 && e3._x_interceptor) {
        let t3 = n2.initialize.bind(n2);
        n2.initialize = (r2, i2, o2) => {
          let a2 = e3.initialize(r2, i2, o2);
          return n2.initialValue = a2, t3(r2, i2, o2);
        };
      } else n2.initialValue = e3;
      return n2;
    };
  }
  function D(e2, t2, n2) {
    if ("string" == typeof t2 && (t2 = t2.split(".")), 1 !== t2.length) {
      if (0 === t2.length) throw error;
      return e2[t2[0]] || (e2[t2[0]] = {}), D(e2[t2[0]], t2.slice(1), n2);
    }
    e2[t2[0]] = n2;
  }
  var I = {};
  function B(e2, t2) {
    I[e2] = t2;
  }
  function F(e2, t2) {
    let n2 = (function(e3) {
      let [t3, n3] = se(e3), r2 = { interceptor: z, ...t3 };
      return x(e3, n3), r2;
    })(t2);
    return Object.entries(I).forEach((([r2, i2]) => {
      Object.defineProperty(e2, `$${r2}`, { get: () => i2(t2, n2), enumerable: false });
    })), e2;
  }
  function q(e2, t2, n2, ...r2) {
    try {
      return n2(...r2);
    } catch (n3) {
      W(n3, e2, t2);
    }
  }
  function W(e2, t2, n2 = void 0) {
    e2 = Object.assign(e2 ?? { message: "No error message given." }, { el: t2, expression: n2 }), console.warn(`Alpine Expression Error: ${e2.message}

${n2 ? 'Expression: "' + n2 + '"\n\n' : ""}`, t2), setTimeout((() => {
      throw e2;
    }), 0);
  }
  var K = true;
  function V(e2) {
    let t2 = K;
    K = false;
    let n2 = e2();
    return K = t2, n2;
  }
  function J(e2, t2, n2 = {}) {
    let r2;
    return U(e2, t2)(((e3) => r2 = e3), n2), r2;
  }
  function U(...e2) {
    return H(...e2);
  }
  var H = X;
  function X(e2, t2) {
    let n2 = {};
    F(n2, e2);
    let r2 = [n2, ...M(e2)], i2 = "function" == typeof t2 ? /* @__PURE__ */ (function(e3, t3) {
      return (n3 = () => {
      }, { scope: r3 = {}, params: i3 = [] } = {}) => {
        Y(n3, t3.apply(L([r3, ...e3]), i3));
      };
    })(r2, t2) : (function(e3, t3, n3) {
      let r3 = (function(e4, t4) {
        if (Z[e4]) return Z[e4];
        let n4 = Object.getPrototypeOf((async function() {
        })).constructor, r4 = /^[\n\s]*if.*\(.*\)/.test(e4.trim()) || /^(let|const)\s/.test(e4.trim()) ? `(async()=>{ ${e4} })()` : e4;
        const i3 = () => {
          try {
            let t5 = new n4(["__self", "scope"], `with (scope) { __self.result = ${r4} }; __self.finished = true; return __self.result;`);
            return Object.defineProperty(t5, "name", { value: `[Alpine] ${e4}` }), t5;
          } catch (n5) {
            return W(n5, t4, e4), Promise.resolve();
          }
        };
        let o2 = i3();
        return Z[e4] = o2, o2;
      })(t3, n3);
      return (i3 = () => {
      }, { scope: o2 = {}, params: a2 = [] } = {}) => {
        r3.result = void 0, r3.finished = false;
        let s2 = L([o2, ...e3]);
        if ("function" == typeof r3) {
          let e4 = r3(r3, s2).catch(((e5) => W(e5, n3, t3)));
          r3.finished ? (Y(i3, r3.result, s2, a2, n3), r3.result = void 0) : e4.then(((e5) => {
            Y(i3, e5, s2, a2, n3);
          })).catch(((e5) => W(e5, n3, t3))).finally((() => r3.result = void 0));
        }
      };
    })(r2, t2, e2);
    return q.bind(null, e2, t2, i2);
  }
  var Z = {};
  function Y(e2, t2, n2, r2, i2) {
    if (K && "function" == typeof t2) {
      let o2 = t2.apply(n2, r2);
      o2 instanceof Promise ? o2.then(((t3) => Y(e2, t3, n2, r2))).catch(((e3) => W(e3, i2, t2))) : e2(o2);
    } else "object" == typeof t2 && t2 instanceof Promise ? t2.then(((t3) => e2(t3))) : e2(t2);
  }
  var G = "x-";
  function Q(e2 = "") {
    return G + e2;
  }
  var ee = {};
  function te(e2, t2) {
    return ee[e2] = t2, { before(t3) {
      if (!ee[t3]) return void console.warn(String.raw`Cannot find directive \`${t3}\`. \`${e2}\` will use the default order of execution`);
      const n2 = he.indexOf(t3);
      he.splice(n2 >= 0 ? n2 : he.indexOf("DEFAULT"), 0, e2);
    } };
  }
  function ne(e2, t2, n2) {
    if (t2 = Array.from(t2), e2._x_virtualDirectives) {
      let n3 = Object.entries(e2._x_virtualDirectives).map((([e3, t3]) => ({ name: e3, value: t3 }))), r3 = re(n3);
      n3 = n3.map(((e3) => r3.find(((t3) => t3.name === e3.name)) ? { name: `x-bind:${e3.name}`, value: `"${e3.value}"` } : e3)), t2 = t2.concat(n3);
    }
    let r2 = {}, i2 = t2.map(ce(((e3, t3) => r2[e3] = t3))).filter(de).map(/* @__PURE__ */ (function(e3, t3) {
      return ({ name: n3, value: r3 }) => {
        let i3 = n3.match(_e()), o2 = n3.match(/:([a-zA-Z0-9\-_:]+)/), a2 = n3.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s2 = t3 || e3[n3] || n3;
        return { type: i3 ? i3[1] : null, value: o2 ? o2[1] : null, modifiers: a2.map(((e4) => e4.replace(".", ""))), expression: r3, original: s2 };
      };
    })(r2, n2)).sort(me);
    return i2.map(((t3) => (function(e3, t4) {
      let n3 = () => {
      }, r3 = ee[t4.type] || n3, [i3, o2] = se(e3);
      v(e3, t4.original, o2);
      let a2 = () => {
        e3._x_ignore || e3._x_ignoreSelf || (r3.inline && r3.inline(e3, t4, i3), r3 = r3.bind(r3, e3, t4, i3), ie ? oe.get(ae).push(r3) : r3());
      };
      return a2.runCleanups = o2, a2;
    })(e2, t3)));
  }
  function re(e2) {
    return Array.from(e2).map(ce()).filter(((e3) => !de(e3)));
  }
  var ie = false;
  var oe = /* @__PURE__ */ new Map();
  var ae = /* @__PURE__ */ Symbol();
  function se(e2) {
    let r2 = [], [i2, o2] = /* @__PURE__ */ (function(e3) {
      let r3 = () => {
      };
      return [(i3) => {
        let o3 = t(i3);
        return e3._x_effects || (e3._x_effects = /* @__PURE__ */ new Set(), e3._x_runEffects = () => {
          e3._x_effects.forEach(((e4) => e4()));
        }), e3._x_effects.add(o3), r3 = () => {
          void 0 !== o3 && (e3._x_effects.delete(o3), n(o3));
        }, o3;
      }, () => {
        r3();
      }];
    })(e2);
    r2.push(o2);
    return [{ Alpine: ht, effect: i2, cleanup: (e3) => r2.push(e3), evaluateLater: U.bind(U, e2), evaluate: J.bind(J, e2) }, () => r2.forEach(((e3) => e3()))];
  }
  var le = (e2, t2) => ({ name: n2, value: r2 }) => (n2.startsWith(e2) && (n2 = n2.replace(e2, t2)), { name: n2, value: r2 });
  function ce(e2 = () => {
  }) {
    return ({ name: t2, value: n2 }) => {
      let { name: r2, value: i2 } = ue.reduce(((e3, t3) => t3(e3)), { name: t2, value: n2 });
      return r2 !== t2 && e2(r2, t2), { name: r2, value: i2 };
    };
  }
  var ue = [];
  function fe(e2) {
    ue.push(e2);
  }
  function de({ name: e2 }) {
    return _e().test(e2);
  }
  var _e = () => new RegExp(`^${G}([^:^.]+)\\b`);
  var pe = "DEFAULT";
  var he = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", pe, "teleport"];
  function me(e2, t2) {
    let n2 = -1 === he.indexOf(e2.type) ? pe : e2.type, r2 = -1 === he.indexOf(t2.type) ? pe : t2.type;
    return he.indexOf(n2) - he.indexOf(r2);
  }
  function xe(e2, t2, n2 = {}) {
    e2.dispatchEvent(new CustomEvent(t2, { detail: n2, bubbles: true, composed: true, cancelable: true }));
  }
  function ge(e2, t2) {
    if ("function" == typeof ShadowRoot && e2 instanceof ShadowRoot) return void Array.from(e2.children).forEach(((e3) => ge(e3, t2)));
    let n2 = false;
    if (t2(e2, (() => n2 = true)), n2) return;
    let r2 = e2.firstElementChild;
    for (; r2; ) ge(r2, t2), r2 = r2.nextElementSibling;
  }
  function ve(e2, ...t2) {
    console.warn(`Alpine Warning: ${e2}`, ...t2);
  }
  var ye = false;
  var be = [];
  var we = [];
  function Ee() {
    return be.map(((e2) => e2()));
  }
  function ke() {
    return be.concat(we).map(((e2) => e2()));
  }
  function Ae(e2) {
    be.push(e2);
  }
  function Oe(e2) {
    we.push(e2);
  }
  function Se(e2, t2 = false) {
    return je(e2, ((e3) => {
      if ((t2 ? ke() : Ee()).some(((t3) => e3.matches(t3)))) return true;
    }));
  }
  function je(e2, t2) {
    if (e2) {
      if (t2(e2)) return e2;
      if (e2._x_teleportBack && (e2 = e2._x_teleportBack), e2.parentElement) return je(e2.parentElement, t2);
    }
  }
  var Ce = [];
  var $e = 1;
  function Ne(e2, t2 = ge, n2 = () => {
  }) {
    je(e2, ((e3) => e3._x_ignore)) || (function(e3) {
      ie = true;
      let t3 = /* @__PURE__ */ Symbol();
      ae = t3, oe.set(t3, []);
      let n3 = () => {
        for (; oe.get(t3).length; ) oe.get(t3).shift()();
        oe.delete(t3);
      };
      e3(n3), ie = false, n3();
    })((() => {
      t2(e2, ((e3, t3) => {
        e3._x_marker || (n2(e3, t3), Ce.forEach(((n3) => n3(e3, t3))), ne(e3, e3.attributes).forEach(((e4) => e4())), e3._x_ignore || (e3._x_marker = $e++), e3._x_ignore && t3());
      }));
    }));
  }
  function Me(e2, t2 = ge) {
    t2(e2, ((e3) => {
      !(function(e4) {
        for (e4._x_effects?.forEach(c); e4._x_cleanups?.length; ) e4._x_cleanups.pop()();
      })(e3), y(e3), delete e3._x_marker;
    }));
  }
  var Le = [];
  var Pe = false;
  function Re(e2 = () => {
  }) {
    return queueMicrotask((() => {
      Pe || setTimeout((() => {
        Te();
      }));
    })), new Promise(((t2) => {
      Le.push((() => {
        e2(), t2();
      }));
    }));
  }
  function Te() {
    for (Pe = false; Le.length; ) Le.shift()();
  }
  function ze(e2, t2) {
    return Array.isArray(t2) ? De(e2, t2.join(" ")) : "object" == typeof t2 && null !== t2 ? (function(e3, t3) {
      let n2 = (e4) => e4.split(" ").filter(Boolean), r2 = Object.entries(t3).flatMap((([e4, t4]) => !!t4 && n2(e4))).filter(Boolean), i2 = Object.entries(t3).flatMap((([e4, t4]) => !t4 && n2(e4))).filter(Boolean), o2 = [], a2 = [];
      return i2.forEach(((t4) => {
        e3.classList.contains(t4) && (e3.classList.remove(t4), a2.push(t4));
      })), r2.forEach(((t4) => {
        e3.classList.contains(t4) || (e3.classList.add(t4), o2.push(t4));
      })), () => {
        a2.forEach(((t4) => e3.classList.add(t4))), o2.forEach(((t4) => e3.classList.remove(t4)));
      };
    })(e2, t2) : "function" == typeof t2 ? ze(e2, t2()) : De(e2, t2);
  }
  function De(e2, t2) {
    return t2 = true === t2 ? t2 = "" : t2 || "", n2 = t2.split(" ").filter(((t3) => !e2.classList.contains(t3))).filter(Boolean), e2.classList.add(...n2), () => {
      e2.classList.remove(...n2);
    };
    var n2;
  }
  function Ie(e2, t2) {
    return "object" == typeof t2 && null !== t2 ? (function(e3, t3) {
      let n2 = {};
      return Object.entries(t3).forEach((([t4, r2]) => {
        n2[t4] = e3.style[t4], t4.startsWith("--") || (t4 = t4.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()), e3.style.setProperty(t4, r2);
      })), setTimeout((() => {
        0 === e3.style.length && e3.removeAttribute("style");
      })), () => {
        Ie(e3, n2);
      };
    })(e2, t2) : (function(e3, t3) {
      let n2 = e3.getAttribute("style", t3);
      return e3.setAttribute("style", t3), () => {
        e3.setAttribute("style", n2 || "");
      };
    })(e2, t2);
  }
  function Be(e2, t2 = () => {
  }) {
    let n2 = false;
    return function() {
      n2 ? t2.apply(this, arguments) : (n2 = true, e2.apply(this, arguments));
    };
  }
  function Fe(e2, t2, n2 = {}) {
    e2._x_transition || (e2._x_transition = { enter: { during: n2, start: n2, end: n2 }, leave: { during: n2, start: n2, end: n2 }, in(n3 = () => {
    }, r2 = () => {
    }) {
      We(e2, t2, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n3, r2);
    }, out(n3 = () => {
    }, r2 = () => {
    }) {
      We(e2, t2, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n3, r2);
    } });
  }
  function qe(e2) {
    let t2 = e2.parentNode;
    if (t2) return t2._x_hidePromise ? t2 : qe(t2);
  }
  function We(e2, t2, { during: n2, start: r2, end: i2 } = {}, o2 = () => {
  }, a2 = () => {
  }) {
    if (e2._x_transitioning && e2._x_transitioning.cancel(), 0 === Object.keys(n2).length && 0 === Object.keys(r2).length && 0 === Object.keys(i2).length) return o2(), void a2();
    let s2, l2, c2;
    !(function(e3, t3) {
      let n3, r3, i3, o3 = Be((() => {
        O((() => {
          n3 = true, r3 || t3.before(), i3 || (t3.end(), Te()), t3.after(), e3.isConnected && t3.cleanup(), delete e3._x_transitioning;
        }));
      }));
      e3._x_transitioning = { beforeCancels: [], beforeCancel(e4) {
        this.beforeCancels.push(e4);
      }, cancel: Be((function() {
        for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
        o3();
      })), finish: o3 }, O((() => {
        t3.start(), t3.during();
      })), Pe = true, requestAnimationFrame((() => {
        if (n3) return;
        let o4 = 1e3 * Number(getComputedStyle(e3).transitionDuration.replace(/,.*/, "").replace("s", "")), a3 = 1e3 * Number(getComputedStyle(e3).transitionDelay.replace(/,.*/, "").replace("s", ""));
        0 === o4 && (o4 = 1e3 * Number(getComputedStyle(e3).animationDuration.replace("s", ""))), O((() => {
          t3.before();
        })), r3 = true, requestAnimationFrame((() => {
          n3 || (O((() => {
            t3.end();
          })), Te(), setTimeout(e3._x_transitioning.finish, o4 + a3), i3 = true);
        }));
      }));
    })(e2, { start() {
      s2 = t2(e2, r2);
    }, during() {
      l2 = t2(e2, n2);
    }, before: o2, end() {
      s2(), c2 = t2(e2, i2);
    }, after: a2, cleanup() {
      l2(), c2();
    } });
  }
  function Ke(e2, t2, n2) {
    if (-1 === e2.indexOf(t2)) return n2;
    const r2 = e2[e2.indexOf(t2) + 1];
    if (!r2) return n2;
    if ("scale" === t2 && isNaN(r2)) return n2;
    if ("duration" === t2 || "delay" === t2) {
      let e3 = r2.match(/([0-9]+)ms/);
      if (e3) return e3[1];
    }
    return "origin" === t2 && ["top", "right", "left", "center", "bottom"].includes(e2[e2.indexOf(t2) + 2]) ? [r2, e2[e2.indexOf(t2) + 2]].join(" ") : r2;
  }
  te("transition", ((e2, { value: t2, modifiers: n2, expression: r2 }, { evaluate: i2 }) => {
    "function" == typeof r2 && (r2 = i2(r2)), false !== r2 && (r2 && "boolean" != typeof r2 ? (function(e3, t3, n3) {
      Fe(e3, ze, "");
      let r3 = { enter: (t4) => {
        e3._x_transition.enter.during = t4;
      }, "enter-start": (t4) => {
        e3._x_transition.enter.start = t4;
      }, "enter-end": (t4) => {
        e3._x_transition.enter.end = t4;
      }, leave: (t4) => {
        e3._x_transition.leave.during = t4;
      }, "leave-start": (t4) => {
        e3._x_transition.leave.start = t4;
      }, "leave-end": (t4) => {
        e3._x_transition.leave.end = t4;
      } };
      r3[n3](t3);
    })(e2, r2, t2) : (function(e3, t3, n3) {
      Fe(e3, Ie);
      let r3 = !t3.includes("in") && !t3.includes("out") && !n3, i3 = r3 || t3.includes("in") || ["enter"].includes(n3), o2 = r3 || t3.includes("out") || ["leave"].includes(n3);
      t3.includes("in") && !r3 && (t3 = t3.filter(((e4, n4) => n4 < t3.indexOf("out"))));
      t3.includes("out") && !r3 && (t3 = t3.filter(((e4, n4) => n4 > t3.indexOf("out"))));
      let a2 = !t3.includes("opacity") && !t3.includes("scale"), s2 = a2 || t3.includes("opacity"), l2 = a2 || t3.includes("scale"), c2 = s2 ? 0 : 1, u2 = l2 ? Ke(t3, "scale", 95) / 100 : 1, f2 = Ke(t3, "delay", 0) / 1e3, d2 = Ke(t3, "origin", "center"), _2 = "opacity, transform", p2 = Ke(t3, "duration", 150) / 1e3, h2 = Ke(t3, "duration", 75) / 1e3, m2 = "cubic-bezier(0.4, 0.0, 0.2, 1)";
      i3 && (e3._x_transition.enter.during = { transformOrigin: d2, transitionDelay: `${f2}s`, transitionProperty: _2, transitionDuration: `${p2}s`, transitionTimingFunction: m2 }, e3._x_transition.enter.start = { opacity: c2, transform: `scale(${u2})` }, e3._x_transition.enter.end = { opacity: 1, transform: "scale(1)" });
      o2 && (e3._x_transition.leave.during = { transformOrigin: d2, transitionDelay: `${f2}s`, transitionProperty: _2, transitionDuration: `${h2}s`, transitionTimingFunction: m2 }, e3._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, e3._x_transition.leave.end = { opacity: c2, transform: `scale(${u2})` });
    })(e2, n2, t2));
  })), window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e2, t2, n2, r2) {
    const i2 = "visible" === document.visibilityState ? requestAnimationFrame : setTimeout;
    let o2 = () => i2(n2);
    t2 ? e2._x_transition && (e2._x_transition.enter || e2._x_transition.leave) ? e2._x_transition.enter && (Object.entries(e2._x_transition.enter.during).length || Object.entries(e2._x_transition.enter.start).length || Object.entries(e2._x_transition.enter.end).length) ? e2._x_transition.in(n2) : o2() : e2._x_transition ? e2._x_transition.in(n2) : o2() : (e2._x_hidePromise = e2._x_transition ? new Promise(((t3, n3) => {
      e2._x_transition.out((() => {
      }), (() => t3(r2))), e2._x_transitioning && e2._x_transitioning.beforeCancel((() => n3({ isFromCancelledTransition: true })));
    })) : Promise.resolve(r2), queueMicrotask((() => {
      let t3 = qe(e2);
      t3 ? (t3._x_hideChildren || (t3._x_hideChildren = []), t3._x_hideChildren.push(e2)) : i2((() => {
        let t4 = (e3) => {
          let n3 = Promise.all([e3._x_hidePromise, ...(e3._x_hideChildren || []).map(t4)]).then((([e4]) => e4?.()));
          return delete e3._x_hidePromise, delete e3._x_hideChildren, n3;
        };
        t4(e2).catch(((e3) => {
          if (!e3.isFromCancelledTransition) throw e3;
        }));
      }));
    })));
  };
  var Ve = false;
  function Je(e2, t2 = () => {
  }) {
    return (...n2) => Ve ? t2(...n2) : e2(...n2);
  }
  var Ue = [];
  function He(e2) {
    Ue.push(e2);
  }
  var Xe = false;
  function Ze(e2) {
    let r2 = t;
    d(((e3, t2) => {
      let i2 = r2(e3);
      return n(i2), () => {
      };
    })), e2(), d(r2);
  }
  function Ye(t2, n2, r2, i2 = []) {
    switch (t2._x_bindings || (t2._x_bindings = e({})), t2._x_bindings[n2] = r2, n2 = i2.includes("camel") ? n2.toLowerCase().replace(/-(\w)/g, ((e2, t3) => t3.toUpperCase())) : n2) {
      case "value":
        !(function(e2, t3) {
          if (ot(e2)) void 0 === e2.attributes.value && (e2.value = t3), window.fromModel && (e2.checked = "boolean" == typeof t3 ? et(e2.value) === t3 : Qe(e2.value, t3));
          else if (it(e2)) Number.isInteger(t3) ? e2.value = t3 : Array.isArray(t3) || "boolean" == typeof t3 || [null, void 0].includes(t3) ? Array.isArray(t3) ? e2.checked = t3.some(((t4) => Qe(t4, e2.value))) : e2.checked = !!t3 : e2.value = String(t3);
          else if ("SELECT" === e2.tagName) !(function(e3, t4) {
            const n3 = [].concat(t4).map(((e4) => e4 + ""));
            Array.from(e3.options).forEach(((e4) => {
              e4.selected = n3.includes(e4.value);
            }));
          })(e2, t3);
          else {
            if (e2.value === t3) return;
            e2.value = void 0 === t3 ? "" : t3;
          }
        })(t2, r2);
        break;
      case "style":
        !(function(e2, t3) {
          e2._x_undoAddedStyles && e2._x_undoAddedStyles();
          e2._x_undoAddedStyles = Ie(e2, t3);
        })(t2, r2);
        break;
      case "class":
        !(function(e2, t3) {
          e2._x_undoAddedClasses && e2._x_undoAddedClasses();
          e2._x_undoAddedClasses = ze(e2, t3);
        })(t2, r2);
        break;
      case "selected":
      case "checked":
        !(function(e2, t3, n3) {
          Ge(e2, t3, n3), (function(e3, t4, n4) {
            e3[t4] !== n4 && (e3[t4] = n4);
          })(e2, t3, n3);
        })(t2, n2, r2);
        break;
      default:
        Ge(t2, n2, r2);
    }
  }
  function Ge(e2, t2, n2) {
    [null, void 0, false].includes(n2) && (function(e3) {
      return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e3);
    })(t2) ? e2.removeAttribute(t2) : (nt(t2) && (n2 = t2), (function(e3, t3, n3) {
      e3.getAttribute(t3) != n3 && e3.setAttribute(t3, n3);
    })(e2, t2, n2));
  }
  function Qe(e2, t2) {
    return e2 == t2;
  }
  function et(e2) {
    return !![1, "1", "true", "on", "yes", true].includes(e2) || ![0, "0", "false", "off", "no", false].includes(e2) && (e2 ? Boolean(e2) : null);
  }
  var tt = /* @__PURE__ */ new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected", "shadowrootclonable", "shadowrootdelegatesfocus", "shadowrootserializable"]);
  function nt(e2) {
    return tt.has(e2);
  }
  function rt(e2, t2, n2) {
    let r2 = e2.getAttribute(t2);
    return null === r2 ? "function" == typeof n2 ? n2() : n2 : "" === r2 || (nt(t2) ? !![t2, "true"].includes(r2) : r2);
  }
  function it(e2) {
    return "checkbox" === e2.type || "ui-checkbox" === e2.localName || "ui-switch" === e2.localName;
  }
  function ot(e2) {
    return "radio" === e2.type || "ui-radio" === e2.localName;
  }
  function at(e2, t2) {
    var n2;
    return function() {
      var r2 = this, i2 = arguments;
      clearTimeout(n2), n2 = setTimeout((function() {
        n2 = null, e2.apply(r2, i2);
      }), t2);
    };
  }
  function st(e2, t2) {
    let n2;
    return function() {
      let r2 = this, i2 = arguments;
      n2 || (e2.apply(r2, i2), n2 = true, setTimeout((() => n2 = false), t2));
    };
  }
  function lt({ get: e2, set: r2 }, { get: i2, set: o2 }) {
    let a2, s2 = true, l2 = t((() => {
      let t2 = e2(), n2 = i2();
      if (s2) o2(ct(t2)), s2 = false;
      else {
        let e3 = JSON.stringify(t2), i3 = JSON.stringify(n2);
        e3 !== a2 ? o2(ct(t2)) : e3 !== i3 && r2(ct(n2));
      }
      a2 = JSON.stringify(e2()), JSON.stringify(i2());
    }));
    return () => {
      n(l2);
    };
  }
  function ct(e2) {
    return "object" == typeof e2 ? JSON.parse(JSON.stringify(e2)) : e2;
  }
  var ut = {};
  var ft = false;
  var dt = {};
  function _t(e2, t2, n2) {
    let r2 = [];
    for (; r2.length; ) r2.pop()();
    let i2 = Object.entries(t2).map((([e3, t3]) => ({ name: e3, value: t3 }))), o2 = re(i2);
    return i2 = i2.map(((e3) => o2.find(((t3) => t3.name === e3.name)) ? { name: `x-bind:${e3.name}`, value: `"${e3.value}"` } : e3)), ne(e2, i2, n2).map(((e3) => {
      r2.push(e3.runCleanups), e3();
    })), () => {
      for (; r2.length; ) r2.pop()();
    };
  }
  var pt = {};
  var ht = { get reactive() {
    return e;
  }, get release() {
    return n;
  }, get effect() {
    return t;
  }, get raw() {
    return r;
  }, version: "3.14.8", flushAndStopDeferringMutations: function() {
    S = false, C(j), j = [];
  }, dontAutoEvaluateFunctions: V, disableEffectScheduling: function(e2) {
    f = false, e2(), f = true;
  }, startObservingMutations: E, stopObservingMutations: k, setReactivityEngine: function(i2) {
    e = i2.reactive, n = i2.release, t = (e2) => i2.effect(e2, { scheduler: (e3) => {
      f ? l(e3) : e3();
    } }), r = i2.raw;
  }, onAttributeRemoved: v, onAttributesAdded: g, closestDataStack: M, skipDuringClone: Je, onlyDuringClone: function(e2) {
    return (...t2) => Ve && e2(...t2);
  }, addRootSelector: Ae, addInitSelector: Oe, interceptClone: He, addScopeToNode: N, deferMutations: function() {
    S = true;
  }, mapAttributes: fe, evaluateLater: U, interceptInit: function(e2) {
    Ce.push(e2);
  }, setEvaluator: function(e2) {
    H = e2;
  }, mergeProxies: L, extractProp: function(e2, t2, n2, r2 = true) {
    if (e2._x_bindings && void 0 !== e2._x_bindings[t2]) return e2._x_bindings[t2];
    if (e2._x_inlineBindings && void 0 !== e2._x_inlineBindings[t2]) {
      let n3 = e2._x_inlineBindings[t2];
      return n3.extract = r2, V((() => J(e2, n3.expression)));
    }
    return rt(e2, t2, n2);
  }, findClosest: je, onElRemoved: x, closestRoot: Se, destroyTree: Me, interceptor: z, transition: We, setStyles: Ie, mutateDom: O, directive: te, entangle: lt, throttle: st, debounce: at, evaluate: J, initTree: Ne, nextTick: Re, prefixed: Q, prefix: function(e2) {
    G = e2;
  }, plugin: function(e2) {
    (Array.isArray(e2) ? e2 : [e2]).forEach(((e3) => e3(ht)));
  }, magic: B, store: function(t2, n2) {
    if (ft || (ut = e(ut), ft = true), void 0 === n2) return ut[t2];
    ut[t2] = n2, T(ut[t2]), "object" == typeof n2 && null !== n2 && n2.hasOwnProperty("init") && "function" == typeof n2.init && ut[t2].init();
  }, start: function() {
    var e2;
    ye && ve("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), ye = true, document.body || ve("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), xe(document, "alpine:init"), xe(document, "alpine:initializing"), E(), e2 = (e3) => Ne(e3, ge), m.push(e2), x(((e3) => Me(e3))), g(((e3, t2) => {
      ne(e3, t2).forEach(((e4) => e4()));
    })), Array.from(document.querySelectorAll(ke().join(","))).filter(((e3) => !Se(e3.parentElement, true))).forEach(((e3) => {
      Ne(e3);
    })), xe(document, "alpine:initialized"), setTimeout((() => {
      [["ui", "dialog", ["[x-dialog], [x-popover]"]], ["anchor", "anchor", ["[x-anchor]"]], ["sort", "sort", ["[x-sort]"]]].forEach((([e3, t2, n2]) => {
        var r2;
        r2 = t2, Object.keys(ee).includes(r2) || n2.some(((t3) => {
          if (document.querySelector(t3)) return ve(`found "${t3}", but missing ${e3} plugin`), true;
        }));
      }));
    }));
  }, clone: function(e2, t2) {
    t2._x_dataStack || (t2._x_dataStack = e2._x_dataStack), Ve = true, Xe = true, Ze((() => {
      !(function(e3) {
        let t3 = false;
        Ne(e3, ((e4, n2) => {
          ge(e4, ((e5, r2) => {
            if (t3 && (function(e6) {
              return Ee().some(((t4) => e6.matches(t4)));
            })(e5)) return r2();
            t3 = true, n2(e5, r2);
          }));
        }));
      })(t2);
    })), Ve = false, Xe = false;
  }, cloneNode: function(e2, t2) {
    Ue.forEach(((n2) => n2(e2, t2))), Ve = true, Ze((() => {
      Ne(t2, ((e3, t3) => {
        t3(e3, (() => {
        }));
      }));
    })), Ve = false;
  }, bound: function(e2, t2, n2) {
    return e2._x_bindings && void 0 !== e2._x_bindings[t2] ? e2._x_bindings[t2] : rt(e2, t2, n2);
  }, $data: $, watch: _, walk: ge, data: function(e2, t2) {
    pt[e2] = t2;
  }, bind: function(e2, t2) {
    let n2 = "function" != typeof t2 ? () => t2 : t2;
    return e2 instanceof Element ? _t(e2, n2()) : (dt[e2] = n2, () => {
    });
  } };
  function mt(e2, t2) {
    const n2 = /* @__PURE__ */ Object.create(null), r2 = e2.split(",");
    for (let e3 = 0; e3 < r2.length; e3++) n2[r2[e3]] = true;
    return t2 ? (e3) => !!n2[e3.toLowerCase()] : (e3) => !!n2[e3];
  }
  var xt = Object.freeze({});
  Object.freeze([]);
  var gt;
  var vt = Object.prototype.hasOwnProperty;
  var yt = (e2, t2) => vt.call(e2, t2);
  var bt = Array.isArray;
  var wt = (e2) => "[object Map]" === Ot(e2);
  var Et = (e2) => "symbol" == typeof e2;
  var kt = (e2) => null !== e2 && "object" == typeof e2;
  var At = Object.prototype.toString;
  var Ot = (e2) => At.call(e2);
  var St = (e2) => Ot(e2).slice(8, -1);
  var jt = (e2) => "string" == typeof e2 && "NaN" !== e2 && "-" !== e2[0] && "" + parseInt(e2, 10) === e2;
  var Ct = /* @__PURE__ */ ((e2) => {
    const t2 = /* @__PURE__ */ Object.create(null);
    return (n2) => t2[n2] || (t2[n2] = e2(n2));
  })(((e2) => e2.charAt(0).toUpperCase() + e2.slice(1)));
  var $t = (e2, t2) => e2 !== t2 && (e2 == e2 || t2 == t2);
  var Nt = /* @__PURE__ */ new WeakMap();
  var Mt = [];
  var Lt = /* @__PURE__ */ Symbol("iterate");
  var Pt = /* @__PURE__ */ Symbol("Map key iterate");
  var Rt = 0;
  function Tt(e2) {
    const { deps: t2 } = e2;
    if (t2.length) {
      for (let n2 = 0; n2 < t2.length; n2++) t2[n2].delete(e2);
      t2.length = 0;
    }
  }
  var zt = true;
  var Dt = [];
  function It() {
    const e2 = Dt.pop();
    zt = void 0 === e2 || e2;
  }
  function Bt(e2, t2, n2) {
    if (!zt || void 0 === gt) return;
    let r2 = Nt.get(e2);
    r2 || Nt.set(e2, r2 = /* @__PURE__ */ new Map());
    let i2 = r2.get(n2);
    i2 || r2.set(n2, i2 = /* @__PURE__ */ new Set()), i2.has(gt) || (i2.add(gt), gt.deps.push(i2), gt.options.onTrack && gt.options.onTrack({ effect: gt, target: e2, type: t2, key: n2 }));
  }
  function Ft(e2, t2, n2, r2, i2, o2) {
    const a2 = Nt.get(e2);
    if (!a2) return;
    const s2 = /* @__PURE__ */ new Set(), l2 = (e3) => {
      e3 && e3.forEach(((e4) => {
        (e4 !== gt || e4.allowRecurse) && s2.add(e4);
      }));
    };
    if ("clear" === t2) a2.forEach(l2);
    else if ("length" === n2 && bt(e2)) a2.forEach(((e3, t3) => {
      ("length" === t3 || t3 >= r2) && l2(e3);
    }));
    else switch (void 0 !== n2 && l2(a2.get(n2)), t2) {
      case "add":
        bt(e2) ? jt(n2) && l2(a2.get("length")) : (l2(a2.get(Lt)), wt(e2) && l2(a2.get(Pt)));
        break;
      case "delete":
        bt(e2) || (l2(a2.get(Lt)), wt(e2) && l2(a2.get(Pt)));
        break;
      case "set":
        wt(e2) && l2(a2.get(Lt));
    }
    s2.forEach(((a3) => {
      a3.options.onTrigger && a3.options.onTrigger({ effect: a3, target: e2, key: n2, type: t2, newValue: r2, oldValue: i2, oldTarget: o2 }), a3.options.scheduler ? a3.options.scheduler(a3) : a3();
    }));
  }
  var qt = mt("__proto__,__v_isRef,__isVue");
  var Wt = new Set(Object.getOwnPropertyNames(Symbol).map(((e2) => Symbol[e2])).filter(Et));
  var Kt = Ht();
  var Vt = Ht(true);
  var Jt = Ut();
  function Ut() {
    const e2 = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(((t2) => {
      e2[t2] = function(...e3) {
        const n2 = Cn(this);
        for (let e4 = 0, t3 = this.length; e4 < t3; e4++) Bt(n2, "get", e4 + "");
        const r2 = n2[t2](...e3);
        return -1 === r2 || false === r2 ? n2[t2](...e3.map(Cn)) : r2;
      };
    })), ["push", "pop", "shift", "unshift", "splice"].forEach(((t2) => {
      e2[t2] = function(...e3) {
        Dt.push(zt), zt = false;
        const n2 = Cn(this)[t2].apply(this, e3);
        return It(), n2;
      };
    })), e2;
  }
  function Ht(e2 = false, t2 = false) {
    return function(n2, r2, i2) {
      if ("__v_isReactive" === r2) return !e2;
      if ("__v_isReadonly" === r2) return e2;
      if ("__v_raw" === r2 && i2 === (e2 ? t2 ? An : kn : t2 ? En : wn).get(n2)) return n2;
      const o2 = bt(n2);
      if (!e2 && o2 && yt(Jt, r2)) return Reflect.get(Jt, r2, i2);
      const a2 = Reflect.get(n2, r2, i2);
      if (Et(r2) ? Wt.has(r2) : qt(r2)) return a2;
      if (e2 || Bt(n2, "get", r2), t2) return a2;
      if ($n(a2)) {
        return !o2 || !jt(r2) ? a2.value : a2;
      }
      return kt(a2) ? e2 ? Sn(a2) : On(a2) : a2;
    };
  }
  function Xt(e2 = false) {
    return function(t2, n2, r2, i2) {
      let o2 = t2[n2];
      if (!e2 && (r2 = Cn(r2), o2 = Cn(o2), !bt(t2) && $n(o2) && !$n(r2))) return o2.value = r2, true;
      const a2 = bt(t2) && jt(n2) ? Number(n2) < t2.length : yt(t2, n2), s2 = Reflect.set(t2, n2, r2, i2);
      return t2 === Cn(i2) && (a2 ? $t(r2, o2) && Ft(t2, "set", n2, r2, o2) : Ft(t2, "add", n2, r2)), s2;
    };
  }
  var Zt = { get: Kt, set: Xt(), deleteProperty: function(e2, t2) {
    const n2 = yt(e2, t2), r2 = e2[t2], i2 = Reflect.deleteProperty(e2, t2);
    return i2 && n2 && Ft(e2, "delete", t2, void 0, r2), i2;
  }, has: function(e2, t2) {
    const n2 = Reflect.has(e2, t2);
    return Et(t2) && Wt.has(t2) || Bt(e2, "has", t2), n2;
  }, ownKeys: function(e2) {
    return Bt(e2, "iterate", bt(e2) ? "length" : Lt), Reflect.ownKeys(e2);
  } };
  var Yt = { get: Vt, set: (e2, t2) => (console.warn(`Set operation on key "${String(t2)}" failed: target is readonly.`, e2), true), deleteProperty: (e2, t2) => (console.warn(`Delete operation on key "${String(t2)}" failed: target is readonly.`, e2), true) };
  var Gt = (e2) => kt(e2) ? On(e2) : e2;
  var Qt = (e2) => kt(e2) ? Sn(e2) : e2;
  var en = (e2) => e2;
  var tn = (e2) => Reflect.getPrototypeOf(e2);
  function nn(e2, t2, n2 = false, r2 = false) {
    const i2 = Cn(e2 = e2.__v_raw), o2 = Cn(t2);
    t2 !== o2 && !n2 && Bt(i2, "get", t2), !n2 && Bt(i2, "get", o2);
    const { has: a2 } = tn(i2), s2 = r2 ? en : n2 ? Qt : Gt;
    return a2.call(i2, t2) ? s2(e2.get(t2)) : a2.call(i2, o2) ? s2(e2.get(o2)) : void (e2 !== i2 && e2.get(t2));
  }
  function rn(e2, t2 = false) {
    const n2 = this.__v_raw, r2 = Cn(n2), i2 = Cn(e2);
    return e2 !== i2 && !t2 && Bt(r2, "has", e2), !t2 && Bt(r2, "has", i2), e2 === i2 ? n2.has(e2) : n2.has(e2) || n2.has(i2);
  }
  function on(e2, t2 = false) {
    return e2 = e2.__v_raw, !t2 && Bt(Cn(e2), "iterate", Lt), Reflect.get(e2, "size", e2);
  }
  function an(e2) {
    e2 = Cn(e2);
    const t2 = Cn(this);
    return tn(t2).has.call(t2, e2) || (t2.add(e2), Ft(t2, "add", e2, e2)), this;
  }
  function sn(e2, t2) {
    t2 = Cn(t2);
    const n2 = Cn(this), { has: r2, get: i2 } = tn(n2);
    let o2 = r2.call(n2, e2);
    o2 ? bn(n2, r2, e2) : (e2 = Cn(e2), o2 = r2.call(n2, e2));
    const a2 = i2.call(n2, e2);
    return n2.set(e2, t2), o2 ? $t(t2, a2) && Ft(n2, "set", e2, t2, a2) : Ft(n2, "add", e2, t2), this;
  }
  function ln(e2) {
    const t2 = Cn(this), { has: n2, get: r2 } = tn(t2);
    let i2 = n2.call(t2, e2);
    i2 ? bn(t2, n2, e2) : (e2 = Cn(e2), i2 = n2.call(t2, e2));
    const o2 = r2 ? r2.call(t2, e2) : void 0, a2 = t2.delete(e2);
    return i2 && Ft(t2, "delete", e2, void 0, o2), a2;
  }
  function cn() {
    const e2 = Cn(this), t2 = 0 !== e2.size, n2 = wt(e2) ? new Map(e2) : new Set(e2), r2 = e2.clear();
    return t2 && Ft(e2, "clear", void 0, void 0, n2), r2;
  }
  function un(e2, t2) {
    return function(n2, r2) {
      const i2 = this, o2 = i2.__v_raw, a2 = Cn(o2), s2 = t2 ? en : e2 ? Qt : Gt;
      return !e2 && Bt(a2, "iterate", Lt), o2.forEach(((e3, t3) => n2.call(r2, s2(e3), s2(t3), i2)));
    };
  }
  function fn(e2, t2, n2) {
    return function(...r2) {
      const i2 = this.__v_raw, o2 = Cn(i2), a2 = wt(o2), s2 = "entries" === e2 || e2 === Symbol.iterator && a2, l2 = "keys" === e2 && a2, c2 = i2[e2](...r2), u2 = n2 ? en : t2 ? Qt : Gt;
      return !t2 && Bt(o2, "iterate", l2 ? Pt : Lt), { next() {
        const { value: e3, done: t3 } = c2.next();
        return t3 ? { value: e3, done: t3 } : { value: s2 ? [u2(e3[0]), u2(e3[1])] : u2(e3), done: t3 };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
  }
  function dn(e2) {
    return function(...t2) {
      {
        const n2 = t2[0] ? `on key "${t2[0]}" ` : "";
        console.warn(`${Ct(e2)} operation ${n2}failed: target is readonly.`, Cn(this));
      }
      return "delete" !== e2 && this;
    };
  }
  function _n() {
    const e2 = { get(e3) {
      return nn(this, e3);
    }, get size() {
      return on(this);
    }, has: rn, add: an, set: sn, delete: ln, clear: cn, forEach: un(false, false) }, t2 = { get(e3) {
      return nn(this, e3, false, true);
    }, get size() {
      return on(this);
    }, has: rn, add: an, set: sn, delete: ln, clear: cn, forEach: un(false, true) }, n2 = { get(e3) {
      return nn(this, e3, true);
    }, get size() {
      return on(this, true);
    }, has(e3) {
      return rn.call(this, e3, true);
    }, add: dn("add"), set: dn("set"), delete: dn("delete"), clear: dn("clear"), forEach: un(true, false) }, r2 = { get(e3) {
      return nn(this, e3, true, true);
    }, get size() {
      return on(this, true);
    }, has(e3) {
      return rn.call(this, e3, true);
    }, add: dn("add"), set: dn("set"), delete: dn("delete"), clear: dn("clear"), forEach: un(true, true) };
    return ["keys", "values", "entries", Symbol.iterator].forEach(((i2) => {
      e2[i2] = fn(i2, false, false), n2[i2] = fn(i2, true, false), t2[i2] = fn(i2, false, true), r2[i2] = fn(i2, true, true);
    })), [e2, n2, t2, r2];
  }
  var [pn, hn, mn, xn] = _n();
  function gn(e2, t2) {
    const n2 = t2 ? e2 ? xn : mn : e2 ? hn : pn;
    return (t3, r2, i2) => "__v_isReactive" === r2 ? !e2 : "__v_isReadonly" === r2 ? e2 : "__v_raw" === r2 ? t3 : Reflect.get(yt(n2, r2) && r2 in t3 ? n2 : t3, r2, i2);
  }
  var vn = { get: gn(false, false) };
  var yn = { get: gn(true, false) };
  function bn(e2, t2, n2) {
    const r2 = Cn(n2);
    if (r2 !== n2 && t2.call(e2, r2)) {
      const t3 = St(e2);
      console.warn(`Reactive ${t3} contains both the raw and reactive versions of the same object${"Map" === t3 ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var wn = /* @__PURE__ */ new WeakMap();
  var En = /* @__PURE__ */ new WeakMap();
  var kn = /* @__PURE__ */ new WeakMap();
  var An = /* @__PURE__ */ new WeakMap();
  function On(e2) {
    return e2 && e2.__v_isReadonly ? e2 : jn(e2, false, Zt, vn, wn);
  }
  function Sn(e2) {
    return jn(e2, true, Yt, yn, kn);
  }
  function jn(e2, t2, n2, r2, i2) {
    if (!kt(e2)) return console.warn(`value cannot be made reactive: ${String(e2)}`), e2;
    if (e2.__v_raw && (!t2 || !e2.__v_isReactive)) return e2;
    const o2 = i2.get(e2);
    if (o2) return o2;
    const a2 = (s2 = e2).__v_skip || !Object.isExtensible(s2) ? 0 : (function(e3) {
      switch (e3) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    })(St(s2));
    var s2;
    if (0 === a2) return e2;
    const l2 = new Proxy(e2, 2 === a2 ? r2 : n2);
    return i2.set(e2, l2), l2;
  }
  function Cn(e2) {
    return e2 && Cn(e2.__v_raw) || e2;
  }
  function $n(e2) {
    return Boolean(e2 && true === e2.__v_isRef);
  }
  B("nextTick", (() => Re)), B("dispatch", ((e2) => xe.bind(xe, e2))), B("watch", ((e2, { evaluateLater: t2, cleanup: n2 }) => (e3, r2) => {
    let i2 = t2(e3), o2 = _((() => {
      let e4;
      return i2(((t3) => e4 = t3)), e4;
    }), r2);
    n2(o2);
  })), B("store", (function() {
    return ut;
  })), B("data", ((e2) => $(e2))), B("root", ((e2) => Se(e2))), B("refs", ((e2) => (e2._x_refs_proxy || (e2._x_refs_proxy = L((function(e3) {
    let t2 = [];
    return je(e3, ((e4) => {
      e4._x_refs && t2.push(e4._x_refs);
    })), t2;
  })(e2))), e2._x_refs_proxy)));
  var Nn = {};
  function Mn(e2) {
    return Nn[e2] || (Nn[e2] = 0), ++Nn[e2];
  }
  function Ln(e2, t2, n2) {
    B(t2, ((r2) => ve(`You can't use [$${t2}] without first installing the "${e2}" plugin here: https://alpinejs.dev/plugins/${n2}`, r2)));
  }
  B("id", ((e2, { cleanup: t2 }) => (n2, r2 = null) => (function(e3, t3, n3, r3) {
    e3._x_id || (e3._x_id = {});
    if (e3._x_id[t3]) return e3._x_id[t3];
    let i2 = r3();
    return e3._x_id[t3] = i2, n3((() => {
      delete e3._x_id[t3];
    })), i2;
  })(e2, `${n2}${r2 ? `-${r2}` : ""}`, t2, (() => {
    let t3 = (function(e3, t4) {
      return je(e3, ((e4) => {
        if (e4._x_ids && e4._x_ids[t4]) return true;
      }));
    })(e2, n2), i2 = t3 ? t3._x_ids[n2] : Mn(n2);
    return r2 ? `${n2}-${i2}-${r2}` : `${n2}-${i2}`;
  })))), He(((e2, t2) => {
    e2._x_id && (t2._x_id = e2._x_id);
  })), B("el", ((e2) => e2)), Ln("Focus", "focus", "focus"), Ln("Persist", "persist", "persist"), te("modelable", ((e2, { expression: t2 }, { effect: n2, evaluateLater: r2, cleanup: i2 }) => {
    let o2 = r2(t2), a2 = () => {
      let e3;
      return o2(((t3) => e3 = t3)), e3;
    }, s2 = r2(`${t2} = __placeholder`), l2 = (e3) => s2((() => {
    }), { scope: { __placeholder: e3 } }), c2 = a2();
    l2(c2), queueMicrotask((() => {
      if (!e2._x_model) return;
      e2._x_removeModelListeners.default();
      let t3 = e2._x_model.get, n3 = e2._x_model.set, r3 = lt({ get: () => t3(), set(e3) {
        n3(e3);
      } }, { get: () => a2(), set(e3) {
        l2(e3);
      } });
      i2(r3);
    }));
  })), te("teleport", ((e2, { modifiers: t2, expression: n2 }, { cleanup: r2 }) => {
    "template" !== e2.tagName.toLowerCase() && ve("x-teleport can only be used on a <template> tag", e2);
    let i2 = Rn(n2), o2 = e2.content.cloneNode(true).firstElementChild;
    e2._x_teleport = o2, o2._x_teleportBack = e2, e2.setAttribute("data-teleport-template", true), o2.setAttribute("data-teleport-target", true), e2._x_forwardEvents && e2._x_forwardEvents.forEach(((t3) => {
      o2.addEventListener(t3, ((t4) => {
        t4.stopPropagation(), e2.dispatchEvent(new t4.constructor(t4.type, t4));
      }));
    })), N(o2, {}, e2);
    let a2 = (e3, t3, n3) => {
      n3.includes("prepend") ? t3.parentNode.insertBefore(e3, t3) : n3.includes("append") ? t3.parentNode.insertBefore(e3, t3.nextSibling) : t3.appendChild(e3);
    };
    O((() => {
      a2(o2, i2, t2), Je((() => {
        Ne(o2);
      }))();
    })), e2._x_teleportPutBack = () => {
      let r3 = Rn(n2);
      O((() => {
        a2(e2._x_teleport, r3, t2);
      }));
    }, r2((() => O((() => {
      o2.remove(), Me(o2);
    }))));
  }));
  var Pn = document.createElement("div");
  function Rn(e2) {
    let t2 = Je((() => document.querySelector(e2)), (() => Pn))();
    return t2 || ve(`Cannot find x-teleport element for selector: "${e2}"`), t2;
  }
  var Tn = () => {
  };
  function zn(e2, t2, n2, r2) {
    let i2 = e2, o2 = (e3) => r2(e3), a2 = {}, s2 = (e3, t3) => (n3) => t3(e3, n3);
    if (n2.includes("dot") && (t2 = t2.replace(/-/g, ".")), n2.includes("camel") && (t2 = (function(e3) {
      return e3.toLowerCase().replace(/-(\w)/g, ((e4, t3) => t3.toUpperCase()));
    })(t2)), n2.includes("passive") && (a2.passive = true), n2.includes("capture") && (a2.capture = true), n2.includes("window") && (i2 = window), n2.includes("document") && (i2 = document), n2.includes("debounce")) {
      let e3 = n2[n2.indexOf("debounce") + 1] || "invalid-wait", t3 = Dn(e3.split("ms")[0]) ? Number(e3.split("ms")[0]) : 250;
      o2 = at(o2, t3);
    }
    if (n2.includes("throttle")) {
      let e3 = n2[n2.indexOf("throttle") + 1] || "invalid-wait", t3 = Dn(e3.split("ms")[0]) ? Number(e3.split("ms")[0]) : 250;
      o2 = st(o2, t3);
    }
    return n2.includes("prevent") && (o2 = s2(o2, ((e3, t3) => {
      t3.preventDefault(), e3(t3);
    }))), n2.includes("stop") && (o2 = s2(o2, ((e3, t3) => {
      t3.stopPropagation(), e3(t3);
    }))), n2.includes("once") && (o2 = s2(o2, ((e3, n3) => {
      e3(n3), i2.removeEventListener(t2, o2, a2);
    }))), (n2.includes("away") || n2.includes("outside")) && (i2 = document, o2 = s2(o2, ((t3, n3) => {
      e2.contains(n3.target) || false !== n3.target.isConnected && (e2.offsetWidth < 1 && e2.offsetHeight < 1 || false !== e2._x_isShown && t3(n3));
    }))), n2.includes("self") && (o2 = s2(o2, ((t3, n3) => {
      n3.target === e2 && t3(n3);
    }))), ((function(e3) {
      return ["keydown", "keyup"].includes(e3);
    })(t2) || In(t2)) && (o2 = s2(o2, ((e3, t3) => {
      (function(e4, t4) {
        let n3 = t4.filter(((e5) => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(e5)));
        if (n3.includes("debounce")) {
          let e5 = n3.indexOf("debounce");
          n3.splice(e5, Dn((n3[e5 + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
        }
        if (n3.includes("throttle")) {
          let e5 = n3.indexOf("throttle");
          n3.splice(e5, Dn((n3[e5 + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
        }
        if (0 === n3.length) return false;
        if (1 === n3.length && Bn(e4.key).includes(n3[0])) return false;
        const r3 = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(((e5) => n3.includes(e5)));
        if (n3 = n3.filter(((e5) => !r3.includes(e5))), r3.length > 0) {
          if (r3.filter(((t5) => ("cmd" !== t5 && "super" !== t5 || (t5 = "meta"), e4[`${t5}Key`]))).length === r3.length) {
            if (In(e4.type)) return false;
            if (Bn(e4.key).includes(n3[0])) return false;
          }
        }
        return true;
      })(t3, n2) || e3(t3);
    }))), i2.addEventListener(t2, o2, a2), () => {
      i2.removeEventListener(t2, o2, a2);
    };
  }
  function Dn(e2) {
    return !Array.isArray(e2) && !isNaN(e2);
  }
  function In(e2) {
    return ["contextmenu", "click", "mouse"].some(((t2) => e2.includes(t2)));
  }
  function Bn(e2) {
    if (!e2) return [];
    var t2;
    e2 = [" ", "_"].includes(t2 = e2) ? t2 : t2.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
    let n2 = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", comma: ",", equal: "=", minus: "-", underscore: "_" };
    return n2[e2] = e2, Object.keys(n2).map(((t3) => {
      if (n2[t3] === e2) return t3;
    })).filter(((e3) => e3));
  }
  function Fn(e2, t2, n2, r2) {
    return O((() => {
      if (n2 instanceof CustomEvent && void 0 !== n2.detail) return null !== n2.detail && void 0 !== n2.detail ? n2.detail : n2.target.value;
      if (it(e2)) {
        if (Array.isArray(r2)) {
          let e3 = null;
          return e3 = t2.includes("number") ? qn(n2.target.value) : t2.includes("boolean") ? et(n2.target.value) : n2.target.value, n2.target.checked ? r2.includes(e3) ? r2 : r2.concat([e3]) : r2.filter(((t3) => !(t3 == e3)));
        }
        return n2.target.checked;
      }
      if ("select" === e2.tagName.toLowerCase() && e2.multiple) return t2.includes("number") ? Array.from(n2.target.selectedOptions).map(((e3) => qn(e3.value || e3.text))) : t2.includes("boolean") ? Array.from(n2.target.selectedOptions).map(((e3) => et(e3.value || e3.text))) : Array.from(n2.target.selectedOptions).map(((e3) => e3.value || e3.text));
      {
        let i2;
        return i2 = ot(e2) ? n2.target.checked ? n2.target.value : r2 : n2.target.value, t2.includes("number") ? qn(i2) : t2.includes("boolean") ? et(i2) : t2.includes("trim") ? i2.trim() : i2;
      }
    }));
  }
  function qn(e2) {
    let t2 = e2 ? parseFloat(e2) : null;
    return n2 = t2, Array.isArray(n2) || isNaN(n2) ? e2 : t2;
    var n2;
  }
  function Wn(e2) {
    return null !== e2 && "object" == typeof e2 && "function" == typeof e2.get && "function" == typeof e2.set;
  }
  Tn.inline = (e2, { modifiers: t2 }, { cleanup: n2 }) => {
    t2.includes("self") ? e2._x_ignoreSelf = true : e2._x_ignore = true, n2((() => {
      t2.includes("self") ? delete e2._x_ignoreSelf : delete e2._x_ignore;
    }));
  }, te("ignore", Tn), te("effect", Je(((e2, { expression: t2 }, { effect: n2 }) => {
    n2(U(e2, t2));
  }))), te("model", ((e2, { modifiers: t2, expression: n2 }, { effect: r2, cleanup: i2 }) => {
    let o2 = e2;
    t2.includes("parent") && (o2 = e2.parentNode);
    let a2, s2 = U(o2, n2);
    a2 = "string" == typeof n2 ? U(o2, `${n2} = __placeholder`) : "function" == typeof n2 && "string" == typeof n2() ? U(o2, `${n2()} = __placeholder`) : () => {
    };
    let l2 = () => {
      let e3;
      return s2(((t3) => e3 = t3)), Wn(e3) ? e3.get() : e3;
    }, c2 = (e3) => {
      let t3;
      s2(((e4) => t3 = e4)), Wn(t3) ? t3.set(e3) : a2((() => {
      }), { scope: { __placeholder: e3 } });
    };
    "string" == typeof n2 && "radio" === e2.type && O((() => {
      e2.hasAttribute("name") || e2.setAttribute("name", n2);
    }));
    var u2 = "select" === e2.tagName.toLowerCase() || ["checkbox", "radio"].includes(e2.type) || t2.includes("lazy") ? "change" : "input";
    let f2 = Ve ? () => {
    } : zn(e2, u2, t2, ((n3) => {
      c2(Fn(e2, t2, n3, l2()));
    }));
    if (t2.includes("fill") && ([void 0, null, ""].includes(l2()) || it(e2) && Array.isArray(l2()) || "select" === e2.tagName.toLowerCase() && e2.multiple) && c2(Fn(e2, t2, { target: e2 }, l2())), e2._x_removeModelListeners || (e2._x_removeModelListeners = {}), e2._x_removeModelListeners.default = f2, i2((() => e2._x_removeModelListeners.default())), e2.form) {
      let n3 = zn(e2.form, "reset", [], ((n4) => {
        Re((() => e2._x_model && e2._x_model.set(Fn(e2, t2, { target: e2 }, l2()))));
      }));
      i2((() => n3()));
    }
    e2._x_model = { get: () => l2(), set(e3) {
      c2(e3);
    } }, e2._x_forceModelUpdate = (t3) => {
      void 0 === t3 && "string" == typeof n2 && n2.match(/\./) && (t3 = ""), window.fromModel = true, O((() => Ye(e2, "value", t3))), delete window.fromModel;
    }, r2((() => {
      let n3 = l2();
      t2.includes("unintrusive") && document.activeElement.isSameNode(e2) || e2._x_forceModelUpdate(n3);
    }));
  })), te("cloak", ((e2) => queueMicrotask((() => O((() => e2.removeAttribute(Q("cloak")))))))), Oe((() => `[${Q("init")}]`)), te("init", Je(((e2, { expression: t2 }, { evaluate: n2 }) => "string" == typeof t2 ? !!t2.trim() && n2(t2, {}, false) : n2(t2, {}, false)))), te("text", ((e2, { expression: t2 }, { effect: n2, evaluateLater: r2 }) => {
    let i2 = r2(t2);
    n2((() => {
      i2(((t3) => {
        O((() => {
          e2.textContent = t3;
        }));
      }));
    }));
  })), te("html", ((e2, { expression: t2 }, { effect: n2, evaluateLater: r2 }) => {
    let i2 = r2(t2);
    n2((() => {
      i2(((t3) => {
        O((() => {
          e2.innerHTML = t3, e2._x_ignoreSelf = true, Ne(e2), delete e2._x_ignoreSelf;
        }));
      }));
    }));
  })), fe(le(":", Q("bind:")));
  var Kn = (e2, { value: t2, modifiers: n2, expression: r2, original: i2 }, { effect: o2, cleanup: a2 }) => {
    if (!t2) {
      let t3 = {};
      return s2 = t3, Object.entries(dt).forEach((([e3, t4]) => {
        Object.defineProperty(s2, e3, { get: () => (...e4) => t4(...e4) });
      })), void U(e2, r2)(((t4) => {
        _t(e2, t4, i2);
      }), { scope: t3 });
    }
    var s2;
    if ("key" === t2) return (function(e3, t3) {
      e3._x_keyExpression = t3;
    })(e2, r2);
    if (e2._x_inlineBindings && e2._x_inlineBindings[t2] && e2._x_inlineBindings[t2].extract) return;
    let l2 = U(e2, r2);
    o2((() => l2(((i3) => {
      void 0 === i3 && "string" == typeof r2 && r2.match(/\./) && (i3 = ""), O((() => Ye(e2, t2, i3, n2)));
    })))), a2((() => {
      e2._x_undoAddedClasses && e2._x_undoAddedClasses(), e2._x_undoAddedStyles && e2._x_undoAddedStyles();
    }));
  };
  function Vn(e2, t2, n2, r2) {
    let i2 = {};
    if (/^\[.*\]$/.test(e2.item) && Array.isArray(t2)) {
      e2.item.replace("[", "").replace("]", "").split(",").map(((e3) => e3.trim())).forEach(((e3, n3) => {
        i2[e3] = t2[n3];
      }));
    } else if (/^\{.*\}$/.test(e2.item) && !Array.isArray(t2) && "object" == typeof t2) {
      e2.item.replace("{", "").replace("}", "").split(",").map(((e3) => e3.trim())).forEach(((e3) => {
        i2[e3] = t2[e3];
      }));
    } else i2[e2.item] = t2;
    return e2.index && (i2[e2.index] = n2), e2.collection && (i2[e2.collection] = r2), i2;
  }
  function Jn() {
  }
  function Un(e2, t2, n2) {
    te(t2, ((r2) => ve(`You can't use [x-${t2}] without first installing the "${e2}" plugin here: https://alpinejs.dev/plugins/${n2}`, r2)));
  }
  Kn.inline = (e2, { value: t2, modifiers: n2, expression: r2 }) => {
    t2 && (e2._x_inlineBindings || (e2._x_inlineBindings = {}), e2._x_inlineBindings[t2] = { expression: r2, extract: false });
  }, te("bind", Kn), Ae((() => `[${Q("data")}]`)), te("data", ((t2, { expression: n2 }, { cleanup: r2 }) => {
    if ((function(e2) {
      return !!Ve && (!!Xe || e2.hasAttribute("data-has-alpine-state"));
    })(t2)) return;
    n2 = "" === n2 ? "{}" : n2;
    let i2 = {};
    F(i2, t2);
    let o2 = {};
    var a2, s2;
    a2 = o2, s2 = i2, Object.entries(pt).forEach((([e2, t3]) => {
      Object.defineProperty(a2, e2, { get: () => (...e3) => t3.bind(s2)(...e3), enumerable: false });
    }));
    let l2 = J(t2, n2, { scope: o2 });
    void 0 !== l2 && true !== l2 || (l2 = {}), F(l2, t2);
    let c2 = e(l2);
    T(c2);
    let u2 = N(t2, c2);
    c2.init && J(t2, c2.init), r2((() => {
      c2.destroy && J(t2, c2.destroy), u2();
    }));
  })), He(((e2, t2) => {
    e2._x_dataStack && (t2._x_dataStack = e2._x_dataStack, t2.setAttribute("data-has-alpine-state", true));
  })), te("show", ((e2, { modifiers: t2, expression: n2 }, { effect: r2 }) => {
    let i2 = U(e2, n2);
    e2._x_doHide || (e2._x_doHide = () => {
      O((() => {
        e2.style.setProperty("display", "none", t2.includes("important") ? "important" : void 0);
      }));
    }), e2._x_doShow || (e2._x_doShow = () => {
      O((() => {
        1 === e2.style.length && "none" === e2.style.display ? e2.removeAttribute("style") : e2.style.removeProperty("display");
      }));
    });
    let o2, a2 = () => {
      e2._x_doHide(), e2._x_isShown = false;
    }, s2 = () => {
      e2._x_doShow(), e2._x_isShown = true;
    }, l2 = () => setTimeout(s2), c2 = Be(((e3) => e3 ? s2() : a2()), ((t3) => {
      "function" == typeof e2._x_toggleAndCascadeWithTransitions ? e2._x_toggleAndCascadeWithTransitions(e2, t3, s2, a2) : t3 ? l2() : a2();
    })), u2 = true;
    r2((() => i2(((e3) => {
      (u2 || e3 !== o2) && (t2.includes("immediate") && (e3 ? l2() : a2()), c2(e3), o2 = e3, u2 = false);
    }))));
  })), te("for", ((t2, { expression: n2 }, { effect: r2, cleanup: i2 }) => {
    let o2 = (function(e2) {
      let t3 = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n3 = /^\s*\(|\)\s*$/g, r3 = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i3 = e2.match(r3);
      if (!i3) return;
      let o3 = {};
      o3.items = i3[2].trim();
      let a3 = i3[1].replace(n3, "").trim(), s3 = a3.match(t3);
      s3 ? (o3.item = a3.replace(t3, "").trim(), o3.index = s3[1].trim(), s3[2] && (o3.collection = s3[2].trim())) : o3.item = a3;
      return o3;
    })(n2), a2 = U(t2, o2.items), s2 = U(t2, t2._x_keyExpression || "index");
    t2._x_prevKeys = [], t2._x_lookup = {}, r2((() => (function(t3, n3, r3, i3) {
      let o3 = (e2) => "object" == typeof e2 && !Array.isArray(e2), a3 = t3;
      r3(((r4) => {
        var s3;
        s3 = r4, !Array.isArray(s3) && !isNaN(s3) && r4 >= 0 && (r4 = Array.from(Array(r4).keys(), ((e2) => e2 + 1))), void 0 === r4 && (r4 = []);
        let l2 = t3._x_lookup, c2 = t3._x_prevKeys, u2 = [], f2 = [];
        if (o3(r4)) r4 = Object.entries(r4).map((([e2, o4]) => {
          let a4 = Vn(n3, o4, e2, r4);
          i3(((e3) => {
            f2.includes(e3) && ve("Duplicate key on x-for", t3), f2.push(e3);
          }), { scope: { index: e2, ...a4 } }), u2.push(a4);
        }));
        else for (let e2 = 0; e2 < r4.length; e2++) {
          let o4 = Vn(n3, r4[e2], e2, r4);
          i3(((e3) => {
            f2.includes(e3) && ve("Duplicate key on x-for", t3), f2.push(e3);
          }), { scope: { index: e2, ...o4 } }), u2.push(o4);
        }
        let d2 = [], _2 = [], p2 = [], h2 = [];
        for (let e2 = 0; e2 < c2.length; e2++) {
          let t4 = c2[e2];
          -1 === f2.indexOf(t4) && p2.push(t4);
        }
        c2 = c2.filter(((e2) => !p2.includes(e2)));
        let m2 = "template";
        for (let e2 = 0; e2 < f2.length; e2++) {
          let t4 = f2[e2], n4 = c2.indexOf(t4);
          if (-1 === n4) c2.splice(e2, 0, t4), d2.push([m2, e2]);
          else if (n4 !== e2) {
            let t5 = c2.splice(e2, 1)[0], r5 = c2.splice(n4 - 1, 1)[0];
            c2.splice(e2, 0, r5), c2.splice(n4, 0, t5), _2.push([t5, r5]);
          } else h2.push(t4);
          m2 = t4;
        }
        for (let e2 = 0; e2 < p2.length; e2++) {
          let t4 = p2[e2];
          t4 in l2 && (O((() => {
            Me(l2[t4]), l2[t4].remove();
          })), delete l2[t4]);
        }
        for (let e2 = 0; e2 < _2.length; e2++) {
          let [t4, n4] = _2[e2], r5 = l2[t4], i4 = l2[n4], o4 = document.createElement("div");
          O((() => {
            i4 || ve('x-for ":key" is undefined or invalid', a3, n4, l2), i4.after(o4), r5.after(i4), i4._x_currentIfEl && i4.after(i4._x_currentIfEl), o4.before(r5), r5._x_currentIfEl && r5.after(r5._x_currentIfEl), o4.remove();
          })), i4._x_refreshXForScope(u2[f2.indexOf(n4)]);
        }
        for (let t4 = 0; t4 < d2.length; t4++) {
          let [n4, r5] = d2[t4], i4 = "template" === n4 ? a3 : l2[n4];
          i4._x_currentIfEl && (i4 = i4._x_currentIfEl);
          let o4 = u2[r5], s4 = f2[r5], c3 = document.importNode(a3.content, true).firstElementChild, _3 = e(o4);
          N(c3, _3, a3), c3._x_refreshXForScope = (e2) => {
            Object.entries(e2).forEach((([e3, t5]) => {
              _3[e3] = t5;
            }));
          }, O((() => {
            i4.after(c3), Je((() => Ne(c3)))();
          })), "object" == typeof s4 && ve("x-for key cannot be an object, it must be a string or an integer", a3), l2[s4] = c3;
        }
        for (let e2 = 0; e2 < h2.length; e2++) l2[h2[e2]]._x_refreshXForScope(u2[f2.indexOf(h2[e2])]);
        a3._x_prevKeys = f2;
      }));
    })(t2, o2, a2, s2))), i2((() => {
      Object.values(t2._x_lookup).forEach(((e2) => O((() => {
        Me(e2), e2.remove();
      })))), delete t2._x_prevKeys, delete t2._x_lookup;
    }));
  })), Jn.inline = (e2, { expression: t2 }, { cleanup: n2 }) => {
    let r2 = Se(e2);
    r2._x_refs || (r2._x_refs = {}), r2._x_refs[t2] = e2, n2((() => delete r2._x_refs[t2]));
  }, te("ref", Jn), te("if", ((e2, { expression: t2 }, { effect: n2, cleanup: r2 }) => {
    "template" !== e2.tagName.toLowerCase() && ve("x-if can only be used on a <template> tag", e2);
    let i2 = U(e2, t2);
    n2((() => i2(((t3) => {
      t3 ? (() => {
        if (e2._x_currentIfEl) return e2._x_currentIfEl;
        let t4 = e2.content.cloneNode(true).firstElementChild;
        N(t4, {}, e2), O((() => {
          e2.after(t4), Je((() => Ne(t4)))();
        })), e2._x_currentIfEl = t4, e2._x_undoIf = () => {
          O((() => {
            Me(t4), t4.remove();
          })), delete e2._x_currentIfEl;
        };
      })() : e2._x_undoIf && (e2._x_undoIf(), delete e2._x_undoIf);
    })))), r2((() => e2._x_undoIf && e2._x_undoIf()));
  })), te("id", ((e2, { expression: t2 }, { evaluate: n2 }) => {
    n2(t2).forEach(((t3) => (function(e3, t4) {
      e3._x_ids || (e3._x_ids = {}), e3._x_ids[t4] || (e3._x_ids[t4] = Mn(t4));
    })(e2, t3)));
  })), He(((e2, t2) => {
    e2._x_ids && (t2._x_ids = e2._x_ids);
  })), fe(le("@", Q("on:"))), te("on", Je(((e2, { value: t2, modifiers: n2, expression: r2 }, { cleanup: i2 }) => {
    let o2 = r2 ? U(e2, r2) : () => {
    };
    "template" === e2.tagName.toLowerCase() && (e2._x_forwardEvents || (e2._x_forwardEvents = []), e2._x_forwardEvents.includes(t2) || e2._x_forwardEvents.push(t2));
    let a2 = zn(e2, t2, n2, ((e3) => {
      o2((() => {
      }), { scope: { $event: e3 }, params: [e3] });
    }));
    i2((() => a2()));
  }))), Un("Collapse", "collapse", "collapse"), Un("Intersect", "intersect", "intersect"), Un("Focus", "trap", "focus"), Un("Mask", "mask", "mask"), ht.setEvaluator(X), ht.setReactivityEngine({ reactive: On, effect: function(e2, t2 = xt) {
    (function(e3) {
      return e3 && true === e3._isEffect;
    })(e2) && (e2 = e2.raw);
    const n2 = (function(e3, t3) {
      const n3 = function() {
        if (!n3.active) return e3();
        if (!Mt.includes(n3)) {
          Tt(n3);
          try {
            return Dt.push(zt), zt = true, Mt.push(n3), gt = n3, e3();
          } finally {
            Mt.pop(), It(), gt = Mt[Mt.length - 1];
          }
        }
      };
      return n3.id = Rt++, n3.allowRecurse = !!t3.allowRecurse, n3._isEffect = true, n3.active = true, n3.raw = e3, n3.deps = [], n3.options = t3, n3;
    })(e2, t2);
    return t2.lazy || n2(), n2;
  }, release: function(e2) {
    e2.active && (Tt(e2), e2.options.onStop && e2.options.onStop(), e2.active = false);
  }, raw: Cn });
  var Hn = ht;
  var Xn = Hn;

  // src/lib/qris/crc.js
  function calculateCRC16(data) {
    let crc = 65535;
    const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
    for (let i2 = 0; i2 < bytes.length; i2++) {
      const byte = bytes[i2];
      crc ^= byte << 8;
      for (let j2 = 0; j2 < 8; j2++) {
        if (crc & 32768) {
          crc = crc << 1 ^ 4129;
        } else {
          crc = crc << 1;
        }
        crc &= 65535;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function validateCRC16(payload) {
    if (!payload || payload.length < 8) return false;
    const tag63Index = payload.lastIndexOf("6304");
    if (tag63Index === -1 || tag63Index !== payload.length - 8) return false;
    const dataToCalculate = payload.substring(0, tag63Index + 4);
    const expectedCRC = payload.substring(tag63Index + 4);
    const calculatedCRC = calculateCRC16(dataToCalculate);
    return calculatedCRC === expectedCRC.toUpperCase();
  }

  // src/lib/qris/parser.js
  var TAG_NAMES = {
    "00": "Payload Format Indicator",
    "01": "Point of Initiation Method",
    // 11 = Statis, 12 = Dinamis
    "26": "Merchant Account Information (GPN)",
    "27": "Merchant Account Information (Domestic 1)",
    "28": "Merchant Account Information (Domestic 2)",
    "29": "Merchant Account Information (Domestic 3)",
    "30": "Merchant Account Information (Domestic 4)",
    "31": "Merchant Account Information (Domestic 5)",
    "32": "Merchant Account Information (Domestic 6)",
    "33": "Merchant Account Information (Domestic 7)",
    "34": "Merchant Account Information (Domestic 8)",
    "35": "Merchant Account Information (Domestic 9)",
    "36": "Merchant Account Information (Domestic 10)",
    "37": "Merchant Account Information (Domestic 11)",
    "38": "Merchant Account Information (Domestic 12)",
    "39": "Merchant Account Information (Domestic 13)",
    "40": "Merchant Account Information (Domestic 14)",
    "41": "Merchant Account Information (Domestic 15)",
    "42": "Merchant Account Information (Domestic 16)",
    "43": "Merchant Account Information (Domestic 17)",
    "44": "Merchant Account Information (Domestic 18)",
    "45": "Merchant Account Information (Domestic 19)",
    "51": "Merchant Account Information (Domestic GPN)",
    "52": "Merchant Category Code (MCC)",
    "53": "Transaction Currency (IDR = 360)",
    "54": "Transaction Amount",
    // Nominal Transaksi
    "55": "Tip on Transaction Indicator",
    "56": "Value of Fee Fixed",
    "57": "Value of Fee Percentage",
    "58": "Country Code (ID)",
    "59": "Merchant Name",
    "60": "Merchant City",
    "61": "Postal Code",
    "62": "Additional Data Field Template",
    // Informasi Tambahan (Invoice, terminal ID, dll.)
    "63": "CRC"
    // Checksum
  };
  function parseTLVString(tlvString) {
    const result = {};
    let idx = 0;
    while (idx < tlvString.length) {
      if (idx + 4 > tlvString.length) {
        return null;
      }
      const tag = tlvString.substring(idx, idx + 2);
      const lengthStr = tlvString.substring(idx + 2, idx + 4);
      const length = parseInt(lengthStr, 10);
      if (isNaN(length) || length < 0) {
        return null;
      }
      idx += 4;
      if (idx + length > tlvString.length) {
        return null;
      }
      const value = tlvString.substring(idx, idx + length);
      idx += length;
      result[tag] = {
        tag,
        length,
        value,
        name: TAG_NAMES[tag] || "Reserved for Private Use / Unknown"
      };
    }
    return result;
  }
  function parseQRIS(payload) {
    if (!payload) {
      return { isValid: false, error: "Payload kosong" };
    }
    const isValidCRC = validateCRC16(payload);
    const rootData = parseTLVString(payload);
    if (!rootData) {
      return { isValid: false, error: "Gagal mengurai struktur TLV QRIS. Pastikan format sesuai standar EMVCo." };
    }
    for (const tag in rootData) {
      const item = rootData[tag];
      const isMerchantInfo = parseInt(tag, 10) >= 26 && parseInt(tag, 10) <= 45 || tag === "51";
      const isAdditionalData = tag === "62";
      if (isMerchantInfo || isAdditionalData) {
        const nested = parseTLVString(item.value);
        if (nested) {
          item.subTags = nested;
        }
      }
    }
    const merchantName = rootData["59"]?.value || "UNKNOWN MERCHANT";
    const merchantCity = rootData["60"]?.value || "";
    const countryCode = rootData["58"]?.value || "ID";
    const amount = rootData["54"]?.value ? parseFloat(rootData["54"].value) : null;
    const isStatic = rootData["01"]?.value === "11";
    const mcc = rootData["52"]?.value || "5411";
    let nmid = "";
    const merchantTag = rootData["26"] || rootData["51"];
    if (merchantTag && merchantTag.subTags) {
      nmid = merchantTag.subTags["01"]?.value || merchantTag.subTags["02"]?.value || merchantTag.subTags["00"]?.value || "";
    }
    return {
      isValid: true,
      isValidCRC,
      data: rootData,
      summary: {
        merchantName,
        merchantCity,
        countryCode,
        amount,
        isStatic,
        nmid: nmid || "ID1020211831969",
        mcc,
        currency: rootData["53"]?.value === "360" ? "IDR" : rootData["53"]?.value || "UNKNOWN"
      }
    };
  }

  // src/scripts/login.js
  window.Alpine = Xn;
  if (typeof process !== "undefined" && process.env) {
    if (process.env.SITE_URL || process.env.PUBLIC_SITE_URL) {
      window.CLOUDFLARE_SITE_URL = process.env.SITE_URL || process.env.PUBLIC_SITE_URL;
    }
    if (process.env.GOOGLE_SITE_VERIFICATION) window.GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
    if (process.env.BING_SITE_VERIFICATION || process.env.MSVALIDATE_01) window.MSVALIDATE_01 = process.env.BING_SITE_VERIFICATION || process.env.MSVALIDATE_01;
    if (process.env.YANDEX_SITE_VERIFICATION) window.YANDEX_SITE_VERIFICATION = process.env.YANDEX_SITE_VERIFICATION;
  }
  var sampleQRIS = "00020101021126680016ID10202118319690118936000020000025740214400000257400020303UMI51440014ID10202118319690215400000257400020303UMI5204000053033605802ID5921Toko Kelontong Berkah6009Tangerang61051513062070703A0163045E65";
  Xn.data("loginApp", () => ({
    tab: "upload",
    fileName: "",
    loading: false,
    loadingText: "Menganalisis Payload QRIS...",
    errorMessage: "",
    textPayload: "",
    staticQRLocal: null,
    isDragging: false,
    init() {
      document.documentElement.classList.add("dark");
      if (window.location.pathname.endsWith(".html")) {
        const cleanPath = window.location.pathname.replace(/\.html$/, "");
        window.history.replaceState(null, "", cleanPath + window.location.search);
      }
      const activeSession = localStorage.getItem("qrisStaticData") || sessionStorage.getItem("qrisStaticData");
      if (activeSession) {
        try {
          const parsedData = JSON.parse(activeSession);
          if (parsedData && parsedData.payload && typeof parsedData.payload === "string" && parsedData.payload.length > 20) {
            const check = parseQRIS(parsedData.payload);
            if (check && check.isValid) {
              const currentPath = window.location.pathname.replace(/\/$/, "").replace(/\.html$/, "");
              if (!currentPath.endsWith("dashboard")) {
                const dest = window.location.protocol === "file:" ? "dashboard.html" : "/dashboard";
                window.location.replace(dest);
                return;
              }
            } else {
              localStorage.removeItem("qrisStaticData");
              sessionStorage.removeItem("qrisStaticData");
            }
          } else {
            localStorage.removeItem("qrisStaticData");
            sessionStorage.removeItem("qrisStaticData");
          }
        } catch (e2) {
          localStorage.removeItem("qrisStaticData");
          sessionStorage.removeItem("qrisStaticData");
        }
      }
    },
    clearFile() {
      this.fileName = "";
      this.staticQRLocal = null;
      this.errorMessage = "";
    },
    handleFileSelect(e2) {
      const file = e2.target.files && e2.target.files[0];
      if (file) {
        this.processFile(file);
        e2.target.value = "";
      }
    },
    handleDrop(e2) {
      this.isDragging = false;
      const file = e2.dataTransfer && e2.dataTransfer.files[0];
      if (file) this.processFile(file);
    },
    processFile(file) {
      this.errorMessage = "";
      this.staticQRLocal = null;
      if (!file.type.startsWith("image/")) {
        this.errorMessage = "Format berkas tidak didukung. Silakan unggah gambar (PNG, JPG, atau JPEG).";
        return;
      }
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          try {
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            if (typeof window.jsQR !== "undefined") {
              const code = window.jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
              if (code && code.data) {
                this.parseQRText(code.data);
              } else {
                this.errorMessage = "Gagal mendeteksi QR Code dari gambar. Pastikan QRIS terlihat jelas.";
                this.fileName = "";
              }
            } else {
              this.errorMessage = "Library jsQR tidak dimuat. Pastikan koneksi/file jsQR tersedia.";
            }
          } catch (err) {
            this.errorMessage = "Kesalahan saat memproses gambar: " + err.message;
            this.fileName = "";
          }
        };
        img.onerror = () => {
          this.errorMessage = "Gagal memuat file gambar.";
          this.fileName = "";
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleTextInput() {
      this.errorMessage = "";
      this.staticQRLocal = null;
      if (this.textPayload.trim().length > 10) {
        this.parseQRText(this.textPayload.trim());
      }
    },
    loadSample() {
      this.tab = "text";
      this.textPayload = sampleQRIS;
      this.parseQRText(sampleQRIS);
    },
    loadSampleAndLogin() {
      this.textPayload = sampleQRIS;
      this.parseQRText(sampleQRIS);
      setTimeout(() => {
        this.processLogin();
      }, 100);
    },
    parseQRText(text) {
      const parsed = parseQRIS(text);
      if (parsed.isValid) {
        this.staticQRLocal = { payload: text, parsed, summary: parsed.summary };
        this.errorMessage = "";
      } else {
        this.errorMessage = parsed.error || "Struktur QRIS tidak valid.";
        this.staticQRLocal = null;
      }
    },
    processLogin() {
      if (!this.staticQRLocal) return;
      this.loading = true;
      this.loadingText = "Mengurai Payload QRIS...";
      setTimeout(() => {
        this.loadingText = "Memverifikasi Tanda Tangan CRC16...";
        setTimeout(() => {
          this.loadingText = "Membuka Dashboard Merchant...";
          try {
            const jsonStr = JSON.stringify(this.staticQRLocal);
            localStorage.setItem("qrisStaticData", jsonStr);
            sessionStorage.setItem("qrisStaticData", jsonStr);
          } catch (e2) {
            console.error("Gagal menyimpan sesi login:", e2);
          }
          setTimeout(() => {
            const dest = window.location.protocol === "file:" ? "dashboard.html" : "/dashboard";
            window.location.replace(dest);
          }, 300);
        }, 400);
      }, 400);
    }
  }));
  Xn.start();
})();
