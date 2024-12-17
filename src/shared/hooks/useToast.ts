import { VariantType, useSnackbar } from 'notistack';

export function useToast(variant: VariantType = 'success') {
  const { enqueueSnackbar } = useSnackbar();

  return (msg: string, v = variant) => {
    enqueueSnackbar(msg, { variant: v })
  }
}