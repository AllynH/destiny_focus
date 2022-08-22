# -*- coding: utf-8 -*-
"""Factories to help in tests."""
from factory import PostGenerationMethodCall, Sequence
from factory.alchemy import SQLAlchemyModelFactory

from destiny_focus.database import db
from destiny_focus.user.models import User


class BaseFactory(SQLAlchemyModelFactory):
    """Base factory."""

    class Meta:
        """Factory configuration."""

        abstract = True
        sqlalchemy_session = db.session


# class UserFactory(BaseFactory):
#     """User factory."""

#     username = Sequence(lambda n: f"user{n}")
#     email = Sequence(lambda n: f"user{n}@example.com")
#     password = PostGenerationMethodCall("set_password", "example")
#     active = True

#     class Meta:
#         """Factory configuration."""

#         model = User

class UserFactory(BaseFactory):
    """User factory."""

    username                = Sequence(lambda n: f"{n}")
    bungieMembershipId      = Sequence(lambda n: n)
    unique_name             = Sequence(lambda n: f"{n}")
    access_token            = "access_token_12345"
    refresh_token           = "refresh_token_12345"

    class Meta:
        """Factory configuration."""

        model = User
        print(f"UserFactory Meta:", model)
