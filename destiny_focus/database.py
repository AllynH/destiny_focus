# -*- coding: utf-8 -*-
"""Database module, including the SQLAlchemy database object and DB-related utilities."""
from .compat import basestring
from .extensions import db, login_manager 

# Alias common SQLAlchemy names
Column = db.Column
relationship = db.relationship


class CRUDMixin(object):
    """Mixin that adds convenience methods for CRUD (create, read, update, delete) operations."""

    @classmethod
    def create(cls, **kwargs):
        """Create a new record and save it the database."""
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """Save the record."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.session.delete(self)
        return commit and db.session.commit()


class Model(CRUDMixin, db.Model):
    """Base model class that includes CRUD convenience methods."""

    __abstract__ = True


# From Mike Bayer's "Building the app" talk
# https://speakerdeck.com/zzzeek/building-the-app
class SurrogatePK(object):
    """A mixin that adds a surrogate integer 'primary key' column named ``id`` to any declarative-mapped class."""

    __table_args__ = {"extend_existing": True}

    id = Column(db.Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, record_id):
        """Get record by ID."""
        if any(
            (
                isinstance(record_id, basestring) and record_id.isdigit(),
                isinstance(record_id, (int, float)),
            )
        ):
            return cls.query.get(int(record_id))
        return None


def reference_col(
    tablename, nullable=False, pk_name="id", foreign_key_kwargs=None, column_kwargs=None
):
    """Column that adds primary key foreign key reference.

    Usage: ::

        category_id = reference_col('category')
        category = relationship('Category', backref='categories')
    """
    foreign_key_kwargs = foreign_key_kwargs or {}
    column_kwargs = column_kwargs or {}

    return Column(
        db.ForeignKey(f"{tablename}.{pk_name}", **foreign_key_kwargs),
        nullable=nullable,
        **column_kwargs,
    )



class User(db.Model):
    __tablename__               = 'users_table'
    id                          = db.Column(db.Integer, primary_key=True)
    username                    = db.Column(db.String(128), nullable=False)
    unique_name                 = db.Column(db.String(128), nullable=False, unique=True)
    membershipType              = db.Column(db.String(128), nullable=False)
    bungieMembershipId          = db.Column(db.String(128), nullable=False)
    accountMembershipId         = db.Column(db.String(128), nullable=False)
    characterId_0               = db.Column(db.String(128), nullable=False)
    characterId_1               = db.Column(db.String(128))
    characterId_2               = db.Column(db.String(128))
    access_token                = db.Column(db.String(512), nullable=False)
    refresh_token               = db.Column(db.String(512), nullable=False)
    refresh_ready               = db.Column(db.DateTime)
    refresh_expired             = db.Column(db.DateTime)
    access_expired              = db.Column(db.DateTime)
    last_seen                   = db.Column(db.DateTime)
    state_token                 = db.Column(db.String(128))

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
