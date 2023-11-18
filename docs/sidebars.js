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
      items: ['devops/deployment','devops/containerized_development','devops/github_actions'],
    },
    {
      type: 'category',
      label: 'Logging',
      collapsed: false,
      items: ['logging/overview','logging/elk_setup'],
    },
  ]
};
