import { useCallback, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";

interface Props extends UseControllerProps {}

export default function MyDropzone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      field.onChange(fileWithPreview);
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FormControl error={!!fieldState.error}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
          borderRadius: "4px",
          width: "100%", // Ensures the dropzone is full width
          boxSizing: "border-box", // Ensures padding is included in width calculation
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {fieldState.error && (
        <FormHelperText>{fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  );
}
