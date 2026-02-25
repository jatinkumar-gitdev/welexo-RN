// Chart data constants and configurations for the Welexo app

export const CHART_COLORS = {
  primary: ['#0176FF', '#3B82F6', '#60A5FA'],
  success: ['#10B981', '#34D399', '#6EE7B7'],
  warning: ['#F59E0B', '#FBBF24', '#FCD34D'],
  danger: ['#EF4444', '#F87171', '#FCA5A5'],
  purple: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
  teal: ['#14B8A6', '#2DD4BF', '#5EEAD4'],
  gradients: {
    blue: ['#0176FF', '#3B82F6'],
    green: ['#10B981', '#34D399'],
    orange: ['#F59E0B', '#FBBF24'],
    purple: ['#8B5CF6', '#A78BFA'],
    teal: ['#14B8A6', '#2DD4BF'],
  }
};

// Trade Value Trends Data (Enhanced)
export const tradeValueData = {
  labels: ['Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Feb'],
  datasets: [
    {
      data: [2.5, 3.0, 2.8, 4.2, 3.5, 4.5],
      color: (opacity = 1) => `rgba(1, 118, 255, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

// Import/Export Distribution (Pie Chart)
export const importExportData = [
  {
    name: 'Export',
    value: 65,
    color: '#F59E0B',
    legendFontColor: '#6B7280',
    legendFontSize: 14,
  },
  {
    name: 'Import',
    value: 35,
    color: '#0176FF',
    legendFontColor: '#6B7280',
    legendFontSize: 14,
  },
];

// Monthly Comparison (Bar Chart)
export const monthlyComparisonData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [45, 52, 48, 65, 58, 72],
    },
  ],
};

// Top Trading Partners (Horizontal Bar)
export const tradingPartnersData = {
  labels: ['USA', 'China', 'UAE', 'UK', 'Germany'],
  datasets: [
    {
      data: [85, 72, 68, 54, 48],
    },
  ],
};

// Category Distribution (Donut Chart)
export const categoryDistributionData = [
  {
    name: 'Electronics',
    value: 30,
    color: '#0176FF',
    legendFontColor: '#6B7280',
    legendFontSize: 12,
  },
  {
    name: 'Textiles',
    value: 25,
    color: '#10B981',
    legendFontColor: '#6B7280',
    legendFontSize: 12,
  },
  {
    name: 'Machinery',
    value: 20,
    color: '#F59E0B',
    legendFontColor: '#6B7280',
    legendFontSize: 12,
  },
  {
    name: 'Chemicals',
    value: 15,
    color: '#8B5CF6',
    legendFontColor: '#6B7280',
    legendFontSize: 12,
  },
  {
    name: 'Others',
    value: 10,
    color: '#EF4444',
    legendFontColor: '#6B7280',
    legendFontSize: 12,
  },
];

// Chart Configuration Templates
export const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(1, 118, 255, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  propsForLabels: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '500',
  },
  fillShadowGradient: 'rgba(1, 118, 255, 0.1)',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 1,
};

export const barChartConfig = {
  ...chartConfig,
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
  fillShadowGradient: 'rgba(16, 185, 129, 0.2)',
};

export const pieChartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  style: {
    borderRadius: 16,
  },
};

// Historical Trade Data (for History screen)
export const historicalTradeData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [2.1, 2.3, 2.5, 2.8, 3.0, 2.9, 3.2, 3.5, 3.3, 3.8, 4.0, 4.2],
      color: (opacity = 1) => `rgba(1, 118, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

// Stacked Bar Chart Data (Import vs Export by Month)
export const stackedBarData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  legend: ['Export', 'Import'],
  data: [
    [30, 20],
    [35, 22],
    [28, 25],
    [40, 25],
    [35, 23],
    [45, 27],
  ],
  barColors: ['#F59E0B', '#0176FF'],
};

// Recent Trades (for History screen)
export const recentTrades = [
  {
    id: 1,
    type: 'export',
    product: 'Electronic Components',
    hsCode: '8542.31',
    country: 'USA',
    value: '$125,000',
    date: '2026-02-08',
    status: 'completed',
  },
  {
    id: 2,
    type: 'import',
    product: 'Cotton Fabric',
    hsCode: '5208.12',
    country: 'China',
    value: '$85,000',
    date: '2026-02-07',
    status: 'in-transit',
  },
  {
    id: 3,
    type: 'export',
    product: 'Pharmaceutical Products',
    hsCode: '3004.90',
    country: 'UAE',
    value: '$210,000',
    date: '2026-02-06',
    status: 'completed',
  },
  {
    id: 4,
    type: 'import',
    product: 'Industrial Machinery',
    hsCode: '8479.89',
    country: 'Germany',
    value: '$450,000',
    date: '2026-02-05',
    status: 'completed',
  },
  {
    id: 5,
    type: 'export',
    product: 'Spices & Herbs',
    hsCode: '0910.99',
    country: 'UK',
    value: '$65,000',
    date: '2026-02-04',
    status: 'pending',
  },
];
