export default class ItemHelper {
    rune_items: string[] = [
        'MAIN_ARCANESTAFF_UNDEAD',
        '2H_HALBERD_MORGANA',
        '2H_LONGBOW_UNDEAD',
        '2H_REPEATINGCROSSBOW_UNDEAD',
        'MAIN_CURSEDSTAFF_UNDEAD',
        'MAIN_RAPIER_MORGANA',
        'MAIN_FIRESTAFF_KEEPER',
        'MAIN_FROSTSTAFF_KEEPER',
        '2H_HAMMER_UNDEAD',
        'MAIN_HOLYSTAFF_MORGANA',
        'MAIN_ROCKMACE_KEEPER',
        'MAIN_NATURESTAFF_KEEPER',
        '2H_COMBATSTAFF_MORGANA',
        'MAIN_SPEAR_KEEPER',
        'MAIN_SCIMITAR_MORGANA',
        'OFF_ORB_MORGANA',
        'OFF_TOWERSHIELD_UNDEAD',
        'OFF_HORN_KEEPER',
        'HEAD_CLOTH_KEEPER',
        'HEAD_LEATHER_MORGANA',
        'HEAD_PLATE_UNDEAD',
        'ARMOR_CLOTH_KEEPER',
        'ARMOR_LEATHER_MORGANA',
        'ARMOR_PLATE_UNDEAD',
        'SHOES_CLOTH_KEEPER',
        'SHOES_LEATHER_MORGANA',
        'T4_SHOES_PLATE_UNDEAD',
    ]
    soul_items: string[] = [
        '2H_ARCANESTAFF_HELL',
        '2H_SCYTHE_HELL',
        '2H_BOW_HELL',
        '2H_DUALCROSSBOW_HELL',
        '2H_SKULLORB_HELL',
        '2H_FIRESTAFF_HELL',
        '2H_ICEGAUNTLETS_HELL',
        '2H_DUALHAMMER_HELL',
        '2H_HOLYSTAFF_HELL',
        'MAIN_MACE_HELL',
        '2H_NATURESTAFF_HELL',
        '2H_TWINSCYTHE_HELL',
        '2H_HARPOON_HELL',
        '2H_CLEAVER_HELL',
        'OFF_DEMONSKULL_HELL',
        'OFF_SHIELD_HELL',
        'OFF_JESTERCANE_HELL',
        'HEAD_CLOTH_HELL',
        'HEAD_LEATHER_HELL',
        'HEAD_PLATE_HELL',
        'ARMOR_CLOTH_HELL',
        'ARMOR_LEATHER_HELL',
        'ARMOR_PLATE_HELL',
        'SHOES_CLOTH_HELL',
        'SHOES_LEATHER_HELL',
        'SHOES_PLATE_HELL',
    ]
    relic_items: string[] = [
        '2H_ENIGMATICORB_MORGANA',
        '2H_DUALAXE_KEEPER',
        '2H_BOW_KEEPER',
        '2H_CROSSBOWLARGE_MORGANA',
        '2H_CURSEDSTAFF_MORGANA',
        '2H_DUALSICKLE_UNDEAD',
        '2H_INFERNOSTAFF_MORGANA',
        '2H_ICECRYSTAL_UNDEAD',
        '2H_RAM_KEEPER',
        '2H_HOLYSTAFF_UNDEAD',
        '2H_MACE_MORGANA',
        '2H_NATURESTAFF_KEEPER',
        '2H_ROCKSTAFF_KEEPER',
        '2H_TRIDENT_UNDEAD',
        '2H_DUALSCIMITAR_UNDEAD',
        'OFF_TOTEM_KEEPER',
        'OFF_LAMP_UNDEAD',
        'HEAD_CLOTH_MORGANA',
        'HEAD_LEATHER_UNDEAD',
        'HEAD_PLATE_KEEPER',
        'ARMOR_CLOTH_MORGANA',
        'ARMOR_LEATHER_MORGANA',
        'ARMOR_PLATE_KEEPER',
        'SHOES_CLOTH_MORGANA',
        'SHOES_LEATHER_UNDEAD',
        'SHOES_PLATE_KEEPER',
    ]
    avalon_items: string[] = [
        
    ]

    getAdditionalIP(baseType: string): number {
        if (this.relic_items.includes(baseType)) {
            return 75
        }
        if (this.soul_items.includes(baseType)) {
            return 50
        }
        if (this.rune_items.includes(baseType)) {
            return 25
        }
        return 0
    }
}