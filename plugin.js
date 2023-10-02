module.exports = function babelPlugin(babel) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(path);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      },
    },
  };
}
