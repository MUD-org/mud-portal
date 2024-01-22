import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

const RegisterPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Display Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: '6em' }}>
                  <InputLabel id="age-month-label">Month</InputLabel>
                  <Select
                    labelId="age-month-label"
                    id="age-month"
                    label="Month"
                  >
                    {monthNames.map((month: string, index: number) => <MenuItem value={index + 1} key={month}>{month}</MenuItem>)}
                  </Select>
                </FormControl>             
                <FormControl sx={{ minWidth: '6em', marginLeft: '1em', marginRight: '1em' }}>
                  <InputLabel id="age-day-label">Day</InputLabel>
                  <Select
                    labelId="age-day-label"
                    id="age-day"
                    label="Day"
                  >
                    {Array.from(Array(31).keys()).map((day: number) => <MenuItem value={day + 1} key={day + 1}>{day}</MenuItem>)}
                  </Select>
                </FormControl>    
                <FormControl sx={{ minWidth: '8em' }}>
                  <InputLabel id="age-year-label">Year</InputLabel>
                  <Select
                    labelId="age-year-label"
                    id="age-year"
                    label="Year"
                  >
                    {Array.from(Array(110).keys())
                      .map(year => new Date().getFullYear() - 110 + year)
                      .reverse()
                      .map((year: number) => <MenuItem value={year} key={year}>{year}</MenuItem>)}
                  </Select>
                  <FormHelperText>Enter your birthday</FormHelperText>
                </FormControl>     
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default RegisterPage;