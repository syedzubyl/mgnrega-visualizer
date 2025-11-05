const fs = require('fs');
const path = require('path');

// All 38 Tamil Nadu districts
const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Villupuram", "Virudhunagar"
];

// District characteristics for realistic data generation
const districtCharacteristics = {
  "Chennai": { baseMultiplier: 0.5, ruralRatio: 0.04, workRate: 0.85 },
  "Coimbatore": { baseMultiplier: 1.2, ruralRatio: 0.35, workRate: 0.88 },
  "Madurai": { baseMultiplier: 1.5, ruralRatio: 0.59, workRate: 0.90 },
  "Tiruchirappalli": { baseMultiplier: 1.3, ruralRatio: 0.59, workRate: 0.87 },
  "Salem": { baseMultiplier: 1.4, ruralRatio: 0.60, workRate: 0.89 },
  "Tirunelveli": { baseMultiplier: 1.3, ruralRatio: 0.71, workRate: 0.91 },
  "Vellore": { baseMultiplier: 1.6, ruralRatio: 0.71, workRate: 0.90 },
  "Erode": { baseMultiplier: 0.9, ruralRatio: 0.62, workRate: 0.88 },
  "Tiruppur": { baseMultiplier: 1.0, ruralRatio: 0.32, workRate: 0.87 },
  "Dindigul": { baseMultiplier: 1.0, ruralRatio: 0.74, workRate: 0.89 },
  "Thanjavur": { baseMultiplier: 1.2, ruralRatio: 0.79, workRate: 0.92 },
  "Nagapattinam": { baseMultiplier: 0.8, ruralRatio: 0.87, workRate: 0.90 },
  "Cuddalore": { baseMultiplier: 1.1, ruralRatio: 0.69, workRate: 0.88 },
  "Villupuram": { baseMultiplier: 1.5, ruralRatio: 0.81, workRate: 0.91 },
  "Kanchipuram": { baseMultiplier: 1.5, ruralRatio: 0.55, workRate: 0.86 },
  "Tiruvallur": { baseMultiplier: 1.4, ruralRatio: 0.54, workRate: 0.85 },
  "Ariyalur": { baseMultiplier: 0.9, ruralRatio: 0.85, workRate: 0.91 },
  "Chengalpattu": { baseMultiplier: 1.1, ruralRatio: 0.50, workRate: 0.87 },
  "Dharmapuri": { baseMultiplier: 1.3, ruralRatio: 0.82, workRate: 0.92 },
  "Kallakurichi": { baseMultiplier: 1.1, ruralRatio: 0.78, workRate: 0.90 },
  "Kanniyakumari": { baseMultiplier: 0.8, ruralRatio: 0.45, workRate: 0.88 },
  "Karur": { baseMultiplier: 0.9, ruralRatio: 0.65, workRate: 0.89 },
  "Krishnagiri": { baseMultiplier: 1.2, ruralRatio: 0.70, workRate: 0.90 },
  "Mayiladuthurai": { baseMultiplier: 0.9, ruralRatio: 0.80, workRate: 0.91 },
  "Namakkal": { baseMultiplier: 1.0, ruralRatio: 0.68, workRate: 0.88 },
  "Nilgiris": { baseMultiplier: 0.7, ruralRatio: 0.60, workRate: 0.87 },
  "Perambalur": { baseMultiplier: 0.8, ruralRatio: 0.86, workRate: 0.91 },
  "Pudukkottai": { baseMultiplier: 0.9, ruralRatio: 0.77, workRate: 0.90 },
  "Ramanathapuram": { baseMultiplier: 1.0, ruralRatio: 0.75, workRate: 0.89 },
  "Ranipet": { baseMultiplier: 1.0, ruralRatio: 0.70, workRate: 0.88 },
  "Sivagangai": { baseMultiplier: 0.9, ruralRatio: 0.78, workRate: 0.90 },
  "Tenkasi": { baseMultiplier: 0.9, ruralRatio: 0.75, workRate: 0.90 },
  "Theni": { baseMultiplier: 0.9, ruralRatio: 0.70, workRate: 0.89 },
  "Thoothukudi": { baseMultiplier: 1.0, ruralRatio: 0.65, workRate: 0.88 },
  "Tirupathur": { baseMultiplier: 0.9, ruralRatio: 0.72, workRate: 0.89 },
  "Tiruvannamalai": { baseMultiplier: 1.2, ruralRatio: 0.75, workRate: 0.90 },
  "Tiruvarur": { baseMultiplier: 1.0, ruralRatio: 0.82, workRate: 0.91 },
  "Virudhunagar": { baseMultiplier: 1.1, ruralRatio: 0.70, workRate: 0.89 }
};

// Generate realistic wage rates (historical progression)
function getWageRate(year) {
  // Realistic wage rate progression from 2005 to 2025
  const baseRate = 100; // 2005
  const finalRate = 280; // 2025
  const years = 21;
  const increment = (finalRate - baseRate) / (years - 1);
  return Math.round(baseRate + (year - 2005) * increment);
}

// Generate realistic data with variations
function generateData() {
  const data = [];
  const years = Array.from({ length: 21 }, (_, i) => 2005 + i);
  const genders = ["Male", "Female"];

  districts.forEach(district => {
    const char = districtCharacteristics[district] || {
      baseMultiplier: 1.0,
      ruralRatio: 0.70,
      workRate: 0.89
    };

    years.forEach(year => {
      genders.forEach(gender => {
        // Base application numbers with realistic growth over years
        const yearGrowth = 1 + (year - 2005) * 0.03; // 3% annual growth
        const baseApplied = Math.round(2000 * char.baseMultiplier * yearGrowth);
        
        // Add realistic variation (±15%)
        const variation = 0.85 + Math.random() * 0.3;
        const applied = Math.round(baseApplied * variation);
        
        // Work completion rate with slight variations
        const workRateVariation = char.workRate * (0.95 + Math.random() * 0.1);
        const worked = Math.round(applied * workRateVariation);
        const not_worked = applied - worked;
        
        // Days worked (60-100 days, with slight gender differences)
        const baseDays = gender === "Female" ? 75 : 80;
        const daysVariation = -10 + Math.random() * 20;
        const days_worked = Math.max(60, Math.min(100, Math.round(baseDays + daysVariation)));
        
        // Wage rate for this year
        const wage_rate = getWageRate(year);
        
        // Calculate total wages
        const total_wages = worked * days_worked * wage_rate;
        
        data.push({
          year,
          state: "Tamil Nadu",
          district,
          gender,
          applied,
          worked,
          not_worked,
          days_worked,
          wage_rate,
          total_wages
        });
      });
    });
  });

  return data.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    return a.gender.localeCompare(b.gender);
  });
}

// Generate 2025 specific data (more current/optimistic)
function generate2025Data() {
  const data = [];
  const genders = ["Male", "Female"];

  districts.forEach(district => {
    const char = districtCharacteristics[district] || {
      baseMultiplier: 1.0,
      ruralRatio: 0.70,
      workRate: 0.89
    };

    genders.forEach(gender => {
      // Higher base for 2025 (continued growth)
      const baseApplied = Math.round(6500 * char.baseMultiplier);
      const variation = 0.90 + Math.random() * 0.2;
      const applied = Math.round(baseApplied * variation);
      
      // Improved work rate for 2025
      const workRateVariation = (char.workRate + 0.02) * (0.97 + Math.random() * 0.06);
      const worked = Math.round(applied * workRateVariation);
      const not_worked = applied - worked;
      
      // Better days worked in 2025 (90-100 range)
      const baseDays = gender === "Female" ? 92 : 95;
      const daysVariation = -2 + Math.random() * 8;
      const days_worked = Math.max(90, Math.min(100, Math.round(baseDays + daysVariation)));
      
      const wage_rate = getWageRate(2025);
      const total_wages = worked * days_worked * wage_rate;
      
      data.push({
        year: 2025,
        state: "Tamil Nadu",
        district,
        gender,
        applied,
        worked,
        not_worked,
        days_worked,
        wage_rate,
        total_wages
      });
    });
  });

  return data.sort((a, b) => {
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    return a.gender.localeCompare(b.gender);
  });
}

// Main execution
console.log('Generating comprehensive MGNREGA dataset...');
console.log(`Districts: ${districts.length}`);
console.log(`Years: 2005-2025 (21 years)`);
console.log(`Expected records: ${districts.length * 21 * 2}`);

const mainData = generateData();
const data2025 = generate2025Data();

console.log(`Generated ${mainData.length} records for main dataset`);
console.log(`Generated ${data2025.length} records for 2025 dataset`);

// Write files
const outputDir = path.join(__dirname, '../app/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'tn-jobcards.json'),
  JSON.stringify(mainData, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(outputDir, 'tn-jobcards-2025.json'),
  JSON.stringify(data2025, null, 2),
  'utf8'
);

console.log('\n✅ Dataset generation complete!');
console.log(`📁 Main dataset: ${path.join(outputDir, 'tn-jobcards.json')}`);
console.log(`📁 2025 dataset: ${path.join(outputDir, 'tn-jobcards-2025.json')}`);
console.log(`\n📊 Summary:`);
console.log(`   - Total districts: ${districts.length}`);
console.log(`   - Years covered: 2005-2025`);
console.log(`   - Records per dataset: ${mainData.length}`);
console.log(`   - Gender split: Male & Female`);

