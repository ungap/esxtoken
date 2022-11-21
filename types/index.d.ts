declare global {
  class ESXToken {
    static STATIC_TYPE: number;
    static MIXED_TYPE: number;
    static RUNTIME_TYPE: number;
    static TEMPLATE_TYPE: number;
    static ELEMENT_TYPE: number;
    static FRAGMENT_TYPE: number;
    static COMPONENT_TYPE: number;
  }
}

export default ESXToken;
