import { Loader2 } from "lucide-react"

const Loader = ({ type }: { type: "NORMAL" | "WAITING_FOR_PDF"}) => {
  
  if(type === 'WAITING_FOR_PDF'){
    return  <div className="flex bg-white absolute z-50 left-0 top-0 overflow-hidden items-center justify-center w-full h-screen">
                <span className="animate-pulse">Conveverting to PDF. . .</span>
            </div>
  }
  
  else return (
    <div className="flex bg-white absolute z-50 left-0 top-0 overflow-hidden items-center justify-center w-full h-screen">
        <Loader2 size={30} className="animate-spin" />
    </div>
  )
}

export default Loader