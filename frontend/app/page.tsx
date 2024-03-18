import Link from "next/link";
import style from "./page.module.scss";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={style.background}></div>
      <Link className="button" href="/ingame">
        인게임 테스트 페이지로 click!
      </Link>
      <Link className="button" href="/room">
        대기방으로
      </Link>
      <Link href="http://localhost:8080/oauth2/authorization/naver">
        naver login
      </Link>
      <Link href="http://localhost:8080/oauth2/authorization/kakao">
        kakao login
      </Link>
      <Link href="http://localhost:8080/oauth2/authorization/google">
        google login
      </Link>
      <Link href="http://localhost:8080/nft">
        nft 관련 링크
      </Link>
    </main>
  );
}
