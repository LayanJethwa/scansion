
# Automated scansion for Homer's Iliad

This project is an automated tool I have created, that can scan the metrical structure of the entirety of Homer's Iliad, with a success rate of over 99%.

The project is made in Python, and I have created a UI for it as well. My hope is that this will be of use both as a teaching tool and a data analysis tool for linguistic means.
## Demo

~~https://layanjethwa.github.io/scansion/~~

~~This is a PyGame program, compiled with WASM in order to run on a website - loading may be slow.~~

https://scansion-computer.vercel.app/

This is not finished yet (the second screen isn't functioning), but I have ported the PyGame program manually to a Flask environment so it runs a lot faster and smoother.


## What does this all mean?

Scansion, or scanning a line, refers to the process of determining the metrical structure of a line of verse.

In Homer's Iliad, an Ancient Greek epic poem first written down in the 8th century BC, the structure of each line is in *dactylic hexameter*.

This means that there are 6 blocks, or *feet*, per line. Each foot can either be a *dactyl*, or a *spondee*. The metre is determined by vowel length - vowels can either be long (-) or short (u).

A dactyl has the pattern -uu, and a spondee has the pattern --.

The pattern of dactyls and spondees within each line is calculated according to set rules and linguistic patterns, which enables it to be logically worked out by a computer.
## Why?

I embarked upon this project as it was interesting to me, and I thought it would be fun to make.

- The structure of the verse is calculated according to set rules
    - These rules are logical and follow linguistic phenomena
- As a mathematician, coder and linguist, this was especially interesting to me
    - If the rules are logical, then a computer should be able to follow them easily
    - The exceptions to the rules, which could be identified through data analysis, would be of particular linguistic interest
- There have been a few previous attempts at this, but they have had various pitfalls
    - Being in the unique position of studying both Classical Greek and Computer Science, I might be able to succeed where others had failed
## Features

- Scans 15595/15693 total lines
- Deterministically calculates irregularities using a recursive pattern-matching algorithm
- Extra display of information to show how the scansion is calculated - useful as a teaching tool
- Can output multiple options for each line if the scansion is indeterminate
- Book and line lookup tools for ease of use
- UI with syllable divisions, highlighting and symbols for the scansion, rendered in a polytonic, Unicode-compatible Greek typeface
- *Show all* button to display scansion for all the lines on screen
- Smooth scrolling

## Optimizations

After creating the algorithm and UI, I refactored the entire rendering algorithm to run smoother on lower-end devices, and allow for a *show all* button without sacrificing performance.

The website was previously created with PyGame and hosted on GitHub Pages using WASM, which ran very slowly, and took a while to load. I have now ported it manually to a web app, using a Python Flask backend and HTML/CSS/JS frontend.


## Acknowledgements

 - [Gentium typeface](https://software.sil.org/gentium/)
 - [Syllable divisions](https://www.jstor.org/stable/695184?read-now=1&seq=2#page_scan_tab_contents)
 - [Hypotactic (website with manual scansion to compare against)](https://hypotactic.com/latin/index.html?Use_Id=iliad1)

****
