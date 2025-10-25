private _calculateEnhancedEstimates({
  modelData,
  printer,
  material,
  infillPercent,
  scale,
}: {
  modelData: ModelProperties;
  printer: IPrinter;
  material: Material;
  infillPercent: number;
  scale: number;
}): Omit<EstimateResult, 'formattedTime'> {

  const specs = printer.specifications || {};

  // Core specs with safe defaults
  const nozzleDiameter = specs.nozzleDiameter_mm ?? 0.4;
  const layerHeight = specs.defaultLayerHeight_mm ?? 0.2;
  const maxSpeed = specs.maxPrintSpeed_mm_s ?? 60;
  const heatingTime_min = printer.heatingTime_min ?? 5;
  const power = printer.powerConsumption_watts ?? 120;

  // Scale model volume
  const scaledVolume_mm3 = modelData.volume_mm3 * Math.pow(scale, 3);

  // Material volume with simple infill calculation
  const shellRatio = Math.min(0.4, (0.8 * 6) / Math.cbrt(scaledVolume_mm3));
  const materialVolume_mm3 =
    scaledVolume_mm3 * (shellRatio + (1 - shellRatio) * (infillPercent / 100));

  // Weight (grams)
  const weight_g = materialVolume_mm3 * (material.density / 1000);

  // Extrusion length (for FDM)
  const extrusionLength_mm = materialVolume_mm3 / (nozzleDiameter * layerHeight);

  // Effective speed factor (complexity)
  const complexityFactor = Math.max(0.6, Math.min(1.0, 1000 / modelData.triangleCount));
  const effectiveSpeed_mm_s = maxSpeed * complexityFactor * 0.7;

  // Print time (seconds)
  const printTime_s = extrusionLength_mm / effectiveSpeed_mm_s;

  // Total time including heating & buffer
  const totalTime_s = printTime_s + heatingTime_min * 60 + Math.min(600, printTime_s * 0.1);

  const totalTime_hr = totalTime_s / 3600;

  // Cost calculation (material + energy + rough operational)
  const materialCost_gbp = (weight_g / 1000) * material.cost_gbp_per_kg;
  const energyCost_gbp = (power / 1000) * totalTime_hr * 0.3; // rough average
  const operationalCost_gbp = totalTime_hr * 1; // rough operational cost

  return {
    weight_g,
    totalTime_s,
    layers: Math.ceil((modelData.dimensions.z * scale) / layerHeight),
    costs: {
      material: materialCost_gbp,
      energy: energyCost_gbp,
      operational: operationalCost_gbp,
      total: materialCost_gbp + energyCost_gbp + operationalCost_gbp,
    },
  };
}
