import React from "react";
import { usePathname } from "next/navigation";
import { BarChart3Icon, FilterIcon, PickaxeIcon } from "lucide-react";
import { Accordion } from "../../ui/accordion";
import Route from "./route";

const Routes = [
  {
    name: "UTM stats",
    path: "", 
    icon: BarChart3Icon,
    subRoutes: [
      {
        name: "Lead Count",
        path: "/dashboard/utmstats/leadcount",
      },
      {
        name: "Ad Platform",
        path: "/dashboard/utmstats/adplatform",
      },
    ],
  },
  {
    name: "Pioche",
    path: "/dashboard/pioche",
    icon: PickaxeIcon,
  },
  {
    name: "DALI",
    path: "/dali/settings",
    icon: FilterIcon,
    subRoutes: [
      {
        name: "Configuration",
        path: "/dali/settings",
      },
      {
        name: "Dashboard",
        path: "/dali/dashboard",
      },
      {
        name: "Gestion des flux",
        path: "/dali/flowmanagement",
      },
    ],
  },
];

const NavigationList = ({ isOpen }: { isOpen: boolean }) => {
  const activePathname = usePathname();
  return (
    <div className="  mt-12">
      <Accordion className="flex flex-col gap-2" type="single" collapsible>
        {Routes.map((route) => (
          <Route
            key={route.name + route.path}
            route={route}
            activePathname={activePathname}
            isOpen={isOpen}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default NavigationList;
