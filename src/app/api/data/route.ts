import {
  MOCK_COMPANIES,
  MOCK_DISCLOSURE_TOPICS,
  MOCK_ESGMETRICS,
  MOCK_ACTIVITY_DATA,
  MOCK_REPORTS,
  MOCK_RECENT_ACTIVITY,
  DEMO_USER,
  MOCK_STATS as STATS, // Alias MOCK_STATS to STATS as per prompt
} from '@/lib/data';
import { NextRequest } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let data: Record<string, any[]> | Record<string, any>;
  let total: number;

  switch (type) {
    case 'companies':
      data = { companies: MOCK_COMPANIES };
      total = MOCK_COMPANIES.length;
      break;
    case 'topics':
      data = { disclosureTopics: MOCK_DISCLOSURE_TOPICS };
      total = MOCK_DISCLOSURE_TOPICS.length;
      break;
    case 'metrics':
      data = { esgMetrics: MOCK_ESGMETRICS };
      total = MOCK_ESGMETRICS.length;
      break;
    case 'activity':
      data = { activityData: MOCK_ACTIVITY_DATA };
      total = MOCK_ACTIVITY_DATA.length;
      break;
    case 'reports':
      data = { reports: MOCK_REPORTS };
      total = MOCK_REPORTS.length;
      break;
    case 'recent-activity':
      data = { recentActivity: MOCK_RECENT_ACTIVITY };
      total = MOCK_RECENT_ACTIVITY.length;
      break;
    case 'user':
      data = { user: DEMO_USER };
      total = 1; // Only one demo user
      break;
    default:
      // Return all data if no specific type is requested
      data = {
        companies: MOCK_COMPANIES,
        disclosureTopics: MOCK_DISCLOSURE_TOPICS,
        esgMetrics: MOCK_ESGMETRICS,
        activityData: MOCK_ACTIVITY_DATA,
        reports: MOCK_REPORTS,
        recentActivity: MOCK_RECENT_ACTIVITY,
        user: DEMO_USER,
      };
      // For general 'total', we'll use the length of companies as a primary representative count.
      total = MOCK_COMPANIES.length;
      break;
  }

  return Response.json({
    ok: true,
    data: data,
    stats: STATS,
    total: total,
  }, {
    headers: CORS_HEADERS,
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();

  return Response.json({
    ok: true,
    message: 'Demo mode — data not persisted',
    received: body,
  }, {
    headers: CORS_HEADERS,
  });
}