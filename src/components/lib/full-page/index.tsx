import styled from "@emotion/styled"
import { Spin, Typography } from "antd"

export const FullPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
` 
export const FullPageLoading = () => <FullPage>
    <Spin size="large"></Spin>
</FullPage>

export const FullPageErrorFallback = ({ error }: { error: Error | null } ) => <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
</FullPage>