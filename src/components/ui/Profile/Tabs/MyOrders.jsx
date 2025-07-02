"use client"
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../../../context/AppContext';
import en from "../../../../../locales/en.json";
import ar from "../../../../../locales/ar.json";
import { BASE_API, endpoints } from '../../../../../constant/endpoints';
import axios from 'axios';
import OrderCard from './OrderCard';
import Cookies from 'js-cookie';
import OrdersLoader from '../../Loaders/OrdersLoader';

export default function MyOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { state = {}, dispatch = () => { } } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar);

  useEffect(() => {
    setTranslation(state.LANG === "EN" ? en : ar);
  }, [state.LANG]);

  const fetchMyOrder = async () => {
    setLoading(true)
    const res = await axios.get(`${BASE_API}${endpoints.products.myorders}&lang=${state.LANG}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    if (res.data) {
      setOrders(res.data);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchMyOrder()
  }, []);  

  return (
    <div className='py-3'>
      <h2 className='sub-title mb-6'>{translation.theOrders}</h2>
        {
          loading && (
            <OrdersLoader />
          )
        }
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {
        orders.length ? (
          orders.map((order,i)=>(
            order.details.length ? <OrderCard key={order.orderID} order={order}/> : null
          ))
        ) : null
      }
      </div>
    </div>
  )
}