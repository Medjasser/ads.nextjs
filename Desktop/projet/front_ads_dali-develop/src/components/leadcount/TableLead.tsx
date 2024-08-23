"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
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
      Swal.fire("Error", "No token available", "error");
      throw new Error("No token available");
    }
  };

  async function fetchData(url: string, token: string) {
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
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const responseData = await response.json();
      return Array.isArray(responseData) ? responseData : [responseData];
    } catch (error) {
      Swal.fire("Error", `Failed to fetch data:`, "error");
      throw error;
    }
  }

  React.useEffect(() => {
    async function fetchDataForLeads(
      url: string,
      setStateFunction: React.Dispatch<React.SetStateAction<any[]>>
    ) {
      try {
        const token = getToken();
        const data = await fetchData(url, token);

        // For the "Par Ad Plateform" tab, transform the API response
        if (url.includes("/report/socialNetworks")) {
          const transformedData = [
            {
              name: "Facebook",
              logo: "/images/logos/facebook.png",
              lead: data[0].facebook,
              cpl: data[0].facebook_cpl,
              depenses: data[0].facebook_expenses,
              tx_marge: "-",
            },
            {
              name: "Google",
              logo: "/images/logos/google.png",
              lead: data[0].google,
              cpl: data[0].google_cpl,
              depenses: data[0].google_expenses,
              tx_marge: "-",
            },
            {
              name: "Snapchat",
              logo: "/images/logos/snapchat.png",
              lead: data[0].snapchat,
              cpl: data[0].snapchat_cpl,
              depenses: data[0].snapchat_expenses,
              tx_marge: "-",
            },
            {
              name: "TikTok",
              logo: "/images/logos/tiktok.jpg",
              lead: data[0].tiktok,
              cpl: data[0].tiktok_cpl,
              depenses: data[0].tiktok_expenses,
              tx_marge: "-",
            },
            {
              name: "Bing",
              logo: "/images/logos/bing.png",
              lead: data[0].bing,
              cpl: data[0].bing_cpl,
              depenses: data[0].bing_expenses,
              tx_marge: "-",
            },
            {
              name: "Taboola",
              logo: "/images/logos/taboola.png",
              lead: data[0].taboola,
              cpl: data[0].taboola_cpl,
              depenses: data[0].taboola_expenses,
              tx_marge: "-",
            },
            {
              name: "Outbrain",
              logo: "/images/logos/outbrain.png",
              lead: data[0].outbrain,
              cpl: data[0].outbrain_cpl,
              depenses: data[0].outbrain_expenses,
              tx_marge: "-",
            },
            {
              name: "SMS Mode",
              logo: "/images/logos/autre.jpg",
              lead: data[0].smsmode,
              cpl: data[0].smsmode_cpl,
              depenses: data[0].smsmode_expenses,
              tx_marge: "-",
            },
            {
              name: "Others",
              logo: "/images/logos/autre.jpg",
              lead: data[0].others,
              cpl: data[0].global_cpl,
              depenses: data[0].global_expenses,
              tx_marge: "-",
            },
          ];
          setSNData(transformedData);
        } else {
          setStateFunction(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (selectedVertical && dateRange) {
      const { from, to } = dateRange;
      fetchDataForLeads(
        `/report/socialNetworks?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setSNData
      );
      fetchDataForLeads(
        `/report/channels?vertical_id=${selectedVertical}&from=${from.toISOString()}&to=${to.toISOString()}`,
        setChannelData
      );
    }
  }, [selectedVertical, dateRange]);
  console.log(SNData);
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
              {ChannelData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "400px",
                      }}
                    >
                      <img
                        src={item.channel_logo}
                        style={{ width: "35px", marginRight: "10px" }}
                      />
                      {item.channel_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.count} ({item.leads_test})
                  </TableCell>
                  <TableCell>{item.cpl}</TableCell>
                  <TableCell>{item.expenses}</TableCell>
                  <TableCell>-</TableCell>
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
              {SNData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "400px",
                      }}
                    >
                      <Image
            src={item.logo}
            alt={item.name}
            width={35}
            height={35}
            style={{ marginRight: "10px" }}
          />
                      {item.name}
                    </div>
                  </TableCell>

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
