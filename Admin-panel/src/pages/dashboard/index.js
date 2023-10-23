import { useState, useEffect } from 'react';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import QueryTable from '../queriesPages/QueriesTable';
import IncomeAreaChart from './IncomeAreaChart';
import { useNavigate } from 'react-router-dom';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import GenderChart from './GenderChart';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
 
  const navigate = useNavigate();
  const [slot, setSlot] = useState('week');
  const [totalQueries, setTotalQueries] = useState(0);
  const [resolvedQueries, setResolvedQueries] = useState(0);
  const [unresolvedQueries, setUnResolvedQueries] = useState(0);
  // ==============================|| responsive using window size ||========================//
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
useEffect(() => {
    // Update screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const flexdir= screenWidth < 768 ? 'column' : 'row';
  const widthOfgraph = screenWidth < 768 ? screenWidth*0.92 : screenWidth*0.35;
  useEffect(() => {
    async function fetchData() {
      const jwtTokenData = JSON.parse(localStorage.getItem('authToken'));
      if (!jwtTokenData) navigate('/auth');
      const headers = { Authorization: `Bearer ${jwtTokenData.token}` };
      const data = await fetch('http://127.0.0.1:4000/api/getQueryDetails', { headers });
      const { resQuery, totalQuery, unResQuery } = await data.json();
      setTotalQueries(totalQuery);
      setResolvedQueries(resQuery);
      setUnResolvedQueries(unResQuery);
    }

    fetchData();
  }, []);
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Queries registered" count={totalQueries} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Queries resolved" count={resolvedQueries} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Queries not resolved" count={unresolvedQueries} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Mr safe safety rating" count="78.5" />
        </Grid>

        {/* <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} /> */}
        {/* row 2 */}
        <div style={{display:'flex',flexDirection:`${flexdir}`,justifyContent:'space-between',alignItems:'center', width:'100%',padding:'20px'}}>
        <Grid style={{padding:'10px',width:'50%'}} item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Total queries registered</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setSlot('month')}
                  color={slot === 'month' ? 'primary' : 'secondary'}
                  variant={slot === 'month' ? 'outlined' : 'text'}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('week')}
                  color={slot === 'week' ? 'primary' : 'secondary'}
                  variant={slot === 'week' ? 'outlined' : 'text'}
                >
                  Week
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot}/>
            </Box>
          </MainCard>
        </Grid>
        <Grid  style={{padding:'10px',width:'50%',margin:'auto'}} item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Categorise queries by Gender</Typography>
            </Grid>
          </Grid>
          <GenderChart width={widthOfgraph}/>
        </Grid>
        </div>
        {/* row 3 */}
        <Grid  item xs={12} md={12} lg={12}>
          <Grid container  alignItems="center" justifyContent="space-between">
            <Grid item >
              <Typography variant="h5">Recent Queries</Typography>
            </Grid>
            <Grid item 
            />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <QueryTable limit={5} attributes={5} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardDefault;
