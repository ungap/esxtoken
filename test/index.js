import ESXToken from '../esm/index.js';

const assert = (value, expected, message = `expected ${expected} but got ${value}`) => {
  console.assert(value === expected, message);
  if (value !== expected)
    throw new Error(message);
};

const ESXTokenC = (id, value, attributes, children) => new ESXToken(id, ESXToken.COMPONENT, attributes, children, value.name, value);
const ESXTokenE = (id, name, attributes, children) => new ESXToken(id, ESXToken.ELEMENT, attributes, children, name, name);
const ESXTokenF = (id, children) => new ESXToken(id, ESXToken.FRAGMENT, ESXToken._, children);

const o = {b: 345};
const a = ESXToken.a(false, 'a', 1);
const i = ESXToken.b(ESXToken.INTERPOLATION, o);

const f = ESXTokenF(o, [2, 3, 4]);
assert(f.id, ESXTokenF(o, [2, 3, 4]).id);
assert(f.type, ESXToken.FRAGMENT);
assert(f.children.join(','), '2,3,4');
assert(f.attributes, ESXToken._);
assert(f.value, void 0);

const e = ESXTokenE(f, 'div', [a, i], [3, 4]);
assert(e.type, ESXToken.ELEMENT);
assert(e.children.join(','), '3,4');
assert(e.attributes.length, 2);
assert(e.attributes[0], a);
assert(e.attributes[1], i);
assert(e.value, 'div');
assert(JSON.stringify(e.properties), '{"a":1,"b":345}');

const c = ESXTokenC(e, Object, ESXToken._, [2, 3, 4]);
assert(c.type, ESXToken.COMPONENT);
assert(c.children.join(','), '2,3,4');
assert(c.attributes.join(','), '');
assert(c.value, Object);
assert(c.properties, null)
