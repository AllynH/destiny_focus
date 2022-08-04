"""
    This is a separate Class definition used only for unauth requests.
    Authorised requests are created with bungie_api.py
"""

from flask import current_app
import requests
import re

from destiny_focus.bungie.api_urls import bungie_api_urls

class BungieApiUnauth(object):
    """
    Class definition for making unauthorised Bungie requests.
    """

    def __init__(self):
        super().__init__()
        """
        Init the Object.
        """

        credentials         = current_app.config['OAUTH_CREDENTIALS']['bungie']
        self.api_key        = credentials['api_key']
        self.api_urls       = bungie_api_urls
        self.auth_session   = requests.Session()

    def make_session(self):
        """
        Make the authorized session.
        """
        auth_headers = {}
        auth_headers["X-API-Key"]       = self.api_key

        self.auth_session.headers = {
            "X-API-Key"     : auth_headers['X-API-Key'],
        }
        return self.auth_session

    def flag_error(self, function_name, response):
        """
        Return a JSON formatted error.
        """
        # print("Inside Flagged error")
        # print(type(response.json()))
        fail = {
            'status'        : "Error",
            'ErrorStatus'   : response.json()["ErrorStatus"],
            'status_code'   : response.status_code,
            'request'       : function_name,
            'message'       : response.json()
        }

        print('Bungie response error:')
        print(fail)

        return response.json()
        # return jsonify(fail)

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

        print(url)
        response = auth_session.get(url)

        if not response.status_code == 200:
            return self.flag_error(function_name, response)


        return response.json()


