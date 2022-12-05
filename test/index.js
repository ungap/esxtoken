import ESXToken from '../esm/index.js';

const assert = (value, expected, message = `expected ${expected} but got ${value}`) => {
  console.assert(value === expected, message);
  if (value !== expected)
    throw new Error(message);
};

const a = ESXToken.a(true, 'a', 1);
assert(a.type, ESXToken.ATTRIBUTE);
assert(a.name, 'a');
assert(a.value, 1);

const o = {b: 345};
const i = ESXToken.i(o);
assert(i.type, ESXToken.INTERPOLATION);
assert(i.value, o);

const s = ESXToken.s(123);
assert(s.type, ESXToken.STATIC);
assert(s.value, 123);

const f = ESXToken.f(o, [2, 3, 4]);
assert(f, ESXToken.f(o, [2, 3, 4]));
assert(f.type, ESXToken.FRAGMENT);
assert(f.children.join(','), '2,3,4');
ESXToken.f(o, [5, 6, 7]);
assert(f.children.join(','), '5,6,7');
assert(f.attributes, ESXToken._);
assert(f.value, void 0);

const e = ESXToken.e(f, 'div', [a, i], [3, 4]);
assert(e, ESXToken.e(f, 'div', [a, i], [3, 4]));
assert(e.type, ESXToken.ELEMENT);
assert(e.children.join(','), '3,4');
assert(e.attributes.length, 2);
assert(e.attributes[0], a);
assert(e.attributes[1], i);
assert(e.value, 'div');
assert(JSON.stringify(e.properties), '{"a":1,"b":345}');

const c = ESXToken.c(e, Object, ESXToken._, [2, 3, 4]);
assert(c, ESXToken.c(e, Object, ESXToken._, [2, 3, 4]));
assert(c.type, ESXToken.COMPONENT);
assert(c.children.join(','), '2,3,4');
assert(c.attributes.join(','), '');
assert(c.value, Object);
assert(c.properties, null)
