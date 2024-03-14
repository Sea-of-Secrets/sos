import Link from "next/link";
import style from "./page.module.scss";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={style.background}></div>
      <Link className="button" style={{ zIndex: 999 }} href="/ingame">
        인게임 테스트 페이지로 click!
      </Link>
      <Link className="button" style={{ zIndex: 999 }} href="/room">
        대기방으로
      </Link>
    </main>
  );
}
