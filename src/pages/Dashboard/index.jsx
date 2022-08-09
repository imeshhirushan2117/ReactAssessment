import React, {Component} from 'react';
import Widget from "../../components/common/widgets";
import {Grid} from "@mui/material";

class Dashboard extends Component {
    render() {
        return (
            <Grid container gap={5} item className={'h-screen pt-28 px-5'}>
                <Widget type="Product" path="/driver" number={60}/>
                <Widget type="Users" path="/driver" number={43}/>
                <Widget type="Cart" path="/driver" number={12}/>
            </Grid>
        );
    }
}

export default Dashboard;