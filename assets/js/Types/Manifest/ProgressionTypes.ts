interface ProgressionStepInterface {
    "displayEffectType": number,
    "icon": string,
    "progressTotal": number,
    "stepName": string
}

export interface DestinyProgressionDefinitionInterface {
    "blacklisted": boolean,
    "color": {
        "alpha": number,
        "blue": number,
        "green": number,
        "red": number
    },
    "displayProperties": {
        "description": string,
        "displayUnitsName": string,
        "hasIcon": boolean,
        "icon": string,
        "name": string,
    },
    "hash": number,
    "rankIcon": string,
    "redacted": boolean,
    "scope": 0,
    "steps": [ ProgressionStepInterface ],
    "storageMappingIndex": number,
    "visible": boolean
}
