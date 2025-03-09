module.exports = [
  {
    name: 'init',
    command: 'init',
    options: [],
    description: 'Initialize project structure',
  },
  {
    name: 'dev',
    command: 'dev',
    options: [],
    description: 'Enable local debug server',
  },
  {
    name: 'add',
    command: 'add',
    description: 'Add component',
  },
  {
    name: 'build',
    command: 'build',
    options: [
      ['--profile', 'profile analyze'],
      ['--json <json>', 'json file name'],
    ],
    description: 'Build source code',
  },
  {
    name: 'deploy',
    command: 'deploy',
    description: 'Deploy project',
  },
  {
    name: 'analyze',
    command: 'analyze',
    description: 'Analyze project build permormance',
  },
  {
    name: '',
    command: '',
    description: '',
  },
];
