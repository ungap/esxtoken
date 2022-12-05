export default ((
  properties, _,
  ATTRIBUTE,
  COMPONENT,
  ELEMENT,
  FRAGMENT,
  INTERPOLATION,
  STATIC
) => (
  class ESXToken {
    static ATTRIBUTE =      ATTRIBUTE;
    static COMPONENT =      COMPONENT;
    static ELEMENT =        ELEMENT;
    static FRAGMENT =       FRAGMENT;
    static INTERPOLATION =  INTERPOLATION;
    static STATIC =         STATIC;

    // transformer utilities
    /** @private */ static _ = _;
    /** @private */ static a = (dynamic, name, value) => ({type: ATTRIBUTE, dynamic, name, value});
    /** @private */ static i = value => ({type: INTERPOLATION, value});
    /** @private */ static s = value => ({type: STATIC, value});
    /** @private */ static c = (id, value, attributes, children = _) => new ESXToken(COMPONENT, id, children, attributes, value.name, value);
    /** @private */ static e = (id, name, attributes, children = _) => new ESXToken(ELEMENT, id, children, attributes, name, name);
    /** @private */ static f = (id, children) => new ESXToken(FRAGMENT, id, children, _);

    /** @private */
    constructor(type, id, children, attributes, name, value) {
      this.type = type;
      this.id = id;
      this.children = children;
      this.attributes = attributes;
      this.name = name;
      this.value = value;
    }

    /** @type {object?} an accessor to forward properties */
    get properties() {
      const {attributes} = this;
      return attributes === _ ? null : attributes.reduce(properties, {});
    }
  }
))(
  (props, item) => (
    item.type === 5 ?
      Object.assign(props, item.value) :
      ((props[item.name] = item.value), props)
  ),
  [], 1, 2, 3, 4, 5, 6
);
