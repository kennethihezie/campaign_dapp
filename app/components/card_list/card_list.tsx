'use client'

import { useRouter } from "next/navigation"
import Button from "../button/button"
import Card from "../card/card"


interface ICardListProp{
    campaigns: Array<any>
}

const CardList = ({campaigns}: ICardListProp) => {
    const router = useRouter()

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space y-0 md:space-x-8 justify-between items-start">
          <div className="space-y-2">
          {
              campaigns.map((value) => {
                return <Card 
                   address={ value }
                   campaignLink="/" />
              })
           }
          </div>

          <Button 
            hasImage
            onClick={ () => router.push('/campaign/new') }
            text='Create Campaign'
          />  
        </div>
    )
}

export default CardList