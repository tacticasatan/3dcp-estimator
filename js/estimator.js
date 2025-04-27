function calculate() {
    const beadWidth = parseFloat(document.getElementById('beadWidth').value);
    const beadHeight = parseFloat(document.getElementById('beadHeight').value);
    const linearFeet = parseFloat(document.getElementById('linearFeet').value);
    const printSpeed = parseFloat(document.getElementById('printSpeed').value);
    const uptime = parseFloat(document.getElementById('uptime').value) / 100;
    const materialCostPerYd = parseFloat(document.getElementById('materialCost').value);

    const operatorCost = parseFloat(document.getElementById('operatorCost').value) || 0;
    const machineCost = parseFloat(document.getElementById('machineCost').value) || 0;
    const contingency = parseFloat(document.getElementById('contingency').value) / 100 || 0.05;

    // Volume Calculations
    const totalInches = linearFeet * 12;
    const crossSectionArea = beadWidth * beadHeight;
    const volumeInCubicInches = crossSectionArea * totalInches;
    const cubicYards = volumeInCubicInches / 46656;
    const cubicMeters = cubicYards * 0.764555;

    const materialCost = cubicYards * materialCostPerYd;

    // Print Time
    const printTimeSeconds = totalInches / (printSpeed * uptime);
    const printTimeHours = printTimeSeconds / 3600;

    // Costs
    const laborCost = printTimeHours * operatorCost;
    const machineRunCost = printTimeHours * machineCost;

    let subtotal = materialCost + laborCost + machineRunCost;
    let totalCost = subtotal + (subtotal * contingency);

    // Waste Estimate
    const wastePercent = (1 - uptime);
    const wasteVolume = cubicYards * wastePercent;

    // Carbon Savings
    const traditionalCO2perCY = 181.44;
    const dpcCO2perCY = 291;
    const adjusted3DPCVolume = cubicYards * 0.7;

    const traditionalCO2 = cubicYards * traditionalCO2perCY;
    const dpcCO2 = adjusted3DPCVolume * dpcCO2perCY;

    const carbonSavings = traditionalCO2 - dpcCO2;

    let carbonMsg = carbonSavings > 0 
        ? `Estimated Carbon Savings: ${carbonSavings.toFixed(2)} kg CO₂`
        : `Note: Current mix design may result in higher CO₂. Optimize for sustainability.`;

    // Efficiency Score
    const speedFactor = printSpeed / 3;  // Assuming 3 in/sec is average
    const efficiencyScore = Math.min(100, (uptime * 100) * speedFactor - (wastePercent * 50));

    document.getElementById('results').innerHTML = `
        <p><strong>Total Volume:</strong> ${cubicYards.toFixed(2)} yd³ (${cubicMeters.toFixed(2)} m³)</p>
        <p><strong>Waste Estimate:</strong> ${wasteVolume.toFixed(2)} yd³ (${(wastePercent*100).toFixed(1)}% downtime)</p>
        <p><strong>Total Print Time:</strong> ${printTimeHours.toFixed(2)} hours</p>
        <p><strong>Material Cost:</strong> $${materialCost.toFixed(2)}</p>
        <p><strong>Labor Cost:</strong> $${laborCost.toFixed(2)}</p>
        <p><strong>Machine Cost:</strong> $${machineRunCost.toFixed(2)}</p>
        <p><strong>Contingency (${(contingency*100).toFixed(1)}%):</strong> $${(subtotal * contingency).toFixed(2)}</p>
        <h3>Total Estimated Cost: $${totalCost.toFixed(2)}</h3>
        <hr>
        <p>${carbonMsg}</p>
        <p><strong>Efficiency Score:</strong> ${efficiencyScore.toFixed(1)}%</p>
    `;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedOptions');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function downloadPDF() {
    alert("PDF Export coming soon! (We’ll integrate jsPDF here.)");
}


