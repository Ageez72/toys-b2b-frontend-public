"use client";

import Login from "@/pages/Login/Login";
import { BASE_API, endpoints } from "../constant/endpoints";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loader from "@/components/ui/Loaders/Loader";

export default function Home() {
  const { push } = useRouter();

  async function fetchProfile() {
    const res = await axios.get(`${BASE_API}${endpoints.user.profile}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return res.data;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  if (isLoading) return <Loader />;
  if (data) {
    // push("/home")
  }
  
  return (
    <>
      <Login />
    </>
  );
}
