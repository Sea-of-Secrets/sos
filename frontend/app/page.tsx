import Link from "next/link";
import styles from "./page.module.scss";
import Client from "./Client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={styles.background}></div>
      <div className={styles.main}>
        <div>
          <Link className="button" href="/room">
            대기방으로
          </Link>
          <Link className="button" href="/users">
            마이페이지
          </Link>
          <a
            className="button"
            href="http://localhost:8080/oauth2/authorization/naver"
          >
            naver login
          </a>
          <a
            className="button"
            href="http://j10a710.p.ssafy.io/login/oauth2/code/kakao"
          >
            kakao login
          </a>
          <a
            className="button"
            href="http://localhost:8080/oauth2/authorization/google"
          >
            google login
          </a>
          <Link className="button" href="/test">
            차린건 없지만 테스트라도...
          </Link>
          <Client />
        </div>
      </div>
    </main>
  );
}
