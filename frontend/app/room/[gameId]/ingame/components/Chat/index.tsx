import styles from "./index.module.scss";

import Input from "./Input";
import Message from "./Message";

export default function Chat() {
  return (
    <div className={styles.container}>
      <Input />
      <Message />
    </div>
  );
}
