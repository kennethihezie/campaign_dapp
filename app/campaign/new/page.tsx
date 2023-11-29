'use client'

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import Layout from "@/app/components/layout/layout";
import factory from "@/lib/web3/factory";
import web3 from "@/lib/web3/web3";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page(){
   const [amount, setAmount ] = useState('')
   const [ isLoading, setLoading ] = useState(false)
   const router = useRouter()
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const accounts = await web3.eth.getAccounts()
    //@ts-ignore
    await factory.methods.createCampaign(amount).send({
      from: accounts[0]
    })

    setLoading(false)
    router.back()
   }

   return (
    <Layout>
      <form onSubmit={ handleSubmit } className="flex flex-col space-y-12 py-8 items-center">
        <Input hint="Enter minimum amount" type='number' required onChange={ e => setAmount(e.target.value)}/>

        <Button
          type='submit'
          isLoading = { isLoading }
          text="Create Campaign"
        />
    </form>
    </Layout>
   )
}