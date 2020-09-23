import requests
import json
from destiny_focus.manifest_tools.manifest_functions import get_definition
def get_character_details_json(GetProfile_res):
    """
    Parse the GetProfile response to get Character information.
    """
    character_details = {}
    temp_dict = {}
    charId_list = []

    # print(GetProfile_res)
    # print(GetProfile_res.headers)

    for key in GetProfile_res['Response']['characters']['data']:
        charId_list.append(key)

    # Populate Tuple for form choices and test which character has been selected:
    for x in range(len(charId_list)):            
        i = GetProfile_res['Response']['profile']['data']['characterIds'][x]
        # Populate drop down menu:
        race_name       = get_definition('DestinyRaceDefinition', (GetProfile_res['Response']['characters']['data'][i]['raceHash']))
        gender_name     = get_definition('DestinyGenderDefinition', (GetProfile_res['Response']['characters']['data'][i]['genderHash']))
        destiny_class   = get_definition('DestinyClassDefinition', (GetProfile_res['Response']['characters']['data'][i]['classHash']))
        emblem_hash     = GetProfile_res['Response']['characters']['data'][i]['emblemHash']
        base_level      = GetProfile_res['Response']['characters']['data'][i]['baseCharacterLevel']
        light           = GetProfile_res['Response']['characters']['data'][i]['light']
        dateLastPlayed  = GetProfile_res['Response']['characters']['data'][i]['dateLastPlayed']
        titleRecordHash = GetProfile_res['Response']['characters']['data'][i].get('titleRecordHash', None)
        minutesPlayedThisSession    = GetProfile_res['Response']['characters']['data'][i]['minutesPlayedThisSession']
        minutesPlayedTotal          = GetProfile_res['Response']['characters']['data'][i]['minutesPlayedTotal']

        emblem = get_emblem(emblem_hash)
        title  = get_title(titleRecordHash) if titleRecordHash is not None else None
        temp_dict = {
            i: {
                "character_id"  : i,
                "race_name"     : race_name['displayProperties']['name'],
                "gender_name"   : gender_name['displayProperties']['name'],
                "destiny_class" : destiny_class['displayProperties']['name'],
                "emblem_hash"   : emblem,
                "base_level"    : base_level,
                "light"         : light,
                "title"         : title,
                "dateLastPlayed"            : dateLastPlayed,
                "minutesPlayedThisSession"  : minutesPlayedThisSession,
                "minutesPlayedTotal"        : minutesPlayedTotal,
            }
        }
        character_details.update(temp_dict)

    #json_logger(GetProfile_res, "GetProfile.json")
    # with open('xur_response_GetVendors_hash.json', 'w') as outfile:
    #     json.dump(res.json(), outfile, sort_keys=True, indent=4)

    return character_details

def get_emblem(emblem_hash):
    """
    Get the higher resolution emblem.
    """
    emblem_full = get_definition('DestinyInventoryItemDefinition', emblem_hash)

    # print(emblem_full)

    emblem_data ={
        "icon": emblem_full['secondaryOverlay'],
        "background": emblem_full['secondarySpecial'],
        "description": emblem_full['displayProperties']['description']
    }
    
    return emblem_data


def get_title(title_hash):
    """
    Get the higher resolution emblem.
    """
    title_full = get_definition('DestinyRecordDefinition', title_hash)

    # print(emblem_full)

    title_data ={
        "icon"  : title_full['displayProperties']['icon'],
        "name"  : title_full['displayProperties']['name'],
        "description": title_full['displayProperties']['description'],
        "title" : title_full['titleInfo']['titlesByGender']['Female'],
    }
    
    return title_data

