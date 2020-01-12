
const parse = data => data === "true" ? true : data === "false" ? false : JSON.parse(data)
const get = item => typeof (item) === "string"
   ? parse(sessionStorage.getItem(item))
   : (item.map(key => sessionStorage.getItem(key))).map(k => parse(k))
const set = data => { Object.keys(data).forEach(key => { sessionStorage.setItem(key, JSON.stringify(data[key])) }) }

export default { get, set }