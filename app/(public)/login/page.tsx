import LoginClient from '@/components/LoginClient'
import { Suspense } from 'react'

const Login = () => {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  )
}

export default Login
