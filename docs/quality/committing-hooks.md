# Committing Hooks

We use [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to prevent bad git commit.

```json
"lint-staged": {
  "*.js": [
    "eslint --fix",
    "git add"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

> You should reinstall husky after git init the application.