import React,{useState} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";
import {useDispatch} from 'react-redux'
import { addUser } from '../redux/actions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop:100,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      "& > *": {
        margin: theme.spacing(1),
        width: "45ch",
      },
    },
  })
);


const AddUser = () => {
    const classes = useStyles();
    
    const [state,setState] = useState({
        name:"",
        email:"",
        contact:"",
        address:"",
    })

    const [error,setError] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch()
    const {name,email,contact,address} = state;
    const handleInputChange = (e) => {
        let {name,value} = e.target
        setState({...state,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !contact || !address ) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
            return
        } else {
            dispatch(addUser(state))
            history.push("/")
        }

    }

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: "10%", marginTop: "20px" }}
          onClick={() => history.push("/")}
        >
          Go back
        </Button>
        <h2>Add user</h2>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Name"
            value={name}
            name="name"
            type="text"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Email"
            value={email}
            name="email"
            type="email"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="contact"
            value={contact}
            name="contact"
            type="number"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Address"
            value={address}
            name="address"
            type="text"
            onChange={handleInputChange}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "5%" }}
          >
            Save
          </Button>
        </form>
        {error && (
          <Alert severity="warning" style={{ width: "40%" }}>
            Please complete all required fields!
          </Alert>
        )}
      </div>
    );
}

export default AddUser
