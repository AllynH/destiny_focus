from flask import current_app, url_for, request, redirect, session, jsonify
import requests
import json
from urllib import parse
import re

from destiny_focus.user.models import User
from destiny_focus.bungie.api_urls import bungie_api_urls

class BungieApi(object):
    def __init__(self, user):
        super().__init__()
        credentials         = current_app.config['OAUTH_CREDENTIALS']['bungie']
        self.api_key        = credentials['api_key']
        self.access_token   = user.access_token
        self.api_urls       = bungie_api_urls
        self.auth_session   = requests.Session()

    def make_session(self):
        """
        Make the authorized session.
        """
        auth_headers = {}
        auth_headers["X-API-Key"]       = self.api_key
        auth_headers["Authorization"]   = 'Bearer ' + str(self.access_token)

        self.auth_session.headers = {
            "X-API-Key"     : auth_headers['X-API-Key'],
            'Authorization' : auth_headers['Authorization']
        }
        return self.auth_session

    def get_profile(self, membership_type, membership_id):
        """
        Get associated Destiny profile information.
        """
        function_name = "GetProfile"
        auth_session = self.make_session()


        url_params = {
            'components' : 100,
            }

        url = self.api_urls['GetProfile']
        url = re.sub("{membershipType}", membership_type, url)
        url = re.sub("{destinyMembershipId}", membership_id, url)
        url = url + '?' + parse.urlencode(url_params)

        print("making request for:")
        print(url)
        print("headers")
        print(auth_session.headers)

        response = auth_session.get(url)

        print(response.status_code)
        print(response.text)
        if not response.status_code == 200:
            return self.flag_error(function_name, response)


        return response.json()

    def get_activity_history(self, membership_type, membership_id, character_id, count=0, mode=0, page=0):
        """
        https://bungie-net.github.io/multi/operation_get_Destiny2-GetActivityHistory.html#operation_get_Destiny2-GetActivityHistory
        Querystring Parameters
            count
                Number of rows to return
                Type: int32
            mode
                A filter for the activity mode to be returned. None returns all activities. See the documentation for DestinyActivityModeType for valid values, and pass in string representation.
                For historical reasons, this list will have both D1 and D2-relevant Activity Modes in it. Please don't take this to mean that some D1-only feature is coming back!
                Type: int32
            page
                Page number to return, starting with 0.
                Type: int32
        """

        function_name = "get_activity_history"
        auth_session = self.make_session()


        url_params = {
            'count' : count,
            'mode'  : mode,
            'page'  : page
            }


        url = self.api_urls['GetActivityHistory']
        url = re.sub("{membershipType}", membership_type, url)
        url = re.sub("{destinyMembershipId}", membership_id, url)
        url = re.sub("{characterId}", character_id, url)

        url = url + '?' + parse.urlencode(url_params)

        print("making request for:")
        print(url)
        print("headers")
        print(auth_session.headers)

        response = auth_session.get(url)

        print(response.status_code)
        print(type(response.status_code))
        print(response.text)
        if not response.status_code == 200:
            return self.flag_error(function_name, response)


        return response.json()

    def flag_error(self, function_name, response):
        """
        Return a JSON formatted error.
        """
        fail = {
            'status'    : response.status_code,
            'request'   : function_name,
            'message'   : response.json()
        }

        return dict(fail)
