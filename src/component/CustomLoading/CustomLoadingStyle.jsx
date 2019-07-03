import { dangerColor, primaryColor } from '../../style/constant'

const CustomLoadingStyle = {
    container: {
        color: dangerColor,
        padding: 20,
        borderRadius: 3,
        width: '100%',
    },
    loader: {
        width: 48,
        height: 48,
        border: `3px solid ${primaryColor}`,
        borderBottom: '3px solid transparent',
        borderRadius: '50%',
        position: 'relative',
        animation: 'spin 1s linear infinite',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: 34,
        height: 34,
        border: '3px solid transparent',
        borderTop: `3px solid ${primaryColor}`,
        borderRadius: '50%',
        animation: 'spinInner 1s linear infinite',
    }
}

export default CustomLoadingStyle