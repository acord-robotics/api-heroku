from flask import (
    Flask,
    render_template
)
import connexion

# Create the application instance
app = connexion.App(__name__, specification_dir="./")
app.add_api('swagger.yml')

"""
"DSP-26 Customise (slightly) ares dashboard in `templates` and add flask base" -m "To compare with the connexion api we built, including some swagger stuff. https://github.com/greyli/apiflask/find/master. https://github.com/flasgger/flasgger/find/master. https://github.com/automationhacks/people-api/find/master. https://github.com/louisvarley/fishPI. Creative Tim Flask Dashboard for styling tips and placement advice. https://pypi.org/project/flask-swagger/ https://github.com/hack4impact/flask-base/tree/master/app/templates"
"""

# Create a URL route in our application for "/"
@app.route('/')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/

    :return:        the rendered template 'home.html'
    """
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=True) 