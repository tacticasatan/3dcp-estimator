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

    // Calculate volume in cubic inches
    const totalInches = linearFeet * 12;
    const crossSectionArea = beadWidth * beadHeight;
    const volumeInCubicInches = crossSectionArea * totalInches;

    // Convert to cubic yards
    const cubicYards = volumeInCubicInches / 46656;  // 1 yd³ = 46,656 in³
    const cubicMeters = cubicYards * 0.764555;

    const materialCost = cubicYards * materialCostPerYd;

    // Calculate print time
    const printTimeSeconds = totalInches / (printSpeed * uptime);
    const printTimeHours = printTimeSeconds / 3600;

    const laborCost = printTimeHours * operatorCost;
    const machineRunCost = printTimeHours * machineCost;

    let subtotal = materialCost + laborCost + machineRunCost;
    let totalCost = subtotal + (subtotal * contingency);

    document.getElementById('results').innerHTML = `
        <p><strong>Total Volume:</strong> ${cubicYards.toFixed(2)} yd³ (${cubicMeters.toFixed(2)} m³)</p>
        <p><strong>Total Print Time:</strong> ${printTimeHours.toFixed(2)} hours</p>
        <p><strong>Material Cost:</strong> $${materialCost.toFixed(2)}</p>
        <p><strong>Labor Cost:</strong> $${laborCost.toFixed(2)}</p>
        <p><strong>Machine Cost:</strong> $${machineRunCost.toFixed(2)}</p>
        <p><strong>Contingency (${(contingency*100).toFixed(1)}%):</strong> $${(subtotal * contingency).toFixed(2)}</p>
        <h3>Total Estimated Cost: $${totalCost.toFixed(2)}</h3>
    `;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedOptions');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function downloadPDF() {
    alert("PDF Export coming soon! (We’ll integrate jsPDF here.)");
}

