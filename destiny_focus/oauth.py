"""
    This module provides OAuth features for Bungie.net.
    Created by: GitHub.com/AllynH
"""

from flask import current_app, url_for, request, redirect, session
from destiny_focus.user.models import User

import requests
from urllib import parse

class OAuthSignin(object):
    """
        Class definition for the Bungie.net OAuth process.
    """
    providers = None

    def __init__(self, provider_name):
        """
        Initialise the object.
        """
        super().__init__()
        self.provider_name = provider_name
        credentials = current_app.config['OAUTH_CREDENTIALS'][provider_name]
        self.consumer_id        = credentials['id']
        self.consumer_secret    = credentials['secret']
        self.api_key            = credentials['api_key']

    def authorize(self):
        """
        Redirects the user to the auth URL, with the required URL parameters set.
        """
        pass

    def callback(self):
        """
        TODO: Is this used???
        """
        pass

    def save_created_state(self):
        """
        Save the state parameter used in CSRF protection.
        """
        pass

    def make_state_parameter(self):
        """
        Generate a random string for the state parameter
        Save it for use later to prevent xsrf attacks
        """
        pass

    def is_valid_state(self):
        """
        Checks if the users state is the same as the stored state.
        Returns True if both states match.
        """
        pass

    def get_callback_url(self):
        """
        1) Receive the authorization code from Bungie.
        2) Request the access token                         - 60 minutes.
        3) Use the access token to get the refresh token    - 90 days.
        4) Returns the token response.
        """
        return url_for('oauth_callback', provider=self.provider_name, _external=True)

    def get_refresh_token(self, user):
        """
        1) Retrieve the users refresh token.
        2) Use the refresh token to get the refreshed access token    - 90 days.
        2) Returns the token response.
        """
        # return url_for('auth.oauth_callback', provider=self.provider_name, _external=True)
        print(self, user)
        pass

    @classmethod
    def get_provider(cls, provider_name):
        if cls.providers is None:
            cls.providers = {}
            for provider_class in cls.__subclasses__():
                provider = provider_class()
                cls.providers[provider.provider_name] = provider
        return cls.providers[provider_name]
        # if self.providers is None:
        #     self.providers = {}
        #     for provider_class in self.__subclasses__():
        #         provider = provider_class()
        #         self.providers[provider.provider_name] = provider
        # return self.providers[provider_name]

class BungieSignIn(OAuthSignin):
    def __init__(self, user=None):
        super(BungieSignIn, self).__init__('bungie')
        self.user = user
        self.service = {
            'name'              : 'bungie',
            'client_id'         : self.consumer_id,
            'client_secret'     : self.consumer_secret,
            'api_key'           : self.api_key,
            'authorize_url'     : 'https://www.bungie.net/en/oauth/authorize?',
            'access_token_url'  : 'https://www.bungie.net/platform/app/oauth/token/',
            'base_url'          : 'https://www.bungie.com/',
            'headers'           : {'X-API-Key':self.api_key}
        }
        self.headers= {'X-API-Key':self.api_key}

    def authorize(self):
        my_state=self.make_state_parameter()
        url_params = {
            'client_id': self.service['client_id'],
            'response_type': 'code',
            'state': my_state
            }
        auth_url = self.service['authorize_url'] + parse.urlencode(url_params)
        return redirect(auth_url)


    def get_callback_url(self):
        """
        1) Recieve the authorization code from Bungie.
        2) Request the access token                         - 60 minutes.
        3) Use the access token to get the refresh token    - 90 days.
        4) Returns the token response.
        """
        if 'code' not in request.args:
            print("No authorization code.")
            return None
        if not 'state' in request.args:
            print("No CSRF state parameter - unknown user.")
            return False

        code = request.args['code']
        state = request.args['state']
        return_state_matches = self.is_valid_state(state)
        if not return_state_matches:
            print("Unknown user accessing.")
            return None

        headers = self.service['headers']
        headers['Content-Type']		= 'application/x-www-form-urlencoded'
        headers['client_id'] 		= self.service['client_id']
        headers['client_secret']	= self.service['client_secret']

        # Get access token:
        post_data = f'grant_type=authorization_code&code={code}&client_id={self.service["client_id"]}&client_secret={self.service["client_secret"]}'
        response = requests.post(self.service['access_token_url'], data=post_data, headers=headers)
        # Useful debug print statements:
        # print(response.status_code)
        # print(response.text)
        # print(response.json())

        # Get refresh token:
        # token_json              = response.json()['refresh_token']
        # post_data = f'grant_type=refresh_token&refresh_token={token_json}&client_id={self.service["client_id"]}&client_secret={self.service["client_secret"]}'
        # response = requests.post(self.service['access_token_url'], data=post_data, headers=headers)
        # Useful debug print statements:
        # print(response.status_code)
        # print(response.text)
        # print(response.json())

        return response


    def get_refresh_token(self, user):
        """
        1) Retrieve the users refresh token.
        2) Use the refresh token to get the refreshed access token    - 90 days.
        2) Returns the token response.
        """

        current_user = User.query.filter_by(bungieMembershipId=user.bungieMembershipId).first()

        print("\nRefreshing tokens: oauth.py")
        # print("User:", user)

        headers = self.service['headers']
        headers['Content-Type']		= 'application/x-www-form-urlencoded'
        headers['client_id'] 		= self.service['client_id']
        headers['client_secret']	= self.service['client_secret']

        # Refresh access token:
        token_json              = current_user.refresh_token
        post_data = f'grant_type=refresh_token&refresh_token={token_json}&client_id={self.service["client_id"]}&client_secret={self.service["client_secret"]}'
        response = requests.post(self.service['access_token_url'], data=post_data, headers=headers)
        # Useful debug print statements:
        # print(response.status_code)
        # print(response.text)
        # print(response.json())

        return response


    # Save state parameter used in CSRF protection:
    def save_created_state(self, state):
        """
        Save the state parameter used in CSRF protection.
        """
        session['state_token'] = state
        pass

    def make_state_parameter(self):
        """
        Generate a random string for the state parameter
        Save it for use later to prevent xsrf attacks
        """
        from uuid import uuid4
        state = str(uuid4())
        self.save_created_state(state)
        return state

    def is_valid_state(self, state):
        saved_state = session['state_token']
        if state == saved_state:
            return True
        else:
            return False
