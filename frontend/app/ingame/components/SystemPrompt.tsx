import styles from "./SystemPrompt.module.scss";
import clsx from "clsx";
import { useSystemPrompt } from "~/app/ingame/hooks/useSystemPrompt";

// TODO: FooterMessage에는 리액트 컴포넌트가 들어와야할 것 같은...?
export default function SystemPrompt() {
  const { headerMessage, footerMessage } = useSystemPrompt();

  return (
    <div className={clsx(styles.container)}>
      <div
        className={clsx(
          styles.systemPromptContainer,
          styles.systemPromptHeaderContainer,
        )}
      >
        {headerMessage && (
          <div className={clsx(styles.systemPrompt, styles.systemPromptHeader)}>
            {headerMessage}
          </div>
        )}
      </div>
      <div
        className={clsx(
          styles.systemPromptContainer,
          styles.systemPromptFooterContainer,
        )}
      >
        {footerMessage && (
          <div className={clsx(styles.systemPrompt, styles.systemPromptFooter)}>
            {footerMessage}
          </div>
        )}
      </div>
    </div>
  );
}
