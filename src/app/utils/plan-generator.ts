import { baselineGrowthPlan } from "@/contants/growthPlan";

export const generatePlan = (
  numFishes: number,
  survivalRate: number
) => {
  const scalingFactor =
    numFishes / baselineGrowthPlan.baseline_plan.stock_size;
  const survivingFish = numFishes * (survivalRate / 100);

  const generatedPlan = {
    growthTimeline: baselineGrowthPlan.baseline_plan.stages.map((stage) => {
      const stageWeeks = stage.weeks[1] - stage.weeks[0] + 1;
      const weeklyWeightGain =
        (stage.average_weight_end_g - stage.average_weight_start_g) /
        stageWeeks;
      const weeklyFeed =
        (stage.feed_per_fish_kg * scalingFactor) / stageWeeks;

      return {
        ...stage,
        weeklyWeightGain,
        weeklyFeed,
      };
    }),
    harvestForecast: {
      totalBiomass:
        (survivingFish *
          baselineGrowthPlan.baseline_plan.stages[
            baselineGrowthPlan.baseline_plan.stages.length - 1
          ].average_weight_end_g) /
        1000, // in kg
      averageHarvestSize:
        baselineGrowthPlan.baseline_plan.stages[
          baselineGrowthPlan.baseline_plan.stages.length - 1
        ].average_weight_end_g,
      totalFeedUsed:
        baselineGrowthPlan.baseline_plan.outputs.total_feed_required_kg *
        scalingFactor,
      projectedRevenue:
        baselineGrowthPlan.baseline_plan.outputs.estimated_revenue
          .price_per_kg_usd *
        ((survivingFish *
          baselineGrowthPlan.baseline_plan.stages[
            baselineGrowthPlan.baseline_plan.stages.length - 1
          ].average_weight_end_g) /
          1000),
    },
  };

  return generatedPlan;
};
