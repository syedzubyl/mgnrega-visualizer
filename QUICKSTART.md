# Quick Start Guide

Get up and running with the Tamil Nadu MGNREGA Visualizer in 5 minutes!

## ⚡ Quick Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/mgnrega-visualizer.git
cd mgnrega-visualizer
npm install
```

### 2. Generate Data (Optional)

```bash
node scripts/generate-dataset.js
```

This creates comprehensive data for all 38 districts (2005-2025).

### 3. Run Development Server

```bash
npm run dev
```

### 4. Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You'll See

1. **Dashboard** - Main visualization page with filters
2. **Districts** - Profile of all 38 districts
3. **Insights** - Detailed analysis and trends
4. **About** - Project information

## 📊 Key Features to Try

### Filtering

- Select years: 2005, 2010, 2015, 2020, 2024
- Choose districts: Any combination of 38 districts
- Filter by gender: All, Male, or Female

### Visualizations

- **Yearly Trends** - Employment over time
- **District Performance** - Work completion rates
- **Gender Analysis** - Participation patterns
- **Wage Distribution** - Economic impact

### 2025 Snapshot

- Current year performance
- Quick statistics overview

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality

# Data Generation
node scripts/generate-dataset.js
```

## 📁 Important Files

- `app/dashboard/page.tsx` - Main dashboard
- `lib/data-utils.ts` - Data processing functions
- `scripts/generate-dataset.js` - Data generator
- `app/data/tn-jobcards.json` - Main dataset

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Data Not Loading

- Check `public/data/tn-jobcards.json` exists
- Verify JSON is valid
- Check browser console for errors

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Next Steps

1. Explore the dashboard filters
2. Check different district performances
3. Analyze gender participation trends
4. Review wage distribution over time
5. Read [README.md](README.md) for detailed documentation

## 💡 Tips

- Use filters to focus on specific data
- Hover over charts for detailed tooltips
- Export data using the data table
- Check 2025 snapshot for recent trends

## 🆘 Need Help?

- Check [README.md](README.md) for full documentation
- Review [ALGORITHMS.md](ALGORITHMS.md) for technical details
- Open an issue on GitHub for bugs/questions

Happy visualizing! 📊

