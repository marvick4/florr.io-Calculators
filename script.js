function calculate() {
  const petal = document.getElementById("petal").value.toLowerCase();
  const amount = parseInt(document.getElementById("amount").value);

  const healingPerPetal = {
    dahlia: 3,
    tulip: 2.5,
    rose: 4,
    // Add more as needed
  };

  if (!healingPerPetal[petal]) {
    document.getElementById("output").textContent = "Unknown petal.";
    return;
  }

  const healing = healingPerPetal[petal] * amount;
  document.getElementById("output").textContent = `Total Healing per Second: ${healing}`;
}
