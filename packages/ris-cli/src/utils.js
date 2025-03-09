function Minimum(a, b, c) {
  const d = (a < c ? a : c);
  const f = (b < c ? b : c);
  return a < b ? d : f;
}

function strSimilarity2Number(s, t) {
  const n = s.length;
  const m = t.length;
  const d = [];
  let i;
  let j;
  let si;
  let tj;
  let cost;
  if (n === 0) return m;
  if (m === 0) return n;
  for (i = 0; i <= n; i += 1) {
    d[i] = [];
    d[i][0] = i;
  }
  for (j = 0; j <= m; j += 1) {
    d[0][j] = j;
  }
  for (i = 1; i <= n; i += 1) {
    si = s.charAt(i - 1);
    for (j = 1; j <= m; j += 1) {
      tj = t.charAt(j - 1);
      if (si === tj) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = Minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[n][m];
}

function strSimilarity2Percent(s, t) {
  const l = s.length > t.length ? s.length : t.length;
  const d = strSimilarity2Number(s, t);
  return (1 - (d / l)).toFixed(4);
}
module.exports = {
  strSimilarity2Number,
  strSimilarity2Percent,
};
