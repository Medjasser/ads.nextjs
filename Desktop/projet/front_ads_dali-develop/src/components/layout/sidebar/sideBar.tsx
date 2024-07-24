import Image from "next/image";
import React, { useState } from "react";
import NavigationList from "./navigationList";
import { ChevronsRightIcon, ChevronsLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={cn(
        "relative sidebar bg-[#111727] text-white px-4 pt-8 min-h-screen transition-all duration-300 ease-in-out",
        isOpen ? "w-60" : "w-24"
      )}
    >
      {/* Toggle Sidebar */}
      <ToogleSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Logo /Title */}
      <div className="flex items-start gap-1">
        <Image
          className=" rounded-md"
          src="/logo_hipto.ico"
          alt="logo"
          width={40}
          height={40}
        />
        <TitleSidebar isOpen={isOpen} />
      </div>
      {/* Barre Horizontale */}
      <div className="h-[1px] bg-gray-400 my-4"></div>
      {/* Menu */}
      <NavigationList isOpen={isOpen} />
    </aside>
  );
};

export default SideBar;

const ToogleSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute -right-4 bg-white rounded-lg shadow-md">
      <button className="p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <ChevronsLeftIcon color="black" size={24} />
        ) : (
          <ChevronsRightIcon color="black" size={24} />
        )}
      </button>
    </div>
  );
};

const TitleSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      {isOpen ? (
        <p className=" font-medium text-xs">
          Growth Marketing <br /> Plateform
        </p>
      ) : (
        <p></p>
      )}
    </>
  );
};
