import { useState, useContext, createContext } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var anyWaiting = function anyWaiting(waiters) {
  return waiters.length > 0;
};
var isWaiting = function isWaiting(waiters, waiter) {
  return waiters.includes(waiter);
};
var startWaiting = function startWaiting(waiters, waiter) {
  if (isWaiting(waiters, waiter)) return waiters;
  return [].concat(waiters, [waiter]);
};
var endWaiting = function endWaiting(waiters, waiter) {
  return waiters.filter(function (w) {
    return w !== waiter;
  });
};

var WaitingContext = /*#__PURE__*/createContext();

function _Wait(props) {
  var context = useContext(WaitingContext);
  return context.waiters.includes(props.on) ? props.fallback : props.children;
}

function Waiter(props) {
  var _useState = useState([]),
      waiters = _useState[0],
      setWaiters = _useState[1];

  return h(WaitingContext.Provider, {
    value: {
      waiters: waiters,
      createWaitingContext: function createWaitingContext(waiter) {
        return {
          isWaiting: function isWaiting$1() {
            return isWaiting(waiters, waiter);
          },
          startWaiting: function startWaiting$1() {
            return setWaiters(startWaiting(waiters, waiter));
          },
          endWaiting: function endWaiting$1() {
            return setWaiters(endWaiting(waiters, waiter));
          },
          Wait: function Wait(props) {
            return h(_Wait, _extends({
              on: waiter
            }, props));
          }
        };
      },
      anyWaiting: function anyWaiting$1() {
        return anyWaiting(waiters);
      },
      isWaiting: function isWaiting$1(waiter) {
        return isWaiting(waiters, waiter);
      },
      startWaiting: function startWaiting$1(waiter) {
        setWaiters(startWaiting(waiters, waiter));
      },
      endWaiting: function endWaiting$1(waiter) {
        setWaiters(endWaiting(waiters, waiter));
      }
    }
  }, props.children);
}
function useWait() {
  var context = useContext(WaitingContext);
  return _extends({}, context, {
    Wait: _Wait
  });
}

export { Waiter, useWait };
//# sourceMappingURL=react-wait.cjs.module.mjs.map
