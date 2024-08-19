import Selection from "@/components/pioche/Selection";
import Leads_Log from "@/components/pioche/Leads_Log";
import Statistique from "@/components/pioche/Statistique";
export default function Page() {
  return (
    <main className="flex flex-col justify-between p-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Selection />
        </div>
        <div className="col-span-9">
          <Statistique />
        </div>
        <div className="col-span-12">
          <Leads_Log />
        </div>
      </div>
    </main>
  );
}
