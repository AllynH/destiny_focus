# -*- coding: utf-8 -*-
"""Public section, including homepage and signup."""
from flask import (
    Blueprint,
    current_app,
    flash,
    g,
    redirect,
    render_template,
    request,
    url_for,
    session,
    jsonify
)
from flask_login import login_required, login_user, logout_user, current_user

from destiny_focus.extensions import login_manager
from destiny_focus.public.forms import LoginForm
from destiny_focus.user.forms import RegisterForm
from destiny_focus.user.models import User
from destiny_focus.utils import flash_errors
from destiny_focus.oauth import OAuthSignin
from destiny_focus.bungie.bungie_api_unauth import BungieApiUnauth
import requests

blueprint = Blueprint("public", __name__, static_folder="../static")

@blueprint.before_request
def before_request():
    """
    Executed before a request is made.
    Refresh user credentials here.
    """
    print("\n\nUnauth redirect")
    print(request.endpoint)
    if not request.endpoint == "public.pgcr":
        g.user = current_user
        if g.user.is_authenticated:
            print(g.user)
            print(g.user.refresh_ready)
            return redirect(url_for('auth.home'))

@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    return User.get_by_id(int(user_id))


@blueprint.route("/", methods=["GET", "POST"])
def home():
    """Home page."""
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
    return render_template("public/home.html", form=form,)


@blueprint.route("/authorize/<provider>")
def oauth_authorize(provider):
    """ Authorize URL for a given provider."""
    # flash("You are in the Authorize URL.", "info")
    # if not current_user.is_anonymous:
    #     return redirect(url_for('index'))
    print("looking for OAuthSignin", provider)
    oauth = OAuthSignin(provider).get_provider(provider)
    return oauth.authorize()


@blueprint.route("/logout/")
@login_required
def logout():
    """Logout."""
    logout_user()
    flash("You are logged out.", "info")
    return redirect(url_for("public.home"))


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
        return redirect(url_for("public.home"))
    else:
        flash_errors(form)
    return render_template("public/register.html", form=form)


@blueprint.route("/about/")
def about():
    """About page."""
    form = LoginForm(request.form)
    return render_template("public/about.html", form=form)

@blueprint.route("/get/pgcr/<activityId>/")
def get_pgcr(activityId):
    
    my_api = BungieApiUnauth()

    activity = my_api.get_pgcr(activityId)

    return jsonify(activity)

@blueprint.route("/pgcr/<int:activityId>")
def pgcr(activityId):
    # user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    # my_api = BungieApi(user)

    # get_account_res = my_api.GetCurrentBungieAccount()
    return render_template("auth/pgcr.html")

