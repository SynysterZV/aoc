import { readFileSync } from "fs"

const data = readFileSync('Inputs/day1.txt').toString()
const zData = data.split("\n\n").map(x => x.split("\n").reduce((a,c) => a+parseInt(c), 0))

function day1_p1() {
    return Math.max(...zData)
}

function day1_p2() {
    return zData.sort((a,b) => b - a).slice(0,3).reduce((a,c) => a+c, 0)
}

console.log(`Day 1 Part 1 answer is: ${day1_p1()}`)
console.log(`Day 1 Part 2 answer is: ${day1_p2()}`)