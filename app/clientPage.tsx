'use client'

import { ReduxState, fetchContractsAsync, useAppDispatch, useAppSelector } from "@/lib/redux"
import CardList from "./components/card_list/card_list"
import Loader from "./components/loader/loader"
import Layout from "./components/layout/layout"
import { useEffect } from "react"

const ClientPage = () => {
    const selector = useAppSelector((state: ReduxState) => state.contracts)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchContractsAsync())
    }, [])

    return (
        <>
      {
        !selector.status ? (
          <Layout>
           <h3 className='text-xl font-bold '>Open Campaigns</h3>

          <CardList 
           campaigns={ selector.contracts }
          />

         </Layout>
        ) : <Loader />
      }
    </>
    )
}

export default ClientPage