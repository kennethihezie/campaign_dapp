/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import factory from '@/lib/web3/factory'

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchContracts = async () => {
  return (await factory.methods.getAllDeployedContracts().call()) as Array<string>
}

export const fetchContractsAsync = createAppAsyncThunk(
  'web3/contracts',
  async () => {
    const response = await fetchContracts()
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)
