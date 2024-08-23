"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileSymlink, Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Vertical {
  vertical_id: string;
  vertical_code: string;
}

interface SelectionBarProps {
  onRecalculate: (selectedVertical: Vertical, dateRange: { from: Date; to: Date }) => void;
  className?: string;
}

export default function SelectionBar({ className, onRecalculate }: SelectionBarProps) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: today,
  });
  const [verticals, setVerticals] = React.useState<Vertical[]>([]);
  const [selectedVertical, setSelectedVertical] = React.useState<Vertical | undefined>();

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

  const handleRecalculate = () => {
    if (selectedVertical && date?.from && date?.to) {
      const formattedFromDate = format(date.from, 'yyyy-MM-dd');
      const formattedToDate = format(date.to, 'yyyy-MM-dd');
      const fromDate = new Date(formattedFromDate);
      const toDate = new Date(formattedToDate);
      
      onRecalculate(selectedVertical, { from: fromDate, to: toDate });
    } else {
      alert("Please select a vertical and a date range.");
    }
  };
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4", className)}>
      <Select onValueChange={(value) => setSelectedVertical(verticals.find(v => v.vertical_id === value))}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a vertical" />
        </SelectTrigger>
        <SelectContent>
          {verticals.map((vertical) => (
            <SelectItem key={vertical.vertical_id} value={vertical.vertical_id}>
              {vertical.vertical_code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
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
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Button style={{ backgroundColor: "#5D87FF" }} onClick={handleRecalculate}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Recalculer
        </Button>
        <Button style={{ backgroundColor: "#22b16e" }}>
          <FileSymlink className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
}
