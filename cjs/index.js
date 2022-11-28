'use strict';
module.exports = (() => {
  const ATTRIBUTE     = 1;
  const COMPONENT     = 2;
  const ELEMENT       = 3;
  const FRAGMENT      = 4;
  const INTERPOLATION = 5;
  const STATIC        = 6;

  class ESXToken {
    static ATTRIBUTE =      ATTRIBUTE;
    static COMPONENT =      COMPONENT;
    static ELEMENT =        ELEMENT;
    static FRAGMENT =       FRAGMENT;
    static INTERPOLATION =  INTERPOLATION;
    static STATIC =         STATIC;

    // transformer utilities
    /** @protected */ static _ = [];
    /** @protected */ static a = (dynamic, name, value) => ({type: ATTRIBUTE, dynamic, name, value});
    /** @protected */ static i = value => ({type: INTERPOLATION, value});
    /** @protected */ static s = value => ({type: STATIC, value});
    /** @protected */ static c = (id, value, attributes, children) => new ESXComponent(id, value, attributes, children);
    /** @protected */ static e = (id, name, attributes, children) => new ESXElement(id, name, attributes, children);
    /** @protected */ static f = (id, children) => new ESXFragment(id, children);

    // subclasses super constructor
    /** @protected */ constructor(type) {
      this.type = type;
    }
  }

  class ESXNode extends ESXToken {
    constructor(type, id, attributes, children) {
      super(type).id = id;
      this.attributes = attributes;
      this.children = children;
    }
  }

  class ESXFragment extends ESXNode {
    constructor(id, children) {
      super(FRAGMENT, id, ESXToken._, children);
    }
  }

  class ESXElement extends ESXNode {
    constructor(id, name, attributes, children) {
      super(ELEMENT, id, attributes, children).name = name;
    }
  }

  class ESXComponent extends ESXNode {
    constructor(id, value, attributes, children) {
      super(COMPONENT, id, attributes, children).value = value;
    }
  }

  return ESXToken;
})();
