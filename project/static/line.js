document.addEventListener("DOMContentLoaded", function () {
    description = document.getElementById('description')

    descriptions = {
        "a0": "Naturally long: The vowels 'ω' and 'η' are naturally long, as are all diphthongs (two vowels making a single sound, 'αι', 'αυ', 'ει', 'ευ', 'οι', 'ου', 'ηυ' and 'υι' in Homeric Greek).",
        "a1": "Naturally short: The vowels 'ε' and 'ο' are naturally short.",
        "a2": "Naturally indefinite: The vowels 'α', 'ι' and 'υ' can be either long or short.",
        "a3": "Positional lengthening: A vowel when followed by a consonant cluster or a compound ('ζ', 'ξ' and 'ψ') is lengthened. A consonant of 'λ','μ','ν','ρ','δ' or 'σ' can sometimes act duplicated, also lengthening.",
        "a4": "Muta cum liquida: A vowel followed by a mute (plosive - 'π'/'β'/'φ', 'τ'/'δ'/'θ' and 'κ'/'γ'/'χ') and then a liquid ('λ','μ','ν' and 'ρ') can be either long or short.",
        "a5": "Brevis in longo: The final two syllables in each line are always metrically long (forming a spondee), regardless of natural length.",
        "a6": "Epic correption: A long vowel at the end of a word is usually shortened if followed by another vowel at the start of the next word.",
        "a7": "Synizesis: This is quite a rare phenomenon, and is where two vowels that do not form a diphthong merge to become a single syllable, for the purposes of the metre.",
        "a8": "Diaeresis: The diacritic of the two dots above a vowel indicates that the vowel is pronounced separately and is not part of a diphthong, ie. it is its own syllable."
    }

    attribute_colours = new Array(9).fill("rgb(218,220,223)")

    attributes = document.querySelectorAll("#attributes span")
    attributes.forEach(span => {
        span.addEventListener("mouseenter", () => {
            if (descriptions[span.id]) {
                description.innerHTML = descriptions[span.id]
                if (attribute_colours[+span.id[1]] == "rgb(218,220,223)") {
                    span.style.borderColor = "rgb(255,180,128)"
                } else {
                    span.style.borderColor = "rgb(230,94,0)"
                }
            }
        });
        span.addEventListener("mouseleave", () => {
            description.innerHTML = ""
            span.style.borderColor = attribute_colours[+span.id[1]]
        })
    })

    click_syllable(0)
})

function strip(s) {
    const normalized = s.normalize('NFD');
    let result = '';

    for (const c of normalized) {
        const keep = !(
            /\p{Mn}|\p{Po}|\p{Sk}|\p{Pf}|\p{Lm}/u.test(c)
        ) ^ (c === '̈'); // diaeresis (U+0308)
        
        if (keep) {
            result += c;
        }
    }

    return result;
}

vowels = ['α','ε','η','ι','ο','ω','υ','0','1','2','3','4','5','6','7','8']

function click_syllable(num) {
    syllable_attributes = lines_attributes[line][num]
    if (syllable_attributes.includes(0)) {type = "long"}
    else if (syllable_attributes.includes(1)) {type = "short"}
    else if (syllable_attributes.includes(2)) {type = "indeterminate"}
    if (typeof instance !== 'undefined') {instance.unmark()}
    instance = new Mark(document.getElementById(`syllable${num}`))
    instance.mark(document.getElementById(`syllable${num}`).innerHTML, {"className":type})

    for (let i = 0; i < attributes.length; i++) {
        if (syllable_attributes.includes(i)) {
            attribute_colours[i] = "rgb(0,0,0)"
            attributes[i].style.borderColor = "rgb(0,0,0)"
        } else { 
            attribute_colours[i] = "rgb(218,220,223)"
            attributes[i].style.borderColor = "rgb(218,220,223)"
        }
    }

    onset = ''
    nucleus = ''
    coda = ''
    for (char of lines_syllables[line][num]) {
        if (!(vowels.includes(strip(char).replace('̈','').toLowerCase()))) {
            if (nucleus == '') {
                onset += char
            } else {
                coda += char
            }
        } else {
            nucleus += char
        }
    }

    cluster = coda
    char = 0
    if (num < lines_syllables[line].length-1) {
        while (char < lines_syllables[line][+num+1].length-1) {
            if (!(vowels.includes(strip(lines_syllables[line][+num+1][char]).replace('̈','')))) {
                cluster += lines_syllables[line][+num+1][char]
                char += 1
            } else {
                char = 10000
            }
        }
    }

    if (onset == '') {
        onset = '∅'
    }
    if (coda == '') {
        coda = '∅'
    }
    if (cluster == '') {
        cluster = '∅'
    }

    document.getElementById("onset").innerHTML = `Onset: ${onset}`
    document.getElementById("nucleus").innerHTML = `Nucleus: ${nucleus}`
    document.getElementById("coda").innerHTML = `Coda: ${coda}`
    document.getElementById("cluster").innerHTML = `Consonant(s) following: ${cluster}`

    for (image of document.getElementsByClassName("syllable-images")) {
        image.style.visibility = "hidden"
    }
    document.getElementById(`syllable-image${num}`).style.visibility = "visible"

}