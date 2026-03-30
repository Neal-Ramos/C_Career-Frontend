import { Card, Col, Statistic, type StatisticProps } from "antd";
import Text, { type TextProps } from "antd/es/typography/Text";
import type { ReactNode } from "react";

export interface IAdminDashboardCards extends StatisticProps{
    textProps?: TextProps
    textValue?: string
    TextIcon?: ReactNode
}

function AdminDashboardCards({title, value, prefix, textProps, textValue, TextIcon}: IAdminDashboardCards){
    return(<Col xs={24} sm={12} lg={6}>
        <Card variant="borderless" hoverable>
            <Statistic
            title={title}
            value={value}
            prefix={prefix}
            valueStyle={{ fontWeight: 700 }}
        />
            <Text {...textProps}>
                {TextIcon}{textValue}
            </Text>
        </Card>
    </Col>)
}
export default AdminDashboardCards