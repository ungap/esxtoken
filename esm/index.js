/** (c) Andrea Giammarchi - ISC */

export default class ESXToken {
  static ATTRIBUTE =      1;
  static COMPONENT =      2;
  static ELEMENT =        3;
  static FRAGMENT =       4;
  static INTERPOLATION =  5;
  static STATIC =         6;

  /** @private */
  static _ = Object.freeze([]);

  /** @private */
  constructor(id, type, children, attributes, name, value) {
    this.id = id;
    this.type = type;
    this.children = children;
    this.attributes = attributes;
    this.name = name;
    this.value = value;
  }

  get properties() {
    const {attributes} = this;
    if (attributes.length) {
      const properties = {};
      for (const entry of attributes) {
        if (entry.type < 2)
          properties[entry.name] = entry.value;
        else
          Object.assign(properties, entry.value);
      }
      return properties;
    }
    return null;
  }
}
