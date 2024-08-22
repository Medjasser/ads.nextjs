import SelectionBar from "@/components/leadcount/SelectionBar";
import AdplateformTable from "@/components/adplatform/AdplateformTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex flex-col justify-between p-10">
      <span className="font-bold pb-2">Lead Count</span>
      <SelectionBar />
      <div className="pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ad Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2"> <AdplateformTable /></CardContent>
        </Card>
      </div>
    </main>
  );
}
