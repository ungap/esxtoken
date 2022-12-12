'use strict';
/** (c) Andrea Giammarchi - ISC */

module.exports = class ESXToken {
  static ATTRIBUTE =      1;
  static COMPONENT =      2;
  static ELEMENT =        3;
  static FRAGMENT =       4;
  static INTERPOLATION =  5;
  static STATIC =         6;

  /** @private */
  static _ = Object.freeze([]);

  /** @private */
  static a = (dynamic, name, value) => ({type: 1, dynamic, name, value});

  /** @private */
  static b = (type, value) => ({type, value});

  /** @private */
  constructor(id, type, attributes, children, name, value) {
    this.id = id;
    this.type = type;
    this.attributes = attributes;
    this.children = children;
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
