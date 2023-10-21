import {useParams, Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from "./QuantityBtn.js"
export default function ProductDetail() {

    let params = useParams()

    return (
        <div>
            <Title mainTitle={params.id+'產品資料'} />
            {/* <QuantityDtl /> */}

            <Link to="/">回到產品列表</Link>
        </div>
    )
}