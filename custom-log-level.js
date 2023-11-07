// custom-log-level.js
module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      logLevel:
        'Use appropriate log levels (error, warn, info, debug) based on the severity of the message.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'CustomLogger' &&
          node.callee.property.type === 'Identifier' &&
          /^log(?:$|[A-Z])/.test(node.callee.property.name) // Check for log methods
        ) {
          const logLevel = node.callee.property.name.toLowerCase();
          if (!['error', 'warn', 'info', 'debug'].includes(logLevel)) {
            context.report({
              node: node.callee.property,
              messageId: 'logLevel',
            });
          }
        }
      },
    };
  },
};
