import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography } from '@material-ui/core';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import KitchenIcon from '@material-ui/icons/Kitchen';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const drawerWidth = 260;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
      width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
      display: 'flex'
  }
});

export default function DrawerMenu({ toggleDrawer, isDrawerOpened, setPage }) {
  const classes = useStyles();

  const menuItems = [
        {
            text: 'Cocktails',
            value: 'cocktails',
            icon: <LocalBarIcon color="primary"></LocalBarIcon>
        },
        {
            text: 'Meals',
            value: 'meals',
            icon: <KitchenIcon color="primary"></KitchenIcon>
        },
        {
            text: 'My bistro',
            value: 'bistro',
            icon: <RestaurantMenuIcon color="primary"></RestaurantMenuIcon>
        }
  ]

  const setCurrentPage = (value) => {
    setPage(value);
  }

  return (
    <div className={classes.root}>
   
        
        
          <Drawer className={classes.drawer} 
       
            anchor='left' 
            open={isDrawerOpened} 
            onClose={toggleDrawer}
            classes={{paper: classes.drawerPaper}}>
            

            <List>
            {menuItems.map((item, index) => (
          <ListItem onClick={() => setCurrentPage(item.value)} button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List> 
          </Drawer>
       
      
    </div>
  );
}
