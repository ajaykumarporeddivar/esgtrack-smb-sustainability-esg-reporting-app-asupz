import {
  MOCK_COMPANIES,
  MOCK_DISCLOSURE_TOPICS,
  MOCK_ESGMETRICS,
  MOCK_REPORTS,
} from '@/lib/data';
import { NextRequest } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper function for case-insensitive search across specified fields
function searchInArray<T extends Record<string, any>>(arr: T[], query: string, fields: Array<keyof T>): T[] {
  const lowerCaseQuery = query.toLowerCase();
  return arr.filter(item =>
    fields.some(field =>
      typeof item[field] === 'string' && (item[field] as string).toLowerCase().includes(lowerCaseQuery)
    )
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type');

  let results: any[] = [];
  const lowerCaseQuery = query.toLowerCase();

  if (!query) {
    // If query is empty, return first 5 items from a combined list
    results = [
      ...MOCK_COMPANIES.slice(0, 1).map(c => ({ ...c, _type: 'company' })),
      ...MOCK_DISCLOSURE_TOPICS.slice(0, 2).map(t => ({ ...t, _type: 'topic' })),
      ...MOCK_ESGMETRICS.slice(0, 1).map(m => ({ ...m, _type: 'metric' })),
      ...MOCK_REPORTS.slice(0, 1).map(r => ({ ...r, _type: 'report' })),
    ].slice(0, 5);
  } else {
    // Search logic based on type or all entities
    if (!type || type === 'companies') {
      const companyResults = searchInArray(MOCK_COMPANIES, lowerCaseQuery, ['name', 'industry', 'jurisdiction'])
        .map(c => ({ ...c, _type: 'company' }));
      results.push(...companyResults);
    }
    if (!type || type === 'topics') {
      const topicResults = searchInArray(MOCK_DISCLOSURE_TOPICS, lowerCaseQuery, ['name', 'description'])
        .map(t => ({ ...t, _type: 'topic' }));
      results.push(...topicResults);
    }
    if (!type || type === 'metrics') {
      const metricResults = searchInArray(MOCK_ESGMETRICS, lowerCaseQuery, ['name', 'description'])
        .map(m => ({ ...m, _type: 'metric' }));
      results.push(...metricResults);
    }
    if (!type || type === 'reports') {
      const reportResults = searchInArray(MOCK_REPORTS, lowerCaseQuery, ['title', 'description'])
        .map(r => ({ ...r, _type: 'report' }));
      results.push(...reportResults);
    }
  }

  // Ensure unique results if searching across multiple types might yield duplicates (e.g., same name in different entities)
  const uniqueResults = Array.from(new Set(results.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
  const limitedResults = uniqueResults.slice(0, 20);

  return Response.json({
    ok: true,
    data: {
      results: limitedResults,
      total: limitedResults.length,
      query: query,
    },
  }, {
    headers: CORS_HEADERS,
  });
}