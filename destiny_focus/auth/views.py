# -*- coding: utf-8 -*-
"""Auth section, authorized views. User is logged in."""
from flask import (
    Blueprint,
    current_app,
    g,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    session,
    jsonify
)
from flask.wrappers import Response
from flask_login import login_required, login_user, logout_user, current_user

from destiny_focus.extensions import login_manager
from destiny_focus.auth.forms import LoginForm
from destiny_focus.user.forms import RegisterForm
from destiny_focus.user.models import PGCRs, User, Manifest, PGCRs
from destiny_focus.extensions import db
from destiny_focus.utils import flash_errors
from destiny_focus.oauth import OAuthSignin
from destiny_focus.tools.user_login import create_user, update_user
from destiny_focus.bungie.bungie_api import BungieApi
from destiny_focus.manifest_tools.manifest_functions import get_definition
from destiny_focus.bungie.parse_bungie_response import get_character_details_json, summarize_historical_stats
from destiny_focus.bungie.season_data import SEASONS, CURRENT_SEASON, LAST_SEASON
from destiny_focus.bungie.static_data import MANIFEST_DEFINITIONS, ACTIVITY_MODES

import requests
from datetime import datetime, timedelta

blueprint = Blueprint("auth", __name__, url_prefix="/auth", static_folder="../static")

@blueprint.before_request
def before_request():
    """
    Executed before a request is made.
    Refresh user credentials here.
    """
    session.permanent = True
    g.user = current_user
    if g.user.is_authenticated:
        # print(g.user)
        # print(g.user.refresh_ready)
        if g.user.refresh_ready < datetime.utcnow():
            print("\n\nRefresh ready - before_request!\n\n")
            # Put refresh code in here!
            token_response = OAuthSignin('bungie').get_provider('bungie').get_refresh_token(g.user)
            # print(token_response)
            print("Welcome back user.")
            user = update_user(user=g.user, token_response=token_response.json(), refresh=True)


@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    return User.get_by_id(int(user_id))


@blueprint.route("/", methods=["GET", "POST"])
@login_required
def home():
    """home page."""
    form = LoginForm(request.form)
    current_app.logger.info("Hello from the home page!")
    # Handle logging in
    if request.method == "POST":
        if form.validate_on_submit():
            login_user(form.user)
            # flash("You are logged in.", "success")
            _url = request.args.get("next") or url_for("user.members")
            return redirect(redirect_url)
    else:
        flash_errors(form)

        return redirect(url_for("auth.character_select", redirect="true"))
        

    return render_template("auth/welcome.html", form=form)


@blueprint.route("/authorize/<provider>")
def oauth_authorize(provider):
    """ Authorize URL for a given provider."""
    # flash("You are in the Authorize URL.", "info")
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    print("looking for OAuthSignin", provider)
    oauth = OAuthSignin(provider).get_provider(provider)
    return oauth.authorize()


@blueprint.route("/callback/<provider>")
def oauth_callback(provider):
    """ Callback URL for a given provider."""
    # flash("You are in the callback URL.", "info")

    # Get token from Bungie:
    oauth           = OAuthSignin(provider).get_provider(provider)
    token_response  = oauth.get_callback_url()
    print(token_response)

    # Handle CSRF error:
    if token_response is False:
        return render_template("401.html")

    if 'access_token'not in token_response.json():
        # print(token_response)
        # print(token_response.content)
        # print(token_response.json())
        return render_template("401.html")


    auth_headers                    = {}
    token_json                      = token_response.json()['access_token']
    membership_id                   = token_response.json()["membership_id"]
    auth_headers["X-API-Key"]       = OAuthSignin(provider).api_key
    auth_headers["Authorization"]   = 'Bearer ' + str(token_json)
    auth_headers["membership_id"]   = str(membership_id)

    # Create and authorized session for making requests:
    auth_session = requests.Session()
    auth_session.headers = {
        "X-API-Key"     : auth_headers['X-API-Key'],
        'Authorization' : auth_headers['Authorization']
    }

    # Get Bungie Profile:
        #  This gives membership type - which is needed for all subsequent calls.
    get_user_url = "https://www.bungie.net/Platform/User/" + "GetCurrentBungieAccount/"
    get_account_res = auth_session.get(get_user_url)

    user = User.query.filter_by(bungieMembershipId=membership_id).first()
    # print(user)
    # print(get_account_res.json()['Response'])
    if user is None:
        user = create_user(get_account_res.json(), token_response.json())
    else:
        print("Welcome back user.")
        user = update_user(user=user, get_account_res=get_account_res.json(), token_response=token_response.json())

    login_user(user)

    # flash("You are logged in.", "success")

    # Return the raw JSON content:
    # return jsonify(get_account_res.json())

    membershipId    = get_account_res.json()["Response"]["destinyMemberships"][0]["membershipId"]
    membershipType  = get_account_res.json()["Response"]["destinyMemberships"][0]["membershipType"]

    my_api = BungieApi(user)
    get_profile_res = my_api.get_profile(str(membershipType), str(membershipId))
    characterId = get_profile_res["Response"]["profile"]["data"]["characterIds"][0]

    # TODO:
    # Redirect to get_profile - > Get: membershipType destinyMembershipId
    # Redirect to chose_track/membershipType/destinyMembershipId.

    return redirect(url_for("auth.choose_focus", membershipType=membershipType, membershipId=membershipId, characterId=characterId))
    # return redirect(url_for("auth.home"))


@blueprint.route("/get/get_current_bungie_account/")
@login_required
def get_current_bungie_account():
    print("get_current_bungie_account")
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()

    my_api = BungieApi(user)
    activity = my_api.GetCurrentBungieAccount()

    return jsonify(activity)


@blueprint.route("/get_activity/")
@login_required
def get_activity():
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)
    # TODO: Hardcoded values:
    # Take values from here: GetCurrentBungieAccount
    activity = my_api.GetCurrentBungieAccount()
    # get_profile_res = my_api.get_activity_history(membershipType, membershipId)
    # activity = my_api.get_activity_history("2", "4611686018436136301", "2305843009260647150", mode=5, count=3)

    return jsonify(activity)


@blueprint.route("/get/get_profile/")
@login_required
def get_profile():
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)


    # TODO: Hardcoded values:
    # Take values from here: GetCurrentBungieAccount
    get_account_res = my_api.GetCurrentBungieAccount()

    membershipId    = int(request.args.get('membershipId', str(get_account_res["Response"]["destinyMemberships"][0]["membershipId"])))
    membershipType  = int(request.args.get('membershipType', str(get_account_res["Response"]["destinyMemberships"][0]["membershipType"])))

    # print(type(get_account_res))
    # print(get_account_res.json())
    membershipId    = str(get_account_res["Response"]["destinyMemberships"][0]["membershipId"])
    membershipType  = str(get_account_res["Response"]["destinyMemberships"][0]["membershipType"])
    get_profile_res = my_api.get_profile(membershipType, membershipId)

    return jsonify(get_profile_res)

@blueprint.route("/get/get_characters/")
@login_required
def get_characters():
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_account_res = my_api.GetCurrentBungieAccount()

    # Take values from request args- or default to stored values:
    membershipId    = str(request.args.get('membershipId', str(get_account_res["Response"]["destinyMemberships"][0]["membershipId"])))
    membershipType  = str(request.args.get('membershipType', str(get_account_res["Response"]["destinyMemberships"][0]["membershipType"])))

    get_characters_res = my_api.get_profile(membershipType, membershipId)

    if get_characters_res["ErrorStatus"] != "Success":
        flash(f"Bungie systems are down: {get_characters_res.get('message', {}).get('Message', {})}", "error")
        return redirect(url_for("public.home"))

    character_details = get_character_details_json(get_characters_res)

    return jsonify(character_details)


@blueprint.route("/character_select/")
@login_required
def character_select():
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_account_res = my_api.GetCurrentBungieAccount()
    # print(type(get_account_res))
    # print(get_account_res.json())
    # membershipId    = str(get_account_res.json()["Response"]["destinyMemberships"][0]["membershipId"])
    # membershipType  = str(get_account_res.json()["Response"]["destinyMemberships"][0]["membershipType"])
    # get_profile_res = my_api.get_profile(membershipType, membershipId)
    # # get_profile_res = my_api.character_select("2", "4611686018436136301")
    # character_details = get_character_details_json(get_profile_res)

    # return(jsonify(get_profile_res))

    # return render_template("auth/choose_account.html")
    return render_template("auth/choose_focus.html")


@blueprint.route("/choose_focus/<membershipType>/<membershipId>/<characterId>")
@login_required
def choose_focus(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_profile_res = my_api.get_profile(membershipType, membershipId)
    # print(get_profile_res)
    if get_profile_res["ErrorStatus"] != "Success":
        flash(f"Bungie systems are down: {get_profile_res.get('message', {}).get('Message', {})}", "error")
        return redirect(url_for("public.home"))

    return render_template("auth/choose_focus.html")


@blueprint.route("/pvp/<membershipType>/<membershipId>/<characterId>")
@login_required
def pvp(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_profile_res = my_api.get_profile(membershipType, membershipId)
    if get_profile_res["ErrorStatus"] != "Success":
        flash(f"Bungie systems are down: {get_profile_res.get('message', {}).get('Message', {})}", "error")

        return redirect(url_for("public.home"))

    # character_details = get_character_details_json(get_profile_res)

    return render_template("auth/choose_focus.html")


@blueprint.route("/gambit/<membershipType>/<membershipId>/<characterId>")
@login_required
def gambit(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_profile_res = my_api.get_profile(membershipType, membershipId)
    if get_profile_res["ErrorStatus"] != "Success":
        flash("Bungie systems are down :(", "error")
        return redirect(url_for("public.home"))

    return render_template("auth/choose_focus.html")


@blueprint.route("/raid/<membershipType>/<membershipId>/<characterId>")
@login_required
def raid(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_profile_res = my_api.get_profile(membershipType, membershipId)
    if get_profile_res["ErrorStatus"] != "Success":
        flash(f"Bungie systems are down: {get_profile_res.get('message', {}).get('Message', {})}", "error")
        return redirect(url_for("public.home"))

    return render_template("auth/choose_focus.html")

@blueprint.route("/account/<membershipType>/<membershipId>/<characterId>")
@login_required
def account(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    # get_profile_res = my_api.get_profile(membershipType, membershipId)
    # character_details = get_character_details_json(get_profile_res)

    return render_template("auth/choose_focus.html")


# @blueprint.route("/character_select/")
# @login_required
# def account():
#     user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
#     my_api = BungieApi(user)

#     # get_profile_res = my_api.get_profile(membershipType, membershipId)
#     # character_details = get_character_details_json(get_profile_res)

#     return render_template("auth/choose_focus.html")


@blueprint.route("/get/pvp/<membershipType>/<membershipId>/<characterId>/")
@login_required
def get_pvp(membershipType, membershipId, characterId):
    """
    Endpoint to get PvP data from Bungie.net.
        Modes:
        10 :	"Control",
        12 :	"Clash",
        15 :	"CrimsonDoubles",
        19 :	"IronBanner",
        25 :	"AllMayhem",
        31 :	"Supremacy",
        37 :	"Survival",
        38 :	"Countdown",
        39 :	"TrialsOfTheNine",
        48 :	"Rumble",
        50 :	"Doubles",
        59 :	"Showdown",
        60 :	"Lockdown",
        61 :	"Scorched", #???
        65 :	"Breakthrough",
        67 :	"Salvage",
        80 :	"Elimination",
        84 :	"TrialsOfOsiris",
    """

    mode    = int(request.args.get('gameMode', 5))
    season  = int(request.args.get('season', CURRENT_SEASON))

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    # get_profile_res = my_api.get_profile(membershipType, membershipId)
    # character_details = get_character_details_json(get_profile_res)

    activity = my_api.get_activity_history(membershipType, membershipId, characterId, mode=mode, count=30)


    return jsonify(activity)


@blueprint.route("/get/raid/<membershipType>/<membershipId>/<characterId>/")
@login_required
def get_raid(membershipType, membershipId, characterId):
    """
    Endpoint to get raid data from Bungie.net.
        Modes:
        Raid: 4
    """

    mode    = int(request.args.get('gameMode', 4))

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    activity = my_api.get_activity_history(membershipType, membershipId, characterId, mode=mode, count=30)


    return jsonify(activity)


@blueprint.route("/get/historical_stats/<membershipType>/<membershipId>/<characterId>/")
@login_required
def get_historical_stats(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    # get_profile_res = my_api.get_profile(membershipType, membershipId)
    # character_details = get_character_details_json(get_profile_res)

    # TODO: Hardcoded AllPvP mode
    # season = 1
    mode    = int(request.args.get('game_mode', 5))
    season  = int(request.args.get('season', CURRENT_SEASON))

    activity_list   = []
    season_start    = datetime.strptime(SEASONS[season]['START'], "%Y-%m-%d %H:%M:%S")
    season_end      = datetime.strptime(SEASONS[season]['END'], "%Y-%m-%d %H:%M:%S")
    month           = 30
    # month           = 5 # Testing flow:
    current_date    = datetime.utcnow()

    if season_end > current_date:
        day_end     = current_date
    else:
        day_end     = season_end
    day_start       = day_end - timedelta(days=month)

    # print("Dates:")
    # print(day_start)
    # print(day_end)

    activity_list = []

    while True:
        if day_start < season_start:
            # Last request:
            day_start = season_start
            activity = my_api.get_historical_stats(membershipType, membershipId, characterId, modes=5, daystart=day_start, dayend=day_end, periodType='Daily')

            found_activities = activity.get('Response', {}).get('allPvP', {}).get('daily', False)
            if found_activities:
                for a in activity['Response']['allPvP']['daily']:
                    activity_list.append(a)

            break
        else:
            activity = my_api.get_historical_stats(membershipType, membershipId, characterId, daystart=day_start, dayend=day_end, periodType='Daily')
            if activity["ErrorStatus"] != "Success":
                flash(f"Bungie systems are down: {activity.get('message', {}).get('Message', {})}", "error")
                return redirect(url_for("public.home"))


            found_activities = activity['Response']['allPvP'].get('daily', False)

            if found_activities:
                for a in activity['Response']['allPvP']['daily']:
                    activity_list.append(a)

            day_end = day_start - timedelta(seconds=1)
            day_start = day_start - timedelta(days=month)

    summarised_activity = summarize_historical_stats(activity_list)

    new_activity = {
        "Response": {
            'season': season,
            'mode'  : ACTIVITY_MODES[mode],
            'allPvP': {
                'daily': summarised_activity
            }
        }
    }

    return jsonify(new_activity)


@blueprint.route("/get/historical_stats_alltime/<membershipType>/<membershipId>/<characterId>/")
@login_required
def get_historical_stats_alltime(membershipType, membershipId, characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    get_profile_res = my_api.get_profile(membershipType, membershipId)
    character_details = get_character_details_json(get_profile_res)

    activity = my_api.get_historical_stats(membershipType, membershipId, characterId, daystart="", dayend="")


    # if daystart < new_date:
    #     print("daystart < new_date")
    print("Testing time delta:")

    return jsonify(activity)
    # return render_template("auth/choose_focus.html")


@blueprint.route("/get/gambit/<membershipType>/<membershipId>/<characterId>/")
@login_required
def get_gambit(membershipType, membershipId,characterId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)
    get_profile_res = my_api.get_profile(membershipType, membershipId)

    activity = my_api.get_activity_history(membershipType, membershipId, characterId, mode=63, count=30)

    return jsonify(activity)


@blueprint.route("/get/pgcr/<activityId>/")
@login_required
def get_pgcr(activityId):
    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    activity = my_api.get_pgcr(activityId)

    return jsonify(activity)

@blueprint.route("/get/manifest/<string:definition>/<int:def_hash>/")
@login_required
def get_manifest(definition, def_hash):

    def_list = MANIFEST_DEFINITIONS

    if definition in def_list and isinstance(def_hash, int):
        response = get_definition(str(definition), str(def_hash))
        # print(response)
    else:
        def_hash_manifest_item = Manifest.query.filter_by(definition_id=str(def_hash)).all()
        print("Definition not found!")
        print(def_hash)
        print(definition)
        print(type(def_hash))
        print(def_hash_manifest_item)
        response = {"Response": "Error"}

    return jsonify(response)

@blueprint.route("/get/pgcr_list/<membershipType>/<membershipId>/<characterId>/")
@login_required
def pgcr_list(membershipType, membershipId, characterId):

    mode_arg = request.args.get('game_mode', 'pvp')

    game_mode_switch = {
        'pvp'   : 5,
        'gambit': 63,
        'raid'  : 4,
    }
    game_mode = game_mode_switch[mode_arg]

    game_count = 10

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    activity = my_api.get_activity_history(membershipType, membershipId, characterId, mode=game_mode, count=game_count)

    pgcr_list = []
    stat_list = []
    for a in activity["Response"]["activities"]:
        pgcr_list.append(a["activityDetails"]["instanceId"])
    pgcr_res_list = []

    for index, instanceId in enumerate(pgcr_list):
        pgcr_res = my_api.get_pgcr(instanceId)
        pgcr_res_list.append(pgcr_res["Response"])

        for entry in pgcr_res["Response"]["entries"]:
            if entry["player"]["destinyUserInfo"]["membershipId"] == membershipId:
                try:
                    avg_life = int(entry["values"]["activityDurationSeconds"]["basic"]["value"] / entry["values"]["deaths"]["basic"]["value"])
                except ZeroDivisionError:
                    avg_life = int(666)
                stats = {
                    "count"                     : index,
                    "instanceId"                : pgcr_res["Response"]["activityDetails"]["instanceId"],
                    "PGCR"                      : pgcr_res["Response"]["activityDetails"]["instanceId"],
                    "period"                    : pgcr_res["Response"]["period"],
                    "standing"                  : entry["standing"],
                    "activityDurationSeconds"   : entry["values"]["activityDurationSeconds"]["basic"]["displayValue"],
                    "averageLifeTime"           : avg_life,
                    "precisionKills"            : entry["extended"]["values"]["precisionKills"]["basic"]["displayValue"],
                    "data"                      : entry,
                }

                # Add weapon definition to responses:
                try:
                    for index, weapons in enumerate(entry["extended"].get("weapons")):
                        definition = get_definition("DestinyInventoryItemLiteDefinition", str(weapons["referenceId"]))
                        stats["data"]["extended"]["weapons"][index]["definition"] = definition
                except:
                    continue
                stat_list.append(stats)

    pgcr_list_res = {
        "Response"      : stat_list,
        "statusCode"    : 200,
        "ErrorStatus"   : "Success",
    }

    return jsonify(pgcr_list_res)


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
        return redirect(url_for("auth.home"))
    else:
        flash_errors(form)
    return render_template("auth/register.html", form=form)


@blueprint.route("/about/")
def about():
    """About page."""
    form = LoginForm(request.form)
    return render_template("auth/about.html", form=form)

####################################################################################################
# A list of routes for managing PGCR's:
####################################################################################################
@blueprint.route("/put/pgcr/<int:activityId>")#, methods=["PUT"])
@login_required
def put_pgcr(activityId):
    """
    Add a PGCR to the PGCR table and a reference to the PGCR in Users.pgcrs.
    The User has an allocation of stored PGCR's: pgcr_count
    """

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    my_api = BungieApi(user)

    pgcr_list = []
    status  = None
    space   = None
    exists  = None

    pgcr_entries = PGCRs.query.join(User).filter(User.id == user.id).all()
    for e in pgcr_entries:
        pgcr_list.append(e.activityId)

    pgcr_count = user.pgcr_count
    pgcr_allocation = user.pgcr_allocation

    space = True if pgcr_count < pgcr_allocation else False
    exists = True if activityId in pgcr_list else False

    # print(f"space: {space} exists: {exists} activityId: {activityId}")

    if space and not exists:
        activity = my_api.get_pgcr(str(activityId))

        if activity["ErrorStatus"] == "Success":
            print(f"Adding PGCR: {activityId} for user: {user.unique_name}")
            status = True
            duration = 0
            for e in activity["Response"]["entries"]:
                if int(e["values"]["activityDurationSeconds"]["basic"]["value"]) > duration:
                    duration = int(e["values"]["activityDurationSeconds"]["basic"]["value"])
            membershipType  = activity["Response"]["activityDetails"]["membershipType"]
            mode            = activity["Response"]["activityDetails"]["mode"]
            players         = len(activity["Response"]["entries"])
            period          = datetime.strptime(activity["Response"]["period"], "%Y-%m-%dT%H:%M:%SZ")

            pgcr = PGCRs.createPGCR(
                activityId      = activityId,
                membershipType  = membershipType,
                mode            = mode,
                players         = players,
                duration        = duration,
                period          = period,
            )
            user.pgcr_count += 1
            user.pgcrs.append(pgcr)
            db.session.add(pgcr)
            db.session.commit()

            response = {
                "errorStatus"   : "Success",
                "message"       : f"Stored: {activityId}",
                "activityId"    : activityId,
                "membershipType": membershipType,
                "mode"          : mode,
                "players"       : players,
                "duration"      : duration,
                "period"        : period,
                "user_has_room"         : space,
                "already_stored"        : exists,
                "pgcr_req_successful"   : status,
            }
            return jsonify(response)

        else:
            status = False

    response = {
        "errorStatus"           : "Fail",
        "message"               : "There was an error",
        "user_has_room"         : space,
        "already_stored"        : exists,
        "pgcr_req_successful"   : status,
    }

    return jsonify(response)


@blueprint.route("/delete/pgcr/<int:activityId>")#, methods=["DELETE"])
@login_required
def delete_pgcr(activityId):
    """
    Delete a PGCR from a users allocated list.
    Delete a PGCR from the PGCR table remove reference to the PGCR in Users.pgcrs.
    The User has an allocation of stored PGCR's: pgcr_count
    """

    exists = False

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()

    pgcr_entry = PGCRs.query.filter(PGCRs.user_id == User.id, PGCRs.activityId==activityId).first()

    if pgcr_entry:
        exists = True if activityId == pgcr_entry.activityId else False

    if exists:
        print(f"Deleting PGCR: {activityId} for user: {user.unique_name}")
        user.pgcr_count = user.pgcr_count - 1 if user.pgcr_count > 0 else 0

        db.session.delete(pgcr_entry)
        db.session.commit()

        response = {
            "errorStatus"   : "Success",
            "message"       : f"Deleted: {activityId}",
            "activityId"    : activityId,
            "current_space" : user.pgcr_allocation,
            "stored_pgcrs"  : user.pgcr_count,
            "pgcr_exists"   : exists,
        }

    else:
        response = {
            "errorStatus"   : "Fail",
            "message"       : "There was an error",
            "pgcr_exists"   : exists,
        }

    return jsonify(response)


@blueprint.route("/get/pgcr_list/")#, methods=["PUT"])
@login_required
def get_pgcr_list():
    """
    Add a PGCR to the PGCR table and a reference to the PGCR in Users.pgcrs.
    The User has an allocation of stored PGCR's: pgcr_count
    """

    user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()

    pgcr_list = []

    pgcr_entries = PGCRs.query.join(User).filter(User.id == user.id).all()
    for e in pgcr_entries:
        pgcr_list.append(e.activityId)

    response = {
        "errorStatus"   : "Success",
        "user_pgcrs"    : pgcr_list,
    }

    return jsonify(response)


@blueprint.route("/pgcr/<int:activityId>")
@login_required
def pgcr(activityId):
    # user = User.query.filter_by(bungieMembershipId=g.user.bungieMembershipId).first()
    # my_api = BungieApi(user)

    # get_account_res = my_api.GetCurrentBungieAccount()
    return render_template("auth/pgcr.html")

