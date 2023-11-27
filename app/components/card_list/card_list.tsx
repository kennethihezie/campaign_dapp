'use client'

import Button from "../button/button"
import Card from "../card/card"


interface ICardListProp{
    campaigns: Array<any>
}

const CardList = ({campaigns}: ICardListProp) => {
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space y-0 md:space-x-8 justify-between items-start">
          <div className="space-y-2">
          {
              campaigns.map((value) => {
                return <Card 
                   address="0xjgdghfghhjfhgfjhsuysduysdvhsd"
                   campaignLink="/" />
              })
           }
          </div>

          <Button 
            onClick={ () => {} }
            text='Create Campaign'
          />  
        </div>
    )
}

export default CardList