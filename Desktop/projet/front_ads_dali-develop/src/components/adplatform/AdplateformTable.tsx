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
import { Switch } from "@headlessui/react";
import React from "react";
// Importation des images
import Image from 'next/image';

const NestedTable = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [activeRows, setActiveRows] = useState<{ [key: string]: boolean }>({});
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Facebook");
  const platforms = [
    { name: "Facebook", logo: "/images/logos/facebook.png" },
    { name: "Google", logo: "/images/logos/google.png" },
    { name: "Outbrain", logo: "/images/logos/outbrain.png" },
    { name: "Snapchat", logo: "/images/logos/snapchat.png" },
    { name: "Taboola", logo: "/images/logos/taboola.png" },
    { name: "Tiktok", logo: "/images/logos/tiktok.jpg" },
  ];
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
      <div className="mb-4 flex flex-wrap justify-center p-4 border border-gray-300 rounded-lg bg-white shadow-lg">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => setSelectedPlatform(platform.name)}
            className={`flex items-center justify-center px-6 py-3 m-2 w-30 h-15 rounded-lg transition-colors duration-200 ${
              selectedPlatform === platform.name
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Image
              src={platform.logo}
              alt={`${platform.name} logo`}
              className="h-5 w-5 mr-3"
              width={35}
            height={35}
            />
            <span className="text-lg">{platform.name}</span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white table-fixed">
          {/* Table headers */}
          <TableRow className="bg-gray-300">
            <TableCell className="w-1/5 px-4 py-2">Name Account</TableCell>
            <TableCell className="w-1/5 px-4 py-2">ON/OFF</TableCell>
            <TableCell className="w-1/5 px-4 py-2">Id</TableCell>
            <TableCell className="w-1/5 px-4 py-2">Campaign</TableCell>
            <TableCell className="w-1/5 px-4 py-2">Lead</TableCell>
            <TableCell className="w-1/5 px-4 py-2">
              <button onClick={() => requestSort("depenses")}>
                DEPENSES (€)
                {sortConfig?.key === "depenses"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </button>
            </TableCell>
            <TableCell className="w-1/5 px-4 py-2">
              <button onClick={() => requestSort("cpl")}>
                CPL (€)
                {sortConfig?.key === "cpl"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </button>
            </TableCell>
            <TableCell className="w-1/5 px-4 py-2">
              <button onClick={() => requestSort("ctr")}>
                CTR (€)
                {sortConfig?.key === "ctr"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </button>
            </TableCell>
            <TableCell className="w-1/5 px-4 py-2">
              <button onClick={() => requestSort("cpm")}>
                CPM (€)
                {sortConfig?.key === "cpm"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </button>
            </TableCell>
            <TableCell className="w-1/5 px-4 py-2">
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
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  
                >
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                  <button
                    className="flex items-center"
                    onClick={() => handleRowClick(item.id)}
                  >
                    {openRows[item.id] ? (
                      <ChevronDownIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 mr-2" />
                    )}
                    {item.name}
                  </button>
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                  <Switch
                    checked={activeRows[item.id] || false}
                    onChange={() => handleToggle(item.id)}
                    className={`${
                      activeRows[item.id] ? 'bg-green-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        activeRows[item.id] ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.id}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.campaign}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.lead}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.depenses}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.cpl}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.ctr}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.cpm}
                  </TableCell>
                  <TableCell className="border-t border-gray-300 px-4 py-2">
                    {item.tc}
                  </TableCell>
                </TableRow>

                {/* SubData Rows */}
                {openRows[item.id] && (
                  <>
                    {/* New Level 2 Header */}
                    <TableRow className="bg-gray-300">
                      <TableCell className="w-1/5 px-8 py-2">Name</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">ON/OFF</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">Id</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">Ad Set</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">Lead</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">
                        DEPENSES (€)
                      </TableCell>
                      <TableCell className="w-1/5 px-4 py-2">CPL (€)</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">CTR (€)</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">CPM (€)</TableCell>
                      <TableCell className="w-1/5 px-4 py-2">TC (€)</TableCell>
                    </TableRow>

                    {item.subData.map((subItem) => (
                      <React.Fragment key={subItem.id}>
                        <TableRow
                          className="cursor-pointer hover:bg-gray-200 bg-gray-100"
                          
                        >
                          <TableCell className="border-t border-gray-300 px-4 py-2 pl-8">
                          <button
                    className="flex items-center"
                    onClick={() => handleRowClick(subItem.id)}
                  >
                    {openRows[subItem.id] ? (
                      <ChevronDownIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 mr-2" />
                    )}
                    {subItem.name}
                  </button>
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            <Switch
                              checked={!!activeRows[subItem.id]}
                              onChange={() => handleToggle(subItem.id)}
                              className={`${
                                activeRows[subItem.id]
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              } relative inline-flex items-center h-6 rounded-full w-11`}
                            >
                              <span
                                className={`${
                                  activeRows[subItem.id]
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                              />
                            </Switch>
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.id}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.adset}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.lead}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.depenses}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.cpl}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.ctr}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.cpm}
                          </TableCell>
                          <TableCell className="border-t border-gray-300 px-4 py-2">
                            {subItem.tc}
                          </TableCell>
                        </TableRow>

                        {/* SubSubData Rows */}
                        {openRows[subItem.id] && (
                          <>
                            {/* New Level 3 Header */}
                            <TableRow className="bg-gray-300">
                              <TableCell className="w-1/5 px-8 py-2">
                                Name
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                ON/OFF
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                Id
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                Ad
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                Lead
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                DEPENSES (€)
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                CPL (€)
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                CTR (€)
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                CPM (€)
                              </TableCell>
                              <TableCell className="w-1/5 px-4 py-2">
                                TC (€)
                              </TableCell>
                            </TableRow>

                            {subItem.subSubData.map((subSubItem) => (
                              <TableRow
                                key={subSubItem.id}
                                className="cursor-pointer hover:bg-gray-200 bg-gray-200"
                              >
                                <TableCell className="border-t border-gray-300 px-4 py-2 pl-12">
                                  {subSubItem.name}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  <Switch
                                    checked={!!activeRows[subSubItem.id]}
                                    onChange={() => handleToggle(subSubItem.id)}
                                    className={`${
                                      activeRows[subSubItem.id]
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                    } relative inline-flex items-center h-6 rounded-full w-11`}
                                  >
                                    <span
                                      className={`${
                                        activeRows[subSubItem.id]
                                          ? "translate-x-6"
                                          : "translate-x-1"
                                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                                    />
                                  </Switch>
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.id}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.ad}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.lead}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.depenses}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.cpl}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.ctr}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
                                  {subSubItem.cpm}
                                </TableCell>
                                <TableCell className="border-t border-gray-300 px-4 py-2">
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
  );
};

export default NestedTable;
