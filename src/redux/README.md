This folder contains helpers, middlewares and extensions for redux.

## Cheatsheet

```javascript
const $ = actionTypePrefixer('Module');

const add = actionCreator($('add'));
const clear = actionCreator($('clear'), [remote, broadcast]);
const load = actionCreator($('load'), [
  setPayload((param1, param2) => ({ param1, param2}),
  setMeta('analytics', (param1, param2) => ({ data: param1 })),
  setMetaValue('flag', true),
  withSideEffect((dispatch, payload, context) => {
    const { api } = context;
    const { param1, param2 } = payload;

    api.doSmth(param1, param2)
      .then((res) => dispatch(add(res.item)))
      .catch((err) => dispatch(error(err)));
  }),
]);


const reducer = createReducer({
  [add]: (atom, payload, action) => ({
    ...atom,
    field1: payload.value1,
    field2: payload.value2,
    list: [...atom.list, payload.item],
  }),
  [clear]: (atom, payload, action) => ({
    ...atom,
    list: [],
  }),
}, {
  'default': 'value',
  list: [],
});
```

## actionCreator

_actionCreator(type, [enhancers])_

Defines `ActionCreator` that will create action objects with specified `type`. Optionally gets array of enhancers that will setup action object with required data.

`ActionCreator` api:

* `toString()` - returns type of action that will be created

* `displayName` - value of type of action that will be created

## actionTypePrefixer

_actionTypePrefixer(prefix)_

Defines function that will return prefixed type of action. Useful for namespacing actions/actionCreators.

## createReducer

_createReducer(declarations, [initialValue])_

Defines reducer function. This is syntactic sugar for `switch ... case ...` boilerpalte. Key of `declrations` object is type of action and value is handler that will be triggered when specified action occurred. ActionCreator created by `actionCreator` may be specified as key since it has redefined `toString` method.

## Action enhacers

### setPayload

_setPayload(mapper)_

By default ActionCreator uses only first argument and treats it as payload. This enhancer pass entire argument list to `mapper` and replaces payload with returned value.

```javascript
const first  = actionCreator('first');
const firstAction = first('value', 'another');
// { type: 'first', payload: 'value'}

const second = actionCreator('second', [
  setPayload((arg1, arg2) => { arg1, arg2 }),
]);
const secondAction = second('value', 'another');
// { type: 'first', payload: { arg1: 'value', arg2: 'another' } }
```

### setMeta

_setMeta(field, getter)_

This enhancer will set field specified by `field` of meta object of action with value returned by `getter`. `getter` gets all arguments passed to ActionCreator.

```javascript
const first  = actionCreator('first');
const firstAction = first('value');
// { type: 'first', payload: 'value'}

const second = actionCreator('second', [
  setMeta('field', (arg1, arg2) => arg2),
]);
const secondAction = second('value', 'another');
// { type: 'first', payload: 'value', meta: { field: 'another' } }
```

### setMetaValue

_setMetaValue(field, value)_

This enhancer will set field specified by `field` of meta object of action with static value.

```javascript
const first  = actionCreator('first');
const firstAction = first('value');
// { type: 'first', payload: 'value'}

const second = actionCreator('second', [
  setMetaValue('field', 'another'),
]);
const secondAction = second('value');
// { type: 'first', payload: 'value', meta: { field: 'another' } }
```

### withSideEffect

_withSideEffect(sideEffectFn)_

This enhancer will set field `sideEffect` of meta object of action with specified function. During dispatch `sideEffectProcessor` middleware schedules call of `sideEffectFn`. Actually is alias for

```
setMetaValue('sideEffect', sideEffectFn);
```

```javascript
const first  = actionCreator('first');
const firstAction = first('value');
// { type: 'first', payload: 'value'}

const second = actionCreator('second', [
  withSideEffect(() => console.log('side effect')),
]);
const secondAction = second('value');
// { type: 'first', payload: 'value', meta: { sideEffect: () => console.log('side effect') } }
```

### remote

_remote = setMetaValue('remote', true)_

This enhancer will add `remote` field to meta object with `true` value. Such actions dispatched on client side will be emitted to server via socket.

### broadcast

_broadcast = setMetaValue('broadcast', true)_

This enhancer will add `broadcast` field to meta object with `true` value. Such actions dispatched on server side will be broadcasted to all members via socket.

## Middlewares

### clientActionBroker

_clientActionBroker(ioSocket)_

Redux middleware that controls actions flow on client side. All actions marked with `remote` flag will be emitted to server instead of processing by reducer.

### serverActionBroker

_serverActionBroker(io)_

Redux middleware that controls actions flow on server side. All actions marked with `broadcast` flag will be broadcasted to all members as well as processed by reducer.
