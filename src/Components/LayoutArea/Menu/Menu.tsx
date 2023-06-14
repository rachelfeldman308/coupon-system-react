import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import { authStore } from "../../../Redux/AuthState";
import Home from "../../HomeArea/Home/Home";
import "./Menu.css";

function Menu(): JSX.Element {

    const [clientType, setClientType] = useState<ClientType>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {

        setClientType(authStore.getState().user?.clientType);
        
        const unsubscribe = authStore.subscribe(() => {
            setClientType(authStore.getState().user?.clientType);
        });

        return unsubscribe;

    }, []);

    return (
        <div className="Menu">

                           <br />    
                            <NavLink to="/home">Home</NavLink>
                            <br />
                  <span>|</span>
                  <br />
                    <NavLink to="/about">About</NavLink>
                    <br />
                  
                    
            {clientType === ClientType.CUSTOMER && <>
      
                {/* <NavLink to="/AllCoupons">All Coupons</NavLink> */}
           
                <span>|</span>
                <br />
                <NavLink to="/CustomerCoupons">My Coupons</NavLink>
            </>}

            {clientType === ClientType.COMPANY && <>
                <span>|</span>
            <br />
                <NavLink to="/AllCompanyCoupons">All Coupons</NavLink>
            </>}

            {clientType === ClientType.ADMIN && <>
                <span>|</span>
            <br />
                <NavLink to="/AllCompanies">All Companies</NavLink>
                <br />
                <span>|</span>
                <br />
                <NavLink to="/AllCustomers">All Customers</NavLink>
            </>}
                





        </div>
    );
}

export default Menu;



// import "./Header.css";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import ClientType from "../../../Models/ClientType";
// import MenuIcon from '@mui/icons-material/Menu'
// import MenuPrivate from "../MenuPrivate/MenuPrivate";
// import { Menu, MenuItem } from "@mui/material";
// import { authStore } from "../../../Redux/AuthState";


// function Header(): JSX.Element {

    // const [clientType, setClientType] = useState<ClientType>();
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    // useEffect(() => {

    //     setClientType(authStore.getState().user?.clientType);
        
    //     const unsubscribe = authStore.subscribe(() => {
    //         setClientType(authStore.getState().user?.clientType);
    //     });

    //     return unsubscribe;

    // }, []);

    
    // return (
    //     // <div style={{flexGrow: 1, flexDirection: 'row'}}>
    //     <AppBar variant="outlined" position="static" >

    //         {/* <MenuPrivate></MenuPrivate> */}

    //         <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsMenuOpen(true)}>
    //             <MenuIcon  />
    //         </IconButton>
    //         <Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
    //                 <MenuItem >                    
    //                         <NavLink to="/home">Home</NavLink>
    //                 </MenuItem>
    //                 <MenuItem>
    //                 <NavLink to="/about">About</NavLink>
    //                 </MenuItem>
                    
    //         {clientType === ClientType.CUSTOMER && <>
    //             <NavLink to="/AllCoupons">All Coupons</NavLink>
    //             <NavLink to="/CustomerCoupons">My Coupons</NavLink>
    //         </>}

    //         {clientType === ClientType.COMPANY && <>
    //             <NavLink to="/AllCompanyCoupons">All Coupons</NavLink>
    //         </>}

    //         {clientType === ClientType.ADMIN && <>
    //             <NavLink to="/AllCompanies">All Companies</NavLink>
    //             <NavLink to="/AllCustomers">All Customers</NavLink>
    //         </>}
    //             </Menu>
        


    //         <Typography variant="h6" style={{flexGrow: 1}} >
    //         Coupon System Rachel Feldman
    //         </Typography>
    //         <Toolbar>
           
    //        <Button color="inherit" style={{marginRight: '2px'}}>Login</Button>
    //        </Toolbar>
    //     </AppBar>

//         <div className="Header">
//             {/* <AppBar position="static">
//   <Toolbar>
//     <IconButton edge="start"  color="inherit" aria-label="menu">
//       <MenuIcon />
//     </IconButton>
//     <Typography variant="h6" >
//     Coupon System Rachel Feldman
//     </Typography>
//     <Button color="inherit">Login</Button>
//   </Toolbar>
// </AppBar> */}
// 			<h1>Coupon System Rachel Feldman</h1>
//         </div>
    // );
// }

// export default Header;
