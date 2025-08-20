import { Box } from "@mui/material"
import PageCommonTitle from "../components/UI/PageCommonTitle"
import { CommonStyle } from "../styles"

const cars = () => {
  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://cdni.iconscout.com/illustration/premium/thumb/order-car-on-rent-via-mobile-app-6031683-5053357.png"
        alt="Cars Hero"
        text="Cars"
        imgStyle={{ width: "auto", maxHeight:"360px", display: "block" }}
      />
    </Box>
  )
}

export default cars