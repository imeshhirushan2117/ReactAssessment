import React, {Component} from 'react';
import {Grid, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import CommonButton from "../../components/common/Button";
import {styleSheet} from "./styles";
import {withStyles} from "@mui/styles";
import CustomSnackBar from "../../components/common/SnakBar";
import ProductService from "../../services/ProductService";
import UserService from "../../services/UserService";
import CartService from "../../services/CartService";
import CommonDataTable from "../../components/common/Table";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                category: [],
                selectedDate:new Date(),
                qty: '',

            },
            categoryData: [],
            userData: [],

            alert: false,
            message: '',
            severity: '',
            columns: [
                {
                    field: "driverId",
                    headerName: "Driver Id",
                    width: 200,
                },

                {
                    field: "name",
                    headerName: "Name",
                    width: 200,
                },

                {
                    field: "address",
                    headerName: "Address",
                    width: 200,
                    sortable: false,
                },

                {
                    field: "mobileNo",
                    headerName: "Mobile No.",
                    width: 200,
                    sortable: false,
                },

                {
                    field: "email",
                    headerName: "Email",
                    width: 200,
                    sortable: false,
                },

                {
                    field: "password",
                    headerName: "Password",
                    width: 200,
                    sortable: false,
                    renderCell:(params) => {
                        return(
                            <>
                                <span style={{'-webkit-text-security': 'disc'}} >{params.row.password}</span>
                            </>
                        )
                    }
                },

                {
                    field: "status",
                    headerName: "Status",
                    width: 200,
                    sortable: false,
                },
            ],
        };
    }

    clearFields = () => {
        this.setState({
            formData: {
                username: '',
                category: '',
                selectedDate:new Date(),
                qty: '',

            }, file: null, img: null
        })
    }

    fetchCategoryForSelect = async () => {
        const res = await ProductService.fetchCategory();
        if (res.status === 200) {
            this.setState({
                categoryData: res.data
            })
        }
        console.log('cat', this.state.categoryData)
    }

    fetchUsernameForSelect = async () => {
        const res = await UserService.fetchUsers();
        const userData = [];
        if (res.status === 200) {
            res.data.map((value)=>{
                let user={
                    id:value.id,
                    userName:value.username,
                }
                userData.push(user)
            })
            this.setState({
                userData: userData
            })
        }
        console.log('user', this.state.userData)
    }

    handleSubmit = async () => {
        let formDate = this.state.formData
        let res = await CartService.addCart(formDate)

        if (res.status === 200) {
            this.setState({
                alert: true, message: 'Cart Saved!', severity: 'success'
            })
            this.clearFields();
        } else {
            this.setState({
                alert: true, message: res.message, severity: 'error'
            })
        }
        console.log("submit",this.state.formData)
    };

    handleChange = (event) => {
        let id = event.target.name;
        switch (id) {
            case "username":
                const username = event.target.value;
                this.setState(Object.assign(this.state.formData, {username: username}));
                break;

            case "category":
                const category = event.target.value;
                this.setState(Object.assign(this.state.formData, {category: category}));
                break;

            case "qty":
                const qty = event.target.value;
                this.setState(Object.assign(this.state.formData, {qty: qty}));
                break;

            default:
                break;
        }
    };

    handleChangeDate = (newValue) => {
        console.log(newValue)
        this.setState(Object.assign(this.state.formData, {selectedDate: newValue}));
    }


    async componentDidMount() {
        await this.fetchCategoryForSelect();
        await this.fetchUsernameForSelect();
    }

    rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    render() {
        const {classes} = this.props;
        return (<>
            <Grid container justifyContent={"center"} className={'h-screen bg-red-000 pt-28 px-10'}>
                <Grid container item direction={"column"} xs={12} gap={5} className={'bg-red-000'}>
                    <Grid item container justifyContent={"center"}>
                        <Typography variant={'h3'} textAlign={"center"}>User Registration</Typography>
                    </Grid>
                    <Grid item container justifyContent={"center"}>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={(errors) => console.log(errors)}
                            className={classes.validator}
                        >
                            <Grid item container direction={'row'} xs={12} gap={'15px'} justifyContent={"center"}
                                  className="rounded-lg p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                            >
                                <Grid item container direction={'column'} xs={12} sm={10} md={5} gap={'15px'}>
                                    <TextValidator
                                        label="Firste Name"
                                        onChange={this.handleChange}
                                        name="firstName"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Last Name"
                                        onChange={this.handleChange}
                                        name="lastName"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Email"
                                        onChange={this.handleChange}
                                        name="email"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="User Name"
                                        onChange={this.handleChange}
                                        name="userName"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Password"
                                        onChange={this.handleChange}
                                        name="password"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Zip Code"
                                        onChange={this.handleChange}
                                        name="zipCode"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    {/*<CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Save'
                                        type="submit"
                                        className="text-white bg-blue-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(25, 118, 210, 0.95)', width: '100%'}}
                                    />*/}
                                </Grid>

                                <Grid item container direction={'column'} xs={12} sm={10} md={5} gap={'15px'}>

                                    <TextValidator
                                        label="Street"
                                        onChange={this.handleChange}
                                        name="street"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="Long Value"
                                        onChange={this.handleChange}
                                        name="logValue"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />

                                    <TextValidator
                                        label="City"
                                        onChange={this.handleChange}
                                        name="city"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Street No"
                                        onChange={this.handleChange}
                                        name="streetNo"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Lat Value"
                                        onChange={this.handleChange}
                                        name="title"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    <TextValidator
                                        label="Mobile No"
                                        onChange={this.handleChange}
                                        name="mobileNo"
                                        value={this.state.formData.title}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    />
                                    {/*<CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Clear'
                                        className="text-white bg-red-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(210,25,25,0.95)', width: '100%'}}
                                        onClick={this.clearFields}
                                    />*/}
                                </Grid>

                                <Grid container direction={'row'} xs={12} sm={10} md={5} gap={'15px'}
                                      justifyContent={'center'}>
                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Save'
                                        type="submit"
                                        className="text-white bg-blue-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(25, 118, 210, 0.95)', width: '100%'}}
                                    />
                                </Grid><Grid container direction={'row'} xs={12} sm={10} md={5} gap={'15px'}
                                             justifyContent={'center'}>
                                <CommonButton
                                    size="large"
                                    variant="contained"
                                    label='Clear'
                                    className="text-white bg-red-500 font-bold tracking-wide"
                                    style={{backgroundColor: 'rgba(210,25,25,0.95)', width: '100%'}}
                                    onClick={this.clearFields}
                                />
                            </Grid>

                            </Grid>
                        </ValidatorForm>
                        <Grid
                            container
                            item
                            xs={12}
                            gap="5px"
                            className="rounded-lg p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                            style={{height: "700px"}}
                        >
                            <CommonDataTable
                                columns={this.state.columns}
                                rows={this.rows}
                                rowsPerPageOptions={10}
                                pageSize={10}
                                // getRowId={row=>row.driverId}
                                // checkboxSelection={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CustomSnackBar
                open={this.state.alert}
                onClose={() => {
                    this.setState({alert: false})
                }}
                message={this.state.message}
                autoHideDuration={3000}
                severity={this.state.severity}
                variant={'filled'}
            />
        </>);
    }
}

export default withStyles(styleSheet)(Register);