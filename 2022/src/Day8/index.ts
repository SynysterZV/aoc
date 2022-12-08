import { readFileSync } from "fs";

const data = readFileSync("2022/Inputs/day8.txt").toString()
const zData = data.split("\r\n")

function fmt(x: string): number[] {
    return x.split("").map(x => parseInt(x))
}

const rows = zData.length
const cols = zData[0].length

let visible = 0
let scenic = 0

for(let i = 0; i < rows; i++) {
    let row = zData[i]

    for(let j = 0; j < cols; j++) {
        let col = zData.map((x) => x[j]).join('')
        
        if([i,j].some(x => [0, rows-1, cols-1].includes(x))) {
            visible += 1
            continue
        }

        let tree = parseInt(zData[i][j])

        const xx = fmt(row).slice(0, j)
        const xy = fmt(row).slice(j+1)
        const yx = fmt(col).slice(0, i)
        const yy = fmt(col).slice(i+1)

        if(
              Math.max(...xx) < tree
        ||    Math.max(...xy) < tree
        ||    Math.max(...yx) < tree
        ||    Math.max(...yy) < tree
        ) visible += 1

        function blocked(v: number[]) {
            let sum = 0
            for(let x of v) {
                sum += 1
                if(x >= tree) return sum
            }

            return sum
        }

        let curr = 1

        curr *= blocked(xx.reverse()) 
        curr *= blocked(xy)
        curr *= blocked(yx.reverse())
        curr *= blocked(yy)

        if(curr > scenic) {
            scenic = curr
        }
    }
}

console.log(visible)
console.log(scenic)