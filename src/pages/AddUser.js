import React,{useState} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    const {name,email,contact,address} = state;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Name"
            value={name}
            type="text"
          />
          <br />
          <TextField
            id="standard-basic"
            label="Email"
            value={email}
            type="email"
          />
          <br />
          <TextField
            id="standard-basic"
            label="contact"
            value={contact}
            type="number"
          />
          <br />
          <TextField
            id="standard-basic"
            label="Address"
            value={address}
            type="text"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{width:"5%"}}
          >
            Save
          </Button>
        </form>
      </div>
    );
}

export default AddUser
