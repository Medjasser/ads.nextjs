"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props<T> = {
  data: T[];
  keys: {
    value: keyof T | string;
    label: keyof T | string;
  };
  state: T;
  setState: (state: T) => void;
};

export function SelectAutocomplete<T extends { [key: string]: any }>({
  data,
  keys,
  state,
  setState,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    state[keys.value] === 0 ? 1 : state[keys.value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="input"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? data.find((item) => item[keys.value] === value)?.[keys.label]
            : "Selectionner ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher ..." />
          <CommandList>
            <CommandEmpty>Aucun résultat.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item[keys.value]}
                  value={item[keys.value]}
                  onSelect={() => {
                    setValue(item[keys.value] === value ? 1 : item[keys.value]);
                    // Convertir l'objet en une forme sérialisable
                    const serializableItem = JSON.parse(JSON.stringify(item));
                    setState(serializableItem);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item[keys.value] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item[keys.label]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
