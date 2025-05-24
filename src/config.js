// Configuración de rutas y opciones disponibles
const CONFIG = {
    modelPaths: {
        races: {
            human: {
                basePath: './models/races/human/human_base.ply',
                variations: ['normal', 'muscular', 'thin']
            },
            elf: {
                basePath: './models/races/elf/elf_base.ply',
                variations: ['normal', 'tall', 'slender']
            },
            orc: {
                basePath: './models/races/orc/orc_base.ply',
                variations: ['normal', 'bulky', 'scarred']
            },
            undead: {
                basePath: './models/races/undead/undead_base.ply',
                variations: ['normal', 'skeletal', 'decayed']
            }
        },
        classes: {
            warrior: {
                basePath: './models/classes/warrior/',
                items: ['warrior_stance.ply', 'warrior_armor_slot.ply']
            },
            mage: {
                basePath: './models/classes/mage/',
                items: ['mage_stance.ply', 'mage_robe_slot.ply']
            },
            archer: {
                basePath: './models/classes/archer/',
                items: ['archer_stance.ply', 'archer_armor_slot.ply']
            }
        },
        items: {
            weapons: {
                warrior: ['sword.ply', 'axe.ply', 'mace.ply', 'shield.ply'],
                mage: ['staff.ply', 'wand.ply', 'orb.ply', 'book.ply'],
                archer: ['bow.ply', 'crossbow.ply', 'quiver.ply', 'dagger.ply']
            },
            armor: {
                warrior: ['plate_armor.ply', 'chainmail.ply', 'leather_armor.ply'],
                mage: ['cloth_robe.ply', 'enchanted_cloak.ply', 'arcane_vest.ply'],
                archer: ['leather_jerkin.ply', 'ranger_cloak.ply', 'scout_armor.ply']
            },
            accessories: {
                human: ['belt.ply', 'necklace.ply', 'bracers.ply'],
                elf: ['crown.ply', 'earrings.ply', 'pendant.ply'],
                orc: ['tusk_rings.ply', 'war_paint.ply', 'bone_necklace.ply'],
                undead: ['chains.ply', 'bandages.ply', 'burial_shroud.ply']
            }
        }
    },
    // Configuraciones de renderizado
    renderer: {
        clearColor: 0x16213e,
        pixelRatio: window.devicePixelRatio || 1,
        antialias: true
    },
    // Configuraciones de la cámara
    camera: {
        fov: 45,
        near: 0.1,
        far: 1000,
        position: { x: 0, y: 1, z: 5 }
    },
    // Configuraciones de luz
    lights: {
        ambient: {
            color: 0xffffff,
            intensity: 0.5
        },
        directional: {
            color: 0xffffff,
            intensity: 0.8,
            position: { x: 1, y: 1, z: 1 }
        },
        point: {
            color: 0xe94560,
            intensity: 1,
            position: { x: 2, y: 3, z: 4 },
            distance: 10
        }
    }
};
