# -*- coding: utf-8 -*-
"""
Model unit tests - tests dedicated to:
1. Test User object creation.
2. Test PGCR creation.
3. Test Manifest item creation.
"""

# import datetime as dt
from datetime import datetime, timedelta
import json
import pytest

from destiny_focus.user.models import Manifest_Version, User, PGCRs
from ..factories import UserFactory


TEST_MANIFEST_VERSION = {
    "iconImagePyramidInfo": [
    ],
    "jsonWorldComponentContentPaths": {
        "en": {
            "DestinyAchievementDefinition": "/common/destiny2_content/json/en/DestinyAchievementDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityDefinition": "/common/destiny2_content/json/en/DestinyActivityDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityGraphDefinition": "/common/destiny2_content/json/en/DestinyActivityGraphDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityInteractableDefinition": "/common/destiny2_content/json/en/DestinyActivityInteractableDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityModeDefinition": "/common/destiny2_content/json/en/DestinyActivityModeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityModifierDefinition": "/common/destiny2_content/json/en/DestinyActivityModifierDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyActivityTypeDefinition": "/common/destiny2_content/json/en/DestinyActivityTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyArtDyeChannelDefinition": "/common/destiny2_content/json/en/DestinyArtDyeChannelDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyArtDyeReferenceDefinition": "/common/destiny2_content/json/en/DestinyArtDyeReferenceDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyArtifactDefinition": "/common/destiny2_content/json/en/DestinyArtifactDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyBondDefinition": "/common/destiny2_content/json/en/DestinyBondDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyBreakerTypeDefinition": "/common/destiny2_content/json/en/DestinyBreakerTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyCharacterCustomizationCategoryDefinition": "/common/destiny2_content/json/en/DestinyCharacterCustomizationCategoryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyCharacterCustomizationOptionDefinition": "/common/destiny2_content/json/en/DestinyCharacterCustomizationOptionDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyChecklistDefinition": "/common/destiny2_content/json/en/DestinyChecklistDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyClassDefinition": "/common/destiny2_content/json/en/DestinyClassDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyCollectibleDefinition": "/common/destiny2_content/json/en/DestinyCollectibleDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyDamageTypeDefinition": "/common/destiny2_content/json/en/DestinyDamageTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyDestinationDefinition": "/common/destiny2_content/json/en/DestinyDestinationDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyEnergyTypeDefinition": "/common/destiny2_content/json/en/DestinyEnergyTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyEntitlementOfferDefinition": "/common/destiny2_content/json/en/DestinyEntitlementOfferDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyEquipmentSlotDefinition": "/common/destiny2_content/json/en/DestinyEquipmentSlotDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyFactionDefinition": "/common/destiny2_content/json/en/DestinyFactionDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyGenderDefinition": "/common/destiny2_content/json/en/DestinyGenderDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyInventoryBucketDefinition": "/common/destiny2_content/json/en/DestinyInventoryBucketDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyInventoryItemDefinition": "/common/destiny2_content/json/en/DestinyInventoryItemDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyInventoryItemLiteDefinition": "/common/destiny2_content/json/en/DestinyInventoryItemLiteDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyItemCategoryDefinition": "/common/destiny2_content/json/en/DestinyItemCategoryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyItemTierTypeDefinition": "/common/destiny2_content/json/en/DestinyItemTierTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyLocationDefinition": "/common/destiny2_content/json/en/DestinyLocationDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyLoreDefinition": "/common/destiny2_content/json/en/DestinyLoreDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyMaterialRequirementSetDefinition": "/common/destiny2_content/json/en/DestinyMaterialRequirementSetDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyMedalTierDefinition": "/common/destiny2_content/json/en/DestinyMedalTierDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyMetricDefinition": "/common/destiny2_content/json/en/DestinyMetricDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyMilestoneDefinition": "/common/destiny2_content/json/en/DestinyMilestoneDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyNodeStepSummaryDefinition": "/common/destiny2_content/json/en/DestinyNodeStepSummaryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyObjectiveDefinition": "/common/destiny2_content/json/en/DestinyObjectiveDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyPlaceDefinition": "/common/destiny2_content/json/en/DestinyPlaceDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyPlatformBucketMappingDefinition": "/common/destiny2_content/json/en/DestinyPlatformBucketMappingDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyPlugSetDefinition": "/common/destiny2_content/json/en/DestinyPlugSetDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyPowerCapDefinition": "/common/destiny2_content/json/en/DestinyPowerCapDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyPresentationNodeDefinition": "/common/destiny2_content/json/en/DestinyPresentationNodeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyProgressionDefinition": "/common/destiny2_content/json/en/DestinyProgressionDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyProgressionLevelRequirementDefinition": "/common/destiny2_content/json/en/DestinyProgressionLevelRequirementDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyProgressionMappingDefinition": "/common/destiny2_content/json/en/DestinyProgressionMappingDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRaceDefinition": "/common/destiny2_content/json/en/DestinyRaceDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRecordDefinition": "/common/destiny2_content/json/en/DestinyRecordDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyReportReasonCategoryDefinition": "/common/destiny2_content/json/en/DestinyReportReasonCategoryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardAdjusterPointerDefinition": "/common/destiny2_content/json/en/DestinyRewardAdjusterPointerDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardAdjusterProgressionMapDefinition": "/common/destiny2_content/json/en/DestinyRewardAdjusterProgressionMapDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardItemListDefinition": "/common/destiny2_content/json/en/DestinyRewardItemListDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardMappingDefinition": "/common/destiny2_content/json/en/DestinyRewardMappingDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardSheetDefinition": "/common/destiny2_content/json/en/DestinyRewardSheetDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyRewardSourceDefinition": "/common/destiny2_content/json/en/DestinyRewardSourceDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySackRewardItemListDefinition": "/common/destiny2_content/json/en/DestinySackRewardItemListDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySandboxPatternDefinition": "/common/destiny2_content/json/en/DestinySandboxPatternDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySandboxPerkDefinition": "/common/destiny2_content/json/en/DestinySandboxPerkDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySeasonDefinition": "/common/destiny2_content/json/en/DestinySeasonDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySeasonPassDefinition": "/common/destiny2_content/json/en/DestinySeasonPassDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySocketCategoryDefinition": "/common/destiny2_content/json/en/DestinySocketCategoryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinySocketTypeDefinition": "/common/destiny2_content/json/en/DestinySocketTypeDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyStatDefinition": "/common/destiny2_content/json/en/DestinyStatDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyStatGroupDefinition": "/common/destiny2_content/json/en/DestinyStatGroupDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyTalentGridDefinition": "/common/destiny2_content/json/en/DestinyTalentGridDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyTraitCategoryDefinition": "/common/destiny2_content/json/en/DestinyTraitCategoryDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyTraitDefinition": "/common/destiny2_content/json/en/DestinyTraitDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyUnlockCountMappingDefinition": "/common/destiny2_content/json/en/DestinyUnlockCountMappingDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyUnlockDefinition": "/common/destiny2_content/json/en/DestinyUnlockDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyUnlockEventDefinition": "/common/destiny2_content/json/en/DestinyUnlockEventDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyUnlockExpressionMappingDefinition": "/common/destiny2_content/json/en/DestinyUnlockExpressionMappingDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyUnlockValueDefinition": "/common/destiny2_content/json/en/DestinyUnlockValueDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyVendorDefinition": "/common/destiny2_content/json/en/DestinyVendorDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json",
            "DestinyVendorGroupDefinition": "/common/destiny2_content/json/en/DestinyVendorGroupDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json"
        },
    },
    "jsonWorldContentPaths": {
        "de": "/common/destiny2_content/json/de/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "en": "/common/destiny2_content/json/en/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "es": "/common/destiny2_content/json/es/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "es-mx": "/common/destiny2_content/json/es-mx/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "fr": "/common/destiny2_content/json/fr/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "it": "/common/destiny2_content/json/it/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "ja": "/common/destiny2_content/json/ja/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "ko": "/common/destiny2_content/json/ko/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "pl": "/common/destiny2_content/json/pl/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "pt-br": "/common/destiny2_content/json/pt-br/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "ru": "/common/destiny2_content/json/ru/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "zh-chs": "/common/destiny2_content/json/zh-chs/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json",
        "zh-cht": "/common/destiny2_content/json/zh-cht/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json"
    },
    "mobileAssetContentPath": "/common/destiny2_content/sqlite/asset/asset_sql_content_a7a5212fa740bc8b84289f6c9576326f.content",
    "mobileClanBannerDatabasePath": "/common/destiny2_content/clanbanner/clanbanner_sql_content_ad954e4acd39faf0a5e008ffa9c0bef5.content",
    "mobileGearAssetDataBases": [
        {
            "path": "/common/destiny2_content/sqlite/asset/asset_sql_content_a7a5212fa740bc8b84289f6c9576326f.content",
            "version": 0
        },
        {
            "path": "/common/destiny2_content/sqlite/asset/asset_sql_content_ca55886073e697eb23ed39fc729dfb93.content",
            "version": 1
        },
        {
            "path": "/common/destiny2_content/sqlite/asset/asset_sql_content_ca55886073e697eb23ed39fc729dfb93.content",
            "version": 2
        }
    ],
    "mobileGearCDN": {
        "Gear": "/common/destiny2_content/geometry/gear",
        "Geometry": "/common/destiny2_content/geometry/platform/mobile/geometry",
        "PlateRegion": "/common/destiny2_content/geometry/platform/mobile/plated_textures",
        "Shader": "/common/destiny2_content/geometry/platform/mobile/shaders",
        "Texture": "/common/destiny2_content/geometry/platform/mobile/textures"
    },
    "mobileWorldContentPaths": {
        "de": "/common/destiny2_content/sqlite/de/world_sql_content_719cfe95ab60180ef02c725335e30bcb.content",
        "en": "/common/destiny2_content/sqlite/en/world_sql_content_8cd92f73b749d2641bc06bb855bd2bd6.content",
        "es": "/common/destiny2_content/sqlite/es/world_sql_content_b5447420dd49d65ece73fc58cd99219d.content",
        "es-mx": "/common/destiny2_content/sqlite/es-mx/world_sql_content_40129d12e9bdc23f03c9fe13359697c6.content",
        "fr": "/common/destiny2_content/sqlite/fr/world_sql_content_cb8589d3f380f8fce2fbec7fe300ddc3.content",
        "it": "/common/destiny2_content/sqlite/it/world_sql_content_e7e864890737a6db45db80da572a45ae.content",
        "ja": "/common/destiny2_content/sqlite/ja/world_sql_content_84bde75e9ad1de289768971634a3bb05.content",
        "ko": "/common/destiny2_content/sqlite/ko/world_sql_content_da843d85d8927ffaee4d741f40cdfb28.content",
        "pl": "/common/destiny2_content/sqlite/pl/world_sql_content_5779efcb4689dd56968278b48af07585.content",
        "pt-br": "/common/destiny2_content/sqlite/pt-br/world_sql_content_4f882d6eafa75c6d00860aa2635c300e.content",
        "ru": "/common/destiny2_content/sqlite/ru/world_sql_content_0f31b7a8151b142cffc3201db83aa465.content",
        "zh-chs": "/common/destiny2_content/sqlite/zh-chs/world_sql_content_784c07ab4ca3fafa2342a7c5e0267f55.content",
        "zh-cht": "/common/destiny2_content/sqlite/zh-cht/world_sql_content_2e9c019e90b3a264137aff92b8bd9fbb.content"
    },
    "version": "105581.22.05.26.0310-2-bnet.44646"
}


@pytest.mark.usefixtures("db")
class TestUser:
    """ User tests."""

    def test_get_user_by_id(self):
        user = User(
            username                = "test_account",
            unique_name             = "test_account" + "_" + "12345",
            bungieMembershipId      = "12345",
            access_token            = "access_token_12345",
            refresh_token           = "refresh_token_12345",
        )
        user.save()

        retrieved = User.get_by_id(user.id)
        assert retrieved == user

    def test_created_at_defaults_to_datetime(self):
        """Test last_seen date."""
        user = User(
            username                = "test_account",
            unique_name             = "test_account" + "_" + "12345",
            bungieMembershipId      = "12345",
            access_token            = "access_token_12345",
            refresh_token           = "refresh_token_12345",
        )
        user.save()

        assert bool(user.last_seen)
        assert isinstance(user.last_seen, datetime)
        assert isinstance(user.refresh_ready, datetime)
        assert isinstance(user.refresh_expired, datetime)
        assert isinstance(user.access_expired, datetime)

    def test_factory(self, db):
        """Test user factory."""
        u_name = "username"
        id = "09876"
        user = UserFactory(username=u_name, bungieMembershipId=id, unique_name=f"{u_name}_{id}")
        db.session.commit()
        assert bool(user.username)
        assert bool(user.bungieMembershipId)
        # assert bool(user.unique_name)
        assert bool(user.last_seen)
        # Pylint does not User class methods, only UserFactory class methods:
        assert user.unique_name == "username_09876"                                     # pylint: disable=no-member

    def test_user_account_details(self):
        """
        User account_details.
        """
        u_name = "username"
        id = "09876"
        user = UserFactory(username=u_name, bungieMembershipId=id, unique_name=f"{u_name}_{id}")
        # Pylint does not User class methods, only UserFactory class methods:
        assert user.account_details == f"Account name:{u_name} Membership type:{id}"    # pylint: disable=no-member


@pytest.mark.usefixtures("db")
class TestPGCRs:
    """ PGCR tests. """

    def test_get_pgcr_by_id(self):
        """
        GIVEN a PGCR model
        WHEN a new PGCR is created
        THEN check the activityId, membershipType, mode, players, duration, period, createdAt fields are defined correctly.
        """

        my_pgcr = PGCRs(
            activityId      = 11166741777,
            membershipType  = 2,
            mode            = 90,
            players         = 12,
            duration        = 550,
        )
        my_pgcr.save()

        retrieved = PGCRs.get_by_id(my_pgcr.id)
        assert retrieved == my_pgcr

    def test_period_createdAt_default_to_datetime(self):
        """
        GIVEN a PGCR model
        WHEN a new PGCR is created
        THEN check the period and createdAt objects default to datetime objects.
        """

        my_pgcr = PGCRs(
            activityId      = 11166741777,
            membershipType  = 2,
            mode            = 90,
            players         = 12,
            duration        = 550,
        )
        my_pgcr.save()

        retrieved = PGCRs.get_by_id(my_pgcr.id)
        assert retrieved == my_pgcr

        assert bool(my_pgcr.period)
        assert bool(my_pgcr.createdAt)
        assert isinstance(my_pgcr.period, datetime)
        assert isinstance(my_pgcr.createdAt, datetime)


    def test_pgcr_foreign_key(self):
        """
        GIVEN PGCRs and User models
        WHEN a new PGCR is created and appended to a User
        THEN check the foreign key has been assigned correctly.
        """

        user = User(
            username                = "username",
            unique_name             = "test_account" + "_" + "12345",
            bungieMembershipId      = "12345",
            access_token            = "access_token_12345",
            refresh_token           = "refresh_token_12345",
        )

        my_pgcr = PGCRs(
            activityId      = 11166741777,
            membershipType  = 2,
            mode            = 90,
            players         = 12,
            duration        = 550,
        )
        user.pgcrs.append(my_pgcr)

        user.save()
        my_pgcr.save()

        assert user.id == my_pgcr.user_id

@pytest.mark.usefixtures("db")
class TestManifest_Version:
    """ Manifest_Version tests. """

    def test_get_manifest_version_by_id(self):
        """
        GIVEN a Manifest_Version model
        WHEN a new Manifest_Version is created
        THEN check the id matches the added version.
        """

        my_manifest_version = Manifest_Version(
            current_revision = 1,
            current_version = "v123.abc",
            update_type     = "force",
            json_response   = json.dumps(TEST_MANIFEST_VERSION),
        )
        my_manifest_version.save()

        retrieved = Manifest_Version.get_by_id(my_manifest_version.id)
        assert retrieved == my_manifest_version

    def test_update_date_defaults_to_datetime(self):
        """
        GIVEN a Manifest_Version model
        WHEN a new Manifest_Version is created
        THEN check the id matches the added version.
        """
        my_manifest_version = Manifest_Version(
            current_revision = 1,
            current_version = "v123.abc",
            update_type     = "force",
            json_response   = json.dumps(TEST_MANIFEST_VERSION),
        )
        my_manifest_version.save()

        assert bool(my_manifest_version.update_date)
        assert isinstance(my_manifest_version.update_date, datetime)

        assert my_manifest_version.update_successful != True

    def test_update_successful_defaults_to_false(self):
        """
        GIVEN a Manifest_Version model
        WHEN a new Manifest_Version is created
        THEN check the update_successful parameter is defaulted to False.
        """
        my_manifest_version = Manifest_Version(
            current_revision = 1,
            current_version = "v123.abc",
            update_type     = "force",
            json_response   = json.dumps(TEST_MANIFEST_VERSION),
        )
        my_manifest_version.save()

        assert my_manifest_version.update_successful != True

    def test_json_loaded_correctly(self):
        """
        GIVEN a Manifest_Version model
        WHEN a new Manifest_Version is created
        THEN check the update_successful parameter is defaulted to False.
        """
        my_manifest_version = Manifest_Version(
            current_revision = 1,
            current_version = "v123.abc",
            update_type     = "force",
            json_response   = json.dumps(TEST_MANIFEST_VERSION),
        )
        my_manifest_version.save()

        my_test_json = json.loads(my_manifest_version.json_response)
        assert my_test_json["jsonWorldComponentContentPaths"]["en"]["DestinyActivityDefinition"] == "/common/destiny2_content/json/en/DestinyActivityDefinition-81aeb269-5706-44b5-89a2-db16c5a38608.json"
        assert my_test_json["jsonWorldContentPaths"]["en"] == "/common/destiny2_content/json/en/aggregate-81aeb269-5706-44b5-89a2-db16c5a38608.json"
        assert my_test_json["mobileWorldContentPaths"]["en"] == "/common/destiny2_content/sqlite/en/world_sql_content_8cd92f73b749d2641bc06bb855bd2bd6.content"

    def test_object_represents_correctly(self):
        """
        GIVEN a Manifest_Version model
        WHEN a new Manifest_Version is created
        THEN check the update_successful parameter is defaulted to False.
        """
        my_manifest_version = Manifest_Version(
            current_revision = 1,
            current_version = "v123.abc",
            update_type     = "force",
            json_response   = json.dumps(TEST_MANIFEST_VERSION),
        )
        my_manifest_version.save()

        assert repr(my_manifest_version) == f"<Manifest_Version: ({my_manifest_version.current_revision} : {my_manifest_version.update_date})>"    # pylint: disable=no-member
