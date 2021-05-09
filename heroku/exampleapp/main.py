from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"  

# Herokuflask git remote linking to https://git.heroku.com/sk-flaskeg.git