"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="data-table-container p-4  rounded-lg ">
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Rechercher..."
          value={(table.getColumn("IDH")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("IDH")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Columns</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-48 overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <span className="capitalize">{column.id}</span>
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="table-container overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="table-scroll-container max-w-full overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    let headerClass = "";
                    if (["IDH", "Date", "Id"].includes(header.column.id)) {
                      headerClass = "bg-[#67b7dc] text-white text-center"; // Plateforme
                    } else if (
                      ["Nom", "Prénom", "Email", "Téléphone"].includes(
                        header.column.id
                      )
                    ) {
                      headerClass = "bg-[#626dd2] text-white text-center"; // Coordonnées
                    } else if (
                      [
                        "date_de_naissance",
                        "code_postal",
                        "animal_age",
                        "race_animal",
                        "vaccins_a_jour",
                        "puce_electronique",
                        "deja_assure",
                        "nom_animal",
                        "chien_ou_chat",
                        "tatouage",
                        "hipto_uid",
                        "ip",
                      ].includes(header.column.id)
                    ) {
                      headerClass = "bg-[#a367dc] text-white text-center"; // Client
                    } else if (
                      [
                        "Canal",
                        "utm_source",
                        "utm_medium",
                        "utm_campaign",
                        "utm_term",
                        "utm_content",
                        "utm_angle",
                      ].includes(header.column.id)
                    ) {
                      headerClass = "bg-[#dc67ab] text-white text-center"; // Marketing
                    }

                    return (
                      <TableHead
                        key={header.id}
                        className={`font-semibold p-2 ${headerClass}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                          ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 rotate-180" />
                          )
                        ) : null}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 transition-all"
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="p-4 border-b border-gray-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default function Statistique() {
  type Lead = {
    IDH: string;
    Date: string;
    Id: string;
    Nom: string;
    Prénom: string;
    Email: string;
    Téléphone: string;
    date_de_naissance: string;
    code_postal: string;
    animal_age: string;
    race_animal: string;
    vaccins_a_jour: boolean;
    puce_electronique: boolean;
    deja_assure: boolean;
    nom_animal: string;
    chien_ou_chat: string;
    tatouage: string;
    hipto_uid: string;
    ip: string;
    Canal: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
    utm_angle: string;
  };

  const columns: ColumnDef<Lead>[] = [
    { accessorKey: "IDH", header: "IDH" },
    { accessorKey: "Date", header: "Date" },
    { accessorKey: "Id", header: "Id" },
    { accessorKey: "Nom", header: "Nom" },
    { accessorKey: "Prénom", header: "Prénom" },
    { accessorKey: "Email", header: "Email" },
    { accessorKey: "Téléphone", header: "Téléphone" },
    { accessorKey: "date_de_naissance", header: "Date de naissance" },
    { accessorKey: "code_postal", header: "Code postal" },
    { accessorKey: "animal_age", header: "Âge de l'animal" },
    { accessorKey: "race_animal", header: "Race de l'animal" },
    { accessorKey: "vaccins_a_jour", header: "Vaccins à jour" },
    { accessorKey: "puce_electronique", header: "Puce électronique" },
    { accessorKey: "deja_assure", header: "Déjà assuré" },
    { accessorKey: "nom_animal", header: "Nom de l'animal" },
    { accessorKey: "chien_ou_chat", header: "Chien ou chat" },
    { accessorKey: "tatouage", header: "Tatouage" },
    { accessorKey: "hipto_uid", header: "Hipto UID" },
    { accessorKey: "ip", header: "IP" },
    { accessorKey: "Canal", header: "Canal" },
    { accessorKey: "utm_source", header: "UTM Source" },
    { accessorKey: "utm_medium", header: "UTM Medium" },
    { accessorKey: "utm_campaign", header: "UTM Campaign" },
    { accessorKey: "utm_term", header: "UTM Term" },
    { accessorKey: "utm_content", header: "UTM Content" },
    { accessorKey: "utm_angle", header: "UTM Angle" },
  ];

  const data: Lead[] = [
    {
      IDH: "869",
      Date: "2024-09-01",
      Id: "1",
      Nom: "Doe",
      Prénom: "John",
      Email: "john.doe@example.com",
      Téléphone: "1234567890",
      date_de_naissance: "1990-01-01",
      code_postal: "12345",
      animal_age: "5",
      race_animal: "Labrador",
      vaccins_a_jour: true,
      puce_electronique: true,
      deja_assure: false,
      nom_animal: "Rex",
      chien_ou_chat: "Chien",
      tatouage: "AB123",
      hipto_uid: "HIP123",
      ip: "192.168.1.1",
      Canal: "Web",
      utm_source: "source",
      utm_medium: "medium",
      utm_campaign: "campaign",
      utm_term: "term",
      utm_content: "content",
      utm_angle: "angle",
    },
    {
      IDH: "456",
      Date: "2024-05-15",
      Id: "2",
      Nom: "Smith",
      Prénom: "Jane",
      Email: "jane.smith@example.com",
      Téléphone: "0987654321",
      date_de_naissance: "1985-12-12",
      code_postal: "54321",
      animal_age: "3",
      race_animal: "Golden Retriever",
      vaccins_a_jour: false,
      puce_electronique: false,
      deja_assure: true,
      nom_animal: "Bella",
      chien_ou_chat: "Chien",
      tatouage: "CD456",
      hipto_uid: "HIP456",
      ip: "192.168.2.2",
      Canal: "Email",
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "spring_sale",
      utm_term: "discount",
      utm_content: "promo",
      utm_angle: "special_offer",
    },
    {
      IDH: "123",
      Date: "2022-05-15",
      Id: "3",
      Nom: "jass",
      Prénom: "mor",
      Email: "jass.mor@example.com",
      Téléphone: "0987654325",
      date_de_naissance: "1988-12-12",
      code_postal: "54355",
      animal_age: "4",
      race_animal: "Retriever",
      vaccins_a_jour: false,
      puce_electronique: false,
      deja_assure: true,
      nom_animal: "Bella",
      chien_ou_chat: "Chien",
      tatouage: "CD456",
      hipto_uid: "HIP456",
      ip: "192.168.2.2",
      Canal: "Email",
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "spring_sale",
      utm_term: "discount",
      utm_content: "promo",
      utm_angle: "special_offer",
    },
  ];

  return (
    <div>
      <Card >
        <CardHeader className=" p-4">
        <CardTitle className="ml-2 mt-2">Leads Log</CardTitle>
        
          <div className="flex gap-4 mt-2 ml-auto">
            <p className="bg-[#67b7dc] text-white px-4 py-1 rounded">
              Plateforme
            </p>
            <p className="bg-[#626dd2] text-white px-4 py-1 rounded">
              Coordonnées
            </p>
            <p className="bg-[#a367dc] text-white px-4 py-1 rounded">Client</p>
            <p className="bg-[#dc67ab] text-white px-4 py-1 rounded">
              Marketing
            </p>
          </div>
          
          
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
