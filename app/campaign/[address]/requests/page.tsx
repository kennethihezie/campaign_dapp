'use client'

import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import Layout from "@/app/components/layout/layout";
import Campaign from "@/lib/web3/campaign";
import web3 from "@/lib/web3/web3";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Request = {
    id: number
    description: string
    amount: string
    approvalCount: string
    recipient: string
    complete: boolean
}

export default function Page() {
    const router = useRouter()
    const path = usePathname()
    const address = path.split('/')[2]  
    const campaign = Campaign(address)
    const [ requests, setRequests ] = useState<Request[]>()  
    const [ isApproveBusy, setApproveBusy ] = useState(false)
    const [ isFinaliseBusy, setIsFinaliseBusy ] = useState(false)

    const getRequests = async () => {
        const accounts = await web3.eth.getAccounts()
        const data: Request[] = []

        const requests = (await campaign.methods.getRequests().call({
            from: accounts[0]
        })) as Array<any>

        const approversCount = await campaign.methods.getApproverCount().call({
            from: accounts[0]
        })


        requests.map((value, index) => {
            
            data.push({
                id: index,
                description: value.description,
                amount: web3.utils.fromWei(value.value, 'ether'),
                recipient: value.recipient,
                approvalCount: `${value.approvalCount}/${approversCount}`,
                complete: value.complete
            })
        })

        setRequests([...data])
    }

    const approveRequest = async (id: number) => {
        setApproveBusy(true)
        const accounts = await web3.eth.getAccounts()

       try {
          //@ts-ignore
           await campaign.methods.approveRequest(id).send({
              from: accounts[0]
           })
       } catch (error) {
        console.error(error)
        window.alert(error)
       }

       setApproveBusy(false)
    }

    const finaliseRequeest = async (id: number) => {
        setIsFinaliseBusy(true)
        const accounts = await web3.eth.getAccounts()

       try {
          //@ts-ignore
           await campaign.methods.finalizeRequest(id).send({
              from: accounts[0]
           })
       } catch (error) {
        console.error(error)
        window.alert(error)
       }

       setIsFinaliseBusy(false)
    }

    useEffect(() => {
        getRequests()
    }, [isApproveBusy])

    
    return (
        <Layout>
            <div className="flex flex-row items-center justify-between">
                <div className="text-lg font-bold">
                    Request
                </div>

                <Button text="Add Request" onClick={() => router.push(`/campaign/${address}/requests/new`)} hasImage />
            </div>

            
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Recipient</TableCell>
            <TableCell align="center">Arroval Count</TableCell>
            <TableCell align="center">Approve</TableCell>
            <TableCell align="center">Finalize</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { requests?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.recipient}</TableCell>
              <TableCell align="center">{`${row.approvalCount}`}</TableCell>
              <TableCell align="center">
                {
                    row.complete ? 'Approved' : <Button text="Approve" onClick={ () => approveRequest(index) } isLoading={ isApproveBusy }/>
                }
              </TableCell>
              <TableCell align="center">
                 {
                    row.complete ? 'Finalized' : <Button text="Finalize" onClick={() => finaliseRequeest(index)} isLoading={ isFinaliseBusy }/>
                 }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

         <div className="text-md">
                  Found { requests?.length } Request
        </div>
         
        </Layout>
    )
}