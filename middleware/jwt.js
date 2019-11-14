import JWT from 'jsonwebtoken'
import { PUBLIC_KEY, PRIVATE_KEY } from '~/environment'

class JWT_SIGN {
    static sign(payload) {
        let accessToken = JWT.sign(payload, PRIVATE_KEY, { algorithm: 'ES512' });

        // console.log(`Access Token : ${accessToken}`)

        return accessToken
    }
}

export default JWT_SIGN