export default function systemString(system: String) {
  switch (system) {
    case "gb":
      return "Game Boy / Game Boy Color";
    case "gba":
      return "Game Boy Advance";
    case "nes":
      return "Nintendo Entertainment System";
    case "snes":
      return "Super Nintendo Entertainment System";
    case "n64":
      return "Nintendo 64";
    case "psx":
      return "PlayStation";
    case "sega32x":
      return "Sega 32x";
    case "segaCD":
      return "Sega CD";
    case "segaGG":
      return "Sega Game Gear";
    case "segaMS":
      return "Sega Master System";
    case "segaMD":
      return "Sega Mega Drive";
    case "segaSaturn":
      return "Sega Saturn";
  }
}
