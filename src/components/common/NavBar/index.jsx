import React, {Component} from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent, DialogTitle, Tab, Tabs} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import CommonButton from "../Button";
import {Link} from "react-router-dom";
import Login from "../../../pages/Session/Login";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, value: 0,
        };
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    };

    render() {
        const {classes} = this.props;
        return (<AppBar color="inherit" sx={{backgroundColor: '#2C3639'}}>
            <nav
                className="flex justify-between items-center h-16 px-12 bg-zinc-800 bg-opacity-25 p-10 backdrop-blur-sm">
                <div>
                    <Typography
                        variant={"h5"}
                        className="text-white font-bold tracking-wide select-none"
                    >
                        Fake Store
                    </Typography>
                </div>
                <Tabs indicatorColor={'secondary'} value={this.state.value} onChange={this.handleChange}
                      aria-label="Nav Tabs" TabIndicatorProps={{style: {background: '#DCD7C9'}}}>
                    <Tab label="Dashboard" component={Link} to={'/dashboard'} sx={{color: '#eceaea'}}/>
                    <Tab label="Product" component={Link} to={'/product'} sx={{color: '#eceaea'}}/>
                    <Tab label="Cart" component={Link} to={'/dashboard'} sx={{color: '#eceaea'}}/>
                </Tabs>
                <div className="flex w-1/12 justify-end gap-3">
                    <CommonButton
                        size="large"
                        variant="outlined"
                        label="Login"
                        className="text-white border-white hover:bg-white hover:text-black"
                        onClick={() => this.setState({open: true})}
                    />
                </div>
            </nav>
            {/* <DialogBox title={"Login"} divider open={this.setState}></DialogBox> */}
            {/* ----  Popup Dialog  ---- */}

            <Dialog
                open={this.state.open}
                maxWidth="md"
                classes={{paper: classes.dialogWraper}}
            >
                <DialogTitle style={{paddingRight: "0px"}}>
                    <div style={{display: "flex"}}>
                        <IconButton onClick={() => this.setState({open: false})}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                   <Login></Login>
                </DialogContent>
            </Dialog>
        </AppBar>);
    }
}

export default withStyles(styleSheet)(NavBar);