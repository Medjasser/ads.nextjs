// Route.tsx
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerWithoutChevron,
} from "../../ui/accordion";
import SubRoute from "./subroute";

type RouteProps = {
  route: {
    name: string;
    path: string;
    icon: any;
    subRoutes?: { name: string; path: string }[];
  };
  activePathname: string;
  isOpen: boolean;
};

const AccordionTrigerComponent = ({
  route,
  activePathname,
  isOpen,
}: RouteProps) => {
  const AccordionTriggerComponent = route.subRoutes
    ? AccordionTrigger
    : AccordionTriggerWithoutChevron;
  return (
    <AccordionTriggerComponent
      className={cn(
        "hover:bg-gray-600 rounded-lg px-4 w-full",
        activePathname === route.path && "bg-gray-600"
      )}
    >
      <Link
        className="flex gap-4 items-center rounded-lg text-sm font-bold w-full"
        href={route.path}
      >
        <route.icon className="w-6 h-6" />
        {isOpen && <p>{route.name}</p>}
      </Link>
    </AccordionTriggerComponent>
  );
};

const Route = ({ route, activePathname, isOpen }: RouteProps) => (
  <AccordionItem value="item-1">
    <AccordionTrigerComponent
      route={route}
      activePathname={activePathname}
      isOpen={isOpen}
    />
    {route.subRoutes &&
      isOpen &&
      route.subRoutes.map((subRoute: { name: string; path: string }) => (
        <SubRoute
          key={subRoute.path}
          subRoute={subRoute}
          activePathname={activePathname}
        />
      ))}
  </AccordionItem>
);

export default Route;
