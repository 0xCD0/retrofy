import { FC } from "react"
import * as Icons from "@mui/icons-material"

export type IconNames = keyof typeof Icons
export type IconProps = {
    icon: IconNames
}

export const MuiIcon: FC<IconProps> = ({ icon }) => {
    const Icon = Icons[icon];
    return <Icon />
}
