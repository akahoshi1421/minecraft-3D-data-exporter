const blockDict = {
  ignoreBlocks: [
    "air",
    "rail",
    "golden_rail",
    "detector_rail",
    "activator_rail",
    "unpowered_repeater",
    "powered_repeater",
    "unpowered_comparator",
    "powered_comparator",
    "redstone_wire",
    "lever",
    "tripwire_hook",
    "standing_sign",
    "redstone_torch",
    "torch",
    "soul_torch",
    "tallgrass",
    "double_plant",
    "nether_sprouts",
    "crimson_roots",
    "yellow_flower",
    "red_flower",
    "pitcher_plant",
    "pink_retals",
    "wither_rose",
    "torchflower",
    "vine",
    "weeping_vines",
    "twisting_vines",
    "seagrass",
    "kelp",
    "waterlily",
    "deadbush",
    "bamboo_sapling",
    "bamboo",
    "pointed_dripstone",
    "hanging_roots",
    "big_dripleaf",
    "small_dripleaf",
    "spore_blossom",
    "azalea",
    "flowering_azalea",
    "glow_lichen",
    "amethyst_cluster",
    "large_amethyst_bud",
    "small_amethyst_bud",
    "medium_amethyst_bud",
    "brown_mushroom",
    "red_mushroom",
    "crimson_fungus",
    "warped_fungus",
    "web",
    "turtle_egg",
    "sniffer_egg",
    "frog_spawn",
    "nether_wart",
    "wheat",
    "pumpkin_stem",
    "melon_stem",
    "beetroot",
    "torchflower_crop",
    "pitcher_crop",
    "reeds",
    "fire_coral",
    "brain_coral",
    "bubble_coral",
    "tube_coral",
    "horn_coral",
    "dead_fire_coral",
    "dead_brain_coral",
    "dead_bubble_coral",
    "dead_tube_coral",
    "dead_horn_coral",
    "coral_fan",
    "coral_fan_dead",
    "sapling",
    "mangrove_propaqule",
    "cherry_sapling",
    "frame",
    "glow_frame",
    "candle",
    "white_candle",
    "orange_candle",
    "magenta_candle",
    "light_blue_candle",
    "yellow_candle",
    "lime_candle",
    "pink_candle",
    "gray_candle",
    "light_gray_candle",
    "cyan_candle",
    "purple_candle",
    "blue_candle",
    "brown_candle",
    "green_candle",
    "red_candle",
    "black_candle",
    "sea_pickle",
  ],
  halfBlocks: [
    "stone_block_slab",
    "stone_block_slab2",
    "stone_block_slab3",
    "stone_block_slab4",
    "wooden_slab",
  ],
  stairBlocks: [
    "normal_stone_stairs",
    "stone_stairs",
    "mossy_cobblestone_stairs",
    "oak_stairs",
    "spruce_stairs",
    "birch_stairs",
    "jungle_stairs",
    "acacia_stairs",
    "dark_oak_stairs",
    "mangrove_stairs",
    "cherry_stairs",
    "bamboo_stairs",
    "bamboo_mosaic_stairs",
    "stone_brick_stairs",
    "mossy_stone_brick_stairs",
    "sandstone_stairs",
    "smooth_sandstone_stairs",
    "red_sandstone_stairs",
    "smooth_red_sandstone_stairs",
    "granite_stairs",
    "polished_granite_stairs",
    "diorite_stairs",
    "polished_diorite_stairs",
    "andesite_stairs",
    "polished_andesite_stairs",
    "brick_stairs",
    "nether_brick_stairs",
    "red_nether_brick_stairs",
    "end_brick_stairs",
    "quartz_stairs",
    "smooth_quartz_stairs",
    "purpur_stairs",
    "prismarine_stairs",
    "dark_prismarine_stairs",
    "prismarine_bricks_stairs",
    "crimson_stairs",
    "warped_stairs",
    "blackstone_stairs",
    "polished_blackstone_stairs",
    "polished_blackstone_brick_stairs",
    "cut_copper_stairs",
    "exposed_cut_copper_stairs",
    "weathered_cut_copper_stairs",
    "oxidized_cut_copper_stairs",
    "waxed_cut_copper_stairs",
    "waxed_exposed_cut_copper_stairs",
    "waxed_weathered_cut_copper_stairs",
    "waxed_oxidized_cut_copper_stairs",
    "cobbled_deepslate_stairs",
    "deepslate_tile_stairs",
    "polished_deepslate_stairs",
    "deepslate_brick_stairs",
    "mud_brick_stairs",
  ],
  carpetBlocks: [
    "white_carpet",
    "light_gray_carpet",
    "gray_carpet",
    "black_carpet",
    "brown_carpet",
    "red_carpet",
    "orange_carpet",
    "yellow_carpet",
    "lime_carpet",
    "green_carpet",
    "cyan_carpet",
    "light_blue_carpet",
    "blue_carpet",
    "purple_carpet",
    "magenta_carpet",
    "pink_carpet",
    "moss_carpet",
  ],
  woodFence: [
    "oak_fence",
    "spruce_fence",
    "birch_fence",
    "jungle_fence",
    "acacia_fence",
    "dark_oak_fence",
    "mangrove_fence",
    "cherry_fence",
    "bamboo_fence",
    "nether_brick_fence",
    "crimson_fence",
    "warped_fence",
  ],
  glassIronFence: [
    "glass_pane",
    "white_stained_glass_pane",
    "light_gray_stained_glass_pane",
    "gray_stained_glass_pane",
    "black_stained_glass_pane",
    "brown_stained_glass_pane",
    "red_stained_glass_pane",
    "orange_stained_glass_pane",
    "yellow_stained_glass_pane",
    "lime_stained_glass_pane",
    "green_stained_glass_pane",
    "cyan_stained_glass_pane",
    "light_blue_stained_glass_pane",
    "blue_stained_glass_pane",
    "purple_stained_glass_pane",
    "magenta_stained_glass_pane",
    "pink_stained_glass_pane",
    "iron_bars",
  ],
  stoneFence: [
    "cobblestone_wall",
    "blackstone_wall",
    "polished_blackstone_wall",
    "polished_blackstone_brick_wall",
    "cobbled_deepslate_wall",
    "deepslate_tile_wall",
    "polished_deepslate_wall",
    "deepslate_brick_wall",
    "mud_brick_wall",
  ],
  pressurePlate: [
    "wooden_pressure_plate",
    "spruce_pressure_plate",
    "birch_pressure_plate",
    "jungle_pressure_plate",
    "acacia_pressure_plate",
    "dark_oak_pressure_plate",
    "mangrove_pressure_plate",
    "cherry_pressure_plate",
    "bamboo_pressure_plate",
    "crimson_pressure_plate",
    "warped_pressure_plate",
    "stone_pressure_plate",
    "light_weighted_pressure_plate",
    "heavy_weighted_pressure_plate",
    "polished_blackstone_pressure_plate",
  ],
  button: [
    "wooden_button",
    "spruce_button",
    "birch_button",
    "jungle_button",
    "acacia_button",
    "dark_oak_button",
    "mangrove_button",
    "cherry_button",
    "bamboo_button",
    "stone_button",
    "crimson_button",
    "warped_button",
    "polished_blackstone_button",
  ],
  fencegate: [
    "fence_gate",
    "spruce_fence_gate",
    "birch_fence_gate",
    "jungle_fence_gate",
    "acacia_fence_gate",
    "dark_oak_fence_gate",
    "mangrove_fence_gate",
    "cherry_fence_gate",
    "bamboo_fence_gate",
    "crimson_fence_gate",
    "warped_fence_gate",
  ],
  trapDoor: [
    "trapdoor",
    "spruce_trapdoor",
    "birch_trapdoor",
    "jungle_trapdoor",
    "acacia_trapdoor",
    "dark_oak_trapdoor",
    "mangrove_trapdoor",
    "cherry_trapdoor",
    "bamboo_trapdoor",
    "iron_trapdoor",
    "crimson_trapdoor",
    "warped_trapdoor",
  ],
  door: [
    "wooden_door",
    "spruce_door",
    "birch_door",
    "jungle_door",
    "acacia_door",
    "dark_oak_door",
    "mangrove_door",
    "cherry_door",
    "bamboo_door",
    "iron_door",
    "crimson_door",
    "warped_door",
  ],
};

export { blockDict };
