module.exports = {
  meta: {
    type: 'layout',
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'CustomLogger' && // Replace with your logger's name
          (node.callee.property.name === 'info' || node.callee.property.name === 'error' || node.callee.property.name === 'warn') // Add more log level functions if needed
        ) {
          if (node.arguments.length >= 3) {
            const timestampArg = node.arguments[0];
            const logLevelArg = node.arguments[1];
            const messageArg = node.arguments[2];

            if (
              timestampArg &&
              timestampArg.type === 'Literal' &&
              !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(timestampArg.value)
            ) {
              context.report({
                node: timestampArg,
                message: 'Timestamp format should be YYYY-MM-DDTHH:mm:ss.',
              });
            }

            if (
              logLevelArg &&
              logLevelArg.type === 'Literal' &&
              !/^(INFO|ERROR|WARNING)$/.test(logLevelArg.value)
            ) {
              context.report({
                node: logLevelArg,
                message: 'Log level should be "INFO", "ERROR", or "WARNING".',
              });
            }

            if (
              messageArg &&
              messageArg.type === 'Literal' &&
              /[a-z]/.test(messageArg.value)
            ) {
              context.report({
                node: messageArg,
                message: 'Log messages should not contain lowercase letters.',
              });
            }
          }
        }
      },
    };
  },
};
