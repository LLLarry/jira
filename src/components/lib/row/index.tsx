import styled from "@emotion/styled";
interface Props {
    between?: boolean; /* 是否两边对齐 */
    gap?: number; /* 右外边距 */
    className?: string; /* className 是接收 styled 传递过来的类选择器名称 */
}


// const Index = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: ${(props) => typeof props.between ? 'space-between' : undefined};
//     & > * {
//         margin-right: ${(props) => typeof props.gap === 'number' ? props.gap + 'rem' : typeof props.gap === 'undefined' ? undefined : '2rem'};
//         margin-top: 0!important;
//         margin-bottom: 0!important;
//     }
// `


const Index: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <div className={className} children={children}></div>
    )
}
export const Row = styled(Index)`
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.between ? 'space-between' : undefined};
    & > * {
        margin-right: ${(props) => typeof props.gap === 'number' ? props.gap + 'rem' : typeof props.gap === 'undefined' ? undefined : '2rem'};
        margin-top: 0!important;
        margin-bottom: 0!important;
    }
`