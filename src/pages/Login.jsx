import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../context/FakeAuthContext";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  const { login } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [attempts, setAttempts] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      setAttempts(() => attempts + 1);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {attempts > 0 ? (
          <p style={{ color: "white", fontSize: "16px" }}>
            {`User or password cannot be authenticated. ${attempts} failed attempt.`}
          </p>
        ) : (
          ""
        )}

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
