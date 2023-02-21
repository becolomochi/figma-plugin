figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {

  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;

  let selectedVariant;

  console.log(pluginMessage.imageVariant);

  if(pluginMessage.darkModeState === true) {
    switch(pluginMessage.imageVariant) {
      case "2" :
        // create instance of dark mode, single image
        selectedVariant = postComponentSet.findOne(node=> node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
        break;
      case "3" :
        // create instance of dark mode, carousel
        selectedVariant = postComponentSet.findOne(node=> node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
        break;
      default :
        // create instance of dark mode, no image
        selectedVariant = postComponentSet.findOne(node=> node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
        break;
    }
  } else {
    switch(pluginMessage.imageVariant) {
      case "2" :
        // create instance of light mode, single image
        selectedVariant = postComponentSet.findOne(node=> node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
        break;
      case "3" :
        // create instance of light mode, carousel
        selectedVariant = postComponentSet.findOne(node=> node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
        break;
      default :
        // create instance of light mode, no image
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }

  selectedVariant.createInstance();

  figma.closePlugin();
}
