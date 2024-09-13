"use client";

import * as React from "react";
import SelectionBar from "@/components/leadcount/SelectionBar";
import Stat from "@/components/leadcount/Stat";
import TableLead from "@/components/leadcount/TableLead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vertical {
  vertical_id: string;
  vertical_code: string;
}

export default function Page() {
  const [selectedVerticals, setSelectedVerticals] = React.useState<Vertical[]>(
    []
  );
  const [dateRange, setDateRange] = React.useState<
    { from: Date; to: Date } | undefined
  >();
  const [channelData, setChannelData] = React.useState<{
    [key: string]: any[];
  }>({});
  const [snData, setSnData] = React.useState<{ [key: string]: any[] }>({});

  const handleRecalculate = (
    verticals: Vertical[],
    dateRange: { from: Date; to: Date }
  ) => {
    setSelectedVerticals(verticals);
    setDateRange(dateRange);
  };

  const handleSnDataUpdate = (verticalId: string, data: any[]) => {
    setSnData((prevData) => ({ ...prevData, [verticalId]: data }));
  };

  React.useEffect(() => {
    async function fetchDataForLeads(url: string, verticalId: string) {
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
        setChannelData((prevData) => ({
          ...prevData,
          [verticalId]: Array.isArray(responseData)
            ? responseData
            : [responseData],
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (selectedVerticals.length > 0 && dateRange) {
      const { from, to } = dateRange;
      selectedVerticals.forEach((vertical) => {
        fetchDataForLeads(
          `/report/channels?vertical_id=${
            vertical.vertical_id
          }&from=${from.toISOString()}&to=${to.toISOString()}`,
          vertical.vertical_id
        );
      });
    }
  }, [selectedVerticals, dateRange]);

  return (
    <>
      {" "}
      {/* Navbar Card */}
      <header className="flex items-center justify-between bg-white shadow-md pl-10 p-4">
        {/* Breadcrumb */}
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">UTM stats</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lead Count</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-col justify-between p-10">
        <SelectionBar onRecalculate={handleRecalculate} />
        <div className="pt-8">
          {selectedVerticals.length > 0 ? (
            <Tabs defaultValue={selectedVerticals[0].vertical_id}>
              <TabsList className="grid w-full grid-cols-8">
                {selectedVerticals.map((vertical) => (
                  <TabsTrigger
                    key={vertical.vertical_id}
                    value={vertical.vertical_id}
                  >
                    {vertical.vertical_code}
                  </TabsTrigger>
                ))}
              </TabsList>
              {selectedVerticals.map((vertical) => (
                <TabsContent
                  key={vertical.vertical_id}
                  value={vertical.vertical_id}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Lead Count </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {dateRange ? (
                        <>
                          <Stat
                            selectedVertical={vertical.vertical_id}
                            dateRange={dateRange}
                            sndata={snData[vertical.vertical_id] || []}
                          />
                          <Card className="col-span-2">
                            <CardContent className="space-y-2">
                              <TableLead
                                selectedVertical={vertical.vertical_id}
                                dateRange={dateRange}
                                onSnDataUpdate={(data) =>
                                  handleSnDataUpdate(vertical.vertical_id, data)
                                }
                              />
                            </CardContent>
                          </Card>
                        </>
                      ) : (
                        <p>
                          Please select a date range to view the lead count.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
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
    </>
  );
}
