import { SelectAutocomplete } from "@/components/ui/selectAutocomplete";
import { Vertical } from "@/models/vertical";
import { VerticalClient } from "@/services/api/verticalClient";
import { RootState } from "@/store";
import { setSelectedVertical } from "@/store/verticalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader";
import { useQuery } from "react-query";

const getAllVerticals = async () => {
  const verticalClient = new VerticalClient(
    process.env.NEXT_PUBLIC_BASE_URL || "",
    new Headers()
  );
  const reponse = await verticalClient.getAll();
  return reponse.map((vertical: any) => {
    const newVertical = new Vertical(
      vertical.vertical_id,
      vertical.vertical_repository_abbreviat,
      vertical.bu_abbreviat,
      vertical.ISO3
    );
    return newVertical;
  });
};

export default function VerticalPicker() {
  const dispatch = useDispatch();
  const vertical = useSelector((state: RootState) => state.vertical);

  const { isLoading, data: verticals } = useQuery(
    "verticales",
    getAllVerticals
  );

  const setVertical = (vertical: Vertical) => {
    console.log("vertical", vertical);
    dispatch(setSelectedVertical(vertical));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-xs text-[#A1A5B7] font-medium my-3">Verticales</h1>
      {/* Select Input */}
      <SelectAutocomplete<Vertical>
        data={verticals}
        keys={{ value: "vertical_id", label: "codifiedName" }}
        state={vertical}
        setState={setVertical}
      />
    </div>
  );
}
