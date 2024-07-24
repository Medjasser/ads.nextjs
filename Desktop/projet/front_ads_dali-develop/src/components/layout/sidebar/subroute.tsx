// SubRoute.tsx
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import { AccordionContent } from "../../ui/accordion";

type SubRouteProps = {
  subRoute: {
    name: string;
    path: string;
  };
  activePathname: string;
};

const SubRoute = ({ subRoute, activePathname }: SubRouteProps) => (
  <AccordionContent>
    <ul className="flex mt-1 flex-col">
      <li
        key={subRoute.name}
        className={cn(
          "flex items-center text-sm  hover:bg-gray-700 rounded-lg pl-6  py-3",
          activePathname === subRoute.path && "bg-gray-700 font-bold"
        )}
      >
        <DotIcon className="w-4 h-4" />
        <Link href={subRoute.path}>{subRoute.name}</Link>
      </li>
    </ul>
  </AccordionContent>
);

export default SubRoute;
