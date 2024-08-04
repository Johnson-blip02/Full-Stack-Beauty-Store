import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import { Product } from "../../Data/product";
import { useEffect } from "react";
import UseProducts from "../../Data/hook/useProducts";
import SelectList from "../../components/SelectList";
import { yupResolver } from "@hookform/resolvers/yup";
import MyDropzone from "../../components/MyDropzone";
import { validationSchema } from "./InventoryValidation";
import agent from "../../router/api/agent";
import { useAppDispatch } from "../../util/configureStore";
import { setProduct } from "../../components/slice/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
  product?: Product;
  cancelChange: () => void;
}

export default function InventoryForm({ product, cancelChange }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver<any>(validationSchema),
  });
  const { category, brands } = UseProducts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  async function handleSubmitFile(data: FieldValues) {
    try {
      let response: Product;
      if (product) {
        response = await agent.Invent.updateProduct(data);
      } else {
        response = await agent.Invent.createProduct(data);
      }
      dispatch(setProduct(response));
      cancelChange();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitFile)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectList
              control={control}
              items={brands}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectList
              control={control}
              items={category}
              name="category"
              label="Category"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="stockQuantity"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <MyDropzone control={control} name="file" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelChange} variant="contained" color="inherit">
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
