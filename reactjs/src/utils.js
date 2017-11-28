export function getLocalJson(key) {
  var data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
  } else {
    data = [];
  }
  return data;
}

export function setLocalJson(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}