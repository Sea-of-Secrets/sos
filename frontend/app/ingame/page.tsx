import IngameClient from "./IngameClient";

// TODO: 나중에 page를 ...slug 처리한 다음에 <IngameClient /> props로 넘겨야한다...
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <IngameClient gameId="123" />
    </main>
  );
}
