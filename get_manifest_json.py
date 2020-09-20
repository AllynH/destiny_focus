import requests
import json
from datetime import datetime
import time
import os
import sys
import errno
from urllib.parse import urlparse

from destiny_focus.app import create_app
from destiny_focus.extensions import db
from destiny_focus.user.models import Manifest, Manifest_Version
from destiny_focus.settings import OAUTH_CREDENTIALS
from destiny_focus.manifest_tools.manifest_functions import create_database_version, store_definition, get_definition, \
	delete_all_definitions, update_database_version, update_database_success

if os.getenv('FLASK_CONFIG') == "production":
	# Create app:
	create_app().app_context().push()
else:
	# Create app:
	# No developent config?
	# create_app(os.getenv('FLASK_CONFIG') or 'development').app_context().push()
	create_app().app_context().push()
	
# Use your own API key, from https://www.bungie.net/en/Application
API_KEY = 'YOUR_API_KEY_HERE'
BUNGIE_API_KEY = os.getenv('API_KEY') or API_KEY

# URL list:
URL_LIST = {
	'DESTINY_BASE_URL'		: 'https://www.bungie.net/Platform/Destiny2/',
	'BUNGIE_BASE_URL'		: 'https://www.bungie.net',
	'DESTINY_MANIFEST_URL'	: 'https://www.bungie.net/Platform/Destiny2/Manifest/'
}

# File list:
FILE_LIST = {
	'MANIFEST_VERSION'		: 'manifest_version.json',
	'MANIFEST'				: 'manifest.json',
	'SPLIT_DIR'				: os.path.normpath(os.getcwd() + "/split_json/")
}

# HTTP Request header, this sends your API key to Bungie and let's them know you want the response to be gzipped.
# The Requests library handles unzipping the response.
HEADERS = {"X-API-Key": OAUTH_CREDENTIALS["bungie"]["api_key"]}

def get_manifest_version():
	""" Send the request to Bungie for the Manifest version information: """
	print("\t-I- Requesting Manifest.")
	manifest_info = requests.get(URL_LIST['DESTINY_MANIFEST_URL'], headers=HEADERS)
	# print(manifest_info.status_code)
	# print(manifest_info.text)
	# print(manifest_info.encoding)

	if not manifest_info.status_code == 200 or manifest_info.json()["ErrorCode"] == 2101:
		print("\t-E- Bungie returned an error")
		print(manifest_info.status_code)
		print(manifest_info.text)
		return "Error"
	else:
		print("\t-I- Successfully recieved the Manifest version information!")
		# Convert text to JSON as it can be displayed very neatly:
		manifest_info_json = json.loads(manifest_info.text)

	# Print the info to a file:
	#write_json_file(FILE_LIST['MANIFEST_VERSION'], manifest_info_json)

	return manifest_info_json

def check_manifest_version(manifest_version, db_revision):
	""" 
		Check if the Manifest has been updated from the stored version.
	"""

	manifest_version 		= manifest_version['Response']['jsonWorldContentPaths']['en']
	stored_manifest_version	= Manifest_Version.query.first()

	print("\t-I- SQL manifest version:\t", db_revision)
	print("\t-I- Bungie manifest version:\t", manifest_version)

	if db_revision == manifest_version:
		print("\t-I- No difference between stored Manifest and downloaded version!")
		return False

	return True

def get_json_manifest(manifest_url):
	""" 
	Make the HTTP request to Bungie for the JSON Manifest.
	"""
	print("\t-I- Requesting JSON Manifest.")
	manifest_response = requests.get(manifest_url, headers=HEADERS)
	
	# Some useful debug print statements:
	# print(manifest_response.status_code)
	# print(manifest_response.json())
	# print("Printing content")
	# print(manifest_response.content)
	# print(manifest_response.text)
	# print("\t-I- Headers:", manifest_response.headers)

	if not manifest_response.status_code == 200:
		print("\t-E- Bungie returned an error")
		print(manifest_response.status_code)
		print(manifest_response.text)
		return "Error"

	# Print the info to a file - disabled as it causes memory errors:
	# print("\t-I- Wrting Manifest file.")
	# write_json_file(FILE_LIST['MANIFEST'], manifest_response.json())

	print("\t-I- Writing separate manifest files to SQL DB.")
	split_manifest(manifest_response.json())

	return manifest_response.json()

def split_manifest(manifest_json):
	""" Take the JSON Manifest file and writes a new JSON file for each key """

	key_list = manifest_json.keys()

	# Write files to disk:
	# for current_key in key_list:		
	# 	file_name = os.path.join(FILE_LIST['SPLIT_DIR'], current_key + ".json")
	# 	write_json_file(file_name, manifest_json[current_key])
	
	print("\t-I- Dropping database.")
	del_count = delete_all_definitions()
	print("\t\t-I- Deleted:", del_count, "items.")

	for key in key_list:
		print("\t\t-I-", key)
		for definition_key, definition_value in manifest_json[key].items():
			store_definition(def_name=str(key), def_id=str(definition_key), def_hash=json.dumps(definition_value))

	print("\t-I- Found", len(key_list), "definitions.")
	db.session.commit()

	return True

def make_sure_path_exists(path):
	""" Check to see if a path exists """
	try:
		print("\t-I- Creating: ", path)
		os.makedirs(path)
	except OSError as exception:
		if exception.errno != errno.EEXIST:
			raise

	return True

def write_json_file(file_name, write_json):
	""" Write JSON to a file: """

	#print("\t-I- Writing file for:", str(file_name))
	
	with open(file_name, 'w') as json_file:
		json_file.write(json.dumps(write_json, sort_keys=True, indent=4))

	return True

def run_get_json_manifest_full(force=False):
	"""
	Run the entire flow as a function:
	"""
	message = ""

	# Initialise some values:
	manifest_changed_status = False

	start_time = time.time()

	manifest_version = get_manifest_version()
	if manifest_version != "Error":
		# print(manifest_version)
		manifest_url = URL_LIST['BUNGIE_BASE_URL'] + manifest_version['Response']['jsonWorldContentPaths']['en']
		print("\t-I- Manifest version:", manifest_version['Response']['jsonWorldContentPaths']['en'])
	else:
		print("##################################################")
		print("Removed possibly dangerous code")
		print("##################################################")
		# sys.exit()

	stored_version = Manifest_Version.query.first()
	if stored_version is None:
		db_revision = None
	else:
		db_version = stored_version
		db_revision = stored_version.current_revision

	if db_revision is None:
		print("\t-I- Creating SQL database structure.")	
		db_version = create_database_version(manifest_version['Response']['jsonWorldContentPaths']['en'])
		# I've updated db_revision - grab it again:
		db_revision = ""
		force = True
		print("\t-I- Current revision is:", db_revision)

	# Check to see if the stored manifest version matches the downloaded version:
	manifest_changed_status = check_manifest_version(manifest_version, db_version.current_version)


	if manifest_changed_status or force:
		status = "Updated"
		# Update Manifest version information:
		db_version = update_database_version(manifest_version['Response'])
		# Create the directory if it doesn't exist:
		make_sure_path_exists(FILE_LIST['SPLIT_DIR'])
		# Stores the Manifest in the json_manifest object, so you can use it:
		json_manifest = get_json_manifest(manifest_url)
		db_version = update_database_success()
	else:
		status = "No change"

	end_time = time.time() - start_time
	print("-I- Run time:", end_time, "seconds")

	message = message + f" Revision: {db_version.current_revision} \nDate: {db_version.update_date}"
	response = {
		'Status'	: status,
		'Message'	: message,
		'Run_time'	: end_time,
		'Time'		: time
	}
	return response

if __name__ == "__main__":
	print("\t-I- This is the main function.")
	run_get_json_manifest_full()
	my_def = get_definition("DestinyInventoryItemDefinition", "1364093401")
	print(my_def.get('displayProperties', None))

	my_def = get_definition("DestinyInventoryItemDefinition", "347366834")
	print(my_def.get('displayProperties', None))

	my_def = get_definition("DestinyClassDefinition", "2271682572")
	print(my_def.get('displayProperties', None))

	my_def = get_definition("DestinyMilestoneDefinition", "1300394968")
	print(my_def.get('displayProperties', None))
