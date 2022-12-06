import { readFileSync } from "fs";

const data = readFileSync("2022/Inputs/day6.txt").toString().split("")

function getMarker(ps = 4) {
    const markerIdx = data.findIndex((_,i) => {
        const window = data.slice(i, i + ps)
        return [...new Set(window)].length === window.length
    })

    return markerIdx + ps
}

console.log(`Day 6 Part 1 answer is: ${getMarker()}`)
console.log(`Day 6 Part 2 answer is: ${getMarker(14)}`)