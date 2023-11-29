import { fetchContracts } from "@/lib/redux"
import ClientAddressPage from "./clientAddressPage"

export default function Page({ params }: { params: { address: string }}) {
    return (
     <ClientAddressPage address={ params.address }/>
    )
}

export async function generateStaticParams() {
    //some api call
    const contracts = await fetchContracts()    

    return contracts.map((contract: string) => ({
        address: contract
    }))
}