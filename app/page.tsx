'use client'

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientForm from '@/components/foms/PatientForm';
import DoctorForm from '@/components/foms/DoctorForm';
import NGOForm from '@/components/foms/NgoForm';

export default function Register() {
  const { user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("patient");

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
          <TabsTrigger value="ngo">NGO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient">
          <PatientForm clerkId={user.id} email={user.emailAddresses[0].emailAddress} />
        </TabsContent>
        
        <TabsContent value="doctor">
          <DoctorForm clerkId={user.id} email={user.emailAddresses[0].emailAddress} />
        </TabsContent>
        
        <TabsContent value="ngo">
          <NGOForm clerkId={user.id} email={user.emailAddresses[0].emailAddress} />
        </TabsContent>
      </Tabs>
    </div>
  );
}