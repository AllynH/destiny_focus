from flask import current_app, url_for, request, redirect, session, jsonify
import requests
import json
from urllib import parse
import re
from datetime import datetime

from destiny_focus.user.models import User
from destiny_focus.bungie.api_urls import bungie_api_urls
from destiny_focus.bungie.season_data import SEASONS, CURRENT_SEASON


class BungieApi(object):
    def __init__(self, user):
        super().__init__()
        credentials         = current_app.config['OAUTH_CREDENTIALS']['bungie']
        self.api_key        = credentials['api_key']
        self.access_token   = user.access_token
        self.api_urls       = bungie_api_urls
        self.auth_session   = requests.Session()
        self.check_for_refresh(user)

    def check_for_refresh(self, user):
        print(user.refresh_ready)
        print(user.refresh_expired)
        if user.refresh_ready < datetime.utcnow():
            print("\n\nRefresh ready!\n\n")
        return self.auth_session

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

    def GetCurrentBungieAccount(self):
        """
        http://destinydevs.github.io/BungieNetPlatform/docs/services/User/User-GetCurrentBungieAccount
        Example:
            https:/www.bungie.net/Platform/User/GetCurrentBungieAccount/
        """
        function_name = "GetCurrentBungieAccount"
        auth_session = self.make_session()


        url_params = {
            }

        url = self.api_urls['GetCurrentBungieAccount']

        # print("making request for:")
        # print(url)
        # print("headers")
        # print(auth_session.headers)

        response = auth_session.get(url)

        # print(response.status_code)
        # print(response.text)
        if not response.status_code == 200:
            return self.flag_error(function_name, response)

        self.membership_id      = response.json()['Response']['destinyMemberships'][0]['membershipId']
        self.membership_type    = response.json()['Response']['destinyMemberships'][0]['membershipType']
        self.bungie_display_name = response.json()['Response']['bungieNetUser']['displayName']
        self.bungie_profile_pic = response.json()['Response']['bungieNetUser']['profilePicturePath']

        return response.json()

    def get_profile(self, membership_type, membership_id):
        """
        https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile
        Get associated Destiny profile information.
        """
        function_name = "GetProfile"
        auth_session = self.make_session()


        url_params = {
            'components' : "100,200"
            }

        url = self.api_urls['GetProfile']
        url = re.sub("{membershipType}", membership_type, url)
        url = re.sub("{destinyMembershipId}", membership_id, url)
        url = url + '?' + parse.urlencode(url_params)

        # print("making request for:")
        # print(url)
        # print("headers")
        # print(auth_session.headers)

        response = auth_session.get(url)

        print(response.status_code)
        # print(response.text)
        if not response.status_code == 200:
            print(response.text)
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

        # print("making request for:")
        # print(url)
        # print("headers")
        # print(auth_session.headers)

        response = auth_session.get(url)

        # print(response.status_code)
        # print(type(response.status_code))
        # print(response.text)
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

        print('Bungie response error:')
        print(fail)

        return dict(fail)

    def get_pgcr(self, activityId):
        """
        https://bungie-net.github.io/multi/operation_get_Destiny2-GetPostGameCarnageReport.html#operation_get_Destiny2-GetPostGameCarnageReport
        Path: /Destiny2/Stats/PostGameCarnageReport/{activityId}/

        Gets the available post game carnage report for the activity ID.
        """

        function_name = "get_pgcr"
        auth_session = self.make_session()

        url = self.api_urls['GetPostGameCarnageReport']
        url = re.sub("{activityId}", activityId, url)

        response = auth_session.get(url)

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

    def get_historical_stats(self, membership_type, membership_id, character_id, dayend="", daystart="", groups="General", modes=5, periodType="AllTime"):
        """
        https://bungie-net.github.io/multi/operation_get_Destiny2-GetHistoricalStats.html#operation_get_Destiny2-GetHistoricalStats

        dayend
            Last day to return when daily stats are requested. Use the format YYYY-MM-DD. Currently, we cannot allow more than 31 days of daily data to be requested in a single request.
            Type: date-time
        daystart
            First day to return when daily stats are requested. Use the format YYYY-MM-DD. Currently, we cannot allow more than 31 days of daily data to be requested in a single request.
            Type: date-time
        groups
            Group of stats to include, otherwise only general stats are returned. Comma separated list is allowed. Values: General, Weapons, Medals
            Type: array
            Array Contents: int32
        modes
            Game modes to return. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited.
            Type: array
            Array Contents: int32
        periodType
            Indicates a specific period type to return. Optional. May be: Daily, AllTime, or Activity
            Type: int32
        """

        function_name = "get_activity_history"
        auth_session = self.make_session()

        
        # daystart    = datetime.strptime(SEASONS[CURRENT_SEASON]['START'], "%Y-%m-%d %H:%M:%S")
        # dayend      = datetime.strptime(SEASONS[CURRENT_SEASON]['END'], "%Y-%m-%d %H:%M:%S")

        if daystart is not "" or not periodType == "AllTime":
            # print("Day start:", daystart)
            # print("Day end:", dayend)

            # print(dayend.year)
            # print(dayend.month)
            # print(dayend.day)
            daystart  = f"{daystart.year}-{daystart.month}-{daystart.day}"
            dayend    = f"{dayend.year}-{dayend.month}-{dayend.day}"

        url_params = {
            # 'groups'    : groups,
            'modes'     : modes,
            'periodType': periodType,
            # 'periodType': "Daily",
            # 'periodType': "AllTime",
            }


        if daystart is not "" or not periodType == "AllTime":
            # if not periodType == "Activity":
            url_params['dayend']    = dayend
            url_params['daystart']  = daystart
                
        # print(url_params)


        url = self.api_urls['GetHistoricalStats']
        url = re.sub("{membershipType}", membership_type, url)
        url = re.sub("{destinyMembershipId}", membership_id, url)
        url = re.sub("{characterId}", character_id, url)

        url = url + '?' + parse.urlencode(url_params)

        print("making request for:")
        print(url)
        # print("headers")
        # print(auth_session.headers)

        response = auth_session.get(url)

        # print(response.status_code)
        # print(type(response.status_code))
        # print(response.text)
        if not response.status_code == 200:
            return self.flag_error(function_name, response)


        return response.json()

