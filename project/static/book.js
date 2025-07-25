function passVars(vars) {return vars}

function mod(n, m) {
    return ((n % m) + m) % m
}

var multi_index = 0

document.addEventListener("DOMContentLoaded", function(event) { 
    var scrollpos = localStorage.getItem('scrollpos')
    if (scrollpos) {window.scrollTo(0, scrollpos)}
    document.getElementsByClassName('line')[line].scrollIntoView({ behavior: "smooth", block: "start"})
    if (enable == 0) {
        click_line(line)
    } else if (enable == 1) {
        for (x in multi_instances) {for (instance in multi_instances[x]) {multi_instances[x][instance].unmark()}}
        multi_instances = {}
        lines = document.getElementsByClassName("line")
        let num = 0
        while (lines[num].getBoundingClientRect().top < 0) {num++}
        for (let i = Math.max(0,num-15); i < num+15; i++) {
            click_line(i)
        }
    }
})

document.addEventListener("scroll", (event) => {
    localStorage.setItem('scrollpos', window.scrollY);
    if (enable == 1) {
        for (x in multi_instances) {for (instance in multi_instances[x]) {multi_instances[x][instance].unmark()}}
        multi_instances = {}
        lines = document.getElementsByClassName("line")
        let num = 0
        while (lines[num].getBoundingClientRect().top < 0) {num++}
        for (let i = Math.max(0,num-15); i < num+15; i++) {
            click_line(i)
        }
    }
})

var multi_instances = {}

function click_line(num, index = 0, second_index = -1) {
    index = mod(index,scansion[num].length)
    multi_index = index

    if (enable == 0) {
        clicked = num
        for (x in multi_instances) {for (instance in multi_instances[x]) {multi_instances[x][instance].unmark()}}
        multi_instances = {}
        let els = document.getElementsByClassName("arrow-container")
        for (let i = 0; i < els.length; i++) {els[i].style.visibility = "hidden"}
        for (image of document.getElementsByClassName("line-syllables-image")) {image.style.visibility = "hidden"}
    }
    if (scansion[num].length > 1) {document.getElementById(`arrow-container${num}`).style.visibility = "visible"}
    if (num in multi_instances) {for (instance in multi_instances[num]) {multi_instances[num][instance].unmark()}}
    multi_instances[num] = []

    for (image of document.getElementsByClassName(`line-syllables-image${num}`)) {image.style.visibility = "visible"}

    line_syllables = document.getElementsByClassName(`line-syllables-${num}`)

    let scan = scansion[num][index].replaceAll('d','-uo').replaceAll('s','li')
    for (let i=0; i<line_syllables.length; i++) {
        if (scan.length == 0) {type = "error"}
        else {if (scan[i] == '-') {type = "dactyl-long"} 
        else if (scan[i] == 'u') {type = "dactyl-short1"} 
        else if (scan[i] == 'o') {type = "dactyl-short2"} 
        else if (scan[i] == 'l') {type = "spondee1"}
        else if (scan[i] == 'i') {type = "spondee2"}}
        instance = new Mark(line_syllables[i])
        instance.mark(line_syllables[i].innerHTML, {"className":type})
        multi_instances[num].push(instance)
    }
}

function check_all() {
    for (num in multi_instances) {for (instance in multi_instances[num]) {multi_instances[num][instance].unmark()}}
    multi_instances = {}
    if (enable == 1) {
        enable = 0
    } else if (enable == 0) {
        enable = 1
        for (let i = Math.max(0,line-15); i < line+15; i++) {
            click_line(i)
        }
    }
}