import Stat from "@/components/leadcount/Statistiques/Stat";
import TableLead from "@/components/leadcount/TableLeadCount/TableLead";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from 'react';

export default function BodyLeadCount() {

  return (
    <>
      <Stat />
      <Card className="col-span-2">
        <CardContent className="space-y-2">
        </CardContent>
      </Card>
    </>
  );
}
