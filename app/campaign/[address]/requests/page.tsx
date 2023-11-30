'use client'

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import Layout from "@/app/components/layout/layout";
import Campaign from "@/lib/web3/campaign";
import web3 from "@/lib/web3/web3";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'ID',
        selector: (row: Request) => row.id,
    },
    {
        name: 'Description',
        selector: (row: Request) => row.description,
    },
    {
        name: 'Amount',
        selector: (row: Request) => row.amount,
    },
    {
        name: 'Recipient',
        selector: (row: Request) => row.recipient,
    },
    {
        name: 'Approve',
        selector: (row: Request) => row.approve,
    },
    {
        name: 'Finalize',
        selector: (row: Request) => row.finalize,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]
type Request = {
    id: number
    description: string
    amount: string
    recipient: string
    approve: boolean
    finalize: boolean
}

export default function Page() {
    const router = useRouter()
    const path = usePathname()
    const address = path.split('/')[2]  
    const [ requests, setRequests ] = useState<Request[]>()  
    
    const getRequests = async () => {
        const campaign = Campaign(address)
        const accounts = await web3.eth.getAccounts()
        const data: Request[] = []

        const requests = (await campaign.methods.getRequests().call({
            from: accounts[0]
        })) as Array<any>

        requests.map((value, index) => {
            data.push({
                id: index,
                description: value.description,
                amount: web3.utils.fromWei(value.value, 'ether'),
                recipient: value.recipient,
                approve: false,
                finalize: false
            })
        })

        setRequests([...data])
    }

    useEffect(() => {
        getRequests()
    }, [])

    
    return (
        <Layout>
            <div className="flex flex-row items-center justify-between">
                <div className="text-lg font-bold">
                    Request
                </div>

                <Button text="Add Request" onClick={() => router.push(`/campaign/${address}/requests/new`)} hasImage />
            </div>


    
            <DataTable
              className="border"
              columns={columns}
              //@ts-ignore
              data={requests}
              selectableRows
              pagination
            />
         
        </Layout>
    )
}