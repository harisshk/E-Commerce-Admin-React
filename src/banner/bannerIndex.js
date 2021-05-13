import React from 'react'
import {Route,BrowserRouter,  Switch} from 'react-router-dom'
import BannerList from './bannerList'
export const BannerIndex=(props)=>{
    return(
        <BrowserRouter>
        <Switch>
        <Route path='/banner' component={BannerList} />
        </Switch>
        </BrowserRouter>
    )
}
export default BannerIndex