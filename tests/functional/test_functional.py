# -*- coding: utf-8 -*-
"""
Model unit tests - tests dedicated to:
1. Test User object creation.
2. Test PGCR creation.
3. Test Manifest item creation.
"""
from flask import url_for
import os
from destiny_focus.bungie.bungie_api import BungieApi

from destiny_focus.user.models import User

from ..factories import UserFactory


class TestLoggingIn:
    """Login."""

    def test_landing_page_returns_200(self, testapp):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/' page is requested (GET)
        THEN check that the response is valid.
        """
        # Goes to homepage
        res = testapp.get("/")

        assert res.status_code == 200

        assert b'<div id="main-root"></div>' in res
        assert b'footer id="footer"' in res

    def test_js_tags_are_present(self, testapp):
        """
        GIVEN a Flask application configured for testing
        WHEN the '/' page is requested (GET)
        THEN check that the required JavaScript tags are present.
        """
        # Goes to homepage
        res = testapp.get("/")

        assert b'<div id="main-root"></div>' in res
        assert b'footer id="footer"' in res

    # def test_choose_focus_page_returns_200(self, testapp):
    #     """
    #     GIVEN a Flask application configured for testing
    #     WHEN the '/' page is requested (GET)
    #     THEN check that the response is valid.
    #     """
    #     admin_user = os.environ.get("DF_ADMIN")
    #     user = User.query.filter_by(unique_name=admin_user).first()
    #     my_api = BungieApi(user)

    #     print("user")
    #     print(user)
    #     print("my_api")
    #     print(my_api)


    #     # Goes to homepage
    #     res = testapp.get("/auth/choose_focus/2/123/456")
    #     print(res)

    #     assert res.status_code == 200

    #     assert b'<div id="main-root"></div>' in res
    #     assert b'footer id="footer"' in res
