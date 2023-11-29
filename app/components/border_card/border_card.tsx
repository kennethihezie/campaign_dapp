interface IBorderCardProp {
    title: string
    text: string
    subText: string
}

const BorderCard = ({title, text, subText}: IBorderCardProp) => {
    console.log(title);
    
    return (
        <div className="flex flex-col px-3 py-3 rounded border border-blue-300 shadow space-y-2 w-72">
        <div className="text-xl font-semi-bold text-ellipsis overflow-hidden">
           { title }
        </div>

        <div className="text-md text-gray-400">
          { text }
        </div>

        <div className="font-semi-bold overflow-hidden">
          { subText }
        </div>
     </div>
    )
}

export default BorderCard