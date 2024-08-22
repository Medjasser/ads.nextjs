"use client";
import * as React from "react";
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

// Define types for better TypeScript support
interface StatProps {
  selectedVertical?: string;
  dateRange?: { from: Date; to: Date };
}
// Define types for API data
interface LeadData {
  current: number;
  yesterday: number;
  yesterday_perc: number;
  yesterweek: number;
  yesterweek_perc: number;
}
export default function Stat({ selectedVertical, dateRange }: StatProps) {
  const [leadsCollectes, setLeadsCollectes] = React.useState<LeadData[]>([]);
  const [leadsLivres, setLeadsLivres] = React.useState<LeadData[]>([]);

   // Function to fetch the token
   const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      throw new Error("No token available");
    }
  };

  // Fetch data from API
  async function fetchData(url: string, token: string) {
    const formdata = new FormData();
    formdata.append('Hipto-Authorization', token);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}${url}`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const responseData = await response.json();
      return Array.isArray(responseData) ? responseData : [responseData];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw to be handled by the component
    }
  }

  // Fetch data when dependencies change
  React.useEffect(() => {
    async function fetchDataForLeads(url: string, setStateFunction: React.Dispatch<React.SetStateAction<any[]>>) {
      try {
        const token = getToken();
        const data = await fetchData(url, token);
        setStateFunction(data);
      } catch (error) {
        console.error('Error:', error);
        // Optionally show user-friendly error messages here
      }
    }

    if (selectedVertical && dateRange) {
      const { from, to } = dateRange;
      fetchDataForLeads(
        `/leads/incoming/compareHourlyPerformance?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setLeadsCollectes,
      );
      fetchDataForLeads(
        `/leads/outgoing/compareHourlyPerformance?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setLeadsLivres,
      );
    }
  }, [selectedVertical, dateRange]);
console.log(leadsCollectes);
console.log(leadsLivres)
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
  // Extract values from leadsCollectes and leadsLivres
  const leadsCollectesValues = leadsCollectes[0] || {};
  const leadsLivresValues = leadsLivres || {};
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
                <BarChart data={chartData}>
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
                  <Bar dataKey="Collectés" fill={chartConfig.Collectés.color} radius={4} />
                  <Bar dataKey="Livrés" fill={chartConfig.Livrés.color} radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="flex flex-col items-center">
              <span>LEADS COLLECTÉS</span>
              <span>CPL</span>
              <span>DÉPENSES</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col space-y-4">
        <Card className="flex-grow" style={{ backgroundColor: "#080655" }}>
          <CardHeader>
            <h4 className="text-white">Leads J-1</h4>
          </CardHeader>
          <CardContent className="flex justify-around text-white">
            <div className="flex flex-col items-center gap-2">
              <span className="circle1">{leadsCollectesValues.yesterday || 0}</span>
              <span> ({leadsCollectesValues.yesterday_perc || 0}%)</span>
              <span>Leads Collectés</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="circle2">{leadsLivresValues[0]?.yesterday || 0}</span>
              <span> ({leadsLivresValues[0]?.yesterday_perc || 0}%)</span>
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
              <span className="circle1">{leadsCollectesValues.yesterweek || 0}</span>
              <span> ({leadsCollectesValues.yesterweek_perc || 0}%)</span>
              <span>Leads Collectés</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="circle2">{leadsLivresValues[0]?.yesterweek || 0}</span>
              <span> ({leadsLivresValues[0]?.yesterweek_perc || 0}%)</span>
              <span>Leads Livrés</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
