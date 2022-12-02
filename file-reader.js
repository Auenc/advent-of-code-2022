const fs = require("fs")
const path = require("path")

module.exports = (filename) => {
  const data = fs.readFileSync(path.join(__dirname, filename))
  return data + ""
}
