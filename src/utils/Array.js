function unique(ary = [], key = "0") {
  ary.sort(sortObj(key));
  for (var i = 0; i < ary.length; i++) {
    if (!ary[i + 1]) {
      break;
    }
    if (ary[i][key] === ary[i + 1][key]) {
      console.log(ary[i][key])
      ary.splice(i, 1);
      i -= 1;
    }
  }
  return ary;
}

function sortObj(key = "0") {
  return function (a, b) {
    return a[key] < b[key] ? -1 : 1;
  }
}

module.exports = {
  unique
}