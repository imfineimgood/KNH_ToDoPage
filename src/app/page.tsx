import BoardList from "@/components/board/BoardList";
import { PageHeader } from "@/components/home/PageHeader";

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="w-full h-full flex flex-col">
        <PageHeader />
        <BoardList />
      </div>
    </div>
  );
}
