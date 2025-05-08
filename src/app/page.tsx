"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
];

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <PageLayout>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Interactive Counter
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Client Component Example
              </Typography>
              <Typography variant="h4" color="primary" sx={{ my: 3 }}>
                {count}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setCount((c) => c - 1)}>
                Decrease
              </Button>
              <Button size="small" onClick={() => setCount((c) => c + 1)}>
                Increase
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ height: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          Data Grid Example
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </PageLayout>
  );
}
