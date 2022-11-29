# ESXToken

The latest *ESXToken* polyfill [as discussed in TC39](https://es.discourse.group/t/proposal-esx-as-core-js-feature/1511).

While the poly is extremely fine-tuned for [its Babel transformer](https://github.com/ungap/babel-plugin-transform-esx), the abstract representation of the proposal is the following one:

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
  id: object?;
  children: (ESXStatic | ESXInterpolation | ESXNode)[];
}

class ESXFragment extends ESXNode {
  type = ESXToken.FRAGMENT;
}

class ESXElement extends ESXNode {
  type = ESXToken.ELEMENT;
  value: string;
  attributes: (ESXAttribute | ESXInterpolation)[];
}

class ESXComponent extends ESXNode {
  type = ESXToken.COMPONENT;
  value: function;
  attributes: (ESXAttribute | ESXInterpolation)[];
  properties: object?;
}
```
