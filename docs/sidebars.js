module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['engineering'],
    },
    {
      type: 'category',
      label: 'Devops',
      collapsed: false,
      items: [
        'devops/deployment',
        'devops/containerized_development',
        'devops/github_actions',
        'devops/compose_explaination',
      ],
    },
    {
      type: 'category',
      label: 'Logging',
      collapsed: false,
      items: ['logging/overview', 'logging/elk_setup', 'logging/custom_logger', 'logging/what_to_capture'],
    },
    {
      type: 'category',
      label: 'Monitoring',
      collapsed: false,
      items: ['monitoring/nestjs-monitor', 'monitoring/setup'],
    },
    {
      type: 'category',
      label: 'User Service',
      collapsed: false,
      items: ['user-service/introduction'],
    },
  ],
};
