import React from "react";
import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import StatusBar from "./StatusBar";

interface ButtonProp {
  handleSubmit: () => Promise<{
    status: number;
    message: string;
  }>;
  handleReset: () => void;
}

const SubmitnResetButton: React.FC<ButtonProp> = ({
  handleSubmit,
  handleReset,
}) => {
  const [openStatus, setOpen] = useState<boolean>(false);
  const [statusPack, setStatusPack] = useState<
    { status: number; message: string }[]
  >([]);
  const [messageInfo, setMessageInfo] = useState<
    { status: number; message: string } | undefined
  >(undefined);

  useEffect(() => {
    if (statusPack.length && !messageInfo) {
      setMessageInfo({ ...statusPack[0] });
      setStatusPack((prevStatus) => prevStatus.slice(1));
      setOpen(true);
    } else if (statusPack.length && messageInfo && openStatus) {
      setOpen(false);
    } else if (!messageInfo && statusPack.length == 0) {
      setOpen(false);
    }
  }, [messageInfo, statusPack, openStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    setMessageInfo(undefined);
  };

  const handleOnClick = async () => {
    const { status, message } = await handleSubmit();
    setStatusPack((prevStatus) => [...prevStatus, { status, message }]);
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOnClick}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            type="reset"
            onClick={handleReset}
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
      <StatusBar
        open={openStatus}
        onClose={handleClose}
        handleExit={handleExit}
        status={messageInfo ? messageInfo.status : 400}
        message={messageInfo ? messageInfo.message : ""}
      />
    </div>
  );
};

export default SubmitnResetButton;
