import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm.tsx";
import getCheckoutTheme from "./getCheckoutTheme.tsx";
import PaymentForm from "./PaymentForm.tsx";
import Review from "./Review.tsx";
import ToggleColorMode from "./ToggleColorMode.tsx";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./checkoutValidation.tsx";
import { useState } from "react";
import agent from "../../router/api/agent.ts";
import { useAppDispatch } from "../../util/configureStore.ts";
import { clearCart } from "../cart/cartSlice.ts";
import { LoadingButton } from "@mui/lab";

const steps = ["Shipping address", "Payment details", "Review your order"];

// const logoStyle = {
//   width: "140px",
//   height: "56px",
//   marginLeft: "-4px",
//   marginRight: "-8px",
// };

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CheckoutPage() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // useEffect(() => {
  //   agent.Account.fetchAddress().then((response) => {
  //     if (response) {
  //       methods.reset({
  //         ...methods.getValues(),
  //         ...response,
  //         saveAddress: false,
  //       });
  //     }
  //   });
  // }, [methods]);

  const handleNext = async (data: FieldValues) => {
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (activeStep === steps.length - 1) {
      setLoading(true);
      try {
        const orderNumber = await agent.Orders.create({
          saveAddress,
          shippingAddress,
        });
        setOrderNumber(orderNumber);
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 4,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                height: 150,
              }}
            >
              {/* Removed the Back to Sitemark button */}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              {/* <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} /> */}
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={7}
            lg={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Removed the Back to Sitemark button */}
                <ToggleColorMode
                  mode={mode}
                  toggleColorMode={toggleColorMode}
                />
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                  height: 150,
                }}
              >
                <ToggleColorMode
                  mode={mode}
                  toggleColorMode={toggleColorMode}
                />
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{
                    width: "100%",
                    height: 40,
                  }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card
              sx={{
                display: { xs: "flex", md: "none" },
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ":last-child": { pb: 2 },
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {activeStep >= 2 ? "$144.97" : "$134.98"}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Thank you for your order!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your order number is
                    <strong>&nbsp;{orderNumber}</strong>. We have not emailed
                    your order confirmation and will noy update you once its
                    shipped. Because this is a fake store!
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                //This was React.Fragment
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      justifyContent:
                        activeStep !== 0 ? "space-between" : "flex-end",
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{
                          display: { xs: "none", sm: "flex" },
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{
                          display: { xs: "flex", sm: "none" },
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    <LoadingButton
                      loading={loading}
                      disabled={!methods.formState.isValid}
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      type="submit"
                      sx={{
                        width: { xs: "100%", sm: "fit-content" },
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </LoadingButton>
                  </Box>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </FormProvider>
  );
}
