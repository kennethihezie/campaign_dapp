'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar = () => {
   const path = usePathname()

    return <nav className="flex flex-row justify-between items-center py-3 px-8 md:px-16 text-white bg-blue-500 shadow-lg sticky top-0">
        <div className="text-2xl font-bold">
           {
            path.includes('new') ? 'New Campaign' : 'Campaign Dapp'
           }
        </div>

        
        <div className="flex flex-row space-x-8">
         
         <div className="group">
         <Link href={'/'} className="text-md group-hover:border-b border-white">
            Campaigns
         </Link>
         </div>


        {
          path.includes('new') ? null : (
            <Link href={'/campaign/new'} className="flex flex-row space-x-2 group-hover:border-b border-white items-center">
             <Image
             src={'/images/add.svg'}
             width={25}
             height={24}
             alt=""
             priority />

            <div className="text-md">Add Campaign</div>   
          </Link>
          )
        }
        </div>
    </nav>
}

export default NavBar