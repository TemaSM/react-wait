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

const anyWaiting = waiters => waiters.length > 0;
const isWaiting = (waiters, waiter) => waiters.includes(waiter);
const startWaiting = (waiters, waiter) => {
  if (isWaiting(waiters, waiter)) return waiters;
  return [...waiters, waiter];
};
const endWaiting = (waiters, waiter) => {
  return waiters.filter(w => w !== waiter);
};

const WaitingContext = /*#__PURE__*/createContext();

function Wait(props) {
  const context = useContext(WaitingContext);
  return context.waiters.includes(props.on) ? props.fallback : props.children;
}

function Waiter(props) {
  const [waiters, setWaiters] = useState([]);
  return h(WaitingContext.Provider, {
    value: {
      waiters,
      createWaitingContext: waiter => ({
        isWaiting: () => isWaiting(waiters, waiter),
        startWaiting: () => setWaiters(startWaiting(waiters, waiter)),
        endWaiting: () => setWaiters(endWaiting(waiters, waiter)),
        Wait: props => h(Wait, _extends({
          on: waiter
        }, props))
      }),
      anyWaiting: () => anyWaiting(waiters),
      isWaiting: waiter => isWaiting(waiters, waiter),

      startWaiting(waiter) {
        setWaiters(startWaiting(waiters, waiter));
      },

      endWaiting(waiter) {
        setWaiters(endWaiting(waiters, waiter));
      }

    }
  }, props.children);
}
function useWait() {
  const context = useContext(WaitingContext);
  return _extends({}, context, {
    Wait
  });
}

export { Waiter, useWait };
//# sourceMappingURL=react-wait.cjs.modern.js.map
