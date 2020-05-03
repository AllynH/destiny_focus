import redis
import json
from urllib.parse import urlparse
import os
from destiny_focus.settings import redis_db


def get_definition(definition, def_hash):
    """ 
    Function to find a given definition, return the JSON response: 
    The Last Word: 1364093401
    """
    revision_key = "D2:metadata:revision"
    db_revision = redis_db.get(revision_key)
    db_namespace = "D2:" + str(db_revision) + ":" + str(definition) + ":" + str(def_hash)

    try:
        definition = json.loads(redis_db.get(db_namespace))
    except TypeError:
        definition = {}

    return definition