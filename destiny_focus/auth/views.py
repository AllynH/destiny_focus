# -*- coding: utf-8 -*-
"""Auth section, authorized views. User is logged in."""
from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    session,
    jsonify
)
from flask_login import login_required, login_user, logout_user, current_user

from destiny_focus.extensions import login_manager
from destiny_focus.auth.forms import LoginForm
from destiny_focus.user.forms import RegisterForm
from destiny_focus.user.models import User
from destiny_focus.utils import flash_errors
from destiny_focus.oauth import OAuthSignin
import requests
# import datetime

blueprint = Blueprint("auth", __name__, url_prefix="/auth", static_folder="../static")


@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    return User.get_by_id(int(user_id))


@blueprint.route("/", methods=["GET", "POST"])
def home():
    """home page."""
    form = LoginForm(request.form)
    current_app.logger.info("Hello from the home page!")
    # Handle logging in
    if request.method == "POST":
        if form.validate_on_submit():
            login_user(form.user)
            flash("You are logged in.", "success")
            redirect_url = request.args.get("next") or url_for("user.members")
            return redirect(redirect_url)
        else:
            flash_errors(form)
    return render_template("auth/home.html", form=form)


@blueprint.route("/authorize/<provider>")
def oauth_authorize(provider):
    """ Authorize URL for a given provider."""
    flash("You are in the Authorize URL.", "info")
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    print("looking for OAuthSignin", provider)
    oauth = OAuthSignin(provider).get_provider(provider)
    return oauth.authorize()


@blueprint.route("/callback/<provider>")
def oauth_callback(provider):
    """ Callback URL for a given provider."""
    flash("You are in the callback URL.", "info")

    # Get token from Bungie:
    oauth           = OAuthSignin(provider).get_provider(provider)
    response    = oauth.get_callback_url()

    # Handle CSRF error:
    if response is False:
        return render_template("401.html")

    auth_headers                    = {}
    token_json                      = response.json()['access_token']
    membership_id                   = response.json()["membership_id"]
    auth_headers["X-API-Key"]       = OAuthSignin(provider).api_key
    auth_headers["Authorization"]   = 'Bearer ' + str(token_json)
    auth_headers["membership_id"]   = str(membership_id)




    membership_id = auth_headers["membership_id"]

    # Create and authorized session for making requests:
    auth_session = requests.Session()
    auth_session.headers = {
        "X-API-Key"     : auth_headers['X-API-Key'],
        'Authorization' : auth_headers['Authorization']
    }

    # Get Bungie Profile:
        #  This gives membership type - which is needed for all subsequent calls. 
    get_user_url = "https://www.bungie.net/Platform/User/" + "GetCurrentBungieAccount/"
    user_res = auth_session.get(get_user_url)

    # Return the raw JSON content:
    return jsonify(user_res.json())
    return redirect(url_for("auth.home"))
    # TODO: 
    # Store data in database
    # Go to another route:
    # Make badass application!
    # return redirect(url_for("auth.home"))    

@blueprint.route("/logout/")
@login_required
def logout():
    """Logout."""
    logout_user()
    flash("You are logged out.", "info")
    return redirect(url_for("auth.home"))


@blueprint.route("/register/", methods=["GET", "POST"])
def register():
    """Register new user."""
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        User.create(
            username=form.username.data,
            email=form.email.data,
            password=form.password.data,
            active=True,
        )
        flash("Thank you for registering. You can now log in.", "success")
        return redirect(url_for("auth.home"))
    else:
        flash_errors(form)
    return render_template("auth/register.html", form=form)


@blueprint.route("/about/")
def about():
    """About page."""
    form = LoginForm(request.form)
    return render_template("auth/about.html", form=form)
