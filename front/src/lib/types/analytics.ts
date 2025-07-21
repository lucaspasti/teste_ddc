
import { z } from 'zod';

export const UserMetricsSchema = z.object({
  totalUsers: z.number(),
  newUsersLast7Days: z.number(),
  averageUserAgeDays: z.number(),
});

export const ContentMetricsSchema = z.object({
  totalPosts: z.number(),
  publishedPosts: z.number(),
  averageContentLength: z.number(),
});

export const CategoryEngagementSchema = z.object({
  uniqueCategoriesUsed: z.number(),
  totalCategoryAssignments: z.number(),
  categoryDiversityPercentage: z.number(),
});

export const UserClassificationSchema = z.object({
  powerUsers: z.number(),
  activeUsers: z.number(),
  newUsers: z.number(),
  inactiveUsers: z.number(),
});

export const ActivityStatusSchema = z.object({
  highlyActive: z.number(),
  moderatelyActive: z.number(),
  dormant: z.number(),
  noActivity: z.number(),
});

export const EngagementScoreSchema = z.object({
  averageEngagementScore: z.number(),
  top5Users: z.array(z.object({
    id: z.string(),
    name: z.string(),
    score: z.number(),
  })),
});

export const AnalyticsDataSchema = z.object({
  userMetrics: UserMetricsSchema,
  contentMetrics: ContentMetricsSchema,
  categoryEngagement: CategoryEngagementSchema,
  userClassification: UserClassificationSchema,
  activityStatus: ActivityStatusSchema,
  engagementScore: EngagementScoreSchema,
  analysisGeneratedAt: z.string(),
  systemDataPoints: z.number(),
});

export type AnalyticsData = z.infer<typeof AnalyticsDataSchema>;
