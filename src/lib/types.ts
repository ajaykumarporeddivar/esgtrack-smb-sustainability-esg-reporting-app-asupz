export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string; // ISO 8601 date string
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  employeeCount: number;
  jurisdiction: string; // e.g., 'Germany', 'France'
  csrdComplianceStatus: 'compliant' | 'in_progress' | 'not_started';
  generatedMaterialTopics: string[]; // List of topic names generated from materiality assessment
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface DisclosureTopic {
  id: string;
  name: string;
  description: string;
  category: 'Environmental' | 'Social' | 'Governance';
  materialityAssessment: 'high' | 'medium' | 'low';
  metricsCount: number;
  progress: number; // 0-100%
  lastUpdated: string; // ISO 8601 date string
}

export interface ESGMetric {
  id: string;
  topicId: string;
  name: string;
  description: string;
  unit: string; // e.g., 'tCO2e', 'kWh', 'employee-hours'
  reportingPeriod: string; // e.g., '2023-Q4', '2023-FY'
  value: number | null;
  dataType: 'activity' | 'calculated' | 'survey' | 'manual';
  status: 'pending_input' | 'pending_review' | 'completed' | 'not_applicable';
  evidenceDocumentIds: string[]; // IDs linking to uploaded documents
  lastUpdated: string; // ISO 8601 date string
  benchmarkValue?: number; // Optional, for comparison
}

export interface ActivityData {
  id: string;
  metricId: string;
  source: string; // e.g., 'electricity bill', 'fuel receipt', 'travel booking'
  date: string; // ISO 8601 date string
  value: number;
  unit: string;
  description?: string;
  documentId?: string; // Link to uploaded document
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'CSRD' | 'GRI' | 'TCFD';
  companyId: string;
  reportingPeriod: string; // e.g., '2023-FY'
  status: 'draft' | 'pending_approval' | 'published';
  generatedAt: string; // ISO 8601 date string
  downloadUrl?: string; // URL to the generated PDF
}

export interface RecentActivityItem {
  id: string;
  type: 'data_entry' | 'report_generated' | 'metric_updated' | 'company_profile_edited';
  description: string;
  timestamp: string; // ISO 8601 date string
  userId: string;
  relatedEntityId?: string; // ID of the related metric, report, etc.
}

export interface StatCardProps {
  id: string;
  label: string;
  value: string;
  change?: string; // e.g., "+12%" or "-5%"
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  sparklineId: string; // ID to fetch sparkline data from
}

export interface ChartDataPoint {
  date: string;
  value: number;
}