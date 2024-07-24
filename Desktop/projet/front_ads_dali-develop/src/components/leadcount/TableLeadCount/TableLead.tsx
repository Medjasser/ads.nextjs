import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from 'sweetalert2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL, api_version } from '../../../app/dashboard/utmstats/config/config';
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default async function TableLead({ selectedVerticalId, selectedDateFrom, selectedDateTo, onDataUpdate }) {
  const [tableData, setTableData] = useState([]);
  async function fetchTableData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available');
      }

      const accessToken = JSON.parse(token).access_token;
      const formdata = new FormData();
      formdata.append('Hipto-Authorization', accessToken);

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch(
        `${BASE_URL}/${api_version}/report/socialNetworks?vertical_id=${selectedVerticalId}&from=${selectedDateFrom}&to=${selectedDateTo}`,
        requestOptions,
      );

      const responseData = await response.json();
      const dataArray = Array.isArray(responseData) ? responseData : [responseData];

      onDataUpdate(dataArray);
      setTableData(dataArray);
    } catch (error) {
      handleError(error);
    }
  }
  const handleError = (error) => {
    Swal.fire({
      icon: 'error',
      text: 'Erreur lors de la récupération des données ! ',
      width: '30%',
      confirmButtonText: "Ok, j'ai compris!",
      confirmButtonColor: '#0095E8',
    });
    setError('Erreur lors de la récupération des données.');
  };
  return (
    <div className="pt-8">
      <Tabs defaultValue="canal">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="canal">Par Canal</TabsTrigger>
          <TabsTrigger value="Plateform">Par Ad Plateform</TabsTrigger>
        </TabsList>
        <TabsContent value="canal">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ITEM</TableHead>
                <TableHead>LEAD</TableHead>
                <TableHead>CPL</TableHead>
                <TableHead>DEPENCES</TableHead>
                <TableHead>TX MARGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Plateform">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ITEM</TableHead>
                <TableHead>LEAD</TableHead>
                <TableHead>CPL</TableHead>
                <TableHead>DEPENCES</TableHead>
                <TableHead>TX MARGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
