import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ReactLoading from 'react-loading';
import { getEmergencies } from '../functions/requests';
import { EmergencyComplexity } from './EmergencyComplexity';

interface Column {
  id: 'type' | 'lat' | 'lon' | 'location' | 'message' | 'level' | 'complexity';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
interface Data {
  id: number;
  type: string;
  lat: number;
  lon: number;
  location: string;
  message: string;
  level: string;
  complexity: any;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns: readonly Column[] = [
  { id: 'type', label: 'Type', minWidth: 10 },
  {
    id: 'lat',
    label: 'Latitude',
    minWidth: 18,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'lon',
    label: 'Longitude',
    minWidth: 18,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'message',
    label: 'Message',
    minWidth: 40,
    align: 'right',
  },
  {
    id: 'level',
    label: 'Level',
    minWidth: 3,
    align: 'right',
  },
  {
    id: 'complexity',
    label: 'Complexity',
    minWidth: 10,
    align: 'right',
  },
];

export default function EmergenciesTable() {
  const [page, setPage] = React.useState(1);
  const [rows, setRows]: any = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchEmergencies = async () => {
      const result = await getEmergencies(page);
      setRows([...result]);
      setLoading(false);
    };
    fetchEmergencies();
  }, [page]);

  function PoblateTable() {
    return (
      <TableBody>
        {rows.map((row: Data, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column: Column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? (
                      column.format(value)
                    ) : column.id === 'complexity' ? (
                      <EmergencyComplexity id={row.id} />
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  return (
    <>
      <div>
        <Typography variant="h3">Emergencies</Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1}
            sx={{ flex: 0.1 }}
            onClick={() => setPage((page) => page - 1)}
          >
            <ArrowCircleLeftIcon />
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 5, flex: 0.1 }}
            onClick={() => setPage((page) => page + 1)}
          >
            <ArrowCircleRightIcon />
          </Button>
        </div>
      </div>
      {loading ? (
        <ReactLoading type={'spinningBubbles'} color="black" />
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              {PoblateTable()}
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
