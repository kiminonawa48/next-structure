"use client";
import { useState } from "react";
import { useUsers } from "@/tanstack/queries/useUsers";
import { useCreateUser } from "@/tanstack/mutations/useCreateUser";
import PageLayout from "@/components/layout/PageLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { Person, Email } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: users, isLoading, isError, error } = useUsers();

  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email) {
      createUser({ name, email });
      setName("");
      setEmail("");
    }
  };

  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Users Management
      </Typography>

      <Grid container spacing={3}>
        {/* User creation form */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              Add New User
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />,
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isCreating}
                sx={{ mt: 3, mb: 2 }}
              >
                {isCreating ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Adding User...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Users list */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User List
              </Typography>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : isError ? (
                <Alert severity="error" sx={{ my: 2 }}>
                  Error loading users: {error?.message || "Unknown error"}
                </Alert>
              ) : !users || users.length === 0 ? (
                <Alert severity="info" sx={{ my: 2 }}>
                  No users found. Add your first user!
                </Alert>
              ) : (
                <List>
                  {users.map((user, index) => (
                    <Box key={user.id}>
                      <ListItem alignItems="flex-start">
                        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {user.email}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < users.length - 1 && <Divider component="li" />}
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
