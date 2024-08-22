"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from 'sweetalert2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TableProps {
  selectedVertical?: string;
  dateRange?: { from: Date; to: Date };
}

export default function TableLead({ selectedVertical, dateRange }: TableProps) {
  const [ChannelData, setChannelData] = React.useState<any[]>([]);
  const [SNData, setSNData] = React.useState<any[]>([]);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      Swal.fire('Error', 'No token available', 'error');
      throw new Error("No token available");
    }
  };

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
      Swal.fire('Error', `Failed to fetch data: ${error.message}`, 'error');
      throw error;
    }
  }

  React.useEffect(() => {
    async function fetchDataForLeads(url: string, setStateFunction: React.Dispatch<React.SetStateAction<any[]>>) {
      try {
        const token = getToken();
        const data = await fetchData(url, token);
        setStateFunction(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (selectedVertical && dateRange) {
      const { from, to } = dateRange;
      fetchDataForLeads(
        `/report/socialNetworks?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setChannelData,
      );
      fetchDataForLeads(
        `/report/channels?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setSNData,
      );
    }
  }, [selectedVertical, dateRange]);

  return (
    <div className="pt-8">
      <Tabs defaultValue="canal">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="canal">Par Canal</TabsTrigger>
          <TabsTrigger value="Plateform">Par Ad Plateform</TabsTrigger>
        </TabsList>
        <TabsContent value="canal">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ITEM</TableHead>
                <TableHead>LEAD</TableHead>
                <TableHead>CPL</TableHead>
                <TableHead>DEPENCES</TableHead>
                <TableHead>TX MARGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ChannelData?.canal?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.lead}</TableCell>
                  <TableCell>{item.cpl}</TableCell>
                  <TableCell>{item.depenses}</TableCell>
                  <TableCell>{item.tx_marge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Plateform">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ITEM</TableHead>
                <TableHead>LEAD</TableHead>
                <TableHead>CPL</TableHead>
                <TableHead>DEPENCES</TableHead>
                <TableHead>TX MARGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SNData?.plateform?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.lead}</TableCell>
                  <TableCell>{item.cpl}</TableCell>
                  <TableCell>{item.depenses}</TableCell>
                  <TableCell>{item.tx_marge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
