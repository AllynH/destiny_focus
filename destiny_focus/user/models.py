# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from flask_login import UserMixin

from destiny_focus.database import (
    Column,
    Model,
    SurrogatePK,
    db,
    reference_col,
    relationship,
)
from destiny_focus.extensions import bcrypt
from destiny_focus.extensions import login_manager

class Role(SurrogatePK, Model):
    """A role for a user."""

    __tablename__ = "roles"
    name = Column(db.String(80), unique=True, nullable=False)
    user_id = reference_col("users", nullable=True)
    user = relationship("User", backref="roles")

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        """Represent instance as a unique string."""
        return f"<Role({self.name})>"


# class User(UserMixin, SurrogatePK, Model):
#     """A user of the app."""

#     __tablename__ = "users"
#     username = Column(db.String(80), unique=True, nullable=False)
#     email = Column(db.String(80), unique=True, nullable=False)
#     #: The hashed password
#     password = Column(db.LargeBinary(128), nullable=True)
#     created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
#     first_name = Column(db.String(30), nullable=True)
#     last_name = Column(db.String(30), nullable=True)
#     active = Column(db.Boolean(), default=False)
#     is_admin = Column(db.Boolean(), default=False)

#     def __init__(self, username, email, password=None, **kwargs):
#         """Create instance."""
#         db.Model.__init__(self, username=username, email=email, **kwargs)
#         if password:
#             self.set_password(password)
#         else:
#             self.password = None

#     def set_password(self, password):
#         """Set password."""
#         self.password = bcrypt.generate_password_hash(password)

#     def check_password(self, value):
#         """Check password."""
#         return bcrypt.check_password_hash(self.password, value)

#     @property
#     def full_name(self):
#         """Full user name."""
#         return f"{self.first_name} {self.last_name}"

#     def __repr__(self):
#         """Represent instance as a unique string."""
#         return f"<User({self.username!r})>"




class User(UserMixin, SurrogatePK, Model):
    """A user of the app."""

    __tablename__ = "users"

    username                = Column(db.String(128), nullable=False)
    unique_name             = Column(db.String(128), nullable=False)
    bungieMembershipId      = Column(db.Integer, nullable=False)
    access_token            = Column(db.String(128), nullable=False)
    refresh_token           = Column(db.String(128), nullable=False)
    refresh_ready           = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    refresh_expired         = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    access_expired          = Column(db.DateTime, default=dt.datetime.utcnow)
    last_seen               = Column(db.DateTime, default=dt.datetime.utcnow)


    # username = Column(db.String(80), unique=True, nullable=False)
    # email = Column(db.String(80), unique=True, nullable=False)
    # #: The hashed password
    # password = Column(db.LargeBinary(128), nullable=True)
    # created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    # first_name = Column(db.String(30), nullable=True)
    # last_name = Column(db.String(30), nullable=True)
    # active = Column(db.Boolean(), default=False)
    # is_admin = Column(db.Boolean(), default=False)

    # def __init__(self, username, email, password=None, **kwargs):
    #     """Create instance."""
    #     db.Model.__init__(self, username=username, email=email, **kwargs)


    @property
    def account_details(self):
        """Full user name."""
        return f"Account name:{self.user_name} Membership type:{self.membershipType}"

    def __repr__(self):
        """Represent instance as a unique string."""
        return f"<User({self.username!r})>"

    @property
    def is_authenticated(self):
        return True
    
    @property
    def is_active(self):
        return True
    
    @property
    def is_anonymous(self):
        return False
    
    def get_id(self):
        return str(self.id)     # Python 3

    @staticmethod
    def make_unique_username(username):
        if User.query.filter_by(username=username).first() is None:
            return username
        version = 2
        while True:
            new_username = username + str(version)
            if User.query.filter_by(username=new_username).first() is None:
                break
            version += 1
        return new_username
    def __repr__(self):
        return '<User %r>' % (self.username)

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
