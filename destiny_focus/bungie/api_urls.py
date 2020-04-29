API_ROOT_PATH 	= "https://www.bungie.net/Platform/"
D2_BASE_URL 	= API_ROOT_PATH + "Destiny2/"
D2_USER_URL		= API_ROOT_PATH + "User/"

base_url 		= D2_BASE_URL
plat_url		= API_ROOT_PATH
user_url		= D2_USER_URL

bungie_api_urls = {

    'base_url'                  : base_url,
    'user_url'                  : user_url,
    'GetCurrentBungieAccount'   : user_url + "GetCurrentBungieAccount/",
    'GetActivityHistory'        : base_url + "{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/Activities/",
    'GetProfile'                : base_url + "{membershipType}/Profile/{destinyMembershipId}/"
}