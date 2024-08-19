import SelectionBar from "@/components/leadcount/SelectionBar";
import Stat from "@/components/leadcount/Stat";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


export default function Page() {
  return (
    <main className="flex flex-col justify-between p-10">
      <span className="font-bold pb-2">Lead Count</span>
      <SelectionBar />
      <div className="pt-8">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Lead Count</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
              <Stat />
              <Card className="col-span-2">
        <CardContent className="space-y-2">
        </CardContent>
      </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
