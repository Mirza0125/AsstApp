// Fix react-native-svg-transformer to use metro-babel-transformer directly
// This is needed because @react-native/metro-babel-transformer is not available in the correct version

const fs = require('fs');
const path = require('path');

const svgTransformerPath = path.join(__dirname, '..', 'node_modules', 'react-native-svg-transformer', 'index.js');

if (fs.existsSync(svgTransformerPath)) {
  let content = fs.readFileSync(svgTransformerPath, 'utf8');
  
  // Check if already fixed
  if (content.includes('const metroBabelTransformer = require("metro-babel-transformer")')) {
    console.log('react-native-svg-transformer already fixed');
    process.exit(0);
  }
  
  // Replace the getReactNativeTransformer function
  const oldTransformer = `const getReactNativeTransformer = () => {
  try {
    return require("@react-native/metro-babel-transformer");
  } catch (error) {
    return require("metro-react-native-babel-transformer");
  }
};`;
  
  const newTransformer = `const metroBabelTransformer = require("metro-babel-transformer");

const getReactNativeTransformer = () => {
  return metroBabelTransformer;
};`;
  
  if (content.includes(oldTransformer)) {
    content = content.replace(oldTransformer, newTransformer);
    fs.writeFileSync(svgTransformerPath, content);
    console.log('Fixed react-native-svg-transformer');
  } else {
    console.log('Could not find expected transformer pattern, file may already be modified');
  }
} else {
  console.log('react-native-svg-transformer not found');
}