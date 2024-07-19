import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../Data/pagination";

interface Props {
  metaData: MetaData;
  onChangePage: (page: number) => void;
}

export default function PaginationApp({ metaData, onChangePage }: Props) {
  const { currentPageNum, totalCount, totalPage, pageSize } = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPageNum - 1) * pageSize + 1}-
        {currentPageNum * pageSize > totalCount
          ? totalCount
          : currentPageNum * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPage}
        page={currentPageNum}
        onChange={(_e, page) => onChangePage(page)}
      />
    </Box>
  );
}
