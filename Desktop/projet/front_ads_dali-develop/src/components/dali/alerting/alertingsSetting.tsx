"use client";
import React from "react";
import Alertingdali from "./alertingdali";
import { AlertingdaliClient } from "@/services/api/alertingdaliClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "react-query";
import Loader from "@/components/layout/loader";

const flowClient = new AlertingdaliClient(
  process.env.NEXT_PUBLIC_BASE_URL || "",
  new Headers()
);

function AlertingsSetting() {
  const vertical = useSelector((state: RootState) => state.vertical);
  const verticalId = vertical.vertical_id;

  //usequery
  const { isLoading, data: dataAlerting } = useQuery(
    "alerting",
    () => flowClient.checkFlowByVerticalId(verticalId),
    {
      enabled: !!verticalId,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" space-y-4">
      {/* -- Check Flow */}
      {dataAlerting.length > 0 && (
        <Alertingdali
          title="Aucun flux par défaut n'est setup !"
          description={
            "Aller à la page 'Gestion des flux' pour configurer vos flux."
          }
        />
      )}

      {/* -- Check Optin */}
      <Alertingdali
        title="Aucun Opt-in n'est setup !"
        description={
          "Aller à la page 'Gestion des optins' pour configurer vos optins."
        }
      />
    </div>
  );
}

export default AlertingsSetting;
