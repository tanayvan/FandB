import React from "react";

function ErrorText({ error, visible }) {
  if (!visible || !error) {
    return null;
  }
  return <div style={{ color: "red" }}>{error}</div>;
}

export default ErrorText;
