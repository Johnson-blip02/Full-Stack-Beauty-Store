import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { useForm, useFormContext } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import AppCheckBox from "../../components/AppCheckBox";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const { control } = useFormContext();
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <AppTextInput control={control} name="fullName" label="" />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <AppTextInput control={control} name="address1" label="" />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <AppTextInput control={control} name="address2" label="" />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <AppTextInput control={control} name="city" label="" />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <AppTextInput control={control} name="state" label="" />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <AppTextInput control={control} name="zip" label="" />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <AppTextInput control={control} name="country" label="" />
      </FormGrid>
      <FormGrid item xs={12}>
        {/* <AppCheckBox
          name="saveAddress"
          label="Use this address for payment details"
          control={control}
        /> */}
        {/* <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        /> */}
      </FormGrid>
    </Grid>
  );
}

{
  /* <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="John"
          autoComplete="first name"
          required
        /> */
}
