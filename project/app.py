from flask import Flask, render_template, redirect, url_for, request
import os
from os import environ as env
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

book = 0
line = 0
raw_text = []

def update_book():
    global raw_text
    global book

    raw_text = open(os.path.join("project/raw_text/",f"book{book}.txt"),"r", encoding="utf8").readlines()

update_book()

@app.route('/')
def index():
    return render_template('index.html', raw_text=raw_text, book=book, line=line)

@app.route('/go_to_book', methods=['POST'])
def go_to_book():
    global book
    requested_book = str(request.form.get('go-to-book'))
    if all([i in '0123456789' for i in requested_book]) and requested_book != '':
        if int(requested_book) >= 1 and int(requested_book) <= 24:
            book = int(requested_book)-1
            update_book()
    return redirect(url_for('index'))

@app.route('/go_to_line', methods=['POST'])
def go_to_line():
    global line
    global raw_text
    requested_line = str(request.form.get('go-to-line'))
    if all([i in '0123456789' for i in requested_line]) and requested_line != '':
        if int(requested_line) >= 1 and int(requested_line) <= len(raw_text)+1:
            line = int(requested_line)-1
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=env.get("PORT", 5000))