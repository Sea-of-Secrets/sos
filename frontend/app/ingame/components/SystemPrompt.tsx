import styles from "./SystemPrompt.module.scss";

import clsx from "clsx";

import { useSystemPrompt } from "~/app/ingame/stores/useSystemPrompt";

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
