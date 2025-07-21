  /* eslint-disable @typescript-eslint/no-explicit-any */
  import React from 'react';
  import { fetchRest } from '@/lib/fetchRest';
  import { ChartBarHorizontal, ChartPieLegend } from '@/components/analyticsCharts';

  interface UserAnalyticsRecord {
    user_id: string;
    email: string;
    user_name: string;
    user_created: string;
    user_age_days: number;
    email_domain_type: string;
    profile_status: string;
    bio_length: number;
    total_posts: number;
    published_posts: number;
    avg_content_length: number;
    last_post_date: string | null;
    unique_categories_used: number;
    total_category_assignments: number;
    category_diversity_percentage: number;
    user_classification: string;
    activity_status: string;
    engagement_score: number;
    analysis_generated_at: string;
    system_data_points: number;
  }

  interface AggregatedAnalyticsData {
    total_users: number;
    total_posts: number;
    published_posts: number;
    active_users_30d: number;
    avg_engagement: number;
    system_data_points: number;
  }

  const DashboardPage: React.FC = async () => {
    let aggregatedData: AggregatedAnalyticsData | null = null;
    let chartDataForChart: any[] = [];
    let chartDataForPie: any[] = [];
    let error: string | null = null;

    try {
      const response = await fetchRest('/analytics');
      const analyticsRecords: UserAnalyticsRecord[] = response.data;

      if (analyticsRecords && analyticsRecords.length > 0) {
        const totalPosts = analyticsRecords.reduce((sum, record) => sum + Number(record.total_posts), 0);
        const publishedPosts = analyticsRecords.reduce((sum, record) => sum + Number(record.published_posts), 0);
        const totalEngagementScore = analyticsRecords.reduce((sum, record) => sum + Number(record.engagement_score), 0);

        const totalUsers = analyticsRecords.length;
        const activeUsers30d = analyticsRecords.filter(
          (record) => record.activity_status === 'highly_active' || record.activity_status === 'moderately_active'
        ).length;
        const avgEngagement = totalUsers > 0 ? totalEngagementScore / totalUsers : 0;
        const systemDataPoints = analyticsRecords[0].system_data_points; // Assuming this is consistent

        aggregatedData = {
          total_users: totalUsers,
          total_posts: totalPosts,
          published_posts: publishedPosts,
          active_users_30d: activeUsers30d,
          avg_engagement: avgEngagement,
          system_data_points: systemDataPoints,
        };
        chartDataForChart = analyticsRecords
          .map((record) => ({
            userName: record.user_name,
            activityStatus: record.activity_status,
            engagementScore: record.engagement_score,
          }))
          .sort((a, b) => b.engagementScore - a.engagementScore)
          .slice(0, 10)
          .map((record) => ({
            classification: record.userName,
            number: Number(record.engagementScore),
          }));

        const emailDomainData = Object.entries(
          analyticsRecords.reduce((acc, record) => {
            const domain = record.email_domain_type;
            acc[domain] = (acc[domain] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).map(([domain, count]) => ({
          domain,
          count,
        }));  

        chartDataForPie = emailDomainData;
        
      } else {
        aggregatedData = {
          total_users: 0,
          total_posts: 0,
          published_posts: 0,
          active_users_30d: 0,
          avg_engagement: 0,
          system_data_points: 0,
        };
        chartDataForChart = [];
        chartDataForPie = [];
      }
    } catch (err: any) {
      error = err.message;
    }

    return (
      <div className="container mx-auto p-4 text-white mt-35">
        <h1 className="text-6xl font-bold mb-10 text-center">Dashboard - Blog DDC</h1>

        {error && <p className="text-red-500">Error loading data: {error}</p>}

        {aggregatedData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total de Usuários</h2>
              <p className="text-4xl font-bold text-blue-600">{aggregatedData.total_users}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Total de Posts</h2>
              <p className="text-4xl font-bold text-green-600">{aggregatedData.total_posts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Posts Publicados</h2>
              <p className="text-4xl font-bold text-purple-600">{aggregatedData.published_posts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Usuários Ativos (30d)</h2>
              <p className="text-4xl font-bold text-orange-600">{aggregatedData.active_users_30d}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Engajamento Médio</h2>
              <p className="text-4xl font-bold text-teal-600">{aggregatedData.avg_engagement.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Dados do Sistema</h2>
              <p className="text-4xl font-bold text-red-600">{aggregatedData.system_data_points}</p>
            </div>
          </div>
        ) : (
          !error && <p>Loading analytics data...</p>
        )}
          
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <ChartBarHorizontal chartData={chartDataForChart} />
          <ChartPieLegend chartData={chartDataForPie} />

        </div>

        {/* Interactive User Table */}
        {/* Dynamic Filters */}
      </div>
    );
  };

  export default DashboardPage;
