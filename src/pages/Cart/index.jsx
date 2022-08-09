import React, {Component} from 'react';
import {Grid, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import CommonButton from "../../components/common/Button";
import {styleSheet} from "./styles";
import {withStyles} from "@mui/styles";
import CustomSnackBar from "../../components/common/SnakBar";
import ProductService from "../../services/ProductService";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import UserService from "../../services/UserService";
import CartService from "../../services/CartService";

class Cart extends Component {

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

    render() {
        const {classes} = this.props;
        return (<>
            <Grid container justifyContent={"center"} className={'h-screen bg-red-000 pt-28 px-10'}>
                <Grid container item direction={"column"} xs={12} gap={5} className={'bg-red-000'}>
                    <Grid item container justifyContent={"center"}>
                        <Typography variant={'h3'} textAlign={"center"}>Cart Manager</Typography>
                    </Grid>
                    <Grid item container justifyContent={"center"}>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={(errors) => console.log(errors)}
                            className={classes.validator}
                        >
                            <Grid item container direction={'row'} xs={12} gap={'15px'} justifyContent={"center"}
                                  className={'bg-green-000'}
                            >
                                <Grid item container direction={'column'} xs={12} sm={10} md={6} gap={'15px'}>
                                    <TextValidator
                                        select
                                        label="User Name"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={this.state.formData.username}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    >
                                        {this.state.userData.map((option) => (
                                            console.log(option),
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.userName}
                                                </MenuItem>))}
                                    </TextValidator>

                                    <TextValidator
                                        select
                                        label="Category"
                                        name="category"
                                        onChange={this.handleChange}
                                        value={this.state.formData.category}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        style={{minWidth: '100%'}}
                                    >
                                        {this.state.categoryData.map((option) => (<MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>))}
                                    </TextValidator>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            disablePast={true}
                                            showToolbar={false}
                                            label="Date"
                                            inputFormat="MM/D/yyyy"
                                            value={this.state.formData.selectedDate}
                                            onChange={this.handleChangeDate}
                                            renderInput={(params) => <TextValidator {...params} name='date' className={'w-full'}/>}

                                        />
                                    </LocalizationProvider>

                                    <TextValidator
                                        label="Qty"
                                        onChange={this.handleChange}
                                        name="qty"
                                        value={this.state.formData.qty}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        className="w-full"
                                        type={'number'}
                                        style={{minWidth: '100%'}}
                                    />
                                </Grid>

                                <Grid container direction={'row'} xs={12} sm={10} md={6} gap={'15px'}
                                      justifyContent={'center'}>
                                    <CommonButton
                                        size="large"
                                        variant="contained"
                                        label='Save'
                                        type="submit"
                                        className="text-white bg-blue-500 font-bold tracking-wide"
                                        style={{backgroundColor: 'rgba(25, 118, 210, 0.95)', width: '100%'}}
                                    />
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

export default withStyles(styleSheet)(Cart);