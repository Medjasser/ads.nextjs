"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function Statistique() {
  const [LogoSocialNetworks, setLogoSocialNetworks] =  React.useState<any[]>([]);
  const [LogoChannels, setLogoChannels] =  React.useState<any[]>([]);
    // Fetching SocialNetworks on component mount
    React.useEffect(() => {
      const fetchSocialNetworks = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const formdata = new FormData();
            formdata.append("Hipto-Authorization", token);
            const requestOptions = {
              method: "POST",
              body: formdata,
            };
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/social_networks`,
              requestOptions
            );
            const data = await response.json();
            setLogoSocialNetworks(data);
          } else {
            console.error("Token is null or invalid");
          }
        } catch (error) {
          console.error("Error fetching SocialNetworks:", error);
        }
      };
  
      fetchSocialNetworks();
    }, []);
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <hr className="border-t border-gray-300 mt-2" />
      </CardHeader>
      <CardContent className="flex space-x-4">
        <Card className="bg-[#080655] text-white w-1/2">
          <CardHeader>
            <CardTitle>Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://hyperise.com/wp-content/uploads/2019/06/landbot_icon.png"
                width="30"
                height="30"
              />
              <p style={{ margin: '0 0 0 10px' }}>landbot</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ margin: '0 0 0 10px' }}>20(1)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#3188DC] text-white w-1/2">
          <CardHeader>
            <CardTitle>Source d’acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/20/20673.png"
                width="30"
                height="30"
              />
              <p style={{ margin: '0 0 0 10px' }}>facebook</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ margin: '0 0 0 10px' }}>10</p>
            </div>
            
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
