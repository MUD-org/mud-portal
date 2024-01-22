import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useUser } from '../contexts/UserContext';
import { useAPI } from '../contexts/APIContext';

const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

const RegisterPage: React.FC = () => {
  const api = useAPI();
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  /** Handle the state for birthday selects; they are annoyingly specific */
  const [selectedAgeDay, setSelectedAgeDay] = useState(1);
  const [selectedAgeMonth, setSelectedAgeMonth] = useState(1);
  const [selectedAgeYear, setSelectedAgeYear] = useState(new Date().getFullYear() - 1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('age-year', selectedAgeYear.toString());
    data.set('age-month', selectedAgeMonth.toString());
    data.set('age-day', selectedAgeDay.toString());
    
    // if we have a ?sso=<url> query param, we need to ask for SSO details
    const ssoRedirect = queryParams.get('sso');
    if (ssoRedirect)
      data.set('sso', "true");
    try {
      const loginResponse = await user.register(api, data);
      if (ssoRedirect)
        return navigate(`${ssoRedirect}?sso=${loginResponse.ssoToken}`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
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
                  <InputLabel id="age-month-label" htmlFor="age-month">Month</InputLabel>
                  <Select
                    labelId="age-month-label"
                    id="age-month"
                    label="Month"
                    value={selectedAgeMonth}
                    onChange={(event) => setSelectedAgeMonth(event.target.value)}
                  >
                    {monthNames.map((month: string, index: number) => <MenuItem value={index + 1} key={month}>{month}</MenuItem>)}
                  </Select>
                </FormControl>             
                <FormControl sx={{ minWidth: '6em', marginLeft: '1em', marginRight: '1em' }}>
                  <InputLabel id="age-day-label" htmlFor="age-day">Day</InputLabel>
                  <Select
                    labelId="age-day-label"
                    id="age-day"
                    label="Day"
                    value={selectedAgeDay}
                    onChange={(event) => setSelectedAgeDay(event.target.value)}
                  >
                    {Array.from(Array(31).keys()).map((day: number) => <MenuItem value={day + 1} key={day + 1}>{day + 1}</MenuItem>)}
                  </Select>
                </FormControl>    
                <FormControl sx={{ minWidth: '8em' }}>
                  <InputLabel id="age-year-label" htmlFor="age-year">Year</InputLabel>
                  <Select
                    labelId="age-year-label"
                    id="age-year"
                    label="Year"
                    value={selectedAgeYear}
                    onChange={(event) => setSelectedAgeYear(event.target.value)}
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