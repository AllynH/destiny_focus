import json
from datetime import datetime

from destiny_focus.extensions import db
from destiny_focus.user.models import Manifest, Manifest_Version

def create_database_version(version_details):
    """
    Create the database version table.
    """

    manifest_version = Manifest_Version(
        current_revision=0,
        current_version=version_details,
        update_date=datetime.now(),
        update_type="Forced",
        update_successful=False,
        json_response="Initial commit."
    )
    db.session.add(manifest_version)
    db.session.commit()

    return manifest_version

def update_database_version(version_details):
    """
    Update the database version table.
    """

    manifest_version = Manifest_Version.query.first()
    manifest_version.current_revision   += 1
    manifest_version.current_version    = version_details['jsonWorldContentPaths']['en']
    manifest_version.update_date        = datetime.now()
    manifest_version.update_type        = "Update"
    manifest_version.update_successful  = False
    manifest_version.json_response      = json.dumps(version_details)

    db.session.commit()

    return manifest_version

def update_database_success():
    """
    Update the database version table - for a successful run.
    """

    manifest_version = Manifest_Version.query.first()
    manifest_version.update_successful  = True

    db.session.commit()

    return manifest_version


def store_definition(def_name, def_id, def_hash):
    """
    Create an entry into the Manifest SQL database.
    """
    entry = Manifest(
        definition_name=def_name,
        definition_id=def_id,
        definition_hash=def_hash
    )

    db.session.add(entry)

    return True

def delete_selected_definitions(def_name):
    """
    Delete aselected set of old definitions in preperation for new data.
    """
    del_count = Manifest.query.filter_by(definition_name=def_name).delete()

    db.session.commit()

    return del_count

def delete_all_definitions():
    """
    Delete all old definitions in preperation for new data.
    """
    del_count = Manifest.query.delete()

    db.session.commit()

    return del_count

def get_definition(def_name, def_id):
    """ 
    Function to find a given definition, return the JSON response: 
    The Last Word: 1364093401
    """
    manifest_item = Manifest.query.filter_by(definition_name=str(def_name), definition_id=str(def_id)).first()

    if manifest_item is None:
        return {}
    else:
        return json.loads(manifest_item.definition_hash)
