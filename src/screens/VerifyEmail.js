import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { verifyEmail as verifyEmailMutation } from "../api";
import { CenteredSpiner } from "../components/CenteredSpiner";

export function VerifyEmail() {
  const [success, setSuccess] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [verifyEmail] = useMutation(verifyEmailMutation, {
    onSuccess: () => setSuccess(true),
    onError: () => setSuccess(false),
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    } else {
      setSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (success === null) {
    return <CenteredSpiner />;
  }

  return (
    <Result
      status={success ? "success" : "error"}
      title={
        success ? "Succesfully Verified Email" : "Was Unable To Verify Email"
      }
      subTitle={
        success
          ? null
          : "This email is already verified or the link had expired"
      }
      extra={[
        <Button
          key="action"
          type="primary"
          onClick={() => history.replace("/")}
        >
          Go To App
        </Button>,
      ]}
    />
  );
}
