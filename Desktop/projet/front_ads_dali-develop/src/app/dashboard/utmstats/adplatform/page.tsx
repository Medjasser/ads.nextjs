"use client";
import * as React from "react";
import SelectionBar from "@/components/leadcount/SelectionBar";
import AdplateformTable from "@/components/adplatform/AdplateformTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const [selectedVertical, setSelectedVertical] = React.useState<{
    vertical_id: string;
    vertical_code: string;
  } | undefined>();

  const handleRecalculate = (vertical: { vertical_id: string; vertical_code: string }) => {
    setSelectedVertical(vertical);
  };

  return (
    <main className="flex flex-col justify-between p-10">
      <span className="font-bold pb-2">AD Platform</span>
      <SelectionBar onRecalculate={handleRecalculate} />
      <div className="pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ad Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedVertical ? (
              <AdplateformTable />
            ) : (
              <p></p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
