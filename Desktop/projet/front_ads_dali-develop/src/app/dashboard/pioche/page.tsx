"use client";

import * as React from "react";
import Selection from "@/components/pioche/Selection";
import Leads_Log from "@/components/pioche/Leads_Log";
import Statistique from "@/components/pioche/Statistique";
interface Vertical {
  vertical_id: string;
  vertical_code: string;
}
export default function Page() {
  const [selectedVerticals, setSelectedVerticals] = React.useState<Vertical[]>([]);
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | undefined>();
  const handleRecalculate = (verticals: Vertical[], dateRange: { from: Date; to: Date }) => {
    setSelectedVerticals(verticals);
    setDateRange(dateRange);
  };
  return (
    <main className="flex flex-col justify-between p-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4" >
          <Selection onRecalculate={handleRecalculate}/>
        </div>
        <div className="col-span-8">
          <Statistique />
        </div>
        <div className="col-span-12">
          <Leads_Log />
        </div>
      </div>
    </main>
  );
}
