import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OrderTab from './OrderTab/OrderTab';
const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category === 'dessert' )
    const soup = menu.filter(item => item.category === 'soup' )
    const pizza = menu.filter(item => item.category === 'pizza' )
    const salad = menu.filter(item => item.category === 'salad' )
   
    const drinks = menu.filter(item => item.category === 'drinks');

    console.log(soup)

    return ( 
        <div>
            <Helmet>
        <title> Bistro Boss | Order Food </title>
      
      </Helmet>
            <Cover img={orderCover} title='Order Food'></Cover>

            <Tabs defaultIndex={initialIndex} onSelect={(index) => console.log(index)}>
  <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soups</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
  </TabList>


  <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
</Tabs>
        </div>
    );
};

export default Order;