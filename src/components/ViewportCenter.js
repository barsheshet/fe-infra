/** @jsx jsx */
import { jsx } from "@emotion/core";

export const ViewportCenter = ({ children }) => {
  return (
    <div
      css={{
        position: "relative",
        height: "100vh",
      }}
    >
      <div
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
