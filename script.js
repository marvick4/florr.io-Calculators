const petalData = {
  Ultra: {
    Basil: { type: "Multiplier", heal: 0, duplicator: 1, basil: 0.5 },
    Dahlia: { type: "Normal", heal: 686.086957, duplicator: 1.3333, basil: 0 },
    Leaf: { type: "Normal", heal: 420.9, duplicator: 1, basil: 0 },
    Rose: { type: "Normal", heal: 969.69697, duplicator: 1, basil: 0 },
    Starfish: { type: "Normal", heal: 947, duplicator: 1, basil: 0 },
    Yucca: { type: "Normal", heal: 947, duplicator: 1, basil: 0 },
    Fangs: { type: "Normal", heal: 1223.22222, duplicator: 1, basil: 0 }
  },
  Super: {
    Basil: { type: "Multiplier", heal: 0, duplicator: 1, basil: 0.55 },
    Dahlia: { type: "Normal", heal: 1188.337468, duplicator: 1.3333, basil: 0 },
    Leaf: { type: "Normal", heal: 727.4613392, duplicator: 1, basil: 0 },
    Rose: { type: "Normal", heal: 1679.56442, duplicator: 1, basil: 0 },
    Starfish: { type: "Normal", heal: 1640.252115, duplicator: 1, basil: 0 },
    Yucca: { type: "Normal", heal: 1640.252115, duplicator: 1, basil: 0 },
    Fangs: { type: "Normal", heal: 0, duplicator: 1, basil: 0 }
  },
  Mythic: {
    Basil: { type: "Multiplier", heal: 0, duplicator: 1, basil: 0.45 },
    Dahlia: { type: "Normal", heal: 396.1124893, duplicator: 1.3333, basil: 0 },
    Leaf: { type: "Normal", heal: 243.0067283, duplicator: 1, basil: 0 },
    Rose: { type: "Normal", heal: 559.8548067, duplicator: 1, basil: 0 },
    Starfish: { type: "Normal", heal: 546.7507049, duplicator: 1, basil: 0 },
    Yucca: { type: "Normal", heal: 546.7507049, duplicator: 1, basil: 0 },
    Fangs: { type: "Normal", heal: 700, duplicator: 1, basil: 0 }
  },
  SuperSpecial: {
    Bulb: { type: "Normal", heal: 1212024, duplicator: 500, basil: 0 }
  }
};

const petalList = [];

function updatePetalDropdown() {
  const rarity = document.getElementById("rarity").value;
  const petalSelect = document.getElementById("petal");
  petalSelect.innerHTML = "";

  const petals = Object.keys(petalData[rarity]);
  petals.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    petalSelect.appendChild(option);
  });
}

document.getElementById("rarity").addEventListener("change", updatePetalDropdown);
updatePetalDropdown(); // load initial options

function addPetal() {
  const rarity = document.getElementById("rarity").value;
  const name = document.getElementById("petal").value;
  const amount = parseInt(document.getElementById("amount").value);

  petalList.push({ rarity, name, amount });

  const li = document.createElement("li");
  li.textContent = `${amount}x ${rarity} ${name}`;
  document.getElementById("petalList").appendChild(li);
}

function calculate() {
  const duplicator = document.getElementById("duplicator").checked;
  const talent = parseInt(document.getElementById("talent").value);

  let totalHeal = 0;
  let basilBonus = 0;

  for (const { rarity, name, amount } of petalList) {
    const data = petalData[rarity]?.[name];
    if (!data) continue;

    if (data.type === "Multiplier") {
      basilBonus += data.basil * amount;
    } else {
      let heal = data.heal * amount;
      heal *= duplicator ? data.duplicator : 1;
      totalHeal += heal;
    }
  }

  totalHeal *= (1 + basilBonus);
  totalHeal *= (1 + talent * 0.10);

  document.getElementById("result").textContent =
    `Total Heal Per Second: ${totalHeal.toFixed(2)}`;
}
