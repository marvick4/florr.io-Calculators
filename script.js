function calculate() {
  const petal = document.getElementById("petal").value;
  const rarity = document.getElementById("rarity").value;
  const amount = parseInt(document.getElementById("amount").value);
  const basilPercent = parseFloat(document.getElementById("basil").value);
  const talentLevel = parseInt(document.getElementById("talent").value);
  const duplicator = document.getElementById("duplicator").checked;

  const baseHealing = {
    dahlia: 3,
    tulip: 2.5,
    rose: 4,
  };

  const rarityMultipliers = {
    common: 1,
    uncommon: 1.25,
    rare: 1.5,
    epic: 1.75,
    legendary: 2,
  };

  if (!(petal in baseHealing)) {
    document.getElementById("output").textContent = "Unknown petal.";
    return;
  }

  // Step 1: Base healing
  let healing = baseHealing[petal];

  // Step 2: Apply rarity multiplier
  healing *= rarityMultipliers[rarity];

  // Step 3: Apply duplicator (only Dahlia)
  if (duplicator && petal === "dahlia") {
    healing *= 4 / 3;
  }

  // Step 4: Apply basil
  healing *= 1 + basilPercent / 100;

  // Step 5: Apply talent
  healing *= 1 + (talentLevel * 0.10);

  // Step 6: Multiply by amount
  const totalHealing = healing * amount;

  document.getElementById("output").textContent = 
    `Total Healing per Second: ${totalHealing.toFixed(2)}`;
}
