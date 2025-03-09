module.exports = {
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'import/extensions': 0,
    'no-restricted-syntax': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'import/no-named-as-default': 0,
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0,
    'no-bitwise': 0,
    'no-prototype-builtins': 0,
    'no-mixed-operators': [2, { allowSamePrecedence: true }],
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'max-len': [2, 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  },
};
