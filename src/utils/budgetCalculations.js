
export function calculateBudget(budget = 0, activities = [], expenses = []) {
  const totalBudget = Number(budget) || 0;

  const plannedCost = activities.reduce(
    (sum, activity) =>
      sum + (Number(activity.estimatedCost ?? activity.cost) || 0),
    0
  );

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + (Number(expense.amount) || 0),
    0
  );

  return {
    totalBudget,
    plannedCost,
    totalSpent,
    remaining: totalBudget - totalSpent,
    overBudget: totalSpent > totalBudget,
  };
}
