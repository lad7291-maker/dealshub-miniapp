function gp(c, d) {
  for (var u = 0; u < d.length; u++) {
    const o = d[u];
    if (typeof o != 'string' && !Array.isArray(o)) {
      for (const p in o)
        if (p !== 'default' && !(p in c)) {
          const m = Object.getOwnPropertyDescriptor(o, p);
          m && Object.defineProperty(c, p, m.get ? m : { enumerable: !0, get: () => o[p] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: 'Module' }));
}
(function () {
  const d = document.createElement('link').relList;
  if (d && d.supports && d.supports('modulepreload')) return;
  for (const p of document.querySelectorAll('link[rel="modulepreload"]')) o(p);
  new MutationObserver((p) => {
    for (const m of p)
      if (m.type === 'childList')
        for (const g of m.addedNodes) g.tagName === 'LINK' && g.rel === 'modulepreload' && o(g);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(p) {
    const m = {};
    return (
      p.integrity && (m.integrity = p.integrity),
      p.referrerPolicy && (m.referrerPolicy = p.referrerPolicy),
      p.crossOrigin === 'use-credentials'
        ? (m.credentials = 'include')
        : p.crossOrigin === 'anonymous'
          ? (m.credentials = 'omit')
          : (m.credentials = 'same-origin'),
      m
    );
  }
  function o(p) {
    if (p.ep) return;
    p.ep = !0;
    const m = u(p);
    fetch(p.href, m);
  }
})();
function Ec(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Ko = { exports: {} },
  Vn = {};
var Tm;
function yp() {
  if (Tm) return Vn;
  Tm = 1;
  var c = Symbol.for('react.transitional.element'),
    d = Symbol.for('react.fragment');
  function u(o, p, m) {
    var g = null;
    if ((m !== void 0 && (g = '' + m), p.key !== void 0 && (g = '' + p.key), 'key' in p)) {
      m = {};
      for (var S in p) S !== 'key' && (m[S] = p[S]);
    } else m = p;
    return ((p = m.ref), { $$typeof: c, type: o, key: g, ref: p !== void 0 ? p : null, props: m });
  }
  return ((Vn.Fragment = d), (Vn.jsx = u), (Vn.jsxs = u), Vn);
}
var Em;
function bp() {
  return (Em || ((Em = 1), (Ko.exports = yp())), Ko.exports);
}
var i = bp(),
  Jo = { exports: {} },
  ae = {};
var wm;
function vp() {
  if (wm) return ae;
  wm = 1;
  var c = Symbol.for('react.transitional.element'),
    d = Symbol.for('react.portal'),
    u = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    p = Symbol.for('react.profiler'),
    m = Symbol.for('react.consumer'),
    g = Symbol.for('react.context'),
    S = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    h = Symbol.for('react.memo'),
    E = Symbol.for('react.lazy'),
    H = Symbol.for('react.activity'),
    U = Symbol.iterator;
  function F(b) {
    return b === null || typeof b != 'object'
      ? null
      : ((b = (U && b[U]) || b['@@iterator']), typeof b == 'function' ? b : null);
  }
  var le = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Z = Object.assign,
    re = {};
  function ve(b, z, B) {
    ((this.props = b), (this.context = z), (this.refs = re), (this.updater = B || le));
  }
  ((ve.prototype.isReactComponent = {}),
    (ve.prototype.setState = function (b, z) {
      if (typeof b != 'object' && typeof b != 'function' && b != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, b, z, 'setState');
    }),
    (ve.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, 'forceUpdate');
    }));
  function se() {}
  se.prototype = ve.prototype;
  function _e(b, z, B) {
    ((this.props = b), (this.context = z), (this.refs = re), (this.updater = B || le));
  }
  var Ce = (_e.prototype = new se());
  ((Ce.constructor = _e), Z(Ce, ve.prototype), (Ce.isPureReactComponent = !0));
  var Ue = Array.isArray;
  function ee() {}
  var X = { H: null, A: null, T: null, S: null },
    D = Object.prototype.hasOwnProperty;
  function Ne(b, z, B) {
    var Y = B.ref;
    return { $$typeof: c, type: b, key: z, ref: Y !== void 0 ? Y : null, props: B };
  }
  function ye(b, z) {
    return Ne(b.type, z, b.props);
  }
  function Fe(b) {
    return typeof b == 'object' && b !== null && b.$$typeof === c;
  }
  function ke(b) {
    var z = { '=': '=0', ':': '=2' };
    return (
      '$' +
      b.replace(/[=:]/g, function (B) {
        return z[B];
      })
    );
  }
  var Nt = /\/+/g;
  function at(b, z) {
    return typeof b == 'object' && b !== null && b.key != null ? ke('' + b.key) : z.toString(36);
  }
  function Oe(b) {
    switch (b.status) {
      case 'fulfilled':
        return b.value;
      case 'rejected':
        throw b.reason;
      default:
        switch (
          (typeof b.status == 'string'
            ? b.then(ee, ee)
            : ((b.status = 'pending'),
              b.then(
                function (z) {
                  b.status === 'pending' && ((b.status = 'fulfilled'), (b.value = z));
                },
                function (z) {
                  b.status === 'pending' && ((b.status = 'rejected'), (b.reason = z));
                }
              )),
          b.status)
        ) {
          case 'fulfilled':
            return b.value;
          case 'rejected':
            throw b.reason;
        }
    }
    throw b;
  }
  function _(b, z, B, Y, $) {
    var I = typeof b;
    (I === 'undefined' || I === 'boolean') && (b = null);
    var he = !1;
    if (b === null) he = !0;
    else
      switch (I) {
        case 'bigint':
        case 'string':
        case 'number':
          he = !0;
          break;
        case 'object':
          switch (b.$$typeof) {
            case c:
            case d:
              he = !0;
              break;
            case E:
              return ((he = b._init), _(he(b._payload), z, B, Y, $));
          }
      }
    if (he)
      return (
        ($ = $(b)),
        (he = Y === '' ? '.' + at(b, 0) : Y),
        Ue($)
          ? ((B = ''),
            he != null && (B = he.replace(Nt, '$&/') + '/'),
            _($, z, B, '', function (dl) {
              return dl;
            }))
          : $ != null &&
            (Fe($) &&
              ($ = ye(
                $,
                B +
                  ($.key == null || (b && b.key === $.key)
                    ? ''
                    : ('' + $.key).replace(Nt, '$&/') + '/') +
                  he
              )),
            z.push($)),
        1
      );
    he = 0;
    var Ke = Y === '' ? '.' : Y + ':';
    if (Ue(b))
      for (var ie = 0; ie < b.length; ie++)
        ((Y = b[ie]), (I = Ke + at(Y, ie)), (he += _(Y, z, B, I, $)));
    else if (((ie = F(b)), typeof ie == 'function'))
      for (b = ie.call(b), ie = 0; !(Y = b.next()).done; )
        ((Y = Y.value), (I = Ke + at(Y, ie++)), (he += _(Y, z, B, I, $)));
    else if (I === 'object') {
      if (typeof b.then == 'function') return _(Oe(b), z, B, Y, $);
      throw (
        (z = String(b)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (z === '[object Object]' ? 'object with keys {' + Object.keys(b).join(', ') + '}' : z) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return he;
  }
  function R(b, z, B) {
    if (b == null) return b;
    var Y = [],
      $ = 0;
    return (
      _(b, Y, '', '', function (I) {
        return z.call(B, I, $++);
      }),
      Y
    );
  }
  function J(b) {
    if (b._status === -1) {
      var z = b._result;
      ((z = z()),
        z.then(
          function (B) {
            (b._status === 0 || b._status === -1) && ((b._status = 1), (b._result = B));
          },
          function (B) {
            (b._status === 0 || b._status === -1) && ((b._status = 2), (b._result = B));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = z)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var q =
      typeof reportError == 'function'
        ? reportError
        : function (b) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var z = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == 'object' && b !== null && typeof b.message == 'string'
                    ? String(b.message)
                    : String(b),
                error: b,
              });
              if (!window.dispatchEvent(z)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', b);
              return;
            }
            console.error(b);
          },
    k = {
      map: R,
      forEach: function (b, z, B) {
        R(
          b,
          function () {
            z.apply(this, arguments);
          },
          B
        );
      },
      count: function (b) {
        var z = 0;
        return (
          R(b, function () {
            z++;
          }),
          z
        );
      },
      toArray: function (b) {
        return (
          R(b, function (z) {
            return z;
          }) || []
        );
      },
      only: function (b) {
        if (!Fe(b))
          throw Error('React.Children.only expected to receive a single React element child.');
        return b;
      },
    };
  return (
    (ae.Activity = H),
    (ae.Children = k),
    (ae.Component = ve),
    (ae.Fragment = u),
    (ae.Profiler = p),
    (ae.PureComponent = _e),
    (ae.StrictMode = o),
    (ae.Suspense = y),
    (ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X),
    (ae.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return X.H.useMemoCache(b);
      },
    }),
    (ae.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (ae.cacheSignal = function () {
      return null;
    }),
    (ae.cloneElement = function (b, z, B) {
      if (b == null) throw Error('The argument must be a React element, but you passed ' + b + '.');
      var Y = Z({}, b.props),
        $ = b.key;
      if (z != null)
        for (I in (z.key !== void 0 && ($ = '' + z.key), z))
          !D.call(z, I) ||
            I === 'key' ||
            I === '__self' ||
            I === '__source' ||
            (I === 'ref' && z.ref === void 0) ||
            (Y[I] = z[I]);
      var I = arguments.length - 2;
      if (I === 1) Y.children = B;
      else if (1 < I) {
        for (var he = Array(I), Ke = 0; Ke < I; Ke++) he[Ke] = arguments[Ke + 2];
        Y.children = he;
      }
      return Ne(b.type, $, Y);
    }),
    (ae.createContext = function (b) {
      return (
        (b = {
          $$typeof: g,
          _currentValue: b,
          _currentValue2: b,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (b.Provider = b),
        (b.Consumer = { $$typeof: m, _context: b }),
        b
      );
    }),
    (ae.createElement = function (b, z, B) {
      var Y,
        $ = {},
        I = null;
      if (z != null)
        for (Y in (z.key !== void 0 && (I = '' + z.key), z))
          D.call(z, Y) && Y !== 'key' && Y !== '__self' && Y !== '__source' && ($[Y] = z[Y]);
      var he = arguments.length - 2;
      if (he === 1) $.children = B;
      else if (1 < he) {
        for (var Ke = Array(he), ie = 0; ie < he; ie++) Ke[ie] = arguments[ie + 2];
        $.children = Ke;
      }
      if (b && b.defaultProps)
        for (Y in ((he = b.defaultProps), he)) $[Y] === void 0 && ($[Y] = he[Y]);
      return Ne(b, I, $);
    }),
    (ae.createRef = function () {
      return { current: null };
    }),
    (ae.forwardRef = function (b) {
      return { $$typeof: S, render: b };
    }),
    (ae.isValidElement = Fe),
    (ae.lazy = function (b) {
      return { $$typeof: E, _payload: { _status: -1, _result: b }, _init: J };
    }),
    (ae.memo = function (b, z) {
      return { $$typeof: h, type: b, compare: z === void 0 ? null : z };
    }),
    (ae.startTransition = function (b) {
      var z = X.T,
        B = {};
      X.T = B;
      try {
        var Y = b(),
          $ = X.S;
        ($ !== null && $(B, Y),
          typeof Y == 'object' && Y !== null && typeof Y.then == 'function' && Y.then(ee, q));
      } catch (I) {
        q(I);
      } finally {
        (z !== null && B.types !== null && (z.types = B.types), (X.T = z));
      }
    }),
    (ae.unstable_useCacheRefresh = function () {
      return X.H.useCacheRefresh();
    }),
    (ae.use = function (b) {
      return X.H.use(b);
    }),
    (ae.useActionState = function (b, z, B) {
      return X.H.useActionState(b, z, B);
    }),
    (ae.useCallback = function (b, z) {
      return X.H.useCallback(b, z);
    }),
    (ae.useContext = function (b) {
      return X.H.useContext(b);
    }),
    (ae.useDebugValue = function () {}),
    (ae.useDeferredValue = function (b, z) {
      return X.H.useDeferredValue(b, z);
    }),
    (ae.useEffect = function (b, z) {
      return X.H.useEffect(b, z);
    }),
    (ae.useEffectEvent = function (b) {
      return X.H.useEffectEvent(b);
    }),
    (ae.useId = function () {
      return X.H.useId();
    }),
    (ae.useImperativeHandle = function (b, z, B) {
      return X.H.useImperativeHandle(b, z, B);
    }),
    (ae.useInsertionEffect = function (b, z) {
      return X.H.useInsertionEffect(b, z);
    }),
    (ae.useLayoutEffect = function (b, z) {
      return X.H.useLayoutEffect(b, z);
    }),
    (ae.useMemo = function (b, z) {
      return X.H.useMemo(b, z);
    }),
    (ae.useOptimistic = function (b, z) {
      return X.H.useOptimistic(b, z);
    }),
    (ae.useReducer = function (b, z, B) {
      return X.H.useReducer(b, z, B);
    }),
    (ae.useRef = function (b) {
      return X.H.useRef(b);
    }),
    (ae.useState = function (b) {
      return X.H.useState(b);
    }),
    (ae.useSyncExternalStore = function (b, z, B) {
      return X.H.useSyncExternalStore(b, z, B);
    }),
    (ae.useTransition = function () {
      return X.H.useTransition();
    }),
    (ae.version = '19.2.7'),
    ae
  );
}
var _m;
function xr() {
  return (_m || ((_m = 1), (Jo.exports = vp())), Jo.exports);
}
var L = xr();
const Be = Ec(L),
  Sp = gp({ __proto__: null, default: Be }, [L]);
var $o = { exports: {} },
  Xn = {},
  Fo = { exports: {} },
  Wo = {};
var Cm;
function jp() {
  return (
    Cm ||
      ((Cm = 1),
      (function (c) {
        function d(_, R) {
          var J = _.length;
          _.push(R);
          e: for (; 0 < J; ) {
            var q = (J - 1) >>> 1,
              k = _[q];
            if (0 < p(k, R)) ((_[q] = R), (_[J] = k), (J = q));
            else break e;
          }
        }
        function u(_) {
          return _.length === 0 ? null : _[0];
        }
        function o(_) {
          if (_.length === 0) return null;
          var R = _[0],
            J = _.pop();
          if (J !== R) {
            _[0] = J;
            e: for (var q = 0, k = _.length, b = k >>> 1; q < b; ) {
              var z = 2 * (q + 1) - 1,
                B = _[z],
                Y = z + 1,
                $ = _[Y];
              if (0 > p(B, J))
                Y < k && 0 > p($, B)
                  ? ((_[q] = $), (_[Y] = J), (q = Y))
                  : ((_[q] = B), (_[z] = J), (q = z));
              else if (Y < k && 0 > p($, J)) ((_[q] = $), (_[Y] = J), (q = Y));
              else break e;
            }
          }
          return R;
        }
        function p(_, R) {
          var J = _.sortIndex - R.sortIndex;
          return J !== 0 ? J : _.id - R.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var m = performance;
          c.unstable_now = function () {
            return m.now();
          };
        } else {
          var g = Date,
            S = g.now();
          c.unstable_now = function () {
            return g.now() - S;
          };
        }
        var y = [],
          h = [],
          E = 1,
          H = null,
          U = 3,
          F = !1,
          le = !1,
          Z = !1,
          re = !1,
          ve = typeof setTimeout == 'function' ? setTimeout : null,
          se = typeof clearTimeout == 'function' ? clearTimeout : null,
          _e = typeof setImmediate < 'u' ? setImmediate : null;
        function Ce(_) {
          for (var R = u(h); R !== null; ) {
            if (R.callback === null) o(h);
            else if (R.startTime <= _) (o(h), (R.sortIndex = R.expirationTime), d(y, R));
            else break;
            R = u(h);
          }
        }
        function Ue(_) {
          if (((Z = !1), Ce(_), !le))
            if (u(y) !== null) ((le = !0), ee || ((ee = !0), ke()));
            else {
              var R = u(h);
              R !== null && Oe(Ue, R.startTime - _);
            }
        }
        var ee = !1,
          X = -1,
          D = 5,
          Ne = -1;
        function ye() {
          return re ? !0 : !(c.unstable_now() - Ne < D);
        }
        function Fe() {
          if (((re = !1), ee)) {
            var _ = c.unstable_now();
            Ne = _;
            var R = !0;
            try {
              e: {
                ((le = !1), Z && ((Z = !1), se(X), (X = -1)), (F = !0));
                var J = U;
                try {
                  t: {
                    for (Ce(_), H = u(y); H !== null && !(H.expirationTime > _ && ye()); ) {
                      var q = H.callback;
                      if (typeof q == 'function') {
                        ((H.callback = null), (U = H.priorityLevel));
                        var k = q(H.expirationTime <= _);
                        if (((_ = c.unstable_now()), typeof k == 'function')) {
                          ((H.callback = k), Ce(_), (R = !0));
                          break t;
                        }
                        (H === u(y) && o(y), Ce(_));
                      } else o(y);
                      H = u(y);
                    }
                    if (H !== null) R = !0;
                    else {
                      var b = u(h);
                      (b !== null && Oe(Ue, b.startTime - _), (R = !1));
                    }
                  }
                  break e;
                } finally {
                  ((H = null), (U = J), (F = !1));
                }
                R = void 0;
              }
            } finally {
              R ? ke() : (ee = !1);
            }
          }
        }
        var ke;
        if (typeof _e == 'function')
          ke = function () {
            _e(Fe);
          };
        else if (typeof MessageChannel < 'u') {
          var Nt = new MessageChannel(),
            at = Nt.port2;
          ((Nt.port1.onmessage = Fe),
            (ke = function () {
              at.postMessage(null);
            }));
        } else
          ke = function () {
            ve(Fe, 0);
          };
        function Oe(_, R) {
          X = ve(function () {
            _(c.unstable_now());
          }, R);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (c.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (D = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return U;
          }),
          (c.unstable_next = function (_) {
            switch (U) {
              case 1:
              case 2:
              case 3:
                var R = 3;
                break;
              default:
                R = U;
            }
            var J = U;
            U = R;
            try {
              return _();
            } finally {
              U = J;
            }
          }),
          (c.unstable_requestPaint = function () {
            re = !0;
          }),
          (c.unstable_runWithPriority = function (_, R) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var J = U;
            U = _;
            try {
              return R();
            } finally {
              U = J;
            }
          }),
          (c.unstable_scheduleCallback = function (_, R, J) {
            var q = c.unstable_now();
            switch (
              (typeof J == 'object' && J !== null
                ? ((J = J.delay), (J = typeof J == 'number' && 0 < J ? q + J : q))
                : (J = q),
              _)
            ) {
              case 1:
                var k = -1;
                break;
              case 2:
                k = 250;
                break;
              case 5:
                k = 1073741823;
                break;
              case 4:
                k = 1e4;
                break;
              default:
                k = 5e3;
            }
            return (
              (k = J + k),
              (_ = {
                id: E++,
                callback: R,
                priorityLevel: _,
                startTime: J,
                expirationTime: k,
                sortIndex: -1,
              }),
              J > q
                ? ((_.sortIndex = J),
                  d(h, _),
                  u(y) === null && _ === u(h) && (Z ? (se(X), (X = -1)) : (Z = !0), Oe(Ue, J - q)))
                : ((_.sortIndex = k), d(y, _), le || F || ((le = !0), ee || ((ee = !0), ke()))),
              _
            );
          }),
          (c.unstable_shouldYield = ye),
          (c.unstable_wrapCallback = function (_) {
            var R = U;
            return function () {
              var J = U;
              U = R;
              try {
                return _.apply(this, arguments);
              } finally {
                U = J;
              }
            };
          }));
      })(Wo)),
    Wo
  );
}
var zm;
function Np() {
  return (zm || ((zm = 1), (Fo.exports = jp())), Fo.exports);
}
var Po = { exports: {} },
  lt = {};
var Mm;
function Ap() {
  if (Mm) return lt;
  Mm = 1;
  var c = xr();
  function d(y) {
    var h = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      h += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++) h += '&args[]=' + encodeURIComponent(arguments[E]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      h +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function u() {}
  var o = {
      d: {
        f: u,
        r: function () {
          throw Error(d(522));
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u,
      },
      p: 0,
      findDOMNode: null,
    },
    p = Symbol.for('react.portal');
  function m(y, h, E) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: H == null ? null : '' + H,
      children: y,
      containerInfo: h,
      implementation: E,
    };
  }
  var g = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(y, h) {
    if (y === 'font') return '';
    if (typeof h == 'string') return h === 'use-credentials' ? h : '';
  }
  return (
    (lt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (lt.createPortal = function (y, h) {
      var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)) throw Error(d(299));
      return m(y, h, null, E);
    }),
    (lt.flushSync = function (y) {
      var h = g.T,
        E = o.p;
      try {
        if (((g.T = null), (o.p = 2), y)) return y();
      } finally {
        ((g.T = h), (o.p = E), o.d.f());
      }
    }),
    (lt.preconnect = function (y, h) {
      typeof y == 'string' &&
        (h
          ? ((h = h.crossOrigin),
            (h = typeof h == 'string' ? (h === 'use-credentials' ? h : '') : void 0))
          : (h = null),
        o.d.C(y, h));
    }),
    (lt.prefetchDNS = function (y) {
      typeof y == 'string' && o.d.D(y);
    }),
    (lt.preinit = function (y, h) {
      if (typeof y == 'string' && h && typeof h.as == 'string') {
        var E = h.as,
          H = S(E, h.crossOrigin),
          U = typeof h.integrity == 'string' ? h.integrity : void 0,
          F = typeof h.fetchPriority == 'string' ? h.fetchPriority : void 0;
        E === 'style'
          ? o.d.S(y, typeof h.precedence == 'string' ? h.precedence : void 0, {
              crossOrigin: H,
              integrity: U,
              fetchPriority: F,
            })
          : E === 'script' &&
            o.d.X(y, {
              crossOrigin: H,
              integrity: U,
              fetchPriority: F,
              nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
            });
      }
    }),
    (lt.preinitModule = function (y, h) {
      if (typeof y == 'string')
        if (typeof h == 'object' && h !== null) {
          if (h.as == null || h.as === 'script') {
            var E = S(h.as, h.crossOrigin);
            o.d.M(y, {
              crossOrigin: E,
              integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
              nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
            });
          }
        } else h == null && o.d.M(y);
    }),
    (lt.preload = function (y, h) {
      if (typeof y == 'string' && typeof h == 'object' && h !== null && typeof h.as == 'string') {
        var E = h.as,
          H = S(E, h.crossOrigin);
        o.d.L(y, E, {
          crossOrigin: H,
          integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
          nonce: typeof h.nonce == 'string' ? h.nonce : void 0,
          type: typeof h.type == 'string' ? h.type : void 0,
          fetchPriority: typeof h.fetchPriority == 'string' ? h.fetchPriority : void 0,
          referrerPolicy: typeof h.referrerPolicy == 'string' ? h.referrerPolicy : void 0,
          imageSrcSet: typeof h.imageSrcSet == 'string' ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == 'string' ? h.imageSizes : void 0,
          media: typeof h.media == 'string' ? h.media : void 0,
        });
      }
    }),
    (lt.preloadModule = function (y, h) {
      if (typeof y == 'string')
        if (h) {
          var E = S(h.as, h.crossOrigin);
          o.d.m(y, {
            as: typeof h.as == 'string' && h.as !== 'script' ? h.as : void 0,
            crossOrigin: E,
            integrity: typeof h.integrity == 'string' ? h.integrity : void 0,
          });
        } else o.d.m(y);
    }),
    (lt.requestFormReset = function (y) {
      o.d.r(y);
    }),
    (lt.unstable_batchedUpdates = function (y, h) {
      return y(h);
    }),
    (lt.useFormState = function (y, h, E) {
      return g.H.useFormState(y, h, E);
    }),
    (lt.useFormStatus = function () {
      return g.H.useHostTransitionStatus();
    }),
    (lt.version = '19.2.7'),
    lt
  );
}
var Om;
function Tp() {
  if (Om) return Po.exports;
  Om = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (d) {
        console.error(d);
      }
  }
  return (c(), (Po.exports = Ap()), Po.exports);
}
var Hm;
function Ep() {
  if (Hm) return Xn;
  Hm = 1;
  var c = Np(),
    d = xr(),
    u = Tp();
  function o(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) t += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function p(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function m(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function g(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function S(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (m(e) !== e) throw Error(o(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = m(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var s = n.alternate;
      if (s === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === s.child) {
        for (s = n.child; s; ) {
          if (s === l) return (y(n), e);
          if (s === a) return (y(n), t);
          s = s.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) ((l = n), (a = s));
      else {
        for (var r = !1, f = n.child; f; ) {
          if (f === l) {
            ((r = !0), (l = n), (a = s));
            break;
          }
          if (f === a) {
            ((r = !0), (a = n), (l = s));
            break;
          }
          f = f.sibling;
        }
        if (!r) {
          for (f = s.child; f; ) {
            if (f === l) {
              ((r = !0), (l = s), (a = n));
              break;
            }
            if (f === a) {
              ((r = !0), (a = s), (l = n));
              break;
            }
            f = f.sibling;
          }
          if (!r) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : t;
  }
  function E(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = E(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var H = Object.assign,
    U = Symbol.for('react.element'),
    F = Symbol.for('react.transitional.element'),
    le = Symbol.for('react.portal'),
    Z = Symbol.for('react.fragment'),
    re = Symbol.for('react.strict_mode'),
    ve = Symbol.for('react.profiler'),
    se = Symbol.for('react.consumer'),
    _e = Symbol.for('react.context'),
    Ce = Symbol.for('react.forward_ref'),
    Ue = Symbol.for('react.suspense'),
    ee = Symbol.for('react.suspense_list'),
    X = Symbol.for('react.memo'),
    D = Symbol.for('react.lazy'),
    Ne = Symbol.for('react.activity'),
    ye = Symbol.for('react.memo_cache_sentinel'),
    Fe = Symbol.iterator;
  function ke(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Fe && e[Fe]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Nt = Symbol.for('react.client.reference');
  function at(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Nt ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Z:
        return 'Fragment';
      case ve:
        return 'Profiler';
      case re:
        return 'StrictMode';
      case Ue:
        return 'Suspense';
      case ee:
        return 'SuspenseList';
      case Ne:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case le:
          return 'Portal';
        case _e:
          return e.displayName || 'Context';
        case se:
          return (e._context.displayName || 'Context') + '.Consumer';
        case Ce:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case X:
          return ((t = e.displayName || null), t !== null ? t : at(e.type) || 'Memo');
        case D:
          ((t = e._payload), (e = e._init));
          try {
            return at(e(t));
          } catch {}
      }
    return null;
  }
  var Oe = Array.isArray,
    _ = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = { pending: !1, data: null, method: null, action: null },
    q = [],
    k = -1;
  function b(e) {
    return { current: e };
  }
  function z(e) {
    0 > k || ((e.current = q[k]), (q[k] = null), k--);
  }
  function B(e, t) {
    (k++, (q[k] = e.current), (e.current = t));
  }
  var Y = b(null),
    $ = b(null),
    I = b(null),
    he = b(null);
  function Ke(e, t) {
    switch ((B(I, t), B($, e), B(Y, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Jf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Jf(t)), (e = $f(t, e)));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (z(Y), B(Y, e));
  }
  function ie() {
    (z(Y), z($), z(I));
  }
  function dl(e) {
    e.memoizedState !== null && B(he, e);
    var t = Y.current,
      l = $f(t, e.type);
    t !== l && (B($, e), B(Y, l));
  }
  function Xt(e) {
    ($.current === e && (z(Y), z($)), he.current === e && (z(he), (Ln._currentValue = J)));
  }
  var fl, ia;
  function At(e) {
    if (fl === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((fl = (t && t[1]) || ''),
          (ia =
            -1 <
            l.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < l.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      fl +
      e +
      ia
    );
  }
  var Cc = !1;
  function zc(e, t) {
    if (!e || Cc) return '';
    Cc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var O = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(O.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(O, []);
                } catch (w) {
                  var T = w;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (w) {
                  T = w;
                }
                e.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (w) {
                T = w;
              }
              (O = e()) && typeof O.catch == 'function' && O.catch(function () {});
            }
          } catch (w) {
            if (w && T && typeof w.stack == 'string') return [w.stack, T.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var s = a.DetermineComponentFrameRoot(),
        r = s[0],
        f = s[1];
      if (r && f) {
        var x = r.split(`
`),
          A = f.split(`
`);
        for (n = a = 0; a < x.length && !x[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; n < A.length && !A[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (a === x.length || n === A.length)
          for (a = x.length - 1, n = A.length - 1; 1 <= a && 0 <= n && x[a] !== A[n]; ) n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (x[a] !== A[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || x[a] !== A[n])) {
                  var C =
                    `
` + x[a].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      C.includes('<anonymous>') &&
                      (C = C.replace('<anonymous>', e.displayName)),
                    C
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((Cc = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? At(l) : '';
  }
  function J0(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return At(e.type);
      case 16:
        return At('Lazy');
      case 13:
        return e.child !== t && t !== null ? At('Suspense Fallback') : At('Suspense');
      case 19:
        return At('SuspenseList');
      case 0:
      case 15:
        return zc(e.type, !1);
      case 11:
        return zc(e.type.render, !1);
      case 1:
        return zc(e.type, !0);
      case 31:
        return At('Activity');
      default:
        return '';
    }
  }
  function Ar(e) {
    try {
      var t = '',
        l = null;
      do ((t += J0(e, l)), (l = e), (e = e.return));
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var Mc = Object.prototype.hasOwnProperty,
    Oc = c.unstable_scheduleCallback,
    Hc = c.unstable_cancelCallback,
    $0 = c.unstable_shouldYield,
    F0 = c.unstable_requestPaint,
    ft = c.unstable_now,
    W0 = c.unstable_getCurrentPriorityLevel,
    Tr = c.unstable_ImmediatePriority,
    Er = c.unstable_UserBlockingPriority,
    In = c.unstable_NormalPriority,
    P0 = c.unstable_LowPriority,
    wr = c.unstable_IdlePriority,
    I0 = c.log,
    eh = c.unstable_setDisableYieldValue,
    Wa = null,
    mt = null;
  function ml(e) {
    if ((typeof I0 == 'function' && eh(e), mt && typeof mt.setStrictMode == 'function'))
      try {
        mt.setStrictMode(Wa, e);
      } catch {}
  }
  var ht = Math.clz32 ? Math.clz32 : ah,
    th = Math.log,
    lh = Math.LN2;
  function ah(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((th(e) / lh) | 0)) | 0);
  }
  var es = 256,
    ts = 262144,
    ls = 4194304;
  function Ll(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function as(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      s = e.suspendedLanes,
      r = e.pingedLanes;
    e = e.warmLanes;
    var f = a & 134217727;
    return (
      f !== 0
        ? ((a = f & ~s),
          a !== 0
            ? (n = Ll(a))
            : ((r &= f), r !== 0 ? (n = Ll(r)) : l || ((l = f & ~e), l !== 0 && (n = Ll(l)))))
        : ((f = a & ~s),
          f !== 0
            ? (n = Ll(f))
            : r !== 0
              ? (n = Ll(r))
              : l || ((l = a & ~e), l !== 0 && (n = Ll(l)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & s) === 0 &&
            ((s = n & -n), (l = t & -t), s >= l || (s === 32 && (l & 4194048) !== 0))
          ? t
          : n
    );
  }
  function Pa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function nh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _r() {
    var e = ls;
    return ((ls <<= 1), (ls & 62914560) === 0 && (ls = 4194304), e);
  }
  function kc(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ia(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function sh(e, t, l, a, n, s) {
    var r = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var f = e.entanglements,
      x = e.expirationTimes,
      A = e.hiddenUpdates;
    for (l = r & ~l; 0 < l; ) {
      var C = 31 - ht(l),
        O = 1 << C;
      ((f[C] = 0), (x[C] = -1));
      var T = A[C];
      if (T !== null)
        for (A[C] = null, C = 0; C < T.length; C++) {
          var w = T[C];
          w !== null && (w.lane &= -536870913);
        }
      l &= ~O;
    }
    (a !== 0 && Cr(e, a, 0),
      s !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(r & ~t)));
  }
  function Cr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - ht(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function zr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - ht(l),
        n = 1 << a;
      ((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n));
    }
  }
  function Mr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : Dc(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function Dc(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Rc(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Or() {
    var e = R.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : ym(e.type));
  }
  function Hr(e, t) {
    var l = R.p;
    try {
      return ((R.p = e), t());
    } finally {
      R.p = l;
    }
  }
  var hl = Math.random().toString(36).slice(2),
    We = '__reactFiber$' + hl,
    st = '__reactProps$' + hl,
    oa = '__reactContainer$' + hl,
    Bc = '__reactEvents$' + hl,
    ch = '__reactListeners$' + hl,
    ih = '__reactHandles$' + hl,
    kr = '__reactResources$' + hl,
    en = '__reactMarker$' + hl;
  function Uc(e) {
    (delete e[We], delete e[st], delete e[Bc], delete e[ch], delete e[ih]);
  }
  function ra(e) {
    var t = e[We];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[oa] || l[We])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = lm(e); e !== null; ) {
            if ((l = e[We])) return l;
            e = lm(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function ua(e) {
    if ((e = e[We] || e[oa])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function tn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function da(e) {
    var t = e[kr];
    return (t || (t = e[kr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Je(e) {
    e[en] = !0;
  }
  var Dr = new Set(),
    Rr = {};
  function Gl(e, t) {
    (fa(e, t), fa(e + 'Capture', t));
  }
  function fa(e, t) {
    for (Rr[e] = t, e = 0; e < t.length; e++) Dr.add(t[e]);
  }
  var oh = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Br = {},
    Ur = {};
  function rh(e) {
    return Mc.call(Ur, e)
      ? !0
      : Mc.call(Br, e)
        ? !1
        : oh.test(e)
          ? (Ur[e] = !0)
          : ((Br[e] = !0), !1);
  }
  function ns(e, t, l) {
    if (rh(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var a = t.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + l);
      }
  }
  function ss(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + l);
    }
  }
  function Zt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, '' + a);
    }
  }
  function Tt(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function qr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function uh(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var n = a.get,
        s = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (r) {
            ((l = '' + r), s.call(this, r));
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (r) {
            l = '' + r;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function qc(e) {
    if (!e._valueTracker) {
      var t = qr(e) ? 'checked' : 'value';
      e._valueTracker = uh(e, t, '' + e[t]);
    }
  }
  function Lr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = '';
    return (
      e && (a = qr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function cs(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var dh = /[\n"\\]/g;
  function Et(e) {
    return e.replace(dh, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Lc(e, t, l, a, n, s, r, f) {
    ((e.name = ''),
      r != null && typeof r != 'function' && typeof r != 'symbol' && typeof r != 'boolean'
        ? (e.type = r)
        : e.removeAttribute('type'),
      t != null
        ? r === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Tt(t))
          : e.value !== '' + Tt(t) && (e.value = '' + Tt(t))
        : (r !== 'submit' && r !== 'reset') || e.removeAttribute('value'),
      t != null
        ? Gc(e, r, Tt(t))
        : l != null
          ? Gc(e, r, Tt(l))
          : a != null && e.removeAttribute('value'),
      n == null && s != null && (e.defaultChecked = !!s),
      n != null && (e.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.name = '' + Tt(f))
        : e.removeAttribute('name'));
  }
  function Gr(e, t, l, a, n, s, r, f) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || l != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        qc(e);
        return;
      }
      ((l = l != null ? '' + Tt(l) : ''),
        (t = t != null ? '' + Tt(t) : l),
        f || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? n),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (e.checked = f ? e.checked : !!a),
      (e.defaultChecked = !!a),
      r != null &&
        typeof r != 'function' &&
        typeof r != 'symbol' &&
        typeof r != 'boolean' &&
        (e.name = r),
      qc(e));
  }
  function Gc(e, t, l) {
    (t === 'number' && cs(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function ma(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < l.length; n++) t['$' + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        ((n = t.hasOwnProperty('$' + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0));
    } else {
      for (l = '' + Tt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          ((e[n].selected = !0), a && (e[n].defaultSelected = !0));
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Yr(e, t, l) {
    if (t != null && ((t = '' + Tt(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Tt(l) : '';
  }
  function Qr(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (Oe(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (t = l));
    }
    ((l = Tt(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== '' && a !== null && (e.value = a),
      qc(e));
  }
  function ha(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var fh = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Vr(e, t, l) {
    var a = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : a
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || fh.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function Xr(e, t, l) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? e.setProperty(a, '')
            : a === 'float'
              ? (e.cssFloat = '')
              : (e[a] = ''));
      for (var n in t) ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && Vr(e, n, a));
    } else for (var s in t) t.hasOwnProperty(s) && Vr(e, s, t[s]);
  }
  function Yc(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var mh = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    hh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function is(e) {
    return hh.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Kt() {}
  var Qc = null;
  function Vc(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var pa = null,
    xa = null;
  function Zr(e) {
    var t = ua(e);
    if (t && (e = t.stateNode)) {
      var l = e[st] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Lc(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === 'radio' && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll('input[name="' + Et('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[st] || null;
                if (!n) throw Error(o(90));
                Lc(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < l.length; t++) ((a = l[t]), a.form === e.form && Lr(a));
          }
          break e;
        case 'textarea':
          Yr(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && ma(e, !!l.multiple, t, !1));
      }
    }
  }
  var Xc = !1;
  function Kr(e, t, l) {
    if (Xc) return e(t, l);
    Xc = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Xc = !1),
        (pa !== null || xa !== null) &&
          (Js(), pa && ((t = pa), (e = xa), (xa = pa = null), Zr(t), e)))
      )
        for (t = 0; t < e.length; t++) Zr(e[t]);
    }
  }
  function ln(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[st] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != 'function') throw Error(o(231, t, typeof l));
    return l;
  }
  var Jt = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Zc = !1;
  if (Jt)
    try {
      var an = {};
      (Object.defineProperty(an, 'passive', {
        get: function () {
          Zc = !0;
        },
      }),
        window.addEventListener('test', an, an),
        window.removeEventListener('test', an, an));
    } catch {
      Zc = !1;
    }
  var pl = null,
    Kc = null,
    os = null;
  function Jr() {
    if (os) return os;
    var e,
      t = Kc,
      l = t.length,
      a,
      n = 'value' in pl ? pl.value : pl.textContent,
      s = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++);
    var r = l - e;
    for (a = 1; a <= r && t[l - a] === n[s - a]; a++);
    return (os = n.slice(e, 1 < a ? 1 - a : void 0));
  }
  function rs(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function us() {
    return !0;
  }
  function $r() {
    return !1;
  }
  function ct(e) {
    function t(l, a, n, s, r) {
      ((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = s),
        (this.target = r),
        (this.currentTarget = null));
      for (var f in e) e.hasOwnProperty(f) && ((l = e[f]), (this[f] = l ? l(s) : s[f]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? us
          : $r),
        (this.isPropagationStopped = $r),
        this
      );
    }
    return (
      H(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = us));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = us));
        },
        persist: function () {},
        isPersistent: us,
      }),
      t
    );
  }
  var Yl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ds = ct(Yl),
    nn = H({}, Yl, { view: 0, detail: 0 }),
    ph = ct(nn),
    Jc,
    $c,
    sn,
    fs = H({}, nn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Wc,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== sn &&
              (sn && e.type === 'mousemove'
                ? ((Jc = e.screenX - sn.screenX), ($c = e.screenY - sn.screenY))
                : ($c = Jc = 0),
              (sn = e)),
            Jc);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : $c;
      },
    }),
    Fr = ct(fs),
    xh = H({}, fs, { dataTransfer: 0 }),
    gh = ct(xh),
    yh = H({}, nn, { relatedTarget: 0 }),
    Fc = ct(yh),
    bh = H({}, Yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    vh = ct(bh),
    Sh = H({}, Yl, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    jh = ct(Sh),
    Nh = H({}, Yl, { data: 0 }),
    Wr = ct(Nh),
    Ah = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Th = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Eh = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function wh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Eh[e]) ? !!t[e] : !1;
  }
  function Wc() {
    return wh;
  }
  var _h = H({}, nn, {
      key: function (e) {
        if (e.key) {
          var t = Ah[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = rs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Th[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Wc,
      charCode: function (e) {
        return e.type === 'keypress' ? rs(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? rs(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Ch = ct(_h),
    zh = H({}, fs, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Pr = ct(zh),
    Mh = H({}, nn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Wc,
    }),
    Oh = ct(Mh),
    Hh = H({}, Yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    kh = ct(Hh),
    Dh = H({}, fs, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Rh = ct(Dh),
    Bh = H({}, Yl, { newState: 0, oldState: 0 }),
    Uh = ct(Bh),
    qh = [9, 13, 27, 32],
    Pc = Jt && 'CompositionEvent' in window,
    cn = null;
  Jt && 'documentMode' in document && (cn = document.documentMode);
  var Lh = Jt && 'TextEvent' in window && !cn,
    Ir = Jt && (!Pc || (cn && 8 < cn && 11 >= cn)),
    eu = ' ',
    tu = !1;
  function lu(e, t) {
    switch (e) {
      case 'keyup':
        return qh.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function au(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var ga = !1;
  function Gh(e, t) {
    switch (e) {
      case 'compositionend':
        return au(t);
      case 'keypress':
        return t.which !== 32 ? null : ((tu = !0), eu);
      case 'textInput':
        return ((e = t.data), e === eu && tu ? null : e);
      default:
        return null;
    }
  }
  function Yh(e, t) {
    if (ga)
      return e === 'compositionend' || (!Pc && lu(e, t))
        ? ((e = Jr()), (os = Kc = pl = null), (ga = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return Ir && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Qh = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function nu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Qh[e.type] : t === 'textarea';
  }
  function su(e, t, l, a) {
    (pa ? (xa ? xa.push(a) : (xa = [a])) : (pa = a),
      (t = tc(t, 'onChange')),
      0 < t.length &&
        ((l = new ds('onChange', 'change', null, l, a)), e.push({ event: l, listeners: t })));
  }
  var on = null,
    rn = null;
  function Vh(e) {
    Yf(e, 0);
  }
  function ms(e) {
    var t = tn(e);
    if (Lr(t)) return e;
  }
  function cu(e, t) {
    if (e === 'change') return t;
  }
  var iu = !1;
  if (Jt) {
    var Ic;
    if (Jt) {
      var ei = 'oninput' in document;
      if (!ei) {
        var ou = document.createElement('div');
        (ou.setAttribute('oninput', 'return;'), (ei = typeof ou.oninput == 'function'));
      }
      Ic = ei;
    } else Ic = !1;
    iu = Ic && (!document.documentMode || 9 < document.documentMode);
  }
  function ru() {
    on && (on.detachEvent('onpropertychange', uu), (rn = on = null));
  }
  function uu(e) {
    if (e.propertyName === 'value' && ms(rn)) {
      var t = [];
      (su(t, rn, e, Vc(e)), Kr(Vh, t));
    }
  }
  function Xh(e, t, l) {
    e === 'focusin'
      ? (ru(), (on = t), (rn = l), on.attachEvent('onpropertychange', uu))
      : e === 'focusout' && ru();
  }
  function Zh(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return ms(rn);
  }
  function Kh(e, t) {
    if (e === 'click') return ms(t);
  }
  function Jh(e, t) {
    if (e === 'input' || e === 'change') return ms(t);
  }
  function $h(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var pt = typeof Object.is == 'function' ? Object.is : $h;
  function un(e, t) {
    if (pt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Mc.call(t, n) || !pt(e[n], t[n])) return !1;
    }
    return !0;
  }
  function du(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function fu(e, t) {
    var l = du(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t)) return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = du(l);
    }
  }
  function mu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? mu(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function hu(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = cs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = cs(e.document);
    }
    return t;
  }
  function ti(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var Fh = Jt && 'documentMode' in document && 11 >= document.documentMode,
    ya = null,
    li = null,
    dn = null,
    ai = !1;
  function pu(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ai ||
      ya == null ||
      ya !== cs(a) ||
      ((a = ya),
      'selectionStart' in a && ti(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (dn && un(dn, a)) ||
        ((dn = a),
        (a = tc(li, 'onSelect')),
        0 < a.length &&
          ((t = new ds('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = ya))));
  }
  function Ql(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var ba = {
      animationend: Ql('Animation', 'AnimationEnd'),
      animationiteration: Ql('Animation', 'AnimationIteration'),
      animationstart: Ql('Animation', 'AnimationStart'),
      transitionrun: Ql('Transition', 'TransitionRun'),
      transitionstart: Ql('Transition', 'TransitionStart'),
      transitioncancel: Ql('Transition', 'TransitionCancel'),
      transitionend: Ql('Transition', 'TransitionEnd'),
    },
    ni = {},
    xu = {};
  Jt &&
    ((xu = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ba.animationend.animation,
      delete ba.animationiteration.animation,
      delete ba.animationstart.animation),
    'TransitionEvent' in window || delete ba.transitionend.transition);
  function Vl(e) {
    if (ni[e]) return ni[e];
    if (!ba[e]) return e;
    var t = ba[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in xu) return (ni[e] = t[l]);
    return e;
  }
  var gu = Vl('animationend'),
    yu = Vl('animationiteration'),
    bu = Vl('animationstart'),
    Wh = Vl('transitionrun'),
    Ph = Vl('transitionstart'),
    Ih = Vl('transitioncancel'),
    vu = Vl('transitionend'),
    Su = new Map(),
    si =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  si.push('scrollEnd');
  function Rt(e, t) {
    (Su.set(e, t), Gl(t, [e]));
  }
  var hs =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == 'object' && e !== null && typeof e.message == 'string'
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', e);
              return;
            }
            console.error(e);
          },
    wt = [],
    va = 0,
    ci = 0;
  function ps() {
    for (var e = va, t = (ci = va = 0); t < e; ) {
      var l = wt[t];
      wt[t++] = null;
      var a = wt[t];
      wt[t++] = null;
      var n = wt[t];
      wt[t++] = null;
      var s = wt[t];
      if (((wt[t++] = null), a !== null && n !== null)) {
        var r = a.pending;
        (r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)), (a.pending = n));
      }
      s !== 0 && ju(l, n, s);
    }
  }
  function xs(e, t, l, a) {
    ((wt[va++] = e),
      (wt[va++] = t),
      (wt[va++] = l),
      (wt[va++] = a),
      (ci |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function ii(e, t, l, a) {
    return (xs(e, t, l, a), gs(e));
  }
  function Xl(e, t) {
    return (xs(e, null, null, t), gs(e));
  }
  function ju(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, s = e.return; s !== null; )
      ((s.childLanes |= l),
        (a = s.alternate),
        a !== null && (a.childLanes |= l),
        s.tag === 22 && ((e = s.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = s),
        (s = s.return));
    return e.tag === 3
      ? ((s = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - ht(l)),
          (e = s.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        s)
      : null;
  }
  function gs(e) {
    if (50 < Hn) throw ((Hn = 0), (go = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Sa = {};
  function e1(e, t, l, a) {
    ((this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function xt(e, t, l, a) {
    return new e1(e, t, l, a);
  }
  function oi(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function $t(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = xt(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function Nu(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ys(e, t, l, a, n, s) {
    var r = 0;
    if (((a = e), typeof e == 'function')) oi(e) && (r = 1);
    else if (typeof e == 'string')
      r = sp(e, l, Y.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case Ne:
          return ((e = xt(31, l, t, n)), (e.elementType = Ne), (e.lanes = s), e);
        case Z:
          return Zl(l.children, n, s, t);
        case re:
          ((r = 8), (n |= 24));
          break;
        case ve:
          return ((e = xt(12, l, t, n | 2)), (e.elementType = ve), (e.lanes = s), e);
        case Ue:
          return ((e = xt(13, l, t, n)), (e.elementType = Ue), (e.lanes = s), e);
        case ee:
          return ((e = xt(19, l, t, n)), (e.elementType = ee), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case _e:
                r = 10;
                break e;
              case se:
                r = 9;
                break e;
              case Ce:
                r = 11;
                break e;
              case X:
                r = 14;
                break e;
              case D:
                ((r = 16), (a = null));
                break e;
            }
          ((r = 29), (l = Error(o(130, e === null ? 'null' : typeof e, ''))), (a = null));
      }
    return ((t = xt(r, l, t, n)), (t.elementType = e), (t.type = a), (t.lanes = s), t);
  }
  function Zl(e, t, l, a) {
    return ((e = xt(7, e, a, t)), (e.lanes = l), e);
  }
  function ri(e, t, l) {
    return ((e = xt(6, e, null, t)), (e.lanes = l), e);
  }
  function Au(e) {
    var t = xt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function ui(e, t, l) {
    return (
      (t = xt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Tu = new WeakMap();
  function _t(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Tu.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Ar(t) }), Tu.set(e, t), t);
    }
    return { value: e, source: t, stack: Ar(t) };
  }
  var ja = [],
    Na = 0,
    bs = null,
    fn = 0,
    Ct = [],
    zt = 0,
    xl = null,
    Lt = 1,
    Gt = '';
  function Ft(e, t) {
    ((ja[Na++] = fn), (ja[Na++] = bs), (bs = e), (fn = t));
  }
  function Eu(e, t, l) {
    ((Ct[zt++] = Lt), (Ct[zt++] = Gt), (Ct[zt++] = xl), (xl = e));
    var a = Lt;
    e = Gt;
    var n = 32 - ht(a) - 1;
    ((a &= ~(1 << n)), (l += 1));
    var s = 32 - ht(t) + n;
    if (30 < s) {
      var r = n - (n % 5);
      ((s = (a & ((1 << r) - 1)).toString(32)),
        (a >>= r),
        (n -= r),
        (Lt = (1 << (32 - ht(t) + n)) | (l << n) | a),
        (Gt = s + e));
    } else ((Lt = (1 << s) | (l << n) | a), (Gt = e));
  }
  function di(e) {
    e.return !== null && (Ft(e, 1), Eu(e, 1, 0));
  }
  function fi(e) {
    for (; e === bs; ) ((bs = ja[--Na]), (ja[Na] = null), (fn = ja[--Na]), (ja[Na] = null));
    for (; e === xl; )
      ((xl = Ct[--zt]),
        (Ct[zt] = null),
        (Gt = Ct[--zt]),
        (Ct[zt] = null),
        (Lt = Ct[--zt]),
        (Ct[zt] = null));
  }
  function wu(e, t) {
    ((Ct[zt++] = Lt), (Ct[zt++] = Gt), (Ct[zt++] = xl), (Lt = t.id), (Gt = t.overflow), (xl = e));
  }
  var Pe = null,
    ze = null,
    pe = !1,
    gl = null,
    Mt = !1,
    mi = Error(o(519));
  function yl(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (mn(_t(t, e)), mi);
  }
  function _u(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[We] = e), (t[st] = a), l)) {
      case 'dialog':
        (de('cancel', t), de('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        de('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < Dn.length; l++) de(Dn[l], t);
        break;
      case 'source':
        de('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (de('error', t), de('load', t));
        break;
      case 'details':
        de('toggle', t);
        break;
      case 'input':
        (de('invalid', t),
          Gr(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        de('invalid', t);
        break;
      case 'textarea':
        (de('invalid', t), Qr(t, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      Zf(t.textContent, l)
        ? (a.popover != null && (de('beforetoggle', t), de('toggle', t)),
          a.onScroll != null && de('scroll', t),
          a.onScrollEnd != null && de('scrollend', t),
          a.onClick != null && (t.onclick = Kt),
          (t = !0))
        : (t = !1),
      t || yl(e, !0));
  }
  function Cu(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
        case 5:
        case 31:
        case 13:
          Mt = !1;
          return;
        case 27:
        case 3:
          Mt = !0;
          return;
        default:
          Pe = Pe.return;
      }
  }
  function Aa(e) {
    if (e !== Pe) return !1;
    if (!pe) return (Cu(e), (pe = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || Oo(e.type, e.memoizedProps))),
        (l = !l)),
      l && ze && yl(e),
      Cu(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      ze = tm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      ze = tm(e);
    } else
      t === 27
        ? ((t = ze), Ol(e.type) ? ((e = Bo), (Bo = null), (ze = e)) : (ze = t))
        : (ze = Pe ? Ht(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Kl() {
    ((ze = Pe = null), (pe = !1));
  }
  function hi() {
    var e = gl;
    return (e !== null && (ut === null ? (ut = e) : ut.push.apply(ut, e), (gl = null)), e);
  }
  function mn(e) {
    gl === null ? (gl = [e]) : gl.push(e);
  }
  var pi = b(null),
    Jl = null,
    Wt = null;
  function bl(e, t, l) {
    (B(pi, t._currentValue), (t._currentValue = l));
  }
  function Pt(e) {
    ((e._currentValue = pi.current), z(pi));
  }
  function xi(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function gi(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var s = n.dependencies;
      if (s !== null) {
        var r = n.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var f = s;
          s = n;
          for (var x = 0; x < t.length; x++)
            if (f.context === t[x]) {
              ((s.lanes |= l),
                (f = s.alternate),
                f !== null && (f.lanes |= l),
                xi(s.return, l, e),
                a || (r = null));
              break e;
            }
          s = f.next;
        }
      } else if (n.tag === 18) {
        if (((r = n.return), r === null)) throw Error(o(341));
        ((r.lanes |= l), (s = r.alternate), s !== null && (s.lanes |= l), xi(r, l, e), (r = null));
      } else r = n.child;
      if (r !== null) r.return = n;
      else
        for (r = n; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          if (((n = r.sibling), n !== null)) {
            ((n.return = r.return), (r = n));
            break;
          }
          r = r.return;
        }
      n = r;
    }
  }
  function Ta(e, t, l, a) {
    e = null;
    for (var n = t, s = !1; n !== null; ) {
      if (!s) {
        if ((n.flags & 524288) !== 0) s = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var r = n.alternate;
        if (r === null) throw Error(o(387));
        if (((r = r.memoizedProps), r !== null)) {
          var f = n.type;
          pt(n.pendingProps.value, r.value) || (e !== null ? e.push(f) : (e = [f]));
        }
      } else if (n === he.current) {
        if (((r = n.alternate), r === null)) throw Error(o(387));
        r.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Ln) : (e = [Ln]));
      }
      n = n.return;
    }
    (e !== null && gi(t, e, l, a), (t.flags |= 262144));
  }
  function vs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!pt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function $l(e) {
    ((Jl = e), (Wt = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function Ie(e) {
    return zu(Jl, e);
  }
  function Ss(e, t) {
    return (Jl === null && $l(e), zu(e, t));
  }
  function zu(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Wt === null)) {
      if (e === null) throw Error(o(308));
      ((Wt = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Wt = Wt.next = t;
    return l;
  }
  var t1 =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    l1 = c.unstable_scheduleCallback,
    a1 = c.unstable_NormalPriority,
    Ge = {
      $$typeof: _e,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function yi() {
    return { controller: new t1(), data: new Map(), refCount: 0 };
  }
  function hn(e) {
    (e.refCount--,
      e.refCount === 0 &&
        l1(a1, function () {
          e.controller.abort();
        }));
  }
  var pn = null,
    bi = 0,
    Ea = 0,
    wa = null;
  function n1(e, t) {
    if (pn === null) {
      var l = (pn = []);
      ((bi = 0),
        (Ea = No()),
        (wa = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (bi++, t.then(Mu, Mu), t);
  }
  function Mu() {
    if (--bi === 0 && pn !== null) {
      wa !== null && (wa.status = 'fulfilled');
      var e = pn;
      ((pn = null), (Ea = 0), (wa = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function s1(e, t) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = t));
          for (var n = 0; n < l.length; n++) (0, l[n])(t);
        },
        function (n) {
          for (a.status = 'rejected', a.reason = n, n = 0; n < l.length; n++) (0, l[n])(void 0);
        }
      ),
      a
    );
  }
  var Ou = _.S;
  _.S = function (e, t) {
    ((xf = ft()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && n1(e, t),
      Ou !== null && Ou(e, t));
  };
  var Fl = b(null);
  function vi() {
    var e = Fl.current;
    return e !== null ? e : we.pooledCache;
  }
  function js(e, t) {
    t === null ? B(Fl, Fl.current) : B(Fl, t.pool);
  }
  function Hu() {
    var e = vi();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var _a = Error(o(460)),
    Si = Error(o(474)),
    Ns = Error(o(542)),
    As = { then: function () {} };
  function ku(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Du(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(Kt, Kt), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Bu(e), e);
      default:
        if (typeof t.status == 'string') t.then(Kt, Kt);
        else {
          if (((e = we), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (a) {
                if (t.status === 'pending') {
                  var n = t;
                  ((n.status = 'fulfilled'), (n.value = a));
                }
              },
              function (a) {
                if (t.status === 'pending') {
                  var n = t;
                  ((n.status = 'rejected'), (n.reason = a));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Bu(e), e);
        }
        throw ((Pl = t), _a);
    }
  }
  function Wl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((Pl = l), _a) : l;
    }
  }
  var Pl = null;
  function Ru() {
    if (Pl === null) throw Error(o(459));
    var e = Pl;
    return ((Pl = null), e);
  }
  function Bu(e) {
    if (e === _a || e === Ns) throw Error(o(483));
  }
  var Ca = null,
    xn = 0;
  function Ts(e) {
    var t = xn;
    return ((xn += 1), Ca === null && (Ca = []), Du(Ca, e, t));
  }
  function gn(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Es(e, t) {
    throw t.$$typeof === U
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Uu(e) {
    function t(j, v) {
      if (e) {
        var N = j.deletions;
        N === null ? ((j.deletions = [v]), (j.flags |= 16)) : N.push(v);
      }
    }
    function l(j, v) {
      if (!e) return null;
      for (; v !== null; ) (t(j, v), (v = v.sibling));
      return null;
    }
    function a(j) {
      for (var v = new Map(); j !== null; )
        (j.key !== null ? v.set(j.key, j) : v.set(j.index, j), (j = j.sibling));
      return v;
    }
    function n(j, v) {
      return ((j = $t(j, v)), (j.index = 0), (j.sibling = null), j);
    }
    function s(j, v, N) {
      return (
        (j.index = N),
        e
          ? ((N = j.alternate),
            N !== null
              ? ((N = N.index), N < v ? ((j.flags |= 67108866), v) : N)
              : ((j.flags |= 67108866), v))
          : ((j.flags |= 1048576), v)
      );
    }
    function r(j) {
      return (e && j.alternate === null && (j.flags |= 67108866), j);
    }
    function f(j, v, N, M) {
      return v === null || v.tag !== 6
        ? ((v = ri(N, j.mode, M)), (v.return = j), v)
        : ((v = n(v, N)), (v.return = j), v);
    }
    function x(j, v, N, M) {
      var W = N.type;
      return W === Z
        ? C(j, v, N.props.children, M, N.key)
        : v !== null &&
            (v.elementType === W ||
              (typeof W == 'object' && W !== null && W.$$typeof === D && Wl(W) === v.type))
          ? ((v = n(v, N.props)), gn(v, N), (v.return = j), v)
          : ((v = ys(N.type, N.key, N.props, null, j.mode, M)), gn(v, N), (v.return = j), v);
    }
    function A(j, v, N, M) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== N.containerInfo ||
        v.stateNode.implementation !== N.implementation
        ? ((v = ui(N, j.mode, M)), (v.return = j), v)
        : ((v = n(v, N.children || [])), (v.return = j), v);
    }
    function C(j, v, N, M, W) {
      return v === null || v.tag !== 7
        ? ((v = Zl(N, j.mode, M, W)), (v.return = j), v)
        : ((v = n(v, N)), (v.return = j), v);
    }
    function O(j, v, N) {
      if ((typeof v == 'string' && v !== '') || typeof v == 'number' || typeof v == 'bigint')
        return ((v = ri('' + v, j.mode, N)), (v.return = j), v);
      if (typeof v == 'object' && v !== null) {
        switch (v.$$typeof) {
          case F:
            return ((N = ys(v.type, v.key, v.props, null, j.mode, N)), gn(N, v), (N.return = j), N);
          case le:
            return ((v = ui(v, j.mode, N)), (v.return = j), v);
          case D:
            return ((v = Wl(v)), O(j, v, N));
        }
        if (Oe(v) || ke(v)) return ((v = Zl(v, j.mode, N, null)), (v.return = j), v);
        if (typeof v.then == 'function') return O(j, Ts(v), N);
        if (v.$$typeof === _e) return O(j, Ss(j, v), N);
        Es(j, v);
      }
      return null;
    }
    function T(j, v, N, M) {
      var W = v !== null ? v.key : null;
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return W !== null ? null : f(j, v, '' + N, M);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case F:
            return N.key === W ? x(j, v, N, M) : null;
          case le:
            return N.key === W ? A(j, v, N, M) : null;
          case D:
            return ((N = Wl(N)), T(j, v, N, M));
        }
        if (Oe(N) || ke(N)) return W !== null ? null : C(j, v, N, M, null);
        if (typeof N.then == 'function') return T(j, v, Ts(N), M);
        if (N.$$typeof === _e) return T(j, v, Ss(j, N), M);
        Es(j, N);
      }
      return null;
    }
    function w(j, v, N, M, W) {
      if ((typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint')
        return ((j = j.get(N) || null), f(v, j, '' + M, W));
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case F:
            return ((j = j.get(M.key === null ? N : M.key) || null), x(v, j, M, W));
          case le:
            return ((j = j.get(M.key === null ? N : M.key) || null), A(v, j, M, W));
          case D:
            return ((M = Wl(M)), w(j, v, N, M, W));
        }
        if (Oe(M) || ke(M)) return ((j = j.get(N) || null), C(v, j, M, W, null));
        if (typeof M.then == 'function') return w(j, v, N, Ts(M), W);
        if (M.$$typeof === _e) return w(j, v, N, Ss(v, M), W);
        Es(v, M);
      }
      return null;
    }
    function V(j, v, N, M) {
      for (
        var W = null, xe = null, K = v, ce = (v = 0), me = null;
        K !== null && ce < N.length;
        ce++
      ) {
        K.index > ce ? ((me = K), (K = null)) : (me = K.sibling);
        var ge = T(j, K, N[ce], M);
        if (ge === null) {
          K === null && (K = me);
          break;
        }
        (e && K && ge.alternate === null && t(j, K),
          (v = s(ge, v, ce)),
          xe === null ? (W = ge) : (xe.sibling = ge),
          (xe = ge),
          (K = me));
      }
      if (ce === N.length) return (l(j, K), pe && Ft(j, ce), W);
      if (K === null) {
        for (; ce < N.length; ce++)
          ((K = O(j, N[ce], M)),
            K !== null && ((v = s(K, v, ce)), xe === null ? (W = K) : (xe.sibling = K), (xe = K)));
        return (pe && Ft(j, ce), W);
      }
      for (K = a(K); ce < N.length; ce++)
        ((me = w(K, j, ce, N[ce], M)),
          me !== null &&
            (e && me.alternate !== null && K.delete(me.key === null ? ce : me.key),
            (v = s(me, v, ce)),
            xe === null ? (W = me) : (xe.sibling = me),
            (xe = me)));
      return (
        e &&
          K.forEach(function (Bl) {
            return t(j, Bl);
          }),
        pe && Ft(j, ce),
        W
      );
    }
    function te(j, v, N, M) {
      if (N == null) throw Error(o(151));
      for (
        var W = null, xe = null, K = v, ce = (v = 0), me = null, ge = N.next();
        K !== null && !ge.done;
        ce++, ge = N.next()
      ) {
        K.index > ce ? ((me = K), (K = null)) : (me = K.sibling);
        var Bl = T(j, K, ge.value, M);
        if (Bl === null) {
          K === null && (K = me);
          break;
        }
        (e && K && Bl.alternate === null && t(j, K),
          (v = s(Bl, v, ce)),
          xe === null ? (W = Bl) : (xe.sibling = Bl),
          (xe = Bl),
          (K = me));
      }
      if (ge.done) return (l(j, K), pe && Ft(j, ce), W);
      if (K === null) {
        for (; !ge.done; ce++, ge = N.next())
          ((ge = O(j, ge.value, M)),
            ge !== null &&
              ((v = s(ge, v, ce)), xe === null ? (W = ge) : (xe.sibling = ge), (xe = ge)));
        return (pe && Ft(j, ce), W);
      }
      for (K = a(K); !ge.done; ce++, ge = N.next())
        ((ge = w(K, j, ce, ge.value, M)),
          ge !== null &&
            (e && ge.alternate !== null && K.delete(ge.key === null ? ce : ge.key),
            (v = s(ge, v, ce)),
            xe === null ? (W = ge) : (xe.sibling = ge),
            (xe = ge)));
      return (
        e &&
          K.forEach(function (xp) {
            return t(j, xp);
          }),
        pe && Ft(j, ce),
        W
      );
    }
    function Ee(j, v, N, M) {
      if (
        (typeof N == 'object' &&
          N !== null &&
          N.type === Z &&
          N.key === null &&
          (N = N.props.children),
        typeof N == 'object' && N !== null)
      ) {
        switch (N.$$typeof) {
          case F:
            e: {
              for (var W = N.key; v !== null; ) {
                if (v.key === W) {
                  if (((W = N.type), W === Z)) {
                    if (v.tag === 7) {
                      (l(j, v.sibling), (M = n(v, N.props.children)), (M.return = j), (j = M));
                      break e;
                    }
                  } else if (
                    v.elementType === W ||
                    (typeof W == 'object' && W !== null && W.$$typeof === D && Wl(W) === v.type)
                  ) {
                    (l(j, v.sibling), (M = n(v, N.props)), gn(M, N), (M.return = j), (j = M));
                    break e;
                  }
                  l(j, v);
                  break;
                } else t(j, v);
                v = v.sibling;
              }
              N.type === Z
                ? ((M = Zl(N.props.children, j.mode, M, N.key)), (M.return = j), (j = M))
                : ((M = ys(N.type, N.key, N.props, null, j.mode, M)),
                  gn(M, N),
                  (M.return = j),
                  (j = M));
            }
            return r(j);
          case le:
            e: {
              for (W = N.key; v !== null; ) {
                if (v.key === W)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === N.containerInfo &&
                    v.stateNode.implementation === N.implementation
                  ) {
                    (l(j, v.sibling), (M = n(v, N.children || [])), (M.return = j), (j = M));
                    break e;
                  } else {
                    l(j, v);
                    break;
                  }
                else t(j, v);
                v = v.sibling;
              }
              ((M = ui(N, j.mode, M)), (M.return = j), (j = M));
            }
            return r(j);
          case D:
            return ((N = Wl(N)), Ee(j, v, N, M));
        }
        if (Oe(N)) return V(j, v, N, M);
        if (ke(N)) {
          if (((W = ke(N)), typeof W != 'function')) throw Error(o(150));
          return ((N = W.call(N)), te(j, v, N, M));
        }
        if (typeof N.then == 'function') return Ee(j, v, Ts(N), M);
        if (N.$$typeof === _e) return Ee(j, v, Ss(j, N), M);
        Es(j, N);
      }
      return (typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint'
        ? ((N = '' + N),
          v !== null && v.tag === 6
            ? (l(j, v.sibling), (M = n(v, N)), (M.return = j), (j = M))
            : (l(j, v), (M = ri(N, j.mode, M)), (M.return = j), (j = M)),
          r(j))
        : l(j, v);
    }
    return function (j, v, N, M) {
      try {
        xn = 0;
        var W = Ee(j, v, N, M);
        return ((Ca = null), W);
      } catch (K) {
        if (K === _a || K === Ns) throw K;
        var xe = xt(29, K, null, j.mode);
        return ((xe.lanes = M), (xe.return = j), xe);
      }
    };
  }
  var Il = Uu(!0),
    qu = Uu(!1),
    vl = !1;
  function ji(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ni(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Sl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function jl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (be & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = gs(e)),
        ju(e, null, l),
        t
      );
    }
    return (xs(e, a, t, l), gs(e));
  }
  function yn(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), zr(e, l));
    }
  }
  function Ai(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        s = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var r = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (s === null ? (n = s = r) : (s = s.next = r), (l = l.next));
        } while (l !== null);
        s === null ? (n = s = t) : (s = s.next = t);
      } else n = s = t;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: s,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var Ti = !1;
  function bn() {
    if (Ti) {
      var e = wa;
      if (e !== null) throw e;
    }
  }
  function vn(e, t, l, a) {
    Ti = !1;
    var n = e.updateQueue;
    vl = !1;
    var s = n.firstBaseUpdate,
      r = n.lastBaseUpdate,
      f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var x = f,
        A = x.next;
      ((x.next = null), r === null ? (s = A) : (r.next = A), (r = x));
      var C = e.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (f = C.lastBaseUpdate),
        f !== r && (f === null ? (C.firstBaseUpdate = A) : (f.next = A), (C.lastBaseUpdate = x)));
    }
    if (s !== null) {
      var O = n.baseState;
      ((r = 0), (C = A = x = null), (f = s));
      do {
        var T = f.lane & -536870913,
          w = T !== f.lane;
        if (w ? (fe & T) === T : (a & T) === T) {
          (T !== 0 && T === Ea && (Ti = !0),
            C !== null &&
              (C = C.next =
                { lane: 0, tag: f.tag, payload: f.payload, callback: null, next: null }));
          e: {
            var V = e,
              te = f;
            T = t;
            var Ee = l;
            switch (te.tag) {
              case 1:
                if (((V = te.payload), typeof V == 'function')) {
                  O = V.call(Ee, O, T);
                  break e;
                }
                O = V;
                break e;
              case 3:
                V.flags = (V.flags & -65537) | 128;
              case 0:
                if (
                  ((V = te.payload), (T = typeof V == 'function' ? V.call(Ee, O, T) : V), T == null)
                )
                  break e;
                O = H({}, O, T);
                break e;
              case 2:
                vl = !0;
            }
          }
          ((T = f.callback),
            T !== null &&
              ((e.flags |= 64),
              w && (e.flags |= 8192),
              (w = n.callbacks),
              w === null ? (n.callbacks = [T]) : w.push(T)));
        } else
          ((w = { lane: T, tag: f.tag, payload: f.payload, callback: f.callback, next: null }),
            C === null ? ((A = C = w), (x = O)) : (C = C.next = w),
            (r |= T));
        if (((f = f.next), f === null)) {
          if (((f = n.shared.pending), f === null)) break;
          ((w = f),
            (f = w.next),
            (w.next = null),
            (n.lastBaseUpdate = w),
            (n.shared.pending = null));
        }
      } while (!0);
      (C === null && (x = O),
        (n.baseState = x),
        (n.firstBaseUpdate = A),
        (n.lastBaseUpdate = C),
        s === null && (n.shared.lanes = 0),
        (wl |= r),
        (e.lanes = r),
        (e.memoizedState = O));
    }
  }
  function Lu(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Gu(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) Lu(l[e], t);
  }
  var za = b(null),
    ws = b(0);
  function Yu(e, t) {
    ((e = il), B(ws, e), B(za, t), (il = e | t.baseLanes));
  }
  function Ei() {
    (B(ws, il), B(za, za.current));
  }
  function wi() {
    ((il = ws.current), z(za), z(ws));
  }
  var gt = b(null),
    Ot = null;
  function Nl(e) {
    var t = e.alternate;
    (B(qe, qe.current & 1),
      B(gt, e),
      Ot === null && (t === null || za.current !== null || t.memoizedState !== null) && (Ot = e));
  }
  function _i(e) {
    (B(qe, qe.current), B(gt, e), Ot === null && (Ot = e));
  }
  function Qu(e) {
    e.tag === 22 ? (B(qe, qe.current), B(gt, e), Ot === null && (Ot = e)) : Al();
  }
  function Al() {
    (B(qe, qe.current), B(gt, gt.current));
  }
  function yt(e) {
    (z(gt), Ot === e && (Ot = null), z(qe));
  }
  var qe = b(0);
  function _s(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Do(l) || Ro(l))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var It = 0,
    ne = null,
    Ae = null,
    Ye = null,
    Cs = !1,
    Ma = !1,
    ea = !1,
    zs = 0,
    Sn = 0,
    Oa = null,
    c1 = 0;
  function De() {
    throw Error(o(321));
  }
  function Ci(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!pt(e[l], t[l])) return !1;
    return !0;
  }
  function zi(e, t, l, a, n, s) {
    return (
      (It = s),
      (ne = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? Ed : Xi),
      (ea = !1),
      (s = l(a, n)),
      (ea = !1),
      Ma && (s = Xu(t, l, a, n)),
      Vu(e),
      s
    );
  }
  function Vu(e) {
    _.H = An;
    var t = Ae !== null && Ae.next !== null;
    if (((It = 0), (Ye = Ae = ne = null), (Cs = !1), (Sn = 0), (Oa = null), t)) throw Error(o(300));
    e === null || Qe || ((e = e.dependencies), e !== null && vs(e) && (Qe = !0));
  }
  function Xu(e, t, l, a) {
    ne = e;
    var n = 0;
    do {
      if ((Ma && (Oa = null), (Sn = 0), (Ma = !1), 25 <= n)) throw Error(o(301));
      if (((n += 1), (Ye = Ae = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((_.H = wd), (s = t(l, a)));
    } while (Ma);
    return s;
  }
  function i1() {
    var e = _.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? jn(t) : t),
      (e = e.useState()[0]),
      (Ae !== null ? Ae.memoizedState : null) !== e && (ne.flags |= 1024),
      t
    );
  }
  function Mi() {
    var e = zs !== 0;
    return ((zs = 0), e);
  }
  function Oi(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Hi(e) {
    if (Cs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Cs = !1;
    }
    ((It = 0), (Ye = Ae = ne = null), (Ma = !1), (Sn = zs = 0), (Oa = null));
  }
  function nt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Ye === null ? (ne.memoizedState = Ye = e) : (Ye = Ye.next = e), Ye);
  }
  function Le() {
    if (Ae === null) {
      var e = ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ye === null ? ne.memoizedState : Ye.next;
    if (t !== null) ((Ye = t), (Ae = e));
    else {
      if (e === null) throw ne.alternate === null ? Error(o(467)) : Error(o(310));
      ((Ae = e),
        (e = {
          memoizedState: Ae.memoizedState,
          baseState: Ae.baseState,
          baseQueue: Ae.baseQueue,
          queue: Ae.queue,
          next: null,
        }),
        Ye === null ? (ne.memoizedState = Ye = e) : (Ye = Ye.next = e));
    }
    return Ye;
  }
  function Ms() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function jn(e) {
    var t = Sn;
    return (
      (Sn += 1),
      Oa === null && (Oa = []),
      (e = Du(Oa, e, t)),
      (t = ne),
      (Ye === null ? t.memoizedState : Ye.next) === null &&
        ((t = t.alternate), (_.H = t === null || t.memoizedState === null ? Ed : Xi)),
      e
    );
  }
  function Os(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return jn(e);
      if (e.$$typeof === _e) return Ie(e);
    }
    throw Error(o(438, String(e)));
  }
  function ki(e) {
    var t = null,
      l = ne.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ne.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = Ms()), (ne.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = ye;
    return (t.index++, l);
  }
  function el(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Hs(e) {
    var t = Le();
    return Di(t, Ae, e);
  }
  function Di(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue,
      s = a.pending;
    if (s !== null) {
      if (n !== null) {
        var r = n.next;
        ((n.next = s.next), (s.next = r));
      }
      ((t.baseQueue = n = s), (a.pending = null));
    }
    if (((s = e.baseState), n === null)) e.memoizedState = s;
    else {
      t = n.next;
      var f = (r = null),
        x = null,
        A = t,
        C = !1;
      do {
        var O = A.lane & -536870913;
        if (O !== A.lane ? (fe & O) === O : (It & O) === O) {
          var T = A.revertLane;
          if (T === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: A.action,
                  hasEagerState: A.hasEagerState,
                  eagerState: A.eagerState,
                  next: null,
                }),
              O === Ea && (C = !0));
          else if ((It & T) === T) {
            ((A = A.next), T === Ea && (C = !0));
            continue;
          } else
            ((O = {
              lane: 0,
              revertLane: A.revertLane,
              gesture: null,
              action: A.action,
              hasEagerState: A.hasEagerState,
              eagerState: A.eagerState,
              next: null,
            }),
              x === null ? ((f = x = O), (r = s)) : (x = x.next = O),
              (ne.lanes |= T),
              (wl |= T));
          ((O = A.action), ea && l(s, O), (s = A.hasEagerState ? A.eagerState : l(s, O)));
        } else
          ((T = {
            lane: O,
            revertLane: A.revertLane,
            gesture: A.gesture,
            action: A.action,
            hasEagerState: A.hasEagerState,
            eagerState: A.eagerState,
            next: null,
          }),
            x === null ? ((f = x = T), (r = s)) : (x = x.next = T),
            (ne.lanes |= O),
            (wl |= O));
        A = A.next;
      } while (A !== null && A !== t);
      if (
        (x === null ? (r = s) : (x.next = f),
        !pt(s, e.memoizedState) && ((Qe = !0), C && ((l = wa), l !== null)))
      )
        throw l;
      ((e.memoizedState = s), (e.baseState = r), (e.baseQueue = x), (a.lastRenderedState = s));
    }
    return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function Ri(e) {
    var t = Le(),
      l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      n = l.pending,
      s = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var r = (n = n.next);
      do ((s = e(s, r.action)), (r = r.next));
      while (r !== n);
      (pt(s, t.memoizedState) || (Qe = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (l.lastRenderedState = s));
    }
    return [s, a];
  }
  function Zu(e, t, l) {
    var a = ne,
      n = Le(),
      s = pe;
    if (s) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = t();
    var r = !pt((Ae || n).memoizedState, l);
    if (
      (r && ((n.memoizedState = l), (Qe = !0)),
      (n = n.queue),
      qi($u.bind(null, a, n, e), [e]),
      n.getSnapshot !== t || r || (Ye !== null && Ye.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ha(9, { destroy: void 0 }, Ju.bind(null, a, n, l, t), null),
        we === null)
      )
        throw Error(o(349));
      s || (It & 127) !== 0 || Ku(a, t, l);
    }
    return l;
  }
  function Ku(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ne.updateQueue),
      t === null
        ? ((t = Ms()), (ne.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function Ju(e, t, l, a) {
    ((t.value = l), (t.getSnapshot = a), Fu(t) && Wu(e));
  }
  function $u(e, t, l) {
    return l(function () {
      Fu(t) && Wu(e);
    });
  }
  function Fu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !pt(e, l);
    } catch {
      return !0;
    }
  }
  function Wu(e) {
    var t = Xl(e, 2);
    t !== null && dt(t, e, 2);
  }
  function Bi(e) {
    var t = nt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), ea)) {
        ml(!0);
        try {
          l();
        } finally {
          ml(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Pu(e, t, l, a) {
    return ((e.baseState = l), Di(e, Ae, typeof a == 'function' ? a : el));
  }
  function o1(e, t, l, a, n) {
    if (Rs(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var s = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (r) {
          s.listeners.push(r);
        },
      };
      (_.T !== null ? l(!0) : (s.isTransition = !1),
        a(s),
        (l = t.pending),
        l === null
          ? ((s.next = t.pending = s), Iu(t, s))
          : ((s.next = l.next), (t.pending = l.next = s)));
    }
  }
  function Iu(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state;
    if (t.isTransition) {
      var s = _.T,
        r = {};
      _.T = r;
      try {
        var f = l(n, a),
          x = _.S;
        (x !== null && x(r, f), ed(e, t, f));
      } catch (A) {
        Ui(e, t, A);
      } finally {
        (s !== null && r.types !== null && (s.types = r.types), (_.T = s));
      }
    } else
      try {
        ((s = l(n, a)), ed(e, t, s));
      } catch (A) {
        Ui(e, t, A);
      }
  }
  function ed(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            td(e, t, a);
          },
          function (a) {
            return Ui(e, t, a);
          }
        )
      : td(e, t, l);
  }
  function td(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      ld(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), Iu(e, l))));
  }
  function Ui(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = 'rejected'), (t.reason = l), ld(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function ld(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ad(e, t) {
    return t;
  }
  function nd(e, t) {
    if (pe) {
      var l = we.formState;
      if (l !== null) {
        e: {
          var a = ne;
          if (pe) {
            if (ze) {
              t: {
                for (var n = ze, s = Mt; n.nodeType !== 8; ) {
                  if (!s) {
                    n = null;
                    break t;
                  }
                  if (((n = Ht(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((s = n.data), (n = s === 'F!' || s === 'F' ? n : null));
              }
              if (n) {
                ((ze = Ht(n.nextSibling)), (a = n.data === 'F!'));
                break e;
              }
            }
            yl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = nt()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ad,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Nd.bind(null, ne, a)),
      (a.dispatch = l),
      (a = Bi(!1)),
      (s = Vi.bind(null, ne, !1, a.queue)),
      (a = nt()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = o1.bind(null, ne, n, s, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function sd(e) {
    var t = Le();
    return cd(t, Ae, e);
  }
  function cd(e, t, l) {
    if (
      ((t = Di(e, t, ad)[0]),
      (e = Hs(el)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var a = jn(t);
      } catch (r) {
        throw r === _a ? Ns : r;
      }
    else a = t;
    t = Le();
    var n = t.queue,
      s = n.dispatch;
    return (
      l !== t.memoizedState &&
        ((ne.flags |= 2048), Ha(9, { destroy: void 0 }, r1.bind(null, n, l), null)),
      [a, s, e]
    );
  }
  function r1(e, t) {
    e.action = t;
  }
  function id(e) {
    var t = Le(),
      l = Ae;
    if (l !== null) return cd(t, l, e);
    (Le(), (t = t.memoizedState), (l = Le()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = e), [t, a, !1]);
  }
  function Ha(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ne.updateQueue),
      t === null && ((t = Ms()), (ne.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function od() {
    return Le().memoizedState;
  }
  function ks(e, t, l, a) {
    var n = nt();
    ((ne.flags |= e),
      (n.memoizedState = Ha(1 | t, { destroy: void 0 }, l, a === void 0 ? null : a)));
  }
  function Ds(e, t, l, a) {
    var n = Le();
    a = a === void 0 ? null : a;
    var s = n.memoizedState.inst;
    Ae !== null && a !== null && Ci(a, Ae.memoizedState.deps)
      ? (n.memoizedState = Ha(t, s, l, a))
      : ((ne.flags |= e), (n.memoizedState = Ha(1 | t, s, l, a)));
  }
  function rd(e, t) {
    ks(8390656, 8, e, t);
  }
  function qi(e, t) {
    Ds(2048, 8, e, t);
  }
  function u1(e) {
    ne.flags |= 4;
    var t = ne.updateQueue;
    if (t === null) ((t = Ms()), (ne.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function ud(e) {
    var t = Le().memoizedState;
    return (
      u1({ ref: t, nextImpl: e }),
      function () {
        if ((be & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function dd(e, t) {
    return Ds(4, 2, e, t);
  }
  function fd(e, t) {
    return Ds(4, 4, e, t);
  }
  function md(e, t) {
    if (typeof t == 'function') {
      e = e();
      var l = t(e);
      return function () {
        typeof l == 'function' ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function hd(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), Ds(4, 4, md.bind(null, t, e), l));
  }
  function Li() {}
  function pd(e, t) {
    var l = Le();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Ci(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function xd(e, t) {
    var l = Le();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Ci(t, a[1])) return a[0];
    if (((a = e()), ea)) {
      ml(!0);
      try {
        e();
      } finally {
        ml(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  }
  function Gi(e, t, l) {
    return l === void 0 || ((It & 1073741824) !== 0 && (fe & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = yf()), (ne.lanes |= e), (wl |= e), l);
  }
  function gd(e, t, l, a) {
    return pt(l, t)
      ? l
      : za.current !== null
        ? ((e = Gi(e, l, a)), pt(e, t) || (Qe = !0), e)
        : (It & 42) === 0 || ((It & 1073741824) !== 0 && (fe & 261930) === 0)
          ? ((Qe = !0), (e.memoizedState = l))
          : ((e = yf()), (ne.lanes |= e), (wl |= e), t);
  }
  function yd(e, t, l, a, n) {
    var s = R.p;
    R.p = s !== 0 && 8 > s ? s : 8;
    var r = _.T,
      f = {};
    ((_.T = f), Vi(e, !1, t, l));
    try {
      var x = n(),
        A = _.S;
      if (
        (A !== null && A(f, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var C = s1(x, a);
        Nn(e, t, C, St(e));
      } else Nn(e, t, a, St(e));
    } catch (O) {
      Nn(e, t, { then: function () {}, status: 'rejected', reason: O }, St());
    } finally {
      ((R.p = s), r !== null && f.types !== null && (r.types = f.types), (_.T = r));
    }
  }
  function d1() {}
  function Yi(e, t, l, a) {
    if (e.tag !== 5) throw Error(o(476));
    var n = bd(e).queue;
    yd(
      e,
      n,
      t,
      J,
      l === null
        ? d1
        : function () {
            return (vd(e), l(a));
          }
    );
  }
  function bd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: J,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: el,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function vd(e) {
    var t = bd(e);
    (t.next === null && (t = e.alternate.memoizedState), Nn(e, t.next.queue, {}, St()));
  }
  function Qi() {
    return Ie(Ln);
  }
  function Sd() {
    return Le().memoizedState;
  }
  function jd() {
    return Le().memoizedState;
  }
  function f1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = St();
          e = Sl(l);
          var a = jl(t, e, l);
          (a !== null && (dt(a, t, l), yn(a, t, l)), (t = { cache: yi() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function m1(e, t, l) {
    var a = St();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Rs(e) ? Ad(t, l) : ((l = ii(e, t, l, a)), l !== null && (dt(l, e, a), Td(l, t, a))));
  }
  function Nd(e, t, l) {
    var a = St();
    Nn(e, t, l, a);
  }
  function Nn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Rs(e)) Ad(t, n);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var r = t.lastRenderedState,
            f = s(r, l);
          if (((n.hasEagerState = !0), (n.eagerState = f), pt(f, r)))
            return (xs(e, t, n, 0), we === null && ps(), !1);
        } catch {}
      if (((l = ii(e, t, n, a)), l !== null)) return (dt(l, e, a), Td(l, t, a), !0);
    }
    return !1;
  }
  function Vi(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: No(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Rs(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = ii(e, l, a, 2)), t !== null && dt(t, e, 2));
  }
  function Rs(e) {
    var t = e.alternate;
    return e === ne || (t !== null && t === ne);
  }
  function Ad(e, t) {
    Ma = Cs = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function Td(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), zr(e, l));
    }
  }
  var An = {
    readContext: Ie,
    use: Os,
    useCallback: De,
    useContext: De,
    useEffect: De,
    useImperativeHandle: De,
    useLayoutEffect: De,
    useInsertionEffect: De,
    useMemo: De,
    useReducer: De,
    useRef: De,
    useState: De,
    useDebugValue: De,
    useDeferredValue: De,
    useTransition: De,
    useSyncExternalStore: De,
    useId: De,
    useHostTransitionStatus: De,
    useFormState: De,
    useActionState: De,
    useOptimistic: De,
    useMemoCache: De,
    useCacheRefresh: De,
  };
  An.useEffectEvent = De;
  var Ed = {
      readContext: Ie,
      use: Os,
      useCallback: function (e, t) {
        return ((nt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Ie,
      useEffect: rd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), ks(4194308, 4, md.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return ks(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ks(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = nt();
        t = t === void 0 ? null : t;
        var a = e();
        if (ea) {
          ml(!0);
          try {
            e();
          } finally {
            ml(!1);
          }
        }
        return ((l.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, l) {
        var a = nt();
        if (l !== void 0) {
          var n = l(t);
          if (ea) {
            ml(!0);
            try {
              l(t);
            } finally {
              ml(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = m1.bind(null, ne, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = nt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Bi(e);
        var t = e.queue,
          l = Nd.bind(null, ne, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: Li,
      useDeferredValue: function (e, t) {
        var l = nt();
        return Gi(l, e, t);
      },
      useTransition: function () {
        var e = Bi(!1);
        return ((e = yd.bind(null, ne, e.queue, !0, !1)), (nt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ne,
          n = nt();
        if (pe) {
          if (l === void 0) throw Error(o(407));
          l = l();
        } else {
          if (((l = t()), we === null)) throw Error(o(349));
          (fe & 127) !== 0 || Ku(a, t, l);
        }
        n.memoizedState = l;
        var s = { value: l, getSnapshot: t };
        return (
          (n.queue = s),
          rd($u.bind(null, a, s, e), [e]),
          (a.flags |= 2048),
          Ha(9, { destroy: void 0 }, Ju.bind(null, a, s, l, t), null),
          l
        );
      },
      useId: function () {
        var e = nt(),
          t = we.identifierPrefix;
        if (pe) {
          var l = Gt,
            a = Lt;
          ((l = (a & ~(1 << (32 - ht(a) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = zs++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = c1++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Qi,
      useFormState: nd,
      useActionState: nd,
      useOptimistic: function (e) {
        var t = nt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Vi.bind(null, ne, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: ki,
      useCacheRefresh: function () {
        return (nt().memoizedState = f1.bind(null, ne));
      },
      useEffectEvent: function (e) {
        var t = nt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((be & 2) !== 0) throw Error(o(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Xi = {
      readContext: Ie,
      use: Os,
      useCallback: pd,
      useContext: Ie,
      useEffect: qi,
      useImperativeHandle: hd,
      useInsertionEffect: dd,
      useLayoutEffect: fd,
      useMemo: xd,
      useReducer: Hs,
      useRef: od,
      useState: function () {
        return Hs(el);
      },
      useDebugValue: Li,
      useDeferredValue: function (e, t) {
        var l = Le();
        return gd(l, Ae.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Hs(el)[0],
          t = Le().memoizedState;
        return [typeof e == 'boolean' ? e : jn(e), t];
      },
      useSyncExternalStore: Zu,
      useId: Sd,
      useHostTransitionStatus: Qi,
      useFormState: sd,
      useActionState: sd,
      useOptimistic: function (e, t) {
        var l = Le();
        return Pu(l, Ae, e, t);
      },
      useMemoCache: ki,
      useCacheRefresh: jd,
    };
  Xi.useEffectEvent = ud;
  var wd = {
    readContext: Ie,
    use: Os,
    useCallback: pd,
    useContext: Ie,
    useEffect: qi,
    useImperativeHandle: hd,
    useInsertionEffect: dd,
    useLayoutEffect: fd,
    useMemo: xd,
    useReducer: Ri,
    useRef: od,
    useState: function () {
      return Ri(el);
    },
    useDebugValue: Li,
    useDeferredValue: function (e, t) {
      var l = Le();
      return Ae === null ? Gi(l, e, t) : gd(l, Ae.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ri(el)[0],
        t = Le().memoizedState;
      return [typeof e == 'boolean' ? e : jn(e), t];
    },
    useSyncExternalStore: Zu,
    useId: Sd,
    useHostTransitionStatus: Qi,
    useFormState: id,
    useActionState: id,
    useOptimistic: function (e, t) {
      var l = Le();
      return Ae !== null ? Pu(l, Ae, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: ki,
    useCacheRefresh: jd,
  };
  wd.useEffectEvent = ud;
  function Zi(e, t, l, a) {
    ((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : H({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Ki = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = St(),
        n = Sl(a);
      ((n.payload = t),
        l != null && (n.callback = l),
        (t = jl(e, n, a)),
        t !== null && (dt(t, e, a), yn(t, e, a)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = St(),
        n = Sl(a);
      ((n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = jl(e, n, a)),
        t !== null && (dt(t, e, a), yn(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = St(),
        a = Sl(l);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = jl(e, a, l)),
        t !== null && (dt(t, e, l), yn(t, e, l)));
    },
  };
  function _d(e, t, l, a, n, s, r) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(a, s, r)
        : t.prototype && t.prototype.isPureReactComponent
          ? !un(l, a) || !un(n, s)
          : !0
    );
  }
  function Cd(e, t, l, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && Ki.enqueueReplaceState(t, t.state, null));
  }
  function ta(e, t) {
    var l = t;
    if ('ref' in t) {
      l = {};
      for (var a in t) a !== 'ref' && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = H({}, l));
      for (var n in e) l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function zd(e) {
    hs(e);
  }
  function Md(e) {
    console.error(e);
  }
  function Od(e) {
    hs(e);
  }
  function Bs(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Hd(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Ji(e, t, l) {
    return (
      (l = Sl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Bs(e, t);
      }),
      l
    );
  }
  function kd(e) {
    return ((e = Sl(e)), (e.tag = 3), e);
  }
  function Dd(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var s = a.value;
      ((e.payload = function () {
        return n(s);
      }),
        (e.callback = function () {
          Hd(t, l, a);
        }));
    }
    var r = l.stateNode;
    r !== null &&
      typeof r.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Hd(t, l, a),
          typeof n != 'function' && (_l === null ? (_l = new Set([this])) : _l.add(this)));
        var f = a.stack;
        this.componentDidCatch(a.value, { componentStack: f !== null ? f : '' });
      });
  }
  function h1(e, t, l, a, n) {
    if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((t = l.alternate), t !== null && Ta(t, l, n, !0), (l = gt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Ot === null ? $s() : l.alternate === null && Re === 0 && (Re = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === As
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  vo(e, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === As
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  vo(e, a, n)),
              !1
            );
        }
        throw Error(o(435, l.tag));
      }
      return (vo(e, a, n), $s(), !1);
    }
    if (pe)
      return (
        (t = gt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== mi && ((e = Error(o(422), { cause: a })), mn(_t(e, l))))
          : (a !== mi && ((t = Error(o(423), { cause: a })), mn(_t(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = _t(a, l)),
            (n = Ji(e.stateNode, a, n)),
            Ai(e, n),
            Re !== 4 && (Re = 2)),
        !1
      );
    var s = Error(o(520), { cause: a });
    if (((s = _t(s, l)), On === null ? (On = [s]) : On.push(s), Re !== 4 && (Re = 2), t === null))
      return !0;
    ((a = _t(a, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = Ji(l.stateNode, a, e)),
            Ai(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (s = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (s !== null &&
                  typeof s.componentDidCatch == 'function' &&
                  (_l === null || !_l.has(s)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = kd(n)),
              Dd(n, e, l, a),
              Ai(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var $i = Error(o(461)),
    Qe = !1;
  function et(e, t, l, a) {
    t.child = e === null ? qu(t, null, l, a) : Il(t, e.child, l, a);
  }
  function Rd(e, t, l, a, n) {
    l = l.render;
    var s = t.ref;
    if ('ref' in a) {
      var r = {};
      for (var f in a) f !== 'ref' && (r[f] = a[f]);
    } else r = a;
    return (
      $l(t),
      (a = zi(e, t, l, r, s, n)),
      (f = Mi()),
      e !== null && !Qe
        ? (Oi(e, t, n), tl(e, t, n))
        : (pe && f && di(t), (t.flags |= 1), et(e, t, a, n), t.child)
    );
  }
  function Bd(e, t, l, a, n) {
    if (e === null) {
      var s = l.type;
      return typeof s == 'function' && !oi(s) && s.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = s), Ud(e, t, s, a, n))
        : ((e = ys(l.type, null, a, t, t.mode, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !ao(e, n))) {
      var r = s.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : un), l(r, a) && e.ref === t.ref))
        return tl(e, t, n);
    }
    return ((t.flags |= 1), (e = $t(s, a)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Ud(e, t, l, a, n) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (un(s, a) && e.ref === t.ref)
        if (((Qe = !1), (t.pendingProps = a = s), ao(e, n))) (e.flags & 131072) !== 0 && (Qe = !0);
        else return ((t.lanes = e.lanes), tl(e, t, n));
    }
    return Fi(e, t, l, a, n);
  }
  function qd(e, t, l, a) {
    var n = a.children,
      s = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((s = s !== null ? s.baseLanes | l : l), e !== null)) {
          for (a = t.child = e.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~s;
        } else ((a = 0), (t.child = null));
        return Ld(e, t, s, l, a);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && js(t, s !== null ? s.cachePool : null),
          s !== null ? Yu(t, s) : Ei(),
          Qu(t));
      else return ((a = t.lanes = 536870912), Ld(e, t, s !== null ? s.baseLanes | l : l, l, a));
    } else
      s !== null
        ? (js(t, s.cachePool), Yu(t, s), Al(), (t.memoizedState = null))
        : (e !== null && js(t, null), Ei(), Al());
    return (et(e, t, n, l), t.child);
  }
  function Tn(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Ld(e, t, l, a, n) {
    var s = vi();
    return (
      (s = s === null ? null : { parent: Ge._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: l, cachePool: s }),
      e !== null && js(t, null),
      Ei(),
      Qu(t),
      e !== null && Ta(e, t, a, !0),
      (t.childLanes = n),
      null
    );
  }
  function Us(e, t) {
    return (
      (t = Ls({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Gd(e, t, l) {
    return (
      Il(t, e.child, null, l),
      (e = Us(t, t.pendingProps)),
      (e.flags |= 2),
      yt(t),
      (t.memoizedState = null),
      e
    );
  }
  function p1(e, t, l) {
    var a = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (pe) {
        if (a.mode === 'hidden') return ((e = Us(t, a)), (t.lanes = 536870912), Tn(null, e));
        if (
          (_i(t),
          (e = ze)
            ? ((e = em(e, Mt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: xl !== null ? { id: Lt, overflow: Gt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Au(e)),
                (l.return = t),
                (t.child = l),
                (Pe = t),
                (ze = null)))
            : (e = null),
          e === null)
        )
          throw yl(t);
        return ((t.lanes = 536870912), null);
      }
      return Us(t, a);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var r = s.dehydrated;
      if ((_i(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Gd(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((Qe || Ta(e, t, l, !1), (n = (l & e.childLanes) !== 0), Qe || n)) {
        if (((a = we), a !== null && ((r = Mr(a, l)), r !== 0 && r !== s.retryLane)))
          throw ((s.retryLane = r), Xl(e, r), dt(a, e, r), $i);
        ($s(), (t = Gd(e, t, l)));
      } else
        ((e = s.treeContext),
          (ze = Ht(r.nextSibling)),
          (Pe = t),
          (pe = !0),
          (gl = null),
          (Mt = !1),
          e !== null && wu(t, e),
          (t = Us(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = $t(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function qs(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(o(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Fi(e, t, l, a, n) {
    return (
      $l(t),
      (l = zi(e, t, l, a, void 0, n)),
      (a = Mi()),
      e !== null && !Qe
        ? (Oi(e, t, n), tl(e, t, n))
        : (pe && a && di(t), (t.flags |= 1), et(e, t, l, n), t.child)
    );
  }
  function Yd(e, t, l, a, n, s) {
    return (
      $l(t),
      (t.updateQueue = null),
      (l = Xu(t, a, l, n)),
      Vu(e),
      (a = Mi()),
      e !== null && !Qe
        ? (Oi(e, t, s), tl(e, t, s))
        : (pe && a && di(t), (t.flags |= 1), et(e, t, l, s), t.child)
    );
  }
  function Qd(e, t, l, a, n) {
    if (($l(t), t.stateNode === null)) {
      var s = Sa,
        r = l.contextType;
      (typeof r == 'object' && r !== null && (s = Ie(r)),
        (s = new l(a, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = Ki),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = a),
        (s.state = t.memoizedState),
        (s.refs = {}),
        ji(t),
        (r = l.contextType),
        (s.context = typeof r == 'object' && r !== null ? Ie(r) : Sa),
        (s.state = t.memoizedState),
        (r = l.getDerivedStateFromProps),
        typeof r == 'function' && (Zi(t, l, r, a), (s.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((r = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          r !== s.state && Ki.enqueueReplaceState(s, s.state, null),
          vn(t, a, s, n),
          bn(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      s = t.stateNode;
      var f = t.memoizedProps,
        x = ta(l, f);
      s.props = x;
      var A = s.context,
        C = l.contextType;
      ((r = Sa), typeof C == 'object' && C !== null && (r = Ie(C)));
      var O = l.getDerivedStateFromProps;
      ((C = typeof O == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (f = t.pendingProps !== f),
        C ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((f || A !== r) && Cd(t, s, a, r)),
        (vl = !1));
      var T = t.memoizedState;
      ((s.state = T),
        vn(t, a, s, n),
        bn(),
        (A = t.memoizedState),
        f || T !== A || vl
          ? (typeof O == 'function' && (Zi(t, l, O, a), (A = t.memoizedState)),
            (x = vl || _d(t, l, x, a, T, A, r))
              ? (C ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = A)),
            (s.props = a),
            (s.state = A),
            (s.context = r),
            (a = x))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (a = !1)));
    } else {
      ((s = t.stateNode),
        Ni(e, t),
        (r = t.memoizedProps),
        (C = ta(l, r)),
        (s.props = C),
        (O = t.pendingProps),
        (T = s.context),
        (A = l.contextType),
        (x = Sa),
        typeof A == 'object' && A !== null && (x = Ie(A)),
        (f = l.getDerivedStateFromProps),
        (A = typeof f == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((r !== O || T !== x) && Cd(t, s, a, x)),
        (vl = !1),
        (T = t.memoizedState),
        (s.state = T),
        vn(t, a, s, n),
        bn());
      var w = t.memoizedState;
      r !== O || T !== w || vl || (e !== null && e.dependencies !== null && vs(e.dependencies))
        ? (typeof f == 'function' && (Zi(t, l, f, a), (w = t.memoizedState)),
          (C =
            vl ||
            _d(t, l, C, a, T, w, x) ||
            (e !== null && e.dependencies !== null && vs(e.dependencies)))
            ? (A ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(a, w, x),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(a, w, x)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (r === e.memoizedProps && T === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (r === e.memoizedProps && T === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = w)),
          (s.props = a),
          (s.state = w),
          (s.context = x),
          (a = C))
        : (typeof s.componentDidUpdate != 'function' ||
            (r === e.memoizedProps && T === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (r === e.memoizedProps && T === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (s = a),
      qs(e, t),
      (a = (t.flags & 128) !== 0),
      s || a
        ? ((s = t.stateNode),
          (l = a && typeof l.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = Il(t, e.child, null, n)), (t.child = Il(t, null, l, n)))
            : et(e, t, l, n),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = tl(e, t, n)),
      e
    );
  }
  function Vd(e, t, l, a) {
    return (Kl(), (t.flags |= 256), et(e, t, l, a), t.child);
  }
  var Wi = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Pi(e) {
    return { baseLanes: e, cachePool: Hu() };
  }
  function Ii(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= vt), e);
  }
  function Xd(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      s = (t.flags & 128) !== 0,
      r;
    if (
      ((r = s) || (r = e !== null && e.memoizedState === null ? !1 : (qe.current & 2) !== 0),
      r && ((n = !0), (t.flags &= -129)),
      (r = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (pe) {
        if (
          (n ? Nl(t) : Al(),
          (e = ze)
            ? ((e = em(e, Mt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: xl !== null ? { id: Lt, overflow: Gt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Au(e)),
                (l.return = t),
                (t.child = l),
                (Pe = t),
                (ze = null)))
            : (e = null),
          e === null)
        )
          throw yl(t);
        return (Ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var f = a.children;
      return (
        (a = a.fallback),
        n
          ? (Al(),
            (n = t.mode),
            (f = Ls({ mode: 'hidden', children: f }, n)),
            (a = Zl(a, n, l, null)),
            (f.return = t),
            (a.return = t),
            (f.sibling = a),
            (t.child = f),
            (a = t.child),
            (a.memoizedState = Pi(l)),
            (a.childLanes = Ii(e, r, l)),
            (t.memoizedState = Wi),
            Tn(null, a))
          : (Nl(t), eo(t, f))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((f = x.dehydrated), f !== null)) {
      if (s)
        t.flags & 256
          ? (Nl(t), (t.flags &= -257), (t = to(e, t, l)))
          : t.memoizedState !== null
            ? (Al(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Al(),
              (f = a.fallback),
              (n = t.mode),
              (a = Ls({ mode: 'visible', children: a.children }, n)),
              (f = Zl(f, n, l, null)),
              (f.flags |= 2),
              (a.return = t),
              (f.return = t),
              (a.sibling = f),
              (t.child = a),
              Il(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = Pi(l)),
              (a.childLanes = Ii(e, r, l)),
              (t.memoizedState = Wi),
              (t = Tn(null, a)));
      else if ((Nl(t), Ro(f))) {
        if (((r = f.nextSibling && f.nextSibling.dataset), r)) var A = r.dgst;
        ((r = A),
          (a = Error(o(419))),
          (a.stack = ''),
          (a.digest = r),
          mn({ value: a, source: null, stack: null }),
          (t = to(e, t, l)));
      } else if ((Qe || Ta(e, t, l, !1), (r = (l & e.childLanes) !== 0), Qe || r)) {
        if (((r = we), r !== null && ((a = Mr(r, l)), a !== 0 && a !== x.retryLane)))
          throw ((x.retryLane = a), Xl(e, a), dt(r, e, a), $i);
        (Do(f) || $s(), (t = to(e, t, l)));
      } else
        Do(f)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (ze = Ht(f.nextSibling)),
            (Pe = t),
            (pe = !0),
            (gl = null),
            (Mt = !1),
            e !== null && wu(t, e),
            (t = eo(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (Al(),
        (f = a.fallback),
        (n = t.mode),
        (x = e.child),
        (A = x.sibling),
        (a = $t(x, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = x.subtreeFlags & 65011712),
        A !== null ? (f = $t(A, f)) : ((f = Zl(f, n, l, null)), (f.flags |= 2)),
        (f.return = t),
        (a.return = t),
        (a.sibling = f),
        (t.child = a),
        Tn(null, a),
        (a = t.child),
        (f = e.child.memoizedState),
        f === null
          ? (f = Pi(l))
          : ((n = f.cachePool),
            n !== null
              ? ((x = Ge._currentValue), (n = n.parent !== x ? { parent: x, pool: x } : n))
              : (n = Hu()),
            (f = { baseLanes: f.baseLanes | l, cachePool: n })),
        (a.memoizedState = f),
        (a.childLanes = Ii(e, r, l)),
        (t.memoizedState = Wi),
        Tn(e.child, a))
      : (Nl(t),
        (l = e.child),
        (e = l.sibling),
        (l = $t(l, { mode: 'visible', children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((r = t.deletions), r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function eo(e, t) {
    return ((t = Ls({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Ls(e, t) {
    return ((e = xt(22, e, null, t)), (e.lanes = 0), e);
  }
  function to(e, t, l) {
    return (
      Il(t, e.child, null, l),
      (e = eo(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Zd(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), xi(e.return, t, l));
  }
  function lo(e, t, l, a, n, s) {
    var r = e.memoizedState;
    r === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
          treeForkCount: s,
        })
      : ((r.isBackwards = t),
        (r.rendering = null),
        (r.renderingStartTime = 0),
        (r.last = a),
        (r.tail = l),
        (r.tailMode = n),
        (r.treeForkCount = s));
  }
  function Kd(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      s = a.tail;
    a = a.children;
    var r = qe.current,
      f = (r & 2) !== 0;
    if (
      (f ? ((r = (r & 1) | 2), (t.flags |= 128)) : (r &= 1),
      B(qe, r),
      et(e, t, a, l),
      (a = pe ? fn : 0),
      !f && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Zd(e, l, t);
        else if (e.tag === 19) Zd(e, l, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (n) {
      case 'forwards':
        for (l = t.child, n = null; l !== null; )
          ((e = l.alternate), e !== null && _s(e) === null && (n = l), (l = l.sibling));
        ((l = n),
          l === null ? ((n = t.child), (t.child = null)) : ((n = l.sibling), (l.sibling = null)),
          lo(t, !1, n, l, s, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && _s(e) === null)) {
            t.child = n;
            break;
          }
          ((e = n.sibling), (n.sibling = l), (l = n), (n = e));
        }
        lo(t, !0, l, null, s, a);
        break;
      case 'together':
        lo(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function tl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (wl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Ta(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, l = $t(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = $t(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function ao(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && vs(e)));
  }
  function x1(e, t, l) {
    switch (t.tag) {
      case 3:
        (Ke(t, t.stateNode.containerInfo), bl(t, Ge, e.memoizedState.cache), Kl());
        break;
      case 27:
      case 5:
        dl(t);
        break;
      case 4:
        Ke(t, t.stateNode.containerInfo);
        break;
      case 10:
        bl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), _i(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (Nl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? Xd(e, t, l)
              : (Nl(t), (e = tl(e, t, l)), e !== null ? e.sibling : null);
        Nl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (Ta(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Kd(e, t, l);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          B(qe, qe.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), qd(e, t, l, t.pendingProps));
      case 24:
        bl(t, Ge, e.memoizedState.cache);
    }
    return tl(e, t, l);
  }
  function Jd(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Qe = !0;
      else {
        if (!ao(e, l) && (t.flags & 128) === 0) return ((Qe = !1), x1(e, t, l));
        Qe = (e.flags & 131072) !== 0;
      }
    else ((Qe = !1), pe && (t.flags & 1048576) !== 0 && Eu(t, fn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (((e = Wl(t.elementType)), (t.type = e), typeof e == 'function'))
            oi(e)
              ? ((a = ta(e, a)), (t.tag = 1), (t = Qd(null, t, e, a, l)))
              : ((t.tag = 0), (t = Fi(null, t, e, a, l)));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === Ce) {
                ((t.tag = 11), (t = Rd(null, t, e, a, l)));
                break e;
              } else if (n === X) {
                ((t.tag = 14), (t = Bd(null, t, e, a, l)));
                break e;
              }
            }
            throw ((t = at(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Fi(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((a = t.type), (n = ta(a, t.pendingProps)), Qd(e, t, a, n, l));
      case 3:
        e: {
          if ((Ke(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          a = t.pendingProps;
          var s = t.memoizedState;
          ((n = s.element), Ni(e, t), vn(t, a, null, l));
          var r = t.memoizedState;
          if (
            ((a = r.cache),
            bl(t, Ge, a),
            a !== s.cache && gi(t, [Ge], l, !0),
            bn(),
            (a = r.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: a, isDehydrated: !1, cache: r.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = Vd(e, t, a, l);
              break e;
            } else if (a !== n) {
              ((n = _t(Error(o(424)), t)), mn(n), (t = Vd(e, t, a, l)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === 'HTML' ? e.ownerDocument.body : e),
                  ze = Ht(e.firstChild),
                  Pe = t,
                  pe = !0,
                  gl = null,
                  Mt = !0,
                  l = qu(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Kl(), a === n)) {
              t = tl(e, t, l);
              break e;
            }
            et(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          qs(e, t),
          e === null
            ? (l = cm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : pe ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = lc(I.current).createElement(l)),
                (a[We] = t),
                (a[st] = e),
                tt(a, l, e),
                Je(a),
                (t.stateNode = a))
            : (t.memoizedState = cm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          dl(t),
          e === null &&
            pe &&
            ((a = t.stateNode = am(t.type, t.pendingProps, I.current)),
            (Pe = t),
            (Mt = !0),
            (n = ze),
            Ol(t.type) ? ((Bo = n), (ze = Ht(a.firstChild))) : (ze = n)),
          et(e, t, t.pendingProps.children, l),
          qs(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            pe &&
            ((n = a = ze) &&
              ((a = Z1(a, t.type, t.pendingProps, Mt)),
              a !== null
                ? ((t.stateNode = a), (Pe = t), (ze = Ht(a.firstChild)), (Mt = !1), (n = !0))
                : (n = !1)),
            n || yl(t)),
          dl(t),
          (n = t.type),
          (s = t.pendingProps),
          (r = e !== null ? e.memoizedProps : null),
          (a = s.children),
          Oo(n, s) ? (a = null) : r !== null && Oo(n, r) && (t.flags |= 32),
          t.memoizedState !== null && ((n = zi(e, t, i1, null, null, l)), (Ln._currentValue = n)),
          qs(e, t),
          et(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            pe &&
            ((e = l = ze) &&
              ((l = K1(l, t.pendingProps, Mt)),
              l !== null ? ((t.stateNode = l), (Pe = t), (ze = null), (e = !0)) : (e = !1)),
            e || yl(t)),
          null
        );
      case 13:
        return Xd(e, t, l);
      case 4:
        return (
          Ke(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = Il(t, null, a, l)) : et(e, t, a, l),
          t.child
        );
      case 11:
        return Rd(e, t, t.type, t.pendingProps, l);
      case 7:
        return (et(e, t, t.pendingProps, l), t.child);
      case 8:
        return (et(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (et(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((a = t.pendingProps), bl(t, t.type, a.value), et(e, t, a.children, l), t.child);
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          $l(t),
          (n = Ie(n)),
          (a = a(n)),
          (t.flags |= 1),
          et(e, t, a, l),
          t.child
        );
      case 14:
        return Bd(e, t, t.type, t.pendingProps, l);
      case 15:
        return Ud(e, t, t.type, t.pendingProps, l);
      case 19:
        return Kd(e, t, l);
      case 31:
        return p1(e, t, l);
      case 22:
        return qd(e, t, l, t.pendingProps);
      case 24:
        return (
          $l(t),
          (a = Ie(Ge)),
          e === null
            ? ((n = vi()),
              n === null &&
                ((n = we),
                (s = yi()),
                (n.pooledCache = s),
                s.refCount++,
                s !== null && (n.pooledCacheLanes |= l),
                (n = s)),
              (t.memoizedState = { parent: a, cache: n }),
              ji(t),
              bl(t, Ge, n))
            : ((e.lanes & l) !== 0 && (Ni(e, t), vn(t, null, null, l), bn()),
              (n = e.memoizedState),
              (s = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  bl(t, Ge, a))
                : ((a = s.cache), bl(t, Ge, a), a !== n.cache && gi(t, [Ge], l, !0))),
          et(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function ll(e) {
    e.flags |= 4;
  }
  function no(e, t, l, a, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (jf()) e.flags |= 8192;
        else throw ((Pl = As), Si);
    } else e.flags &= -16777217;
  }
  function $d(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !dm(t)))
      if (jf()) e.flags |= 8192;
      else throw ((Pl = As), Si);
  }
  function Gs(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? _r() : 536870912), (e.lanes |= t), (Ba |= t)));
  }
  function En(e, t) {
    if (!pe)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var l = null; t !== null; ) (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = e.tail;
          for (var a = null; l !== null; ) (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling));
    else
      for (n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = l), t);
  }
  function g1(e, t, l) {
    var a = t.pendingProps;
    switch ((fi(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Me(t), null);
      case 1:
        return (Me(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Pt(Ge),
          ie(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Aa(t)
              ? ll(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), hi())),
          Me(t),
          null
        );
      case 26:
        var n = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (ll(t), s !== null ? (Me(t), $d(t, s)) : (Me(t), no(t, n, null, a, l)))
            : s
              ? s !== e.memoizedState
                ? (ll(t), Me(t), $d(t, s))
                : (Me(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== a && ll(t), Me(t), no(t, n, e, a, l)),
          null
        );
      case 27:
        if ((Xt(t), (l = I.current), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Me(t), null);
          }
          ((e = Y.current), Aa(t) ? _u(t) : ((e = am(n, a, l)), (t.stateNode = e), ll(t)));
        }
        return (Me(t), null);
      case 5:
        if ((Xt(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Me(t), null);
          }
          if (((s = Y.current), Aa(t))) _u(t);
          else {
            var r = lc(I.current);
            switch (s) {
              case 1:
                s = r.createElementNS('http://www.w3.org/2000/svg', n);
                break;
              case 2:
                s = r.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                break;
              default:
                switch (n) {
                  case 'svg':
                    s = r.createElementNS('http://www.w3.org/2000/svg', n);
                    break;
                  case 'math':
                    s = r.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                    break;
                  case 'script':
                    ((s = r.createElement('div')),
                      (s.innerHTML = '<script><\/script>'),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case 'select':
                    ((s =
                      typeof a.is == 'string'
                        ? r.createElement('select', { is: a.is })
                        : r.createElement('select')),
                      a.multiple ? (s.multiple = !0) : a.size && (s.size = a.size));
                    break;
                  default:
                    s =
                      typeof a.is == 'string'
                        ? r.createElement(n, { is: a.is })
                        : r.createElement(n);
                }
            }
            ((s[We] = t), (s[st] = a));
            e: for (r = t.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6) s.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                ((r.child.return = r), (r = r.child));
                continue;
              }
              if (r === t) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === t) break e;
                r = r.return;
              }
              ((r.sibling.return = r.return), (r = r.sibling));
            }
            t.stateNode = s;
            e: switch ((tt(s, n, a), n)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break e;
              case 'img':
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && ll(t);
          }
        }
        return (Me(t), no(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && ll(t);
        else {
          if (typeof a != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = I.current), Aa(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (a = null), (n = Pe), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((e[We] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Zf(e.nodeValue, l)
              )),
              e || yl(t, !0));
          } else ((e = lc(e).createTextNode(a)), (e[We] = t), (t.stateNode = e));
        }
        return (Me(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = Aa(t)), l !== null)) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[We] = t;
            } else (Kl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (e = !1));
          } else
            ((l = hi()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (yt(t), t) : (yt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Me(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = Aa(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((n = t.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(o(317));
              n[We] = t;
            } else (Kl(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (n = !1));
          } else
            ((n = hi()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (yt(t), t) : (yt(t), null);
        }
        return (
          yt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = a !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((a = t.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (s = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (s = a.memoizedState.cachePool.pool),
                s !== n && (a.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Gs(t, t.updateQueue),
              Me(t),
              null)
        );
      case 4:
        return (ie(), e === null && wo(t.stateNode.containerInfo), Me(t), null);
      case 10:
        return (Pt(t.type), Me(t), null);
      case 19:
        if ((z(qe), (a = t.memoizedState), a === null)) return (Me(t), null);
        if (((n = (t.flags & 128) !== 0), (s = a.rendering), s === null))
          if (n) En(a, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = _s(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      En(a, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      Gs(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Nu(l, e), (l = l.sibling));
                  return (B(qe, (qe.current & 1) | 2), pe && Ft(t, a.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            a.tail !== null &&
              ft() > Zs &&
              ((t.flags |= 128), (n = !0), En(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = _s(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Gs(t, e),
                En(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !s.alternate && !pe)
              )
                return (Me(t), null);
            } else
              2 * ft() - a.renderingStartTime > Zs &&
                l !== 536870912 &&
                ((t.flags |= 128), (n = !0), En(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = a.last), e !== null ? (e.sibling = s) : (t.child = s), (a.last = s));
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = ft()),
            (e.sibling = null),
            (l = qe.current),
            B(qe, n ? (l & 1) | 2 : l & 1),
            pe && Ft(t, a.treeForkCount),
            e)
          : (Me(t), null);
      case 22:
      case 23:
        return (
          yt(t),
          wi(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          (l = t.updateQueue),
          l !== null && Gs(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && z(Fl),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Pt(Ge),
          Me(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function y1(e, t) {
    switch ((fi(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Pt(Ge),
          ie(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Xt(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((yt(t), t.alternate === null)) throw Error(o(340));
          Kl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((yt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          Kl();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (z(qe), null);
      case 4:
        return (ie(), null);
      case 10:
        return (Pt(t.type), null);
      case 22:
      case 23:
        return (
          yt(t),
          wi(),
          e !== null && z(Fl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Pt(Ge), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fd(e, t) {
    switch ((fi(t), t.tag)) {
      case 3:
        (Pt(Ge), ie());
        break;
      case 26:
      case 27:
      case 5:
        Xt(t);
        break;
      case 4:
        ie();
        break;
      case 31:
        t.memoizedState !== null && yt(t);
        break;
      case 13:
        yt(t);
        break;
      case 19:
        z(qe);
        break;
      case 10:
        Pt(t.type);
        break;
      case 22:
      case 23:
        (yt(t), wi(), e !== null && z(Fl));
        break;
      case 24:
        Pt(Ge);
    }
  }
  function wn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var s = l.create,
              r = l.inst;
            ((a = s()), (r.destroy = a));
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (f) {
      je(t, t.return, f);
    }
  }
  function Tl(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var s = n.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            var r = a.inst,
              f = r.destroy;
            if (f !== void 0) {
              ((r.destroy = void 0), (n = t));
              var x = l,
                A = f;
              try {
                A();
              } catch (C) {
                je(n, x, C);
              }
            }
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (C) {
      je(t, t.return, C);
    }
  }
  function Wd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Gu(t, l);
      } catch (a) {
        je(e, e.return, a);
      }
    }
  }
  function Pd(e, t, l) {
    ((l.props = ta(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      je(e, t, a);
    }
  }
  function _n(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == 'function' ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (n) {
      je(e, t, n);
    }
  }
  function Yt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (n) {
          je(e, t, n);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (n) {
          je(e, t, n);
        }
      else l.current = null;
  }
  function Id(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break e;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      je(e, e.return, n);
    }
  }
  function so(e, t, l) {
    try {
      var a = e.stateNode;
      (L1(a, e.type, l, t), (a[st] = t));
    } catch (n) {
      je(e, e.return, n);
    }
  }
  function ef(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Ol(e.type)) || e.tag === 4
    );
  }
  function co(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ef(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Ol(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function io(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t = l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Kt)));
    else if (
      a !== 4 &&
      (a === 27 && Ol(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (io(e, t, l), e = e.sibling; e !== null; ) (io(e, t, l), (e = e.sibling));
  }
  function Ys(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (a !== 4 && (a === 27 && Ol(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Ys(e, t, l), e = e.sibling; e !== null; ) (Ys(e, t, l), (e = e.sibling));
  }
  function tf(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      (tt(t, a, l), (t[We] = e), (t[st] = l));
    } catch (s) {
      je(e, e.return, s);
    }
  }
  var al = !1,
    Ve = !1,
    oo = !1,
    lf = typeof WeakSet == 'function' ? WeakSet : Set,
    $e = null;
  function b1(e, t) {
    if (((e = e.containerInfo), (zo = rc), (e = hu(e)), ti(e))) {
      if ('selectionStart' in e) var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              s = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, s.nodeType);
            } catch {
              l = null;
              break e;
            }
            var r = 0,
              f = -1,
              x = -1,
              A = 0,
              C = 0,
              O = e,
              T = null;
            t: for (;;) {
              for (
                var w;
                O !== l || (n !== 0 && O.nodeType !== 3) || (f = r + n),
                  O !== s || (a !== 0 && O.nodeType !== 3) || (x = r + a),
                  O.nodeType === 3 && (r += O.nodeValue.length),
                  (w = O.firstChild) !== null;
              )
                ((T = O), (O = w));
              for (;;) {
                if (O === e) break t;
                if (
                  (T === l && ++A === n && (f = r),
                  T === s && ++C === a && (x = r),
                  (w = O.nextSibling) !== null)
                )
                  break;
                ((O = T), (T = O.parentNode));
              }
              O = w;
            }
            l = f === -1 || x === -1 ? null : { start: f, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Mo = { focusedElem: e, selectionRange: l }, rc = !1, $e = t; $e !== null; )
      if (((t = $e), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), ($e = e));
      else
        for (; $e !== null; ) {
          switch (((t = $e), (s = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (l = 0; l < e.length; l++) ((n = e[l]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                ((e = void 0),
                  (l = t),
                  (n = s.memoizedProps),
                  (s = s.memoizedState),
                  (a = l.stateNode));
                try {
                  var V = ta(l.type, n);
                  ((e = a.getSnapshotBeforeUpdate(V, s)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (te) {
                  je(l, l.return, te);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) ko(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      ko(e);
                      break;
                    default:
                      e.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), ($e = e));
            break;
          }
          $e = t.return;
        }
  }
  function af(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (sl(e, l), a & 4 && wn(5, l));
        break;
      case 1:
        if ((sl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (r) {
              je(l, l.return, r);
            }
          else {
            var n = ta(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (r) {
              je(l, l.return, r);
            }
          }
        (a & 64 && Wd(l), a & 512 && _n(l, l.return));
        break;
      case 3:
        if ((sl(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Gu(e, t);
          } catch (r) {
            je(l, l.return, r);
          }
        }
        break;
      case 27:
        t === null && a & 4 && tf(l);
      case 26:
      case 5:
        (sl(e, l), t === null && a & 4 && Id(l), a & 512 && _n(l, l.return));
        break;
      case 12:
        sl(e, l);
        break;
      case 31:
        (sl(e, l), a & 4 && cf(e, l));
        break;
      case 13:
        (sl(e, l),
          a & 4 && of(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = _1.bind(null, l)), J1(e, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || al), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || Ve), (n = al));
          var s = Ve;
          ((al = a),
            (Ve = t) && !s ? cl(e, l, (l.subtreeFlags & 8772) !== 0) : sl(e, l),
            (al = n),
            (Ve = s));
        }
        break;
      case 30:
        break;
      default:
        sl(e, l);
    }
  }
  function nf(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), nf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Uc(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var He = null,
    it = !1;
  function nl(e, t, l) {
    for (l = l.child; l !== null; ) (sf(e, t, l), (l = l.sibling));
  }
  function sf(e, t, l) {
    if (mt && typeof mt.onCommitFiberUnmount == 'function')
      try {
        mt.onCommitFiberUnmount(Wa, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Ve || Yt(l, t),
          nl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Ve || Yt(l, t);
        var a = He,
          n = it;
        (Ol(l.type) && ((He = l.stateNode), (it = !1)),
          nl(e, t, l),
          Bn(l.stateNode),
          (He = a),
          (it = n));
        break;
      case 5:
        Ve || Yt(l, t);
      case 6:
        if (((a = He), (n = it), (He = null), nl(e, t, l), (He = a), (it = n), He !== null))
          if (it)
            try {
              (He.nodeType === 9
                ? He.body
                : He.nodeName === 'HTML'
                  ? He.ownerDocument.body
                  : He
              ).removeChild(l.stateNode);
            } catch (s) {
              je(l, t, s);
            }
          else
            try {
              He.removeChild(l.stateNode);
            } catch (s) {
              je(l, t, s);
            }
        break;
      case 18:
        He !== null &&
          (it
            ? ((e = He),
              Pf(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              Xa(e))
            : Pf(He, l.stateNode));
        break;
      case 4:
        ((a = He),
          (n = it),
          (He = l.stateNode.containerInfo),
          (it = !0),
          nl(e, t, l),
          (He = a),
          (it = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Tl(2, l, t), Ve || Tl(4, l, t), nl(e, t, l));
        break;
      case 1:
        (Ve ||
          (Yt(l, t), (a = l.stateNode), typeof a.componentWillUnmount == 'function' && Pd(l, t, a)),
          nl(e, t, l));
        break;
      case 21:
        nl(e, t, l);
        break;
      case 22:
        ((Ve = (a = Ve) || l.memoizedState !== null), nl(e, t, l), (Ve = a));
        break;
      default:
        nl(e, t, l);
    }
  }
  function cf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Xa(e);
      } catch (l) {
        je(t, t.return, l);
      }
    }
  }
  function of(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Xa(e);
      } catch (l) {
        je(t, t.return, l);
      }
  }
  function v1(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new lf()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new lf()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Qs(e, t) {
    var l = v1(e);
    t.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var n = C1.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function ot(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          s = e,
          r = t,
          f = r;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Ol(f.type)) {
                ((He = f.stateNode), (it = !1));
                break e;
              }
              break;
            case 5:
              ((He = f.stateNode), (it = !1));
              break e;
            case 3:
            case 4:
              ((He = f.stateNode.containerInfo), (it = !0));
              break e;
          }
          f = f.return;
        }
        if (He === null) throw Error(o(160));
        (sf(s, r, n),
          (He = null),
          (it = !1),
          (s = n.alternate),
          s !== null && (s.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (rf(t, e), (t = t.sibling));
  }
  var Bt = null;
  function rf(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ot(t, e), rt(e), a & 4 && (Tl(3, e, e.return), wn(3, e), Tl(5, e, e.return)));
        break;
      case 1:
        (ot(t, e),
          rt(e),
          a & 512 && (Ve || l === null || Yt(l, l.return)),
          a & 64 &&
            al &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var n = Bt;
        if ((ot(t, e), rt(e), a & 512 && (Ve || l === null || Yt(l, l.return)), a & 4)) {
          var s = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type), (l = e.memoizedProps), (n = n.ownerDocument || n));
                  t: switch (a) {
                    case 'title':
                      ((s = n.getElementsByTagName('title')[0]),
                        (!s ||
                          s[en] ||
                          s[We] ||
                          s.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          s.hasAttribute('itemprop')) &&
                          ((s = n.createElement(a)),
                          n.head.insertBefore(s, n.querySelector('head > title'))),
                        tt(s, a, l),
                        (s[We] = e),
                        Je(s),
                        (a = s));
                      break e;
                    case 'link':
                      var r = rm('link', 'href', n).get(a + (l.href || ''));
                      if (r) {
                        for (var f = 0; f < r.length; f++)
                          if (
                            ((s = r[f]),
                            s.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              s.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              s.getAttribute('title') === (l.title == null ? null : l.title) &&
                              s.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            r.splice(f, 1);
                            break t;
                          }
                      }
                      ((s = n.createElement(a)), tt(s, a, l), n.head.appendChild(s));
                      break;
                    case 'meta':
                      if ((r = rm('meta', 'content', n).get(a + (l.content || '')))) {
                        for (f = 0; f < r.length; f++)
                          if (
                            ((s = r[f]),
                            s.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              s.getAttribute('name') === (l.name == null ? null : l.name) &&
                              s.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              s.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              s.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            r.splice(f, 1);
                            break t;
                          }
                      }
                      ((s = n.createElement(a)), tt(s, a, l), n.head.appendChild(s));
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  ((s[We] = e), Je(s), (a = s));
                }
                e.stateNode = a;
              } else um(n, e.type, e.stateNode);
            else e.stateNode = om(n, a, e.memoizedProps);
          else
            s !== a
              ? (s === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : s.count--,
                a === null ? um(n, e.type, e.stateNode) : om(n, a, e.memoizedProps))
              : a === null && e.stateNode !== null && so(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (ot(t, e),
          rt(e),
          a & 512 && (Ve || l === null || Yt(l, l.return)),
          l !== null && a & 4 && so(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((ot(t, e), rt(e), a & 512 && (Ve || l === null || Yt(l, l.return)), e.flags & 32)) {
          n = e.stateNode;
          try {
            ha(n, '');
          } catch (V) {
            je(e, e.return, V);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), so(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (oo = !0));
        break;
      case 6:
        if ((ot(t, e), rt(e), a & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((a = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = a;
          } catch (V) {
            je(e, e.return, V);
          }
        }
        break;
      case 3:
        if (
          ((sc = null),
          (n = Bt),
          (Bt = ac(t.containerInfo)),
          ot(t, e),
          (Bt = n),
          rt(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Xa(t.containerInfo);
          } catch (V) {
            je(e, e.return, V);
          }
        oo && ((oo = !1), uf(e));
        break;
      case 4:
        ((a = Bt), (Bt = ac(e.stateNode.containerInfo)), ot(t, e), rt(e), (Bt = a));
        break;
      case 12:
        (ot(t, e), rt(e));
        break;
      case 31:
        (ot(t, e),
          rt(e),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Qs(e, a))));
        break;
      case 13:
        (ot(t, e),
          rt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Xs = ft()),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Qs(e, a))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          A = al,
          C = Ve;
        if (((al = A || n), (Ve = C || x), ot(t, e), (Ve = C), (al = A), rt(e), a & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || x || al || Ve || la(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                x = l = t;
                try {
                  if (((s = x.stateNode), n))
                    ((r = s.style),
                      typeof r.setProperty == 'function'
                        ? r.setProperty('display', 'none', 'important')
                        : (r.display = 'none'));
                  else {
                    f = x.stateNode;
                    var O = x.memoizedProps.style,
                      T = O != null && O.hasOwnProperty('display') ? O.display : null;
                    f.style.display = T == null || typeof T == 'boolean' ? '' : ('' + T).trim();
                  }
                } catch (V) {
                  je(x, x.return, V);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = n ? '' : x.memoizedProps;
                } catch (V) {
                  je(x, x.return, V);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                x = t;
                try {
                  var w = x.stateNode;
                  n ? If(w, !0) : If(x.stateNode, !1);
                } catch (V) {
                  je(x, x.return, V);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (l === t && (l = null), (t = t.return));
            }
            (l === t && (l = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), Qs(e, l))));
        break;
      case 19:
        (ot(t, e),
          rt(e),
          a & 4 && ((a = e.updateQueue), a !== null && ((e.updateQueue = null), Qs(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ot(t, e), rt(e));
    }
  }
  function rt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (ef(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              s = co(e);
            Ys(e, s, n);
            break;
          case 5:
            var r = l.stateNode;
            l.flags & 32 && (ha(r, ''), (l.flags &= -33));
            var f = co(e);
            Ys(e, f, r);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              A = co(e);
            io(e, A, x);
            break;
          default:
            throw Error(o(161));
        }
      } catch (C) {
        je(e, e.return, C);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function uf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (uf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function sl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (af(e, t.alternate, t), (t = t.sibling));
  }
  function la(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Tl(4, t, t.return), la(t));
          break;
        case 1:
          Yt(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && Pd(t, t.return, l), la(t));
          break;
        case 27:
          Bn(t.stateNode);
        case 26:
        case 5:
          (Yt(t, t.return), la(t));
          break;
        case 22:
          t.memoizedState === null && la(t);
          break;
        case 30:
          la(t);
          break;
        default:
          la(t);
      }
      e = e.sibling;
    }
  }
  function cl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        s = t,
        r = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (cl(n, s, l), wn(4, s));
          break;
        case 1:
          if ((cl(n, s, l), (a = s), (n = a.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (A) {
              je(a, a.return, A);
            }
          if (((a = s), (n = a.updateQueue), n !== null)) {
            var f = a.stateNode;
            try {
              var x = n.shared.hiddenCallbacks;
              if (x !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < x.length; n++) Lu(x[n], f);
            } catch (A) {
              je(a, a.return, A);
            }
          }
          (l && r & 64 && Wd(s), _n(s, s.return));
          break;
        case 27:
          tf(s);
        case 26:
        case 5:
          (cl(n, s, l), l && a === null && r & 4 && Id(s), _n(s, s.return));
          break;
        case 12:
          cl(n, s, l);
          break;
        case 31:
          (cl(n, s, l), l && r & 4 && cf(n, s));
          break;
        case 13:
          (cl(n, s, l), l && r & 4 && of(n, s));
          break;
        case 22:
          (s.memoizedState === null && cl(n, s, l), _n(s, s.return));
          break;
        case 30:
          break;
        default:
          cl(n, s, l);
      }
      t = t.sibling;
    }
  }
  function ro(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && hn(l)));
  }
  function uo(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && hn(e)));
  }
  function Ut(e, t, l, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (df(e, t, l, a), (t = t.sibling));
  }
  function df(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ut(e, t, l, a), n & 2048 && wn(9, t));
        break;
      case 1:
        Ut(e, t, l, a);
        break;
      case 3:
        (Ut(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && hn(e))));
        break;
      case 12:
        if (n & 2048) {
          (Ut(e, t, l, a), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              r = s.id,
              f = s.onPostCommit;
            typeof f == 'function' &&
              f(r, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            je(t, t.return, x);
          }
        } else Ut(e, t, l, a);
        break;
      case 31:
        Ut(e, t, l, a);
        break;
      case 13:
        Ut(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (r = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? Ut(e, t, l, a)
              : Cn(e, t)
            : s._visibility & 2
              ? Ut(e, t, l, a)
              : ((s._visibility |= 2), ka(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && ro(r, t));
        break;
      case 24:
        (Ut(e, t, l, a), n & 2048 && uo(t.alternate, t));
        break;
      default:
        Ut(e, t, l, a);
    }
  }
  function ka(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e,
        r = t,
        f = l,
        x = a,
        A = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          (ka(s, r, f, x, n), wn(8, r));
          break;
        case 23:
          break;
        case 22:
          var C = r.stateNode;
          (r.memoizedState !== null
            ? C._visibility & 2
              ? ka(s, r, f, x, n)
              : Cn(s, r)
            : ((C._visibility |= 2), ka(s, r, f, x, n)),
            n && A & 2048 && ro(r.alternate, r));
          break;
        case 24:
          (ka(s, r, f, x, n), n && A & 2048 && uo(r.alternate, r));
          break;
        default:
          ka(s, r, f, x, n);
      }
      t = t.sibling;
    }
  }
  function Cn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (Cn(l, a), n & 2048 && ro(a.alternate, a));
            break;
          case 24:
            (Cn(l, a), n & 2048 && uo(a.alternate, a));
            break;
          default:
            Cn(l, a);
        }
        t = t.sibling;
      }
  }
  var zn = 8192;
  function Da(e, t, l) {
    if (e.subtreeFlags & zn) for (e = e.child; e !== null; ) (ff(e, t, l), (e = e.sibling));
  }
  function ff(e, t, l) {
    switch (e.tag) {
      case 26:
        (Da(e, t, l),
          e.flags & zn && e.memoizedState !== null && cp(l, Bt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Da(e, t, l);
        break;
      case 3:
      case 4:
        var a = Bt;
        ((Bt = ac(e.stateNode.containerInfo)), Da(e, t, l), (Bt = a));
        break;
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = zn), (zn = 16777216), Da(e, t, l), (zn = a))
            : Da(e, t, l));
        break;
      default:
        Da(e, t, l);
    }
  }
  function mf(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Mn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (($e = a), pf(a, e));
        }
      mf(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (hf(e), (e = e.sibling));
  }
  function hf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Mn(e), e.flags & 2048 && Tl(9, e, e.return));
        break;
      case 3:
        Mn(e);
        break;
      case 12:
        Mn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Vs(e))
          : Mn(e);
        break;
      default:
        Mn(e);
    }
  }
  function Vs(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (($e = a), pf(a, e));
        }
      mf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Tl(8, t, t.return), Vs(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), Vs(t)));
          break;
        default:
          Vs(t);
      }
      e = e.sibling;
    }
  }
  function pf(e, t) {
    for (; $e !== null; ) {
      var l = $e;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Tl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          hn(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), ($e = a));
      else
        e: for (l = e; $e !== null; ) {
          a = $e;
          var n = a.sibling,
            s = a.return;
          if ((nf(a), a === l)) {
            $e = null;
            break e;
          }
          if (n !== null) {
            ((n.return = s), ($e = n));
            break e;
          }
          $e = s;
        }
    }
  }
  var S1 = {
      getCacheForType: function (e) {
        var t = Ie(Ge),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return Ie(Ge).controller.signal;
      },
    },
    j1 = typeof WeakMap == 'function' ? WeakMap : Map,
    be = 0,
    we = null,
    ue = null,
    fe = 0,
    Se = 0,
    bt = null,
    El = !1,
    Ra = !1,
    fo = !1,
    il = 0,
    Re = 0,
    wl = 0,
    aa = 0,
    mo = 0,
    vt = 0,
    Ba = 0,
    On = null,
    ut = null,
    ho = !1,
    Xs = 0,
    xf = 0,
    Zs = 1 / 0,
    Ks = null,
    _l = null,
    Xe = 0,
    Cl = null,
    Ua = null,
    ol = 0,
    po = 0,
    xo = null,
    gf = null,
    Hn = 0,
    go = null;
  function St() {
    return (be & 2) !== 0 && fe !== 0 ? fe & -fe : _.T !== null ? No() : Or();
  }
  function yf() {
    if (vt === 0)
      if ((fe & 536870912) === 0 || pe) {
        var e = ts;
        ((ts <<= 1), (ts & 3932160) === 0 && (ts = 262144), (vt = e));
      } else vt = 536870912;
    return ((e = gt.current), e !== null && (e.flags |= 32), vt);
  }
  function dt(e, t, l) {
    (((e === we && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null) &&
      (qa(e, 0), zl(e, fe, vt, !1)),
      Ia(e, l),
      ((be & 2) === 0 || e !== we) &&
        (e === we && ((be & 2) === 0 && (aa |= l), Re === 4 && zl(e, fe, vt, !1)), Qt(e)));
  }
  function bf(e, t, l) {
    if ((be & 6) !== 0) throw Error(o(327));
    var a = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Pa(e, t),
      n = a ? T1(e, t) : bo(e, t, !0),
      s = a;
    do {
      if (n === 0) {
        Ra && !a && zl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), s && !N1(l))) {
          ((n = bo(e, t, !1)), (s = !1));
          continue;
        }
        if (n === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var r = 0;
          else
            ((r = e.pendingLanes & -536870913), (r = r !== 0 ? r : r & 536870912 ? 536870912 : 0));
          if (r !== 0) {
            t = r;
            e: {
              var f = e;
              n = On;
              var x = f.current.memoizedState.isDehydrated;
              if ((x && (qa(f, r).flags |= 256), (r = bo(f, r, !1)), r !== 2)) {
                if (fo && !x) {
                  ((f.errorRecoveryDisabledLanes |= s), (aa |= s), (n = 4));
                  break e;
                }
                ((s = ut), (ut = n), s !== null && (ut === null ? (ut = s) : ut.push.apply(ut, s)));
              }
              n = r;
            }
            if (((s = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (qa(e, 0), zl(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (s = n), s)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              zl(a, t, vt, !El);
              break e;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((n = Xs + 300 - ft()), 10 < n)) {
            if ((zl(a, t, vt, !El), as(a, 0, !0) !== 0)) break e;
            ((ol = t),
              (a.timeoutHandle = Ff(
                vf.bind(null, a, l, ut, Ks, ho, t, vt, aa, Ba, El, s, 'Throttled', -0, 0),
                n
              )));
            break e;
          }
          vf(a, l, ut, Ks, ho, t, vt, aa, Ba, El, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Qt(e);
  }
  function vf(e, t, l, a, n, s, r, f, x, A, C, O, T, w) {
    if (((e.timeoutHandle = -1), (O = t.subtreeFlags), O & 8192 || (O & 16785408) === 16785408)) {
      ((O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Kt,
      }),
        ff(t, s, O));
      var V = (s & 62914560) === s ? Xs - ft() : (s & 4194048) === s ? xf - ft() : 0;
      if (((V = ip(O, V)), V !== null)) {
        ((ol = s),
          (e.cancelPendingCommit = V(_f.bind(null, e, t, s, l, a, n, r, f, x, C, O, null, T, w))),
          zl(e, s, r, !A));
        return;
      }
    }
    _f(e, t, s, l, a, n, r, f, x);
  }
  function N1(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            s = n.getSnapshot;
          n = n.value;
          try {
            if (!pt(s(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null)) ((l.return = t), (t = l));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function zl(e, t, l, a) {
    ((t &= ~mo),
      (t &= ~aa),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var n = t; 0 < n; ) {
      var s = 31 - ht(n),
        r = 1 << s;
      ((a[s] = -1), (n &= ~r));
    }
    l !== 0 && Cr(e, l, t);
  }
  function Js() {
    return (be & 6) === 0 ? (kn(0), !1) : !0;
  }
  function yo() {
    if (ue !== null) {
      if (Se === 0) var e = ue.return;
      else ((e = ue), (Wt = Jl = null), Hi(e), (Ca = null), (xn = 0), (e = ue));
      for (; e !== null; ) (Fd(e.alternate, e), (e = e.return));
      ue = null;
    }
  }
  function qa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), Q1(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (ol = 0),
      yo(),
      (we = e),
      (ue = l = $t(e.current, null)),
      (fe = t),
      (Se = 0),
      (bt = null),
      (El = !1),
      (Ra = Pa(e, t)),
      (fo = !1),
      (Ba = vt = mo = aa = wl = Re = 0),
      (ut = On = null),
      (ho = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - ht(a),
          s = 1 << n;
        ((t |= e[n]), (a &= ~s));
      }
    return ((il = t), ps(), l);
  }
  function Sf(e, t) {
    ((ne = null),
      (_.H = An),
      t === _a || t === Ns
        ? ((t = Ru()), (Se = 3))
        : t === Si
          ? ((t = Ru()), (Se = 4))
          : (Se =
              t === $i
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (bt = t),
      ue === null && ((Re = 1), Bs(e, _t(t, e.current))));
  }
  function jf() {
    var e = gt.current;
    return e === null
      ? !0
      : (fe & 4194048) === fe
        ? Ot === null
        : (fe & 62914560) === fe || (fe & 536870912) !== 0
          ? e === Ot
          : !1;
  }
  function Nf() {
    var e = _.H;
    return ((_.H = An), e === null ? An : e);
  }
  function Af() {
    var e = _.A;
    return ((_.A = S1), e);
  }
  function $s() {
    ((Re = 4),
      El || ((fe & 4194048) !== fe && gt.current !== null) || (Ra = !0),
      ((wl & 134217727) === 0 && (aa & 134217727) === 0) || we === null || zl(we, fe, vt, !1));
  }
  function bo(e, t, l) {
    var a = be;
    be |= 2;
    var n = Nf(),
      s = Af();
    ((we !== e || fe !== t) && ((Ks = null), qa(e, t)), (t = !1));
    var r = Re;
    e: do
      try {
        if (Se !== 0 && ue !== null) {
          var f = ue,
            x = bt;
          switch (Se) {
            case 8:
              (yo(), (r = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0);
              var A = Se;
              if (((Se = 0), (bt = null), La(e, f, x, A), l && Ra)) {
                r = 0;
                break e;
              }
              break;
            default:
              ((A = Se), (Se = 0), (bt = null), La(e, f, x, A));
          }
        }
        (A1(), (r = Re));
        break;
      } catch (C) {
        Sf(e, C);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Wt = Jl = null),
      (be = a),
      (_.H = n),
      (_.A = s),
      ue === null && ((we = null), (fe = 0), ps()),
      r
    );
  }
  function A1() {
    for (; ue !== null; ) Tf(ue);
  }
  function T1(e, t) {
    var l = be;
    be |= 2;
    var a = Nf(),
      n = Af();
    we !== e || fe !== t ? ((Ks = null), (Zs = ft() + 500), qa(e, t)) : (Ra = Pa(e, t));
    e: do
      try {
        if (Se !== 0 && ue !== null) {
          t = ue;
          var s = bt;
          t: switch (Se) {
            case 1:
              ((Se = 0), (bt = null), La(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (ku(s)) {
                ((Se = 0), (bt = null), Ef(t));
                break;
              }
              ((t = function () {
                ((Se !== 2 && Se !== 9) || we !== e || (Se = 7), Qt(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              Se = 7;
              break e;
            case 4:
              Se = 5;
              break e;
            case 7:
              ku(s) ? ((Se = 0), (bt = null), Ef(t)) : ((Se = 0), (bt = null), La(e, t, s, 7));
              break;
            case 5:
              var r = null;
              switch (ue.tag) {
                case 26:
                  r = ue.memoizedState;
                case 5:
                case 27:
                  var f = ue;
                  if (r ? dm(r) : f.stateNode.complete) {
                    ((Se = 0), (bt = null));
                    var x = f.sibling;
                    if (x !== null) ue = x;
                    else {
                      var A = f.return;
                      A !== null ? ((ue = A), Fs(A)) : (ue = null);
                    }
                    break t;
                  }
              }
              ((Se = 0), (bt = null), La(e, t, s, 5));
              break;
            case 6:
              ((Se = 0), (bt = null), La(e, t, s, 6));
              break;
            case 8:
              (yo(), (Re = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        E1();
        break;
      } catch (C) {
        Sf(e, C);
      }
    while (!0);
    return (
      (Wt = Jl = null),
      (_.H = a),
      (_.A = n),
      (be = l),
      ue !== null ? 0 : ((we = null), (fe = 0), ps(), Re)
    );
  }
  function E1() {
    for (; ue !== null && !$0(); ) Tf(ue);
  }
  function Tf(e) {
    var t = Jd(e.alternate, e, il);
    ((e.memoizedProps = e.pendingProps), t === null ? Fs(e) : (ue = t));
  }
  function Ef(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Yd(l, t, t.pendingProps, t.type, void 0, fe);
        break;
      case 11:
        t = Yd(l, t, t.pendingProps, t.type.render, t.ref, fe);
        break;
      case 5:
        Hi(t);
      default:
        (Fd(l, t), (t = ue = Nu(t, il)), (t = Jd(l, t, il)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Fs(e) : (ue = t));
  }
  function La(e, t, l, a) {
    ((Wt = Jl = null), Hi(t), (Ca = null), (xn = 0));
    var n = t.return;
    try {
      if (h1(e, n, t, l, fe)) {
        ((Re = 1), Bs(e, _t(l, e.current)), (ue = null));
        return;
      }
    } catch (s) {
      if (n !== null) throw ((ue = n), s);
      ((Re = 1), Bs(e, _t(l, e.current)), (ue = null));
      return;
    }
    t.flags & 32768
      ? (pe || a === 1
          ? (e = !0)
          : Ra || (fe & 536870912) !== 0
            ? (e = !1)
            : ((El = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = gt.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        wf(t, e))
      : Fs(t);
  }
  function Fs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        wf(t, El);
        return;
      }
      e = t.return;
      var l = g1(t.alternate, t, il);
      if (l !== null) {
        ue = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function wf(e, t) {
    do {
      var l = y1(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (ue = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ue = e;
        return;
      }
      ue = e = l;
    } while (e !== null);
    ((Re = 6), (ue = null));
  }
  function _f(e, t, l, a, n, s, r, f, x) {
    e.cancelPendingCommit = null;
    do Ws();
    while (Xe !== 0);
    if ((be & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= ci),
        sh(e, l, s, r, f, x),
        e === we && ((ue = we = null), (fe = 0)),
        (Ua = t),
        (Cl = e),
        (ol = l),
        (po = s),
        (xo = n),
        (gf = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            z1(In, function () {
              return (Hf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = _.T), (_.T = null), (n = R.p), (R.p = 2), (r = be), (be |= 4));
        try {
          b1(e, t, l);
        } finally {
          ((be = r), (R.p = n), (_.T = a));
        }
      }
      ((Xe = 1), Cf(), zf(), Mf());
    }
  }
  function Cf() {
    if (Xe === 1) {
      Xe = 0;
      var e = Cl,
        t = Ua,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = _.T), (_.T = null));
        var a = R.p;
        R.p = 2;
        var n = be;
        be |= 4;
        try {
          rf(t, e);
          var s = Mo,
            r = hu(e.containerInfo),
            f = s.focusedElem,
            x = s.selectionRange;
          if (r !== f && f && f.ownerDocument && mu(f.ownerDocument.documentElement, f)) {
            if (x !== null && ti(f)) {
              var A = x.start,
                C = x.end;
              if ((C === void 0 && (C = A), 'selectionStart' in f))
                ((f.selectionStart = A), (f.selectionEnd = Math.min(C, f.value.length)));
              else {
                var O = f.ownerDocument || document,
                  T = (O && O.defaultView) || window;
                if (T.getSelection) {
                  var w = T.getSelection(),
                    V = f.textContent.length,
                    te = Math.min(x.start, V),
                    Ee = x.end === void 0 ? te : Math.min(x.end, V);
                  !w.extend && te > Ee && ((r = Ee), (Ee = te), (te = r));
                  var j = fu(f, te),
                    v = fu(f, Ee);
                  if (
                    j &&
                    v &&
                    (w.rangeCount !== 1 ||
                      w.anchorNode !== j.node ||
                      w.anchorOffset !== j.offset ||
                      w.focusNode !== v.node ||
                      w.focusOffset !== v.offset)
                  ) {
                    var N = O.createRange();
                    (N.setStart(j.node, j.offset),
                      w.removeAllRanges(),
                      te > Ee
                        ? (w.addRange(N), w.extend(v.node, v.offset))
                        : (N.setEnd(v.node, v.offset), w.addRange(N)));
                  }
                }
              }
            }
            for (O = [], w = f; (w = w.parentNode); )
              w.nodeType === 1 && O.push({ element: w, left: w.scrollLeft, top: w.scrollTop });
            for (typeof f.focus == 'function' && f.focus(), f = 0; f < O.length; f++) {
              var M = O[f];
              ((M.element.scrollLeft = M.left), (M.element.scrollTop = M.top));
            }
          }
          ((rc = !!zo), (Mo = zo = null));
        } finally {
          ((be = n), (R.p = a), (_.T = l));
        }
      }
      ((e.current = t), (Xe = 2));
    }
  }
  function zf() {
    if (Xe === 2) {
      Xe = 0;
      var e = Cl,
        t = Ua,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = _.T), (_.T = null));
        var a = R.p;
        R.p = 2;
        var n = be;
        be |= 4;
        try {
          af(e, t.alternate, t);
        } finally {
          ((be = n), (R.p = a), (_.T = l));
        }
      }
      Xe = 3;
    }
  }
  function Mf() {
    if (Xe === 4 || Xe === 3) {
      ((Xe = 0), F0());
      var e = Cl,
        t = Ua,
        l = ol,
        a = gf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Xe = 5)
        : ((Xe = 0), (Ua = Cl = null), Of(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (_l = null),
        Rc(l),
        (t = t.stateNode),
        mt && typeof mt.onCommitFiberRoot == 'function')
      )
        try {
          mt.onCommitFiberRoot(Wa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = _.T), (n = R.p), (R.p = 2), (_.T = null));
        try {
          for (var s = e.onRecoverableError, r = 0; r < a.length; r++) {
            var f = a[r];
            s(f.value, { componentStack: f.stack });
          }
        } finally {
          ((_.T = t), (R.p = n));
        }
      }
      ((ol & 3) !== 0 && Ws(),
        Qt(e),
        (n = e.pendingLanes),
        (l & 261930) !== 0 && (n & 42) !== 0 ? (e === go ? Hn++ : ((Hn = 0), (go = e))) : (Hn = 0),
        kn(0));
    }
  }
  function Of(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), hn(t)));
  }
  function Ws() {
    return (Cf(), zf(), Mf(), Hf());
  }
  function Hf() {
    if (Xe !== 5) return !1;
    var e = Cl,
      t = po;
    po = 0;
    var l = Rc(ol),
      a = _.T,
      n = R.p;
    try {
      ((R.p = 32 > l ? 32 : l), (_.T = null), (l = xo), (xo = null));
      var s = Cl,
        r = ol;
      if (((Xe = 0), (Ua = Cl = null), (ol = 0), (be & 6) !== 0)) throw Error(o(331));
      var f = be;
      if (
        ((be |= 4),
        hf(s.current),
        df(s, s.current, r, l),
        (be = f),
        kn(0, !1),
        mt && typeof mt.onPostCommitFiberRoot == 'function')
      )
        try {
          mt.onPostCommitFiberRoot(Wa, s);
        } catch {}
      return !0;
    } finally {
      ((R.p = n), (_.T = a), Of(e, t));
    }
  }
  function kf(e, t, l) {
    ((t = _t(l, t)),
      (t = Ji(e.stateNode, t, 2)),
      (e = jl(e, t, 2)),
      e !== null && (Ia(e, 2), Qt(e)));
  }
  function je(e, t, l) {
    if (e.tag === 3) kf(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          kf(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (_l === null || !_l.has(a)))
          ) {
            ((e = _t(l, e)),
              (l = kd(2)),
              (a = jl(t, l, 2)),
              a !== null && (Dd(l, a, t, e), Ia(a, 2), Qt(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function vo(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new j1();
      var n = new Set();
      a.set(t, n);
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
    n.has(l) || ((fo = !0), n.add(l), (e = w1.bind(null, e, t, l)), t.then(e, e));
  }
  function w1(e, t, l) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      we === e &&
        (fe & l) === l &&
        (Re === 4 || (Re === 3 && (fe & 62914560) === fe && 300 > ft() - Xs)
          ? (be & 2) === 0 && qa(e, 0)
          : (mo |= l),
        Ba === fe && (Ba = 0)),
      Qt(e));
  }
  function Df(e, t) {
    (t === 0 && (t = _r()), (e = Xl(e, t)), e !== null && (Ia(e, t), Qt(e)));
  }
  function _1(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Df(e, l));
  }
  function C1(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(t), Df(e, l));
  }
  function z1(e, t) {
    return Oc(e, t);
  }
  var Ps = null,
    Ga = null,
    So = !1,
    Is = !1,
    jo = !1,
    Ml = 0;
  function Qt(e) {
    (e !== Ga && e.next === null && (Ga === null ? (Ps = Ga = e) : (Ga = Ga.next = e)),
      (Is = !0),
      So || ((So = !0), O1()));
  }
  function kn(e, t) {
    if (!jo && Is) {
      jo = !0;
      do
        for (var l = !1, a = Ps; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var s = 0;
            else {
              var r = a.suspendedLanes,
                f = a.pingedLanes;
              ((s = (1 << (31 - ht(42 | e) + 1)) - 1),
                (s &= n & ~(r & ~f)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((l = !0), qf(a, s));
          } else
            ((s = fe),
              (s = as(
                a,
                a === we ? s : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (s & 3) === 0 || Pa(a, s) || ((l = !0), qf(a, s)));
          a = a.next;
        }
      while (l);
      jo = !1;
    }
  }
  function M1() {
    Rf();
  }
  function Rf() {
    Is = So = !1;
    var e = 0;
    Ml !== 0 && Y1() && (e = Ml);
    for (var t = ft(), l = null, a = Ps; a !== null; ) {
      var n = a.next,
        s = Bf(a, t);
      (s === 0
        ? ((a.next = null), l === null ? (Ps = n) : (l.next = n), n === null && (Ga = l))
        : ((l = a), (e !== 0 || (s & 3) !== 0) && (Is = !0)),
        (a = n));
    }
    ((Xe !== 0 && Xe !== 5) || kn(e), Ml !== 0 && (Ml = 0));
  }
  function Bf(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var r = 31 - ht(s),
        f = 1 << r,
        x = n[r];
      (x === -1
        ? ((f & l) === 0 || (f & a) !== 0) && (n[r] = nh(f, t))
        : x <= t && (e.expiredLanes |= f),
        (s &= ~f));
    }
    if (
      ((t = we),
      (l = fe),
      (l = as(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (a = e.callbackNode),
      l === 0 || (e === t && (Se === 2 || Se === 9)) || e.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && Hc(a), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Pa(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && Hc(a), Rc(l))) {
        case 2:
        case 8:
          l = Er;
          break;
        case 32:
          l = In;
          break;
        case 268435456:
          l = wr;
          break;
        default:
          l = In;
      }
      return (
        (a = Uf.bind(null, e)),
        (l = Oc(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && Hc(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Uf(e, t) {
    if (Xe !== 0 && Xe !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Ws() && e.callbackNode !== l) return null;
    var a = fe;
    return (
      (a = as(e, e === we ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      a === 0
        ? null
        : (bf(e, a, t),
          Bf(e, ft()),
          e.callbackNode != null && e.callbackNode === l ? Uf.bind(null, e) : null)
    );
  }
  function qf(e, t) {
    if (Ws()) return null;
    bf(e, t, !0);
  }
  function O1() {
    V1(function () {
      (be & 6) !== 0 ? Oc(Tr, M1) : Rf();
    });
  }
  function No() {
    if (Ml === 0) {
      var e = Ea;
      (e === 0 && ((e = es), (es <<= 1), (es & 261888) === 0 && (es = 256)), (Ml = e));
    }
    return Ml;
  }
  function Lf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : is('' + e);
  }
  function Gf(e, t) {
    var l = t.ownerDocument.createElement('input');
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute('form', e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function H1(e, t, l, a, n) {
    if (t === 'submit' && l && l.stateNode === n) {
      var s = Lf((n[st] || null).action),
        r = a.submitter;
      r &&
        ((t = (t = r[st] || null) ? Lf(t.formAction) : r.getAttribute('formAction')),
        t !== null && ((s = t), (r = null)));
      var f = new ds('action', 'action', null, a, n);
      e.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Ml !== 0) {
                  var x = r ? Gf(n, r) : new FormData(n);
                  Yi(l, { pending: !0, data: x, method: n.method, action: s }, null, x);
                }
              } else
                typeof s == 'function' &&
                  (f.preventDefault(),
                  (x = r ? Gf(n, r) : new FormData(n)),
                  Yi(l, { pending: !0, data: x, method: n.method, action: s }, s, x));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var Ao = 0; Ao < si.length; Ao++) {
    var To = si[Ao],
      k1 = To.toLowerCase(),
      D1 = To[0].toUpperCase() + To.slice(1);
    Rt(k1, 'on' + D1);
  }
  (Rt(gu, 'onAnimationEnd'),
    Rt(yu, 'onAnimationIteration'),
    Rt(bu, 'onAnimationStart'),
    Rt('dblclick', 'onDoubleClick'),
    Rt('focusin', 'onFocus'),
    Rt('focusout', 'onBlur'),
    Rt(Wh, 'onTransitionRun'),
    Rt(Ph, 'onTransitionStart'),
    Rt(Ih, 'onTransitionCancel'),
    Rt(vu, 'onTransitionEnd'),
    fa('onMouseEnter', ['mouseout', 'mouseover']),
    fa('onMouseLeave', ['mouseout', 'mouseover']),
    fa('onPointerEnter', ['pointerout', 'pointerover']),
    fa('onPointerLeave', ['pointerout', 'pointerover']),
    Gl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Gl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Gl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Gl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Gl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Gl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Dn =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    R1 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Dn)
    );
  function Yf(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event;
      a = a.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var r = a.length - 1; 0 <= r; r--) {
            var f = a[r],
              x = f.instance,
              A = f.currentTarget;
            if (((f = f.listener), x !== s && n.isPropagationStopped())) break e;
            ((s = f), (n.currentTarget = A));
            try {
              s(n);
            } catch (C) {
              hs(C);
            }
            ((n.currentTarget = null), (s = x));
          }
        else
          for (r = 0; r < a.length; r++) {
            if (
              ((f = a[r]),
              (x = f.instance),
              (A = f.currentTarget),
              (f = f.listener),
              x !== s && n.isPropagationStopped())
            )
              break e;
            ((s = f), (n.currentTarget = A));
            try {
              s(n);
            } catch (C) {
              hs(C);
            }
            ((n.currentTarget = null), (s = x));
          }
      }
    }
  }
  function de(e, t) {
    var l = t[Bc];
    l === void 0 && (l = t[Bc] = new Set());
    var a = e + '__bubble';
    l.has(a) || (Qf(t, e, 2, !1), l.add(a));
  }
  function Eo(e, t, l) {
    var a = 0;
    (t && (a |= 4), Qf(l, e, a, t));
  }
  var ec = '_reactListening' + Math.random().toString(36).slice(2);
  function wo(e) {
    if (!e[ec]) {
      ((e[ec] = !0),
        Dr.forEach(function (l) {
          l !== 'selectionchange' && (R1.has(l) || Eo(l, !1, e), Eo(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ec] || ((t[ec] = !0), Eo('selectionchange', !1, t));
    }
  }
  function Qf(e, t, l, a) {
    switch (ym(t)) {
      case 2:
        var n = up;
        break;
      case 8:
        n = dp;
        break;
      default:
        n = Yo;
    }
    ((l = n.bind(null, t, l, e)),
      (n = void 0),
      !Zc || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
          ? e.addEventListener(t, l, { passive: n })
          : e.addEventListener(t, l, !1));
  }
  function _o(e, t, l, a, n) {
    var s = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var r = a.tag;
        if (r === 3 || r === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (r === 4)
            for (r = a.return; r !== null; ) {
              var x = r.tag;
              if ((x === 3 || x === 4) && r.stateNode.containerInfo === n) return;
              r = r.return;
            }
          for (; f !== null; ) {
            if (((r = ra(f)), r === null)) return;
            if (((x = r.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              a = s = r;
              continue e;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Kr(function () {
      var A = s,
        C = Vc(l),
        O = [];
      e: {
        var T = Su.get(e);
        if (T !== void 0) {
          var w = ds,
            V = e;
          switch (e) {
            case 'keypress':
              if (rs(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              w = Ch;
              break;
            case 'focusin':
              ((V = 'focus'), (w = Fc));
              break;
            case 'focusout':
              ((V = 'blur'), (w = Fc));
              break;
            case 'beforeblur':
            case 'afterblur':
              w = Fc;
              break;
            case 'click':
              if (l.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              w = Fr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              w = gh;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              w = Oh;
              break;
            case gu:
            case yu:
            case bu:
              w = vh;
              break;
            case vu:
              w = kh;
              break;
            case 'scroll':
            case 'scrollend':
              w = ph;
              break;
            case 'wheel':
              w = Rh;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              w = jh;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              w = Pr;
              break;
            case 'toggle':
            case 'beforetoggle':
              w = Uh;
          }
          var te = (t & 4) !== 0,
            Ee = !te && (e === 'scroll' || e === 'scrollend'),
            j = te ? (T !== null ? T + 'Capture' : null) : T;
          te = [];
          for (var v = A, N; v !== null; ) {
            var M = v;
            if (
              ((N = M.stateNode),
              (M = M.tag),
              (M !== 5 && M !== 26 && M !== 27) ||
                N === null ||
                j === null ||
                ((M = ln(v, j)), M != null && te.push(Rn(v, M, N))),
              Ee)
            )
              break;
            v = v.return;
          }
          0 < te.length && ((T = new w(T, V, null, l, C)), O.push({ event: T, listeners: te }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((T = e === 'mouseover' || e === 'pointerover'),
            (w = e === 'mouseout' || e === 'pointerout'),
            T && l !== Qc && (V = l.relatedTarget || l.fromElement) && (ra(V) || V[oa]))
          )
            break e;
          if (
            (w || T) &&
            ((T =
              C.window === C
                ? C
                : (T = C.ownerDocument)
                  ? T.defaultView || T.parentWindow
                  : window),
            w
              ? ((V = l.relatedTarget || l.toElement),
                (w = A),
                (V = V ? ra(V) : null),
                V !== null &&
                  ((Ee = m(V)), (te = V.tag), V !== Ee || (te !== 5 && te !== 27 && te !== 6)) &&
                  (V = null))
              : ((w = null), (V = A)),
            w !== V)
          ) {
            if (
              ((te = Fr),
              (M = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (v = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((te = Pr), (M = 'onPointerLeave'), (j = 'onPointerEnter'), (v = 'pointer')),
              (Ee = w == null ? T : tn(w)),
              (N = V == null ? T : tn(V)),
              (T = new te(M, v + 'leave', w, l, C)),
              (T.target = Ee),
              (T.relatedTarget = N),
              (M = null),
              ra(C) === A &&
                ((te = new te(j, v + 'enter', V, l, C)),
                (te.target = N),
                (te.relatedTarget = Ee),
                (M = te)),
              (Ee = M),
              w && V)
            )
              t: {
                for (te = B1, j = w, v = V, N = 0, M = j; M; M = te(M)) N++;
                M = 0;
                for (var W = v; W; W = te(W)) M++;
                for (; 0 < N - M; ) ((j = te(j)), N--);
                for (; 0 < M - N; ) ((v = te(v)), M--);
                for (; N--; ) {
                  if (j === v || (v !== null && j === v.alternate)) {
                    te = j;
                    break t;
                  }
                  ((j = te(j)), (v = te(v)));
                }
                te = null;
              }
            else te = null;
            (w !== null && Vf(O, T, w, te, !1), V !== null && Ee !== null && Vf(O, Ee, V, te, !0));
          }
        }
        e: {
          if (
            ((T = A ? tn(A) : window),
            (w = T.nodeName && T.nodeName.toLowerCase()),
            w === 'select' || (w === 'input' && T.type === 'file'))
          )
            var xe = cu;
          else if (nu(T))
            if (iu) xe = Jh;
            else {
              xe = Zh;
              var K = Xh;
            }
          else
            ((w = T.nodeName),
              !w || w.toLowerCase() !== 'input' || (T.type !== 'checkbox' && T.type !== 'radio')
                ? A && Yc(A.elementType) && (xe = cu)
                : (xe = Kh));
          if (xe && (xe = xe(e, A))) {
            su(O, xe, l, C);
            break e;
          }
          (K && K(e, T, A),
            e === 'focusout' &&
              A &&
              T.type === 'number' &&
              A.memoizedProps.value != null &&
              Gc(T, 'number', T.value));
        }
        switch (((K = A ? tn(A) : window), e)) {
          case 'focusin':
            (nu(K) || K.contentEditable === 'true') && ((ya = K), (li = A), (dn = null));
            break;
          case 'focusout':
            dn = li = ya = null;
            break;
          case 'mousedown':
            ai = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((ai = !1), pu(O, l, C));
            break;
          case 'selectionchange':
            if (Fh) break;
          case 'keydown':
          case 'keyup':
            pu(O, l, C);
        }
        var ce;
        if (Pc)
          e: {
            switch (e) {
              case 'compositionstart':
                var me = 'onCompositionStart';
                break e;
              case 'compositionend':
                me = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                me = 'onCompositionUpdate';
                break e;
            }
            me = void 0;
          }
        else
          ga
            ? lu(e, l) && (me = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (me = 'onCompositionStart');
        (me &&
          (Ir &&
            l.locale !== 'ko' &&
            (ga || me !== 'onCompositionStart'
              ? me === 'onCompositionEnd' && ga && (ce = Jr())
              : ((pl = C), (Kc = 'value' in pl ? pl.value : pl.textContent), (ga = !0))),
          (K = tc(A, me)),
          0 < K.length &&
            ((me = new Wr(me, e, null, l, C)),
            O.push({ event: me, listeners: K }),
            ce ? (me.data = ce) : ((ce = au(l)), ce !== null && (me.data = ce)))),
          (ce = Lh ? Gh(e, l) : Yh(e, l)) &&
            ((me = tc(A, 'onBeforeInput')),
            0 < me.length &&
              ((K = new Wr('onBeforeInput', 'beforeinput', null, l, C)),
              O.push({ event: K, listeners: me }),
              (K.data = ce))),
          H1(O, e, A, l, C));
      }
      Yf(O, t);
    });
  }
  function Rn(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function tc(e, t) {
    for (var l = t + 'Capture', a = []; e !== null; ) {
      var n = e,
        s = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          s === null ||
          ((n = ln(e, l)),
          n != null && a.unshift(Rn(e, n, s)),
          (n = ln(e, t)),
          n != null && a.push(Rn(e, n, s))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function B1(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Vf(e, t, l, a, n) {
    for (var s = t._reactName, r = []; l !== null && l !== a; ) {
      var f = l,
        x = f.alternate,
        A = f.stateNode;
      if (((f = f.tag), x !== null && x === a)) break;
      ((f !== 5 && f !== 26 && f !== 27) ||
        A === null ||
        ((x = A),
        n
          ? ((A = ln(l, s)), A != null && r.unshift(Rn(l, A, x)))
          : n || ((A = ln(l, s)), A != null && r.push(Rn(l, A, x)))),
        (l = l.return));
    }
    r.length !== 0 && e.push({ event: t, listeners: r });
  }
  var U1 = /\r\n?/g,
    q1 = /\u0000|\uFFFD/g;
  function Xf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        U1,
        `
`
      )
      .replace(q1, '');
  }
  function Zf(e, t) {
    return ((t = Xf(t)), Xf(e) === t);
  }
  function Te(e, t, l, a, n, s) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? t === 'body' || (t === 'textarea' && a === '') || ha(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && t !== 'body' && ha(e, '' + a);
        break;
      case 'className':
        ss(e, 'class', a);
        break;
      case 'tabIndex':
        ss(e, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        ss(e, l, a);
        break;
      case 'style':
        Xr(e, a, s);
        break;
      case 'data':
        if (t !== 'object') {
          ss(e, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (t !== 'a' || l !== 'href')) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((a = is('' + a)), e.setAttribute(l, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == 'function' &&
            (l === 'formAction'
              ? (t !== 'input' && Te(e, t, 'name', n.name, n, null),
                Te(e, t, 'formEncType', n.formEncType, n, null),
                Te(e, t, 'formMethod', n.formMethod, n, null),
                Te(e, t, 'formTarget', n.formTarget, n, null))
              : (Te(e, t, 'encType', n.encType, n, null),
                Te(e, t, 'method', n.method, n, null),
                Te(e, t, 'target', n.target, n, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((a = is('' + a)), e.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (e.onclick = Kt);
        break;
      case 'onScroll':
        a != null && de('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && de('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        e.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        e.muted = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (a == null || typeof a == 'function' || typeof a == 'boolean' || typeof a == 'symbol') {
          e.removeAttribute('xlink:href');
          break;
        }
        ((l = is('' + a)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        a != null && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '' + a)
          : e.removeAttribute(l);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        a && typeof a != 'function' && typeof a != 'symbol'
          ? e.setAttribute(l, '')
          : e.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? e.setAttribute(l, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? e.setAttribute(l, a)
            : e.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case 'popover':
        (de('beforetoggle', e), de('toggle', e), ns(e, 'popover', a));
        break;
      case 'xlinkActuate':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        Zt(e, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        Zt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        Zt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        Zt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        ns(e, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = mh.get(l) || l), ns(e, l, a));
    }
  }
  function Co(e, t, l, a, n, s) {
    switch (l) {
      case 'style':
        Xr(e, a, s);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? ha(e, a)
          : (typeof a == 'number' || typeof a == 'bigint') && ha(e, '' + a);
        break;
      case 'onScroll':
        a != null && de('scroll', e);
        break;
      case 'onScrollEnd':
        a != null && de('scrollend', e);
        break;
      case 'onClick':
        a != null && (e.onclick = Kt);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!Rr.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((n = l.endsWith('Capture')),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (s = e[st] || null),
              (s = s != null ? s[l] : null),
              typeof s == 'function' && e.removeEventListener(t, s, n),
              typeof a == 'function')
            ) {
              (typeof s != 'function' &&
                s !== null &&
                (l in e ? (e[l] = null) : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n));
              break e;
            }
            l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, '') : ns(e, l, a);
          }
    }
  }
  function tt(e, t, l) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (de('error', e), de('load', e));
        var a = !1,
          n = !1,
          s;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var r = l[s];
            if (r != null)
              switch (s) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  n = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, t));
                default:
                  Te(e, t, s, r, l, null);
              }
          }
        (n && Te(e, t, 'srcSet', l.srcSet, l, null), a && Te(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        de('invalid', e);
        var f = (s = r = n = null),
          x = null,
          A = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var C = l[a];
            if (C != null)
              switch (a) {
                case 'name':
                  n = C;
                  break;
                case 'type':
                  r = C;
                  break;
                case 'checked':
                  x = C;
                  break;
                case 'defaultChecked':
                  A = C;
                  break;
                case 'value':
                  s = C;
                  break;
                case 'defaultValue':
                  f = C;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (C != null) throw Error(o(137, t));
                  break;
                default:
                  Te(e, t, a, C, l, null);
              }
          }
        Gr(e, s, f, x, A, r, n, !1);
        return;
      case 'select':
        (de('invalid', e), (a = r = s = null));
        for (n in l)
          if (l.hasOwnProperty(n) && ((f = l[n]), f != null))
            switch (n) {
              case 'value':
                s = f;
                break;
              case 'defaultValue':
                r = f;
                break;
              case 'multiple':
                a = f;
              default:
                Te(e, t, n, f, l, null);
            }
        ((t = s),
          (l = r),
          (e.multiple = !!a),
          t != null ? ma(e, !!a, t, !1) : l != null && ma(e, !!a, l, !0));
        return;
      case 'textarea':
        (de('invalid', e), (s = n = a = null));
        for (r in l)
          if (l.hasOwnProperty(r) && ((f = l[r]), f != null))
            switch (r) {
              case 'value':
                a = f;
                break;
              case 'defaultValue':
                n = f;
                break;
              case 'children':
                s = f;
                break;
              case 'dangerouslySetInnerHTML':
                if (f != null) throw Error(o(91));
                break;
              default:
                Te(e, t, r, f, l, null);
            }
        Qr(e, a, n, s);
        return;
      case 'option':
        for (x in l)
          l.hasOwnProperty(x) &&
            ((a = l[x]), a != null) &&
            (x === 'selected'
              ? (e.selected = a && typeof a != 'function' && typeof a != 'symbol')
              : Te(e, t, x, a, l, null));
        return;
      case 'dialog':
        (de('beforetoggle', e), de('toggle', e), de('cancel', e), de('close', e));
        break;
      case 'iframe':
      case 'object':
        de('load', e);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Dn.length; a++) de(Dn[a], e);
        break;
      case 'image':
        (de('error', e), de('load', e));
        break;
      case 'details':
        de('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (de('error', e), de('load', e));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (A in l)
          if (l.hasOwnProperty(A) && ((a = l[A]), a != null))
            switch (A) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, t));
              default:
                Te(e, t, A, a, l, null);
            }
        return;
      default:
        if (Yc(t)) {
          for (C in l)
            l.hasOwnProperty(C) && ((a = l[C]), a !== void 0 && Co(e, t, C, a, l, void 0));
          return;
        }
    }
    for (f in l) l.hasOwnProperty(f) && ((a = l[f]), a != null && Te(e, t, f, a, l, null));
  }
  function L1(e, t, l, a) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var n = null,
          s = null,
          r = null,
          f = null,
          x = null,
          A = null,
          C = null;
        for (w in l) {
          var O = l[w];
          if (l.hasOwnProperty(w) && O != null)
            switch (w) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = O;
              default:
                a.hasOwnProperty(w) || Te(e, t, w, null, a, O);
            }
        }
        for (var T in a) {
          var w = a[T];
          if (((O = l[T]), a.hasOwnProperty(T) && (w != null || O != null)))
            switch (T) {
              case 'type':
                s = w;
                break;
              case 'name':
                n = w;
                break;
              case 'checked':
                A = w;
                break;
              case 'defaultChecked':
                C = w;
                break;
              case 'value':
                r = w;
                break;
              case 'defaultValue':
                f = w;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (w != null) throw Error(o(137, t));
                break;
              default:
                w !== O && Te(e, t, T, w, a, O);
            }
        }
        Lc(e, r, f, x, A, C, s, n);
        return;
      case 'select':
        w = r = f = T = null;
        for (s in l)
          if (((x = l[s]), l.hasOwnProperty(s) && x != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                w = x;
              default:
                a.hasOwnProperty(s) || Te(e, t, s, null, a, x);
            }
        for (n in a)
          if (((s = a[n]), (x = l[n]), a.hasOwnProperty(n) && (s != null || x != null)))
            switch (n) {
              case 'value':
                T = s;
                break;
              case 'defaultValue':
                f = s;
                break;
              case 'multiple':
                r = s;
              default:
                s !== x && Te(e, t, n, s, a, x);
            }
        ((t = f),
          (l = r),
          (a = w),
          T != null
            ? ma(e, !!l, T, !1)
            : !!a != !!l && (t != null ? ma(e, !!l, t, !0) : ma(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        w = T = null;
        for (f in l)
          if (((n = l[f]), l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f)))
            switch (f) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Te(e, t, f, null, a, n);
            }
        for (r in a)
          if (((n = a[r]), (s = l[r]), a.hasOwnProperty(r) && (n != null || s != null)))
            switch (r) {
              case 'value':
                T = n;
                break;
              case 'defaultValue':
                w = n;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== s && Te(e, t, r, n, a, s);
            }
        Yr(e, T, w);
        return;
      case 'option':
        for (var V in l)
          ((T = l[V]),
            l.hasOwnProperty(V) &&
              T != null &&
              !a.hasOwnProperty(V) &&
              (V === 'selected' ? (e.selected = !1) : Te(e, t, V, null, a, T)));
        for (x in a)
          ((T = a[x]),
            (w = l[x]),
            a.hasOwnProperty(x) &&
              T !== w &&
              (T != null || w != null) &&
              (x === 'selected'
                ? (e.selected = T && typeof T != 'function' && typeof T != 'symbol')
                : Te(e, t, x, T, a, w)));
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var te in l)
          ((T = l[te]),
            l.hasOwnProperty(te) && T != null && !a.hasOwnProperty(te) && Te(e, t, te, null, a, T));
        for (A in a)
          if (((T = a[A]), (w = l[A]), a.hasOwnProperty(A) && T !== w && (T != null || w != null)))
            switch (A) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (T != null) throw Error(o(137, t));
                break;
              default:
                Te(e, t, A, T, a, w);
            }
        return;
      default:
        if (Yc(t)) {
          for (var Ee in l)
            ((T = l[Ee]),
              l.hasOwnProperty(Ee) &&
                T !== void 0 &&
                !a.hasOwnProperty(Ee) &&
                Co(e, t, Ee, void 0, a, T));
          for (C in a)
            ((T = a[C]),
              (w = l[C]),
              !a.hasOwnProperty(C) ||
                T === w ||
                (T === void 0 && w === void 0) ||
                Co(e, t, C, T, a, w));
          return;
        }
    }
    for (var j in l)
      ((T = l[j]),
        l.hasOwnProperty(j) && T != null && !a.hasOwnProperty(j) && Te(e, t, j, null, a, T));
    for (O in a)
      ((T = a[O]),
        (w = l[O]),
        !a.hasOwnProperty(O) || T === w || (T == null && w == null) || Te(e, t, O, T, a, w));
  }
  function Kf(e) {
    switch (e) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function G1() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var n = l[a],
          s = n.transferSize,
          r = n.initiatorType,
          f = n.duration;
        if (s && f && Kf(r)) {
          for (r = 0, f = n.responseEnd, a += 1; a < l.length; a++) {
            var x = l[a],
              A = x.startTime;
            if (A > f) break;
            var C = x.transferSize,
              O = x.initiatorType;
            C && Kf(O) && ((x = x.responseEnd), (r += C * (x < f ? 1 : (f - A) / (x - A))));
          }
          if ((--a, (t += (8 * (s + r)) / (n.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var zo = null,
    Mo = null;
  function lc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Jf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function $f(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function Oo(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ho = null;
  function Y1() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Ho ? !1 : ((Ho = e), !0)) : ((Ho = null), !1);
  }
  var Ff = typeof setTimeout == 'function' ? setTimeout : void 0,
    Q1 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Wf = typeof Promise == 'function' ? Promise : void 0,
    V1 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Wf < 'u'
          ? function (e) {
              return Wf.resolve(null).then(e).catch(X1);
            }
          : Ff;
  function X1(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ol(e) {
    return e === 'head';
  }
  function Pf(e, t) {
    var l = t,
      a = 0;
    do {
      var n = l.nextSibling;
      if ((e.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (e.removeChild(n), Xa(t));
            return;
          }
          a--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
        else if (l === 'html') Bn(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), Bn(l));
          for (var s = l.firstChild; s; ) {
            var r = s.nextSibling,
              f = s.nodeName;
            (s[en] ||
              f === 'SCRIPT' ||
              f === 'STYLE' ||
              (f === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(s),
              (s = r));
          }
        } else l === 'body' && Bn(e.ownerDocument.body);
      l = n;
    } while (l);
    Xa(t);
  }
  function If(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? t
            ? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
            : ((l.style.display = l._stashedDisplay || ''),
              l.getAttribute('style') === '' && l.removeAttribute('style'))
          : l.nodeType === 3 &&
            (t
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
              : (l.nodeValue = l._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === '/$')) {
          if (e === 0) break;
          e--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || e++;
      l = a;
    } while (l);
  }
  function ko(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (ko(l), Uc(l));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(l);
    }
  }
  function Z1(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (a) {
        if (!e[en])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((s = e.getAttribute('rel')),
                s === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                s !== n.rel ||
                e.getAttribute('href') !== (n.href == null || n.href === '' ? null : n.href) ||
                e.getAttribute('crossorigin') !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute('title') !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((s = e.getAttribute('src')),
                (s !== (n.src == null ? null : n.src) ||
                  e.getAttribute('type') !== (n.type == null ? null : n.type) ||
                  e.getAttribute('crossorigin') !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  s &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var s = n.name == null ? null : '' + n.name;
        if (n.type === 'hidden' && e.getAttribute('name') === s) return e;
      } else return e;
      if (((e = Ht(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function K1(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Ht(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function em(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Ht(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Do(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Ro(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function J1(e, t) {
    var l = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || l.readyState !== 'loading') t();
    else {
      var a = function () {
        (t(), l.removeEventListener('DOMContentLoaded', a));
      };
      (l.addEventListener('DOMContentLoaded', a), (e._reactRetry = a));
    }
  }
  function Ht(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' ||
            t === '$!' ||
            t === '$?' ||
            t === '$~' ||
            t === '&' ||
            t === 'F!' ||
            t === 'F')
        )
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return e;
  }
  var Bo = null;
  function tm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return Ht(e.nextSibling);
          t--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function lm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
          if (t === 0) return e;
          t--;
        } else (l !== '/$' && l !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function am(e, t, l) {
    switch (((t = lc(l)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Bn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Uc(e);
  }
  var kt = new Map(),
    nm = new Set();
  function ac(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var rl = R.d;
  R.d = { f: $1, r: F1, D: W1, C: P1, L: I1, m: ep, X: lp, S: tp, M: ap };
  function $1() {
    var e = rl.f(),
      t = Js();
    return e || t;
  }
  function F1(e) {
    var t = ua(e);
    t !== null && t.tag === 5 && t.type === 'form' ? vd(t) : rl.r(e);
  }
  var Ya = typeof document > 'u' ? null : document;
  function sm(e, t, l) {
    var a = Ya;
    if (a && typeof t == 'string' && t) {
      var n = Et(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == 'string' && (n += '[crossorigin="' + l + '"]'),
        nm.has(n) ||
          (nm.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement('link')), tt(t, 'link', e), Je(t), a.head.appendChild(t))));
    }
  }
  function W1(e) {
    (rl.D(e), sm('dns-prefetch', e, null));
  }
  function P1(e, t) {
    (rl.C(e, t), sm('preconnect', e, t));
  }
  function I1(e, t, l) {
    rl.L(e, t, l);
    var a = Ya;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + Et(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + Et(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (n += '[imagesizes="' + Et(l.imageSizes) + '"]'))
        : (n += '[href="' + Et(e) + '"]');
      var s = n;
      switch (t) {
        case 'style':
          s = Qa(e);
          break;
        case 'script':
          s = Va(e);
      }
      kt.has(s) ||
        ((e = H(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        kt.set(s, e),
        a.querySelector(n) !== null ||
          (t === 'style' && a.querySelector(Un(s))) ||
          (t === 'script' && a.querySelector(qn(s))) ||
          ((t = a.createElement('link')), tt(t, 'link', e), Je(t), a.head.appendChild(t)));
    }
  }
  function ep(e, t) {
    rl.m(e, t);
    var l = Ya;
    if (l && e) {
      var a = t && typeof t.as == 'string' ? t.as : 'script',
        n = 'link[rel="modulepreload"][as="' + Et(a) + '"][href="' + Et(e) + '"]',
        s = n;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          s = Va(e);
      }
      if (
        !kt.has(s) &&
        ((e = H({ rel: 'modulepreload', href: e }, t)), kt.set(s, e), l.querySelector(n) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(qn(s))) return;
        }
        ((a = l.createElement('link')), tt(a, 'link', e), Je(a), l.head.appendChild(a));
      }
    }
  }
  function tp(e, t, l) {
    rl.S(e, t, l);
    var a = Ya;
    if (a && e) {
      var n = da(a).hoistableStyles,
        s = Qa(e);
      t = t || 'default';
      var r = n.get(s);
      if (!r) {
        var f = { loading: 0, preload: null };
        if ((r = a.querySelector(Un(s)))) f.loading = 5;
        else {
          ((e = H({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = kt.get(s)) && Uo(e, l));
          var x = (r = a.createElement('link'));
          (Je(x),
            tt(x, 'link', e),
            (x._p = new Promise(function (A, C) {
              ((x.onload = A), (x.onerror = C));
            })),
            x.addEventListener('load', function () {
              f.loading |= 1;
            }),
            x.addEventListener('error', function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            nc(r, t, a));
        }
        ((r = { type: 'stylesheet', instance: r, count: 1, state: f }), n.set(s, r));
      }
    }
  }
  function lp(e, t) {
    rl.X(e, t);
    var l = Ya;
    if (l && e) {
      var a = da(l).hoistableScripts,
        n = Va(e),
        s = a.get(n);
      s ||
        ((s = l.querySelector(qn(n))),
        s ||
          ((e = H({ src: e, async: !0 }, t)),
          (t = kt.get(n)) && qo(e, t),
          (s = l.createElement('script')),
          Je(s),
          tt(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        a.set(n, s));
    }
  }
  function ap(e, t) {
    rl.M(e, t);
    var l = Ya;
    if (l && e) {
      var a = da(l).hoistableScripts,
        n = Va(e),
        s = a.get(n);
      s ||
        ((s = l.querySelector(qn(n))),
        s ||
          ((e = H({ src: e, async: !0, type: 'module' }, t)),
          (t = kt.get(n)) && qo(e, t),
          (s = l.createElement('script')),
          Je(s),
          tt(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        a.set(n, s));
    }
  }
  function cm(e, t, l, a) {
    var n = (n = I.current) ? ac(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = Qa(l.href)),
            (l = da(n).hoistableStyles),
            (a = l.get(t)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), l.set(t, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          e = Qa(l.href);
          var s = da(n).hoistableStyles,
            r = s.get(e);
          if (
            (r ||
              ((n = n.ownerDocument || n),
              (r = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(e, r),
              (s = n.querySelector(Un(e))) && !s._p && ((r.instance = s), (r.state.loading = 5)),
              kt.has(e) ||
                ((l = {
                  rel: 'preload',
                  as: 'style',
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                kt.set(e, l),
                s || np(n, e, l, r.state))),
            t && a === null)
          )
            throw Error(o(528, ''));
          return r;
        }
        if (t && a !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = l.async),
          (l = l.src),
          typeof l == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Va(l)),
              (l = da(n).hoistableScripts),
              (a = l.get(t)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(t, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Qa(e) {
    return 'href="' + Et(e) + '"';
  }
  function Un(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function im(e) {
    return H({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function np(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (a.loading = 1)
      : ((t = e.createElement('link')),
        (a.preload = t),
        t.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        tt(t, 'link', l),
        Je(t),
        e.head.appendChild(t));
  }
  function Va(e) {
    return '[src="' + Et(e) + '"]';
  }
  function qn(e) {
    return 'script[async]' + e;
  }
  function om(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var a = e.querySelector('style[data-href~="' + Et(l.href) + '"]');
          if (a) return ((t.instance = a), Je(a), a);
          var n = H({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement('style')),
            Je(a),
            tt(a, 'style', n),
            nc(a, l.precedence, e),
            (t.instance = a)
          );
        case 'stylesheet':
          n = Qa(l.href);
          var s = e.querySelector(Un(n));
          if (s) return ((t.state.loading |= 4), (t.instance = s), Je(s), s);
          ((a = im(l)),
            (n = kt.get(n)) && Uo(a, n),
            (s = (e.ownerDocument || e).createElement('link')),
            Je(s));
          var r = s;
          return (
            (r._p = new Promise(function (f, x) {
              ((r.onload = f), (r.onerror = x));
            })),
            tt(s, 'link', a),
            (t.state.loading |= 4),
            nc(s, l.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = Va(l.src)),
            (n = e.querySelector(qn(s)))
              ? ((t.instance = n), Je(n), n)
              : ((a = l),
                (n = kt.get(s)) && ((a = H({}, l)), qo(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement('script')),
                Je(n),
                tt(n, 'link', a),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), nc(a, l.precedence, e));
    return t.instance;
  }
  function nc(e, t, l) {
    for (
      var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = a.length ? a[a.length - 1] : null,
        s = n,
        r = 0;
      r < a.length;
      r++
    ) {
      var f = a[r];
      if (f.dataset.precedence === t) s = f;
      else if (s !== n) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Uo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function qo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var sc = null;
  function rm(e, t, l) {
    if (sc === null) {
      var a = new Map(),
        n = (sc = new Map());
      n.set(l, a);
    } else ((n = sc), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var s = l[n];
      if (
        !(s[en] || s[We] || (e === 'link' && s.getAttribute('rel') === 'stylesheet')) &&
        s.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var r = s.getAttribute(t) || '';
        r = e + r;
        var f = a.get(r);
        f ? f.push(s) : a.set(r, [s]);
      }
    }
    return a;
  }
  function um(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function sp(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof t.precedence != 'string' || typeof t.href != 'string' || t.href === '') break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === 'stylesheet'
          ? ((e = t.disabled), typeof t.precedence == 'string' && e == null)
          : !0;
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function dm(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function cp(e, t, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var n = Qa(a.href),
          s = t.querySelector(Un(n));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = cc.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = s),
            Je(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (a = im(a)),
          (n = kt.get(n)) && Uo(a, n),
          (s = s.createElement('link')),
          Je(s));
        var r = s;
        ((r._p = new Promise(function (f, x) {
          ((r.onload = f), (r.onerror = x));
        })),
          tt(s, 'link', a),
          (l.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = cc.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var Lo = 0;
  function ip(e, t) {
    return (
      e.stylesheets && e.count === 0 && oc(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((e.stylesheets && oc(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Lo === 0 && (Lo = 62500 * G1());
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && oc(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > Lo ? 50 : 800) + t
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function cc() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) oc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var ic = null;
  function oc(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (ic = new Map()), t.forEach(op, e), (ic = null), cc.call(e)));
  }
  function op(e, t) {
    if (!(t.state.loading & 4)) {
      var l = ic.get(e);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), ic.set(e, l));
        for (
          var n = e.querySelectorAll('link[data-precedence],style[data-precedence]'), s = 0;
          s < n.length;
          s++
        ) {
          var r = n[s];
          (r.nodeName === 'LINK' || r.getAttribute('media') !== 'not all') &&
            (l.set(r.dataset.precedence, r), (a = r));
        }
        a && l.set(null, a);
      }
      ((n = t.instance),
        (r = n.getAttribute('data-precedence')),
        (s = l.get(r) || a),
        s === a && l.set(null, n),
        l.set(r, n),
        this.count++,
        (a = cc.bind(this)),
        n.addEventListener('load', a),
        n.addEventListener('error', a),
        s
          ? s.parentNode.insertBefore(n, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ln = {
    $$typeof: _e,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0,
  };
  function rp(e, t, l, a, n, s, r, f, x) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = kc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = kc(0)),
      (this.hiddenUpdates = kc(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = s),
      (this.onRecoverableError = r),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function fm(e, t, l, a, n, s, r, f, x, A, C, O) {
    return (
      (e = new rp(e, t, l, r, x, A, C, O, f)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = xt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = yi()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: a, isDehydrated: l, cache: t }),
      ji(s),
      e
    );
  }
  function mm(e) {
    return e ? ((e = Sa), e) : Sa;
  }
  function hm(e, t, l, a, n, s) {
    ((n = mm(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = Sl(t)),
      (a.payload = { element: l }),
      (s = s === void 0 ? null : s),
      s !== null && (a.callback = s),
      (l = jl(e, a, t)),
      l !== null && (dt(l, e, t), yn(l, e, t)));
  }
  function pm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Go(e, t) {
    (pm(e, t), (e = e.alternate) && pm(e, t));
  }
  function xm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xl(e, 67108864);
      (t !== null && dt(t, e, 67108864), Go(e, 67108864));
    }
  }
  function gm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = St();
      t = Dc(t);
      var l = Xl(e, t);
      (l !== null && dt(l, e, t), Go(e, t));
    }
  }
  var rc = !0;
  function up(e, t, l, a) {
    var n = _.T;
    _.T = null;
    var s = R.p;
    try {
      ((R.p = 2), Yo(e, t, l, a));
    } finally {
      ((R.p = s), (_.T = n));
    }
  }
  function dp(e, t, l, a) {
    var n = _.T;
    _.T = null;
    var s = R.p;
    try {
      ((R.p = 8), Yo(e, t, l, a));
    } finally {
      ((R.p = s), (_.T = n));
    }
  }
  function Yo(e, t, l, a) {
    if (rc) {
      var n = Qo(a);
      if (n === null) (_o(e, t, a, uc, l), bm(e, a));
      else if (mp(n, e, t, l, a)) a.stopPropagation();
      else if ((bm(e, a), t & 4 && -1 < fp.indexOf(e))) {
        for (; n !== null; ) {
          var s = ua(n);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var r = Ll(s.pendingLanes);
                  if (r !== 0) {
                    var f = s;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; r; ) {
                      var x = 1 << (31 - ht(r));
                      ((f.entanglements[1] |= x), (r &= ~x));
                    }
                    (Qt(s), (be & 6) === 0 && ((Zs = ft() + 500), kn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((f = Xl(s, 2)), f !== null && dt(f, s, 2), Js(), Go(s, 2));
            }
          if (((s = Qo(a)), s === null && _o(e, t, a, uc, l), s === n)) break;
          n = s;
        }
        n !== null && a.stopPropagation();
      } else _o(e, t, a, null, l);
    }
  }
  function Qo(e) {
    return ((e = Vc(e)), Vo(e));
  }
  var uc = null;
  function Vo(e) {
    if (((uc = null), (e = ra(e)), e !== null)) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = g(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = S(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((uc = e), null);
  }
  function ym(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (W0()) {
          case Tr:
            return 2;
          case Er:
            return 8;
          case In:
          case P0:
            return 32;
          case wr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Xo = !1,
    Hl = null,
    kl = null,
    Dl = null,
    Gn = new Map(),
    Yn = new Map(),
    Rl = [],
    fp =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function bm(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Hl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        kl = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Dl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Gn.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Yn.delete(t.pointerId);
    }
  }
  function Qn(e, t, l, a, n, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: s,
          targetContainers: [n],
        }),
        t !== null && ((t = ua(t)), t !== null && xm(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function mp(e, t, l, a, n) {
    switch (t) {
      case 'focusin':
        return ((Hl = Qn(Hl, e, t, l, a, n)), !0);
      case 'dragenter':
        return ((kl = Qn(kl, e, t, l, a, n)), !0);
      case 'mouseover':
        return ((Dl = Qn(Dl, e, t, l, a, n)), !0);
      case 'pointerover':
        var s = n.pointerId;
        return (Gn.set(s, Qn(Gn.get(s) || null, e, t, l, a, n)), !0);
      case 'gotpointercapture':
        return ((s = n.pointerId), Yn.set(s, Qn(Yn.get(s) || null, e, t, l, a, n)), !0);
    }
    return !1;
  }
  function vm(e) {
    var t = ra(e.target);
    if (t !== null) {
      var l = m(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = g(l)), t !== null)) {
            ((e.blockedOn = t),
              Hr(e.priority, function () {
                gm(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = S(l)), t !== null)) {
            ((e.blockedOn = t),
              Hr(e.priority, function () {
                gm(l);
              }));
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function dc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Qo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((Qc = a), l.target.dispatchEvent(a), (Qc = null));
      } else return ((t = ua(l)), t !== null && xm(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Sm(e, t, l) {
    dc(e) && l.delete(t);
  }
  function hp() {
    ((Xo = !1),
      Hl !== null && dc(Hl) && (Hl = null),
      kl !== null && dc(kl) && (kl = null),
      Dl !== null && dc(Dl) && (Dl = null),
      Gn.forEach(Sm),
      Yn.forEach(Sm));
  }
  function fc(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Xo || ((Xo = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, hp)));
  }
  var mc = null;
  function jm(e) {
    mc !== e &&
      ((mc = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        mc === e && (mc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2];
          if (typeof a != 'function') {
            if (Vo(a || l) === null) continue;
            break;
          }
          var s = ua(l);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Yi(s, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function Xa(e) {
    function t(x) {
      return fc(x, e);
    }
    (Hl !== null && fc(Hl, e),
      kl !== null && fc(kl, e),
      Dl !== null && fc(Dl, e),
      Gn.forEach(t),
      Yn.forEach(t));
    for (var l = 0; l < Rl.length; l++) {
      var a = Rl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Rl.length && ((l = Rl[0]), l.blockedOn === null); )
      (vm(l), l.blockedOn === null && Rl.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          s = l[a + 1],
          r = n[st] || null;
        if (typeof s == 'function') r || jm(l);
        else if (r) {
          var f = null;
          if (s && s.hasAttribute('formAction')) {
            if (((n = s), (r = s[st] || null))) f = r.formAction;
            else if (Vo(n) !== null) continue;
          } else f = r.action;
          (typeof f == 'function' ? (l[a + 1] = f) : (l.splice(a, 3), (a -= 3)), jm(l));
        }
      }
  }
  function Nm() {
    function e(s) {
      s.canIntercept &&
        s.info === 'react-transition' &&
        s.intercept({
          handler: function () {
            return new Promise(function (r) {
              return (n = r);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (n !== null && (n(), (n = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        n = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function Zo(e) {
    this._internalRoot = e;
  }
  ((hc.prototype.render = Zo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var l = t.current,
        a = St();
      hm(l, a, e, t, null, null);
    }),
    (hc.prototype.unmount = Zo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (hm(e.current, 2, null, e, null, null), Js(), (t[oa] = null));
        }
      }));
  function hc(e) {
    this._internalRoot = e;
  }
  hc.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Or();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Rl.length && t !== 0 && t < Rl[l].priority; l++);
      (Rl.splice(l, 0, e), l === 0 && vm(e));
    }
  };
  var Am = d.version;
  if (Am !== '19.2.7') throw Error(o(527, Am, '19.2.7'));
  R.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = h(t)), (e = e !== null ? E(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var pp = {
    bundleType: 0,
    version: '19.2.7',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: _,
    reconcilerVersion: '19.2.7',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var pc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pc.isDisabled && pc.supportsFiber)
      try {
        ((Wa = pc.inject(pp)), (mt = pc));
      } catch {}
  }
  return (
    (Xn.createRoot = function (e, t) {
      if (!p(e)) throw Error(o(299));
      var l = !1,
        a = '',
        n = zd,
        s = Md,
        r = Od;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (r = t.onRecoverableError)),
        (t = fm(e, 1, !1, null, null, l, a, null, n, s, r, Nm)),
        (e[oa] = t.current),
        wo(e),
        new Zo(t)
      );
    }),
    (Xn.hydrateRoot = function (e, t, l) {
      if (!p(e)) throw Error(o(299));
      var a = !1,
        n = '',
        s = zd,
        r = Md,
        f = Od,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (s = l.onUncaughtError),
          l.onCaughtError !== void 0 && (r = l.onCaughtError),
          l.onRecoverableError !== void 0 && (f = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = fm(e, 1, !0, t, l ?? null, a, n, x, s, r, f, Nm)),
        (t.context = mm(null)),
        (l = t.current),
        (a = St()),
        (a = Dc(a)),
        (n = Sl(a)),
        (n.callback = null),
        jl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        Ia(t, l),
        Qt(t),
        (e[oa] = t.current),
        wo(e),
        new hc(t)
      );
    }),
    (Xn.version = '19.2.7'),
    Xn
  );
}
var km;
function wp() {
  if (km) return $o.exports;
  km = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (d) {
        console.error(d);
      }
  }
  return (c(), ($o.exports = Ep()), $o.exports);
}
var _p = wp(),
  Io,
  Dm;
function Cp() {
  if (Dm) return Io;
  Dm = 1;
  var c = typeof Element < 'u',
    d = typeof Map == 'function',
    u = typeof Set == 'function',
    o = typeof ArrayBuffer == 'function' && !!ArrayBuffer.isView;
  function p(m, g) {
    if (m === g) return !0;
    if (m && g && typeof m == 'object' && typeof g == 'object') {
      if (m.constructor !== g.constructor) return !1;
      var S, y, h;
      if (Array.isArray(m)) {
        if (((S = m.length), S != g.length)) return !1;
        for (y = S; y-- !== 0; ) if (!p(m[y], g[y])) return !1;
        return !0;
      }
      var E;
      if (d && m instanceof Map && g instanceof Map) {
        if (m.size !== g.size) return !1;
        for (E = m.entries(); !(y = E.next()).done; ) if (!g.has(y.value[0])) return !1;
        for (E = m.entries(); !(y = E.next()).done; )
          if (!p(y.value[1], g.get(y.value[0]))) return !1;
        return !0;
      }
      if (u && m instanceof Set && g instanceof Set) {
        if (m.size !== g.size) return !1;
        for (E = m.entries(); !(y = E.next()).done; ) if (!g.has(y.value[0])) return !1;
        return !0;
      }
      if (o && ArrayBuffer.isView(m) && ArrayBuffer.isView(g)) {
        if (((S = m.length), S != g.length)) return !1;
        for (y = S; y-- !== 0; ) if (m[y] !== g[y]) return !1;
        return !0;
      }
      if (m.constructor === RegExp) return m.source === g.source && m.flags === g.flags;
      if (
        m.valueOf !== Object.prototype.valueOf &&
        typeof m.valueOf == 'function' &&
        typeof g.valueOf == 'function'
      )
        return m.valueOf() === g.valueOf();
      if (
        m.toString !== Object.prototype.toString &&
        typeof m.toString == 'function' &&
        typeof g.toString == 'function'
      )
        return m.toString() === g.toString();
      if (((h = Object.keys(m)), (S = h.length), S !== Object.keys(g).length)) return !1;
      for (y = S; y-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(g, h[y])) return !1;
      if (c && m instanceof Element) return !1;
      for (y = S; y-- !== 0; )
        if (
          !((h[y] === '_owner' || h[y] === '__v' || h[y] === '__o') && m.$$typeof) &&
          !p(m[h[y]], g[h[y]])
        )
          return !1;
      return !0;
    }
    return m !== m && g !== g;
  }
  return (
    (Io = function (g, S) {
      try {
        return p(g, S);
      } catch (y) {
        if ((y.message || '').match(/stack|recursion/i))
          return (console.warn('react-fast-compare cannot handle circular refs'), !1);
        throw y;
      }
    }),
    Io
  );
}
var zp = Cp();
const Mp = Ec(zp);
var er, Rm;
function Op() {
  if (Rm) return er;
  Rm = 1;
  var c = function (d, u, o, p, m, g, S, y) {
    if (!d) {
      var h;
      if (u === void 0)
        h = new Error(
          'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
        );
      else {
        var E = [o, p, m, g, S, y],
          H = 0;
        ((h = new Error(
          u.replace(/%s/g, function () {
            return E[H++];
          })
        )),
          (h.name = 'Invariant Violation'));
      }
      throw ((h.framesToPop = 1), h);
    }
  };
  return ((er = c), er);
}
var Hp = Op();
const Bm = Ec(Hp);
var tr, Um;
function kp() {
  return (
    Um ||
      ((Um = 1),
      (tr = function (d, u, o, p) {
        var m = o ? o.call(p, d, u) : void 0;
        if (m !== void 0) return !!m;
        if (d === u) return !0;
        if (typeof d != 'object' || !d || typeof u != 'object' || !u) return !1;
        var g = Object.keys(d),
          S = Object.keys(u);
        if (g.length !== S.length) return !1;
        for (var y = Object.prototype.hasOwnProperty.bind(u), h = 0; h < g.length; h++) {
          var E = g[h];
          if (!y(E)) return !1;
          var H = d[E],
            U = u[E];
          if (((m = o ? o.call(p, H, U, E) : void 0), m === !1 || (m === void 0 && H !== U)))
            return !1;
        }
        return !0;
      })),
    tr
  );
}
var Dp = kp();
const Rp = Ec(Dp);
var m0 = ((c) => (
    (c.BASE = 'base'),
    (c.BODY = 'body'),
    (c.HEAD = 'head'),
    (c.HTML = 'html'),
    (c.LINK = 'link'),
    (c.META = 'meta'),
    (c.NOSCRIPT = 'noscript'),
    (c.SCRIPT = 'script'),
    (c.STYLE = 'style'),
    (c.TITLE = 'title'),
    (c.FRAGMENT = 'Symbol(react.fragment)'),
    c
  ))(m0 || {}),
  lr = {
    link: { rel: ['amphtml', 'canonical', 'alternate'] },
    script: { type: ['application/ld+json'] },
    meta: {
      charset: '',
      name: ['generator', 'robots', 'description'],
      property: [
        'og:type',
        'og:title',
        'og:url',
        'og:image',
        'og:image:alt',
        'og:description',
        'twitter:url',
        'twitter:title',
        'twitter:description',
        'twitter:image',
        'twitter:image:alt',
        'twitter:card',
        'twitter:site',
      ],
    },
  },
  qm = Object.values(m0),
  wc = {
    accesskey: 'accessKey',
    charset: 'charSet',
    class: 'className',
    contenteditable: 'contentEditable',
    contextmenu: 'contextMenu',
    'http-equiv': 'httpEquiv',
    itemprop: 'itemProp',
    tabindex: 'tabIndex',
  },
  h0 = Object.entries(wc).reduce((c, [d, u]) => ((c[u] = d), c), {}),
  qt = 'data-rh',
  Ka = {
    DEFAULT_TITLE: 'defaultTitle',
    DEFER: 'defer',
    ENCODE_SPECIAL_CHARACTERS: 'encodeSpecialCharacters',
    ON_CHANGE_CLIENT_STATE: 'onChangeClientState',
    TITLE_TEMPLATE: 'titleTemplate',
    PRIORITIZE_SEO_TAGS: 'prioritizeSeoTags',
  },
  Ja = (c, d) => {
    for (let u = c.length - 1; u >= 0; u -= 1) {
      const o = c[u];
      if (Object.prototype.hasOwnProperty.call(o, d)) return o[d];
    }
    return null;
  },
  Bp = (c) => {
    let d = Ja(c, 'title');
    const u = Ja(c, Ka.TITLE_TEMPLATE);
    if ((Array.isArray(d) && (d = d.join('')), u && d)) return u.replace(/%s/g, () => d);
    const o = Ja(c, Ka.DEFAULT_TITLE);
    return d || o || void 0;
  },
  Up = (c) => Ja(c, Ka.ON_CHANGE_CLIENT_STATE) || (() => {}),
  ar = (c, d) =>
    d
      .filter((u) => typeof u[c] < 'u')
      .map((u) => u[c])
      .reduce((u, o) => ({ ...u, ...o }), {}),
  qp = (c, d) =>
    d
      .filter((u) => typeof u.base < 'u')
      .map((u) => u.base)
      .reverse()
      .reduce((u, o) => {
        if (!u.length) {
          const p = Object.keys(o);
          for (let m = 0; m < p.length; m += 1) {
            const S = p[m].toLowerCase();
            if (c.indexOf(S) !== -1 && o[S]) return u.concat(o);
          }
        }
        return u;
      }, []),
  Lp = (c) => console && typeof console.warn == 'function' && console.warn(c),
  Zn = (c, d, u) => {
    const o = {};
    return u
      .filter((p) =>
        Array.isArray(p[c])
          ? !0
          : (typeof p[c] < 'u' &&
              Lp(`Helmet: ${c} should be of type "Array". Instead found type "${typeof p[c]}"`),
            !1)
      )
      .map((p) => p[c])
      .reverse()
      .reduce((p, m) => {
        const g = {};
        m.filter((y) => {
          let h;
          const E = Object.keys(y);
          for (let U = 0; U < E.length; U += 1) {
            const F = E[U],
              le = F.toLowerCase();
            (d.indexOf(le) !== -1 &&
              !(h === 'rel' && y[h].toLowerCase() === 'canonical') &&
              !(le === 'rel' && y[le].toLowerCase() === 'stylesheet') &&
              (h = le),
              d.indexOf(F) !== -1 &&
                (F === 'innerHTML' || F === 'cssText' || F === 'itemprop') &&
                (h = F));
          }
          if (!h || !y[h]) return !1;
          const H = y[h].toLowerCase();
          return (o[h] || (o[h] = {}), g[h] || (g[h] = {}), o[h][H] ? !1 : ((g[h][H] = !0), !0));
        })
          .reverse()
          .forEach((y) => p.push(y));
        const S = Object.keys(g);
        for (let y = 0; y < S.length; y += 1) {
          const h = S[y],
            E = { ...o[h], ...g[h] };
          o[h] = E;
        }
        return p;
      }, [])
      .reverse();
  },
  Gp = (c, d) => {
    if (Array.isArray(c) && c.length) {
      for (let u = 0; u < c.length; u += 1) if (c[u][d]) return !0;
    }
    return !1;
  },
  Yp = (c) => ({
    baseTag: qp(['href'], c),
    bodyAttributes: ar('bodyAttributes', c),
    defer: Ja(c, Ka.DEFER),
    encode: Ja(c, Ka.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: ar('htmlAttributes', c),
    linkTags: Zn('link', ['rel', 'href'], c),
    metaTags: Zn('meta', ['name', 'charset', 'http-equiv', 'property', 'itemprop'], c),
    noscriptTags: Zn('noscript', ['innerHTML'], c),
    onChangeClientState: Up(c),
    scriptTags: Zn('script', ['src', 'innerHTML'], c),
    styleTags: Zn('style', ['cssText'], c),
    title: Bp(c),
    titleAttributes: ar('titleAttributes', c),
    prioritizeSeoTags: Gp(c, Ka.PRIORITIZE_SEO_TAGS),
  }),
  p0 = (c) => (Array.isArray(c) ? c.join('') : c),
  Qp = (c, d) => {
    const u = Object.keys(c);
    for (let o = 0; o < u.length; o += 1) if (d[u[o]] && d[u[o]].includes(c[u[o]])) return !0;
    return !1;
  },
  nr = (c, d) =>
    Array.isArray(c)
      ? c.reduce((u, o) => (Qp(o, d) ? u.priority.push(o) : u.default.push(o), u), {
          priority: [],
          default: [],
        })
      : { default: c, priority: [] },
  Lm = (c, d) => ({ ...c, [d]: void 0 }),
  Vp = ['noscript', 'script', 'style'],
  or = (c, d = !0) =>
    d === !1
      ? String(c)
      : String(c)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;'),
  x0 = (c) =>
    Object.keys(c).reduce((d, u) => {
      const o = typeof c[u] < 'u' ? `${u}="${c[u]}"` : `${u}`;
      return d ? `${d} ${o}` : o;
    }, ''),
  Xp = (c, d, u, o) => {
    const p = x0(u),
      m = p0(d);
    return p
      ? `<${c} ${qt}="true" ${p}>${or(m, o)}</${c}>`
      : `<${c} ${qt}="true">${or(m, o)}</${c}>`;
  },
  Zp = (c, d, u = !0) =>
    d.reduce((o, p) => {
      const m = p,
        g = Object.keys(m)
          .filter((h) => !(h === 'innerHTML' || h === 'cssText'))
          .reduce((h, E) => {
            const H = typeof m[E] > 'u' ? E : `${E}="${or(m[E], u)}"`;
            return h ? `${h} ${H}` : H;
          }, ''),
        S = m.innerHTML || m.cssText || '',
        y = Vp.indexOf(c) === -1;
      return `${o}<${c} ${qt}="true" ${g}${y ? '/>' : `>${S}</${c}>`}`;
    }, ''),
  g0 = (c, d = {}) =>
    Object.keys(c).reduce((u, o) => {
      const p = wc[o];
      return ((u[p || o] = c[o]), u);
    }, d),
  Kp = (c, d, u) => {
    const o = { key: d, [qt]: !0 },
      p = g0(u, o);
    return [Be.createElement('title', p, d)];
  },
  vc = (c, d) =>
    d.map((u, o) => {
      const p = { key: o, [qt]: !0 };
      return (
        Object.keys(u).forEach((m) => {
          const S = wc[m] || m;
          if (S === 'innerHTML' || S === 'cssText') {
            const y = u.innerHTML || u.cssText;
            p.dangerouslySetInnerHTML = { __html: y };
          } else p[S] = u[m];
        }),
        Be.createElement(c, p)
      );
    }),
  Dt = (c, d, u = !0) => {
    switch (c) {
      case 'title':
        return {
          toComponent: () => Kp(c, d.title, d.titleAttributes),
          toString: () => Xp(c, d.title, d.titleAttributes, u),
        };
      case 'bodyAttributes':
      case 'htmlAttributes':
        return { toComponent: () => g0(d), toString: () => x0(d) };
      default:
        return { toComponent: () => vc(c, d), toString: () => Zp(c, d, u) };
    }
  },
  Jp = ({ metaTags: c, linkTags: d, scriptTags: u, encode: o }) => {
    const p = nr(c, lr.meta),
      m = nr(d, lr.link),
      g = nr(u, lr.script);
    return {
      priorityMethods: {
        toComponent: () => [
          ...vc('meta', p.priority),
          ...vc('link', m.priority),
          ...vc('script', g.priority),
        ],
        toString: () =>
          `${Dt('meta', p.priority, o)} ${Dt('link', m.priority, o)} ${Dt('script', g.priority, o)}`,
      },
      metaTags: p.default,
      linkTags: m.default,
      scriptTags: g.default,
    };
  },
  $p = (c) => {
    const {
      baseTag: d,
      bodyAttributes: u,
      encode: o = !0,
      htmlAttributes: p,
      noscriptTags: m,
      styleTags: g,
      title: S = '',
      titleAttributes: y,
      prioritizeSeoTags: h,
    } = c;
    let { linkTags: E, metaTags: H, scriptTags: U } = c,
      F = { toComponent: () => [], toString: () => '' };
    return (
      h && ({ priorityMethods: F, linkTags: E, metaTags: H, scriptTags: U } = Jp(c)),
      {
        priority: F,
        base: Dt('base', d, o),
        bodyAttributes: Dt('bodyAttributes', u, o),
        htmlAttributes: Dt('htmlAttributes', p, o),
        link: Dt('link', E, o),
        meta: Dt('meta', H, o),
        noscript: Dt('noscript', m, o),
        script: Dt('script', U, o),
        style: Dt('style', g, o),
        title: Dt('title', { title: S, titleAttributes: y }, o),
      }
    );
  },
  rr = $p,
  xc = [],
  gr = !!(typeof window < 'u' && window.document && window.document.createElement),
  ur = class {
    instances = [];
    canUseDOM = gr;
    context;
    value = {
      setHelmet: (c) => {
        this.context.helmet = c;
      },
      helmetInstances: {
        get: () => (this.canUseDOM ? xc : this.instances),
        add: (c) => {
          (this.canUseDOM ? xc : this.instances).push(c);
        },
        remove: (c) => {
          const d = (this.canUseDOM ? xc : this.instances).indexOf(c);
          (this.canUseDOM ? xc : this.instances).splice(d, 1);
        },
      },
    };
    constructor(c, d) {
      ((this.context = c),
        (this.canUseDOM = d || !1),
        d ||
          (c.helmet = rr({
            baseTag: [],
            bodyAttributes: {},
            htmlAttributes: {},
            linkTags: [],
            metaTags: [],
            noscriptTags: [],
            scriptTags: [],
            styleTags: [],
            title: '',
            titleAttributes: {},
          })));
    }
  },
  Fp = parseInt(Be.version.split('.')[0], 10),
  dr = Fp >= 19,
  Wp = {},
  y0 = Be.createContext(Wp),
  b0 = class v0 extends L.Component {
    static canUseDOM = gr;
    helmetData;
    constructor(d) {
      (super(d),
        dr
          ? (this.helmetData = null)
          : (this.helmetData = new ur(this.props.context || {}, v0.canUseDOM)));
    }
    render() {
      return dr
        ? Be.createElement(Be.Fragment, null, this.props.children)
        : Be.createElement(y0.Provider, { value: this.helmetData.value }, this.props.children);
    }
  },
  Za = (c, d) => {
    const u = document.head || document.querySelector('head'),
      o = u.querySelectorAll(`${c}[${qt}]`),
      p = [].slice.call(o),
      m = [];
    let g;
    return (
      d &&
        d.length &&
        d.forEach((S) => {
          const y = document.createElement(c);
          for (const h in S)
            if (Object.prototype.hasOwnProperty.call(S, h))
              if (h === 'innerHTML') y.innerHTML = S.innerHTML;
              else if (h === 'cssText') {
                const E = S.cssText;
                y.appendChild(document.createTextNode(E));
              } else {
                const E = h,
                  H = typeof S[E] > 'u' ? '' : S[E];
                y.setAttribute(h, H);
              }
          (y.setAttribute(qt, 'true'),
            p.some((h, E) => ((g = E), y.isEqualNode(h))) ? p.splice(g, 1) : m.push(y));
        }),
      p.forEach((S) => S.parentNode?.removeChild(S)),
      m.forEach((S) => u.appendChild(S)),
      { oldTags: p, newTags: m }
    );
  },
  fr = (c, d) => {
    const u = document.getElementsByTagName(c)[0];
    if (!u) return;
    const o = u.getAttribute(qt),
      p = o ? o.split(',') : [],
      m = [...p],
      g = Object.keys(d);
    for (const S of g) {
      const y = d[S] || '';
      (u.getAttribute(S) !== y && u.setAttribute(S, y), p.indexOf(S) === -1 && p.push(S));
      const h = m.indexOf(S);
      h !== -1 && m.splice(h, 1);
    }
    for (let S = m.length - 1; S >= 0; S -= 1) u.removeAttribute(m[S]);
    p.length === m.length
      ? u.removeAttribute(qt)
      : u.getAttribute(qt) !== g.join(',') && u.setAttribute(qt, g.join(','));
  },
  Pp = (c, d) => {
    (typeof c < 'u' && document.title !== c && (document.title = p0(c)), fr('title', d));
  },
  Gm = (c, d) => {
    const {
      baseTag: u,
      bodyAttributes: o,
      htmlAttributes: p,
      linkTags: m,
      metaTags: g,
      noscriptTags: S,
      onChangeClientState: y,
      scriptTags: h,
      styleTags: E,
      title: H,
      titleAttributes: U,
    } = c;
    (fr('body', o), fr('html', p), Pp(H, U));
    const F = {
        baseTag: Za('base', u),
        linkTags: Za('link', m),
        metaTags: Za('meta', g),
        noscriptTags: Za('noscript', S),
        scriptTags: Za('script', h),
        styleTags: Za('style', E),
      },
      le = {},
      Z = {};
    (Object.keys(F).forEach((re) => {
      const { newTags: ve, oldTags: se } = F[re];
      (ve.length && (le[re] = ve), se.length && (Z[re] = F[re].oldTags));
    }),
      d && d(),
      y(c, le, Z));
  },
  Kn = null,
  Ip = (c) => {
    (Kn && cancelAnimationFrame(Kn),
      c.defer
        ? (Kn = requestAnimationFrame(() => {
            Gm(c, () => {
              Kn = null;
            });
          }))
        : (Gm(c), (Kn = null)));
  },
  ex = Ip,
  Ym = class extends L.Component {
    rendered = !1;
    shouldComponentUpdate(c) {
      return !Rp(c, this.props);
    }
    componentDidUpdate() {
      this.emitChange();
    }
    componentWillUnmount() {
      const { helmetInstances: c } = this.props.context;
      (c.remove(this), this.emitChange());
    }
    emitChange() {
      const { helmetInstances: c, setHelmet: d } = this.props.context;
      let u = null;
      const o = Yp(
        c.get().map((p) => {
          const { context: m, ...g } = p.props;
          return g;
        })
      );
      (b0.canUseDOM ? ex(o) : rr && (u = rr(o)), d(u));
    }
    init() {
      if (this.rendered) return;
      this.rendered = !0;
      const { helmetInstances: c } = this.props.context;
      (c.add(this), this.emitChange());
    }
    render() {
      return (this.init(), null);
    }
  },
  Sc = [],
  Qm = (c) => {
    const d = {};
    for (const u of Object.keys(c)) d[h0[u] || u] = c[u];
    return d;
  },
  na = (c) => {
    const d = {};
    for (const u of Object.keys(c)) {
      const o = wc[u];
      d[o || u] = c[u];
    }
    return d;
  },
  Vm = (c, d) => {
    if (!gr) return;
    const u = document.getElementsByTagName(c)[0];
    if (!u) return;
    const o = 'data-rh-managed',
      p = u.getAttribute(o),
      m = p ? p.split(',') : [],
      g = Object.keys(d);
    for (const S of m) g.includes(S) || u.removeAttribute(S);
    for (const S of g) {
      const y = d[S];
      y == null || y === !1
        ? u.removeAttribute(S)
        : y === !0
          ? u.setAttribute(S, '')
          : u.setAttribute(S, String(y));
    }
    g.length > 0 ? u.setAttribute(o, g.join(',')) : u.removeAttribute(o);
  },
  sr = () => {
    const c = {},
      d = {};
    for (const u of Sc) {
      const { htmlAttributes: o, bodyAttributes: p } = u.props;
      (o && Object.assign(c, Qm(o)), p && Object.assign(d, Qm(p)));
    }
    (Vm('html', c), Vm('body', d));
  },
  tx = class extends L.Component {
    componentDidMount() {
      (Sc.push(this), sr());
    }
    componentDidUpdate() {
      sr();
    }
    componentWillUnmount() {
      const c = Sc.indexOf(this);
      (c !== -1 && Sc.splice(c, 1), sr());
    }
    resolveTitle() {
      const { title: c, titleTemplate: d, defaultTitle: u } = this.props;
      return c && d
        ? d.replace(/%s/g, () => (Array.isArray(c) ? c.join('') : c))
        : c || u || void 0;
    }
    renderTitle() {
      const c = this.resolveTitle();
      if (c === void 0) return null;
      const d = this.props.titleAttributes || {};
      return Be.createElement('title', na(d), c);
    }
    renderBase() {
      const { base: c } = this.props;
      return c ? Be.createElement('base', na(c)) : null;
    }
    renderMeta() {
      const { meta: c } = this.props;
      return !c || !Array.isArray(c)
        ? null
        : c.map((d, u) => Be.createElement('meta', { key: u, ...na(d) }));
    }
    renderLink() {
      const { link: c } = this.props;
      return !c || !Array.isArray(c)
        ? null
        : c.map((d, u) => Be.createElement('link', { key: u, ...na(d) }));
    }
    renderScript() {
      const { script: c } = this.props;
      return !c || !Array.isArray(c)
        ? null
        : c.map((d, u) => {
            const { innerHTML: o, ...p } = d,
              m = na(p);
            return (
              o && (m.dangerouslySetInnerHTML = { __html: o }),
              Be.createElement('script', { key: u, ...m })
            );
          });
    }
    renderStyle() {
      const { style: c } = this.props;
      return !c || !Array.isArray(c)
        ? null
        : c.map((d, u) => {
            const { cssText: o, ...p } = d,
              m = na(p);
            return (
              o && (m.dangerouslySetInnerHTML = { __html: o }),
              Be.createElement('style', { key: u, ...m })
            );
          });
    }
    renderNoscript() {
      const { noscript: c } = this.props;
      return !c || !Array.isArray(c)
        ? null
        : c.map((d, u) => {
            const { innerHTML: o, ...p } = d,
              m = na(p);
            return (
              o && (m.dangerouslySetInnerHTML = { __html: o }),
              Be.createElement('noscript', { key: u, ...m })
            );
          });
    }
    render() {
      return Be.createElement(
        Be.Fragment,
        null,
        this.renderTitle(),
        this.renderBase(),
        this.renderMeta(),
        this.renderLink(),
        this.renderScript(),
        this.renderStyle(),
        this.renderNoscript()
      );
    }
  },
  lx = class extends L.Component {
    static defaultProps = { defer: !0, encodeSpecialCharacters: !0, prioritizeSeoTags: !1 };
    shouldComponentUpdate(c) {
      return !Mp(Lm(this.props, 'helmetData'), Lm(c, 'helmetData'));
    }
    mapNestedChildrenToProps(c, d) {
      if (!d) return null;
      switch (c.type) {
        case 'script':
        case 'noscript':
          return { innerHTML: d };
        case 'style':
          return { cssText: d };
        default:
          throw new Error(
            `<${c.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
          );
      }
    }
    flattenArrayTypeChildren(c, d, u, o) {
      return {
        ...d,
        [c.type]: [...(d[c.type] || []), { ...u, ...this.mapNestedChildrenToProps(c, o) }],
      };
    }
    mapObjectTypeChildren(c, d, u, o) {
      switch (c.type) {
        case 'title':
          return { ...d, [c.type]: o, titleAttributes: { ...u } };
        case 'body':
          return { ...d, bodyAttributes: { ...u } };
        case 'html':
          return { ...d, htmlAttributes: { ...u } };
        default:
          return { ...d, [c.type]: { ...u } };
      }
    }
    mapArrayTypeChildrenToProps(c, d) {
      let u = { ...d };
      return (
        Object.keys(c).forEach((o) => {
          u = { ...u, [o]: c[o] };
        }),
        u
      );
    }
    warnOnInvalidChildren(c, d) {
      return (
        Bm(
          qm.some((u) => c.type === u),
          typeof c.type == 'function'
            ? 'You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.'
            : `Only elements types ${qm.join(', ')} are allowed. Helmet does not support rendering <${c.type}> elements. Refer to our API for more information.`
        ),
        Bm(
          !d || typeof d == 'string' || (Array.isArray(d) && !d.some((u) => typeof u != 'string')),
          `Helmet expects a string as a child of <${c.type}>. Did you forget to wrap your children in braces? ( <${c.type}>{\`\`}</${c.type}> ) Refer to our API for more information.`
        ),
        !0
      );
    }
    mapChildrenToProps(c, d) {
      let u = {};
      return (
        Be.Children.forEach(c, (o) => {
          if (!o || !o.props) return;
          const { children: p, ...m } = o.props,
            g = Object.keys(m).reduce((y, h) => ((y[h0[h] || h] = m[h]), y), {});
          let { type: S } = o;
          switch (
            (typeof S == 'symbol' ? (S = S.toString()) : this.warnOnInvalidChildren(o, p), S)
          ) {
            case 'Symbol(react.fragment)':
              d = this.mapChildrenToProps(p, d);
              break;
            case 'link':
            case 'meta':
            case 'noscript':
            case 'script':
            case 'style':
              u = this.flattenArrayTypeChildren(o, u, g, p);
              break;
            default:
              d = this.mapObjectTypeChildren(o, d, g, p);
              break;
          }
        }),
        this.mapArrayTypeChildrenToProps(u, d)
      );
    }
    render() {
      const { children: c, ...d } = this.props;
      let u = { ...d },
        { helmetData: o } = d;
      if ((c && (u = this.mapChildrenToProps(c, u)), o && !(o instanceof ur))) {
        const p = o;
        ((o = new ur(p.context, !0)), delete u.helmetData);
      }
      return dr
        ? Be.createElement(tx, { ...u })
        : o
          ? Be.createElement(Ym, { ...u, context: o.value })
          : Be.createElement(y0.Consumer, null, (p) => Be.createElement(Ym, { ...u, context: p }));
    }
  };
const ax = (c) => c.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  nx = (c) =>
    c.replace(/^([A-Z])|[\s-_]+(\w)/g, (d, u, o) => (o ? o.toUpperCase() : u.toLowerCase())),
  Xm = (c) => {
    const d = nx(c);
    return d.charAt(0).toUpperCase() + d.slice(1);
  },
  S0 = (...c) =>
    c
      .filter((d, u, o) => !!d && d.trim() !== '' && o.indexOf(d) === u)
      .join(' ')
      .trim(),
  sx = (c) => {
    for (const d in c) if (d.startsWith('aria-') || d === 'role' || d === 'title') return !0;
  };
var cx = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const ix = L.forwardRef(
  (
    {
      color: c = 'currentColor',
      size: d = 24,
      strokeWidth: u = 2,
      absoluteStrokeWidth: o,
      className: p = '',
      children: m,
      iconNode: g,
      ...S
    },
    y
  ) =>
    L.createElement(
      'svg',
      {
        ref: y,
        ...cx,
        width: d,
        height: d,
        stroke: c,
        strokeWidth: o ? (Number(u) * 24) / Number(d) : u,
        className: S0('lucide', p),
        ...(!m && !sx(S) && { 'aria-hidden': 'true' }),
        ...S,
      },
      [...g.map(([h, E]) => L.createElement(h, E)), ...(Array.isArray(m) ? m : [m])]
    )
);
const P = (c, d) => {
  const u = L.forwardRef(({ className: o, ...p }, m) =>
    L.createElement(ix, {
      ref: m,
      iconNode: d,
      className: S0(`lucide-${ax(Xm(c))}`, `lucide-${c}`, o),
      ...p,
    })
  );
  return ((u.displayName = Xm(c)), u);
};
const ox = [
    ['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
    ['path', { d: 'M19 12H5', key: 'x3x0zl' }],
  ],
  rx = P('arrow-left', ox);
const ux = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
  ],
  Fn = P('arrow-right', ux);
const dx = [
    ['path', { d: 'm21 16-4 4-4-4', key: 'f6ql7i' }],
    ['path', { d: 'M17 20V4', key: '1ejh1v' }],
    ['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
    ['path', { d: 'M7 4v16', key: '1glfcx' }],
  ],
  fx = P('arrow-up-down', dx);
const mx = [
    [
      'path',
      {
        d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
        key: '3c2336',
      },
    ],
    ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
  ],
  hx = P('badge-check', mx);
const px = [
    ['path', { d: 'M10.268 21a2 2 0 0 0 3.464 0', key: 'vwvbt9' }],
    [
      'path',
      {
        d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
        key: '11g9vi',
      },
    ],
  ],
  xx = P('bell', px);
const gx = [
    ['path', { d: 'M12 7v14', key: '1akyts' }],
    [
      'path',
      {
        d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
        key: 'ruj8y',
      },
    ],
  ],
  j0 = P('book-open', gx);
const yx = [
    ['path', { d: 'M8 2v4', key: '1cmpym' }],
    ['path', { d: 'M16 2v4', key: '4m81vk' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
    ['path', { d: 'M3 10h18', key: '8toen8' }],
  ],
  N0 = P('calendar', yx);
const bx = [
    [
      'path',
      {
        d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2',
        key: '5owen',
      },
    ],
    ['circle', { cx: '7', cy: '17', r: '2', key: 'u2ysq9' }],
    ['path', { d: 'M9 17h6', key: 'r8uit2' }],
    ['circle', { cx: '17', cy: '17', r: '2', key: 'axvx0g' }],
  ],
  vx = P('car', bx);
const Sx = [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]],
  yr = P('check', Sx);
const jx = [['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }]],
  Nx = P('chevron-left', jx);
const Ax = [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]],
  Tx = P('chevron-right', Ax);
const Ex = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
    ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
  ],
  Zm = P('circle-alert', Ex);
const wx = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', key: '1u773s' }],
    ['path', { d: 'M12 17h.01', key: 'p32p05' }],
  ],
  A0 = P('circle-question-mark', wx);
const _x = [
    ['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ],
  jc = P('clock', _x);
const Cx = [
    ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2', key: '17jyea' }],
    ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2', key: 'zix9uf' }],
  ],
  zx = P('copy', Cx);
const Mx = [
    ['path', { d: 'M12 15V3', key: 'm9g1x1' }],
    ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
    ['path', { d: 'm7 10 5 5 5-5', key: 'brsn70' }],
  ],
  Ox = P('download', Mx);
const Hx = [
    [
      'path',
      {
        d: 'M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z',
        key: '9m4mmf',
      },
    ],
    ['path', { d: 'm2.5 21.5 1.4-1.4', key: '17g3f0' }],
    ['path', { d: 'm20.1 3.9 1.4-1.4', key: '1qn309' }],
    [
      'path',
      {
        d: 'M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z',
        key: '1t2c92',
      },
    ],
    ['path', { d: 'm9.6 14.4 4.8-4.8', key: '6umqxw' }],
  ],
  kx = P('dumbbell', Hx);
const Dx = [
    ['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
    ['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
    ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', key: 'a6xqqp' }],
  ],
  $n = P('external-link', Dx);
const Rx = [
    [
      'path',
      {
        d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
        key: '1nclc0',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
  ],
  T0 = P('eye', Rx);
const Bx = [
    [
      'path',
      {
        d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
        key: '1oefj6',
      },
    ],
    ['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5', key: 'wfsgrz' }],
    ['path', { d: 'M10 9H8', key: 'b1mrlr' }],
    ['path', { d: 'M16 13H8', key: 't4e002' }],
    ['path', { d: 'M16 17H8', key: 'z1uh3a' }],
  ],
  Km = P('file-text', Bx);
const Ux = [
    [
      'path',
      {
        d: 'M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z',
        key: '1dudjm',
      },
    ],
    [
      'path',
      {
        d: 'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z',
        key: 'l2t8xc',
      },
    ],
    ['path', { d: 'M16 17h4', key: '1dejxt' }],
    ['path', { d: 'M4 13h4', key: '1bwh8b' }],
  ],
  E0 = P('footprints', Ux);
const qx = [
    [
      'path',
      {
        d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
        key: 'sc7q7i',
      },
    ],
  ],
  Lx = P('funnel', qx);
const Gx = [
    ['rect', { x: '3', y: '8', width: '18', height: '4', rx: '1', key: 'bkv52' }],
    ['path', { d: 'M12 8v13', key: '1c76mn' }],
    ['path', { d: 'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7', key: '6wjy6b' }],
    [
      'path',
      {
        d: 'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5',
        key: '1ihvrl',
      },
    ],
  ],
  Yx = P('gift', Gx);
const Qx = [
    [
      'path',
      {
        d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
        key: 'mvr1a0',
      },
    ],
  ],
  $a = P('heart', Qx);
const Vx = [
    ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        key: 'r6nss1',
      },
    ],
  ],
  w0 = P('house', Vx);
const Xx = [
    [
      'path',
      {
        d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
        key: 'zw3jo',
      },
    ],
    [
      'path',
      {
        d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12',
        key: '1wduqc',
      },
    ],
    [
      'path',
      {
        d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17',
        key: 'kqbvx6',
      },
    ],
  ],
  Zx = P('layers', Xx);
const Kx = [
    ['rect', { width: '7', height: '7', x: '3', y: '3', rx: '1', key: '1g98yp' }],
    ['rect', { width: '7', height: '7', x: '14', y: '3', rx: '1', key: '6d4xhi' }],
    ['rect', { width: '7', height: '7', x: '14', y: '14', rx: '1', key: 'nxv5o0' }],
    ['rect', { width: '7', height: '7', x: '3', y: '14', rx: '1', key: '1bb6yr' }],
  ],
  Nc = P('layout-grid', Kx);
const Jx = [
    ['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', key: '132q7q' }],
    ['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'izxlao' }],
  ],
  $x = P('mail', Jx);
const Fx = [
    ['path', { d: 'M4 5h16', key: '1tepv9' }],
    ['path', { d: 'M4 12h16', key: '1lakjw' }],
    ['path', { d: 'M4 19h16', key: '1djgab' }],
  ],
  Wx = P('menu', Fx);
const Px = [
    ['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' }],
    ['line', { x1: '8', x2: '16', y1: '21', y2: '21', key: '1svkeh' }],
    ['line', { x1: '12', x2: '12', y1: '17', y2: '21', key: 'vw1qmm' }],
  ],
  br = P('monitor', Px);
const Ix = [
    [
      'path',
      {
        d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z',
        key: '1a0edw',
      },
    ],
    ['path', { d: 'M12 22V12', key: 'd0xqtd' }],
    ['polyline', { points: '3.29 7 12 12 20.71 7', key: 'ousv84' }],
    ['path', { d: 'm7.5 4.27 9 5.15', key: '1c824w' }],
  ],
  eg = P('package', Ix);
const tg = [
    ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
    ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
    ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
    ['path', { d: 'M8 16H3v5', key: '1cv678' }],
  ],
  lg = P('refresh-cw', tg);
const ag = [
    ['path', { d: 'm13.5 8.5-5 5', key: '1cs55j' }],
    ['path', { d: 'm8.5 8.5 5 5', key: 'a8mexj' }],
    ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
    ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
  ],
  ng = P('search-x', ag);
const sg = [
    ['path', { d: 'm21 21-4.34-4.34', key: '14j7rj' }],
    ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
  ],
  mr = P('search', sg);
const cg = [
    ['circle', { cx: '18', cy: '5', r: '3', key: 'gq8acd' }],
    ['circle', { cx: '6', cy: '12', r: '3', key: 'w7nqdw' }],
    ['circle', { cx: '18', cy: '19', r: '3', key: '1xt0gg' }],
    ['line', { x1: '8.59', x2: '15.42', y1: '13.51', y2: '17.49', key: '47mynk' }],
    ['line', { x1: '15.41', x2: '8.59', y1: '6.51', y2: '10.49', key: '1n3mei' }],
  ],
  ig = P('share-2', cg);
const og = [
    [
      'path',
      {
        d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
        key: 'oel41y',
      },
    ],
  ],
  rg = P('shield', og);
const ug = [
    [
      'path',
      {
        d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z',
        key: '1wgbhj',
      },
    ],
  ],
  _0 = P('shirt', ug);
const dg = [
    ['path', { d: 'M16 10a4 4 0 0 1-8 0', key: '1ltviw' }],
    ['path', { d: 'M3.103 6.034h17.794', key: 'awc11p' }],
    [
      'path',
      {
        d: 'M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z',
        key: 'o988cm',
      },
    ],
  ],
  fg = P('shopping-bag', dg);
const mg = [
    ['circle', { cx: '8', cy: '21', r: '1', key: 'jimo8o' }],
    ['circle', { cx: '19', cy: '21', r: '1', key: '13723u' }],
    [
      'path',
      {
        d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
        key: '9zh506',
      },
    ],
  ],
  _c = P('shopping-cart', mg);
const hg = [
    ['path', { d: 'M10 5H3', key: '1qgfaw' }],
    ['path', { d: 'M12 19H3', key: 'yhmn1j' }],
    ['path', { d: 'M14 3v4', key: '1sua03' }],
    ['path', { d: 'M16 17v4', key: '1q0r14' }],
    ['path', { d: 'M21 12h-9', key: '1o4lsq' }],
    ['path', { d: 'M21 19h-5', key: '1rlt1p' }],
    ['path', { d: 'M21 5h-7', key: '1oszz2' }],
    ['path', { d: 'M8 10v4', key: 'tgpxqk' }],
    ['path', { d: 'M8 12H3', key: 'a7s4jb' }],
  ],
  pg = P('sliders-horizontal', hg);
const xg = [
    [
      'path',
      {
        d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
        key: '1s2grr',
      },
    ],
    ['path', { d: 'M20 2v4', key: '1rf3ol' }],
    ['path', { d: 'M22 4h-4', key: 'gwowj6' }],
    ['circle', { cx: '4', cy: '20', r: '2', key: '6kqj1y' }],
  ],
  vr = P('sparkles', xg);
const gg = [
    [
      'path',
      {
        d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
        key: 'r04s7s',
      },
    ],
  ],
  C0 = P('star', gg);
const yg = [
    ['path', { d: 'M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5', key: 'slp6dd' }],
    [
      'path',
      {
        d: 'M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244',
        key: 'o0xfot',
      },
    ],
    ['path', { d: 'M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05', key: 'wn3emo' }],
  ],
  bg = P('store', yg);
const vg = [
    [
      'path',
      {
        d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
        key: 'vktsd0',
      },
    ],
    ['circle', { cx: '7.5', cy: '7.5', r: '.5', fill: 'currentColor', key: 'kqv944' }],
  ],
  Fa = P('tag', vg);
const Sg = [
    ['path', { d: 'M10 11v6', key: 'nco0om' }],
    ['path', { d: 'M14 11v6', key: 'outv1u' }],
    ['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', key: 'miytrc' }],
    ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
    ['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', key: 'e791ji' }],
  ],
  jg = P('trash-2', Sg);
const Ng = [
    ['path', { d: 'M16 17h6v-6', key: 't6n2it' }],
    ['path', { d: 'm22 17-8.5-8.5-5 5L2 7', key: 'x473p' }],
  ],
  Ag = P('trending-down', Ng);
const Tg = [
    ['path', { d: 'M16 7h6v6', key: 'box55l' }],
    ['path', { d: 'm22 7-8.5 8.5-5-5L2 17', key: '1t1m79' }],
  ],
  Eg = P('trending-up', Tg);
const wg = [
    [
      'path',
      {
        d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
        key: 'wmoenq',
      },
    ],
    ['path', { d: 'M12 9v4', key: 'juzpu7' }],
    ['path', { d: 'M12 17h.01', key: 'p32p05' }],
  ],
  _g = P('triangle-alert', wg);
const Cg = [
    ['path', { d: 'M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978', key: '1n3hpd' }],
    ['path', { d: 'M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978', key: 'rfe1zi' }],
    ['path', { d: 'M18 9h1.5a1 1 0 0 0 0-5H18', key: '7xy6bh' }],
    ['path', { d: 'M4 22h16', key: '57wxv0' }],
    ['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z', key: '1mhfuq' }],
    ['path', { d: 'M6 9H4.5a1 1 0 0 1 0-5H6', key: 'tex48p' }],
  ],
  zg = P('trophy', Cg);
const Mg = [
    ['path', { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', key: 'wrbu53' }],
    ['path', { d: 'M15 18H9', key: '1lyqi6' }],
    [
      'path',
      {
        d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
        key: 'lysw3i',
      },
    ],
    ['circle', { cx: '17', cy: '18', r: '2', key: '332jqn' }],
    ['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
  ],
  Og = P('truck', Mg);
const Hg = [
    ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
    ['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744', key: '16gr8j' }],
    ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
    ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ],
  Sr = P('users', Hg);
const kg = [
    ['path', { d: 'M12 20h.01', key: 'zekei9' }],
    ['path', { d: 'M8.5 16.429a5 5 0 0 1 7 0', key: '1bycff' }],
    ['path', { d: 'M5 12.859a10 10 0 0 1 5.17-2.69', key: '1dl1wf' }],
    ['path', { d: 'M19 12.859a10 10 0 0 0-2.007-1.523', key: '4k23kn' }],
    ['path', { d: 'M2 8.82a15 15 0 0 1 4.177-2.643', key: '1grhjp' }],
    ['path', { d: 'M22 8.82a15 15 0 0 0-11.288-3.764', key: 'z3jwby' }],
    ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
  ],
  Dg = P('wifi-off', kg);
const Rg = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  Ac = P('x', Rg);
const Bg = [
    [
      'path',
      {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
        key: '1xq2db',
      },
    ],
  ],
  Wn = P('zap', Bg);
function z0(c) {
  var d,
    u,
    o = '';
  if (typeof c == 'string' || typeof c == 'number') o += c;
  else if (typeof c == 'object')
    if (Array.isArray(c)) {
      var p = c.length;
      for (d = 0; d < p; d++) c[d] && (u = z0(c[d])) && (o && (o += ' '), (o += u));
    } else for (u in c) c[u] && (o && (o += ' '), (o += u));
  return o;
}
function M0() {
  for (var c, d, u = 0, o = '', p = arguments.length; u < p; u++)
    (c = arguments[u]) && (d = z0(c)) && (o && (o += ' '), (o += d));
  return o;
}
const Ug = (c, d) => {
    const u = new Array(c.length + d.length);
    for (let o = 0; o < c.length; o++) u[o] = c[o];
    for (let o = 0; o < d.length; o++) u[c.length + o] = d[o];
    return u;
  },
  qg = (c, d) => ({ classGroupId: c, validator: d }),
  O0 = (c = new Map(), d = null, u) => ({ nextPart: c, validators: d, classGroupId: u }),
  Tc = '-',
  Jm = [],
  Lg = 'arbitrary..',
  Gg = (c) => {
    const d = Qg(c),
      { conflictingClassGroups: u, conflictingClassGroupModifiers: o } = c;
    return {
      getClassGroupId: (g) => {
        if (g.startsWith('[') && g.endsWith(']')) return Yg(g);
        const S = g.split(Tc),
          y = S[0] === '' && S.length > 1 ? 1 : 0;
        return H0(S, y, d);
      },
      getConflictingClassGroupIds: (g, S) => {
        if (S) {
          const y = o[g],
            h = u[g];
          return y ? (h ? Ug(h, y) : y) : h || Jm;
        }
        return u[g] || Jm;
      },
    };
  },
  H0 = (c, d, u) => {
    if (c.length - d === 0) return u.classGroupId;
    const p = c[d],
      m = u.nextPart.get(p);
    if (m) {
      const h = H0(c, d + 1, m);
      if (h) return h;
    }
    const g = u.validators;
    if (g === null) return;
    const S = d === 0 ? c.join(Tc) : c.slice(d).join(Tc),
      y = g.length;
    for (let h = 0; h < y; h++) {
      const E = g[h];
      if (E.validator(S)) return E.classGroupId;
    }
  },
  Yg = (c) =>
    c.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const d = c.slice(1, -1),
            u = d.indexOf(':'),
            o = d.slice(0, u);
          return o ? Lg + o : void 0;
        })(),
  Qg = (c) => {
    const { theme: d, classGroups: u } = c;
    return Vg(u, d);
  },
  Vg = (c, d) => {
    const u = O0();
    for (const o in c) {
      const p = c[o];
      jr(p, u, o, d);
    }
    return u;
  },
  jr = (c, d, u, o) => {
    const p = c.length;
    for (let m = 0; m < p; m++) {
      const g = c[m];
      Xg(g, d, u, o);
    }
  },
  Xg = (c, d, u, o) => {
    if (typeof c == 'string') {
      Zg(c, d, u);
      return;
    }
    if (typeof c == 'function') {
      Kg(c, d, u, o);
      return;
    }
    Jg(c, d, u, o);
  },
  Zg = (c, d, u) => {
    const o = c === '' ? d : k0(d, c);
    o.classGroupId = u;
  },
  Kg = (c, d, u, o) => {
    if ($g(c)) {
      jr(c(o), d, u, o);
      return;
    }
    (d.validators === null && (d.validators = []), d.validators.push(qg(u, c)));
  },
  Jg = (c, d, u, o) => {
    const p = Object.entries(c),
      m = p.length;
    for (let g = 0; g < m; g++) {
      const [S, y] = p[g];
      jr(y, k0(d, S), u, o);
    }
  },
  k0 = (c, d) => {
    let u = c;
    const o = d.split(Tc),
      p = o.length;
    for (let m = 0; m < p; m++) {
      const g = o[m];
      let S = u.nextPart.get(g);
      (S || ((S = O0()), u.nextPart.set(g, S)), (u = S));
    }
    return u;
  },
  $g = (c) => 'isThemeGetter' in c && c.isThemeGetter === !0,
  Fg = (c) => {
    if (c < 1) return { get: () => {}, set: () => {} };
    let d = 0,
      u = Object.create(null),
      o = Object.create(null);
    const p = (m, g) => {
      ((u[m] = g), d++, d > c && ((d = 0), (o = u), (u = Object.create(null))));
    };
    return {
      get(m) {
        let g = u[m];
        if (g !== void 0) return g;
        if ((g = o[m]) !== void 0) return (p(m, g), g);
      },
      set(m, g) {
        m in u ? (u[m] = g) : p(m, g);
      },
    };
  },
  hr = '!',
  $m = ':',
  Wg = [],
  Fm = (c, d, u, o, p) => ({
    modifiers: c,
    hasImportantModifier: d,
    baseClassName: u,
    maybePostfixModifierPosition: o,
    isExternal: p,
  }),
  Pg = (c) => {
    const { prefix: d, experimentalParseClassName: u } = c;
    let o = (p) => {
      const m = [];
      let g = 0,
        S = 0,
        y = 0,
        h;
      const E = p.length;
      for (let Z = 0; Z < E; Z++) {
        const re = p[Z];
        if (g === 0 && S === 0) {
          if (re === $m) {
            (m.push(p.slice(y, Z)), (y = Z + 1));
            continue;
          }
          if (re === '/') {
            h = Z;
            continue;
          }
        }
        re === '[' ? g++ : re === ']' ? g-- : re === '(' ? S++ : re === ')' && S--;
      }
      const H = m.length === 0 ? p : p.slice(y);
      let U = H,
        F = !1;
      H.endsWith(hr)
        ? ((U = H.slice(0, -1)), (F = !0))
        : H.startsWith(hr) && ((U = H.slice(1)), (F = !0));
      const le = h && h > y ? h - y : void 0;
      return Fm(m, F, U, le);
    };
    if (d) {
      const p = d + $m,
        m = o;
      o = (g) => (g.startsWith(p) ? m(g.slice(p.length)) : Fm(Wg, !1, g, void 0, !0));
    }
    if (u) {
      const p = o;
      o = (m) => u({ className: m, parseClassName: p });
    }
    return o;
  },
  Ig = (c) => {
    const d = new Map();
    return (
      c.orderSensitiveModifiers.forEach((u, o) => {
        d.set(u, 1e6 + o);
      }),
      (u) => {
        const o = [];
        let p = [];
        for (let m = 0; m < u.length; m++) {
          const g = u[m],
            S = g[0] === '[',
            y = d.has(g);
          S || y ? (p.length > 0 && (p.sort(), o.push(...p), (p = [])), o.push(g)) : p.push(g);
        }
        return (p.length > 0 && (p.sort(), o.push(...p)), o);
      }
    );
  },
  ey = (c) => ({
    cache: Fg(c.cacheSize),
    parseClassName: Pg(c),
    sortModifiers: Ig(c),
    postfixLookupClassGroupIds: ty(c),
    ...Gg(c),
  }),
  ty = (c) => {
    const d = Object.create(null),
      u = c.postfixLookupClassGroups;
    if (u) for (let o = 0; o < u.length; o++) d[u[o]] = !0;
    return d;
  },
  ly = /\s+/,
  ay = (c, d) => {
    const {
        parseClassName: u,
        getClassGroupId: o,
        getConflictingClassGroupIds: p,
        sortModifiers: m,
        postfixLookupClassGroupIds: g,
      } = d,
      S = [],
      y = c.trim().split(ly);
    let h = '';
    for (let E = y.length - 1; E >= 0; E -= 1) {
      const H = y[E],
        {
          isExternal: U,
          modifiers: F,
          hasImportantModifier: le,
          baseClassName: Z,
          maybePostfixModifierPosition: re,
        } = u(H);
      if (U) {
        h = H + (h.length > 0 ? ' ' + h : h);
        continue;
      }
      let ve = !!re,
        se;
      if (ve) {
        const X = Z.substring(0, re);
        se = o(X);
        const D = se && g[se] ? o(Z) : void 0;
        D && D !== se && ((se = D), (ve = !1));
      } else se = o(Z);
      if (!se) {
        if (!ve) {
          h = H + (h.length > 0 ? ' ' + h : h);
          continue;
        }
        if (((se = o(Z)), !se)) {
          h = H + (h.length > 0 ? ' ' + h : h);
          continue;
        }
        ve = !1;
      }
      const _e = F.length === 0 ? '' : F.length === 1 ? F[0] : m(F).join(':'),
        Ce = le ? _e + hr : _e,
        Ue = Ce + se;
      if (S.indexOf(Ue) > -1) continue;
      S.push(Ue);
      const ee = p(se, ve);
      for (let X = 0; X < ee.length; ++X) {
        const D = ee[X];
        S.push(Ce + D);
      }
      h = H + (h.length > 0 ? ' ' + h : h);
    }
    return h;
  },
  ny = (...c) => {
    let d = 0,
      u,
      o,
      p = '';
    for (; d < c.length; ) (u = c[d++]) && (o = D0(u)) && (p && (p += ' '), (p += o));
    return p;
  },
  D0 = (c) => {
    if (typeof c == 'string') return c;
    let d,
      u = '';
    for (let o = 0; o < c.length; o++) c[o] && (d = D0(c[o])) && (u && (u += ' '), (u += d));
    return u;
  },
  sy = (c, ...d) => {
    let u, o, p, m;
    const g = (y) => {
        const h = d.reduce((E, H) => H(E), c());
        return ((u = ey(h)), (o = u.cache.get), (p = u.cache.set), (m = S), S(y));
      },
      S = (y) => {
        const h = o(y);
        if (h) return h;
        const E = ay(y, u);
        return (p(y, E), E);
      };
    return ((m = g), (...y) => m(ny(...y)));
  },
  cy = [],
  Ze = (c) => {
    const d = (u) => u[c] || cy;
    return ((d.isThemeGetter = !0), d);
  },
  R0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  B0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  iy = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  oy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ry =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  uy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  dy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  fy =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ul = (c) => iy.test(c),
  oe = (c) => !!c && !Number.isNaN(Number(c)),
  Vt = (c) => !!c && Number.isInteger(Number(c)),
  cr = (c) => c.endsWith('%') && oe(c.slice(0, -1)),
  ul = (c) => oy.test(c),
  U0 = () => !0,
  my = (c) => ry.test(c) && !uy.test(c),
  Nr = () => !1,
  hy = (c) => dy.test(c),
  py = (c) => fy.test(c),
  xy = (c) => !G(c) && !Q(c),
  gy = (c) =>
    c.startsWith('@container') &&
    ((c[10] === '/' && c[11] !== void 0) ||
      (c[11] === 's' && c[16] !== void 0 && c.startsWith('-size/', 10)) ||
      (c[11] === 'n' && c[18] !== void 0 && c.startsWith('-normal/', 10))),
  yy = (c) => ql(c, G0, Nr),
  G = (c) => R0.test(c),
  sa = (c) => ql(c, Y0, my),
  Wm = (c) => ql(c, Ey, oe),
  by = (c) => ql(c, V0, U0),
  vy = (c) => ql(c, Q0, Nr),
  Pm = (c) => ql(c, q0, Nr),
  Sy = (c) => ql(c, L0, py),
  gc = (c) => ql(c, X0, hy),
  Q = (c) => B0.test(c),
  Jn = (c) => ca(c, Y0),
  jy = (c) => ca(c, Q0),
  Im = (c) => ca(c, q0),
  Ny = (c) => ca(c, G0),
  Ay = (c) => ca(c, L0),
  yc = (c) => ca(c, X0, !0),
  Ty = (c) => ca(c, V0, !0),
  ql = (c, d, u) => {
    const o = R0.exec(c);
    return o ? (o[1] ? d(o[1]) : u(o[2])) : !1;
  },
  ca = (c, d, u = !1) => {
    const o = B0.exec(c);
    return o ? (o[1] ? d(o[1]) : u) : !1;
  },
  q0 = (c) => c === 'position' || c === 'percentage',
  L0 = (c) => c === 'image' || c === 'url',
  G0 = (c) => c === 'length' || c === 'size' || c === 'bg-size',
  Y0 = (c) => c === 'length',
  Ey = (c) => c === 'number',
  Q0 = (c) => c === 'family-name',
  V0 = (c) => c === 'number' || c === 'weight',
  X0 = (c) => c === 'shadow',
  wy = () => {
    const c = Ze('color'),
      d = Ze('font'),
      u = Ze('text'),
      o = Ze('font-weight'),
      p = Ze('tracking'),
      m = Ze('leading'),
      g = Ze('breakpoint'),
      S = Ze('container'),
      y = Ze('spacing'),
      h = Ze('radius'),
      E = Ze('shadow'),
      H = Ze('inset-shadow'),
      U = Ze('text-shadow'),
      F = Ze('drop-shadow'),
      le = Ze('blur'),
      Z = Ze('perspective'),
      re = Ze('aspect'),
      ve = Ze('ease'),
      se = Ze('animate'),
      _e = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      Ce = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      Ue = () => [...Ce(), Q, G],
      ee = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      X = () => ['auto', 'contain', 'none'],
      D = () => [Q, G, y],
      Ne = () => [Ul, 'full', 'auto', ...D()],
      ye = () => [Vt, 'none', 'subgrid', Q, G],
      Fe = () => ['auto', { span: ['full', Vt, Q, G] }, Vt, Q, G],
      ke = () => [Vt, 'auto', Q, G],
      Nt = () => ['auto', 'min', 'max', 'fr', Q, G],
      at = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      Oe = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'],
      _ = () => ['auto', ...D()],
      R = () => [
        Ul,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...D(),
      ],
      J = () => [Ul, 'screen', 'full', 'dvw', 'lvw', 'svw', 'min', 'max', 'fit', ...D()],
      q = () => [Ul, 'screen', 'full', 'lh', 'dvh', 'lvh', 'svh', 'min', 'max', 'fit', ...D()],
      k = () => [c, Q, G],
      b = () => [...Ce(), Im, Pm, { position: [Q, G] }],
      z = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      B = () => ['auto', 'cover', 'contain', Ny, yy, { size: [Q, G] }],
      Y = () => [cr, Jn, sa],
      $ = () => ['', 'none', 'full', h, Q, G],
      I = () => ['', oe, Jn, sa],
      he = () => ['solid', 'dashed', 'dotted', 'double'],
      Ke = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      ie = () => [oe, cr, Im, Pm],
      dl = () => ['', 'none', le, Q, G],
      Xt = () => ['none', oe, Q, G],
      fl = () => ['none', oe, Q, G],
      ia = () => [oe, Q, G],
      At = () => [Ul, 'full', ...D()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [ul],
        breakpoint: [ul],
        color: [U0],
        container: [ul],
        'drop-shadow': [ul],
        ease: ['in', 'out', 'in-out'],
        font: [xy],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [ul],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
        radius: [ul],
        shadow: [ul],
        spacing: ['px', oe],
        text: [ul],
        'text-shadow': [ul],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Ul, G, Q, re] }],
        container: ['container'],
        'container-type': [{ '@container': ['', 'normal', 'size', Q, G] }],
        'container-named': [gy],
        columns: [{ columns: [oe, G, Q, S] }],
        'break-after': [{ 'break-after': _e() }],
        'break-before': [{ 'break-before': _e() }],
        'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
        'object-position': [{ object: Ue() }],
        overflow: [{ overflow: ee() }],
        'overflow-x': [{ 'overflow-x': ee() }],
        'overflow-y': [{ 'overflow-y': ee() }],
        overscroll: [{ overscroll: X() }],
        'overscroll-x': [{ 'overscroll-x': X() }],
        'overscroll-y': [{ 'overscroll-y': X() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: Ne() }],
        'inset-x': [{ 'inset-x': Ne() }],
        'inset-y': [{ 'inset-y': Ne() }],
        start: [{ 'inset-s': Ne(), start: Ne() }],
        end: [{ 'inset-e': Ne(), end: Ne() }],
        'inset-bs': [{ 'inset-bs': Ne() }],
        'inset-be': [{ 'inset-be': Ne() }],
        top: [{ top: Ne() }],
        right: [{ right: Ne() }],
        bottom: [{ bottom: Ne() }],
        left: [{ left: Ne() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [Vt, 'auto', Q, G] }],
        basis: [{ basis: [Ul, 'full', 'auto', S, ...D()] }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [oe, Ul, 'auto', 'initial', 'none', G] }],
        grow: [{ grow: ['', oe, Q, G] }],
        shrink: [{ shrink: ['', oe, Q, G] }],
        order: [{ order: [Vt, 'first', 'last', 'none', Q, G] }],
        'grid-cols': [{ 'grid-cols': ye() }],
        'col-start-end': [{ col: Fe() }],
        'col-start': [{ 'col-start': ke() }],
        'col-end': [{ 'col-end': ke() }],
        'grid-rows': [{ 'grid-rows': ye() }],
        'row-start-end': [{ row: Fe() }],
        'row-start': [{ 'row-start': ke() }],
        'row-end': [{ 'row-end': ke() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': Nt() }],
        'auto-rows': [{ 'auto-rows': Nt() }],
        gap: [{ gap: D() }],
        'gap-x': [{ 'gap-x': D() }],
        'gap-y': [{ 'gap-y': D() }],
        'justify-content': [{ justify: [...at(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...Oe(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...Oe()] }],
        'align-content': [{ content: ['normal', ...at()] }],
        'align-items': [{ items: [...Oe(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...Oe(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': at() }],
        'place-items': [{ 'place-items': [...Oe(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...Oe()] }],
        p: [{ p: D() }],
        px: [{ px: D() }],
        py: [{ py: D() }],
        ps: [{ ps: D() }],
        pe: [{ pe: D() }],
        pbs: [{ pbs: D() }],
        pbe: [{ pbe: D() }],
        pt: [{ pt: D() }],
        pr: [{ pr: D() }],
        pb: [{ pb: D() }],
        pl: [{ pl: D() }],
        m: [{ m: _() }],
        mx: [{ mx: _() }],
        my: [{ my: _() }],
        ms: [{ ms: _() }],
        me: [{ me: _() }],
        mbs: [{ mbs: _() }],
        mbe: [{ mbe: _() }],
        mt: [{ mt: _() }],
        mr: [{ mr: _() }],
        mb: [{ mb: _() }],
        ml: [{ ml: _() }],
        'space-x': [{ 'space-x': D() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': D() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: R() }],
        'inline-size': [{ inline: ['auto', ...J()] }],
        'min-inline-size': [{ 'min-inline': ['auto', ...J()] }],
        'max-inline-size': [{ 'max-inline': ['none', ...J()] }],
        'block-size': [{ block: ['auto', ...q()] }],
        'min-block-size': [{ 'min-block': ['auto', ...q()] }],
        'max-block-size': [{ 'max-block': ['none', ...q()] }],
        w: [{ w: [S, 'screen', ...R()] }],
        'min-w': [{ 'min-w': [S, 'screen', 'none', ...R()] }],
        'max-w': [{ 'max-w': [S, 'screen', 'none', 'prose', { screen: [g] }, ...R()] }],
        h: [{ h: ['screen', 'lh', ...R()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...R()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...R()] }],
        'font-size': [{ text: ['base', u, Jn, sa] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [o, Ty, by] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              cr,
              G,
            ],
          },
        ],
        'font-family': [{ font: [jy, vy, d] }],
        'font-features': [{ 'font-features': [G] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [p, Q, G] }],
        'line-clamp': [{ 'line-clamp': [oe, 'none', Q, Wm] }],
        leading: [{ leading: [m, ...D()] }],
        'list-image': [{ 'list-image': ['none', Q, G] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', Q, G] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'placeholder-color': [{ placeholder: k() }],
        'text-color': [{ text: k() }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...he(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: [oe, 'from-font', 'auto', Q, sa] }],
        'text-decoration-color': [{ decoration: k() }],
        'underline-offset': [{ 'underline-offset': [oe, 'auto', Q, G] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: D() }],
        'tab-size': [{ tab: [Vt, Q, G] }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              Q,
              G,
            ],
          },
        ],
        whitespace: [
          { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', Q, G] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: b() }],
        'bg-repeat': [{ bg: z() }],
        'bg-size': [{ bg: B() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, Vt, Q, G],
                radial: ['', Q, G],
                conic: [Vt, Q, G],
              },
              Ay,
              Sy,
            ],
          },
        ],
        'bg-color': [{ bg: k() }],
        'gradient-from-pos': [{ from: Y() }],
        'gradient-via-pos': [{ via: Y() }],
        'gradient-to-pos': [{ to: Y() }],
        'gradient-from': [{ from: k() }],
        'gradient-via': [{ via: k() }],
        'gradient-to': [{ to: k() }],
        rounded: [{ rounded: $() }],
        'rounded-s': [{ 'rounded-s': $() }],
        'rounded-e': [{ 'rounded-e': $() }],
        'rounded-t': [{ 'rounded-t': $() }],
        'rounded-r': [{ 'rounded-r': $() }],
        'rounded-b': [{ 'rounded-b': $() }],
        'rounded-l': [{ 'rounded-l': $() }],
        'rounded-ss': [{ 'rounded-ss': $() }],
        'rounded-se': [{ 'rounded-se': $() }],
        'rounded-ee': [{ 'rounded-ee': $() }],
        'rounded-es': [{ 'rounded-es': $() }],
        'rounded-tl': [{ 'rounded-tl': $() }],
        'rounded-tr': [{ 'rounded-tr': $() }],
        'rounded-br': [{ 'rounded-br': $() }],
        'rounded-bl': [{ 'rounded-bl': $() }],
        'border-w': [{ border: I() }],
        'border-w-x': [{ 'border-x': I() }],
        'border-w-y': [{ 'border-y': I() }],
        'border-w-s': [{ 'border-s': I() }],
        'border-w-e': [{ 'border-e': I() }],
        'border-w-bs': [{ 'border-bs': I() }],
        'border-w-be': [{ 'border-be': I() }],
        'border-w-t': [{ 'border-t': I() }],
        'border-w-r': [{ 'border-r': I() }],
        'border-w-b': [{ 'border-b': I() }],
        'border-w-l': [{ 'border-l': I() }],
        'divide-x': [{ 'divide-x': I() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': I() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...he(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...he(), 'hidden', 'none'] }],
        'border-color': [{ border: k() }],
        'border-color-x': [{ 'border-x': k() }],
        'border-color-y': [{ 'border-y': k() }],
        'border-color-s': [{ 'border-s': k() }],
        'border-color-e': [{ 'border-e': k() }],
        'border-color-bs': [{ 'border-bs': k() }],
        'border-color-be': [{ 'border-be': k() }],
        'border-color-t': [{ 'border-t': k() }],
        'border-color-r': [{ 'border-r': k() }],
        'border-color-b': [{ 'border-b': k() }],
        'border-color-l': [{ 'border-l': k() }],
        'divide-color': [{ divide: k() }],
        'outline-style': [{ outline: [...he(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [oe, Q, G] }],
        'outline-w': [{ outline: ['', oe, Jn, sa] }],
        'outline-color': [{ outline: k() }],
        shadow: [{ shadow: ['', 'none', E, yc, gc] }],
        'shadow-color': [{ shadow: k() }],
        'inset-shadow': [{ 'inset-shadow': ['none', H, yc, gc] }],
        'inset-shadow-color': [{ 'inset-shadow': k() }],
        'ring-w': [{ ring: I() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: k() }],
        'ring-offset-w': [{ 'ring-offset': [oe, sa] }],
        'ring-offset-color': [{ 'ring-offset': k() }],
        'inset-ring-w': [{ 'inset-ring': I() }],
        'inset-ring-color': [{ 'inset-ring': k() }],
        'text-shadow': [{ 'text-shadow': ['none', U, yc, gc] }],
        'text-shadow-color': [{ 'text-shadow': k() }],
        opacity: [{ opacity: [oe, Q, G] }],
        'mix-blend': [{ 'mix-blend': [...Ke(), 'plus-darker', 'plus-lighter'] }],
        'bg-blend': [{ 'bg-blend': Ke() }],
        'mask-clip': [
          { 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
          'mask-no-clip',
        ],
        'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
        'mask-image-linear-pos': [{ 'mask-linear': [oe] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': ie() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': ie() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': k() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': k() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': ie() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': ie() }],
        'mask-image-t-from-color': [{ 'mask-t-from': k() }],
        'mask-image-t-to-color': [{ 'mask-t-to': k() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': ie() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': ie() }],
        'mask-image-r-from-color': [{ 'mask-r-from': k() }],
        'mask-image-r-to-color': [{ 'mask-r-to': k() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': ie() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': ie() }],
        'mask-image-b-from-color': [{ 'mask-b-from': k() }],
        'mask-image-b-to-color': [{ 'mask-b-to': k() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': ie() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': ie() }],
        'mask-image-l-from-color': [{ 'mask-l-from': k() }],
        'mask-image-l-to-color': [{ 'mask-l-to': k() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': ie() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': ie() }],
        'mask-image-x-from-color': [{ 'mask-x-from': k() }],
        'mask-image-x-to-color': [{ 'mask-x-to': k() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': ie() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': ie() }],
        'mask-image-y-from-color': [{ 'mask-y-from': k() }],
        'mask-image-y-to-color': [{ 'mask-y-to': k() }],
        'mask-image-radial': [{ 'mask-radial': [Q, G] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': ie() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': ie() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': k() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': k() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          { 'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }] },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': Ce() }],
        'mask-image-conic-pos': [{ 'mask-conic': [oe] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': ie() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': ie() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': k() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': k() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          { 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
        ],
        'mask-position': [{ mask: b() }],
        'mask-repeat': [{ mask: z() }],
        'mask-size': [{ mask: B() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', Q, G] }],
        filter: [{ filter: ['', 'none', Q, G] }],
        blur: [{ blur: dl() }],
        brightness: [{ brightness: [oe, Q, G] }],
        contrast: [{ contrast: [oe, Q, G] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', F, yc, gc] }],
        'drop-shadow-color': [{ 'drop-shadow': k() }],
        grayscale: [{ grayscale: ['', oe, Q, G] }],
        'hue-rotate': [{ 'hue-rotate': [oe, Q, G] }],
        invert: [{ invert: ['', oe, Q, G] }],
        saturate: [{ saturate: [oe, Q, G] }],
        sepia: [{ sepia: ['', oe, Q, G] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', Q, G] }],
        'backdrop-blur': [{ 'backdrop-blur': dl() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [oe, Q, G] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [oe, Q, G] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', oe, Q, G] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [oe, Q, G] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', oe, Q, G] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [oe, Q, G] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [oe, Q, G] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', oe, Q, G] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': D() }],
        'border-spacing-x': [{ 'border-spacing-x': D() }],
        'border-spacing-y': [{ 'border-spacing-y': D() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          { transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', Q, G] },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [oe, 'initial', Q, G] }],
        ease: [{ ease: ['linear', 'initial', ve, Q, G] }],
        delay: [{ delay: [oe, Q, G] }],
        animate: [{ animate: ['none', se, Q, G] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [Z, Q, G] }],
        'perspective-origin': [{ 'perspective-origin': Ue() }],
        rotate: [{ rotate: Xt() }],
        'rotate-x': [{ 'rotate-x': Xt() }],
        'rotate-y': [{ 'rotate-y': Xt() }],
        'rotate-z': [{ 'rotate-z': Xt() }],
        scale: [{ scale: fl() }],
        'scale-x': [{ 'scale-x': fl() }],
        'scale-y': [{ 'scale-y': fl() }],
        'scale-z': [{ 'scale-z': fl() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: ia() }],
        'skew-x': [{ 'skew-x': ia() }],
        'skew-y': [{ 'skew-y': ia() }],
        transform: [{ transform: [Q, G, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: Ue() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: At() }],
        'translate-x': [{ 'translate-x': At() }],
        'translate-y': [{ 'translate-y': At() }],
        'translate-z': [{ 'translate-z': At() }],
        'translate-none': ['translate-none'],
        zoom: [{ zoom: [Vt, Q, G] }],
        accent: [{ accent: k() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: k() }],
        'color-scheme': [
          { scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              Q,
              G,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scrollbar-thumb-color': [{ 'scrollbar-thumb': k() }],
        'scrollbar-track-color': [{ 'scrollbar-track': k() }],
        'scrollbar-gutter': [{ 'scrollbar-gutter': ['auto', 'stable', 'both'] }],
        'scrollbar-w': [{ scrollbar: ['auto', 'thin', 'none'] }],
        'scroll-m': [{ 'scroll-m': D() }],
        'scroll-mx': [{ 'scroll-mx': D() }],
        'scroll-my': [{ 'scroll-my': D() }],
        'scroll-ms': [{ 'scroll-ms': D() }],
        'scroll-me': [{ 'scroll-me': D() }],
        'scroll-mbs': [{ 'scroll-mbs': D() }],
        'scroll-mbe': [{ 'scroll-mbe': D() }],
        'scroll-mt': [{ 'scroll-mt': D() }],
        'scroll-mr': [{ 'scroll-mr': D() }],
        'scroll-mb': [{ 'scroll-mb': D() }],
        'scroll-ml': [{ 'scroll-ml': D() }],
        'scroll-p': [{ 'scroll-p': D() }],
        'scroll-px': [{ 'scroll-px': D() }],
        'scroll-py': [{ 'scroll-py': D() }],
        'scroll-ps': [{ 'scroll-ps': D() }],
        'scroll-pe': [{ 'scroll-pe': D() }],
        'scroll-pbs': [{ 'scroll-pbs': D() }],
        'scroll-pbe': [{ 'scroll-pbe': D() }],
        'scroll-pt': [{ 'scroll-pt': D() }],
        'scroll-pr': [{ 'scroll-pr': D() }],
        'scroll-pb': [{ 'scroll-pb': D() }],
        'scroll-pl': [{ 'scroll-pl': D() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', Q, G] }],
        fill: [{ fill: ['none', ...k()] }],
        'stroke-w': [{ stroke: [oe, Jn, sa, Wm] }],
        stroke: [{ stroke: ['none', ...k()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        'container-named': ['container-type'],
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'inset-bs',
          'inset-be',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pbs', 'pbe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mbs', 'mbe', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-bs',
          'border-w-be',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-bs',
          'border-color-be',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mbs',
          'scroll-mbe',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pbs',
          'scroll-pbe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      postfixLookupClassGroups: ['container-type'],
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  _y = sy(wy);
function Z0(...c) {
  return _y(M0(c));
}
function Cy({ className: c, type: d, ...u }) {
  return i.jsx('input', {
    'code-path': 'src/components/ui/input.tsx:7:5',
    type: d,
    'data-slot': 'input',
    className: Z0(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      c
    ),
    ...u,
  });
}
function zy({ favoritesCount: c, onSearch: d, onAISearch: u, onNavigate: o, currentPage: p }) {
  const [m, g] = L.useState(''),
    [S, y] = L.useState(!1),
    [h, E] = L.useState(!1),
    [H, U] = L.useState(!1),
    F = (Z) => {
      (Z.preventDefault(), m.trim() && (H ? u(m.trim()) : d(m.trim())));
    },
    le = [
      { id: 'home', label: 'Главная', icon: Wn },
      { id: 'promo', label: 'Промокоды', icon: Fa },
      { id: 'blog', label: 'Блог', icon: j0 },
      { id: 'favorites', label: 'Избранное', icon: $a },
    ];
  return i.jsxs('header', {
    'code-path': 'src/components/Header.tsx:38:5',
    className: 'sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-cyan-500/20',
    children: [
      i.jsx('div', {
        'code-path': 'src/components/Header.tsx:39:7',
        className: 'max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6',
        children: i.jsxs('div', {
          'code-path': 'src/components/Header.tsx:40:9',
          className: 'flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4',
          children: [
            i.jsxs('button', {
              'code-path': 'src/components/Header.tsx:42:11',
              onClick: () => o('home'),
              className: 'flex items-center gap-1.5 sm:gap-2 shrink-0',
              children: [
                i.jsx('div', {
                  'code-path': 'src/components/Header.tsx:46:13',
                  className:
                    'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center',
                  children: i.jsx(Wn, {
                    'code-path': 'src/components/Header.tsx:47:15',
                    className: 'w-4 h-4 sm:w-5 sm:h-5 text-white',
                  }),
                }),
                i.jsxs('span', {
                  'code-path': 'src/components/Header.tsx:49:13',
                  className: 'text-base sm:text-lg font-bold text-white hidden sm:inline',
                  children: [
                    'Smart',
                    i.jsx('span', {
                      'code-path': 'src/components/Header.tsx:50:20',
                      className: 'text-cyan-400',
                      children: 'Skidka',
                    }),
                    '.ru',
                  ],
                }),
                i.jsxs('span', {
                  'code-path': 'src/components/Header.tsx:52:13',
                  className: 'text-base font-bold text-white sm:hidden',
                  children: [
                    'SS',
                    i.jsx('span', {
                      'code-path': 'src/components/Header.tsx:53:17',
                      className: 'text-cyan-400',
                      children: '.ru',
                    }),
                  ],
                }),
              ],
            }),
            i.jsx('form', {
              'code-path': 'src/components/Header.tsx:58:11',
              onSubmit: F,
              className: 'flex-1 max-w-xl',
              children: i.jsxs('div', {
                'code-path': 'src/components/Header.tsx:59:13',
                className: `relative flex items-center bg-[#1e293b] rounded-xl border transition-all duration-200 ${h ? 'border-cyan-400 ring-1 ring-cyan-400/30' : 'border-slate-600'}`,
                children: [
                  i.jsx(mr, {
                    'code-path': 'src/components/Header.tsx:60:15',
                    className: 'absolute left-3 w-4 h-4 text-slate-400',
                  }),
                  i.jsx(Cy, {
                    'code-path': 'src/components/Header.tsx:61:15',
                    type: 'text',
                    placeholder: H ? 'AI-поиск: напишите что ищете...' : 'Поиск товаров...',
                    value: m,
                    onChange: (Z) => g(Z.target.value),
                    onFocus: () => E(!0),
                    onBlur: () => E(!1),
                    className:
                      'pl-9 pr-[4.5rem] h-9 sm:h-10 bg-transparent border-0 text-white placeholder:text-slate-400 text-sm focus-visible:ring-0 focus-visible:ring-offset-0',
                  }),
                  m &&
                    i.jsx('button', {
                      'code-path': 'src/components/Header.tsx:71:17',
                      type: 'button',
                      onClick: () => {
                        (g(''), d(''));
                      },
                      className:
                        'absolute right-10 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white',
                      children: i.jsx(Ac, {
                        'code-path': 'src/components/Header.tsx:76:19',
                        className: 'w-3 h-3',
                      }),
                    }),
                  i.jsx('button', {
                    'code-path': 'src/components/Header.tsx:79:15',
                    type: 'submit',
                    className:
                      'absolute right-2 w-7 h-7 flex items-center justify-center bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors',
                    children: i.jsx(mr, {
                      'code-path': 'src/components/Header.tsx:83:17',
                      className: 'w-3.5 h-3.5',
                    }),
                  }),
                ],
              }),
            }),
            i.jsxs('div', {
              'code-path': 'src/components/Header.tsx:89:11',
              className: 'hidden lg:flex items-center gap-2',
              children: [
                i.jsxs('button', {
                  'code-path': 'src/components/Header.tsx:90:13',
                  type: 'button',
                  onClick: () => U(!H),
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${H ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/40 text-cyan-300' : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:text-white'}`,
                  children: [
                    i.jsx(vr, {
                      'code-path': 'src/components/Header.tsx:99:15',
                      className: 'w-3.5 h-3.5',
                    }),
                    i.jsx('span', {
                      'code-path': 'src/components/Header.tsx:100:15',
                      className: 'text-xs font-medium',
                      children: H ? 'AI-поиск' : 'Обычный',
                    }),
                  ],
                }),
                i.jsxs('button', {
                  'code-path': 'src/components/Header.tsx:102:13',
                  onClick: () => o('favorites'),
                  className: 'relative p-2 text-slate-300 hover:text-white transition-colors',
                  children: [
                    i.jsx($a, {
                      'code-path': 'src/components/Header.tsx:106:15',
                      className: `w-5 h-5 ${p === 'favorites' ? 'fill-red-500 text-red-500' : ''}`,
                    }),
                    c > 0 &&
                      i.jsx('span', {
                        'code-path': 'src/components/Header.tsx:108:17',
                        className:
                          'absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full',
                        children: c,
                      }),
                  ],
                }),
              ],
            }),
            i.jsx('button', {
              'code-path': 'src/components/Header.tsx:116:11',
              onClick: () => y(!S),
              className: 'lg:hidden p-2 text-slate-300 hover:text-white',
              children: S
                ? i.jsx(Ac, {
                    'code-path': 'src/components/Header.tsx:120:31',
                    className: 'w-5 h-5',
                  })
                : i.jsx(Wx, {
                    'code-path': 'src/components/Header.tsx:120:59',
                    className: 'w-5 h-5',
                  }),
            }),
          ],
        }),
      }),
      S &&
        i.jsx('div', {
          'code-path': 'src/components/Header.tsx:127:9',
          className: 'lg:hidden bg-[#0f172a] border-t border-slate-700/50',
          children: i.jsxs('div', {
            'code-path': 'src/components/Header.tsx:128:11',
            className: 'px-4 py-3 space-y-1',
            children: [
              le.map((Z) =>
                i.jsxs(
                  'button',
                  {
                    'code-path': 'src/components/Header.tsx:130:15',
                    onClick: () => {
                      (o(Z.id), y(!1));
                    },
                    className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${p === Z.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`,
                    children: [
                      i.jsx(Z.icon, {
                        'code-path': 'src/components/Header.tsx:135:17',
                        className: 'w-4 h-4',
                      }),
                      Z.label,
                      Z.id === 'favorites' &&
                        c > 0 &&
                        i.jsx('span', {
                          'code-path': 'src/components/Header.tsx:138:19',
                          className:
                            'ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                          children: c,
                        }),
                    ],
                  },
                  Z.id
                )
              ),
              i.jsxs('a', {
                'code-path': 'src/components/Header.tsx:144:13',
                href: 'https://t.me/SmartRuMarket',
                target: '_blank',
                rel: 'noopener noreferrer',
                className:
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors',
                children: [
                  i.jsx($n, {
                    'code-path': 'src/components/Header.tsx:150:15',
                    className: 'w-4 h-4',
                  }),
                  'Telegram-канал',
                ],
              }),
            ],
          }),
        }),
      i.jsx('nav', {
        'code-path': 'src/components/Header.tsx:158:7',
        className: 'hidden lg:block border-t border-slate-700/30',
        children: i.jsx('div', {
          'code-path': 'src/components/Header.tsx:159:9',
          className: 'max-w-[1440px] mx-auto px-6',
          children: i.jsxs('div', {
            'code-path': 'src/components/Header.tsx:160:11',
            className: 'flex items-center gap-1',
            children: [
              le.map((Z) =>
                i.jsxs(
                  'button',
                  {
                    'code-path': 'src/components/Header.tsx:162:15',
                    onClick: () => o(Z.id),
                    className: `flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${p === Z.id ? 'text-cyan-400 border-cyan-400' : 'text-slate-400 border-transparent hover:text-white hover:border-slate-500'}`,
                    children: [
                      i.jsx(Z.icon, {
                        'code-path': 'src/components/Header.tsx:167:17',
                        className: 'w-3.5 h-3.5',
                      }),
                      Z.label,
                      Z.id === 'favorites' &&
                        c > 0 &&
                        i.jsx('span', {
                          'code-path': 'src/components/Header.tsx:170:19',
                          className:
                            'bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                          children: c,
                        }),
                    ],
                  },
                  Z.id
                )
              ),
              i.jsxs('a', {
                'code-path': 'src/components/Header.tsx:176:13',
                href: 'https://t.me/SmartRuMarket',
                target: '_blank',
                rel: 'noopener noreferrer',
                className:
                  'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-400 border-b-2 border-transparent hover:text-cyan-400 hover:border-cyan-400 transition-colors',
                children: [
                  i.jsx($n, {
                    'code-path': 'src/components/Header.tsx:182:15',
                    className: 'w-3.5 h-3.5',
                  }),
                  'Telegram',
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function My({
  title: c,
  description: d,
  keywords: u,
  ogImage: o,
  ogType: p = 'website',
  canonical: m,
  faqSchema: g,
  jsonLd: S,
}) {
  const y = c.includes('SmartSkidka') ? c : `${c} — SmartSkidka.ru`;
  return i.jsxs(lx, {
    'code-path': 'src/components/SEO.tsx:20:5',
    children: [
      i.jsx('title', { 'code-path': 'src/components/SEO.tsx:21:7', children: y }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:22:7',
        name: 'description',
        content: d,
      }),
      u &&
        i.jsx('meta', {
          'code-path': 'src/components/SEO.tsx:23:20',
          name: 'keywords',
          content: u,
        }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:24:7',
        property: 'og:title',
        content: y,
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:25:7',
        property: 'og:description',
        content: d,
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:26:7',
        property: 'og:type',
        content: p,
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:27:7',
        property: 'og:url',
        content: `https://smart-skidka.ru${m || '/'}`,
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:28:7',
        property: 'og:site_name',
        content: 'SmartSkidka.ru',
      }),
      o &&
        i.jsx('meta', {
          'code-path': 'src/components/SEO.tsx:29:19',
          property: 'og:image',
          content: o,
        }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:30:7',
        property: 'og:locale',
        content: 'ru_RU',
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:31:7',
        name: 'twitter:card',
        content: 'summary_large_image',
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:32:7',
        name: 'twitter:title',
        content: y,
      }),
      i.jsx('meta', {
        'code-path': 'src/components/SEO.tsx:33:7',
        name: 'twitter:description',
        content: d,
      }),
      o &&
        i.jsx('meta', {
          'code-path': 'src/components/SEO.tsx:34:19',
          name: 'twitter:image',
          content: o,
        }),
      g &&
        g.length > 0 &&
        i.jsx('script', {
          'code-path': 'src/components/SEO.tsx:37:9',
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: g.map((h) => ({
              '@type': 'Question',
              name: h.question,
              acceptedAnswer: { '@type': 'Answer', text: h.answer },
            })),
          }),
        }),
      S &&
        i.jsx('script', {
          'code-path': 'src/components/SEO.tsx:53:9',
          type: 'application/ld+json',
          children: JSON.stringify(S),
        }),
    ],
  });
}
function e0(c, d) {
  if (typeof c == 'function') return c(d);
  c != null && (c.current = d);
}
function Oy(...c) {
  return (d) => {
    let u = !1;
    const o = c.map((p) => {
      const m = e0(p, d);
      return (!u && typeof m == 'function' && (u = !0), m);
    });
    if (u)
      return () => {
        for (let p = 0; p < o.length; p++) {
          const m = o[p];
          typeof m == 'function' ? m() : e0(c[p], null);
        }
      };
  };
}
function Hy(...c) {
  return L.useCallback(Oy(...c), c);
}
function ky(c) {
  const d = L.forwardRef((u, o) => {
    let { children: p, ...m } = u,
      g = null,
      S = !1;
    const y = [];
    (t0(p) && typeof bc == 'function' && (p = bc(p._payload)),
      L.Children.forEach(p, (U) => {
        if (Ly(U)) {
          S = !0;
          const F = U;
          let le = 'child' in F.props ? F.props.child : F.props.children;
          (t0(le) && typeof bc == 'function' && (le = bc(le._payload)),
            (g = By(F, le)),
            y.push(g?.props?.children));
        } else y.push(U);
      }),
      g
        ? (g = L.cloneElement(g, void 0, y))
        : !S && L.Children.count(p) === 1 && L.isValidElement(p) && (g = p));
    const h = g ? qy(g) : void 0,
      E = Hy(o, h);
    if (!g) {
      if (p || p === 0) throw new Error(S ? Vy(c) : Qy(c));
      return p;
    }
    const H = Uy(m, g.props ?? {});
    return (g.type !== L.Fragment && (H.ref = o ? E : h), L.cloneElement(g, H));
  });
  return ((d.displayName = `${c}.Slot`), d);
}
var Dy = ky('Slot'),
  Ry = Symbol.for('radix.slottable'),
  By = (c, d) => {
    if ('child' in c.props) {
      const u = c.props.child;
      return L.isValidElement(u)
        ? L.cloneElement(u, void 0, c.props.children(u.props.children))
        : null;
    }
    return L.isValidElement(d) ? d : null;
  };
function Uy(c, d) {
  const u = { ...d };
  for (const o in d) {
    const p = c[o],
      m = d[o];
    /^on[A-Z]/.test(o)
      ? p && m
        ? (u[o] = (...S) => {
            const y = m(...S);
            return (p(...S), y);
          })
        : p && (u[o] = p)
      : o === 'style'
        ? (u[o] = { ...p, ...m })
        : o === 'className' && (u[o] = [p, m].filter(Boolean).join(' '));
  }
  return { ...c, ...u };
}
function qy(c) {
  let d = Object.getOwnPropertyDescriptor(c.props, 'ref')?.get,
    u = d && 'isReactWarning' in d && d.isReactWarning;
  return u
    ? c.ref
    : ((d = Object.getOwnPropertyDescriptor(c, 'ref')?.get),
      (u = d && 'isReactWarning' in d && d.isReactWarning),
      u ? c.props.ref : c.props.ref || c.ref);
}
function Ly(c) {
  return (
    L.isValidElement(c) &&
    typeof c.type == 'function' &&
    '__radixId' in c.type &&
    c.type.__radixId === Ry
  );
}
var Gy = Symbol.for('react.lazy');
function t0(c) {
  return (
    c != null &&
    typeof c == 'object' &&
    '$$typeof' in c &&
    c.$$typeof === Gy &&
    '_payload' in c &&
    Yy(c._payload)
  );
}
function Yy(c) {
  return typeof c == 'object' && c !== null && 'then' in c;
}
var Qy = (c) =>
    `${c} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
  Vy = (c) =>
    `${c} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
  bc = Sp[' use '.trim().toString()];
const l0 = (c) => (typeof c == 'boolean' ? `${c}` : c === 0 ? '0' : c),
  a0 = M0,
  Xy = (c, d) => (u) => {
    var o;
    if (d?.variants == null) return a0(c, u?.class, u?.className);
    const { variants: p, defaultVariants: m } = d,
      g = Object.keys(p).map((h) => {
        const E = u?.[h],
          H = m?.[h];
        if (E === null) return null;
        const U = l0(E) || l0(H);
        return p[h][U];
      }),
      S =
        u &&
        Object.entries(u).reduce((h, E) => {
          let [H, U] = E;
          return (U === void 0 || (h[H] = U), h);
        }, {}),
      y =
        d == null || (o = d.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((h, E) => {
              let { class: H, className: U, ...F } = E;
              return Object.entries(F).every((le) => {
                let [Z, re] = le;
                return Array.isArray(re)
                  ? re.includes({ ...m, ...S }[Z])
                  : { ...m, ...S }[Z] === re;
              })
                ? [...h, H, U]
                : h;
            }, []);
    return a0(c, g, y, u?.class, u?.className);
  },
  Zy = Xy(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive:
            'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
          outline:
            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-9 px-4 py-2 has-[>svg]:px-3',
          sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
          lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
          icon: 'size-9',
          'icon-sm': 'size-8',
          'icon-lg': 'size-10',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  );
function n0({ className: c, variant: d = 'default', size: u = 'default', asChild: o = !1, ...p }) {
  const m = o ? Dy : 'button';
  return i.jsx(m, {
    'code-path': 'src/components/ui/button.tsx:52:5',
    'data-slot': 'button',
    'data-variant': d,
    'data-size': u,
    className: Z0(Zy({ variant: d, size: u, className: c })),
    ...p,
  });
}
function Ky({ onNavigate: c, onCategorySelect: d }) {
  const u = [
    { id: 'electronics', label: 'Электроника', icon: 'Monitor', discount: 'до 90%' },
    { id: 'clothing', label: 'Одежда', icon: 'Shirt', discount: 'до 80%' },
    { id: 'shoes', label: 'Обувь', icon: 'Footprints', discount: 'до 75%' },
    { id: 'home', label: 'Товары для дома', icon: 'Home', discount: 'до 85%' },
  ];
  return i.jsxs('section', {
    'code-path': 'src/sections/HeroSection.tsx:18:5',
    className:
      'relative bg-gradient-to-b from-[#0f172a] via-[#162032] to-[#0f172a] overflow-hidden',
    children: [
      i.jsx('div', {
        'code-path': 'src/sections/HeroSection.tsx:20:7',
        className: 'absolute inset-0 opacity-5',
        children: i.jsx('div', {
          'code-path': 'src/sections/HeroSection.tsx:21:9',
          className: 'absolute inset-0',
          style: {
            backgroundImage: 'radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)',
            backgroundSize: '40px 40px',
          },
        }),
      }),
      i.jsx('div', {
        'code-path': 'src/sections/HeroSection.tsx:28:7',
        className: 'absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl',
      }),
      i.jsx('div', {
        'code-path': 'src/sections/HeroSection.tsx:29:7',
        className: 'absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl',
      }),
      i.jsxs('div', {
        'code-path': 'src/sections/HeroSection.tsx:31:7',
        className: 'relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/HeroSection.tsx:33:9',
            className: 'flex justify-center mb-4 sm:mb-6',
            children: i.jsxs('div', {
              'code-path': 'src/sections/HeroSection.tsx:34:11',
              className:
                'inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full',
              children: [
                i.jsx(Wn, {
                  'code-path': 'src/sections/HeroSection.tsx:35:13',
                  className: 'w-3.5 h-3.5 text-cyan-400',
                }),
                i.jsx('span', {
                  'code-path': 'src/sections/HeroSection.tsx:36:13',
                  className: 'text-xs sm:text-sm font-semibold text-cyan-300',
                  children: '1000+ товаров со скидками до 90%',
                }),
              ],
            }),
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/HeroSection.tsx:43:9',
            className: 'text-center mb-6 sm:mb-8',
            children: [
              i.jsxs('h1', {
                'code-path': 'src/sections/HeroSection.tsx:44:11',
                className:
                  'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6',
                children: [
                  'Выгодные предложения с',
                  ' ',
                  i.jsx('span', {
                    'code-path': 'src/sections/HeroSection.tsx:46:13',
                    className:
                      'bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent',
                    children: 'AliExpress',
                  }),
                ],
              }),
              i.jsxs('p', {
                'code-path': 'src/sections/HeroSection.tsx:50:11',
                className:
                  'text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4',
                children: [
                  'Экономьте до ',
                  i.jsx('span', {
                    'code-path': 'src/sections/HeroSection.tsx:51:26',
                    className: 'text-cyan-400 font-bold',
                    children: '90%',
                  }),
                  ' на топовых товарах с бесплатной доставкой. Мы собираем реальные скидки, проверяем отзывы и обновляем каталог каждый день.',
                ],
              }),
            ],
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/HeroSection.tsx:57:9',
            className: 'flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-10',
            children: [
              i.jsxs('div', {
                'code-path': 'src/sections/HeroSection.tsx:58:11',
                className: 'text-center',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/HeroSection.tsx:59:13',
                    className:
                      'flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white',
                    children: [
                      i.jsx(Eg, {
                        'code-path': 'src/sections/HeroSection.tsx:60:15',
                        className: 'w-5 h-5 text-cyan-400',
                      }),
                      '1050+',
                    ],
                  }),
                  i.jsx('div', {
                    'code-path': 'src/sections/HeroSection.tsx:63:13',
                    className: 'text-xs sm:text-sm text-slate-500 mt-0.5',
                    children: 'товаров',
                  }),
                ],
              }),
              i.jsx('div', {
                'code-path': 'src/sections/HeroSection.tsx:65:11',
                className: 'w-px bg-slate-700',
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/HeroSection.tsx:66:11',
                className: 'text-center',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/HeroSection.tsx:67:13',
                    className:
                      'flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white',
                    children: [
                      i.jsx(Fa, {
                        'code-path': 'src/sections/HeroSection.tsx:68:15',
                        className: 'w-5 h-5 text-pink-400',
                      }),
                      'до 90%',
                    ],
                  }),
                  i.jsx('div', {
                    'code-path': 'src/sections/HeroSection.tsx:71:13',
                    className: 'text-xs sm:text-sm text-slate-500 mt-0.5',
                    children: 'скидки',
                  }),
                ],
              }),
              i.jsx('div', {
                'code-path': 'src/sections/HeroSection.tsx:73:11',
                className: 'w-px bg-slate-700',
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/HeroSection.tsx:74:11',
                className: 'text-center',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/HeroSection.tsx:75:13',
                    className:
                      'flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white',
                    children: [
                      i.jsx(Sr, {
                        'code-path': 'src/sections/HeroSection.tsx:76:15',
                        className: 'w-5 h-5 text-emerald-400',
                      }),
                      'Бесплатная',
                    ],
                  }),
                  i.jsx('div', {
                    'code-path': 'src/sections/HeroSection.tsx:79:13',
                    className: 'text-xs sm:text-sm text-slate-500 mt-0.5',
                    children: 'доставка',
                  }),
                ],
              }),
            ],
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/HeroSection.tsx:84:9',
            className: 'flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-14',
            children: [
              i.jsxs(n0, {
                'code-path': 'src/sections/HeroSection.tsx:85:11',
                onClick: () => d('electronics'),
                className:
                  'h-12 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 text-sm sm:text-base',
                children: [
                  'Смотреть скидки на электронику',
                  i.jsx(Fn, {
                    'code-path': 'src/sections/HeroSection.tsx:90:13',
                    className: 'w-4 h-4 ml-2',
                  }),
                ],
              }),
              i.jsxs(n0, {
                'code-path': 'src/sections/HeroSection.tsx:92:11',
                onClick: () => c('promo'),
                variant: 'outline',
                className:
                  'h-12 px-6 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-semibold rounded-xl text-sm sm:text-base',
                children: [
                  i.jsx(Fa, {
                    'code-path': 'src/sections/HeroSection.tsx:97:13',
                    className: 'w-4 h-4 mr-2',
                  }),
                  'Актуальные промокоды',
                ],
              }),
            ],
          }),
          i.jsx('div', {
            'code-path': 'src/sections/HeroSection.tsx:103:9',
            className: 'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto',
            children: u.map((o) =>
              i.jsxs(
                'button',
                {
                  'code-path': 'src/sections/HeroSection.tsx:105:13',
                  onClick: () => d(o.id),
                  className:
                    'group relative p-4 sm:p-5 bg-[#1e293b]/80 hover:bg-[#243447] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 text-left',
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/HeroSection.tsx:110:15',
                      className:
                        'absolute top-3 right-3 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full',
                      children: o.discount,
                    }),
                    i.jsx('h3', {
                      'code-path': 'src/sections/HeroSection.tsx:113:15',
                      className:
                        'text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1',
                      children: o.label,
                    }),
                    i.jsxs('p', {
                      'code-path': 'src/sections/HeroSection.tsx:116:15',
                      className: 'text-xs text-slate-500',
                      children: [o.discount, ' скидки'],
                    }),
                    i.jsx(Fn, {
                      'code-path': 'src/sections/HeroSection.tsx:117:15',
                      className:
                        'w-4 h-4 text-slate-600 group-hover:text-cyan-400 mt-3 transition-colors',
                    }),
                  ],
                },
                o.id
              )
            ),
          }),
        ],
      }),
    ],
  });
}
const s0 = 'G-VG8VX6F69T',
  pr = 109145874;
function ir() {
  if (!(typeof window > 'u')) {
    if (!window.gtag) {
      const c = document.createElement('script');
      ((c.async = !0),
        (c.src = `https://www.googletagmanager.com/gtag/js?id=${s0}`),
        document.head.appendChild(c),
        (window.dataLayer = window.dataLayer || []),
        (window.gtag = function (...d) {
          window.dataLayer?.push(d);
        }),
        window.gtag('js', new Date()),
        window.gtag('config', s0));
    }
    if (!window.ym) {
      const c = document.createElement('script');
      ((c.async = !0),
        (c.src = 'https://mc.yandex.ru/metrika/tag.js'),
        document.head.appendChild(c),
        (window.ym = function (p, m, ...g) {
          window[`yaCounter${p}`] = window[`yaCounter${p}`] || { reachGoal: () => {} };
        }),
        (c.onload = () => {
          typeof window.ym == 'function' &&
            window.ym(pr, 'init', {
              clickmap: !0,
              trackLinks: !0,
              accurateTrackBounce: !0,
              webvisor: !0,
            });
        }));
      const d = document.createElement('noscript'),
        u = document.createElement('div'),
        o = document.createElement('img');
      ((o.src = `https://mc.yandex.ru/watch/${pr}`),
        (o.style.position = 'absolute'),
        (o.style.left = '-9999px'),
        (o.alt = ''),
        u.appendChild(o),
        d.appendChild(u),
        document.body.appendChild(d));
    }
  }
}
function Jy(c, d) {
  typeof window < 'u' && typeof window.gtag == 'function' && window.gtag('event', c, d);
}
function $y(c, d) {
  typeof window < 'u' && typeof window.ym == 'function' && window.ym(pr, 'reachGoal', c, d);
}
function jt(c, d) {
  (Jy(c, d), $y(c, d));
}
function Fy(c) {
  jt('view_item', { item_id: c.id, item_name: c.title, price: c.price });
}
function K0(c) {
  jt('purchase', { item_id: c.id, item_name: c.title, value: c.price, currency: 'RUB' });
}
function Wy(c) {
  jt('add_to_favorites', { item_id: c });
}
function Py(c) {
  jt('remove_from_favorites', { item_id: c });
}
function Iy(c, d) {
  jt('search', { search_term: c, category: d || 'all' });
}
function e2(c) {
  jt('ai_search', { query: c });
}
function t2(c) {
  jt('select_content', { content_type: 'category', item_id: c });
}
function c0(c) {
  jt('select_content', { content_type: 'filter', item_id: c });
}
function l2(c) {
  jt('select_content', { content_type: 'sort', item_id: c });
}
function a2(c, d) {
  jt('pagination', { page: c, category: d || 'all' });
}
function n2(c) {
  jt(`scroll_${c}`);
}
function s2() {
  jt('install_pwa');
}
function c2(c) {
  jt('click_outbound', { item_id: c });
}
const i0 = {
  bestseller: {
    label: 'Хит продаж',
    className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  topRated: {
    label: 'Высокий рейтинг',
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  bestPrice: {
    label: 'Выгодная цена',
    className: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  flash: { label: 'Флеш-скидка', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  new: { label: 'Новинка', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};
function Pn({ product: c, isFavorite: d, onToggleFavorite: u, onProductClick: o, index: p }) {
  return i.jsxs('div', {
    'code-path': 'src/components/ProductCard.tsx:23:5',
    onClick: () => o?.(c.id),
    className:
      'group bg-[#1e293b] hover:bg-[#23304a] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer',
    children: [
      i.jsxs('div', {
        'code-path': 'src/components/ProductCard.tsx:28:7',
        className: 'relative aspect-square bg-[#161f30] overflow-hidden',
        children: [
          i.jsx('img', {
            'code-path': 'src/components/ProductCard.tsx:29:9',
            src: c.image,
            alt: c.title,
            className:
              'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
            loading: 'lazy',
          }),
          i.jsxs('div', {
            'code-path': 'src/components/ProductCard.tsx:37:9',
            className:
              'absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg',
            children: ['-', c.discount, '%'],
          }),
          p !== void 0 &&
            p < 10 &&
            i.jsx('div', {
              'code-path': 'src/components/ProductCard.tsx:43:11',
              className:
                'absolute top-2 right-10 w-7 h-7 flex items-center justify-center bg-cyan-500 text-white text-xs font-bold rounded-full shadow-lg',
              children: p + 1,
            }),
          i.jsx('button', {
            'code-path': 'src/components/ProductCard.tsx:49:9',
            onClick: (m) => {
              (m.stopPropagation(), u(c.id));
            },
            className: `absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${d ? 'bg-red-500 text-white shadow-lg' : 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm'}`,
            children: i.jsx($a, {
              'code-path': 'src/components/ProductCard.tsx:53:11',
              className: `w-4 h-4 ${d ? 'fill-white' : ''}`,
            }),
          }),
          c.timer &&
            i.jsxs('div', {
              'code-path': 'src/components/ProductCard.tsx:58:11',
              className:
                'absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-amber-400 text-xs font-medium px-2 py-1 rounded-lg',
              children: [
                i.jsx(jc, {
                  'code-path': 'src/components/ProductCard.tsx:59:13',
                  className: 'w-3 h-3',
                }),
                c.timer,
              ],
            }),
        ],
      }),
      i.jsxs('div', {
        'code-path': 'src/components/ProductCard.tsx:66:7',
        className: 'p-3 sm:p-4',
        children: [
          c.badges.length > 0 &&
            i.jsx('div', {
              'code-path': 'src/components/ProductCard.tsx:69:11',
              className: 'flex flex-wrap gap-1 mb-2',
              children: c.badges.map((m) =>
                i.jsx(
                  'span',
                  {
                    'code-path': 'src/components/ProductCard.tsx:71:15',
                    className: `text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full border ${i0[m]?.className || ''}`,
                    children: i0[m]?.label || m,
                  },
                  m
                )
              ),
            }),
          i.jsx('h3', {
            'code-path': 'src/components/ProductCard.tsx:79:9',
            className:
              'text-sm sm:text-base font-semibold text-white mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors min-h-[2.5rem] sm:min-h-[3rem]',
            children: c.title,
          }),
          c.subtitle &&
            i.jsx('p', {
              'code-path': 'src/components/ProductCard.tsx:85:11',
              className: 'text-xs text-slate-400 mb-2 line-clamp-1',
              children: c.subtitle,
            }),
          i.jsx('div', {
            'code-path': 'src/components/ProductCard.tsx:89:9',
            className: 'flex flex-wrap gap-1 mb-2',
            children: c.tags
              .slice(0, 2)
              .map((m) =>
                i.jsx(
                  'span',
                  {
                    'code-path': 'src/components/ProductCard.tsx:91:13',
                    className: 'text-[10px] text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded',
                    children: m,
                  },
                  m
                )
              ),
          }),
          i.jsx('div', {
            'code-path': 'src/components/ProductCard.tsx:98:9',
            className: 'mb-2',
            children: i.jsxs('div', {
              'code-path': 'src/components/ProductCard.tsx:99:11',
              className: 'flex items-baseline gap-2',
              children: [
                i.jsxs('span', {
                  'code-path': 'src/components/ProductCard.tsx:100:13',
                  className: 'text-lg sm:text-xl font-bold text-cyan-400',
                  children: [c.price.toLocaleString('ru'), ' ₽'],
                }),
                i.jsxs('span', {
                  'code-path': 'src/components/ProductCard.tsx:101:13',
                  className: 'text-xs sm:text-sm text-slate-500 line-through',
                  children: [c.oldPrice.toLocaleString('ru'), ' ₽'],
                }),
              ],
            }),
          }),
          i.jsxs('div', {
            'code-path': 'src/components/ProductCard.tsx:106:9',
            className: 'flex items-center gap-2 sm:gap-3 mb-3 text-xs text-slate-500',
            children: [
              i.jsxs('span', {
                'code-path': 'src/components/ProductCard.tsx:107:11',
                className: 'flex items-center gap-0.5',
                children: [
                  i.jsx(C0, {
                    'code-path': 'src/components/ProductCard.tsx:108:13',
                    className: 'w-3 h-3 text-amber-400 fill-amber-400',
                  }),
                  c.rating,
                ],
              }),
              i.jsxs('span', {
                'code-path': 'src/components/ProductCard.tsx:111:11',
                className: 'flex items-center gap-0.5',
                children: [
                  i.jsx(Sr, {
                    'code-path': 'src/components/ProductCard.tsx:112:13',
                    className: 'w-3 h-3',
                  }),
                  c.orders,
                ],
              }),
              c.viewers > 0 &&
                i.jsxs('span', {
                  'code-path': 'src/components/ProductCard.tsx:116:13',
                  className: 'flex items-center gap-0.5 text-pink-400',
                  children: [
                    i.jsx(T0, {
                      'code-path': 'src/components/ProductCard.tsx:117:15',
                      className: 'w-3 h-3',
                    }),
                    c.viewers,
                  ],
                }),
            ],
          }),
          i.jsxs('p', {
            'code-path': 'src/components/ProductCard.tsx:124:9',
            className: 'text-[10px] sm:text-xs text-slate-500 mb-3 flex items-center gap-1',
            children: [
              i.jsx(yr, {
                'code-path': 'src/components/ProductCard.tsx:125:11',
                className: 'w-3 h-3 text-emerald-400',
              }),
              c.shipping,
            ],
          }),
          i.jsxs('div', {
            'code-path': 'src/components/ProductCard.tsx:130:9',
            className: 'flex gap-2',
            children: [
              i.jsxs('a', {
                'code-path': 'src/components/ProductCard.tsx:131:11',
                href: c.affiliateLink,
                target: '_blank',
                rel: 'noopener noreferrer sponsored nofollow',
                onClick: (m) => {
                  (m.stopPropagation(), c2(c.id), K0({ id: c.id, title: c.title, price: c.price }));
                },
                className:
                  'flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20',
                children: [
                  i.jsx(_c, {
                    'code-path': 'src/components/ProductCard.tsx:138:13',
                    className: 'w-4 h-4',
                  }),
                  'На AliExpress',
                ],
              }),
              o &&
                i.jsx('button', {
                  'code-path': 'src/components/ProductCard.tsx:142:13',
                  onClick: (m) => {
                    (m.stopPropagation(), o(c.id));
                  },
                  className:
                    'px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-xl transition-colors',
                  children: 'Подробнее',
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function i2({
  discountFilter: c,
  onDiscountFilterChange: d,
  onResetFilters: u,
  productCount: o,
  sortValue: p = 'discount',
  onSortChange: m,
}) {
  const g = [
      { value: 'all', label: 'Все скидки' },
      { value: '30', label: '30%+' },
      { value: '50', label: '50%+' },
      { value: '70', label: '70%+' },
      { value: '90', label: '90%+' },
    ],
    S = [
      { value: 'discount', label: 'По скидке' },
      { value: 'price_asc', label: 'Цена ↑' },
      { value: 'price_desc', label: 'Цена ↓' },
      { value: 'orders', label: 'По популярности' },
    ],
    y = c !== 'all';
  return i.jsx('div', {
    'code-path': 'src/components/FilterBar.tsx:35:5',
    className: 'bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6',
    children: i.jsxs('div', {
      'code-path': 'src/components/FilterBar.tsx:36:7',
      className: 'flex flex-col gap-3',
      children: [
        i.jsxs('div', {
          'code-path': 'src/components/FilterBar.tsx:38:9',
          className: 'flex flex-wrap items-center gap-2',
          children: [
            i.jsx(pg, {
              'code-path': 'src/components/FilterBar.tsx:39:11',
              className: 'w-4 h-4 text-slate-400 mr-1',
            }),
            g.map((h) =>
              i.jsx(
                'button',
                {
                  'code-path': 'src/components/FilterBar.tsx:41:13',
                  onClick: () => d(h.value),
                  className: `px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${c === h.value ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`,
                  children: h.label,
                },
                h.value
              )
            ),
          ],
        }),
        i.jsxs('div', {
          'code-path': 'src/components/FilterBar.tsx:52:9',
          className: 'flex items-center gap-2',
          children: [
            m &&
              i.jsxs('div', {
                'code-path': 'src/components/FilterBar.tsx:54:13',
                className: 'flex items-center gap-2',
                children: [
                  i.jsx(fx, {
                    'code-path': 'src/components/FilterBar.tsx:55:15',
                    className: 'w-3.5 h-3.5 text-slate-400',
                  }),
                  i.jsx('select', {
                    'code-path': 'src/components/FilterBar.tsx:56:15',
                    value: p,
                    onChange: (h) => m(h.target.value),
                    className:
                      'h-8 px-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500',
                    children: S.map((h) =>
                      i.jsx(
                        'option',
                        {
                          'code-path': 'src/components/FilterBar.tsx:62:19',
                          value: h.value,
                          children: h.label,
                        },
                        h.value
                      )
                    ),
                  }),
                ],
              }),
            y &&
              i.jsxs('button', {
                'code-path': 'src/components/FilterBar.tsx:69:13',
                onClick: u,
                className:
                  'flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors',
                children: [
                  i.jsx(Ac, {
                    'code-path': 'src/components/FilterBar.tsx:73:15',
                    className: 'w-3 h-3',
                  }),
                  'Сбросить',
                ],
              }),
            i.jsxs('div', {
              'code-path': 'src/components/FilterBar.tsx:78:11',
              className: 'text-xs text-slate-500 ml-auto',
              children: [o, ' товаров'],
            }),
          ],
        }),
      ],
    }),
  });
}
const o2 = {
  LayoutGrid: Nc,
  Monitor: br,
  Shirt: _0,
  Footprints: E0,
  Home: w0,
  Car: vx,
  Sparkles: vr,
  Dumbbell: kx,
};
function r2({ categories: c, activeCategory: d, onCategoryChange: u }) {
  return i.jsxs('div', {
    'code-path': 'src/components/CategorySidebar.tsx:16:5',
    className: 'bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl p-4 sticky top-24',
    children: [
      i.jsx('h3', {
        'code-path': 'src/components/CategorySidebar.tsx:17:7',
        className: 'text-sm font-bold text-white mb-3 px-2',
        children: 'Категории',
      }),
      i.jsx('div', {
        'code-path': 'src/components/CategorySidebar.tsx:18:7',
        className: 'space-y-0.5',
        children: c.map((o) => {
          const p = o2[o.icon] || Nc;
          return i.jsxs(
            'button',
            {
              'code-path': 'src/components/CategorySidebar.tsx:22:13',
              onClick: () => u(o.id),
              className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${d === o.id ? 'bg-cyan-500/15 text-cyan-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-700/30'}`,
              children: [
                i.jsx(p, {
                  'code-path': 'src/components/CategorySidebar.tsx:27:15',
                  className: 'w-4 h-4 shrink-0',
                }),
                i.jsx('span', {
                  'code-path': 'src/components/CategorySidebar.tsx:28:15',
                  className: 'flex-1 text-left',
                  children: o.name,
                }),
                i.jsx('span', {
                  'code-path': 'src/components/CategorySidebar.tsx:29:15',
                  className: `text-xs ${d === o.id ? 'text-cyan-500' : 'text-slate-600'}`,
                  children: o.count,
                }),
              ],
            },
            o.id
          );
        }),
      }),
    ],
  });
}
function u2({
  products: c,
  categories: d,
  activeCategory: u,
  onCategoryChange: o,
  favorites: p,
  onToggleFavorite: m,
  onProductClick: g,
  searchQuery: S,
}) {
  const [y, h] = L.useState('all'),
    [E, H] = L.useState('discount'),
    U = 12,
    [F, le] = L.useState(U),
    Z = L.useMemo(() => {
      let ee = [...c];
      if ((u !== 'all' && (ee = ee.filter((X) => X.category === u)), S)) {
        const X = S.toLowerCase();
        ee = ee.filter(
          (D) =>
            D.title.toLowerCase().includes(X) ||
            D.subtitle?.toLowerCase().includes(X) ||
            D.tags.some((Ne) => Ne.toLowerCase().includes(X))
        );
      }
      if (y !== 'all') {
        const X = parseInt(y);
        ee = ee.filter((D) => D.discount >= X);
      }
      switch (E) {
        case 'price_asc':
          ee.sort((X, D) => X.price - D.price);
          break;
        case 'price_desc':
          ee.sort((X, D) => D.price - X.price);
          break;
        case 'orders':
          ee.sort((X, D) => D.orders - X.orders);
          break;
        default:
          ee.sort((X, D) => D.discount - X.discount);
          break;
      }
      return ee;
    }, [c, u, S, y, E]),
    re = L.useMemo(() => Z.slice(0, F), [Z, F]),
    ve = (ee) => {
      (le(U), h(ee), ee !== 'all' && c0(`discount_${ee}`));
    },
    se = () => {
      (le(U), h('all'), c0('reset'));
    },
    _e = () => {
      (le((ee) => ee + U), a2(F / U + 1, u));
    },
    Ce = (ee) => {
      (H(ee), l2(ee));
    },
    Ue = d.find((ee) => ee.id === u)?.name || 'Все';
  return i.jsx('section', {
    'code-path': 'src/sections/ProductCatalog.tsx:102:5',
    className: 'max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8',
    children: i.jsxs('div', {
      'code-path': 'src/sections/ProductCatalog.tsx:103:7',
      className: 'flex gap-4 lg:gap-6',
      children: [
        i.jsx('div', {
          'code-path': 'src/sections/ProductCatalog.tsx:105:9',
          className: 'hidden lg:block w-64 shrink-0',
          children: i.jsx(r2, {
            'code-path': 'src/sections/ProductCatalog.tsx:106:11',
            categories: d,
            activeCategory: u,
            onCategoryChange: o,
          }),
        }),
        i.jsxs('div', {
          'code-path': 'src/sections/ProductCatalog.tsx:114:9',
          className: 'flex-1 min-w-0',
          children: [
            i.jsxs('div', {
              'code-path': 'src/sections/ProductCatalog.tsx:117:11',
              className: 'flex items-center gap-2 mb-4',
              children: [
                i.jsx(Nc, {
                  'code-path': 'src/sections/ProductCatalog.tsx:118:13',
                  className: 'w-5 h-5 text-cyan-400',
                }),
                i.jsx('h2', {
                  'code-path': 'src/sections/ProductCatalog.tsx:119:13',
                  className: 'text-lg sm:text-xl font-bold text-white',
                  children: Ue,
                }),
                i.jsx(Tx, {
                  'code-path': 'src/sections/ProductCatalog.tsx:120:13',
                  className: 'w-4 h-4 text-slate-500',
                }),
              ],
            }),
            i.jsx(i2, {
              'code-path': 'src/sections/ProductCatalog.tsx:124:11',
              discountFilter: y,
              onDiscountFilterChange: ve,
              onResetFilters: se,
              productCount: Z.length,
              sortValue: E,
              onSortChange: Ce,
            }),
            re.length > 0
              ? i.jsxs(i.Fragment, {
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/ProductCatalog.tsx:136:15',
                      className: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4',
                      children: re.map((ee) =>
                        i.jsx(
                          Pn,
                          {
                            'code-path': 'src/sections/ProductCatalog.tsx:138:19',
                            product: ee,
                            isFavorite: p.includes(ee.id),
                            onToggleFavorite: () => m(ee.id),
                            onProductClick: () => g(ee.id),
                          },
                          ee.id
                        )
                      ),
                    }),
                    re.length < Z.length &&
                      i.jsx('div', {
                        'code-path': 'src/sections/ProductCatalog.tsx:149:17',
                        className: 'text-center mt-6',
                        children: i.jsxs('button', {
                          'code-path': 'src/sections/ProductCatalog.tsx:150:19',
                          onClick: _e,
                          className:
                            'px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-colors',
                          children: ['Ещё товары (', Z.length - re.length, ' осталось)'],
                        }),
                      }),
                  ],
                })
              : i.jsxs('div', {
                  'code-path': 'src/sections/ProductCatalog.tsx:160:13',
                  className: 'text-center py-16',
                  children: [
                    i.jsx(Nc, {
                      'code-path': 'src/sections/ProductCatalog.tsx:161:15',
                      className: 'w-12 h-12 text-slate-600 mx-auto mb-3',
                    }),
                    i.jsx('p', {
                      'code-path': 'src/sections/ProductCatalog.tsx:162:15',
                      className: 'text-slate-400 text-sm',
                      children: 'Товары не найдены',
                    }),
                    i.jsx('button', {
                      'code-path': 'src/sections/ProductCatalog.tsx:163:15',
                      onClick: se,
                      className: 'text-cyan-400 text-sm hover:underline mt-2',
                      children: 'Сбросить фильтры',
                    }),
                  ],
                }),
          ],
        }),
      ],
    }),
  });
}
const d2 = { Monitor: br, Shirt: _0, Footprints: E0, Home: w0 };
function f2({ collections: c, onCollectionClick: d }) {
  return i.jsxs('section', {
    'code-path': 'src/sections/CollectionsSection.tsx:15:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
    children: [
      i.jsxs('div', {
        'code-path': 'src/sections/CollectionsSection.tsx:16:7',
        className: 'flex items-center gap-2 mb-5 sm:mb-6',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/CollectionsSection.tsx:17:9',
            className: 'w-1 h-5 bg-cyan-500 rounded-full',
          }),
          i.jsx('h2', {
            'code-path': 'src/sections/CollectionsSection.tsx:18:9',
            className: 'text-lg sm:text-xl font-bold text-white',
            children: 'Подборки скидок',
          }),
        ],
      }),
      i.jsx('div', {
        'code-path': 'src/sections/CollectionsSection.tsx:21:7',
        className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4',
        children: c.map((u) => {
          const o = d2[u.icon] || br;
          return i.jsxs(
            'button',
            {
              'code-path': 'src/sections/CollectionsSection.tsx:25:13',
              onClick: () => d(u),
              className:
                'group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#1e293b]/80 hover:bg-[#243447] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 text-left',
              children: [
                i.jsx('div', {
                  'code-path': 'src/sections/CollectionsSection.tsx:30:15',
                  className:
                    'w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-xl flex items-center justify-center transition-colors',
                  children: i.jsx(o, {
                    'code-path': 'src/sections/CollectionsSection.tsx:31:17',
                    className: 'w-5 h-5 sm:w-6 sm:h-6 text-cyan-400',
                  }),
                }),
                i.jsxs('div', {
                  'code-path': 'src/sections/CollectionsSection.tsx:33:15',
                  className: 'min-w-0 flex-1',
                  children: [
                    i.jsx('h3', {
                      'code-path': 'src/sections/CollectionsSection.tsx:34:17',
                      className:
                        'text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2',
                      children: u.title,
                    }),
                    i.jsx('p', {
                      'code-path': 'src/sections/CollectionsSection.tsx:37:17',
                      className: 'text-xs text-slate-500 mt-0.5',
                      children: u.description,
                    }),
                  ],
                }),
                i.jsx(Fn, {
                  'code-path': 'src/sections/CollectionsSection.tsx:39:15',
                  className:
                    'w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors',
                }),
              ],
            },
            u.id
          );
        }),
      }),
    ],
  });
}
function m2({ products: c, favorites: d, onToggleFavorite: u, onProductClick: o }) {
  const p = [...c].sort((m, g) => g.orders - m.orders).slice(0, 10);
  return i.jsxs('section', {
    'code-path': 'src/sections/TopProducts.tsx:16:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
    children: [
      i.jsxs('div', {
        'code-path': 'src/sections/TopProducts.tsx:17:7',
        className: 'flex items-center gap-2 mb-6',
        children: [
          i.jsx(zg, {
            'code-path': 'src/sections/TopProducts.tsx:18:9',
            className: 'w-5 h-5 text-amber-400',
          }),
          i.jsx('h2', {
            'code-path': 'src/sections/TopProducts.tsx:19:9',
            className: 'text-xl sm:text-2xl font-bold text-white',
            children: 'Топ-10 за неделю',
          }),
        ],
      }),
      i.jsx('div', {
        'code-path': 'src/sections/TopProducts.tsx:22:7',
        className: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4',
        children: p.map((m, g) =>
          i.jsx(
            Pn,
            {
              'code-path': 'src/sections/TopProducts.tsx:24:11',
              product: m,
              isFavorite: d.includes(m.id),
              onToggleFavorite: u,
              onProductClick: o,
              index: g,
            },
            m.id
          )
        ),
      }),
    ],
  });
}
const h2 = [
  {
    icon: mr,
    title: 'Собираем товары',
    description:
      'Ежедневно сканируем AliExpress и отбираем товары с реальными скидками от 30% до 90% через партнёрскую программу Admitad.',
    color: 'from-cyan-500/20 to-cyan-600/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Lx,
    title: 'Проверяем качество',
    description:
      'Фильтруем по рейтингу продавца (4.5+), количеству продаж (100+), отзывам с фото и реальной истории цен за 90 дней.',
    color: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: hx,
    title: 'Публикуем лучшее',
    description:
      'Добавляем только проверенные товары с подробным описанием, характеристиками и актуальными ценами в рублях.',
    color: 'from-amber-500/20 to-amber-600/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: _c,
    title: 'Вы покупаете выгодно',
    description:
      'Переходите на AliExpress по нашим ссылкам, получаете ту же цену + применяете промокоды. Мы получаем комиссию и развиваем сервис.',
    color: 'from-pink-500/20 to-pink-600/10',
    iconColor: 'text-pink-400',
  },
  {
    icon: lg,
    title: 'Обновляем ежедневно',
    description:
      'Каталог обновляется каждый день: удаляем товары с истекшими скидками, добавляем новые выгодные предложения.',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
  },
];
function p2() {
  return i.jsxs('section', {
    'code-path': 'src/sections/HowItWorks.tsx:43:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
    children: [
      i.jsxs('div', {
        'code-path': 'src/sections/HowItWorks.tsx:44:7',
        className: 'text-center mb-8 sm:mb-10',
        children: [
          i.jsx('h2', {
            'code-path': 'src/sections/HowItWorks.tsx:45:9',
            className: 'text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2',
            children: 'Как работает SmartSkidka',
          }),
          i.jsx('p', {
            'code-path': 'src/sections/HowItWorks.tsx:48:9',
            className: 'text-sm sm:text-base text-slate-400 max-w-2xl mx-auto',
            children: 'Прозрачный процесс отбора товаров — вы всегда знаете, что покупаете',
          }),
        ],
      }),
      i.jsx('div', {
        'code-path': 'src/sections/HowItWorks.tsx:53:7',
        className: 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5',
        children: h2.map((c, d) =>
          i.jsxs(
            'div',
            {
              'code-path': 'src/sections/HowItWorks.tsx:55:11',
              className: `relative p-5 sm:p-6 bg-gradient-to-br ${c.color} border border-slate-700/30 rounded-2xl hover:border-slate-600/50 transition-all`,
              children: [
                i.jsx('div', {
                  'code-path': 'src/sections/HowItWorks.tsx:59:13',
                  className: `w-10 h-10 bg-slate-800/80 rounded-xl flex items-center justify-center mb-4 ${c.iconColor}`,
                  children: i.jsx(c.icon, {
                    'code-path': 'src/sections/HowItWorks.tsx:60:15',
                    className: 'w-5 h-5',
                  }),
                }),
                i.jsx('div', {
                  'code-path': 'src/sections/HowItWorks.tsx:62:13',
                  className: 'absolute top-4 right-4 text-2xl font-bold text-slate-700/50',
                  children: String(d + 1).padStart(2, '0'),
                }),
                i.jsx('h3', {
                  'code-path': 'src/sections/HowItWorks.tsx:65:13',
                  className: 'text-sm sm:text-base font-bold text-white mb-2',
                  children: c.title,
                }),
                i.jsx('p', {
                  'code-path': 'src/sections/HowItWorks.tsx:66:13',
                  className: 'text-xs sm:text-sm text-slate-400 leading-relaxed',
                  children: c.description,
                }),
              ],
            },
            d
          )
        ),
      }),
    ],
  });
}
function x2({ stats: c }) {
  const d = [
    {
      icon: eg,
      value: `${c.productCount}+`,
      label: 'товаров в базе',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    {
      icon: Zx,
      value: `${c.categoryCount}`,
      label: 'категорий',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: N0,
      value: `${c.yearLaunched}`,
      label: 'год запуска',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      icon: Ag,
      value: `${c.dailyDeals}+`,
      label: 'новых скидок ежедневно',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
    },
  ];
  return i.jsx('section', {
    'code-path': 'src/sections/StatsSection.tsx:17:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
    children: i.jsx('div', {
      'code-path': 'src/sections/StatsSection.tsx:18:7',
      className: 'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4',
      children: d.map((u, o) =>
        i.jsxs(
          'div',
          {
            'code-path': 'src/sections/StatsSection.tsx:20:11',
            className:
              'flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl',
            children: [
              i.jsx('div', {
                'code-path': 'src/sections/StatsSection.tsx:24:13',
                className: `w-10 h-10 sm:w-12 sm:h-12 ${u.bg} rounded-xl flex items-center justify-center shrink-0`,
                children: i.jsx(u.icon, {
                  'code-path': 'src/sections/StatsSection.tsx:25:15',
                  className: `w-5 h-5 sm:w-6 sm:h-6 ${u.color}`,
                }),
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/StatsSection.tsx:27:13',
                children: [
                  i.jsx('div', {
                    'code-path': 'src/sections/StatsSection.tsx:28:15',
                    className: 'text-xl sm:text-2xl font-bold text-white',
                    children: u.value,
                  }),
                  i.jsx('div', {
                    'code-path': 'src/sections/StatsSection.tsx:29:15',
                    className: 'text-xs sm:text-sm text-slate-400',
                    children: u.label,
                  }),
                ],
              }),
            ],
          },
          o
        )
      ),
    }),
  });
}
function g2({ faq: c, title: d = 'Часто задаваемые вопросы' }) {
  return !c || c.length === 0
    ? null
    : i.jsxs('section', {
        'code-path': 'src/sections/FAQSection.tsx:13:5',
        className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
        children: [
          i.jsxs('div', {
            'code-path': 'src/sections/FAQSection.tsx:14:7',
            className: 'flex items-center gap-2 mb-5 sm:mb-6',
            children: [
              i.jsx(A0, {
                'code-path': 'src/sections/FAQSection.tsx:15:9',
                className: 'w-5 h-5 text-cyan-400',
              }),
              i.jsx('h2', {
                'code-path': 'src/sections/FAQSection.tsx:16:9',
                className: 'text-lg sm:text-xl font-bold text-white',
                children: d,
              }),
            ],
          }),
          i.jsx('div', {
            'code-path': 'src/sections/FAQSection.tsx:19:7',
            className: 'max-w-3xl space-y-3',
            children: c.map((u, o) =>
              i.jsxs(
                'details',
                {
                  'code-path': 'src/sections/FAQSection.tsx:21:11',
                  className:
                    'group bg-[#1e293b]/60 border border-slate-700/30 rounded-xl overflow-hidden hover:border-slate-600/50 transition-colors',
                  children: [
                    i.jsxs('summary', {
                      'code-path': 'src/sections/FAQSection.tsx:22:13',
                      className:
                        'flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none',
                      children: [
                        i.jsx('span', {
                          'code-path': 'src/sections/FAQSection.tsx:23:15',
                          className: 'text-sm sm:text-base font-medium text-white pr-4',
                          children: u.question,
                        }),
                        i.jsx('span', {
                          'code-path': 'src/sections/FAQSection.tsx:24:15',
                          className:
                            'w-7 h-7 shrink-0 bg-cyan-500/10 rounded-lg flex items-center justify-center group-open:rotate-180 transition-transform duration-300',
                          children: i.jsx('svg', {
                            'code-path': 'src/sections/FAQSection.tsx:25:17',
                            className: 'w-3.5 h-3.5 text-cyan-400',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            children: i.jsx('path', {
                              'code-path': 'src/sections/FAQSection.tsx:26:19',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: 2,
                              d: 'M19 9l-7 7-7-7',
                            }),
                          }),
                        }),
                      ],
                    }),
                    i.jsx('div', {
                      'code-path': 'src/sections/FAQSection.tsx:30:13',
                      className: 'px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-400 leading-relaxed',
                      children: u.answer,
                    }),
                  ],
                },
                o
              )
            ),
          }),
        ],
      });
}
function o0({ variant: c = 'inline' }) {
  return c === 'sidebar'
    ? i.jsxs('div', {
        'code-path': 'src/sections/TelegramBanner.tsx:10:7',
        className:
          'bg-gradient-to-br from-[#0088cc]/20 to-[#0088cc]/5 border border-[#0088cc]/30 rounded-2xl p-4 text-center',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/TelegramBanner.tsx:11:9',
            className:
              'w-10 h-10 bg-[#0088cc]/20 rounded-xl flex items-center justify-center mx-auto mb-3',
            children: i.jsx('svg', {
              'code-path': 'src/sections/TelegramBanner.tsx:12:11',
              className: 'w-5 h-5 text-[#0088cc]',
              viewBox: '0 0 24 24',
              fill: 'currentColor',
              children: i.jsx('path', {
                'code-path': 'src/sections/TelegramBanner.tsx:13:13',
                d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
              }),
            }),
          }),
          i.jsx('h4', {
            'code-path': 'src/sections/TelegramBanner.tsx:16:9',
            className: 'text-sm font-bold text-white mb-1',
            children: 'Telegram-канал',
          }),
          i.jsx('p', {
            'code-path': 'src/sections/TelegramBanner.tsx:17:9',
            className: 'text-xs text-slate-400 mb-3',
            children: 'Горячие скидки каждый день + эксклюзивные промокоды',
          }),
          i.jsxs('a', {
            'code-path': 'src/sections/TelegramBanner.tsx:18:9',
            href: 'https://t.me/SmartRuMarket',
            target: '_blank',
            rel: 'noopener noreferrer',
            className:
              'inline-flex items-center gap-1.5 px-4 py-2 bg-[#0088cc] hover:bg-[#0099dd] text-white text-xs font-semibold rounded-xl transition-colors',
            children: [
              'Подписаться',
              i.jsx($n, {
                'code-path': 'src/sections/TelegramBanner.tsx:25:11',
                className: 'w-3 h-3',
              }),
            ],
          }),
        ],
      })
    : c === 'bottom'
      ? i.jsx('div', {
          'code-path': 'src/sections/TelegramBanner.tsx:33:7',
          className:
            'bg-gradient-to-r from-[#0088cc]/10 via-[#0088cc]/5 to-transparent border-t border-[#0088cc]/20 py-4 px-4',
          children: i.jsxs('div', {
            'code-path': 'src/sections/TelegramBanner.tsx:34:9',
            className:
              'max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3',
            children: [
              i.jsxs('div', {
                'code-path': 'src/sections/TelegramBanner.tsx:35:11',
                className: 'flex items-center gap-3',
                children: [
                  i.jsx('svg', {
                    'code-path': 'src/sections/TelegramBanner.tsx:36:13',
                    className: 'w-8 h-8 text-[#0088cc]',
                    viewBox: '0 0 24 24',
                    fill: 'currentColor',
                    children: i.jsx('path', {
                      'code-path': 'src/sections/TelegramBanner.tsx:37:15',
                      d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
                    }),
                  }),
                  i.jsxs('div', {
                    'code-path': 'src/sections/TelegramBanner.tsx:39:13',
                    children: [
                      i.jsx('p', {
                        'code-path': 'src/sections/TelegramBanner.tsx:40:15',
                        className: 'text-sm font-semibold text-white',
                        children: 'Эксклюзивные скидки в Telegram',
                      }),
                      i.jsx('p', {
                        'code-path': 'src/sections/TelegramBanner.tsx:41:15',
                        className: 'text-xs text-slate-400',
                        children: 'Получайте лучшие предложения первыми',
                      }),
                    ],
                  }),
                ],
              }),
              i.jsxs('a', {
                'code-path': 'src/sections/TelegramBanner.tsx:44:11',
                href: 'https://t.me/SmartRuMarket',
                target: '_blank',
                rel: 'noopener noreferrer',
                className:
                  'shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0088cc] hover:bg-[#0099dd] text-white text-sm font-semibold rounded-xl transition-colors',
                children: [
                  'Подписаться',
                  i.jsx($n, {
                    'code-path': 'src/sections/TelegramBanner.tsx:51:13',
                    className: 'w-3.5 h-3.5',
                  }),
                ],
              }),
            ],
          }),
        })
      : i.jsx('section', {
          'code-path': 'src/sections/TelegramBanner.tsx:60:5',
          className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
          children: i.jsxs('div', {
            'code-path': 'src/sections/TelegramBanner.tsx:61:7',
            className:
              'relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#162033] to-[#0f172a] border border-[#0088cc]/20 rounded-2xl p-5 sm:p-8',
            children: [
              i.jsx('div', {
                'code-path': 'src/sections/TelegramBanner.tsx:62:9',
                className:
                  'absolute top-0 right-0 w-64 h-64 bg-[#0088cc]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2',
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/TelegramBanner.tsx:64:9',
                className: 'relative flex flex-col lg:flex-row items-center gap-5 lg:gap-8',
                children: [
                  i.jsx('div', {
                    'code-path': 'src/sections/TelegramBanner.tsx:65:11',
                    className:
                      'w-14 h-14 sm:w-16 sm:h-16 bg-[#0088cc]/20 rounded-2xl flex items-center justify-center shrink-0',
                    children: i.jsx('svg', {
                      'code-path': 'src/sections/TelegramBanner.tsx:66:13',
                      className: 'w-7 h-7 sm:w-8 sm:h-8 text-[#0088cc]',
                      viewBox: '0 0 24 24',
                      fill: 'currentColor',
                      children: i.jsx('path', {
                        'code-path': 'src/sections/TelegramBanner.tsx:67:15',
                        d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
                      }),
                    }),
                  }),
                  i.jsxs('div', {
                    'code-path': 'src/sections/TelegramBanner.tsx:71:11',
                    className: 'flex-1 text-center lg:text-left',
                    children: [
                      i.jsx('h3', {
                        'code-path': 'src/sections/TelegramBanner.tsx:72:13',
                        className: 'text-lg sm:text-xl font-bold text-white mb-2',
                        children: 'Горячие скидки каждый день в Telegram',
                      }),
                      i.jsx('p', {
                        'code-path': 'src/sections/TelegramBanner.tsx:75:13',
                        className: 'text-sm text-slate-400 mb-3',
                        children:
                          'Подпишитесь на наш канал @SmartRuMarket и получайте эксклюзивные промокоды, флеш-скидки и подборки товаров раньше других.',
                      }),
                      i.jsxs('div', {
                        'code-path': 'src/sections/TelegramBanner.tsx:79:13',
                        className: 'flex flex-wrap justify-center lg:justify-start gap-2',
                        children: [
                          i.jsxs('span', {
                            'code-path': 'src/sections/TelegramBanner.tsx:80:15',
                            className:
                              'inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full',
                            children: [
                              i.jsx(Wn, {
                                'code-path': 'src/sections/TelegramBanner.tsx:81:17',
                                className: 'w-3 h-3',
                              }),
                              ' Мгновенные уведомления',
                            ],
                          }),
                          i.jsxs('span', {
                            'code-path': 'src/sections/TelegramBanner.tsx:83:15',
                            className:
                              'inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full',
                            children: [
                              i.jsx(Yx, {
                                'code-path': 'src/sections/TelegramBanner.tsx:84:17',
                                className: 'w-3 h-3',
                              }),
                              ' Эксклюзивные промокоды',
                            ],
                          }),
                          i.jsxs('span', {
                            'code-path': 'src/sections/TelegramBanner.tsx:86:15',
                            className:
                              'inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full',
                            children: [
                              i.jsx(xx, {
                                'code-path': 'src/sections/TelegramBanner.tsx:87:17',
                                className: 'w-3 h-3',
                              }),
                              ' Анонсы распродаж',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  i.jsxs('a', {
                    'code-path': 'src/sections/TelegramBanner.tsx:92:11',
                    href: 'https://t.me/SmartRuMarket',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0099dd] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[#0088cc]/20',
                    children: [
                      'Подписаться',
                      i.jsx($n, {
                        'code-path': 'src/sections/TelegramBanner.tsx:99:13',
                        className: 'w-4 h-4',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
}
function y2({ promos: c, faq: d }) {
  const [u, o] = L.useState(null),
    [p, m] = L.useState('all'),
    g = (E, H) => {
      (navigator.clipboard.writeText(E).catch(() => {}), o(H), setTimeout(() => o(null), 2e3));
    },
    S = ['all', ...new Set(c.map((E) => E.category))],
    y = {
      all: 'Все',
      electronics: 'Электроника',
      clothing: 'Одежда',
      shoes: 'Обувь',
      home: 'Дом',
      auto: 'Авто',
      sport: 'Спорт',
      beauty: 'Красота',
    },
    h = p === 'all' ? c : c.filter((E) => E.category === p);
  return i.jsxs('div', {
    'code-path': 'src/sections/PromoCodesSection.tsx:29:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
    children: [
      i.jsxs('div', {
        'code-path': 'src/sections/PromoCodesSection.tsx:31:7',
        className: 'text-center mb-8 sm:mb-10',
        children: [
          i.jsxs('div', {
            'code-path': 'src/sections/PromoCodesSection.tsx:32:9',
            className:
              'inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4',
            children: [
              i.jsx(Fa, {
                'code-path': 'src/sections/PromoCodesSection.tsx:33:11',
                className: 'w-4 h-4 text-cyan-400',
              }),
              i.jsx('span', {
                'code-path': 'src/sections/PromoCodesSection.tsx:34:11',
                className: 'text-sm font-semibold text-cyan-300',
                children: 'Промокоды и купоны',
              }),
            ],
          }),
          i.jsx('h1', {
            'code-path': 'src/sections/PromoCodesSection.tsx:36:9',
            className: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3',
            children: 'Промокоды AliExpress 2026',
          }),
          i.jsx('p', {
            'code-path': 'src/sections/PromoCodesSection.tsx:39:9',
            className: 'text-sm sm:text-base text-slate-400 max-w-2xl mx-auto',
            children:
              'Актуальные промокоды и купоны AliExpress. Копируйте коды и применяйте при оформлении заказа для дополнительной экономии.',
          }),
        ],
      }),
      i.jsx('div', {
        'code-path': 'src/sections/PromoCodesSection.tsx:45:7',
        className: 'flex flex-wrap justify-center gap-2 mb-6 sm:mb-8',
        children: S.map((E) =>
          i.jsx(
            'button',
            {
              'code-path': 'src/sections/PromoCodesSection.tsx:47:11',
              onClick: () => m(E),
              className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${p === E ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`,
              children: y[E] || E,
            },
            E
          )
        ),
      }),
      i.jsx('div', {
        'code-path': 'src/sections/PromoCodesSection.tsx:58:7',
        className: 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 sm:mb-14',
        children: h.map((E) =>
          i.jsxs(
            'div',
            {
              'code-path': 'src/sections/PromoCodesSection.tsx:60:11',
              className:
                'relative bg-[#1e293b] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-0.5',
              children: [
                E.isNew &&
                  i.jsx('span', {
                    'code-path': 'src/sections/PromoCodesSection.tsx:65:15',
                    className:
                      'absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full',
                    children: 'NEW',
                  }),
                i.jsxs('div', {
                  'code-path': 'src/sections/PromoCodesSection.tsx:70:13',
                  className: 'flex items-start gap-3 mb-3',
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:71:15',
                      className:
                        'w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0',
                      children: i.jsx(Fa, {
                        'code-path': 'src/sections/PromoCodesSection.tsx:72:17',
                        className: 'w-5 h-5 text-cyan-400',
                      }),
                    }),
                    i.jsxs('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:74:15',
                      children: [
                        i.jsx('h3', {
                          'code-path': 'src/sections/PromoCodesSection.tsx:75:17',
                          className: 'text-base font-bold text-white',
                          children: E.discount,
                        }),
                        i.jsx('p', {
                          'code-path': 'src/sections/PromoCodesSection.tsx:76:17',
                          className: 'text-xs text-slate-400 mt-0.5',
                          children: E.description,
                        }),
                      ],
                    }),
                  ],
                }),
                i.jsxs('div', {
                  'code-path': 'src/sections/PromoCodesSection.tsx:80:13',
                  className: 'bg-[#0f172a] rounded-xl p-3 mb-3 flex items-center justify-between',
                  children: [
                    i.jsx('code', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:81:15',
                      className: 'text-sm font-mono font-bold text-cyan-400',
                      children: E.code,
                    }),
                    i.jsxs('button', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:82:15',
                      onClick: () => g(E.code, E.id),
                      className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${u === E.id ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`,
                      children: [
                        u === E.id
                          ? i.jsx(yr, {
                              'code-path': 'src/sections/PromoCodesSection.tsx:86:42',
                              className: 'w-3 h-3',
                            })
                          : i.jsx(zx, {
                              'code-path': 'src/sections/PromoCodesSection.tsx:86:74',
                              className: 'w-3 h-3',
                            }),
                        u === E.id ? 'Скопировано' : 'Копировать',
                      ],
                    }),
                  ],
                }),
                i.jsxs('div', {
                  'code-path': 'src/sections/PromoCodesSection.tsx:91:13',
                  className: 'space-y-1.5 text-xs text-slate-500',
                  children: [
                    i.jsxs('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:92:15',
                      className: 'flex items-center gap-1.5',
                      children: [
                        i.jsx(_c, {
                          'code-path': 'src/sections/PromoCodesSection.tsx:93:17',
                          className: 'w-3 h-3',
                        }),
                        'Мин. заказ: ',
                        E.minOrder.toLocaleString('ru'),
                        ' ₽',
                      ],
                    }),
                    i.jsxs('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:96:15',
                      className: 'flex items-center gap-1.5',
                      children: [
                        i.jsx(jc, {
                          'code-path': 'src/sections/PromoCodesSection.tsx:97:17',
                          className: 'w-3 h-3',
                        }),
                        'До: ',
                        E.expiry,
                      ],
                    }),
                    i.jsxs('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:100:15',
                      className: 'flex items-center gap-1.5',
                      children: [
                        i.jsx(Zm, {
                          'code-path': 'src/sections/PromoCodesSection.tsx:101:17',
                          className: 'w-3 h-3',
                        }),
                        'Категория: ',
                        y[E.category] || E.category,
                      ],
                    }),
                  ],
                }),
              ],
            },
            E.id
          )
        ),
      }),
      i.jsxs('div', {
        'code-path': 'src/sections/PromoCodesSection.tsx:110:7',
        className:
          'bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-5 sm:p-8 mb-10',
        children: [
          i.jsxs('h2', {
            'code-path': 'src/sections/PromoCodesSection.tsx:111:9',
            className: 'text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2',
            children: [
              i.jsx(Zm, {
                'code-path': 'src/sections/PromoCodesSection.tsx:112:11',
                className: 'w-5 h-5 text-cyan-400',
              }),
              'Как использовать промокоды и купоны AliExpress',
            ],
          }),
          i.jsx('div', {
            'code-path': 'src/sections/PromoCodesSection.tsx:115:9',
            className: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
            children: [
              {
                step: '1',
                title: 'Выберите товар',
                desc: 'Найдите нужный товар в нашем каталоге и перейдите на страницу товара.',
              },
              {
                step: '2',
                title: 'Скопируйте код',
                desc: 'Нажмите "Копировать" рядом с подходящим промокодом на этой странице.',
              },
              {
                step: '3',
                title: 'Перейдите на AliExpress',
                desc: 'Нажмите "На AliExpress" в карточке товара и добавьте товар в корзину.',
              },
              {
                step: '4',
                title: 'Примените код',
                desc: 'При оформлении заказа вставьте промокод в поле "Код купона" и нажмите "Применить".',
              },
            ].map((E) =>
              i.jsxs(
                'div',
                {
                  'code-path': 'src/sections/PromoCodesSection.tsx:122:13',
                  className: 'flex gap-3',
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:123:15',
                      className:
                        'w-8 h-8 shrink-0 bg-cyan-500/10 rounded-lg flex items-center justify-center',
                      children: i.jsx('span', {
                        'code-path': 'src/sections/PromoCodesSection.tsx:124:17',
                        className: 'text-sm font-bold text-cyan-400',
                        children: E.step,
                      }),
                    }),
                    i.jsxs('div', {
                      'code-path': 'src/sections/PromoCodesSection.tsx:126:15',
                      children: [
                        i.jsx('h4', {
                          'code-path': 'src/sections/PromoCodesSection.tsx:127:17',
                          className: 'text-sm font-semibold text-white mb-1',
                          children: E.title,
                        }),
                        i.jsx('p', {
                          'code-path': 'src/sections/PromoCodesSection.tsx:128:17',
                          className: 'text-xs text-slate-400 leading-relaxed',
                          children: E.desc,
                        }),
                      ],
                    }),
                  ],
                },
                E.step
              )
            ),
          }),
        ],
      }),
      d &&
        d.length > 0 &&
        i.jsxs('div', {
          'code-path': 'src/sections/PromoCodesSection.tsx:137:9',
          className: 'bg-[#1e293b]/40 border border-slate-700/30 rounded-2xl p-5 sm:p-8',
          children: [
            i.jsx('h2', {
              'code-path': 'src/sections/PromoCodesSection.tsx:138:11',
              className: 'text-lg sm:text-xl font-bold text-white mb-5',
              children: 'Частые вопросы о промокодах',
            }),
            i.jsx('div', {
              'code-path': 'src/sections/PromoCodesSection.tsx:139:11',
              className: 'space-y-4',
              children: d.map((E, H) =>
                i.jsxs(
                  'details',
                  {
                    'code-path': 'src/sections/PromoCodesSection.tsx:141:15',
                    className: 'group bg-[#0f172a]/50 rounded-xl overflow-hidden',
                    children: [
                      i.jsxs('summary', {
                        'code-path': 'src/sections/PromoCodesSection.tsx:142:17',
                        className: 'flex items-center justify-between p-4 cursor-pointer list-none',
                        children: [
                          i.jsx('span', {
                            'code-path': 'src/sections/PromoCodesSection.tsx:143:19',
                            className: 'text-sm font-medium text-white pr-4',
                            children: E.question,
                          }),
                          i.jsx('span', {
                            'code-path': 'src/sections/PromoCodesSection.tsx:144:19',
                            className:
                              'w-6 h-6 shrink-0 bg-cyan-500/10 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform',
                            children: i.jsx('svg', {
                              'code-path': 'src/sections/PromoCodesSection.tsx:145:21',
                              className: 'w-3 h-3 text-cyan-400',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              children: i.jsx('path', {
                                'code-path': 'src/sections/PromoCodesSection.tsx:146:23',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M19 9l-7 7-7-7',
                              }),
                            }),
                          }),
                        ],
                      }),
                      i.jsx('div', {
                        'code-path': 'src/sections/PromoCodesSection.tsx:150:17',
                        className: 'px-4 pb-4 text-sm text-slate-400 leading-relaxed',
                        children: E.answer,
                      }),
                    ],
                  },
                  H
                )
              ),
            }),
          ],
        }),
    ],
  });
}
function b2({ posts: c, products: d, favorites: u, onToggleFavorite: o, onProductClick: p }) {
  const [m, g] = L.useState(null);
  return m
    ? i.jsxs('div', {
        'code-path': 'src/sections/BlogSection.tsx:19:7',
        className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
        children: [
          i.jsxs('button', {
            'code-path': 'src/sections/BlogSection.tsx:20:9',
            onClick: () => g(null),
            className:
              'inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4',
            children: [
              i.jsx(Nx, {
                'code-path': 'src/sections/BlogSection.tsx:24:11',
                className: 'w-4 h-4',
              }),
              'Назад к статьям',
            ],
          }),
          i.jsxs('article', {
            'code-path': 'src/sections/BlogSection.tsx:28:9',
            className: 'max-w-4xl',
            children: [
              i.jsxs('div', {
                'code-path': 'src/sections/BlogSection.tsx:29:11',
                className: 'flex items-center gap-2 mb-3',
                children: [
                  i.jsx('span', {
                    'code-path': 'src/sections/BlogSection.tsx:30:13',
                    className: 'text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full',
                    children: m.category,
                  }),
                  i.jsxs('span', {
                    'code-path': 'src/sections/BlogSection.tsx:31:13',
                    className: 'flex items-center gap-1 text-xs text-slate-500',
                    children: [
                      i.jsx(N0, {
                        'code-path': 'src/sections/BlogSection.tsx:32:15',
                        className: 'w-3 h-3',
                      }),
                      ' ',
                      m.date,
                    ],
                  }),
                  i.jsxs('span', {
                    'code-path': 'src/sections/BlogSection.tsx:34:13',
                    className: 'flex items-center gap-1 text-xs text-slate-500',
                    children: [
                      i.jsx(jc, {
                        'code-path': 'src/sections/BlogSection.tsx:35:15',
                        className: 'w-3 h-3',
                      }),
                      ' ',
                      m.readTime,
                    ],
                  }),
                ],
              }),
              i.jsx('h1', {
                'code-path': 'src/sections/BlogSection.tsx:39:11',
                className: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4',
                children: m.title,
              }),
              i.jsx('p', {
                'code-path': 'src/sections/BlogSection.tsx:43:11',
                className: 'text-base sm:text-lg text-slate-400 mb-6 leading-relaxed',
                children: m.excerpt,
              }),
              i.jsx('img', {
                'code-path': 'src/sections/BlogSection.tsx:47:11',
                src: m.image,
                alt: m.title,
                className: 'w-full aspect-[2/1] object-cover rounded-2xl mb-6 sm:mb-8',
              }),
              i.jsx('div', {
                'code-path': 'src/sections/BlogSection.tsx:54:11',
                className: 'space-y-4 sm:space-y-6',
                children: m.content.map((S, y) => {
                  if (S.type === 'h2')
                    return i.jsx(
                      'h2',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:57:24',
                        className: 'text-xl sm:text-2xl font-bold text-white mt-8',
                        children: S.content,
                      },
                      y
                    );
                  if (S.type === 'h3')
                    return i.jsx(
                      'h3',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:60:24',
                        className: 'text-lg sm:text-xl font-semibold text-white mt-6',
                        children: S.content,
                      },
                      y
                    );
                  if (S.type === 'p')
                    return i.jsx(
                      'p',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:63:24',
                        className: 'text-sm sm:text-base text-slate-400 leading-relaxed',
                        dangerouslySetInnerHTML: { __html: S.content },
                      },
                      y
                    );
                  if (S.type === 'promo-block')
                    return i.jsxs(
                      'div',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:67:19',
                        className:
                          'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 my-6',
                        children: [
                          i.jsx('h4', {
                            'code-path': 'src/sections/BlogSection.tsx:68:21',
                            className: 'text-base font-bold text-white mb-3',
                            children: 'Актуальные промокоды AliExpress',
                          }),
                          i.jsx('div', {
                            'code-path': 'src/sections/BlogSection.tsx:69:21',
                            className: 'flex flex-wrap gap-2',
                            children: ['NEWUSER50', 'TECH30', 'HOME20', 'SHOES15'].map((h) =>
                              i.jsx(
                                'span',
                                {
                                  'code-path': 'src/sections/BlogSection.tsx:71:25',
                                  className:
                                    'px-3 py-1.5 bg-[#0f172a] text-cyan-400 text-sm font-mono rounded-lg border border-cyan-500/20',
                                  children: h,
                                },
                                h
                              )
                            ),
                          }),
                        ],
                      },
                      y
                    );
                  if (S.type === 'tip')
                    return i.jsx(
                      'div',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:81:19',
                        className:
                          'bg-amber-500/5 border-l-4 border-amber-400 rounded-r-xl p-4 sm:p-5 my-4',
                        children: i.jsx('p', {
                          'code-path': 'src/sections/BlogSection.tsx:82:21',
                          className: 'text-sm text-amber-300/90 leading-relaxed',
                          children: S.content,
                        }),
                      },
                      y
                    );
                  if (S.type === 'product-grid') {
                    const h = d.slice(0, 3);
                    return i.jsxs(
                      'div',
                      {
                        'code-path': 'src/sections/BlogSection.tsx:89:19',
                        className: 'my-6',
                        children: [
                          i.jsx('h4', {
                            'code-path': 'src/sections/BlogSection.tsx:90:21',
                            className: 'text-base font-bold text-white mb-3',
                            children: 'Рекомендуемые товары',
                          }),
                          i.jsx('div', {
                            'code-path': 'src/sections/BlogSection.tsx:91:21',
                            className: 'grid grid-cols-1 sm:grid-cols-3 gap-3',
                            children: h.map((E) =>
                              i.jsx(
                                Pn,
                                {
                                  'code-path': 'src/sections/BlogSection.tsx:93:25',
                                  product: E,
                                  isFavorite: u.includes(E.id),
                                  onToggleFavorite: o,
                                  onProductClick: p,
                                },
                                E.id
                              )
                            ),
                          }),
                        ],
                      },
                      y
                    );
                  }
                  return null;
                }),
              }),
              i.jsx('div', {
                'code-path': 'src/sections/BlogSection.tsx:110:11',
                className: 'mt-10 pt-6 border-t border-slate-700/30',
                children: i.jsxs('button', {
                  'code-path': 'src/sections/BlogSection.tsx:111:13',
                  onClick: () => g(null),
                  className:
                    'inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors',
                  children: [
                    i.jsx(Fn, {
                      'code-path': 'src/sections/BlogSection.tsx:115:15',
                      className: 'w-4 h-4 rotate-180',
                    }),
                    'Все статьи',
                  ],
                }),
              }),
            ],
          }),
        ],
      })
    : i.jsxs('div', {
        'code-path': 'src/sections/BlogSection.tsx:125:5',
        className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
        children: [
          i.jsxs('div', {
            'code-path': 'src/sections/BlogSection.tsx:127:7',
            className: 'text-center mb-8 sm:mb-10',
            children: [
              i.jsxs('div', {
                'code-path': 'src/sections/BlogSection.tsx:128:9',
                className:
                  'inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4',
                children: [
                  i.jsx(j0, {
                    'code-path': 'src/sections/BlogSection.tsx:129:11',
                    className: 'w-4 h-4 text-cyan-400',
                  }),
                  i.jsx('span', {
                    'code-path': 'src/sections/BlogSection.tsx:130:11',
                    className: 'text-sm font-semibold text-cyan-300',
                    children: 'Блог и советы',
                  }),
                ],
              }),
              i.jsx('h1', {
                'code-path': 'src/sections/BlogSection.tsx:132:9',
                className: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3',
                children: 'Советы по экономии на AliExpress',
              }),
              i.jsx('p', {
                'code-path': 'src/sections/BlogSection.tsx:135:9',
                className: 'text-sm sm:text-base text-slate-400 max-w-2xl mx-auto',
                children: 'Гайды, подборки, лайфхаки и секреты максимальной экономии на покупках',
              }),
            ],
          }),
          i.jsx('div', {
            'code-path': 'src/sections/BlogSection.tsx:141:7',
            className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
            children: c.map((S) =>
              i.jsxs(
                'button',
                {
                  'code-path': 'src/sections/BlogSection.tsx:143:11',
                  onClick: () => g(S),
                  className:
                    'group text-left bg-[#1e293b] hover:bg-[#23304a] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1',
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/BlogSection.tsx:148:13',
                      className: 'aspect-[2/1] overflow-hidden',
                      children: i.jsx('img', {
                        'code-path': 'src/sections/BlogSection.tsx:149:15',
                        src: S.image,
                        alt: S.title,
                        className:
                          'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
                        loading: 'lazy',
                      }),
                    }),
                    i.jsxs('div', {
                      'code-path': 'src/sections/BlogSection.tsx:156:13',
                      className: 'p-4 sm:p-5',
                      children: [
                        i.jsxs('div', {
                          'code-path': 'src/sections/BlogSection.tsx:157:15',
                          className: 'flex items-center gap-2 mb-2',
                          children: [
                            i.jsx('span', {
                              'code-path': 'src/sections/BlogSection.tsx:158:17',
                              className:
                                'text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full',
                              children: S.category,
                            }),
                            i.jsxs('span', {
                              'code-path': 'src/sections/BlogSection.tsx:159:17',
                              className: 'flex items-center gap-1 text-xs text-slate-500',
                              children: [
                                i.jsx(jc, {
                                  'code-path': 'src/sections/BlogSection.tsx:160:19',
                                  className: 'w-3 h-3',
                                }),
                                ' ',
                                S.readTime,
                              ],
                            }),
                          ],
                        }),
                        i.jsx('h3', {
                          'code-path': 'src/sections/BlogSection.tsx:163:15',
                          className:
                            'text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2',
                          children: S.title,
                        }),
                        i.jsx('p', {
                          'code-path': 'src/sections/BlogSection.tsx:166:15',
                          className: 'text-xs text-slate-400 line-clamp-2 leading-relaxed',
                          children: S.excerpt,
                        }),
                        i.jsxs('div', {
                          'code-path': 'src/sections/BlogSection.tsx:167:15',
                          className:
                            'flex items-center gap-1 mt-3 text-xs text-cyan-400 group-hover:text-cyan-300',
                          children: [
                            'Читать статью',
                            i.jsx(Fn, {
                              'code-path': 'src/sections/BlogSection.tsx:169:17',
                              className: 'w-3 h-3 group-hover:translate-x-0.5 transition-transform',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                S.id
              )
            ),
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/BlogSection.tsx:177:7',
            className:
              'mt-10 sm:mt-14 bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-5 sm:p-8',
            children: [
              i.jsx('h3', {
                'code-path': 'src/sections/BlogSection.tsx:178:9',
                className: 'text-lg sm:text-xl font-bold text-white mb-4',
                children: 'Популярные темы',
              }),
              i.jsx('div', {
                'code-path': 'src/sections/BlogSection.tsx:181:9',
                className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3',
                children: [
                  {
                    title: 'Как находить скидки до 90%',
                    desc: 'Полное руководство по поиску максимальных скидок',
                  },
                  { title: 'Промокоды AliExpress 2026', desc: 'Все актуальные коды и купоны' },
                  {
                    title: 'Товары для дома до 1000 ₽',
                    desc: 'Лучшие мелочи для дома по минимальной цене',
                  },
                  { title: 'Электроника со скидками', desc: 'Гаджеты, наушники, умный дом' },
                  { title: 'Размеры одежды и обуви', desc: 'Таблицы размеров и советы по выбору' },
                  { title: 'Защита от фейковых скидок', desc: 'Как проверить реальность экономии' },
                ].map((S, y) =>
                  i.jsxs(
                    'div',
                    {
                      'code-path': 'src/sections/BlogSection.tsx:190:13',
                      className:
                        'p-3 sm:p-4 bg-[#0f172a]/50 rounded-xl hover:bg-[#0f172a] transition-colors cursor-pointer',
                      children: [
                        i.jsx('h4', {
                          'code-path': 'src/sections/BlogSection.tsx:191:15',
                          className: 'text-sm font-medium text-white mb-0.5',
                          children: S.title,
                        }),
                        i.jsx('p', {
                          'code-path': 'src/sections/BlogSection.tsx:192:15',
                          className: 'text-xs text-slate-500',
                          children: S.desc,
                        }),
                      ],
                    },
                    y
                  )
                ),
              }),
            ],
          }),
        ],
      });
}
function v2({
  products: c,
  favorites: d,
  onToggleFavorite: u,
  onClearFavorites: o,
  onProductClick: p,
}) {
  const [m, g] = L.useState('discount'),
    S = L.useMemo(() => {
      const y = c.filter((h) => d.includes(h.id));
      switch (m) {
        case 'discount':
          return [...y].sort((h, E) => E.discount - h.discount);
        case 'price':
          return [...y].sort((h, E) => h.price - E.price);
        case 'date':
          return y;
        default:
          return y;
      }
    }, [c, d, m]);
  return d.length === 0
    ? i.jsxs('div', {
        'code-path': 'src/sections/FavoritesPage.tsx:31:7',
        className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/FavoritesPage.tsx:32:9',
            className:
              'w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4',
            children: i.jsx($a, {
              'code-path': 'src/sections/FavoritesPage.tsx:33:11',
              className: 'w-8 h-8 text-slate-600',
            }),
          }),
          i.jsx('h2', {
            'code-path': 'src/sections/FavoritesPage.tsx:35:9',
            className: 'text-xl font-bold text-white mb-2',
            children: 'Избранное пусто',
          }),
          i.jsx('p', {
            'code-path': 'src/sections/FavoritesPage.tsx:36:9',
            className: 'text-sm text-slate-400 max-w-md mx-auto',
            children:
              'Добавляйте товары в избранное, нажимая на сердечко в карточке товара. Все избранные товары сохраняются в вашем браузере.',
          }),
        ],
      })
    : i.jsxs('div', {
        'code-path': 'src/sections/FavoritesPage.tsx:45:5',
        className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
        children: [
          i.jsxs('div', {
            'code-path': 'src/sections/FavoritesPage.tsx:47:7',
            className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6',
            children: [
              i.jsxs('div', {
                'code-path': 'src/sections/FavoritesPage.tsx:48:9',
                className: 'flex items-center gap-2',
                children: [
                  i.jsx($a, {
                    'code-path': 'src/sections/FavoritesPage.tsx:49:11',
                    className: 'w-5 h-5 text-red-500 fill-red-500',
                  }),
                  i.jsxs('h1', {
                    'code-path': 'src/sections/FavoritesPage.tsx:50:11',
                    className: 'text-xl sm:text-2xl font-bold text-white',
                    children: [
                      'Избранное ',
                      i.jsxs('span', {
                        'code-path': 'src/sections/FavoritesPage.tsx:51:23',
                        className: 'text-slate-500 text-base font-normal',
                        children: ['(', d.length, ')'],
                      }),
                    ],
                  }),
                ],
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/FavoritesPage.tsx:54:9',
                className: 'flex items-center gap-2',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/FavoritesPage.tsx:56:11',
                    className:
                      'flex items-center bg-[#1e293b] border border-slate-700/30 rounded-xl overflow-hidden',
                    children: [
                      i.jsx('span', {
                        'code-path': 'src/sections/FavoritesPage.tsx:57:13',
                        className: 'px-3 text-xs text-slate-500 border-r border-slate-700/30',
                        children: 'Сортировка',
                      }),
                      [
                        { mode: 'discount', label: 'По скидке' },
                        { mode: 'price', label: 'По цене' },
                        { mode: 'date', label: 'По дате' },
                      ].map((y) =>
                        i.jsx(
                          'button',
                          {
                            'code-path': 'src/sections/FavoritesPage.tsx:63:15',
                            onClick: () => g(y.mode),
                            className: `px-3 py-2 text-xs font-medium transition-colors ${m === y.mode ? 'bg-cyan-500/15 text-cyan-400' : 'text-slate-400 hover:text-white'}`,
                            children: y.label,
                          },
                          y.mode
                        )
                      ),
                    ],
                  }),
                  i.jsxs('button', {
                    'code-path': 'src/sections/FavoritesPage.tsx:72:11',
                    onClick: o,
                    className:
                      'flex items-center gap-1.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors',
                    children: [
                      i.jsx(jg, {
                        'code-path': 'src/sections/FavoritesPage.tsx:76:13',
                        className: 'w-3.5 h-3.5',
                      }),
                      'Очистить',
                    ],
                  }),
                ],
              }),
            ],
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/FavoritesPage.tsx:83:7',
            className:
              'flex items-start gap-2.5 p-3 sm:p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5 sm:mb-6',
            children: [
              i.jsx(_g, {
                'code-path': 'src/sections/FavoritesPage.tsx:84:9',
                className: 'w-4 h-4 text-amber-400 shrink-0 mt-0.5',
              }),
              i.jsx('p', {
                'code-path': 'src/sections/FavoritesPage.tsx:85:9',
                className: 'text-xs text-amber-300/80',
                children:
                  'Цены и скидки обновляются ежедневно. Если товар подорожал — скидка может быть уже неактуальной. Всегда проверяйте финальную цену на странице AliExpress перед покупкой.',
              }),
            ],
          }),
          i.jsx('div', {
            'code-path': 'src/sections/FavoritesPage.tsx:92:7',
            className: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4',
            children: S.map((y) =>
              i.jsx(
                Pn,
                {
                  'code-path': 'src/sections/FavoritesPage.tsx:94:11',
                  product: y,
                  isFavorite: !0,
                  onToggleFavorite: u,
                  onProductClick: p,
                },
                y.id
              )
            ),
          }),
          i.jsx('div', {
            'code-path': 'src/sections/FavoritesPage.tsx:105:7',
            className: 'mt-8 text-center',
            children: i.jsxs('p', {
              'code-path': 'src/sections/FavoritesPage.tsx:106:9',
              className: 'text-xs text-slate-500 flex items-center justify-center gap-1.5',
              children: [
                i.jsx(fg, {
                  'code-path': 'src/sections/FavoritesPage.tsx:107:11',
                  className: 'w-3.5 h-3.5',
                }),
                'Избранное сохраняется в вашем браузере и доступно только на этом устройстве',
              ],
            }),
          }),
        ],
      });
}
function S2({ product: c, isFavorite: d, onToggleFavorite: u, onBack: o }) {
  L.useEffect(() => {
    Fy({ id: c.id, title: c.title, price: c.price });
  }, [c]);
  const p = c.oldPrice - c.price;
  return i.jsxs('div', {
    'code-path': 'src/sections/ProductPage.tsx:21:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8',
    children: [
      i.jsxs('button', {
        'code-path': 'src/sections/ProductPage.tsx:23:7',
        onClick: o,
        className:
          'inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4',
        children: [
          i.jsx(rx, { 'code-path': 'src/sections/ProductPage.tsx:27:9', className: 'w-4 h-4' }),
          'Назад в каталог',
        ],
      }),
      i.jsxs('div', {
        'code-path': 'src/sections/ProductPage.tsx:31:7',
        className: 'grid lg:grid-cols-2 gap-6 lg:gap-10',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/ProductPage.tsx:33:9',
            className: 'bg-[#1e293b] border border-slate-700/50 rounded-2xl overflow-hidden',
            children: i.jsx('div', {
              'code-path': 'src/sections/ProductPage.tsx:34:11',
              className: 'aspect-square',
              children: i.jsx('img', {
                'code-path': 'src/sections/ProductPage.tsx:35:13',
                src: c.image,
                alt: c.title,
                className: 'w-full h-full object-cover',
              }),
            }),
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/ProductPage.tsx:44:9',
            className: 'flex flex-col',
            children: [
              c.badges.length > 0 &&
                i.jsx('div', {
                  'code-path': 'src/sections/ProductPage.tsx:47:13',
                  className: 'flex flex-wrap gap-2 mb-3',
                  children: c.badges.map((m) => {
                    const g = {
                        bestseller: 'Хит продаж',
                        topRated: 'Лучший рейтинг',
                        bestPrice: 'Лучшая цена',
                        flash: 'Флеш-скидка',
                        new: 'Новинка',
                      },
                      S = {
                        bestseller: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                        topRated: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                        bestPrice: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                        flash: 'bg-red-500/20 text-red-400 border-red-500/30',
                        new: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                      };
                    return i.jsx(
                      'span',
                      {
                        'code-path': 'src/sections/ProductPage.tsx:64:19',
                        className: `text-xs font-medium px-2.5 py-1 rounded-full border ${S[m] || ''}`,
                        children: g[m] || m,
                      },
                      m
                    );
                  }),
                }),
              i.jsx('h1', {
                'code-path': 'src/sections/ProductPage.tsx:72:11',
                className: 'text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2',
                children: c.title,
              }),
              c.subtitle &&
                i.jsx('p', {
                  'code-path': 'src/sections/ProductPage.tsx:77:13',
                  className: 'text-sm sm:text-base text-slate-400 mb-4',
                  children: c.subtitle,
                }),
              i.jsxs('div', {
                'code-path': 'src/sections/ProductPage.tsx:81:11',
                className: 'flex items-center gap-4 mb-5 text-sm text-slate-400',
                children: [
                  i.jsxs('span', {
                    'code-path': 'src/sections/ProductPage.tsx:82:13',
                    className: 'flex items-center gap-1',
                    children: [
                      i.jsx(C0, {
                        'code-path': 'src/sections/ProductPage.tsx:83:15',
                        className: 'w-4 h-4 text-amber-400 fill-amber-400',
                      }),
                      i.jsx('span', {
                        'code-path': 'src/sections/ProductPage.tsx:84:15',
                        className: 'text-white font-medium',
                        children: c.rating,
                      }),
                    ],
                  }),
                  i.jsxs('span', {
                    'code-path': 'src/sections/ProductPage.tsx:86:13',
                    className: 'flex items-center gap-1',
                    children: [
                      i.jsx(Sr, {
                        'code-path': 'src/sections/ProductPage.tsx:87:15',
                        className: 'w-4 h-4',
                      }),
                      c.orders,
                      ' заказов',
                    ],
                  }),
                  c.viewers > 0 &&
                    i.jsxs('span', {
                      'code-path': 'src/sections/ProductPage.tsx:91:15',
                      className: 'flex items-center gap-1 text-pink-400',
                      children: [
                        i.jsx(T0, {
                          'code-path': 'src/sections/ProductPage.tsx:92:17',
                          className: 'w-4 h-4',
                        }),
                        c.viewers,
                        ' смотрят',
                      ],
                    }),
                ],
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/ProductPage.tsx:99:11',
                className:
                  'bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-4 sm:p-5 mb-5',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/ProductPage.tsx:100:13',
                    className: 'flex items-baseline gap-3 mb-2',
                    children: [
                      i.jsxs('span', {
                        'code-path': 'src/sections/ProductPage.tsx:101:15',
                        className: 'text-3xl sm:text-4xl font-bold text-cyan-400',
                        children: [c.price.toLocaleString('ru'), ' ₽'],
                      }),
                      i.jsxs('span', {
                        'code-path': 'src/sections/ProductPage.tsx:102:15',
                        className: 'text-base sm:text-lg text-slate-500 line-through',
                        children: [c.oldPrice.toLocaleString('ru'), ' ₽'],
                      }),
                    ],
                  }),
                  i.jsxs('div', {
                    'code-path': 'src/sections/ProductPage.tsx:104:13',
                    className: 'flex items-center gap-2 text-sm',
                    children: [
                      i.jsxs('span', {
                        'code-path': 'src/sections/ProductPage.tsx:105:15',
                        className: 'bg-red-500 text-white font-bold px-2 py-0.5 rounded',
                        children: ['-', c.discount, '%'],
                      }),
                      i.jsxs('span', {
                        'code-path': 'src/sections/ProductPage.tsx:106:15',
                        className: 'text-emerald-400',
                        children: ['Экономия ', p.toLocaleString('ru'), ' ₽'],
                      }),
                    ],
                  }),
                ],
              }),
              c.tags.length > 0 &&
                i.jsx('div', {
                  'code-path': 'src/sections/ProductPage.tsx:112:13',
                  className: 'flex flex-wrap gap-2 mb-5',
                  children: c.tags.map((m) =>
                    i.jsxs(
                      'span',
                      {
                        'code-path': 'src/sections/ProductPage.tsx:114:17',
                        className:
                          'flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full',
                        children: [
                          i.jsx(Fa, {
                            'code-path': 'src/sections/ProductPage.tsx:115:19',
                            className: 'w-3 h-3',
                          }),
                          m,
                        ],
                      },
                      m
                    )
                  ),
                }),
              c.features.length > 0 &&
                i.jsxs('div', {
                  'code-path': 'src/sections/ProductPage.tsx:124:13',
                  className: 'mb-5',
                  children: [
                    i.jsx('h3', {
                      'code-path': 'src/sections/ProductPage.tsx:125:15',
                      className: 'text-sm font-semibold text-white mb-2',
                      children: 'Характеристики',
                    }),
                    i.jsx('ul', {
                      'code-path': 'src/sections/ProductPage.tsx:126:15',
                      className: 'space-y-1.5',
                      children: c.features.map((m, g) =>
                        i.jsxs(
                          'li',
                          {
                            'code-path': 'src/sections/ProductPage.tsx:128:19',
                            className: 'flex items-start gap-2 text-sm text-slate-400',
                            children: [
                              i.jsx(yr, {
                                'code-path': 'src/sections/ProductPage.tsx:129:21',
                                className: 'w-4 h-4 text-emerald-400 shrink-0 mt-0.5',
                              }),
                              m,
                            ],
                          },
                          g
                        )
                      ),
                    }),
                  ],
                }),
              i.jsxs('div', {
                'code-path': 'src/sections/ProductPage.tsx:138:11',
                className: 'space-y-2 mb-6 text-sm text-slate-400',
                children: [
                  i.jsxs('div', {
                    'code-path': 'src/sections/ProductPage.tsx:139:13',
                    className: 'flex items-center gap-2',
                    children: [
                      i.jsx(bg, {
                        'code-path': 'src/sections/ProductPage.tsx:140:15',
                        className: 'w-4 h-4 text-slate-500',
                      }),
                      'Магазин: ',
                      i.jsx('span', {
                        'code-path': 'src/sections/ProductPage.tsx:141:24',
                        className: 'text-white',
                        children: c.shopName,
                      }),
                    ],
                  }),
                  i.jsxs('div', {
                    'code-path': 'src/sections/ProductPage.tsx:143:13',
                    className: 'flex items-center gap-2',
                    children: [
                      i.jsx(Og, {
                        'code-path': 'src/sections/ProductPage.tsx:144:15',
                        className: 'w-4 h-4 text-slate-500',
                      }),
                      'Доставка: ',
                      i.jsx('span', {
                        'code-path': 'src/sections/ProductPage.tsx:145:25',
                        className: 'text-emerald-400',
                        children: c.shipping,
                      }),
                    ],
                  }),
                ],
              }),
              i.jsxs('div', {
                'code-path': 'src/sections/ProductPage.tsx:150:11',
                className: 'flex flex-col sm:flex-row gap-3 mt-auto',
                children: [
                  i.jsxs('a', {
                    'code-path': 'src/sections/ProductPage.tsx:151:13',
                    href: c.affiliateLink,
                    target: '_blank',
                    rel: 'noopener noreferrer sponsored nofollow',
                    onClick: () => K0({ id: c.id, title: c.title, price: c.price }),
                    className:
                      'flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-base font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20',
                    children: [
                      i.jsx(_c, {
                        'code-path': 'src/sections/ProductPage.tsx:158:15',
                        className: 'w-5 h-5',
                      }),
                      'Перейти на AliExpress',
                    ],
                  }),
                  i.jsxs('button', {
                    'code-path': 'src/sections/ProductPage.tsx:161:13',
                    onClick: () => u(c.id),
                    className: `flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium transition-colors ${d ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-700 text-white hover:bg-slate-600'}`,
                    children: [
                      i.jsx($a, {
                        'code-path': 'src/sections/ProductPage.tsx:169:15',
                        className: `w-5 h-5 ${d ? 'fill-white' : ''}`,
                      }),
                      d ? 'В избранном' : 'В избранное',
                    ],
                  }),
                  i.jsxs('button', {
                    'code-path': 'src/sections/ProductPage.tsx:172:13',
                    onClick: () => {
                      navigator.share
                        ? navigator.share({ title: c.title, url: window.location.href })
                        : navigator.clipboard.writeText(window.location.href);
                    },
                    className:
                      'flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors',
                    children: [
                      i.jsx(ig, {
                        'code-path': 'src/sections/ProductPage.tsx:182:15',
                        className: 'w-5 h-5',
                      }),
                      'Поделиться',
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function j2({ query: c, results: d, favorites: u, onToggleFavorite: o, onProductClick: p }) {
  return i.jsxs('div', {
    'code-path': 'src/sections/AISearchResults.tsx:15:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
    children: [
      i.jsxs('div', {
        'code-path': 'src/sections/AISearchResults.tsx:16:7',
        className: 'flex items-center gap-2 mb-6',
        children: [
          i.jsx('div', {
            'code-path': 'src/sections/AISearchResults.tsx:17:9',
            className:
              'w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center',
            children: i.jsx(vr, {
              'code-path': 'src/sections/AISearchResults.tsx:18:11',
              className: 'w-5 h-5 text-cyan-400',
            }),
          }),
          i.jsxs('div', {
            'code-path': 'src/sections/AISearchResults.tsx:20:9',
            children: [
              i.jsx('h1', {
                'code-path': 'src/sections/AISearchResults.tsx:21:11',
                className: 'text-xl sm:text-2xl font-bold text-white',
                children: 'Результаты AI-поиска',
              }),
              i.jsxs('p', {
                'code-path': 'src/sections/AISearchResults.tsx:22:11',
                className: 'text-sm text-slate-400',
                children: [
                  'По запросу "',
                  i.jsx('span', {
                    'code-path': 'src/sections/AISearchResults.tsx:23:25',
                    className: 'text-cyan-400',
                    children: c,
                  }),
                  '" найдено ',
                  d.length,
                  ' товаров',
                ],
              }),
            ],
          }),
        ],
      }),
      d.length > 0
        ? i.jsx('div', {
            'code-path': 'src/sections/AISearchResults.tsx:29:9',
            className: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4',
            children: d.map((m) =>
              i.jsx(
                Pn,
                {
                  'code-path': 'src/sections/AISearchResults.tsx:31:13',
                  product: m,
                  isFavorite: u.includes(m.id),
                  onToggleFavorite: o,
                  onProductClick: p,
                },
                m.id
              )
            ),
          })
        : i.jsxs('div', {
            'code-path': 'src/sections/AISearchResults.tsx:41:9',
            className: 'text-center py-16 sm:py-24',
            children: [
              i.jsx('div', {
                'code-path': 'src/sections/AISearchResults.tsx:42:11',
                className:
                  'w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4',
                children: i.jsx(ng, {
                  'code-path': 'src/sections/AISearchResults.tsx:43:13',
                  className: 'w-8 h-8 text-slate-500',
                }),
              }),
              i.jsx('h2', {
                'code-path': 'src/sections/AISearchResults.tsx:45:11',
                className: 'text-lg font-bold text-white mb-2',
                children: 'Ничего не найдено',
              }),
              i.jsx('p', {
                'code-path': 'src/sections/AISearchResults.tsx:46:11',
                className: 'text-sm text-slate-400 max-w-md mx-auto',
                children:
                  'Попробуйте изменить запрос. Например: "беспроводные наушники", "коврик для мыши" или "зарядное устройство".',
              }),
            ],
          }),
    ],
  });
}
function N2() {
  const c = [
      { name: 'Электроника', slug: 'electronics' },
      { name: 'Одежда', slug: 'clothing' },
      { name: 'Обувь', slug: 'shoes' },
      { name: 'Товары для дома', slug: 'home' },
      { name: 'Автотовары', slug: 'auto' },
      { name: 'Красота', slug: 'beauty' },
      { name: 'Спорт', slug: 'sport' },
    ],
    d = [
      { name: 'О нас', slug: 'about' },
      { name: 'Контакты', slug: 'contacts' },
      { name: 'Политика конфиденциальности', slug: 'privacy' },
      { name: 'Условия использования', slug: 'terms' },
    ],
    u = [
      { name: 'Промокоды AliExpress', slug: 'promo' },
      { name: 'Промокод для первого заказа', slug: 'promo/first-order' },
      { name: 'Чёрная пятница 2026', slug: 'promo/black-friday' },
      { name: 'Распродажа 11.11', slug: 'promo/11-11' },
      { name: 'Киберпонедельник', slug: 'promo/cyber-monday' },
    ];
  return i.jsx('footer', {
    'code-path': 'src/sections/Footer.tsx:30:5',
    className: 'bg-[#0a0f1c] border-t border-slate-700/30',
    children: i.jsxs('div', {
      'code-path': 'src/sections/Footer.tsx:31:7',
      className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14',
      children: [
        i.jsxs('div', {
          'code-path': 'src/sections/Footer.tsx:32:9',
          className: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10',
          children: [
            i.jsxs('div', {
              'code-path': 'src/sections/Footer.tsx:34:11',
              className: 'sm:col-span-2 lg:col-span-1',
              children: [
                i.jsxs('div', {
                  'code-path': 'src/sections/Footer.tsx:35:13',
                  className: 'flex items-center gap-2 mb-3',
                  children: [
                    i.jsx('div', {
                      'code-path': 'src/sections/Footer.tsx:36:15',
                      className:
                        'w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center',
                      children: i.jsx(Wn, {
                        'code-path': 'src/sections/Footer.tsx:37:17',
                        className: 'w-4 h-4 text-white',
                      }),
                    }),
                    i.jsxs('span', {
                      'code-path': 'src/sections/Footer.tsx:39:15',
                      className: 'text-lg font-bold text-white',
                      children: [
                        'Smart',
                        i.jsx('span', {
                          'code-path': 'src/sections/Footer.tsx:40:22',
                          className: 'text-cyan-400',
                          children: 'Skidka',
                        }),
                        '.ru',
                      ],
                    }),
                  ],
                }),
                i.jsx('p', {
                  'code-path': 'src/sections/Footer.tsx:43:13',
                  className: 'text-sm text-slate-400 leading-relaxed mb-4',
                  children:
                    'Лучшие скидки и промокоды на товары с AliExpress. Экономьте умнее — мы ежедневно отбираем самые выгодные предложения.',
                }),
                i.jsx('div', {
                  'code-path': 'src/sections/Footer.tsx:47:13',
                  className: 'flex items-center gap-2',
                  children: i.jsx('a', {
                    'code-path': 'src/sections/Footer.tsx:48:15',
                    href: 'https://t.me/SmartRuMarket',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'w-9 h-9 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 rounded-lg flex items-center justify-center transition-colors',
                    title: 'Telegram-канал',
                    children: i.jsx('svg', {
                      'code-path': 'src/sections/Footer.tsx:55:17',
                      className: 'w-4 h-4 text-[#0088cc]',
                      viewBox: '0 0 24 24',
                      fill: 'currentColor',
                      children: i.jsx('path', {
                        'code-path': 'src/sections/Footer.tsx:56:19',
                        d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
                      }),
                    }),
                  }),
                }),
              ],
            }),
            i.jsxs('div', {
              'code-path': 'src/sections/Footer.tsx:63:11',
              children: [
                i.jsx('h4', {
                  'code-path': 'src/sections/Footer.tsx:64:13',
                  className: 'text-sm font-bold text-white mb-3 uppercase tracking-wider',
                  children: 'Категории',
                }),
                i.jsx('ul', {
                  'code-path': 'src/sections/Footer.tsx:65:13',
                  className: 'space-y-2',
                  children: c.map((o) =>
                    i.jsx(
                      'li',
                      {
                        'code-path': 'src/sections/Footer.tsx:67:17',
                        children: i.jsx('span', {
                          'code-path': 'src/sections/Footer.tsx:68:19',
                          className:
                            'text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer',
                          children: o.name,
                        }),
                      },
                      o.slug
                    )
                  ),
                }),
              ],
            }),
            i.jsxs('div', {
              'code-path': 'src/sections/Footer.tsx:77:11',
              children: [
                i.jsx('h4', {
                  'code-path': 'src/sections/Footer.tsx:78:13',
                  className: 'text-sm font-bold text-white mb-3 uppercase tracking-wider',
                  children: 'Промокоды',
                }),
                i.jsx('ul', {
                  'code-path': 'src/sections/Footer.tsx:79:13',
                  className: 'space-y-2',
                  children: u.map((o) =>
                    i.jsx(
                      'li',
                      {
                        'code-path': 'src/sections/Footer.tsx:81:17',
                        children: i.jsxs('span', {
                          'code-path': 'src/sections/Footer.tsx:82:19',
                          className:
                            'text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1',
                          children: [
                            i.jsx(Km, {
                              'code-path': 'src/sections/Footer.tsx:83:21',
                              className: 'w-3 h-3',
                            }),
                            o.name,
                          ],
                        }),
                      },
                      o.slug
                    )
                  ),
                }),
              ],
            }),
            i.jsxs('div', {
              'code-path': 'src/sections/Footer.tsx:92:11',
              children: [
                i.jsx('h4', {
                  'code-path': 'src/sections/Footer.tsx:93:13',
                  className: 'text-sm font-bold text-white mb-3 uppercase tracking-wider',
                  children: 'Информация',
                }),
                i.jsx('ul', {
                  'code-path': 'src/sections/Footer.tsx:94:13',
                  className: 'space-y-2',
                  children: d.map((o) =>
                    i.jsx(
                      'li',
                      {
                        'code-path': 'src/sections/Footer.tsx:96:17',
                        children: i.jsxs('span', {
                          'code-path': 'src/sections/Footer.tsx:97:19',
                          className:
                            'text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1',
                          children: [
                            o.slug === 'contacts' &&
                              i.jsx($x, {
                                'code-path': 'src/sections/Footer.tsx:98:50',
                                className: 'w-3 h-3',
                              }),
                            o.slug === 'privacy' &&
                              i.jsx(rg, {
                                'code-path': 'src/sections/Footer.tsx:99:49',
                                className: 'w-3 h-3',
                              }),
                            o.slug === 'terms' &&
                              i.jsx(Km, {
                                'code-path': 'src/sections/Footer.tsx:100:47',
                                className: 'w-3 h-3',
                              }),
                            !['contacts', 'privacy', 'terms'].includes(o.slug) &&
                              i.jsx(A0, {
                                'code-path': 'src/sections/Footer.tsx:101:81',
                                className: 'w-3 h-3',
                              }),
                            o.name,
                          ],
                        }),
                      },
                      o.slug
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
        i.jsxs('div', {
          'code-path': 'src/sections/Footer.tsx:111:9',
          className: 'pt-6 border-t border-slate-700/30',
          children: [
            i.jsx('p', {
              'code-path': 'src/sections/Footer.tsx:112:11',
              className: 'text-xs text-slate-500 text-center leading-relaxed mb-3',
              children:
                'SmartSkidka.ru — не является магазином. Все товары продаются на AliExpress через партнёрскую программу Admitad. Мы получаем комиссию за переходы, что позволяет поддерживать сервис бесплатным для пользователей.',
            }),
            i.jsx('p', {
              'code-path': 'src/sections/Footer.tsx:116:11',
              className: 'text-xs text-slate-600 text-center',
              children: '© 2024–2026 SmartSkidka.ru. Все права защищены.',
            }),
          ],
        }),
      ],
    }),
  });
}
function A2({ title: c, paragraphs: d, keywords: u }) {
  return i.jsx('section', {
    'code-path': 'src/sections/SEOSection.tsx:9:5',
    className: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12',
    children: i.jsxs('div', {
      'code-path': 'src/sections/SEOSection.tsx:10:7',
      className: 'max-w-4xl',
      children: [
        i.jsx('h2', {
          'code-path': 'src/sections/SEOSection.tsx:11:9',
          className: 'text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6',
          children: c,
        }),
        i.jsx('div', {
          'code-path': 'src/sections/SEOSection.tsx:12:9',
          className: 'space-y-3 sm:space-y-4',
          children: d.map((o, p) =>
            i.jsx(
              'p',
              {
                'code-path': 'src/sections/SEOSection.tsx:14:13',
                className: 'text-sm sm:text-base text-slate-400 leading-relaxed',
                dangerouslySetInnerHTML: { __html: o },
              },
              p
            )
          ),
        }),
        u &&
          u.length > 0 &&
          i.jsx('div', {
            'code-path': 'src/sections/SEOSection.tsx:18:11',
            className:
              'flex flex-wrap gap-1.5 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-700/30',
            children: u.map((o, p) =>
              i.jsx(
                'span',
                {
                  'code-path': 'src/sections/SEOSection.tsx:20:15',
                  className: 'text-xs text-slate-500 bg-slate-700/30 px-2.5 py-1 rounded-full',
                  children: o,
                },
                p
              )
            ),
          }),
      ],
    }),
  });
}
function T2() {
  return (
    L.useEffect(() => {
      if (document.readyState === 'complete') ir();
      else
        return (window.addEventListener('load', ir), () => window.removeEventListener('load', ir));
    }, []),
    null
  );
}
function E2() {
  const [c, d] = L.useState(null),
    [u, o] = L.useState(!1),
    [p, m] = L.useState(() => typeof navigator < 'u' && !navigator.onLine);
  L.useEffect(() => {
    const y = (H) => {
        (H.preventDefault(), d(H), o(!0));
      },
      h = () => m(!1),
      E = () => m(!0);
    return (
      window.addEventListener('beforeinstallprompt', y),
      window.addEventListener('online', h),
      window.addEventListener('offline', E),
      () => {
        (window.removeEventListener('beforeinstallprompt', y),
          window.removeEventListener('online', h),
          window.removeEventListener('offline', E));
      }
    );
  }, []);
  const g = async () => {
      if (!c) return;
      c.prompt();
      const { outcome: y } = await c.userChoice;
      (y === 'accepted' && s2(), d(null), o(!1));
    },
    S = () => {
      o(!1);
    };
  return i.jsxs(i.Fragment, {
    children: [
      u &&
        i.jsx('div', {
          'code-path': 'src/components/PWAInstallPrompt.tsx:55:9',
          className:
            'fixed bottom-4 left-4 right-4 z-50 bg-[#1e293b] border border-cyan-500/30 rounded-2xl p-4 shadow-xl shadow-black/30 max-w-md mx-auto',
          children: i.jsxs('div', {
            'code-path': 'src/components/PWAInstallPrompt.tsx:56:11',
            className: 'flex items-center gap-3',
            children: [
              i.jsx('div', {
                'code-path': 'src/components/PWAInstallPrompt.tsx:57:13',
                className:
                  'w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shrink-0',
                children: i.jsx(Ox, {
                  'code-path': 'src/components/PWAInstallPrompt.tsx:58:15',
                  className: 'w-5 h-5 text-white',
                }),
              }),
              i.jsxs('div', {
                'code-path': 'src/components/PWAInstallPrompt.tsx:60:13',
                className: 'flex-1 min-w-0',
                children: [
                  i.jsx('p', {
                    'code-path': 'src/components/PWAInstallPrompt.tsx:61:15',
                    className: 'text-sm font-semibold text-white',
                    children: 'Установите SmartSkidka',
                  }),
                  i.jsx('p', {
                    'code-path': 'src/components/PWAInstallPrompt.tsx:62:15',
                    className: 'text-xs text-slate-400',
                    children: 'Быстрый доступ к скидкам на главном экране',
                  }),
                ],
              }),
              i.jsx('button', {
                'code-path': 'src/components/PWAInstallPrompt.tsx:64:13',
                onClick: g,
                className:
                  'px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-lg transition-colors shrink-0',
                children: 'Установить',
              }),
              i.jsx('button', {
                'code-path': 'src/components/PWAInstallPrompt.tsx:70:13',
                onClick: S,
                className: 'p-1.5 text-slate-400 hover:text-white transition-colors shrink-0',
                children: i.jsx(Ac, {
                  'code-path': 'src/components/PWAInstallPrompt.tsx:74:15',
                  className: 'w-4 h-4',
                }),
              }),
            ],
          }),
        }),
      p &&
        i.jsxs('div', {
          'code-path': 'src/components/PWAInstallPrompt.tsx:82:9',
          className:
            'fixed top-0 left-0 right-0 z-50 bg-red-500/90 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-1.5',
          children: [
            i.jsx(Dg, {
              'code-path': 'src/components/PWAInstallPrompt.tsx:83:11',
              className: 'w-3.5 h-3.5',
            }),
            'Нет подключения к интернету. Некоторые функции могут быть недоступны.',
          ],
        }),
    ],
  });
}
const r0 = 'smartskidka_favorites',
  u0 = 100;
function w2() {
  const [c, d] = L.useState(() => {
    try {
      const m = localStorage.getItem(r0);
      return m ? JSON.parse(m) : [];
    } catch {
      return [];
    }
  });
  L.useEffect(() => {
    localStorage.setItem(r0, JSON.stringify(c));
  }, [c]);
  const u = L.useCallback((m) => {
      d((g) => {
        if (g.includes(m)) return (Py(m), g.filter((y) => y !== m));
        Wy(m);
        const S = [...g, m];
        return S.length > u0 ? S.slice(S.length - u0) : S;
      });
    }, []),
    o = L.useCallback((m) => c.includes(m), [c]),
    p = L.useCallback(() => {
      d([]);
    }, []);
  return { favorites: c, toggleFavorite: u, isFavorite: o, clearFavorites: p };
}
const _2 = { productCount: 1e3, categoryCount: 7, yearLaunched: 2024, dailyDeals: 50 },
  C2 = [],
  z2 = [],
  M2 = [],
  d0 = [],
  f0 = [];
async function O2() {
  const c = await fetch('/products.json');
  if (!c.ok) throw new Error('Failed to load products');
  return c.json();
}
async function H2() {
  const c = await fetch('/categories.json');
  if (!c.ok) throw new Error('Failed to load categories');
  return c.json();
}
const k2 = {
  electronics: 'электроника',
  clothing: 'одежда',
  shoes: 'обувь',
  home: 'дом',
  auto: 'авто',
  beauty: 'красота',
  sport: 'спорт',
};
function D2(c, d, u = 20) {
  const o = d.trim().toLowerCase();
  if (!o || o.length < 2) return [];
  const p = o.split(/\s+/).filter((g) => g.length >= 2);
  if (p.length === 0) return [];
  const m = c.map((g) => {
    const S = k2[g.category] || g.category,
      y = [g.title, g.subtitle, g.category, S, ...g.tags, ...g.features, g.shopName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
    let h = 0;
    const E = g.title.toLowerCase();
    E.includes(o) && (h += 10);
    for (const U of p) E.includes(U) ? (h += 4) : y.includes(U) && (h += 1);
    return (
      (g.category.toLowerCase() === o || S.includes(o)) && (h += 3),
      g.tags.some((U) => U.toLowerCase().includes(o)) && (h += 2),
      { product: g, score: h }
    );
  });
  return (
    m.sort((g, S) => S.score - g.score),
    m
      .filter((g) => g.score > 0)
      .slice(0, u)
      .map((g) => g.product)
  );
}
function R2(c) {
  const d = c.filter((o) => o.category === 'electronics').slice(0, 6),
    u = c.filter((o) => o.category === 'clothing').slice(0, 6);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://smart-skidka.ru/?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        logo: 'https://smart-skidka.ru/icons/icon-512x512.png',
        sameAs: ['https://t.me/SmartRuMarket'],
      },
      {
        '@type': 'ItemList',
        name: 'Лучшие скидки на электронику',
        itemListElement: d.map((o, p) => ({
          '@type': 'ListItem',
          position: p + 1,
          item: {
            '@type': 'Product',
            name: o.title,
            image: o.image,
            sku: o.itemId || String(o.id),
            offers: {
              '@type': 'Offer',
              price: String(o.price),
              priceCurrency: 'RUB',
              availability: 'https://schema.org/InStock',
            },
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Лучшие скидки на одежду',
        itemListElement: u.map((o, p) => ({
          '@type': 'ListItem',
          position: p + 1,
          item: {
            '@type': 'Product',
            name: o.title,
            image: o.image,
            sku: o.itemId || String(o.id),
            offers: {
              '@type': 'Offer',
              price: String(o.price),
              priceCurrency: 'RUB',
              availability: 'https://schema.org/InStock',
            },
          },
        })),
      },
    ],
  };
}
function B2(c, d) {
  const u = d.filter((o) => o.category === c.id).slice(0, 12);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.seoTitle || `Скидки на ${c.name}`,
    itemListElement: u.map((o, p) => ({
      '@type': 'ListItem',
      position: p + 1,
      item: {
        '@type': 'Product',
        name: o.title,
        image: o.image,
        sku: o.itemId || String(o.id),
        offers: {
          '@type': 'Offer',
          price: String(o.price),
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}
function U2(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: c.map((d, u) => ({
      '@type': 'ListItem',
      position: u + 1,
      name: d.name,
      item: d.url,
    })),
  };
}
function q2() {
  return typeof window > 'u'
    ? null
    : window.__PRODUCT_ITEM_ID__ ||
        window.location.pathname.match(/\/item\/(\d+)\.html$/)?.[1] ||
        null;
}
function L2() {
  if (typeof window > 'u') return 'all';
  const c = window.__CATEGORY_SLUG__;
  if (c) return c;
  const d = window.location.pathname.match(/^\/(\w+)\.html$/);
  if (!d) return 'all';
  const u = d[1];
  return ['electronics', 'clothing', 'shoes', 'home', 'auto', 'beauty', 'sport'].includes(u)
    ? u
    : 'all';
}
function G2() {
  const { favorites: c, toggleFavorite: d, clearFavorites: u } = w2(),
    o = q2(),
    p = L2(),
    [m, g] = L.useState(o ? 'product' : 'home'),
    [S, y] = L.useState(p),
    [h, E] = L.useState(''),
    [H, U] = L.useState(o),
    [F, le] = L.useState(''),
    [Z, re] = L.useState([]),
    ve = L.useRef(new Set()),
    [se, _e] = L.useState([]),
    [Ce, Ue] = L.useState([]),
    [ee, X] = L.useState(!0),
    [D, Ne] = L.useState(null);
  L.useEffect(() => {
    let q = !1;
    async function k() {
      try {
        X(!0);
        const [b, z] = await Promise.all([O2(), H2()]);
        if (q) return;
        (_e(b), Ue(z));
      } catch (b) {
        q || Ne(b instanceof Error ? b.message : 'Ошибка загрузки');
      } finally {
        q || X(!1);
      }
    }
    return (
      k(),
      () => {
        q = !0;
      }
    );
  }, []);
  const ye = (H != null && se.find((q) => q.itemId === H)) || null;
  L.useEffect(() => {
    const q = () => {
      const k = document.documentElement.scrollHeight - window.innerHeight;
      if (k <= 0) return;
      const b = Math.round((window.scrollY / k) * 100),
        z = [25, 50, 75, 90];
      for (const B of z) b >= B && !ve.current.has(B) && (ve.current.add(B), n2(B));
    };
    return (
      window.addEventListener('scroll', q, { passive: !0 }),
      () => window.removeEventListener('scroll', q)
    );
  }, []);
  const Fe = L.useCallback((q) => {
      (g(q), U(null));
      const k = q === 'home' ? '/' : `/${q}`;
      (window.location.pathname !== k && history.replaceState(null, '', k),
        window.scrollTo({ top: 0, behavior: 'smooth' }));
    }, []),
    ke = L.useCallback((q) => {
      (y(q),
        g('home'),
        U(null),
        t2(q),
        window.location.pathname !== '/' && history.replaceState(null, '', '/'),
        setTimeout(() => {
          const k = document.getElementById('catalog');
          k && k.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50));
    }, []),
    Nt = L.useCallback(
      (q) => {
        (E(q),
          g('home'),
          U(null),
          window.location.pathname !== '/' && history.replaceState(null, '', '/'),
          q &&
            (Iy(q, S),
            setTimeout(() => {
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }, 100)));
      },
      [S]
    ),
    at = L.useCallback(
      (q) => {
        const k = D2(se, q);
        (le(q),
          re(k),
          g('ai-search'),
          U(null),
          e2(q),
          window.location.pathname !== '/ai-search' && history.replaceState(null, '', '/ai-search'),
          window.scrollTo({ top: 0, behavior: 'smooth' }));
      },
      [se]
    ),
    Oe = L.useCallback(
      (q) => {
        const k = se.find((B) => B.id === q);
        if (!k) return;
        const b = k.itemId || String(k.id);
        (U(b), g('product'));
        const z = `/item/${b}.html`;
        (window.location.pathname !== z && history.replaceState(null, '', z),
          window.scrollTo({ top: 0, behavior: 'smooth' }));
      },
      [se]
    ),
    _ = L.useCallback((q) => {
      (q.tags.includes('электроника')
        ? y('electronics')
        : q.tags.includes('одежда')
          ? y('clothing')
          : q.tags.includes('обувь')
            ? y('shoes')
            : q.tags.includes('для дома') && y('home'),
        g('home'),
        U(null),
        window.location.pathname !== '/' && history.replaceState(null, '', '/'),
        window.scrollTo({ top: 0, behavior: 'smooth' }));
    }, []),
    J = (() => {
      const q = Ce.find((k) => k.id === S);
      if (m === 'product' && ye) {
        const k = U2([
          { name: 'Главная', url: 'https://smart-skidka.ru/' },
          {
            name:
              ye.category === 'electronics'
                ? 'Электроника'
                : ye.category === 'clothing'
                  ? 'Одежда'
                  : ye.category === 'shoes'
                    ? 'Обувь'
                    : ye.category === 'home'
                      ? 'Дом'
                      : ye.category === 'auto'
                        ? 'Авто'
                        : ye.category === 'beauty'
                          ? 'Красота'
                          : 'Спорт',
            url: `https://smart-skidka.ru/${ye.category}.html`,
          },
          { name: ye.title, url: `https://smart-skidka.ru/item/${ye.itemId}.html` },
        ]);
        return {
          title: `${ye.title} — купить со скидкой ${ye.discount}% | SmartSkidka`,
          description:
            ye.subtitle ||
            `Скидка ${ye.discount}% на ${ye.title}. Цена ${ye.price.toLocaleString('ru')} ₽ на AliExpress.`,
          canonical: `/item/${ye.itemId}.html`,
          ogImage: ye.image,
          ogType: 'product',
          jsonLd: k,
        };
      }
      return m === 'ai-search'
        ? {
            title: `AI-поиск: ${F} | SmartSkidka`,
            description: `Результаты интеллектуального поиска по запросу "${F}". Найдено ${Z.length} товаров со скидками на AliExpress.`,
          }
        : m === 'promo'
          ? {
              title: 'Промокоды AliExpress 2026 — все актуальные купоны и коды',
              description:
                'Актуальные промокоды и купоны AliExpress на июнь 2026. Скидки до 70% на электронику, одежду, товары для дома. Копируйте и применяйте!',
              keywords:
                'промокоды AliExpress, купоны AliExpress, скидки AliExpress 2026, коды скидок',
              faqSchema: f0,
            }
          : m === 'blog'
            ? {
                title: 'Блог SmartSkidka — советы по экономии на AliExpress',
                description:
                  'Гайды, подборки, лайфхаки и секреты максимальной экономии на покупках в AliExpress. Читайте и экономьте умнее!',
                keywords: 'советы AliExpress, как экономить на AliExpress, подборки товаров',
              }
            : m === 'favorites'
              ? {
                  title: 'Избранные товары — SmartSkidka',
                  description:
                    'Ваши сохранённые товары со скидками AliExpress. Сравнивайте цены и следите за скидками.',
                }
              : S !== 'all' && q
                ? {
                    title: q.seoTitle || `Скидки AliExpress на ${q.name} — лучшие предложения`,
                    description:
                      q.seoDescription ||
                      `Лучшие скидки на ${q.name} с AliExpress. Реальные скидки, проверенные отзывы.`,
                    faqSchema: q.faq,
                    jsonLd: B2(q, se),
                  }
                : {
                    title:
                      'Скидки AliExpress до 90% — электроника, одежда, товары для дома | SmartSkidka.ru',
                    description:
                      'SmartSkidka.ru собирает лучшие товары с AliExpress со скидками до 90%. Электроника, одежда, обувь, товары для дома с бесплатной доставкой. Реальные скидки, проверенные отзывы!',
                    keywords:
                      'скидки AliExpress, товары с AliExpress со скидкой, промокоды AliExpress, купоны AliExpress, скидки на электронику, одежда с AliExpress',
                    faqSchema: d0,
                    jsonLd: R2(se),
                  };
    })();
  return ee
    ? i.jsx('div', {
        'code-path': 'src/App.tsx:358:7',
        className: 'min-h-screen bg-[#0f172a] flex items-center justify-center text-white',
        children: i.jsxs('div', {
          'code-path': 'src/App.tsx:359:9',
          className: 'text-center',
          children: [
            i.jsx('div', {
              'code-path': 'src/App.tsx:360:11',
              className:
                'w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4',
            }),
            i.jsx('p', {
              'code-path': 'src/App.tsx:361:11',
              className: 'text-slate-400',
              children: 'Загрузка товаров...',
            }),
          ],
        }),
      })
    : D
      ? i.jsx('div', {
          'code-path': 'src/App.tsx:369:7',
          className: 'min-h-screen bg-[#0f172a] flex items-center justify-center text-white px-4',
          children: i.jsxs('div', {
            'code-path': 'src/App.tsx:370:9',
            className: 'text-center max-w-md',
            children: [
              i.jsx('p', {
                'code-path': 'src/App.tsx:371:11',
                className: 'text-red-400 text-lg mb-2',
                children: 'Ошибка загрузки',
              }),
              i.jsx('p', {
                'code-path': 'src/App.tsx:372:11',
                className: 'text-slate-400 mb-4',
                children: D,
              }),
              i.jsx('button', {
                'code-path': 'src/App.tsx:373:11',
                onClick: () => window.location.reload(),
                className:
                  'px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium',
                children: 'Попробовать снова',
              }),
            ],
          }),
        })
      : i.jsx(b0, {
          'code-path': 'src/App.tsx:385:5',
          children: i.jsxs('div', {
            'code-path': 'src/App.tsx:386:7',
            className: 'min-h-screen bg-[#0f172a] text-white',
            children: [
              i.jsx(My, {
                'code-path': 'src/App.tsx:387:9',
                title: J.title,
                description: J.description,
                keywords: J.keywords,
                faqSchema: J.faqSchema,
                canonical: m === 'home' ? '/' : `/${m}`,
                jsonLd: J.jsonLd,
              }),
              i.jsx(zy, {
                'code-path': 'src/App.tsx:396:9',
                favoritesCount: c.length,
                onSearch: Nt,
                onAISearch: at,
                onNavigate: Fe,
                currentPage: m,
              }),
              i.jsxs('main', {
                'code-path': 'src/App.tsx:404:9',
                children: [
                  m === 'home' &&
                    i.jsxs(i.Fragment, {
                      children: [
                        i.jsx(Ky, {
                          'code-path': 'src/App.tsx:407:15',
                          onNavigate: Fe,
                          onCategorySelect: ke,
                        }),
                        i.jsx(f2, {
                          'code-path': 'src/App.tsx:412:15',
                          collections: M2,
                          onCollectionClick: _,
                        }),
                        i.jsx('div', {
                          'code-path': 'src/App.tsx:417:15',
                          id: 'catalog',
                          children: i.jsx(u2, {
                            'code-path': 'src/App.tsx:418:17',
                            products: se,
                            categories: Ce,
                            activeCategory: S,
                            onCategoryChange: ke,
                            favorites: c,
                            onToggleFavorite: d,
                            onProductClick: Oe,
                            searchQuery: h,
                          }),
                        }),
                        i.jsx(m2, {
                          'code-path': 'src/App.tsx:430:15',
                          products: se,
                          favorites: c,
                          onToggleFavorite: d,
                          onProductClick: Oe,
                        }),
                        i.jsx(o0, { 'code-path': 'src/App.tsx:437:15' }),
                        i.jsx(p2, { 'code-path': 'src/App.tsx:439:15' }),
                        i.jsx(x2, {
                          'code-path': 'src/App.tsx:441:15',
                          stats: { ..._2, productCount: se.length, categoryCount: Ce.length - 1 },
                        }),
                        i.jsx(A2, {
                          'code-path': 'src/App.tsx:447:15',
                          title: 'Скидки на AliExpress до 90% — как это работает',
                          paragraphs: [
                            '<strong>SmartSkidka.ru</strong> собирает лучшие товары с AliExpress со скидками до 90%. Мы ежедневно обновляем каталог, чтобы вы всегда находили самые выгодные предложения на электронику, одежду, обувь, товары для дома и авто. Все цены указаны в рублях с учётом актуального курса Центробанка.',
                            'Используйте наш поиск по товарам или AI-поиск для подбора идеальных покупок. Добавляйте товары в избранное, чтобы вернуться к ним позже. Каждая карточка содержит реальный рейтинг, количество заказов и характеристики — никаких фейковых скидок.',
                            `В нашем каталоге более ${se.length} товаров с реальными скидками 20–90%. Все ссылки ведут напрямую на AliExpress через партнёрскую программу Admitad — вы получаете ту же цену, а мы небольшую комиссию за направление. Актуальная цена на AliExpress. Это позволяет нам поддерживать сервис и добавлять новые функции.`,
                          ],
                          keywords: [
                            'скидки AliExpress',
                            'купоны AliExpress',
                            'промокоды AliExpress',
                            'товары с AliExpress',
                            'экономия на AliExpress',
                            'дешёвые товары AliExpress',
                          ],
                        }),
                        i.jsx(g2, { 'code-path': 'src/App.tsx:457:15', faq: d0 }),
                      ],
                    }),
                  m === 'promo' &&
                    i.jsx(y2, { 'code-path': 'src/App.tsx:462:13', promos: C2, faq: f0 }),
                  m === 'blog' &&
                    i.jsx(b2, {
                      'code-path': 'src/App.tsx:466:13',
                      posts: z2,
                      products: se,
                      favorites: c,
                      onToggleFavorite: d,
                      onProductClick: Oe,
                    }),
                  m === 'favorites' &&
                    i.jsx(v2, {
                      'code-path': 'src/App.tsx:476:13',
                      products: se,
                      favorites: c,
                      onToggleFavorite: d,
                      onClearFavorites: u,
                      onProductClick: Oe,
                    }),
                  m === 'product' &&
                    ye &&
                    i.jsx(S2, {
                      'code-path': 'src/App.tsx:486:13',
                      product: ye,
                      isFavorite: c.includes(ye.id),
                      onToggleFavorite: d,
                      onBack: () => Fe('home'),
                    }),
                  m === 'ai-search' &&
                    i.jsx(j2, {
                      'code-path': 'src/App.tsx:495:13',
                      query: F,
                      results: Z,
                      favorites: c,
                      onToggleFavorite: d,
                      onProductClick: Oe,
                    }),
                ],
              }),
              m === 'home' && i.jsx(o0, { 'code-path': 'src/App.tsx:505:36', variant: 'bottom' }),
              i.jsx(N2, { 'code-path': 'src/App.tsx:506:9' }),
              i.jsx(T2, { 'code-path': 'src/App.tsx:507:9' }),
              i.jsx(E2, { 'code-path': 'src/App.tsx:508:9' }),
            ],
          }),
        });
}
_p.createRoot(document.getElementById('root')).render(
  i.jsx(L.StrictMode, {
    'code-path': 'src/main.tsx:7:3',
    children: i.jsx(G2, { 'code-path': 'src/main.tsx:8:5' }),
  })
);
