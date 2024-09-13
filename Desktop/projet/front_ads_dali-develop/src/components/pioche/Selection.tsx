"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Vertical {
  vertical_id: string;
  vertical_code: string;
}

interface Source {
  source_id: string;
  source_name: string;
  vertical_id: string;
}

interface SelectionProps {
  onRecalculate: (
    selectedVertical: Vertical[],
    dateRange: { from: Date; to: Date },
    selectedSource: string | undefined,
    timeFrom: string | undefined,
    timeTo: string | undefined
  ) => void;
  className?: string;
}

export default function Selection({
  className,
  onRecalculate,
}: SelectionProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [verticals, setVerticals] = React.useState<Vertical[]>([]);
  const [sources, setSources] = React.useState<Source[]>([]);
  const [selectedVertical, setSelectedVertical] = React.useState<string | undefined>(undefined);
  const [selectedSource, setSelectedSource] = React.useState<string | undefined>(undefined);
  const [timeFrom, setTimeFrom] = React.useState<string | undefined>(undefined);
  const [timeTo, setTimeTo] = React.useState<string | undefined>(undefined);

  // Fetching verticals on component mount
  React.useEffect(() => {
    const fetchVerticals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const formdata = new FormData();
          formdata.append("Hipto-Authorization", token);
          const requestOptions = {
            method: "POST",
            body: formdata,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/verticals`,
            requestOptions
          );
          const data = await response.json();
          setVerticals(data);
        } else {
          console.error("Token is null or invalid");
        }
      } catch (error) {
        console.error("Error fetching verticals:", error);
      }
    };

    fetchVerticals();
  }, []);

  // Fetching sources based on the selected vertical
  React.useEffect(() => {
    const fetchSources = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && selectedVertical) {
          const formdata = new FormData();
          formdata.append("Hipto-Authorization", token);
          const requestOptions = {
            method: "POST",
            body: formdata,
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/sources`,
            requestOptions
          );
          const data = await response.json();
          const filteredSources = data.filter((source: Source) => source.vertical_id === selectedVertical);
          setSources(filteredSources);
        } else {
          console.error("Token is null or invalid, or no vertical selected");
        }
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchSources();
  }, [selectedVertical]);

  const handleTimeFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrom(event.target.value);
  };

  const handleTimeToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeTo(event.target.value);
  };

  const handleRecalculate = () => {
    if (
      selectedVertical &&
      selectedVertical.length > 0 &&
      date?.from &&
      date?.to &&
      selectedSource &&
      timeFrom &&
      timeTo
    ) {
      const formattedFromDate = format(date.from, "yyyy-MM-dd");
      const formattedToDate = format(date.to, "yyyy-MM-dd");
      const fromDate = new Date(formattedFromDate);
      const toDate = new Date(formattedToDate);

      const selectedVerticals: Vertical[] = [{ vertical_id: selectedVertical, vertical_code: "" }];
      onRecalculate(selectedVerticals, { from: fromDate, to: toDate }, selectedSource, timeFrom, timeTo);
    } else {
      alert("Please select one or more verticals, a date range, a source, and times.");
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sélection</CardTitle>
        <hr className="border-t border-gray-300 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="date" className="text-gray-500">Période</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="time" className="text-gray-500">Heure</Label>
            <div className="flex space-x-2">
              <div className="flex w-[50%] flex-col space-y-2">
                <Label htmlFor="time-from" className="text-gray-500">De :</Label>
                <Input
                  type="time"
                  id="time-from"
                  placeholder="De"
                  value={timeFrom}
                  onChange={handleTimeFromChange}
                />
              </div>
              <div className="flex w-[50%] flex-col space-y-2">
                <Label htmlFor="time-to" className="text-gray-500">à :</Label>
                <Input
                  type="time"
                  id="time-to"
                  placeholder="à"
                  value={timeTo}
                  onChange={handleTimeToChange}
                />
              </div>
            </div>
          </div>
          <Select value={selectedVertical} onValueChange={setSelectedVertical} >
            <SelectTrigger id="vertical">
              <SelectValue placeholder="Select vertical" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent side="bottom">
              {verticals.map((vertical) => (
                <SelectItem key={vertical.vertical_id} value={vertical.vertical_id}>
                  {vertical.vertical_code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSource} onValueChange={setSelectedSource} disabled={!selectedVertical}>
            <SelectTrigger id="source">
              <SelectValue placeholder="Source" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent position="popper">
              {sources.map((source) => (
                <SelectItem key={source.source_id} value={source.source_id}>
                  {source.source_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleRecalculate} style={{ backgroundColor: "#5D87FF" }}>Recalculer</Button>
      </CardFooter>
    </Card>
  );
}
