export default ((
  {assign}, $, _,
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
    /** @private */ static c = (id, value, attributes, children = _) => ESXToken.v(COMPONENT, id, attributes, children, value.name, value);
    /** @private */ static e = (id, name, attributes, children = _) => ESXToken.v(ELEMENT, id, attributes, children, name, name);
    /** @private */ static f = (id, children) => ESXToken.v(FRAGMENT, id, _, children);
    /** @private */ static v = (type, id, attributes, children, name, value) => {
      let token = new ESXToken(type, attributes, children, name, value);
      if (id) {
        const known = $.get(id);
        if (known) {
          known.attributes = token.attributes;
          known.children = token.children;
          token = known;
        }
        else
          $.set(id, token);
      }
      return token;
    };

    /** @private */
    constructor(type, attributes, children, name, value) {
      this.type = type;
      this.attributes = attributes;
      this.children = children;
      this.name = name;
      this.value = value;
    }

    /** @type {object?} an accessor to forward properties */
    get properties() {
      const {attributes} = this;
      if (attributes !== _) {
        const properties = {};
        for (const entry of attributes) {
          if (entry.type === ATTRIBUTE)
            properties[entry.name] = entry.value;
          else
            assign(properties, entry.value);
        }
        return properties;
      }
      return null;
    }
  }
))(
  Object, new WeakMap, [], 1, 2, 3, 4, 5, 6
);
