export const DND_CLASSES = [
  {name: "Artificer", value: "artificer"},
  {name: "Bard", value: "bard"},
  {name: "Cleric", value: "cleric"},
  {name: "Druid", value: "druid"},
  {name: "Fighter(Eldritch Knight)", value: "fighter"},
  {name: "Paladin", value: "paladin"},
  {name: "Ranger", value: "ranger"},
  {name: "Rogue(Arcane Trickster)", value: "rogue"},
  {name: "Sorcerer", value: "sorcerer"},
  {name: "Warlock", value: "warlock"},
  {name: "Wizard", value: "wizard"}
] as const;

export type DnDClassValue = (typeof DND_CLASSES)[number]['value'];