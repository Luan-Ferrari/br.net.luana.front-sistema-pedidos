export default function headerAuthorization() {

    return {
        headers: {
            Authorization: sessionStorage.getItem('accessToken')
        }
    }
}