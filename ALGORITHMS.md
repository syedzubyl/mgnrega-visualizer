# Algorithms & Data Processing Documentation

This document provides detailed information about the algorithms and data processing techniques used in the Tamil Nadu MGNREGA Visualizer.

## 📊 Data Processing Algorithms

### 1. Multi-Dimensional Filtering

**Purpose:** Filter data based on multiple criteria (year, district, gender)

**Algorithm:**

```typescript
function filterData(data: JobCardData[], filters: FilterState): JobCardData[];
```

**Complexity:**

- Time: O(n) where n = number of records
- Space: O(k) where k = filtered results

**Implementation:**

- Uses array `filter()` with AND logic
- Each filter is independent
- Empty filter arrays mean "all values"

**Example:**

```typescript
// Filter for Chennai in 2020, all genders
filterData(data, {
  years: [2020],
  districts: ["Chennai"],
  gender: "All",
});
```

---

### 2. Rolling Average (Moving Average)

**Purpose:** Smooth out trends using a sliding window

**Algorithm:**

```typescript
function addRollingAverage(arr: any[], key: string, window: number = 3);
```

**Complexity:**

- Time: O(n × w) where w = window size
- Space: O(n)

**How it works:**

1. For each data point, calculate average of previous `window` points
2. Handles edge cases (beginning of array)
3. Filters out invalid values (NaN, null)

**Example:**

```typescript
// Calculate 3-year rolling average for wage rates
[2005: 100, 2006: 110, 2007: 120, 2008: 130]
// Rolling averages: [100, 105, 110, 120]
// Year 2007: (100 + 110 + 120) / 3 = 110
```

**Use Cases:**

- Wage rate trends
- Employment trend smoothing
- Identifying patterns in noisy data

---

### 3. Aggregation Algorithms

#### 3.1 Yearly Trends Aggregation

**Purpose:** Group and aggregate data by year

**Algorithm:**

```typescript
function getYearlyTrends(data: JobCardData[]);
```

**Steps:**

1. **Group by year** using `reduce()`
2. **Sum totals:** applied, worked, not_worked, total_wages
3. **Calculate averages:** days_worked, wage_rate
4. **Sort chronologically**
5. **Add rolling averages**

**Complexity:**

- Time: O(n)
- Space: O(y) where y = number of years

**Output:**

```typescript
{
  year: 2020,
  applied: 150000,
  worked: 135000,
  not_worked: 15000,
  total_wages: 4050000000,
  avg_days_worked: 85,
  avg_wage_rate: 250,
  rollingAvg_avg_wage_rate: 248
}
```

#### 3.2 District-wise Aggregation

**Purpose:** Calculate district performance metrics

**Algorithm:**

```typescript
function getDistrictWiseData(data: JobCardData[]);
```

**Metrics Calculated:**

- Total applications per district
- Total employment provided
- **Work Completion Rate:** `(worked / applied) × 100`
- Average days worked
- Total wages distributed

**Complexity:**

- Time: O(n)
- Space: O(d) where d = number of districts

**Key Formula:**

```typescript
work_completion_rate = (worked / applied) × 100
```

#### 3.3 Gender-wise Aggregation

**Purpose:** Analyze gender participation patterns

**Algorithm:**

```typescript
function getGenderWiseData(data: JobCardData[]);
```

**Metrics:**

- Total applications by gender
- Employment provided by gender
- Average days worked by gender
- Participation percentages

**Complexity:**

- Time: O(n)
- Space: O(2) = O(1) (only 2 genders)

---

### 4. Statistical Calculations

#### 4.1 Normalization

**Purpose:** Normalize values per population base

**Algorithm:**

```typescript
function normalizePer(value: number, base: number, per: number = 1000);
```

**Formula:**

```
normalized_value = (value / base) × per
```

**Example:**

```typescript
// 50,000 applications for 1,000,000 population
normalizePer(50000, 1000000, 1000);
// Result: 50 applications per 1000 people
```

#### 4.2 Work Completion Rate

**Purpose:** Calculate percentage of applications that received work

**Formula:**

```typescript
completion_rate = (worked / applied) × 100
```

**Range:** 0-100%

**Use Cases:**

- District performance ranking
- Year-over-year comparisons
- Efficiency analysis

#### 4.3 Average Calculations

**Weighted Average:**

```typescript
avg_days_worked = sum(days_worked × records) / total_records
```

**Mean Calculation:**

```typescript
avg_wage_rate = sum(wage_rate) / count;
```

---

### 5. Data Generation Algorithm

**Purpose:** Generate realistic synthetic data for all districts and years

**File:** `scripts/generate-dataset.js`

#### Algorithm Steps:

1. **District-specific Base Values**

   ```javascript
   districtMultiplier = {
     base: 3000, // Base applications
     days: 0.9, // Days worked multiplier
     workRate: 0.88, // Work completion rate
   };
   ```

2. **Year Factor Calculation**

   ```javascript
   yearFactor = 1 + (year - 2005) × 0.035
   // 3.5% annual growth rate
   ```

3. **Gender Factor**

   ```javascript
   genderFactor = gender === "Female" ? 1.02 : 1.0;
   // Females have 2% higher participation
   ```

4. **Random Variation**

   ```javascript
   variation = 0.95 + Math.random() × 0.1
   // ±5% natural variation
   ```

5. **Wage Rate Progression**

   ```javascript
   wageRate = 100 + (year - 2005) × 8.5
   // Linear increase from ₹100 to ₹280
   ```

6. **Work Completion**

   ```javascript
   workRateVariation = baseRate + (random() × 0.05 - 0.025)
   worked = applied × workRateVariation
   ```

7. **Days Worked Calculation**

   ```javascript
   baseDays = 75 + (year - 2005) × 1.1
   daysVariation = random(-6, +6)
   days_worked = min(100, max(60, baseDays × multiplier + variation))
   ```

8. **Total Wages**
   ```javascript
   total_wages = worked × days_worked × wage_rate
   ```

**Complexity:**

- Time: O(d × y × g) where d=districts, y=years, g=genders
- Space: O(d × y × g)

---

## 🔄 Data Flow

```
Raw JSON Data
    ↓
Filter Data (multi-dimensional)
    ↓
Aggregate by Dimension
    ├─→ Yearly Trends
    ├─→ District-wise
    └─→ Gender-wise
    ↓
Calculate Metrics
    ├─→ Completion Rates
    ├─→ Averages
    └─→ Totals
    ↓
Add Rolling Averages
    ↓
Format for Visualization
    ↓
Render Charts
```

---

## 📈 Performance Optimizations

### 1. Memoization

- Consider memoizing expensive calculations
- React.useMemo for derived data
- Cache aggregation results

### 2. Lazy Loading

- Load data on demand
- Paginate large datasets
- Virtual scrolling for tables

### 3. Data Structure Choices

- Use Maps for O(1) lookups
- Arrays for ordered data
- Objects for key-value pairs

---

## 🧮 Mathematical Formulas

### Efficiency Score

```typescript
efficiency_score = (work_completion_rate + (avg_days_worked / 100) × 100) / 2
```

### Participation Rate

```typescript
participation_rate = (gender_worked / total_worked) × 100
```

### Average Days per Beneficiary

```typescript
avg_days_per_beneficiary = total_days / total_beneficiaries;
```

### Wage Per Person

```typescript
wage_per_person = total_wages / total_beneficiaries;
```

---

## 🔍 Data Validation

### Missing Data Detection

```typescript
function isMissing(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "number" && isNaN(value))
  );
}
```

### Data Integrity Checks

- Verify all districts present
- Check all years covered
- Validate gender distribution
- Ensure wage calculations correct

---

## 📊 Visualization Algorithms

### Chart Data Transformation

1. **Aggregate** raw data
2. **Transform** to chart format
3. **Sort** by relevant dimension
4. **Limit** to top N items (if needed)
5. **Format** for display

### Scatter Plot Data

- X-axis: Independent variable (applications)
- Y-axis: Dependent variable (completion rate)
- Each point: District with coordinates

---

## 🎯 Best Practices

1. **Handle Edge Cases**

   - Empty datasets
   - Missing values
   - Division by zero
   - Invalid inputs

2. **Optimize Performance**

   - Use efficient data structures
   - Minimize iterations
   - Cache results when possible

3. **Maintain Accuracy**

   - Use appropriate precision
   - Round appropriately
   - Validate calculations

4. **Document Complex Logic**
   - Explain algorithms
   - Add comments
   - Provide examples

---

## 📚 References

- [Array Methods Performance](https://jsperf.com/)
- [Time Complexity Guide](https://www.bigocheatsheet.com/)
- [Statistical Methods](https://en.wikipedia.org/wiki/Statistical_analysis)

