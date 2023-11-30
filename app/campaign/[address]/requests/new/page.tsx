'use client'

import Button from "@/app/components/button/button"
import Input from "@/app/components/input/input"
import Layout from "@/app/components/layout/layout"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Campaign from '../../../../../lib/web3/campaign'
import web3 from "@/lib/web3/web3"

export default function Page() {
    const [ amount, setAmount ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ recipientAddress, setRecipientAddress ] = useState('')
    const [ isBusy, setIsBusy ] = useState(false)
    const router = useRouter()
    const path = usePathname()
    const address = path.split('/')[2]

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsBusy(true)
        const campaign = Campaign(address)

        try {
            const accounts = await web3.eth.getAccounts()
            //@ts-ignore
            await campaign.methods.createRequest(description, web3.utils.toWei(amount, 'ether'), recipientAddress).send({
                from: accounts[0],
            })

            router.back()
        } catch (error) {
            console.error(error);
            window.alert(error)
        }

        setIsBusy(false)
    }

    
    return (
        <Layout>
            <div className="text-lg font-bold">
                 Create a Request
            </div>

            <form onSubmit={ handleSubmit } className="flex flex-col space-y-4">
             <Input hint="Enter description" type='text' onChange={e => setDescription(e.target.value)} required />

             <Input hint="Enter amount (ether)" type='text' onChange={e => setAmount(e.target.value)} required />

             <Input hint="Enter recipient address" type='text' onChange={e => setRecipientAddress(e.target.value)} required />

             <Button text="Create Request" type='sumit' isLoading={isBusy} />
           </form>
        </Layout>
    )
}