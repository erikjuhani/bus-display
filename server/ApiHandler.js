const fetch = require('node-fetch')

function getData() {
  fetch('https://llb.cloud.tyk.io/llb-bus-api/GetData?busId=1612', 
  {
    headers: {
      "Authorization": "5a07a2f986f30e00015b3cb166896c54d7444f5780eb2a270720cc42"
    }
  })
    .then(res => res.json())
    .then(res => (console.log(res)))
}

module.exports = getData()