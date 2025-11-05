# Tamil Nadu MGNREGA Data Visualizer

A comprehensive web application for visualizing and analyzing MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) data across all 38 districts of Tamil Nadu. This application provides detailed insights into employment trends, wage distribution, gender participation, and district-wise performance from 2005 to 2025.

## 🎯 Purpose

This project aims to provide policymakers, researchers, and citizens with an intuitive interface to:

- **Analyze MGNREGA implementation** across Tamil Nadu's 38 districts
- **Track employment trends** over 20 years (2005-2025)
- **Compare district performance** and efficiency metrics
- **Understand gender participation** patterns
- **Visualize wage distribution** and trends
- **Generate insights** for better policy decisions

## 🛠️ Technologies & Tools

### Frontend Framework

- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Reusable component library

### Data Visualization

- **Recharts** - Composable charting library for React
- **Chart.js 4.5** - Additional charting capabilities
- **react-chartjs-2** - React wrapper for Chart.js

### Data Processing

- **Custom algorithms** for data aggregation and analysis
- **Rolling average calculations** for trend analysis
- **Statistical normalization** functions

### Development Tools

- **Node.js** - Runtime environment
- **npm/pnpm** - Package managers
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📊 Algorithms & Data Processing

### 1. **Data Filtering Algorithm**

```typescript
// Multi-dimensional filtering with AND logic
- Year filtering: Exact match or all years
- District filtering: Multiple selection support
- Gender filtering: All, Male, or Female
```

**Time Complexity:** O(n) where n = number of records  
**Space Complexity:** O(k) where k = filtered records

### 2. **Rolling Average Algorithm**

```typescript
// 3-year moving average for trend smoothing
- Sliding window technique
- Handles missing data gracefully
- Configurable window size
```

**Time Complexity:** O(n × w) where w = window size  
**Space Complexity:** O(n)

### 3. **Aggregation Algorithms**

#### Yearly Trends Aggregation

- Groups data by year
- Calculates totals: applied, worked, not_worked, wages
- Computes averages: days_worked, wage_rate
- **Time Complexity:** O(n)

#### District-wise Aggregation

- Groups data by district
- Calculates work completion rates: `(worked / applied) × 100`
- Averages days worked per district
- **Time Complexity:** O(n)

#### Gender-wise Aggregation

- Partitions data by gender
- Calculates participation percentages
- Tracks employment distribution
- **Time Complexity:** O(n)

### 4. **Statistical Calculations**

#### Normalization

```typescript
normalizePer(value, base, (per = 1000));
// Normalizes values per 1000 people
```

#### Work Completion Rate

```typescript
work_completion_rate = (worked / applied) × 100
```

#### Average Calculations

- Weighted averages for days worked
- Mean wage rates per year/district
- Participation rate calculations

### 5. **Data Generation Algorithm**

- District-specific multipliers for realistic variation
- Year-over-year growth factors (3.5% annual increase)
- Gender-specific participation patterns
- Random variation (±5%) for natural data distribution
- Wage rate progression: ₹100 (2005) → ₹280 (2025)

## 📁 Project Structure

```
mgnrega-visualizer-main/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Main dashboard page
│   ├── districts/                # District profiles page
│   ├── insights/                 # Insights page
│   ├── about/                    # About page
│   ├── data/                     # JSON data files
│   │   ├── tn-jobcards.json      # Main dataset (2005-2025)
│   │   └── tn-jobcards-2025.json # 2025 snapshot
│   └── layout.tsx                # Root layout
├── components/
│   ├── charts/                   # Chart components
│   │   ├── detailed-yearly-trend.tsx
│   │   ├── district-performance-analysis.tsx
│   │   ├── gender-detailed-analysis.tsx
│   │   └── ...
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard-filters.tsx     # Filter controls
│   └── data-table.tsx            # Data table component
├── lib/
│   ├── data-utils.ts              # Data processing functions
│   ├── tn-districts.ts           # District metadata
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Utility functions
├── scripts/
│   └── generate-dataset.js       # Dataset generation script
├── public/
│   └── data/                     # Public data files
└── styles/
    └── globals.css               # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **pnpm**)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mgnrega-visualizer.git
   cd mgnrega-visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Generate dataset** (if needed)
   ```bash
   node scripts/generate-dataset.js
   ```
   This generates comprehensive data for all 38 districts and 21 years (2005-2025).

### Running the Application

#### Development Mode

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

#### Build for Static Export

```bash
npm run build
# Output will be in .next directory
```

## 📊 Data Format

### Job Card Data Structure

```typescript
interface JobCardData {
  year: number; // 2005-2025
  state: string; // "Tamil Nadu"
  district: string; // District name
  gender: "Male" | "Female"; // Gender
  applied: number; // Job applications
  worked: number; // Employment provided
  not_worked: number; // Applications not worked
  days_worked: number; // Average days worked (60-100)
  wage_rate: number; // Daily wage rate (₹)
  total_wages: number; // Total wages distributed
}
```

### Dataset Coverage

- **Districts:** 38 (all districts of Tamil Nadu)
- **Years:** 21 (2005-2025)
- **Genders:** 2 (Male, Female)
- **Total Records:** 1,596 (38 × 21 × 2)

## 🎨 Features

### 1. **Interactive Dashboard**

- Real-time filtering by year, district, and gender
- Summary statistics cards
- Multiple visualization types

### 2. **Yearly Trends Analysis**

- Employment trends over time
- Wage distribution analysis
- Line and bar chart options
- 3-year rolling averages

### 3. **District Performance**

- Work completion rates by district
- Efficiency vs scale analysis (scatter plot)
- Top performers ranking
- District-wise comparisons

### 4. **Gender Analysis**

- Gender-wise participation pie chart
- Work completion rates by gender
- Participation statistics

### 5. **2025 Snapshot**

- Current year performance overview
- Quick statistics for 2025
- Recent trends analysis

### 6. **Data Table**

- Sortable and filterable data table
- Export capabilities
- Detailed record view

## 📈 Visualization Types

1. **Bar Charts** - District comparisons, yearly trends
2. **Line Charts** - Trend analysis over time
3. **Pie Charts** - Gender distribution
4. **Scatter Plots** - Efficiency vs scale analysis
5. **Composed Charts** - Multiple metrics in one view

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality.

### Customization

- **District Data:** Edit `lib/tn-districts.ts`
- **Data Generation:** Modify `scripts/generate-dataset.js`
- **Styling:** Update `tailwind.config.ts`
- **Data Source:** Replace JSON files in `app/data/` or `public/data/`

## 📝 Scripts

### Generate Dataset

```bash
node scripts/generate-dataset.js
```

Generates comprehensive dataset for all districts and years.

### Build

```bash
npm run build
```

Creates optimized production build.

### Lint

```bash
npm run lint
```

Runs ESLint to check code quality.

## 🧪 Testing

Currently, the project focuses on data visualization. For testing:

1. Manually verify data loading
2. Test filters and interactions
3. Validate chart rendering
4. Check responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex algorithms
- Maintain code consistency
- Test changes thoroughly

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Tamil Nadu Government for MGNREGA data
- shadcn/ui for component library
- Recharts team for excellent charting library
- Next.js team for the amazing framework

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MGNREGA Official Website](https://nrega.nic.in/)

---

**Built with ❤️ for Tamil Nadu's rural development**
