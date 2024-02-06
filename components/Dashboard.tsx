
import { use, useEffect, useState } from 'react'
import { createClient } from "@/utils/supabase/server";
import { getCookieStore } from "@/utils/cookiesUtils";
import Step from './Step';


export default async function Dashboard() {
    const cookieStore = getCookieStore();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
    const{ data, error } = await supabase.auth.getSession();
    console.log(data);
      
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
                    <p className="text-lg">Welcome, {user?.email}</p>
                    <p className="text-lg">Your user id is : {user?.id}</p>
                    <p className="text-lg break-words">Your access token is : {data?.session?.access_token}</p>

        </div>
    );
};