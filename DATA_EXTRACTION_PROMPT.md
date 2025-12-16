# Data Extraction Prompt

Copy and paste the JSON block below into an AI chat (like ChatGPT 4o, Claude 3.5, or Gemini 1.5 Pro) along with your Excel/CSV file to generate the data for the dashboard.

**Usage:**
1. Upload Excel File.
2. Replace `[INSERT START DATE]` and `[INSERT END DATE]` with your desired range.
3. Paste the text below.
4. Copy the resulting JSON and add it to `App.tsx`.

```json
{
  "role": "Senior Data Analyst",
  "task": "Extract and calculate IT Service Management metrics from the attached dataset for a specific date range.",
  "instructions": [
    "1. Filter the dataset to include only rows where the 'Date' or 'Creation Date' column falls between [INSERT START DATE] and [INSERT END DATE].",
    "2. Calculate the metrics required to populate the JSON structure defined below.",
    "3. Return ONLY the valid JSON object. Do not include markdown formatting or conversational text."
  ],
  "required_output_format": {
    "summary": {
      "totalTickets": "Number (Integer)",
      "avgDuration": "String (Format HH:MM:SS)",
      "totalTime": "String (Format HH:MM:SS)",
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
        { "name": "String (Done, Cancelled, etc)", "value": "Number", "color": "Hex String" }
      ],
      "durationMetrics": [
        { "name": "String (Range)", "value": "Number", "color": "Hex String" }
      ],
      "priorityMetrics": [
        { "name": "String (Priority)", "value": "Number", "color": "Hex String" }
      ]
    },
    "legacy": {
      "summary": {
        "total": "String",
        "sla": "String (%)",
        "open": "String",
        "avgRes": "String (hrs)"
      },
      "secondary": {
        "closed": "String",
        "avgAge": "String",
        "oldest": "String",
        "leaders": "String"
      },
      "statusData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "slaData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "subAreaData": [{ "name": "String", "value": "Number" }],
      "resolutionData": [{ "name": "String", "value": "Number", "color": "Hex" }],
      "closureData": [{ "name": "String", "value": "Number" }],
      "ageData": [{ "name": "String", "value": "Number" }],
      "qualityData": [
        { "subject": "String", "A": "Number", "fullMark": 2000 }
      ]
    }
  }
}
```
