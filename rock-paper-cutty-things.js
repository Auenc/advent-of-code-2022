const ReadInput = require("./file-reader")

const Beats = {
  A: "C",
  B: "A",
  C: "B",
}

const Loses = Object.entries(Beats).reduce(
  (swapped, [key, value]) => ({ ...swapped, [value]: key }),
  {}
)

const shouldWin = (play) => play === "Z"
const shouldLose = (play) => play === "X"

const getPlay = (desiredResult, playerOne) => {
  if (shouldWin(desiredResult)) {
    return Loses[playerOne]
  }
  if (shouldLose(desiredResult)) {
    return Beats[playerOne]
  }
  return playerOne
}

const IsRock = (play) => play === "A" || play === "X"
const IsPaper = (play) => play === "B" || play === "Y"
const IsCuttyThing = (play) => play === "C" || play === "Z"
const IsSame = (a, b) =>
  (IsRock(a) && IsRock(b)) ||
  (IsPaper(a) && IsPaper(b)) ||
  (IsCuttyThing(a) && IsCuttyThing(b))

const playToPoints = (play) => {
  switch (play) {
    case "A":
      return 1
    case "B":
      return 2
    case "C":
      return 3
  }
}

const resultToPoints = (playerOne, playerTwo) => {
  if (IsSame(playerOne, playerTwo)) {
    return [3, 3]
  }
  if (IsRock(playerOne) && IsPaper(playerTwo)) {
    return [0, 6]
  }
  if (IsPaper(playerOne) && IsCuttyThing(playerTwo)) {
    return [0, 6]
  }
  if (IsCuttyThing(playerOne) && IsRock(playerTwo)) {
    return [0, 6]
  }
  return [6, 0]
}

const calculatePoints = (playerOne, desiredResult) => {
  const playerTwo = getPlay(desiredResult, playerOne)
  let [resultOne, resultTwo] = resultToPoints(playerOne, playerTwo)
  console.log("calculating poiunts", playerOne, desiredResult, resultOne, resultTwo)

  resultOne += playToPoints(playerOne)
  resultTwo += playToPoints(playerTwo)

  return [resultOne, resultTwo]
}

const rawData = ReadInput("./inputs/rock-paper-cutty.real.txt")
const games = rawData.split("\n").map((game) => game.split(" "))
console.log(
  games
    .map(([playerOne, desiredResult]) =>
      calculatePoints(playerOne, desiredResult)
    )
    .reduce((total, [_, playerTwo]) => (total += playerTwo), 0)
)
