import Link from "next/link";
import styles from "./page.module.scss";
import Client from "./Client";
import Image from 'next/image';

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
            href="http://localhost:8080/oauth2/authorization/naver"
          >
            <Image 
              src="/images/btnG_완성형.png"
              alt="Naver login"
              width={200}
              height={50}/>
          </a>
          <a
            href="https://j10a710.p.ssafy.io/api/oauth2/authorization/kakao"
          >
            <Image 
              src="/images/kakao_login_medium_narrow.png"
              alt="Kakao login"
              width={200}
              height={50}/>
          </a>
          <a
            href="https://j10a710.p.ssafy.io/api/oauth2/authorization/google"
          >
            <Image 
              src="/images/web_light_sq_ctn@4x.png"
              alt="Google login"
              width={200}
              height={50}/>
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
