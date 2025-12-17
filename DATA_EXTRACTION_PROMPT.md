# Data Extraction Prompt

Copy and paste the JSON block below into an AI chat (like ChatGPT 4o, Claude 3.5, or Gemini 1.5 Pro) along with your Excel/CSV file to generate the data for the dashboard.

**Usage:**
1. Upload Excel File.
2. Replace `[INSERT START DATE]` and `[INSERT END DATE]` with your desired range.
3. Paste the text below.
4. Copy the resulting JSON and use it to update `Data.ts`.

```json
{
  "role": "Senior Data Analyst",
  "task": "Extract and calculate IT Service Management metrics from the attached dataset for a specific date range.",
  "instructions": [
    "1. Filter the dataset to include only rows where the 'Date' or 'Creation Date' column falls between [INSERT START DATE] and [INSERT END DATE].",
    "2. Group metrics by 'MR Team Leader' for the 'subAreaData' field and 'MR Responsible' for the 'resolutionData' field.",
    "3. Calculate the metrics required to populate the JSON structure defined below.",
    "4. Return ONLY the valid JSON object. Do not include markdown formatting or conversational text."
  ],
  "required_output_format": {
    "summary": {
      "totalTickets": "Number (Integer)",
      "avgDuration": "String (Format HH:MM:SS)",
      "totalTime": "String (Format 'X days, HH:MM:SS')",
      "completionRate": "Number (Percentage Integer, e.g., 55)"
    },
    "kpis": [
      { "label": "Total Tickets", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "indigo", "icon": "total" },
      { "label": "Avg Duration", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "emerald", "icon": "resolution" },
      { "label": "Total Time Spent", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "blue", "icon": "calendar" },
      { "label": "Completion Rate", "value": "String", "trend": "String", "trendDir": "'up'|'down'|'neutral'", "color": "teal", "icon": "checklist" }
    ],
    "charts": {
      "statusDistribution": [
        { "name": "String (Done, Cancelled, Closed, Postpone, etc)", "value": "Number", "color": "Hex String" }
      ],
      "durationMetrics": [
        { "name": "String (Range)", "value": "Number", "color": "Hex String" }
      ],
      "priorityMetrics": [
        { "name": "String (Priority)", "value": "Number", "color": "Hex String" }
      ]
    },
    "cityMetrics": [
       { "city": "String (e.g. Baghdad)", "Done": "Number", "Cancelled": "Number", "Closed": "Number", "Postpone": "Number" }
    ],
    "subAreaMetrics": [
       { "subArea": "String (e.g. Karrada)", "Done": "Number", "Cancelled": "Number", "Closed": "Number", "Postpone": "Number" }
    ],
    "legacy": {
      "summary": {
        "total": "String",
        "sla": "String (%)",
        "open": "String",
        "avgRes": "String (hrs)"
      },
      "secondary": {
        "closed": "String",
        "leaders": "String (Top MR Team Leaders)"
      },
      "statusData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "slaData": [{ "name": "String (Met/Missed)", "value": "Number", "color": "Hex" }],
      "subAreaData": [{ "name": "String (Value from 'MR Team Leader' column)", "value": "Number" }],
      "resolutionData": [{ "name": "String (Value from 'MR Responsible' column)", "value": "Number", "color": "Hex" }],
      "closureData": [{ "name": "String (Date YYYY-MM-DD)", "value": "Number" }]
    }
  }
}
```