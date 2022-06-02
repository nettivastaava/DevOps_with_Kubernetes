const fs = require('fs')

const random = (Math.random() + 1).toString(36).substring(7);
fs.readFile('/app/timestamps.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data, ' ', random)
})