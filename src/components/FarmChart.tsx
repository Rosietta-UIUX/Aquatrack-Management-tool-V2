import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3E93F6", "#02579E", "#C3A6FF", "#B6C8F8", "#F84D4D"];

export const FarmChart = ({ data }: any) => {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="lg:flex hidden">
        <PieChart width={300} height={300}>
          <Pie
            data={data?.pie_data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value">
            {data?.pie_data?.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export const MobileFarmChart = ({ data }: any) => {
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="lg:hidden block">
        <PieChart width={300} height={300}>
          <Pie
            data={data?.pie_data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value">
            {data?.pie_data?.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
