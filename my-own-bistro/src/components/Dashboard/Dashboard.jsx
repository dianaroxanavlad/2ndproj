import './Dashboard.css';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from '../Drawer/Drawer'
import { MealsPage } from '../MealsPage/MealsPage';
import { CocktailsPage } from '../CocktailsPage/CocktailsPage';

const useStyles = makeStyles((theme) => ({

    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
export const Dashboard = ({currentUserId}) => {

    const [currentPage, setCurrentPage] = useState('cocktails');
    const [isDrawerOpened, setDrawerOpened] = useState(false);

    const toggleDrawer = () =>{
        setDrawerOpened(!isDrawerOpened)
    }
    let renderedPage = <></>;

    if (currentPage) {
        if (currentPage === 'cocktails') {
            renderedPage = <CocktailsPage currentUserId={currentUserId}/>
        }
        if (currentPage === 'meals') {
            renderedPage = <MealsPage currentUserId={currentUserId}/>
        }
        if (currentPage === 'bistro') {
            renderedPage = <h1>Bistro</h1>
        }
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" onClick={() => toggleDrawer()} className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                My own bistro!
            </Typography>
            <Button color="inherit">Logout</Button>
            </Toolbar>
            <DrawerMenu isDrawerOpened={isDrawerOpened} toggleDrawer={toggleDrawer} setPage={setCurrentPage}/>
        </AppBar>

        {renderedPage}
        
        </div>
    );
}
