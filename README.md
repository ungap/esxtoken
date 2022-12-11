# ESXToken

The latest *ESXToken* polyfill [as discussed in TC39](https://es.discourse.group/t/proposal-esx-as-core-js-feature/1511).

- - -

**v0.3 Note** differently from [@ungap/esx](https://github.com/ungap/esx#readme) components, elements, or fragments, are unique only if these are outer *ESX* templates. Repeated updates will always change their *attributes* or *children*, if actually changed, but the only unique reference that matters is the outer one, which can always be weakly related and mapped accordingly.

- - -

While the poly is extremely fine-tuned for terseness, performance, and [its current Babel transformer](https://github.com/ungap/babel-plugin-transform-esx), the abstract representation of the proposal is the following one:

```ts
class ESXToken {
  static ATTRIBUTE: number;
  static INTERPOLATION: number;
  static STATIC: number;
  static FRAGMENT: number;
  static ELEMENT: number;
  static COMPONENT: number;
}

interface ESXAttribute {
  type = ESXToken.ATTRIBUTE;
  dynamic: boolean;
  name: string;
  value: unknown;
}

interface ESXInterpolation {
  type = ESXToken.INTERPOLATION;
  value: unknown;
}

interface ESXStatic {
  type = ESXToken.STATIC;
  value: string;
}

interface ESXNode extends ESXToken {
  id: null | object;
  children: (ESXStatic | ESXInterpolation | ESXNode)[];
  get properties(): object?;
}

class ESXFragment extends ESXNode {
  type = ESXToken.FRAGMENT;
}

class ESXElement extends ESXNode {
  type = ESXToken.ELEMENT;
  name: string;
  value: string;
  attributes: (ESXAttribute | ESXInterpolation)[];
}

class ESXComponent extends ESXNode {
  type = ESXToken.COMPONENT;
  name: string;
  value: function;
  attributes: (ESXAttribute | ESXInterpolation)[];
}
```
