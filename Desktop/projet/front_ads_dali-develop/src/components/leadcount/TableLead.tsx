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
                <TableRow >
                  <TableCell className="font-medium">
                  </TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
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
                <TableRow >
                  <TableCell className="font-medium">
                    {}
                  </TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
