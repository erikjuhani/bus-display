const fetch = require('node-fetch')

const apiHandler = function() {
  return fetch('https://llb.cloud.tyk.io/llb-bus-api/GetData?busId=3008', 
  {
    headers: {
      "Authorization": "5a07a2f986f30e00015b3cb166896c54d7444f5780eb2a270720cc42"
    }
  })
    .then(res => res.json())
}

module.exports = apiHandler;