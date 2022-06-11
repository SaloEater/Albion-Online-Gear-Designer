export default class IPHelper {
    getIP(tier: number, enchantment: number) {
        return (tier + 3) * 100 + enchantment * 100
    }

    getTierMasteryModifier(tier: number): number {
        tier = tier < 4 ? 0 : (tier - 4)
        return 1 + tier * 0.05
    }
}