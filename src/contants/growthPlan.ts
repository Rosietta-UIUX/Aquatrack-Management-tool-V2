export const baselineGrowthPlan = {
  baseline_plan: {
    stock_size: 1000,
    duration_weeks: 24,
    stages: [
      {
        stage: "Fingerling",
        weeks: [1, 4],
        average_weight_start_g: 2,
        average_weight_end_g: 15,
        feed_type: "Starter Feed",
        feed_per_fish_kg: 0.3,
        expected_mortality_rate_percent: 5,
      },
      {
        stage: "Juvenile",
        weeks: [5, 10],
        average_weight_start_g: 15,
        average_weight_end_g: 100,
        feed_type: "Grower Feed",
        feed_per_fish_kg: 0.8,
        expected_mortality_rate_percent: 3,
      },
      {
        stage: "Table Size",
        weeks: [11, 20],
        average_weight_start_g: 100,
        average_weight_end_g: 500,
        feed_type: "Grower/Finisher Feed",
        feed_per_fish_kg: 2.5,
        expected_mortality_rate_percent: 2,
      },
      {
        stage: "Market Ready",
        weeks: [21, 24],
        average_weight_start_g: 500,
        average_weight_end_g: 1200,
        feed_type: "Finisher Feed",
        feed_per_fish_kg: 3.0,
        expected_mortality_rate_percent: 1,
      },
    ],
    outputs: {
      total_feed_required_kg: 6600,
      expected_survival_rate_percent: 89,
      market_weight_range_g: [1000, 1200],
      estimated_harvest_date: "24 weeks from start date",
      estimated_revenue: {
        price_per_kg_usd: 3,
        total_estimated_revenue_usd: 32000,
      },
    },
  },
};
