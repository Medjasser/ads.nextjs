"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dialog, Switch } from "@headlessui/react";
import React from "react";
// Importation des images
import Image from "next/image";
import reglages from "/images/logos/Réglages.png";
const NestedTable = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [activeRows, setActiveRows] = useState<{ [key: string]: boolean }>({});
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Facebook");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [enabledPlatforms, setEnabledPlatforms] = useState<string[]>([
    "Facebook",
    "Google",
    "Outbrain",
    "Snapchat",
    "Taboola",
    "Tiktok",
    "Bing",
  ]);

  const platforms = [
    { name: "Facebook", logo: "/images/logos/facebook.png" },
    { name: "Google", logo: "/images/logos/google.png" },
    { name: "Outbrain", logo: "/images/logos/outbrain.png" },
    { name: "Snapchat", logo: "/images/logos/snapchat.png" },
    { name: "Taboola", logo: "/images/logos/taboola.png" },
    { name: "Tiktok", logo: "/images/logos/tiktok.jpg" },
    { name: "Bing", logo: "/images/logos/bing.png" },
  ];
  const reglagesLogo = "/images/logos/Réglages.png";
  const handleRowClick = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggle = (id: string) => {
    setActiveRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const togglePlatform = (platform: string) => {
    setEnabledPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Data structure
  type SubSubData = {
    id: string;
    name: string;
    ad: string;
    lead: number;
    depenses: number;
    cpl: number;
    ctr: number;
    cpm: number;
    tc: number;
  };

  type SubData = {
    id: string;
    name: string;
    adset: string;
    lead: number;
    depenses: number;
    cpl: number;
    ctr: number;
    cpm: number;
    tc: number;
    subSubData: SubSubData[];
  };

  type DataItem = {
    id: string;
    platform: string;
    name: string;
    campaign: string;
    lead: number;
    depenses: number;
    cpl: number;
    ctr: number;
    cpm: number;
    tc: number;
    subData: SubData[];
  };

  const data: DataItem[] = [
    // Sample data with different platforms
    {
      id: "1",
      platform: "Facebook",
      name: "BEL_INS_DOG",
      campaign: "VOLUME_02/08",
      lead: 18,
      depenses: 223.28,
      cpl: 12.8,
      ctr: 13.8,
      cpm: 14.8,
      tc: 15.8,
      subData: [
        {
          id: "1.1",
          name: "BEL_DOG",
          adset: "20 - 65 +",
          lead: 20,
          depenses: 255.79,
          cpl: 20.57,
          ctr: 11.8,
          cpm: 11.8,
          tc: 11.8,
          subSubData: [
            {
              id: "1.1.1",
              name: "BEL_DOG_",
              ad: "IMG--AGE--STD--WIN_COULO...",
              lead: 18,
              depenses: 249.06,
              cpl: 13.84,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
            {
              id: "1.1.2",
              name: "BEL_DOG",
              ad: "IMG--ARG--STD--MAX_ARGUM...",
              lead: 1,
              depenses: 2.55,
              cpl: 2.55,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      platform: "Facebook",
      name: "BEL_INS_DOG",
      campaign: "VOLUME_02/08",
      lead: 18,
      depenses: 222.28,
      cpl: 13.8,
      ctr: 15.8,
      cpm: 10.8,
      tc: 9.8,
      subData: [
        {
          id: "2.1",
          name: "BEL_DOG",
          adset: "20 - 65 +",
          lead: 20,
          depenses: 255.79,
          cpl: 20.57,
          ctr: 11.8,
          cpm: 11.8,
          tc: 11.8,
          subSubData: [
            {
              id: "2.1.1",
              name: "BEL_DOG_",
              ad: "IMG--AGE--STD--WIN_COULO...",
              lead: 18,
              depenses: 249.06,
              cpl: 13.84,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
            {
              id: "2.1.2",
              name: "BEL_DOG",
              ad: "IMG--ARG--STD--MAX_ARGUM...",
              lead: 1,
              depenses: 2.55,
              cpl: 2.55,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      platform: "Google",
      name: "BEL_INS_DOG",
      campaign: "VOLUME_02/08",
      lead: 19,
      depenses: 224.28,
      cpl: 11.8,
      ctr: 11.8,
      cpm: 11.8,
      tc: 11.8,
      subData: [
        {
          id: "2.1",
          name: "BEL_DOG",
          adset: "20 - 65 +",
          lead: 20,
          depenses: 255.79,
          cpl: 20.57,
          ctr: 11.8,
          cpm: 11.8,
          tc: 11.8,
          subSubData: [
            {
              id: "2.1.1",
              name: "BEL_DOG_",
              ad: "IMG--AGE--STD--WIN_COULO...",
              lead: 18,
              depenses: 249.06,
              cpl: 13.84,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
            {
              id: "2.1.2",
              name: "BEL_DOG",
              ad: "IMG--ARG--STD--MAX_ARGUM...",
              lead: 1,
              depenses: 2.55,
              cpl: 2.55,
              ctr: 11.8,
              cpm: 11.8,
              tc: 11.8,
            },
          ],
        },
      ],
    },
  ];

  // Filter data based on selected platform
  const filteredData = data.filter(
    (item) => item.platform === selectedPlatform
  );

  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key as keyof DataItem;
        if (a[key] < b[key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key: keyof DataItem) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      {/* Platform Selection */}
      <div className="relative mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-4 right-4 flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <Image
            src={reglagesLogo}
            alt="Réglages"
            className="h-6 w-6"
            width={30}
            height={30}
          />
        </button>
        <div className="flex flex-wrap gap-6 mt-12">
          {platforms
            .filter((platform) => enabledPlatforms.includes(platform.name))
            .map((platform) => (
              <button
                key={platform.name}
                onClick={() => setSelectedPlatform(platform.name)}
                className={`flex flex-col items-center justify-center p-4 w-40 h-38 rounded-lg border transition-all duration-300 shadow-lg hover:scale-105 ${
                  selectedPlatform === platform.name
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="h-8 w-8 mb-2"
                    width={35}
                    height={35}
                  />
                  <span
                    className={`text-lg font-medium ${
                      selectedPlatform === platform.name
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {platform.name}
                  </span>
                </div>
              </button>
            ))}
        </div>

        {/* Settings Modal */}
        <Dialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl transform transition-all duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Select Platforms
            </h2>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-gray-700 font-medium">
                    {platform.name}
                  </span>
                  <Switch
                    checked={enabledPlatforms.includes(platform.name)}
                    onChange={() => togglePlatform(platform.name)}
                    className={`${
                      enabledPlatforms.includes(platform.name)
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    } relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300`}
                  >
                    <span
                      className={`${
                        enabledPlatforms.includes(platform.name)
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300`}
                    />
                  </Switch>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </Dialog>

        <div className="mt-6">
          <Table className="min-w-full table-auto">
            {/* Table headers */}
            <TableRow className="bg-gradient-to-b from-orange-600 to-orange-500 border-b border-white text-white">
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-left">
                Name Account
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                ON/OFF
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                Id
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                Campaign
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                Lead
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                <button onClick={() => requestSort("depenses")}>
                  DEPENSES (€)
                  {sortConfig?.key === "depenses"
                    ? sortConfig.direction === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </button>
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                <button onClick={() => requestSort("cpl")}>
                  CPL (€)
                  {sortConfig?.key === "cpl"
                    ? sortConfig.direction === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </button>
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                <button onClick={() => requestSort("ctr")}>
                  CTR (€)
                  {sortConfig?.key === "ctr"
                    ? sortConfig.direction === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </button>
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                <button onClick={() => requestSort("cpm")}>
                  CPM (€)
                  {sortConfig?.key === "cpm"
                    ? sortConfig.direction === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </button>
              </TableCell>
              <TableCell className="w-1/5 px-4 py-2 font-semibold text-center">
                <button onClick={() => requestSort("tc")}>
                  TC (€)
                  {sortConfig?.key === "tc"
                    ? sortConfig.direction === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : null}
                </button>
              </TableCell>
            </TableRow>

            <TableBody>
              {sortedData.map((item) => (
                <>
                  <React.Fragment key={item.id}>
                    <TableRow className="bg-gradient-to-b from-red-100 to-red-50 border-b border-white">
                      <TableCell className="px-4 py-2 font-semibold text-left">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRowClick(item.id)}
                            className="flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white focus:outline-none"
                          >
                            {openRows[item.id] ? (
                              <span className="block w-2 h-0.5 bg-white"></span> // Signe "-"
                            ) : (
                              <span className="relative block w-2 h-2">
                                <span className="absolute inset-0 w-0.5 bg-white top-0 bottom-0 m-auto"></span>
                                <span className="absolute inset-0 h-0.5 bg-white left-0 right-0 m-auto"></span>
                              </span> // Signe "+"
                            )}
                          </button>
                          <span className="ml-2 text-red-700">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border-b border-white px-4 py-2 text-center">
                        <Switch
                          checked={activeRows[item.id]}
                          onChange={() => handleToggle(item.id)}
                          className={`${
                            activeRows[item.id] ? "bg-green-500" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              activeRows[item.id]
                                ? "translate-x-6"
                                : "translate-x-1"
                            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                          />
                        </Switch>
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.id}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.campaign}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.lead}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.depenses}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        <span
                          className={`px-2 py-1 rounded ${
                            item.cpl > 13.0
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {item.cpl}€
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.ctr}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.cpm}
                      </TableCell>
                      <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                        {item.tc}
                      </TableCell>
                    </TableRow>

                    {/* SubData Rows */}
                    {openRows[item.id] && (
                      <>
                        {/* New Level 2 Header */}
                        <TableRow className="bg-gradient-to-b from-blue-600 to-blue-500 text-white border-b border-white">
                          <TableCell className="pl-8 py-2 font-semibold text-left">
                            Name
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            ON/OFF
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            Id
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            Ad Set
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            Lead
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            DEPENSES (€)
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            CPL (€)
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            CTR (€)
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            CPM (€)
                          </TableCell>
                          <TableCell className="pl-8 py-2 font-semibold text-center">
                            TC (€)
                          </TableCell>
                        </TableRow>

                        {item.subData.map((subItem) => (
                          <React.Fragment key={subItem.id}>
                            <TableRow className="bg-gradient-to-b from-blue-200 to-blue-100 border-b border-white">
                              <TableCell className="border-b border-white px-4 py-2 pl-8 text-left">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => handleRowClick(subItem.id)}
                                    className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white focus:outline-none"
                                  >
                                    {openRows[subItem.id] ? (
                                      <span className="block w-2 h-0.5 bg-white"></span> // Signe "-"
                                    ) : (
                                      <span className="relative block w-2 h-2">
                                        <span className="absolute inset-0 w-0.5 bg-white top-0 bottom-0 m-auto"></span>
                                        <span className="absolute inset-0 h-0.5 bg-white left-0 right-0 m-auto"></span>
                                      </span> // Signe "+"
                                    )}
                                  </button>
                                  <span className="font-bold ml-2 text-blue-700 text-center">
                                    {subItem.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-red-700 text-center">
                                <Switch
                                  checked={activeRows[subItem.id]}
                                  onChange={() => handleToggle(subItem.id)}
                                  className={`${
                                    activeRows[subItem.id]
                                      ? "bg-green-500"
                                      : "bg-gray-200"
                                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                  <span
                                    className={`${
                                      activeRows[subItem.id]
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                                  />
                                </Switch>
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.id}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.adset}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.lead}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.depenses}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                <span
                                  className={`px-2 py-1 rounded ${
                                    subItem.cpl > 13.0
                                      ? "bg-red-500 text-white"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  {subItem.cpl}€
                                </span>
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.ctr}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.cpm}
                              </TableCell>
                              <TableCell className="px-4 py-2 font-bold text-blue-700 text-center">
                                {subItem.tc}
                              </TableCell>
                            </TableRow>

                            {/* SubSubData Rows */}
                            {openRows[subItem.id] && (
                              <>
                                {/* New Level 3 Header */}
                                <TableRow className="bg-gradient-to-b from-yellow-500 to-yellow-500 text-white border-b border-white">
                                  <TableCell className="pl-12 py-2 font-semibold text-left">
                                    Name
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    ON/OFF
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    Id
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    Ad
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    Lead
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    DEPENSES (€)
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    CPL (€)
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    CTR (€)
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    CPM (€)
                                  </TableCell>
                                  <TableCell className="pl-12 py-2 font-semibold text-center">
                                    TC (€)
                                  </TableCell>
                                </TableRow>

                                {subItem.subSubData.map((subSubItem) => (
                                  <TableRow
                                    key={subSubItem.id}
                                    className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b border-white"
                                  >
                                    <TableCell className="border-b border-white px-4 py-2 pl-12 text-left">
                                      {subSubItem.name}
                                    </TableCell>
                                    <TableCell className="border-b border-white px-4 py-2 text-center">
                                      <Switch
                                        checked={activeRows[subSubItem.id]}
                                        onChange={() =>
                                          handleToggle(subSubItem.id)
                                        }
                                        className={`${
                                          activeRows[subSubItem.id]
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                      >
                                        <span
                                          className={`${
                                            activeRows[subSubItem.id]
                                              ? "translate-x-6"
                                              : "translate-x-1"
                                          } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                                        />
                                      </Switch>
                                    </TableCell>
                                    <TableCell className="px-8 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.id}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.ad}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.lead}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.depenses}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      <span
                                        className={`px-2 py-1 rounded ${
                                          subSubItem.cpl > 13.0
                                            ? "bg-red-500 text-white"
                                            : "bg-green-500 text-white"
                                        }`}
                                      >
                                        {subSubItem.cpl}€
                                      </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.ctr}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.cpm}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 font-bold text-yellow-700 text-center">
                                      {subSubItem.tc}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default NestedTable;
