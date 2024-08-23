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

  const handleRecalculate = (vertical: { vertical_id: string; vertical_code: string }, dateRange: { from: Date; to: Date }) => {
    setSelectedVertical(vertical);
    setDateRange(dateRange);
  };

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
                      <Stat selectedVertical={selectedVertical.vertical_id} dateRange={dateRange} />
                      <Card className="col-span-2">
                        <CardContent className="space-y-2">
                          <TableLead selectedVertical={selectedVertical.vertical_id} dateRange={dateRange} />
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
