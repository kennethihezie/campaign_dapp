import Link from "next/link"

interface ICardProp {
    address: string
    campaignLink: string
}

const Card = ({address, campaignLink}: ICardProp) => {
    return (
        <div className="border border-blue-500 rounded-md flex flex-col shadow-md space-y-1 px-4 py-2">
            <div className="text-lg">{ address }</div>
            <Link href={campaignLink} className="text-sm text-blue-500">View Campaign</Link>
        </div>
    )
}

export default Card