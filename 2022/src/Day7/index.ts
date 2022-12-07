import { readFileSync } from "fs"

const data = readFileSync("2022/Inputs/day7.txt").toString()
const zData = data.trim().split("\r\n").filter(x => !x.startsWith("$ ls"))

interface FS { 
    parent: FS | null;
    children: Record<string,FS>;
    name: string
    size: number
    dir: boolean 
}

const fs: FS = {
    parent: null,
    children: {},
    name: "/",
    size: 0,
    dir: true
}

let current = fs

for(let i of zData) {
    if(i.startsWith("$ cd")) {
        let path = i.split(" ")[2]
        if(path == "/") current = fs
        else if(path == "..") current = current.parent ?? current
        else {
            current = current.children[path]
        }
    }

    else if(i.startsWith('dir')) {
        let path = i.split(" ")[1]
        current.children[path] = {
            parent: current,
            children: {},
            name: path,
            size: 0,
            dir: true
        }
    }

    else {
        let [size, name] = i.split(" ")
        current.children[name] = {
            parent: current,
            children: {},
            name,
            size: parseInt(size),
            dir: false
        }
    }
}

function findSize(node: FS) {
    node.size += Object.entries(node.children).reduce((a,[_,v]) => a + findSize(v), 0)
    return node.size
}

findSize(fs)

function findBelow(node: FS): number {
    const currsize = node.size < 100000 && node.dir ? node.size : 0
    const sumChildren = Object.entries(node.children).map(([_,v]) => findBelow(v))
    return Number(currsize) + sumChildren.reduce((a,x) => a+x, 0)
}

function findSmallest(node: FS, sizes = [0]) {
    for(let [_,v] of Object.entries(node.children)) {
        if(v.dir) sizes.push(v.size)
        findSmallest(v, sizes)
    }

    const needed = 30000000 - (70000000 - fs.size)

    return sizes.reduce((a,c) => Math.abs(c - needed) < Math.abs(a - needed) ? c : a)
}

console.log(findBelow(fs))
console.log(findSmallest(fs))