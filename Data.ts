// Data for individual months

export const DATA_JAN_2025 = {
  summary: { totalTickets: 6508, avgDuration: "19:53:52", totalTime: "4219 days, 3:48:49", completionRate: 78 },
  kpis: [
    { label: "Total Tickets", value: "6508", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "19:53:52", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "4219 days, 3:48:49", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "78%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 5070, color: "#10B981" },
      { name: "Cancelled", value: 1419, color: "#EF4444" },
      { name: "Closed", value: 19, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "4-24 hours", value: 1857, color: "#F59E0B" },
      { name: "1-4 hours", value: 1548, color: "#3B82F6" },
      { name: "Open", value: 1419, color: "#6B7280" },
      { name: "1-3 days", value: 810, color: "#EF4444" },
      { name: "< 1 hour", value: 661, color: "#10B981" },
      { name: "> 3 days", value: 213, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 4524, color: "#10B981" },
      { name: "Urgent", value: 1928, color: "#EF4444" },
      { name: "High priority", value: 49, color: "#F59E0B" },
      { name: "Medium priority", value: 7, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "6508", sla: "0%", open: "0", avgRes: "19.9 hrs" },
    secondary: { closed: "5089", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (4179), بهاء حسين عطية (1999), ايات حميد مجيد (175), غيث محمد جمعة (93), محمد عدنان نوري (1)" },
    statusData: [
      { name: "Done", value: 5070, color: "#10B981" },
      { name: "Cancelled", value: 1419, color: "#EF4444" },
      { name: "Closed", value: 19, color: "#3B82F6" }
    ],
    slaData: [
      { name: "Met", value: 7, color: "#10B981" },
      { name: "Missed", value: 5082, color: "#EF4444" }
    ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 4179 },
      { name: "بهاء حسين عطية", value: 1999 },
      { name: "ايات حميد مجيد", value: 175 },
      { name: "غيث محمد جمعة", value: 93 },
      { name: "محمد عدنان نوري", value: 1 }
    ],
    resolutionData: [
      { name: "Low priority", value: 18.7, color: "#10B981" },
      { name: "Urgent", value: 22.7, color: "#EF4444" },
      { name: "High priority", value: 20.0, color: "#F59E0B" },
      { name: "Medium priority", value: 11.4, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-01-01", value: 60 }, { name: "2025-01-05", value: 150 }, { name: "2025-01-10", value: 112 },
      { name: "2025-01-15", value: 146 }, { name: "2025-01-20", value: 171 }, { name: "2025-01-25", value: 162 },
      { name: "2025-01-31", value: 113 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 6508, fullMark: 2000 } ]
  }
};

export const DATA_FEB_2025 = {
  summary: { totalTickets: 6495, avgDuration: "1 day, 1:10:11", totalTime: "5202 days, 19:14:54", completionRate: 76 },
  kpis: [
    { label: "Total Tickets", value: "6495", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "1 day, 1:10:11", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "5202 days, 19:14:54", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "76%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 4527, color: "#10B981" },
      { name: "Cancelled", value: 1534, color: "#EF4444" },
      { name: "Closed", value: 434, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 1780, color: "#3B82F6" },
      { name: "Open", value: 1534, color: "#6B7280" },
      { name: "4-24 hours", value: 1528, color: "#F59E0B" },
      { name: "< 1 hour", value: 952, color: "#10B981" },
      { name: "1-3 days", value: 507, color: "#EF4444" },
      { name: "> 3 days", value: 194, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 4619, color: "#10B981" },
      { name: "Urgent", value: 1783, color: "#EF4444" },
      { name: "High priority", value: 85, color: "#F59E0B" },
      { name: "Medium priority", value: 8, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "6495", sla: "0%", open: "0", avgRes: "25.2 hrs" },
    secondary: { closed: "4961", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (3697), بهاء حسين عطية (2009), غيث محمد جمعة (541), ايات حميد مجيد (194)" },
    statusData: [
      { name: "Done", value: 4527, color: "#10B981" },
      { name: "Cancelled", value: 1534, color: "#EF4444" },
      { name: "Closed", value: 434, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 5, color: "#10B981" }, { name: "Missed", value: 4956, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 3697 },
      { name: "بهاء حسين عطية", value: 2009 },
      { name: "غيث محمد جمعة", value: 541 },
      { name: "ايات حميد مجيد", value: 194 }
    ],
    resolutionData: [
      { name: "Low priority", value: 18.8, color: "#10B981" },
      { name: "Urgent", value: 41.5, color: "#EF4444" },
      { name: "High priority", value: 9.5, color: "#F59E0B" },
      { name: "Medium priority", value: 15.7, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-02-01", value: 133 }, { name: "2025-02-05", value: 208 }, { name: "2025-02-10", value: 188 },
      { name: "2025-02-15", value: 150 }, { name: "2025-02-20", value: 199 }, { name: "2025-02-25", value: 174 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 6495, fullMark: 2000 } ]
  }
};

export const DATA_MAR_2025 = {
  summary: { totalTickets: 6533, avgDuration: "19:57:11", totalTime: "4039 days, 16:23:48", completionRate: 74 },
  kpis: [
    { label: "Total Tickets", value: "6533", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "19:57:11", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "4039 days, 16:23:48", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "74%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 4563, color: "#10B981" },
      { name: "Cancelled", value: 1674, color: "#EF4444" },
      { name: "Closed", value: 296, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "4-24 hours", value: 2036, color: "#F59E0B" },
      { name: "Open", value: 1674, color: "#6B7280" },
      { name: "1-4 hours", value: 1286, color: "#3B82F6" },
      { name: "1-3 days", value: 746, color: "#EF4444" },
      { name: "< 1 hour", value: 602, color: "#10B981" },
      { name: "> 3 days", value: 189, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 4478, color: "#10B981" },
      { name: "Urgent", value: 1971, color: "#EF4444" },
      { name: "High priority", value: 77, color: "#F59E0B" },
      { name: "Medium priority", value: 7, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "6533", sla: "0%", open: "0", avgRes: "20.0 hrs" },
    secondary: { closed: "4859", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (3578), بهاء حسين عطية (1990), غيث محمد جمعة (848), ايات حميد مجيد (52), ابراهيم علي حسون (1)" },
    statusData: [
      { name: "Done", value: 4563, color: "#10B981" },
      { name: "Cancelled", value: 1674, color: "#EF4444" },
      { name: "Closed", value: 296, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 6, color: "#10B981" }, { name: "Missed", value: 4853, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 3578 },
      { name: "بهاء حسين عطية", value: 1990 },
      { name: "غيث محمد جمعة", value: 848 },
      { name: "ايات حميد مجيد", value: 52 },
      { name: "ابراهيم علي حسون", value: 1 }
    ],
    resolutionData: [
      { name: "Low priority", value: 17.5, color: "#10B981" },
      { name: "Urgent", value: 25.4, color: "#EF4444" },
      { name: "High priority", value: 12.7, color: "#F59E0B" },
      { name: "Medium priority", value: 29.9, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-03-01", value: 89 }, { name: "2025-03-05", value: 175 }, { name: "2025-03-10", value: 166 },
      { name: "2025-03-15", value: 157 }, { name: "2025-03-20", value: 152 }, { name: "2025-03-25", value: 160 },
      { name: "2025-03-31", value: 84 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 6533, fullMark: 2000 } ]
  }
};

export const DATA_APR_2025 = {
  summary: { totalTickets: 7061, avgDuration: "16:35:14", totalTime: "3576 days, 15:57:36", completionRate: 73 },
  kpis: [
    { label: "Total Tickets", value: "7061", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "16:35:14", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "3576 days, 15:57:36", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "73%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 4898, color: "#10B981" },
      { name: "Cancelled", value: 1886, color: "#EF4444" },
      { name: "Closed", value: 277, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "4-24 hours", value: 1977, color: "#F59E0B" },
      { name: "Open", value: 1886, color: "#6B7280" },
      { name: "1-4 hours", value: 1780, color: "#3B82F6" },
      { name: "1-3 days", value: 822, color: "#EF4444" },
      { name: "< 1 hour", value: 442, color: "#10B981" },
      { name: "> 3 days", value: 154, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 5002, color: "#10B981" },
      { name: "Urgent", value: 2002, color: "#EF4444" },
      { name: "High priority", value: 52, color: "#F59E0B" },
      { name: "Medium priority", value: 5, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "7061", sla: "0%", open: "0", avgRes: "16.6 hrs" },
    secondary: { closed: "5175", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (4309), بهاء حسين عطية (1814), غيث محمد جمعة (835), ايات حميد مجيد (11)" },
    statusData: [
      { name: "Done", value: 4898, color: "#10B981" },
      { name: "Cancelled", value: 1886, color: "#EF4444" },
      { name: "Closed", value: 277, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 24, color: "#10B981" }, { name: "Missed", value: 5151, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 4309 },
      { name: "بهاء حسين عطية", value: 1814 },
      { name: "غيث محمد جمعة", value: 835 },
      { name: "ايات حميد مجيد", value: 11 }
    ],
    resolutionData: [
      { name: "Low priority", value: 15.9, color: "#10B981" },
      { name: "Urgent", value: 18.3, color: "#EF4444" },
      { name: "High priority", value: 8.7, color: "#F59E0B" },
      { name: "Medium priority", value: 7.7, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-04-01", value: 76 }, { name: "2025-04-05", value: 194 }, { name: "2025-04-10", value: 176 },
      { name: "2025-04-15", value: 180 }, { name: "2025-04-20", value: 197 }, { name: "2025-04-25", value: 95 },
      { name: "2025-04-30", value: 204 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 7061, fullMark: 2000 } ]
  }
};

export const DATA_MAY_2025 = {
  summary: { totalTickets: 6644, avgDuration: "16:45:41", totalTime: "3528 days, 6:43:04", completionRate: 76 },
  kpis: [
    { label: "Total Tickets", value: "6644", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "16:45:41", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "3528 days, 6:43:04", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "76%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 5038, color: "#10B981" },
      { name: "Cancelled", value: 1592, color: "#EF4444" },
      { name: "Closed", value: 14, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "4-24 hours", value: 1878, color: "#F59E0B" },
      { name: "1-4 hours", value: 1784, color: "#3B82F6" },
      { name: "Open", value: 1592, color: "#6B7280" },
      { name: "1-3 days", value: 817, color: "#EF4444" },
      { name: "< 1 hour", value: 406, color: "#10B981" },
      { name: "> 3 days", value: 167, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 4584, color: "#10B981" },
      { name: "Urgent", value: 2002, color: "#EF4444" },
      { name: "High priority", value: 50, color: "#F59E0B" },
      { name: "Medium priority", value: 8, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "6644", sla: "0%", open: "0", avgRes: "16.8 hrs" },
    secondary: { closed: "5052", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (3888), بهاء حسين عطية (1581), غيث محمد جمعة (609), هيثم خوام احمد (324), ايات حميد مجيد (5)" },
    statusData: [
      { name: "Done", value: 5038, color: "#10B981" },
      { name: "Cancelled", value: 1592, color: "#EF4444" },
      { name: "Closed", value: 14, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 9, color: "#10B981" }, { name: "Missed", value: 5043, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 3888 },
      { name: "بهاء حسين عطية", value: 1581 },
      { name: "غيث محمد جمعة", value: 609 },
      { name: "هيثم خوام احمد", value: 324 },
      { name: "ايات حميد مجيد", value: 5 }
    ],
    resolutionData: [
      { name: "Low priority", value: 16.0, color: "#10B981" },
      { name: "Urgent", value: 18.4, color: "#EF4444" },
      { name: "High priority", value: 16.5, color: "#F59E0B" },
      { name: "Medium priority", value: 12.6, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-05-01", value: 69 }, { name: "2025-05-05", value: 194 }, { name: "2025-05-10", value: 203 },
      { name: "2025-05-15", value: 180 }, { name: "2025-05-20", value: 155 }, { name: "2025-05-25", value: 175 },
      { name: "2025-05-31", value: 184 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 6644, fullMark: 2000 } ]
  }
};

export const DATA_JUN_2025 = {
  summary: { totalTickets: 4777, avgDuration: "12:11:22", totalTime: "1892 days, 9:55:04", completionRate: 78 },
  kpis: [
    { label: "Total Tickets", value: "4777", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "12:11:22", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "1892 days, 9:55:04", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "78%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 3698, color: "#10B981" },
      { name: "Cancelled", value: 1051, color: "#EF4444" },
      { name: "Closed", value: 28, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 1529, color: "#3B82F6" },
      { name: "4-24 hours", value: 1172, color: "#F59E0B" },
      { name: "Open", value: 1051, color: "#6B7280" },
      { name: "< 1 hour", value: 487, color: "#10B981" },
      { name: "1-3 days", value: 459, color: "#EF4444" },
      { name: "> 3 days", value: 79, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 3292, color: "#10B981" },
      { name: "Urgent", value: 1451, color: "#EF4444" },
      { name: "High priority", value: 27, color: "#F59E0B" },
      { name: "Medium priority", value: 7, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "4777", sla: "1%", open: "0", avgRes: "12.2 hrs" },
    secondary: { closed: "3726", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (2384), بهاء حسين عطية (873), غيث محمد جمعة (328), هيثم خوام احمد (241), نمير احمد علاء الدين (75)" },
    statusData: [
      { name: "Done", value: 3698, color: "#10B981" },
      { name: "Cancelled", value: 1051, color: "#EF4444" },
      { name: "Closed", value: 28, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 22, color: "#10B981" }, { name: "Missed", value: 3704, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 2384 },
      { name: "بهاء حسين عطية", value: 873 },
      { name: "غيث محمد جمعة", value: 328 },
      { name: "هيثم خوام احمد", value: 241 },
      { name: "نمير احمد علاء الدين", value: 75 }
    ],
    resolutionData: [
      { name: "Low priority", value: 11.7, color: "#10B981" },
      { name: "Urgent", value: 13.4, color: "#EF4444" },
      { name: "High priority", value: 4.6, color: "#F59E0B" },
      { name: "Medium priority", value: 11.9, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-06-01", value: 125 }, { name: "2025-06-05", value: 162 }, { name: "2025-06-10", value: 91 },
      { name: "2025-06-15", value: 96 }, { name: "2025-06-20", value: 116 }, { name: "2025-06-25", value: 93 },
      { name: "2025-06-30", value: 115 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 4777, fullMark: 2000 } ]
  }
};

export const DATA_JUL_2025 = {
  summary: { totalTickets: 3345, avgDuration: "14:28:05", totalTime: "1620 days, 10:11:39", completionRate: 80 },
  kpis: [
    { label: "Total Tickets", value: "3345", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "14:28:05", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "1620 days, 10:11:39", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "80%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 2652, color: "#10B981" },
      { name: "Cancelled", value: 657, color: "#EF4444" },
      { name: "Closed", value: 36, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 1192, color: "#3B82F6" },
      { name: "Open", value: 657, color: "#6B7280" },
      { name: "< 1 hour", value: 627, color: "#10B981" },
      { name: "4-24 hours", value: 621, color: "#F59E0B" },
      { name: "1-3 days", value: 190, color: "#EF4444" },
      { name: "> 3 days", value: 58, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 2455, color: "#10B981" },
      { name: "Urgent", value: 862, color: "#EF4444" },
      { name: "High priority", value: 27, color: "#F59E0B" },
      { name: "Medium priority", value: 1, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "3345", sla: "1%", open: "0", avgRes: "14.5 hrs" },
    secondary: { closed: "2688", avgAge: "0 days", oldest: "0 days", leaders: "منتصر حسن عباس (1364), بهاء حسين عطية (599), غيث محمد جمعة (174), Samer Abdul-Malik Sabri (119), هيثم خوام احمد (109)" },
    statusData: [
      { name: "Done", value: 2652, color: "#10B981" },
      { name: "Cancelled", value: 657, color: "#EF4444" },
      { name: "Closed", value: 36, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 32, color: "#10B981" }, { name: "Missed", value: 2656, color: "#EF4444" } ],
    subAreaData: [
      { name: "منتصر حسن عباس", value: 1364 },
      { name: "بهاء حسين عطية", value: 599 },
      { name: "غيث محمد جمعة", value: 174 },
      { name: "Samer Abdul-Malik Sabri", value: 119 },
      { name: "هيثم خوام احمد", value: 109 }
    ],
    resolutionData: [
      { name: "Low priority", value: 9.7, color: "#10B981" },
      { name: "Urgent", value: 23.9, color: "#EF4444" },
      { name: "High priority", value: 134.4, color: "#F59E0B" },
      { name: "Medium priority", value: 4.6, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-07-01", value: 88 }, { name: "2025-07-05", value: 89 }, { name: "2025-07-10", value: 107 },
      { name: "2025-07-15", value: 92 }, { name: "2025-07-20", value: 69 }, { name: "2025-07-25", value: 68 },
      { name: "2025-07-31", value: 70 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 3345, fullMark: 2000 } ]
  }
};

export const DATA_AUG_2025 = {
  summary: { totalTickets: 3626, avgDuration: "13:41:36", totalTime: "1692 days, 7:11:29", completionRate: 82 },
  kpis: [
    { label: "Total Tickets", value: "3626", trend: "+15%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "13:41:36", trend: "-5%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "1692 days, 7:11:29", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "82%", trend: "+2%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 2742, color: "#10B981" },
      { name: "Cancelled", value: 660, color: "#EF4444" },
      { name: "Closed", value: 224, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "< 1 hour", value: 1025, color: "#10B981" },
      { name: "1-4 hours", value: 974, color: "#3B82F6" },
      { name: "4-24 hours", value: 694, color: "#F59E0B" },
      { name: "Open", value: 660, color: "#6B7280" },
      { name: "1-3 days", value: 220, color: "#EF4444" },
      { name: "> 3 days", value: 53, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 2793, color: "#10B981" },
      { name: "Urgent", value: 793, color: "#EF4444" },
      { name: "High priority", value: 36, color: "#F59E0B" },
      { name: "Medium priority", value: 4, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "3626", sla: "5%", open: "0", avgRes: "13.7 hrs" },
    secondary: { closed: "2966", avgAge: "0 days", oldest: "0 days", leaders: "بهاء حسين عطية (870), منتصر حسن عباس (606), طه خيري عبد (261), ابراهيم علي حسون (152), اريج فايز صكبان (148)" },
    statusData: [
      { name: "Done", value: 2742, color: "#10B981" },
      { name: "Cancelled", value: 660, color: "#EF4444" },
      { name: "Closed", value: 224, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 146, color: "#10B981" }, { name: "Missed", value: 2820, color: "#EF4444" } ],
    subAreaData: [
      { name: "بهاء حسين عطية", value: 870 },
      { name: "منتصر حسن عباس", value: 606 },
      { name: "طه خيري عبد", value: 261 },
      { name: "ابراهيم علي حسون", value: 152 },
      { name: "اريج فايز صكبان", value: 148 }
    ],
    resolutionData: [
      { name: "Low priority", value: 10.2, color: "#10B981" },
      { name: "Urgent", value: 24.0, color: "#EF4444" },
      { name: "High priority", value: 62.5, color: "#F59E0B" },
      { name: "Medium priority", value: 1.9, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-08-01", value: 48 }, { name: "2025-08-05", value: 60 }, { name: "2025-08-10", value: 56 },
      { name: "2025-08-15", value: 46 }, { name: "2025-08-20", value: 159 }, { name: "2025-08-25", value: 115 },
      { name: "2025-08-31", value: 131 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 3626, fullMark: 2000 } ]
  }
};

export const DATA_SEP_2025 = {
  summary: { totalTickets: 3308, avgDuration: "10:16:14", totalTime: "1095 days, 2:26:16", completionRate: 77 },
  kpis: [
    { label: "Total Tickets", value: "3308", trend: "+12%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "10:16:14", trend: "-6%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "1095 days, 2:26:16", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "77%", trend: "+3%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 2450, color: "#10B981" },
      { name: "Cancelled", value: 749, color: "#EF4444" },
      { name: "Closed", value: 109, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 983, color: "#3B82F6" },
      { name: "< 1 hour", value: 838, color: "#10B981" },
      { name: "Open", value: 749, color: "#6B7280" },
      { name: "4-24 hours", value: 519, color: "#F59E0B" },
      { name: "1-3 days", value: 177, color: "#EF4444" },
      { name: "> 3 days", value: 42, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 2687, color: "#10B981" },
      { name: "Urgent", value: 576, color: "#EF4444" },
      { name: "High priority", value: 44, color: "#F59E0B" },
      { name: "Medium priority", value: 1, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "3308", sla: "4%", open: "0", avgRes: "10.3 hrs" },
    secondary: { closed: "2559", avgAge: "0 days", oldest: "0 days", leaders: "طه خيري عبد (527), بهاء حسين عطية (436), محمد عدنان نوري (315), احمد هيثم عبد الرحمن (231), ابراهيم علي حسون (223)" },
    statusData: [
      { name: "Done", value: 2450, color: "#10B981" },
      { name: "Cancelled", value: 749, color: "#EF4444" },
      { name: "Closed", value: 109, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 99, color: "#10B981" }, { name: "Missed", value: 2460, color: "#EF4444" } ],
    subAreaData: [
      { name: "طه خيري عبد", value: 527 },
      { name: "بهاء حسين عطية", value: 436 },
      { name: "محمد عدنان نوري", value: 315 },
      { name: "احمد هيثم عبد الرحمن", value: 231 },
      { name: "ابراهيم علي حسون", value: 223 }
    ],
    resolutionData: [
      { name: "Low priority", value: 8.6, color: "#10B981" },
      { name: "Urgent", value: 18.2, color: "#EF4444" },
      { name: "High priority", value: 5.7, color: "#F59E0B" },
      { name: "Medium priority", value: 55.4, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-09-01", value: 98 }, { name: "2025-09-05", value: 90 }, { name: "2025-09-10", value: 121 },
      { name: "2025-09-15", value: 121 }, { name: "2025-09-20", value: 73 }, { name: "2025-09-25", value: 101 },
      { name: "2025-09-30", value: 52 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 3308, fullMark: 2000 } ]
  }
};

export const DATA_OCT_2025 = {
  summary: { totalTickets: 2271, avgDuration: "11:34:09", totalTime: "834 days, 21:56:52", completionRate: 76 },
  kpis: [
    { label: "Total Tickets", value: "2271", trend: "+12%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "11:34:09", trend: "-6%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "834 days, 21:56:52", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "76%", trend: "+3%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 1661, color: "#10B981" },
      { name: "Cancelled", value: 539, color: "#EF4444" },
      { name: "Closed", value: 71, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 572, color: "#3B82F6" },
      { name: "Open", value: 539, color: "#6B7280" },
      { name: "< 1 hour", value: 496, color: "#10B981" },
      { name: "4-24 hours", value: 444, color: "#F59E0B" },
      { name: "1-3 days", value: 185, color: "#EF4444" },
      { name: "> 3 days", value: 35, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 1798, color: "#10B981" },
      { name: "Urgent", value: 427, color: "#EF4444" },
      { name: "High priority", value: 39, color: "#F59E0B" },
      { name: "Medium priority", value: 7, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "2271", sla: "4%", open: "0", avgRes: "11.6 hrs" },
    secondary: { closed: "1732", avgAge: "0 days", oldest: "0 days", leaders: "ابراهيم علي حسون (251), محمد عدنان نوري (220), بهاء حسين عطية (159), احمد هيثم عبد الرحمن (158), امير عبد الرحمن زيدان (148)" },
    statusData: [
      { name: "Done", value: 1661, color: "#10B981" },
      { name: "Cancelled", value: 539, color: "#EF4444" },
      { name: "Closed", value: 71, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 62, color: "#10B981" }, { name: "Missed", value: 1670, color: "#EF4444" } ],
    subAreaData: [
      { name: "ابراهيم علي حسون", value: 251 },
      { name: "محمد عدنان نوري", value: 220 },
      { name: "بهاء حسين عطية", value: 159 },
      { name: "احمد هيثم عبد الرحمن", value: 158 },
      { name: "امير عبد الرحمن زيدان", value: 148 }
    ],
    resolutionData: [
      { name: "Low priority", value: 9.5, color: "#10B981" },
      { name: "Urgent", value: 20.9, color: "#EF4444" },
      { name: "High priority", value: 6.6, color: "#F59E0B" },
      { name: "Medium priority", value: 11.9, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-10-01", value: 60 }, { name: "2025-10-05", value: 44 }, { name: "2025-10-10", value: 43 },
      { name: "2025-10-15", value: 55 }, { name: "2025-10-20", value: 71 }, { name: "2025-10-25", value: 74 },
      { name: "2025-10-31", value: 40 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 2271, fullMark: 2000 } ]
  }
};

export const DATA_NOV_2025 = {
  summary: { totalTickets: 3372, avgDuration: "9:16:02", totalTime: "976 days, 22:13:08", completionRate: 75 },
  kpis: [
    { label: "Total Tickets", value: "3372", trend: "+12%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "9:16:02", trend: "-6%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "976 days, 22:13:08", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "75%", trend: "+3%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 2248, color: "#10B981" },
      { name: "Cancelled", value: 842, color: "#EF4444" },
      { name: "Closed", value: 282, color: "#3B82F6" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 1054, color: "#3B82F6" },
      { name: "Open", value: 842, color: "#6B7280" },
      { name: "4-24 hours", value: 697, color: "#F59E0B" },
      { name: "< 1 hour", value: 535, color: "#10B981" },
      { name: "1-3 days", value: 211, color: "#EF4444" },
      { name: "> 3 days", value: 33, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 2830, color: "#10B981" },
      { name: "Urgent", value: 497, color: "#EF4444" },
      { name: "High priority", value: 33, color: "#F59E0B" },
      { name: "Medium priority", value: 12, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "3372", sla: "9%", open: "0", avgRes: "9.3 hrs" },
    secondary: { closed: "2530", avgAge: "0 days", oldest: "0 days", leaders: "محمد عدنان نوري (533), امير عبد الرحمن زيدان (402), ابراهيم علي حسون (339), احمد هيثم عبد الرحمن (293), مصطفى تحسين علي (214)" },
    statusData: [
      { name: "Done", value: 2248, color: "#10B981" },
      { name: "Cancelled", value: 842, color: "#EF4444" },
      { name: "Closed", value: 282, color: "#3B82F6" }
    ],
    slaData: [ { name: "Met", value: 227, color: "#10B981" }, { name: "Missed", value: 2303, color: "#EF4444" } ],
    subAreaData: [
      { name: "محمد عدنان نوري", value: 533 },
      { name: "امير عبد الرحمن زيدان", value: 402 },
      { name: "ابراهيم علي حسون", value: 339 },
      { name: "احمد هيثم عبد الرحمن", value: 293 },
      { name: "مصطفى تحسين علي", value: 214 }
    ],
    resolutionData: [
      { name: "Low priority", value: 9.3, color: "#10B981" },
      { name: "Urgent", value: 9.5, color: "#EF4444" },
      { name: "High priority", value: 5.2, color: "#F59E0B" },
      { name: "Medium priority", value: 7.2, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-11-01", value: 49 }, { name: "2025-11-05", value: 89 }, { name: "2025-11-10", value: 80 },
      { name: "2025-11-15", value: 64 }, { name: "2025-11-20", value: 116 }, { name: "2025-11-25", value: 108 },
      { name: "2025-11-30", value: 133 }
    ],
    ageData: [ { name: "0-1 days", value: 0 }, { name: "1-7 days", value: 0 }, { name: "7-30 days", value: 0 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 3372, fullMark: 2000 } ]
  }
};

export const DATA_DEC_2025 = {
  summary: { totalTickets: 1794, avgDuration: "8:59:39", totalTime: "487 days, 13:36:12", completionRate: 73 },
  kpis: [
    { label: "Total Tickets", value: "1794", trend: "+12%", trendDir: "up", color: "indigo", icon: "total" },
    { label: "Avg Duration", value: "8:59:39", trend: "-6%", trendDir: "down", color: "emerald", icon: "resolution" },
    { label: "Total Time Spent", value: "487 days, 13:36:12", trend: "+8%", trendDir: "up", color: "blue", icon: "calendar" },
    { label: "Completion Rate", value: "73%", trend: "+3%", trendDir: "up", color: "teal", icon: "checklist" }
  ],
  charts: {
    statusDistribution: [
      { name: "Done", value: 1162, color: "#10B981" },
      { name: "Cancelled", value: 476, color: "#EF4444" },
      { name: "Closed", value: 139, color: "#3B82F6" },
      { name: "Postpone", value: 12, color: "#EC4899" },
      { name: "Change Team", value: 5, color: "#6B7280" }
    ],
    durationMetrics: [
      { name: "1-4 hours", value: 603, color: "#3B82F6" },
      { name: "Open", value: 493, color: "#6B7280" },
      { name: "4-24 hours", value: 396, color: "#F59E0B" },
      { name: "< 1 hour", value: 182, color: "#10B981" },
      { name: "1-3 days", value: 111, color: "#EF4444" },
      { name: "> 3 days", value: 9, color: "#7C2D12" }
    ],
    priorityMetrics: [
      { name: "Low priority", value: 1437, color: "#10B981" },
      { name: "Urgent", value: 329, color: "#EF4444" },
      { name: "High priority", value: 21, color: "#F59E0B" },
      { name: "Medium priority", value: 7, color: "#3B82F6" }
    ]
  },
  legacy: {
    summary: { total: "1794", sla: "9%", open: "17", avgRes: "9.0 hrs" },
    secondary: { closed: "1301", avgAge: "2 days", oldest: "12 days", leaders: "محمد عدنان نوري (423), امير عبد الرحمن زيدان (220), احمد هيثم عبد الرحمن (134), مصطفى تحسين علي (88), ابراهيم علي حسون (87)" },
    statusData: [
      { name: "Done", value: 1162, color: "#10B981" },
      { name: "Cancelled", value: 476, color: "#EF4444" },
      { name: "Closed", value: 139, color: "#3B82F6" },
      { name: "Postpone", value: 12, color: "#EC4899" },
      { name: "Change Team", value: 5, color: "#6B7280" }
    ],
    slaData: [ { name: "Met", value: 120, color: "#10B981" }, { name: "Missed", value: 1181, color: "#EF4444" } ],
    subAreaData: [
      { name: "محمد عدنان نوري", value: 423 },
      { name: "امير عبد الرحمن زيدان", value: 220 },
      { name: "احمد هيثم عبد الرحمن", value: 134 },
      { name: "مصطفى تحسين علي", value: 88 },
      { name: "ابراهيم علي حسون", value: 87 }
    ],
    resolutionData: [
      { name: "Low priority", value: 9.2, color: "#10B981" },
      { name: "Urgent", value: 8.4, color: "#EF4444" },
      { name: "High priority", value: 7.2, color: "#F59E0B" },
      { name: "Medium priority", value: 7.4, color: "#3B82F6" }
    ],
    closureData: [
      { name: "2025-12-01", value: 72 }, { name: "2025-12-05", value: 65 }, { name: "2025-12-10", value: 60 },
      { name: "2025-12-15", value: 75 }
    ],
    ageData: [ { name: "0-1 days", value: 11 }, { name: "1-7 days", value: 4 }, { name: "7-30 days", value: 2 }, { name: ">30 days", value: 0 } ],
    qualityData: [ { subject: "FTTH User Maintenance", A: 1794, fullMark: 2000 } ]
  }
};
