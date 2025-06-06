from flask import Flask, render_template, redirect, url_for, request
import os
from os import environ as env
from dotenv import find_dotenv, load_dotenv
import pickle

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

book = 0
line = 0
raw_text = []
lines_scansion = []
lines_syllables = []
syllable_indices = []
clicked = 0
enable = 0
second_clicked = 0

def update_book():
    global raw_text
    global book
    global lines_scansion
    global lines_syllables
    global lines_punctuation

    raw_text = open(os.path.join("project/raw_text/",f"book{book}.txt"),"r", encoding="utf8").readlines()
    with open(os.path.join("project/data/calculations/",f"book{book}"), "rb") as file:
        lines_scansion = pickle.load(file)
    with open(os.path.join("project/data/syllables/syllables/",f"book{book}"), "rb") as file:
        lines_syllables = pickle.load(file)
    with open(os.path.join("project/data/syllables/punctuation/",f"book{book}"), "rb") as file:
        lines_punctuation = pickle.load(file)

update_book()

@app.route('/book/<local_book>')
def index(local_book):
    global book
    book = int(local_book)-1
    if book > 23 or book < 0:
        return render_template('404.html'), 404
    else:
        update_book()
        return render_template('index.html', 
                            raw_text=raw_text, 
                            book=int(book), 
                            line=line, 
                            syllable_indices=syllable_indices, 
                            clicked=clicked, 
                            scansion=lines_scansion, 
                            lines_syllables=lines_syllables, 
                            enabled=enable,
                            lines_punctuation=lines_punctuation)
    
@app.route('/book/<local_book>/line/<local_line>')
def index_clicked(local_book, local_line):
    return render_template('clicked.html',
                           book=int(local_book)-1,
                           line=int(local_line)-1)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/go_to_book', methods=['POST'])
def go_to_book():
    global book
    global line
    requested_book = str(request.form.get('go-to-book'))
    if all([i in '0123456789' for i in requested_book]) and requested_book != '':
        if int(requested_book) >= 1 and int(requested_book) <= 24:
            book = int(requested_book)-1
            line = 0
            update_book()
    return redirect(url_for('index', local_book=book+1))

@app.route('/go_to_line', methods=['POST'])
def go_to_line():
    global line
    global raw_text
    requested_line = str(request.form.get('go-to-line'))
    if all([i in '0123456789' for i in requested_line]) and requested_line != '':
        if int(requested_line) >= 1 and int(requested_line) <= len(raw_text)+1:
            line = int(requested_line)-1
    return redirect(url_for('index', local_book=book+1))

@app.route('/show_all', methods=['POST'])
def show_all():
    global enable
    enable = int(request.form.get('enable-input'))
    return redirect(url_for('index', local_book=book+1))

@app.route('/second_click', methods=['POST'])
def second_click():
    global book
    local_line = int(request.form.get('line-number'))
    return redirect(url_for('index_clicked', local_book=book+1, local_line=local_line))

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=env.get("PORT", 5000))