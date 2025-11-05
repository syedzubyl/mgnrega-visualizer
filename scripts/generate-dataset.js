// Script to generate comprehensive MGNREGA dataset for all 38 Tamil Nadu districts
// This will create data for all years from 2005 to 2025

const fs = require('fs');
const path = require('path');

// All 38 districts of Tamil Nadu
const allDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanniyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivagangai",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Villupuram",
  "Virudhunagar"
];

// District-specific multipliers for more realistic data
const districtMultipliers = {
  "Chennai": { base: 1500, days: 0.85, workRate: 0.90 },
  "Coimbatore": { base: 3200, days: 0.92, workRate: 0.89 },
  "Madurai": { base: 4500, days: 0.94, workRate: 0.87 },
  "Tiruchirappalli": { base: 3800, days: 0.91, workRate: 0.88 },
  "Salem": { base: 4200, days: 0.93, workRate: 0.86 },
  "Tirunelveli": { base: 4000, days: 0.92, workRate: 0.88 },
  "Vellore": { base: 4800, days: 0.90, workRate: 0.85 },
  "Erode": { base: 3500, days: 0.91, workRate: 0.89 },
  "Tiruppur": { base: 2800, days: 0.88, workRate: 0.90 },
  "Dindigul": { base: 3200, days: 0.90, workRate: 0.88 },
  "Thanjavur": { base: 4100, days: 0.93, workRate: 0.87 },
  "Nagapattinam": { base: 3600, days: 0.89, workRate: 0.88 },
  "Cuddalore": { base: 3900, days: 0.91, workRate: 0.87 },
  "Villupuram": { base: 4400, days: 0.92, workRate: 0.86 },
  "Kanchipuram": { base: 3800, days: 0.90, workRate: 0.88 },
  "Tiruvallur": { base: 3700, days: 0.89, workRate: 0.89 },
  "Ariyalur": { base: 2800, days: 0.88, workRate: 0.90 },
  "Chengalpattu": { base: 3100, days: 0.90, workRate: 0.89 },
  "Dharmapuri": { base: 3300, days: 0.91, workRate: 0.87 },
  "Kallakurichi": { base: 2900, days: 0.89, workRate: 0.88 },
  "Kanniyakumari": { base: 2700, days: 0.87, workRate: 0.91 },
  "Karur": { base: 2600, days: 0.88, workRate: 0.90 },
  "Krishnagiri": { base: 3400, days: 0.90, workRate: 0.88 },
  "Mayiladuthurai": { base: 2900, days: 0.89, workRate: 0.89 },
  "Namakkal": { base: 3000, days: 0.90, workRate: 0.88 },
  "Nilgiris": { base: 1800, days: 0.85, workRate: 0.92 },
  "Perambalur": { base: 2500, days: 0.88, workRate: 0.90 },
  "Pudukkottai": { base: 3100, days: 0.90, workRate: 0.88 },
  "Ramanathapuram": { base: 3200, days: 0.89, workRate: 0.87 },
  "Ranipet": { base: 2800, days: 0.88, workRate: 0.89 },
  "Sivagangai": { base: 3000, days: 0.90, workRate: 0.88 },
  "Tenkasi": { base: 2900, days: 0.89, workRate: 0.88 },
  "Theni": { base: 2700, days: 0.88, workRate: 0.90 },
  "Thoothukudi": { base: 3500, days: 0.91, workRate: 0.87 },
  "Tirupathur": { base: 2600, days: 0.88, workRate: 0.90 },
  "Tiruvannamalai": { base: 3800, days: 0.90, workRate: 0.88 },
  "Tiruvarur": { base: 3100, days: 0.90, workRate: 0.88 },
  "Virudhunagar": { base: 3400, days: 0.91, workRate: 0.87 },
};

// Generate realistic data based on district characteristics
function generateDistrictData(district, year, gender) {
  // Get district-specific base values
  const districtData = districtMultipliers[district] || { base: 3000, days: 0.90, workRate: 0.88 };
  
  // Year factor - gradual increase over years (2005-2025)
  const yearFactor = 1 + (year - 2005) * 0.035;
  
  // Gender factor - females typically have slightly higher participation
  const genderFactor = gender === 'Female' ? 1.02 : 1.0;
  
  // Calculate applied (base * year factor * gender factor with small variation)
  const variation = 0.95 + Math.random() * 0.1; // 5% variation
  const applied = Math.round(districtData.base * yearFactor * genderFactor * variation);
  
  // Wage rate increases over time (100 in 2005 to ~280 in 2025)
  const wageRate = Math.round(100 + (year - 2005) * 8.5);
  
  // Worked is based on district work rate with small variation
  const workRateVariation = districtData.workRate + (Math.random() * 0.05 - 0.025);
  const worked = Math.round(applied * Math.max(0.85, Math.min(0.95, workRateVariation)));
  const not_worked = applied - worked;
  
  // Days worked varies by district and increases over time
  const baseDays = Math.round(75 + (year - 2005) * 1.1);
  const daysVariation = Math.round((Math.random() * 12) - 6); // ±6 days variation
  const days_worked = Math.min(100, Math.max(60, Math.round(baseDays * districtData.days + daysVariation)));
  
  // Total wages calculation
  const total_wages = worked * days_worked * wageRate;
  
  return {
    year,
    state: "Tamil Nadu",
    district,
    gender,
    applied,
    worked,
    not_worked,
    days_worked,
    wage_rate: wageRate,
    total_wages
  };
}

// Generate complete dataset
function generateCompleteDataset() {
  const years = [];
  for (let year = 2005; year <= 2025; year++) {
    years.push(year);
  }
  
  const dataset = [];
  
  for (const year of years) {
    for (const district of allDistricts) {
      dataset.push(generateDistrictData(district, year, 'Male'));
      dataset.push(generateDistrictData(district, year, 'Female'));
    }
  }
  
  return dataset;
}

// Main execution
const dataset = generateCompleteDataset();

// Write to both app/data and public/data for compatibility
const outputPath1 = path.join(__dirname, '../app/data/tn-jobcards.json');
const outputPath2 = path.join(__dirname, '../public/data/tn-jobcards.json');
const outputDir1 = path.dirname(outputPath1);
const outputDir2 = path.dirname(outputPath2);

// Ensure directories exist
if (!fs.existsSync(outputDir1)) {
  fs.mkdirSync(outputDir1, { recursive: true });
}
if (!fs.existsSync(outputDir2)) {
  fs.mkdirSync(outputDir2, { recursive: true });
}

// Write to both locations
const jsonData = JSON.stringify(dataset, null, 2);
fs.writeFileSync(outputPath1, jsonData);
fs.writeFileSync(outputPath2, jsonData);

console.log(`Generated dataset with ${dataset.length} records`);
console.log(`Covering ${allDistricts.length} districts and ${2025 - 2005 + 1} years`);
console.log(`Saved to: ${outputPath1}`);
console.log(`Saved to: ${outputPath2}`);

// Verify all districts are present
const districtsInData = [...new Set(dataset.map(d => d.district))].sort();
const missingDistricts = allDistricts.filter(d => !districtsInData.includes(d));
if (missingDistricts.length > 0) {
  console.warn(`Warning: Missing districts: ${missingDistricts.join(', ')}`);
} else {
  console.log(`✓ All ${allDistricts.length} districts are present in the dataset`);
}

// Verify all years are present
const yearsInData = [...new Set(dataset.map(d => d.year))].sort();
const expectedYears = Array.from({length: 2025 - 2005 + 1}, (_, i) => 2005 + i);
const missingYears = expectedYears.filter(y => !yearsInData.includes(y));
if (missingYears.length > 0) {
  console.warn(`Warning: Missing years: ${missingYears.join(', ')}`);
} else {
  console.log(`✓ All ${expectedYears.length} years (2005-2025) are present in the dataset`);
}

