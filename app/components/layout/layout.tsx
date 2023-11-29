import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return <div className="space-y-8 md:px-16 p-8">
       { children }
    </div>
}

export default Layout