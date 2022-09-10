import React from "react";

// styles
import { Alert } from "@material-tailwind/react";
function Error({ error, setError }) {
  return (
    <div>
      <Alert
        color={error.color}
        dismissible={{
          onClose: () =>
            setError({
              err: null,
              color: "red",
            }),
        }}
        className=" absolute top-5 -translate-x-1/2 left-1/2 w-1/3 "
      >
        {error.err.message}
      </Alert>
    </div>
  );
}

export default Error;
