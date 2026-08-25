"use client";

import { startRegistration } from "@simplewebauthn/browser";
import React, { useState } from "react";

export function PasskeyManager() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function registerPasskey() {
    setMessage("");
    setPending(true);
    try {
      const optionsRes = await fetch("/api/passkeys/registration-options", {
        method: "POST",
        credentials: "include",
      });
      const options = await optionsRes.json();
      if (!optionsRes.ok) {
        throw new Error(options.error || "Could not start passkey setup");
      }

      const credential = await startRegistration({ optionsJSON: options });
      const label = window.prompt("Name this passkey", "My passkey") || "Passkey";
      const verifyRes = await fetch("/api/passkeys/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, label }),
      });
      const result = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(result.error || "Could not save passkey");
      }
      setMessage("Passkey saved. You can use it on the /admin login screen.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Passkey setup failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <p style={{ marginBottom: 8 }}>
        Add a device passkey (Windows Hello, iCloud Keychain, or a hardware key)
        so you can sign in without typing your password.
      </p>
      <button
        type="button"
        className="btn btn--style-primary"
        disabled={pending}
        onClick={() => void registerPasskey()}
      >
        {pending ? "Waiting for device…" : "Register a passkey"}
      </button>
      {message ? <p style={{ marginTop: 8 }}>{message}</p> : null}
    </div>
  );
}
