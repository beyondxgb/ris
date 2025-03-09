const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === 'undefined') {
    // eslint-disable-next-line
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Preset ris-app: '${name}' option must be a boolean.`);
  }

  return value;
};


module.exports = (api, opts = {}) => {
  const isTypeScriptEnabled = validateBoolOption(
    'typescript',
    opts.typescript,
    true,
  );
  const config = {
    presets: [
      [require.resolve('@babel/preset-env'), {
        targets: {
          ie: 9,
        },
        modules: false,
      }],
      require.resolve('@babel/preset-react'),
      isTypeScriptEnabled && require.resolve('@babel/preset-typescript'),
    ].filter(Boolean),
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime')],
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [
        require.resolve('@babel/plugin-transform-destructuring'),
        {
          loose: false,
          selectiveLoose: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer',
            'useCallback',
            'useMemo',
            'useRef',
            'useImperativeHandle',
            'useLayoutEffect',
            'useDebugValue',
          ],
        },
      ],
    ].filter(Boolean),
    overrides: [
      isTypeScriptEnabled && {
        test: /\.tsx?$/,
        plugins: [
          [
            require.resolve('@babel/plugin-proposal-decorators'),
            { legacy: true },
          ],
        ],
      },
    ].filter(Boolean),
  };
  return config;
};
