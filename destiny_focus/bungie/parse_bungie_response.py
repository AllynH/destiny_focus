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


def summarize_historical_stats(stats_list):
    """
    The endpoint: /auth/get/historical_stats/2/4611686018436136301/2305843009260647150/
    Returns a list of dailyactivities.
    This list needs to be summarised into a single activity.

    Some activites must be added together.
    Other activies are ratios and will be regenerated.
    """


    summary = {
        "period"                        : [],

        # Stats:
        "assists"                       : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "deaths"                        : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "kills"                         : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "opponentsDefeated"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "precisionKills"                : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "secondsPlayed"                 : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "suicides"                      : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "resurrectionsPerformed"        : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "resurrectionsReceived"         : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "score"                         : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "teamScore"                     : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "totalActivityDurationSeconds"  : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "totalDeathDistance"            : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "totalKillDistance"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "totalMedalsEarned"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},

        # # Generate new ratios:
        "killsDeathsAssists"            : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "killsDeathsRatio"              : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "efficiency"                    : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "winLossRatio"                  : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "combatRating"                  : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "averageDeathDistance"          : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "averageKillDistance"           : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "averageLifespan"               : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "averageScorePerKill"           : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "averageScorePerLife"           : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "remainingTimeAfterQuitSeconds" : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},


        # Activities    :
        "activitiesEntered"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "activitiesWon"                 : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "allParticipantsCount"          : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "allParticipantsScore"          : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "allParticipantsTimePlayed"     : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "fireTeamActivities"            : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "objectivesCompleted"           : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},

        # Character / Account    :
        "highestCharacterLevel"         : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "highestLightLevel"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "highestSandboxLevel"           : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},
        "maximumPowerLevel"             : {"basic": { "displayValue": 0.0 }, "pga": { "displayValue": 0.0 }},

    }

    for s in stats_list:

        # List of days  played:
        summary["period"].append(s["period"])

        # Stats:
        summary["assists"]["basic"]["displayValue"]                        += s["values"]["assists"]["basic"]["value"]
        summary["deaths"]["basic"]["displayValue"]                         += s["values"]["deaths"]["basic"]["value"]
        summary["kills"]["basic"]["displayValue"]                          += s["values"]["kills"]["basic"]["value"]
        summary["opponentsDefeated"]["basic"]["displayValue"]              += s["values"]["opponentsDefeated"]["basic"]["value"]
        summary["precisionKills"]["basic"]["displayValue"]                 += s["values"]["precisionKills"]["basic"]["value"]
        summary["secondsPlayed"]["basic"]["displayValue"]                  += s["values"]["secondsPlayed"]["basic"]["value"]
        summary["suicides"]["basic"]["displayValue"]                       += s["values"]["suicides"]["basic"]["value"]
        summary["resurrectionsPerformed"]["basic"]["displayValue"]         += s["values"]["resurrectionsPerformed"]["basic"]["value"]
        summary["resurrectionsReceived"]["basic"]["displayValue"]          += s["values"]["resurrectionsReceived"]["basic"]["value"]
        summary["score"]["basic"]["displayValue"]                          += s["values"]["score"]["basic"]["value"]
        summary["teamScore"]["basic"]["displayValue"]                      += s["values"]["teamScore"]["basic"]["value"]
        summary["totalActivityDurationSeconds"]["basic"]["displayValue"]   += s["values"]["totalActivityDurationSeconds"]["basic"]["value"]
        summary["totalDeathDistance"]["basic"]["displayValue"]             += s["values"]["totalDeathDistance"]["basic"]["value"]
        summary["totalKillDistance"]["basic"]["displayValue"]              += s["values"]["totalKillDistance"]["basic"]["value"]
        summary["totalMedalsEarned"]["basic"]["displayValue"]              += s["values"]["dailyMedalsEarned"]["basic"]["value"]
        
        summary["combatRating"]["basic"]["displayValue"]                   += s["values"]["combatRating"]["basic"]["value"]
        summary["averageDeathDistance"]["basic"]["displayValue"]           += s["values"]["averageDeathDistance"]["basic"]["value"]
        summary["averageKillDistance"]["basic"]["displayValue"]            += s["values"]["averageKillDistance"]["basic"]["value"]
        summary["averageLifespan"]["basic"]["displayValue"]                += s["values"]["averageLifespan"]["basic"]["value"]
        summary["averageScorePerKill"]["basic"]["displayValue"]            += s["values"]["averageScorePerKill"]["basic"]["value"]
        summary["averageScorePerLife"]["basic"]["displayValue"]            += s["values"]["averageScorePerLife"]["basic"]["value"]
        summary["remainingTimeAfterQuitSeconds"]["basic"]["displayValue"]  += s["values"]["remainingTimeAfterQuitSeconds"]["basic"]["value"]

        #Useful stats:

        # Activities:
        summary["activitiesEntered"]["basic"]["displayValue"]              += s["values"]["activitiesEntered"]["basic"]["value"]
        summary["activitiesWon"]["basic"]["displayValue"]                  += s["values"]["activitiesWon"]["basic"]["value"]
        summary["allParticipantsCount"]["basic"]["displayValue"]           += s["values"]["allParticipantsCount"]["basic"]["value"]
        summary["allParticipantsScore"]["basic"]["displayValue"]           += s["values"]["allParticipantsScore"]["basic"]["value"]
        summary["allParticipantsTimePlayed"]["basic"]["displayValue"]      += s["values"]["allParticipantsTimePlayed"]["basic"]["value"]
        summary["fireTeamActivities"]["basic"]["displayValue"]             += s["values"]["fireTeamActivities"]["basic"]["value"]
        summary["objectivesCompleted"]["basic"]["displayValue"]            += s["values"]["objectivesCompleted"]["basic"]["value"]

        # Character / Account:
        summary["highestCharacterLevel"]["basic"]["displayValue"]          += s["values"]["highestCharacterLevel"]["basic"]["value"]
        summary["highestLightLevel"]["basic"]["displayValue"]              += s["values"]["highestLightLevel"]["basic"]["value"]
        summary["highestSandboxLevel"]["basic"]["displayValue"]            += s["values"]["highestSandboxLevel"]["basic"]["value"]
        summary["maximumPowerLevel"]["basic"]["displayValue"]              += s["values"]["maximumPowerLevel"]["basic"]["value"]


    # Generate new ratios:
    summary["killsDeathsAssists"]["basic"]["displayValue"]                 = calculate_kill_death_assists_ratio(summary["kills"]["basic"]["displayValue"], summary["deaths"]["basic"]["displayValue"], summary["assists"]["basic"]["displayValue"])
    summary["killsDeathsRatio"]["basic"]["displayValue"]                   = calculate_kill_death_ratio(summary["kills"]["basic"]["displayValue"], summary["deaths"]["basic"]["displayValue"])
    summary["efficiency"]["basic"]["displayValue"]                         = calculate_efficiency_ratio(summary["kills"]["basic"]["displayValue"], summary["deaths"]["basic"]["displayValue"], summary["assists"]["basic"]["displayValue"])
    summary["winLossRatio"]["basic"]["displayValue"]                       = calculate_win_loss_ratio(summary["activitiesWon"]["basic"]["displayValue"], (summary["objectivesCompleted"]["basic"]["displayValue"] - summary["activitiesWon"]["basic"]["displayValue"]))

    # Per game averages:
    summary["assists"]["pga"]["displayValue"]                        = calculate_per_activity_average(summary["assists"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["deaths"]["pga"]["displayValue"]                         = calculate_per_activity_average(summary["deaths"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["kills"]["pga"]["displayValue"]                          = calculate_per_activity_average(summary["kills"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["opponentsDefeated"]["pga"]["displayValue"]              = calculate_per_activity_average(summary["opponentsDefeated"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["precisionKills"]["pga"]["displayValue"]                 = calculate_per_activity_average(summary["precisionKills"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["secondsPlayed"]["pga"]["displayValue"]                  = calculate_per_activity_average(summary["secondsPlayed"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["suicides"]["pga"]["displayValue"]                       = calculate_per_activity_average(summary["suicides"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["resurrectionsPerformed"]["pga"]["displayValue"]         = calculate_per_activity_average(summary["resurrectionsPerformed"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["resurrectionsReceived"]["pga"]["displayValue"]          = calculate_per_activity_average(summary["resurrectionsReceived"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["score"]["pga"]["displayValue"]                          = calculate_per_activity_average(summary["score"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["teamScore"]["pga"]["displayValue"]                      = calculate_per_activity_average(summary["teamScore"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["totalActivityDurationSeconds"]["pga"]["displayValue"]   = calculate_per_activity_average(summary["totalActivityDurationSeconds"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["totalDeathDistance"]["pga"]["displayValue"]             = calculate_per_activity_average(summary["totalDeathDistance"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["totalKillDistance"]["pga"]["displayValue"]              = calculate_per_activity_average(summary["totalKillDistance"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["totalMedalsEarned"]["pga"]["displayValue"]              = calculate_per_activity_average(summary["totalMedalsEarned"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])

    summary["combatRating"]["pga"]["displayValue"]                   = calculate_per_activity_average(summary["combatRating"]["basic"]["displayValue"], len(summary["period"]))
    summary["averageDeathDistance"]["pga"]["displayValue"]           = calculate_per_activity_average(summary["averageDeathDistance"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["averageKillDistance"]["pga"]["displayValue"]            = calculate_per_activity_average(summary["averageKillDistance"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["averageLifespan"]["pga"]["displayValue"]                = calculate_per_activity_average(summary["averageLifespan"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["averageScorePerKill"]["pga"]["displayValue"]            = calculate_per_activity_average(summary["averageScorePerKill"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["averageScorePerLife"]["pga"]["displayValue"]            = calculate_per_activity_average(summary["averageScorePerLife"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    summary["remainingTimeAfterQuitSeconds"]["pga"]["displayValue"]  = calculate_per_activity_average(summary["remainingTimeAfterQuitSeconds"]["basic"]["displayValue"], summary["activitiesEntered"]["basic"]["displayValue"])
    
    # print(summary)

    return summary

def calculate_kill_death_ratio(kills, deaths):
    """
    kdr = kills / deaths
    Ensure the MLG's have some deaths.
    """
    if deaths > 0:
        kdr = kills / deaths
    else:
        kdr = kills
    return round(kdr, 2)

def calculate_kill_death_assists_ratio(kills, deaths, assists):
    """
    kda = kills + (assists / 2) / deaths
    Ensure the MLG's have some deaths.
    """
    numerator = kills + (assists / 2)
    if deaths > 0:
        kda = numerator / deaths
    else:
        kda = numerator
    return round(kda, 2)

def calculate_efficiency_ratio(kills, deaths, assists):
    """
    Bungies efficiency formula:
    efficiency = kills + assists / deaths
    Ensure the MLG's have some deaths.
    """
    numerator = kills + assists
    if deaths > 0:
        efficiency = numerator / deaths
    else:
        efficiency = numerator
    return round(efficiency, 2)

def calculate_win_loss_ratio(total_wins, total_losses):
    """
    Calculate the average for a list of items.
    """

    print(f"wins: {total_wins} losses: {total_losses}")

    if total_wins == 0:
        return 0

    activity_average = total_wins / total_losses

    return round(activity_average, 2)

def calculate_per_activity_average(total_value, total_activities):
    """
    Calculate the average for a list of items.
    """

    if total_activities == 0:
        return 0

    activity_average = total_value / total_activities

    return round(activity_average, 2)
