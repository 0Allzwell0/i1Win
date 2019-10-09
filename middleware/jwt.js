import JWT from 'jsonwebtoken'
import { PUBLIC_KEY, PRIVATE_KEY } from '~/environment'

const exp = Math.floor(Date.now() / 1000) + (60 * 3)

class JWT_SIGN {
    static sign(payload) {
        //const accessToken = JWT.sign({ payload, exp }, (PUBLIC_KEY, PRIVATE_KEY), { algorithm: 'ES512' });
        let accessToken = "MzpoUGJSMFd1ZVBoMURhbzdGTTYzMGdxMWpPRzVwVVp2dGV1bjZrTFlO"

        return accessToken
    }
}

export default JWT_SIGN