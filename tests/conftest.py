# -*- coding: utf-8 -*-
"""Defines fixtures available to all tests."""

import logging

import pytest
from webtest import TestApp

from destiny_focus.app import create_app
from destiny_focus.database import db as _db

from .factories import UserFactory


@pytest.fixture(name="app")
def fixture_app():
    """Create application for the tests."""
    _app = create_app("tests.settings")
    _app.logger.setLevel(logging.CRITICAL)
    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()


@pytest.fixture
def testapp(app):
    """Create Webtest app."""
    return TestApp(app)


@pytest.fixture(name="db")
def fixture_db(app):
    """Create database for the tests."""
    _db.app = app
    with app.app_context():
        _db.create_all()

    yield _db

    # Explicitly close DB connection
    _db.session.close()
    _db.drop_all()


@pytest.fixture(name="user")
def fixture_user(db):
    """Create user for the tests."""
    user = UserFactory(password="myprecious")
    db.session.commit()
    return user
