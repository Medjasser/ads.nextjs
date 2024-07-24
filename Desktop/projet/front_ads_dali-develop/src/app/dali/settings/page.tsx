import AlertingsSetting from "@/components/dali/alerting/alertingsSetting";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col py-4 ">
      <h1 className="text-left font-bold mb-4">Configuration</h1>
      <AlertingsSetting />
    </main>
  );
}
