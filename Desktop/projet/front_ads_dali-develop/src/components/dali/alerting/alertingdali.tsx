import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

type AlertingdaliProps = {
  title: string;
  description: string;
};

const Alertingdali = ({ title, description }: AlertingdaliProps) => {
  return (
    <Alert variant={"destructive"}>
      <TriangleAlertIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Alertingdali;
