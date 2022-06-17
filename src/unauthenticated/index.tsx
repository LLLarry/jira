import { Button, Card, Typography } from "antd"
import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from './register'
import styled from '@emotion/styled'
import undraw_campfire_re_9chj from 'assets/svgs/undraw_campfire_re_9chj.svg'
import undraw_font_re_efri from 'assets/svgs/undraw_font_re_efri.svg'
import undraw_speech_to_text_re_8mtf from 'assets/svgs/undraw_speech_to_text_re_8mtf.svg'
/**
 * 未授权页面
 * @returns 
 */
export const Unauthenticated = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    return (
        <Container>
            <Header />
            <MainCard>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>
                        {
                            isRegister ? '请注册' : '请登录'
                        }
                    </h1>
                    { error && <Typography.Text type="danger">{ error.message }</Typography.Text> }
                    {
                        isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
                    }
                    <Button
                        type="link"
                        onClick={() => setIsRegister(!isRegister)}
                    >{isRegister ? '已有账号，切换至登陆' : '没有账号，切换至注册'}</Button>
                </div>
            </MainCard>
        </Container>
    )
}

const MainCard = styled(Card)`
    padding: 5rem;
    width: 45rem;
    min-height: 35rem;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
`
const Header = styled.div`
    height: 8rem;
    background-image: url(${undraw_font_re_efri});
    background-size: auto 60%;
    background-repeat: no-repeat;
    background-position: center;
`
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${undraw_campfire_re_9chj}), url(${undraw_speech_to_text_re_8mtf});
    background-size: 30vw auto;
    background-position: left bottom, right bottom;
    background-repeat: no-repeat;
`