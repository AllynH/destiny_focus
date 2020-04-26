# -*- coding: utf-8 -*-
"""
User login and other useful functions.
"""

from datetime import datetime, timedelta

def create_user(profile, tokens):
    """
    Create a user account:
    """

    refresh_ready 					= datetime.utcnow() + timedelta(seconds=int(tokens.json()['expires_in']))
    refresh_expired 				= datetime.utcnow() + timedelta(seconds=int(tokens.json()['refresh_expires_in']))
    access_expired 					= datetime.utcnow() + timedelta(seconds=int(tokens.json()['expires_in']))
    last_seen    					= datetime.utcnow()

    account = {
        'bungie_membership_id'  : profile['membershipId'],
        'display_name'          : profile['displayName'],
        'destiny_memberships'   : profile['destinyMemberships']['destinyMemberships'],
        'access_token'          : tokens['access_token'],
        'refresh_ready'         : refresh_ready,
        'refresh_expired'       : refresh_expired,
        'access_expired'        : access_expired
    }

    return True


def update_user(profile, tokens):
    """
    Update a user account:
    """

    refresh_ready 					= datetime.utcnow() + timedelta(seconds=int(tokens.json()['expires_in']))
    refresh_expired 				= datetime.utcnow() + timedelta(seconds=int(tokens.json()['refresh_expires_in']))
    access_expired 					= datetime.utcnow() + timedelta(seconds=int(tokens.json()['expires_in']))

    account = {
        'bungie_membership_id'  : profile['membershipId'],
        'display_name'          : profile['displayName'],
        'destiny_memberships'   : profile['destinyMemberships']['destinyMemberships'],
        'access_token'          : tokens['access_token'],
        'refresh_ready'         : refresh_ready,
        'refresh_expired'       : refresh_expired,
        'access_expired'        : access_expired
    }

    return True
