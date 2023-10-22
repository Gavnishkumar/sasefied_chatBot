import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { TextareaAutosize } from '../../../node_modules/@mui/material/index';

/////////////////////////////////STYLED COMPONENTS////////////////////////////////////////////
const blue = {
  400: '#3399FF'
};
const StyledTextarea = styled(TextareaAutosize)(
  () => `
  width: 500px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;

  &:hover {
    border-color: ${blue[400]};
  }
`
);
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(10)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| Query TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy, attributes }) {
  let headCells;
  if (attributes === 5) {
    headCells = [
      {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Tracking No.'
      },
      {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Date created'
      },
      {
        id: 'fat',
        align: 'right',
        disablePadding: false,
        label: 'Location'
      },
      {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Status'
      },
      {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Gender'
      },
      {
        id: 'name',
        align: 'right',
        disablePadding: false,
        label: 'name'
      }
    ];
  } else {
    headCells = [
      {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Tracking No.'
      },
      {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Date created'
      },
      {
        id: 'fat',
        align: 'right',
        disablePadding: false,
        label: 'Location'
      },
      {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Status'
      },
      {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Gender'
      },
      {
        id: 'name',
        align: 'right',
        disablePadding: false,
        label: 'Name'
      },
      {
        id: 'anyHarassmenttein',
        align: 'right',
        disablePadding: false,
        label: 'AnyHarassment'
      },
      {
        id: 'organization',
        align: 'right',
        disablePadding: false,
        label: 'Organization'
      },

      {
        id: 'contactNumber',
        align: 'right',
        disablePadding: false,
        label: 'ContactNumber'
      },
      {
        id: 'assaulted',
        align: 'right',
        disablePadding: false,
        label: 'Assaulted'
      },
      {
        id: 'nameOfAssaulter',
        align: 'right',
        disablePadding: false,
        label: 'NameOfAssaulter'
      },
      {
        id: 'reportAnonymously',
        align: 'right',
        disablePadding: false,
        label: 'ReportAnonymously'
      },
      {
        id: 'employeeOrStudentId',
        align: 'right',
        disablePadding: false,
        label: 'EmployeeOrStudentId'
      },
      {
        id: 'reportToManagement',
        align: 'right',
        disablePadding: false,
        label: 'ReportToManagement'
      },
      {
        id: 'locationOfIncident',
        align: 'right',
        disablePadding: false,
        label: 'LocationOfIncident'
      }
    ];
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| Query TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Resolved';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| QUERY TABLE ||============================== //

export default function OrderTable(props) {
  const [textArea, setTextArea] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [res, setRes] = useState(false);
  const [id, setId] = useState();
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [token, setToken] = useState();
  const openDialog = (row) => {
    setName(row.name);
    setComment(row.comment);
    setId(row._id);
    row.status === 1 ? setRes(true) : setRes(false);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddComments = () => {
    setTextArea(true);
  };
  const handleDelete = async () => {
    const data = {
      _id: id
    };
    await fetch('http://127.0.0.1:4000/api/deleteQuery', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    refresh ? setRefresh(false) : setRefresh(true);
    handleClose();
  };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  useEffect(() => {
    async function fetchData() {
      const jwtTokenData = await JSON.parse(localStorage.getItem('authToken'));
      if (!jwtTokenData) navigate('/auth');
      const headers = { Authorization: `Bearer ${jwtTokenData.token}` };
      setToken(jwtTokenData.token);
      const data = await fetch(`http://127.0.0.1:4000/api/getQuery?limit=${props.limit}`, { headers });
      const queriesList = await data.json();
      setData(queriesList);
    }
    fetchData();
  }, [refresh]);

  return (
    <>
      <div>
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {name}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          ></IconButton>
          <DialogContent dividers>
            {textArea ? (
              <StyledTextarea
                maxRows={3}
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length < 300) setComment(e.target.value);
                }}
              />
            ) : (
              <p>{comment}</p>
            )}
          </DialogContent>
          <DialogActions>
            {textArea ? (
              <>
                <Button
                  autoFocus
                  onClick={async () => {
                    const data = {
                      _id: id,
                      comment
                    };
                    const update = await fetch('http://127.0.0.1:4000/api/updateQuery', {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                      },

                      body: JSON.stringify(data)
                    });
                    const close = await update.json();
                    if (close) {
                      refresh ? setRefresh(false) : setRefresh(true);
                      handleClose();
                      setTextArea(false);
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  autoFocus
                  onClick={() => {
                    setTextArea(false);
                    handleClose();
                  }}
                >
                  close
                </Button>
              </>
            ) : (
              <>
                <Button autoFocus onClick={handleAddComments}>
                  Add comments
                </Button>
                {res ? (
                  <Button autoFocus onClick={handleClose}>
                    close
                  </Button>
                ) : (
                  <Button
                    autoFocus
                    onClick={async () => {
                      const data = {
                        _id: id,
                        status: 1
                      };
                      const update = await fetch('http://127.0.0.1:4000/api/updateQuery', {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify(data)
                      });
                      const close = await update.json();
                      if (close) {
                        refresh ? setRefresh(false) : setRefresh(true);
                        handleClose();
                      }
                    }}
                  >
                    resolve
                  </Button>
                )}
                <Button autoFocus onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </DialogActions>
        </BootstrapDialog>
      </div>
      <Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root:first-of-type': {
                pl: 2
              },
              '& .MuiTableCell-root:last-of-type': {
                pr: 3
              }
            }}
          >
            <OrderTableHead order={order} orderBy={orderBy} attributes={props.attributes} />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.trackingNo}
                    selected={isItemSelected}
                    onClick={() => {
                      openDialog(row);
                    }}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="secondary" component={RouterLink} to="">
                        {row.trackingNo}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.dateOfIncident}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.status} />
                    </TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    {props.attributes === 5 ? (
                      ''
                    ) : (
                      <>
                        <TableCell align="right">{row.anyHarassment}</TableCell>
                        <TableCell align="right">{row.organization}</TableCell>
                        <TableCell align="right">{row.contactNumber}</TableCell>
                        <TableCell align="right">{row.assaulted}</TableCell>
                        <TableCell align="right">{row.nameOfAssaulter}</TableCell>
                        <TableCell align="right">{row.reportAnonymously}</TableCell>
                        <TableCell align="right">{row.employeeOrStudentId}</TableCell>
                        <TableCell align="right">{row.reportToManagement}</TableCell>
                        <TableCell align="right">{row.locationOfIncident}</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
