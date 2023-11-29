'use client'

import BorderCard from "@/app/components/border_card/border_card"
import Button from "@/app/components/button/button"
import Input from "@/app/components/input/input"
import Layout from "@/app/components/layout/layout"
import { useEffect, useState } from "react"
import Campaign from '../../../lib/web3/campaign'
import Loader from "@/app/components/loader/loader"
import web3 from "@/lib/web3/web3"

interface IClientAddressPageProps {
    address: string
}

type ContractData =  {
    minimumContribution: string,
    balance: string,
    requestsCount: string,
    approversCount: string,
    manager: string
  }

const ClientAddressPage = ({address}: IClientAddressPageProps) => {
   const [ isLoading, setLoading ] = useState(false)
   const [ contractData, setContractData ] = useState<ContractData>()

   const getContractDetails = async (address: string) => {
    setLoading(true)
    const campaign = Campaign(address)  
    const summary = await campaign.methods.getSummary().call()
    
    setContractData({
        //@ts-ignore
        minimumContribution: `${summary[0]}`,
    
        //@ts-ignore
        balance: web3.utils.fromWei(summary[1], 'ether').toString(),
    
        //@ts-ignore
        requestsCount: `${summary[2]}`,
    
        //@ts-ignore
        approversCount: `${summary[3]}`,
    
        //@ts-ignore
        manager: `${summary[4]}`
    })

    setLoading(false)
  }

   useEffect(() => {
    getContractDetails(address)
   }, [])

    return (
        <Layout>
          {
            isLoading ? <Loader /> : <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold">
                Campaign Details
            </div>

            
             <div className="flex flex-row justify-between">
              <div className="grid grid-cols-2 gap-4">
               <BorderCard title={ contractData?.manager ?? '' } text="Address of Manager" subText="The manager created this campaign and can create requests to withdraw money"/>
               <BorderCard title={ contractData?.minimumContribution ?? '' } text="Minimum Contribution (Wei)" subText="You must contribute at least this much wei to become an approver"/>
               <BorderCard title={ contractData?.requestsCount ?? '' } text="Number of Requests" subText="A request to withdraw money from the contract. Requests must be approved by approvers"/>

               <BorderCard title={ contractData?.approversCount ?? '' } text="Number of Approvers" subText="Number of people who have already donated to this campaign" />

               <BorderCard title={ contractData?.balance ?? '' } text="Campaign Balance (Ether)" subText="The balance is how much money this contract has left to spend"/>



             </div>

             <form className="flex flex-col space-y-4">
                <div className="flex flex-col w-full space-y-2">
                   <div className="text-md">
                    Contribute to this Campaign
                   </div>

                   <Input hint="Enter amount" type='number' onChange={e => {}} required />
                </div>

                <Button text="Contribute" type="submit" />
             </form>
             </div>

             <Button text="View Requests" type="submit" />
          </div>
          }
       </Layout>
    )
}

export default ClientAddressPage