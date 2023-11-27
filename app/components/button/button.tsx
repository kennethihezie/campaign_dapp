import Image from "next/image"

interface IButtonProp{
    text: string
    onClick: () => void
}

const Button = ({text, onClick}: IButtonProp) => {
    return (
        <button className="flex flex-row px-2 py-2 space-x-2 bg-blue-500 text-white w-fit rounded-md shadow-lg hover:bg-blue-300" onClick={ onClick }>
           <Image
             src={'images/add.svg'}
             width={25}
             height={24}
             alt=""
             priority />

             <div className="text-md">{ text }</div>
        </button>
    )
}

export default Button