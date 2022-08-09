import React, {Component} from 'react';
import {Grid, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import CommonButton from "../../components/common/Button";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {styleSheet} from "../Dashboard/styles";
import {withStyles} from "@mui/styles";
import CustomSnackBar from "../../components/common/SnakBar";
import ProductService from "../../services/ProductService";
import {logDOM} from "@testing-library/react";

class Product extends Component {

    top100Films = [
        {label: 'The Shawshank Redemption', year: 1994},
        {label: 'The Godfather', year: 1972},
    ]

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: '',
                category: '',
                price: '',
                description: ''
            },
            categoryData: [],

            alert: false,
            message: '',
            severity: '',

            file: null,
            img: null
        };
    }

    clearFields=()=>{
        this.setState({
            formData: {
                title: '',
                category: '',
                price: '',
                description: ''
            },
            file: null,
            img: null
        })
    }

    fetchCategoryForSelect = async () =>{
        const res = await ProductService.fetchCategory();
        if (res.status===200){
            this.setState({
                categoryData:res.data
            })
        }
        console.log('cat',this.state.categoryData)
    }

    handleSubmit = async () => {
        console.log("hi")
        if (this.state.file == null) {
            this.setState({
                alert: true,
                message: "Please Select Image",
                severity: 'error'
            })
            return;
        }
        let formDate = this.state.formData

        /*let data = new FormData();
        data.append("product", JSON.stringify(formDate));
        data.append("myFile", this.state.file)
        console.log(this.state.file)
        console.log(this.state.file.name)*/

        let res = await ProductService.addProduct(formDate)
        if (res.status === 200) {
            this.setState({
                alert: true,
                message: 'Product Saved!',
                severity: 'success'
            })
            this.clearFields();
        } else {
            this.setState({
                alert: true,
                message: res.message,
                severity: 'error'
            })
        }

    };

    handleChange = (event) => {
        let id = event.target.name;
        switch (id) {
            case "title":
                const title = event.target.value;
                this.setState(Object.assign(this.state.formData, {title: title}));
                break;

            case "category":
                const category = event.target.value;
                this.setState(Object.assign(this.state.formData, {category: category}));
                break;

            case "price":
                const price = event.target.value;
                this.setState(Object.assign(this.state.formData, {price: price}));
                break;

            case "description":
                const description = event.target.value;
                this.setState(Object.assign(this.state.formData, {description: description}));
                break;

            default:
                break;
        }
    };

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({img: URL.createObjectURL(e.target.files[0])})
        this.setState({
            file: file
        })
    }

    async componentDidMount() {
        await this.fetchCategoryForSelect();
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid container justifyContent={"center"} className={'h-screen bg-red-000 pt-28 px-10'}>
                    <Grid container item direction={"column"} xs={12} gap={5} className={'bg-red-000'}>
                        <Grid item container justifyContent={"center"}>
                            <Typography variant={'h3'} textAlign={"center"}>Product Manager</Typography>
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
                                            label="Title"
                                            onChange={this.handleChange}
                                            name="title"
                                            value={this.state.formData.title}
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                            className="w-full"
                                            style={{minWidth: '100%'}}
                                        />
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
                                            {this.state.categoryData.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextValidator>

                                        <TextValidator
                                            label="Price"
                                            onChange={this.handleChange}
                                            name="price"
                                            value={this.state.formData.price}
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                            className="w-full"
                                            style={{minWidth: '100%'}}
                                        />
                                        <TextValidator
                                            label="Description"
                                            onChange={this.handleChange}
                                            name="description"
                                            value={this.state.formData.description}
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                            className="w-full"
                                            style={{minWidth: '100%'}}
                                            multiline
                                        />
                                    </Grid>
                                    <Grid container direction={'row'} xs={12} sm={10} md={6} gap={2} sx={{height: '150px'}}
                                          justifyContent={'space-between'}>
                                        <Grid container flexGrow={1} item
                                              className={'border w-28 bg-contain bg-center bg-no-repeat'}
                                              style={{backgroundImage: `url(${this.state.img})`}}
                                        >
                                        </Grid>
                                        <Grid container flexGrow={2} item className={'border w-28'}>
                                            <Button
                                                component="label"
                                                variant="outlined"
                                                startIcon={<AddPhotoAlternateIcon /*className={classes.icon}*//>}
                                                sx={{marginRight: "1rem"}}
                                                className={classes.btnUpload}
                                            >
                                                Upload Image
                                                <input type="file" accept="image/*" hidden
                                                       onChange={(e) => this.handleFile(e)}/>
                                            </Button>
                                        </Grid>

                                    </Grid>
                                    <Grid container direction={'row'} xs={12} sm={10} md={6} gap={'15px'}
                                          justifyContent={'center'}>
                                        <CommonButton
                                            size="large"
                                            variant="contained"
                                            label='Add'
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
            </>
        );
    }
}

export default withStyles(styleSheet)(Product);