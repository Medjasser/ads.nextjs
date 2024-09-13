import * as React from "react";
import "../../components/leadcount/style/lead.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
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
  sndata?: any;
}

interface LeadData {
  current: number;
  yesterday: number;
  yesterday_perc: number;
  yesterweek: number;
  yesterweek_perc: number;
}

const fetchData = async (url: string, token: string) => {
  const formdata = new FormData();
  formdata.append("Hipto-Authorization", token);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}${url}`,
      requestOptions
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Stat: React.FC<StatProps> = ({ selectedVertical, dateRange, sndata }) => {
  const [leadsCollectes, setLeadsCollectes] = React.useState<LeadData[]>([]);
  const [leadsLivres, setLeadsLivres] = React.useState<LeadData[]>([]);
  const [chartDataIncoming, setChartDataIncoming] = React.useState<any[]>([]);
  const [chartDataOutgoing, setChartDataOutgoing] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (selectedVertical && dateRange) {
      const { from, to } = dateRange;
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token available");
        return;
      }

      const fetchDataForLeads = async () => {
        try {
          const [incomingData, outgoingData] = await Promise.all([
            fetchData(`/leads/incoming/compareHourlyPerformance?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`, token),
            fetchData(`/leads/outgoing/compareHourlyPerformance?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`, token),
          ]);
          setLeadsCollectes(incomingData);
          setLeadsLivres(outgoingData);
        } catch (error) {
          console.error("Error fetching leads data:", error);
        }
      };

      const fetchDataForCharts = async () => {
        try {
          const [incomingChartData, outgoingChartData] = await Promise.all([
            fetchData(`/leads/incoming/hours?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`, token),
            fetchData(`/leads/outgoing/hours?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`, token),
          ]);
          setChartDataIncoming(incomingChartData);
          setChartDataOutgoing(outgoingChartData);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };

      fetchDataForLeads();
      fetchDataForCharts();
    }
  }, [selectedVertical, dateRange]);

  const combinedChartData = chartDataIncoming.map((incomingItem) => {
    const outgoingItem = chartDataOutgoing.find((outgoingItem) => outgoingItem.hour === incomingItem.hour);
    return {
      hour: incomingItem.hour,
      incoming: incomingItem.count,
      outgoing: outgoingItem ? outgoingItem.count : 0,
    };
  });

  const chartConfig: ChartConfig = {
    incoming: { label: "Collectés", color: "#6BEAA6" },
    outgoing: { label: "Livrés", color: "#60a5fa" },
  };

  const leadsCollectesValues = leadsCollectes[0] || {};
  const leadsLivresValues = leadsLivres[0] || {};

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <h2>Collecte/Livraison Jour courant</h2>
        </CardHeader>
        <CardContent>
          <div className="text-black">
            <div className="inline-block align-top w-3/4">
              <ChartContainer config={chartConfig} className="h-[410px] w-full">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={combinedChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="hour"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => `${value}h`}
                    />
                      <YAxis
                      domain={[0, 100]}
                      ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="incoming"
                      fill={chartConfig.incoming.color}
                      radius={4}
                    />
                    <Bar
                      dataKey="outgoing"
                      fill={chartConfig.outgoing.color}
                      radius={4}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="inline-block align-top w-1/5 pl-4">
              <span className="block">LEADS COLLECTÉS</span>
              <p className="mb-5">{sndata?.[0]?.global ?? "0"}</p>
              <span className="block">CPL</span>
              <p className="mb-5">{sndata?.[0]?.global_cpl ?? "0,00 €"}</p>
              <span className="block">DÉPENSES</span>
              <p className="mb-5">{sndata?.[0]?.global_expenses ?? "0,00 €"}</p>
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
              <span className="circle2">{leadsLivresValues.yesterday || 0}</span>
              <span> ({leadsLivresValues.yesterday_perc || 0}%)</span>
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
              <span className="circle2">{leadsLivresValues.yesterweek || 0}</span>
              <span> ({leadsLivresValues.yesterweek_perc || 0}%)</span>
              <span>Leads Livrés</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stat;
