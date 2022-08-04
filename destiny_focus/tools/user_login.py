# -*- coding: utf-8 -*-
"""
User login and other useful functions.
"""
from destiny_focus.user.models import User
from destiny_focus.extensions import db
from datetime import datetime, timedelta, timezone

def create_user(get_account_res, token_response):
    """
    Create a user account:
    """

    refresh_ready                   = datetime.utcnow() + timedelta(seconds=int(token_response['expires_in']))
    refresh_expired                 = datetime.utcnow() + timedelta(seconds=int(token_response['refresh_expires_in']))
    access_expired                  = datetime.utcnow() + timedelta(seconds=int(token_response['expires_in']))
    last_seen                       = datetime.utcnow()

    print(type(refresh_ready))

    account = {
        'bungieMembershipId'    : get_account_res['Response']['bungieNetUser']['membershipId'],
        'displayName'           : get_account_res['Response']['bungieNetUser']['displayName'],
        'access_token'          : token_response['access_token'],
        'refresh_token'         : token_response['refresh_token'],
        'refresh_ready'         : refresh_ready,
        'refresh_expired'       : refresh_expired,
        'access_expired'        : access_expired,
        'last_seen'             : last_seen
    }

    print(account['bungieMembershipId'])

    user = User(
        username                = account['displayName'],
        unique_name             = account['displayName'] + "_" + account['bungieMembershipId'],
        bungieMembershipId      = account['bungieMembershipId'],
        access_token            = account['access_token'],
        refresh_token           = account['refresh_token'],
        refresh_ready           = account['refresh_ready'],
        refresh_expired         = account['refresh_expired'],
        access_expired          = account['access_expired'],
        last_seen               = account['last_seen'],

    )

    db.session.add(user)
    db.session.commit()

    return user


def update_user(user, token_response, get_account_res=None, refresh=False):
    """
    Update a user account:
    """

    if refresh:
        membershipId    = user.bungieMembershipId
        displayName     = user.username
    else:
        membershipId    = get_account_res['Response']['bungieNetUser']['membershipId']
        displayName     = get_account_res['Response']['bungieNetUser']['displayName']

    # refresh_ready                     = datetime.utcnow() + timedelta(seconds=int(response.json()['expires_in']))


    refresh_ready                   = datetime.utcnow() + timedelta(seconds=int(token_response['expires_in']))
    refresh_expired                 = datetime.utcnow() + timedelta(seconds=int(token_response['refresh_expires_in']))
    access_expired                  = datetime.utcnow() + timedelta(seconds=int(token_response['expires_in']))
    last_seen                       = datetime.utcnow()

    # print("Debug:")
    # print(datetime.utcnow())
    # print(datetime.utcnow() + timedelta(seconds=int(token_response['expires_in'])))
    # print(refresh_ready)
    # print(type(refresh_ready))
    # print()

    account = {
        'bungieMembershipId'    : membershipId,
        'displayName'           : displayName,
        'access_token'          : token_response['access_token'],
        'refresh_token'         : token_response['refresh_token'],
        'refresh_ready'         : refresh_ready,
        'refresh_expired'       : refresh_expired,
        'access_expired'        : access_expired,
        'last_seen'             : last_seen
    }

    user.access_token            = account['access_token']
    user.refresh_token           = account['refresh_token']
    user.refresh_ready           = account['refresh_ready']
    user.refresh_expired         = account['refresh_expired']
    user.access_expired          = account['access_expired']
    user.last_seen               = account['last_seen']

    # db.session.add(user)
    db.session.commit()

    return user
