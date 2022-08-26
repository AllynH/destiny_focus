import json
import os

def get_json_from_file():
    """
    Import the season data from a JSON file.
    """

    basedir = os.path.abspath(os.path.dirname(__file__))
    with open(f"{basedir}/season_data.json", "r") as f:
        data = json.load(f)

    return data

def get_current_season(season_data):
    """
    Get the latest season number from the season data.
    """
    for k, _ in season_data.items():
        if season_data[k]["ACTIVE"] == True:
            return k

SEASONS = get_json_from_file()
CURRENT_SEASON = get_current_season(SEASONS)
LAST_SEASON = str(int(CURRENT_SEASON) - 1)
