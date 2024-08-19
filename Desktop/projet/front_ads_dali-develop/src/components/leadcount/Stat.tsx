"use client";
import "../../components/leadcount/style/lead.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Stat() {
  const chartData = [
    { month: "January", Collectés: 186, Livrés: 80 },
    { month: "February", Collectés: 305, Livrés: 200 },
    { month: "March", Collectés: 237, Livrés: 120 },
    { month: "April", Collectés: 73, Livrés: 190 },
    { month: "May", Collectés: 209, Livrés: 130 },
    { month: "June", Collectés: 214, Livrés: 140 },
  ];

  const chartConfig = {
    Collectés: {
      label: "Collectés",
      color: "#6BEAA6",
    },
    Livrés: {
      label: "Livrés",
      color: "#60a5fa",
    },
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <h2>Collecte/Livraison Jour courant</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-around text-black">
          <div className="flex flex-col items-center">
          <ChartContainer config={chartConfig} className="min-h-[325px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Collectés" fill="var(--color-Collectés)" radius={4} />
              <Bar dataKey="Livrés" fill="var(--color-Livrés)" radius={4} />
            </BarChart>
          </ChartContainer></div><div className="flex flex-col items-center"><span>LEADS COLLECTÉS</span>
              <span>CPL</span>
              <span>DÉPENSES</span></div></div>
        </CardContent>
      </Card>
      <div className="flex flex-col space-y-4">
        <Card className="flex-grow" style={{ backgroundColor: "#080655" }}>
          <CardHeader>
            <h4 className="text-white">Leads J-1</h4>
          </CardHeader>
          <CardContent className="flex justify-around text-white">
            <div className="flex flex-col items-center gap-2">
              <span className="circle1">57</span>
              <span>-26.32%</span>
              <span>Leads Collectés</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="circle2">58</span>
              <span>-24.14%</span>
              <span>Leads Livrés</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow" style={{ backgroundColor: "#0DBDE7" }}>
          <CardHeader>
            <h4 className="text-white">Leads S-1</h4>
          </CardHeader>
          <CardContent className="flex justify-around text-white">
            <div className="flex flex-col items-center gap-2">
              <span className="circle1">80</span>
              <span>-47.5%</span>
              <span>Leads Collectés</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="circle2">77</span>
              <span>-42.86%</span>
              <span>Leads Livrés</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
