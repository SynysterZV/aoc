import { readFileSync } from "fs"


/*
 A/X = Rock = 1
 B/Y = Paper = 2
 C/Z = Scissors = 3
*/

const Scores = {
    "Rock": 1,
    "Paper": 2,
    "Scissors": 3
} 

const Mappings = {
    "X": "Rock",
    "Y": "Paper",
    "Z": "Scissors",

    "A": "Rock",
    "B": "Paper",
    "C": "Scissors"
} as const

type Input = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'][]

function decideWinner(input: string[]) {
    switch(input[0]) {
        case "A":
            if(input[1] == "X") return null
            return input[1] == "Y"
        case "B":
            if(input[1] == "Y") return null
            return input[1] == "Z"
        case "C":
            if(input[1] == "Z") return null
            return input[1] == "X"
    }
}

function decideLose(input: string): "Rock" | "Paper" | "Scissors" {
    switch(input) {
        case "A":
            return "Scissors"
        case "B":
            return "Rock"
    }

    return "Paper"
}

function decideWin(input: string): "Rock" | "Paper" | "Scissors" {
    switch(input) {
        case "A":
            return "Paper"
        case "B":
            return "Scissors"
    }

    return "Rock"
}

const data = readFileSync("2022/Inputs/day2.txt").toString()
const zData = data.split("\r\n").map(x => x.split(" "))

function day2_p1() {
    return (zData as Input).reduce((a,c) => {
        const win = decideWinner(c)
        const x = Scores[Mappings[c[1]]]
        if(win == null) return a + x + 3
        return win ? a + x + 6 : a + x
    }, 0)
}

function day2_p2() {
    return (zData as Input).reduce((a,c) => {
        switch(c[1]) {
            case "X": 
                return a + Scores[decideLose(c[0])]
            case "Y":
                return a + Scores[Mappings[c[0]]] + 3
            case "Z":
                return a + Scores[decideWin(c[0])] + 6
        }
    }, 0)
}


console.log(`Day 2 Part 1 Answer is: ${day2_p1()}`)
console.log(`Day 2 Part 2 Answer is: ${day2_p2()}`)