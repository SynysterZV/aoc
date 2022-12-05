import { readFileSync } from "fs";

const data = readFileSync("2022/Inputs/day4.txt").toString()
const zData = data
                .split("\r\n")
                .map(x => x.split(",").map(y => y.split("-").map(z => parseInt(z))))

function day4_p1() {
    let sum = 0

    for(let y of zData) {

        const min = Math.min(y[0][0], y[1][0])
        const max = Math.max(y[0][1], y[1][1])

        if(
            (y[0][0] == min && y[0][1] == max) 
        ||  (y[1][0] == min && y[1][1] == max)
        ) ++sum
    }

    return sum
}

function day4_p2() {
    let sum = 0

    for(let y of zData) {
        if(
            (y[0][0] >= y[1][0] && y[0][0] <= y[1][1])
        ||  (y[0][1] >= y[1][0] && y[0][1] <= y[1][1])
        ||  (y[1][0] >= y[0][0] && y[1][0] <= y[0][1])
        ||  (y[1][1] >= y[0][0] && y[1][1] <= y[0][1])
        ) ++sum
    }

    return sum
}

console.log(`Day 4 Part 1 answer is: ${day4_p1()}`)
console.log(`Day 4 Part 2 answer is: ${day4_p2()}`)