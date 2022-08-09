import * as React from 'react';
import {Grid,Typography} from "@mui/material";
import {Component} from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import CommonButton from "../../../components/common/Button/index";
import {Link} from "react-router-dom";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                userName: "",
                password: "",
            },
        };
    }

    handleSubmit = async () => {
        console.log("Hi handle");
        console.log(this.state.formData);
    };

    handleChange = (event,newValue) => {
        let id = event.target.name;
        this.setState({
            value: newValue
        });
        switch (id) {
            case "userName":
                const userName = event.target.value;

                this.setState(
                    Object.assign(this.state.formData, { userName: userName })
                );
                // this.setState({ userId });
                break;

            case "password":
                const password = event.target.value;
                this.setState(
                    Object.assign(this.state.formData, { password: password })
                );
                break;

            default:
                break;
        }
    };

    render() {
        return (
            <Grid
                container
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
                className="h-screen w-screen bg-red-100 drop-shadow-lg"
            >
                <Grid container direction={"column"} alignItems="center">
                    <Grid
                        item
                        container
                        className="min-h-96  w-96 bg-slate-50 rounded-lg p-10 drop-shadow-lg"
                    >
                        <Grid container item direction={"column"} gap="20px" alignItems="center" className="">
                            <Typography variant="h3" className="text-black -mt-3">

                                Login
                            </Typography>
                            <ValidatorForm
                                onSubmit={this.handleSubmit}
                                onError={(errors) => console.log(errors)}
                            >
                                <Grid item container direction={"column"} alignItems rowGap="20px">
                                    <TextValidator
                                        label="User Name"
                                        onChange={this.handleChange}
                                        name="userName"
                                        value={this.state.formData.userName}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth:'100%'}}
                                    />
                                    <TextValidator
                                        label="Password"
                                        onChange={this.handleChange}
                                        name="password"
                                        value={this.state.formData.password}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        type={"password"}
                                        className="w-full"
                                        style={{minWidth:'100%'}}
                                    />

                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label="Login"
                                        type="submit"
                                        className="text-white bg-blue-500 font-bold tracking-wide" style={{backgroundColor:'rgba(25, 118, 210, 0.95)'}}
                                    />

                                    <Typography variant="p">
                                        Create new user account ?  <Link to={"/userRegistration"} >Register Now</Link>
                                    </Typography>
                                </Grid>
                            </ValidatorForm>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Login;