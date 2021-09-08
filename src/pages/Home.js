import React,{useEffect,useState} from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {useSelector,useDispatch} from 'react-redux'
import { deleteUser, loadUsers } from '../redux/actions';
import { Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={16} variant="filled" {...props} />;
}

const useButtonStyles = makeStyles((theme ) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
      marginTop:100,
    minWidth: 900,
  },
});



const Home = () => {
    
    const classes = useStyles();
    const [deleted, setDeleted] = useState(false);
    const buttonStyles = useButtonStyles()
    let dispatch = useDispatch()
    let history = useHistory()
    const {users} = useSelector(state =>state.data)
    useEffect(() => {
        dispatch(loadUsers());
    },[])

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete the user")) {
        dispatch(deleteUser(id));
        setDeleted(true);
      }
    };

      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        setDeleted(false);
      };

    return (
      <div>
        <div className={buttonStyles.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/addUser")}
          >
            Add user
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className={buttonStyles.root}>
                        <ButtonGroup
                          variant="contained"
                          aria-label="contained primary button group"
                        >
                          <Button
                            color="primary"
                            style={{ marginRight: "15px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar open={deleted} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            User successfully deleted!
          </Alert>
        </Snackbar>
      </div>
    );
}

export default Home
