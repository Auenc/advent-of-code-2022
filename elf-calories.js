const fs = require("fs")
const path = require("path")
const ReadFile = require('./file-reader')


const parseElves = (data) => {
  const rows = data.split("\n")
  const elves = [0]
  rows.forEach((row) => {
    if (row === "") {
      elves.push(0)
      return
    }
    elves[elves.length - 1] += Number(row)
  })
  return elves
}

const raw_data = ReadInput("inputs/elf-calories.test.txt")
const elves = parseElves(raw_data)
elves.sort((a, b) => b - a)
console.log(elves[0] + elves[1] + elves[2])

console.log(
  ReadInput("inputs/elf-calories.test.txt")
    .split("\n\n")
    .map((elf) =>
      elf
        .split("\n")
        .map((food) => Number(food))
        .reduce((el, total) => (total += el), 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((el, total) => (total += el), 0)
)
