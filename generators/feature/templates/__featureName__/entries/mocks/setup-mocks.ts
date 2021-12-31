import WebBrowserEnv from '../../../../env/WebBrowser'
import MockedHttpProxy from '../../../../httpProxy/MockedHttpProxy'
import Registor from '../../../../utils/register'

export const setupMocks = () => {
  const env = new WebBrowserEnv({
    isMock: true,
    window: window as any,
    username: '',
    password: '',
    loginMode: 1,
  })

  Registor.set('env', env)

  const mockedHttpProxy: MockedHttpProxy = env.httpProxy as any
  mockedHttpProxy.passthroughMock()

  return { env }
}
