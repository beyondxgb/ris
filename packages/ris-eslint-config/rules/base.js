module.exports = {
  rules: {
    'func-names': 0,
    'vars-on-top': 0,
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
