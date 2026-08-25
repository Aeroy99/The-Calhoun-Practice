"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import React, { useState } from "react";

export function PasskeyLogin() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function signIn() {
    setError("");
    setPending(true);
    try {
      const optionsRes = await fetch("/api/passkeys/authentication-options", {
        method: "POST",
        credentials: "include",
      });
      const options = await optionsRes.json();
      if (!optionsRes.ok) {
        throw new Error(options.error || "Could not start passkey login");
      }

      const credential = await startAuthentication({ optionsJSON: options });
      const verifyRes = await fetch("/api/passkeys/authenticate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, challenge: options.challenge }),
      });
      const result = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(result.error || "Passkey login failed");
      }
      window.location.assign("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Passkey login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button
        type="button"
        onClick={() => void signIn()}
        disabled={pending}
        className="btn btn--style-secondary"
      >
        {pending ? "Waiting for passkey…" : "Sign in with passkey"}
      </button>
      {error ? (
        <p style={{ color: "var(--theme-error-500)", marginTop: 8 }}>{error}</p>
      ) : (
        <p style={{ marginTop: 8, opacity: 0.75 }}>
          Use a device passkey after you have registered one on your account.
        </p>
      )}
    </div>
  );
}
