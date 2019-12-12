const createDomElement = (tag, attributes, target) => {
    const elementTag = document.createElement(tag);
    Object.entries(attributes).forEach(attr => {
      const [attrKey, attrValue] = attr;
      elementTag[attrKey] = attrValue;
    });  
    return elementTag;
  };

  const addToDom = (target, element) =>{
      if(target && element){
        document.querySelector(target).appendChild(elementTag)
      }
  }
  module.exports = {
    createDomElement,
    addToDom
  };