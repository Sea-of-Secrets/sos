import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link className="button" href="/ingame">
        인게임 테스트 페이지로 click!
      </Link>

      <a href="http://localhost:8080/oauth2/authorization/naver">naver login</a>
      <a href="http://localhost:8080/oauth2/authorization/kakao">kakao login</a>
      <a href="http://localhost:8080/oauth2/authorization/google">google login</a>
    </main>
  );
}
