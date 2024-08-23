"use client";

import * as React from "react";
import SelectionBar from "@/components/leadcount/SelectionBar";
import Stat from "@/components/leadcount/Stat";
import TableLead from "@/components/leadcount/TableLead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [selectedVertical, setSelectedVertical] = React.useState<{
    vertical_id: string;
    vertical_code: string;
  } | undefined>();
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | undefined>();
  const [channelData, setChannelData] = React.useState<any[]>([]);
  const [snData, setSnData] = React.useState<any[]>([]);

  const handleRecalculate = (vertical: { vertical_id: string; vertical_code: string }, dateRange: { from: Date; to: Date }) => {
    setSelectedVertical(vertical);
    setDateRange(dateRange);
  };

  const handleSnDataUpdate = (data: any[]) => {
    setSnData(data);
  };

  React.useEffect(() => {
    async function fetchDataForLeads(url: string, setStateFunction: React.Dispatch<React.SetStateAction<any[]>>) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token available");

        const formdata = new FormData();
        formdata.append("Hipto-Authorization", token);

        const requestOptions = {
          method: "POST",
          body: formdata,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}${url}`,
          requestOptions
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const responseData = await response.json();
        setStateFunction(Array.isArray(responseData) ? responseData : [responseData]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (selectedVertical && dateRange) {
      const { from, to } = dateRange;
      fetchDataForLeads(
        `/report/channels?vertical_id=${selectedVertical.vertical_id}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setChannelData
      );
    }
  }, [selectedVertical, dateRange]);

  return (
    <main className="flex flex-col justify-between p-10">
      <span className="font-bold pb-2">Lead Count</span>
      <SelectionBar onRecalculate={handleRecalculate} />
      <div className="pt-8">
        {selectedVertical ? (
          <Tabs defaultValue="Verticale">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Verticale">
                {`${selectedVertical.vertical_code}`}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Verticale">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Count</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dateRange ? (
                    <>
                      <Stat selectedVertical={selectedVertical.vertical_id} dateRange={dateRange} sndata={snData} />
                      <Card className="col-span-2">
                        <CardContent className="space-y-2">
                          <TableLead 
                            selectedVertical={selectedVertical.vertical_id} 
                            dateRange={dateRange}  
                            onSnDataUpdate={handleSnDataUpdate} 
                          />
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <p>Please select a date range to view the lead count.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Lead Count</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </main>
  );
}
