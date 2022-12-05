import { readFileSync } from "fs"

const data = readFileSync("2022/Inputs/day3.txt").toString()
const zData = data
.split("\r\n")

function calculateSum(x: (string | undefined)[]) {
    return x.reduce((a,c) => {
        if(!c) return a
        const v = c.charCodeAt(0)
        return a + (v >= 97 ? v - 96 : v - 38)
    },0)
}

function day3_p1() {
    const sacks = zData.map(x => [x.slice(0, x.length/2), x.slice(x.length/2)])

    const intersection = sacks.map(x => {
        for(let i of x[0]) {
            if(x[1].includes(i)) return i
        }
    })

    return calculateSum(intersection)
}

function day3_p2() {
    const badges = []

    for(let i = 1; i <= zData.length/3; i++) {
        for(let x of zData[3 * i - 3]) {
            if(zData[3 * i - 2].includes(x) && zData[3 * i - 1].includes(x)) {
                badges.push(x)
                break;
            }
        }
    }

    return calculateSum(badges)
}

console.log(`Day 3 Part 1 answer is: ${day3_p1()}`)
console.log(`Day 3 Part 2 answer is: ${day3_p2()}`)