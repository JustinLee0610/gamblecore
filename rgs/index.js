alert("aaaaa")

const root = document.querySelector(":root")
const introFrame = document.querySelector(".intro")
const helpFrame = document.querySelector(".help")
const aboutFrame = document.querySelector(".about")
const playButton = document.querySelector(".PlayButton")
const gameFrame = document.querySelector(".gameFrame")
const statsFrame = document.querySelector(".statsFrame")
const statsChildren = Array.from(statsFrame.childNodes)

let currentTheme = 0
let currentWindow = introFrame
let switchingWindows = false

const themes = {
  light: ["rgb(240,240,240)", "white", "rgb(200,200,200)", "rgb(250,250,250)"],
  dark: [
    "rgb(30,30,30)",
    "rgb(50,50,50)",
    "rgb(80,80,80)",
    "rgb(60,60,60)",
    "white",
  ],
}

const chances = {
  rice: 1 / 10,
  noodles: 1 / 20,
  dumplings: 1 / 50,
  dog: 1/ 100,
  wine: 1 / 500,
}

const stats = {
  rice: { amt: 0, label: "🍚" },
  noodles: { amt: 0, label: "🍜" },
  dumplings: { amt: 0, label: "🥟" },
  dog: { amt: 0, label: "🐕" },
  wine: { amt: 0, label: "🍾" },
  money: { amt: 0, label: "💰" },
  drunkness: { amt: 0, label: "🥴🍷 drunkness", end: "%" },
}

function fadeFrame(frame, toggle) {
  let anim = "fade-out"
  frame.style.display = "block"
  if (toggle) {
    anim = "fade-in"
    frame.style.opacity = "1"
  }else{
  	frame.style.opacity = "0"
  }
  
  frame.style.animation = anim + " 0.5s"
  setTimeout(function () {
    frame.style.animation = ""
    if (toggle) {
      frame.style.display = "block"
      frame.style.opacity = "1"
    } else {
      frame.style.display = "none"
      frame.style.opacity = "0"
    }
  }, 600)
}

function switchWindow(window) {
  if (switchingWindows) {
    return
  }
  switchingWindows = true
  fadeFrame(currentWindow, false)
  fadeFrame(window, true)
  currentWindow = window
  setTimeout(function () {
    switchingWindows = false
  }, 800)
}

function toggleTheme(theme) {
  const keys = Object.keys(themes)
  currentTheme += 1
  if (theme) {
    currentTheme = theme
  }
  if (currentTheme > keys.length - 1) {
    currentTheme = 0
  }
  const themeData = themes[keys[currentTheme]]
  root.style.setProperty("--mainbg", themeData[0])
  root.style.setProperty("--uibg", themeData[1])
  root.style.setProperty("--uiborder", themeData[2])
  root.style.setProperty("--uiInner", themeData[3])
  root.style.setProperty("--text", themeData[4])
}

function setStat(name, value, updateUi) {
  const keys = Object.keys(stats)
  const index = keys.indexOf(name)
  stats[name].amt = value
  if (updateUi) {
    const statFrame = statsFrame.childNodes[index * 2 + 1]
    statFrame.innerHTML = stats[name].label + ": " + value
  }
}

function addToStat(name, value, updateUi) {
  const keys = Object.keys(stats)
  const index = keys.indexOf(name)
  value = stats[name].amt + value
  stats[name].amt = value
  if (updateUi) {
    const statFrame = statsChildren[index * 2 + 1]
    const end = stats[name].end || ""
    statFrame.innerHTML =
      stats[name].label + ": " + Math.round(value * 100) / 100 + end
    statFrame.style.transform = "translateY(calc(-50% + 3px))"
    setTimeout(function () {
      statFrame.style.transform = ""
    }, 100)
  }
}

function getGambleResult() {
  let weight = -stats.drunkness.amt
  const keys = Object.keys(chances)

  keys.forEach(function (name) {
    const chance = chances[name]
    weight += chance
  })

  const randValue = Math.random() * weight
  let result = false
  weight = -stats.drunkness.amt

  keys.forEach(function (name) {
    if (result) {
      return
    }
    const chance = chances[name]
    weight += chance
    if (randValue <= weight) {
      result = name
      return
    }
  })

  return result || keys[keys.length - 1]
}

function gamble() {
  const result = getGambleResult()
  addToStat(result, 1, true)
}

function eat() {}

function drink() {
  if (stats.wine.amt <= 0) {
    return
  }
  addToStat("drunkness", 0.005, true)
  addToStat("wine", -1, true)
}

function play() {
  alert("plz work")
  switchWindow(gameFrame)
  if (playButton.innerHTML == "🙂 begin addiction") {
    setTimeout(function () {
      playButton.innerHTML = "🙂 continue addiction"
    }, 600)
  }
  alert("should have worked")
}
