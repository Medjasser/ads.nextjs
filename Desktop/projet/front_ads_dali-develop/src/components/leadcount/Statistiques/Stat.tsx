import "../../../components/leadcount/style/lead.css";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
 
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
export default function Stat() {
    return (
      <>
      <div className="grid grid-cols-3 gap-4">
                  <Card className="col-span-2">
                    <CardHeader>
                      <h2>Collecte/Livraison Jour courant</h2>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col space-y-4">
                    <Card className="flex-grow" style={{ backgroundColor: "#080655" }}>
                      <CardHeader>
                        <h4 className="text-white">Leads J-1</h4>
                      </CardHeader>
                      <CardContent className="flex justify-around text-white">
                        <div className="flex flex-col items-center">
                          <span className="circle1">57</span>
                          <span>-26.32%</span>
                          <span>Leads Collectés</span>
                        </div>
                        <div className="flex flex-col items-center">
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
                        <div className="flex flex-col items-center">
                          <span className="circle1">80</span>
                          <span>-47.5%</span>
                          <span>Leads Collectés</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="circle2">77</span>
                          <span>-42.86%</span>
                          <span>Leads Livrés</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
      </>
    )
}