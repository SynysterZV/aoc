import { readFileSync } from "fs"
import _ from "lodash"

const data = readFileSync("2022/Inputs/day5.txt").toString()
const [legend, moves] = data
                .split("\r\n\r\n")

const zData = moves
                .split("\n")
                .map(x => 
                    x.split(" ")
                    .map(y => parseInt(y))
                    .filter(y => !Number.isNaN(y))
                )

const crates = legend
                    .split("\n")
                    .map(crate => Array.from(
                        new Array(Math.ceil(crate.length/4)),
                        (_, i) => crate.slice(i * 4 + 1, i * 4 + 2)
                    ))

const stacks = crates[0]
                    .map((_, i) => crates
                            .map(crate => crate[i])
                            .filter(crate => crate !== ' ')
                        )

const p1Clone = _.cloneDeep(stacks)
const p2Clone = _.cloneDeep(stacks)

function day5_p1() {

    for(let x of zData) {

        const count = x[0]
        const from = x[1] - 1
        const to = x[2] - 1

        // @ts-ignore
        p1Clone[to].unshift(...p1Clone[from].splice(0,count).reverse())
    }

    return p1Clone.map(x => x[0]).join("")
}

function day5_p2() {

    for(let x of zData) {

        const count = x[0]
        const from = x[1] - 1
        const to = x[2] - 1

        // @ts-ignore
        p2Clone[to].unshift(...p2Clone[from].splice(0,count))
    }

    return p2Clone.map(x => x[0]).join("")
}

console.log(`Day 5 Part 1 answer is: ${day5_p1()}`)
console.log(`Day 5 Part 2 answer is: ${day5_p2()}`)