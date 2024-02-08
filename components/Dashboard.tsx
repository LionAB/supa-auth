
import { createClient } from "@/utils/supabase/server";
import { getCookieStore } from "@/utils/cookiesUtils";
import Step from './Step';
import {Button} from "@nextui-org/button";
import {CameraIcon} from './CameraIcon';
import { UserIcon } from './UserIcon';

export default async function Dashboard() {
    
    const cookieStore = getCookieStore();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    
    const{ data, error } = await supabase.auth.getSession();
    console.log(data);
    if (!user) {
        return <Step title="Pas d'utilisteurs">"Error getting user"</Step>
    }
    if (error) {
        console.error('Error getting session:', error);
        return <Step title="Error">"Error getting session"</Step>
    }
      
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
                    <p className="text-lg">Welcome, {user?.email}</p>
                    <p className="text-lg">Your user id is : {user?.id}</p>
                    <p className="text-lg break-words">Your access token is : {data?.session?.access_token}</p>                    <div className="flex gap-4 items-center">
                        <Button color="success" endContent={<CameraIcon/>}>
                            Upload un image
                        </Button>
                        <Button color="success" endContent={<UserIcon/>}>
                            Upload un avatar
                        </Button>
                        <Button color="success" variant='ghost' endContent={<UserIcon/>}>
                            Upload une image IA
                        </Button>

                    </div>

        </div>
    );
};