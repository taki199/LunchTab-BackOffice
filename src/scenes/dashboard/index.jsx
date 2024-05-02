import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../../components/LineChart";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StateBox";
//import BarChart from "../../components/BarChart";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400],
              color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon sx={{ color: theme.palette.mode === "dark" ? theme.palette.green[300] : theme.palette.green[300], fontSize: "26px" }} />
            }
          />
        </Box>

        {/* Additional StatBox components for ROW 1 */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.green[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.green[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Recent Transactions */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.mode === "dark" ? theme.palette.primary[500] : theme.palette.secondary[500]}`}
            p="15px"
          >
            <Typography
              color={theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100]}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.mode === "dark" ? theme.palette.primary[500] : theme.palette.secondary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.green[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography
                  color={theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100]}
                >
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100]}>
                {transaction.date}
              </Box>
              <Box
                backgroundColor={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.green[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
          >
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              fontWeight="600"
            >
              $48,352 revenue generated
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
