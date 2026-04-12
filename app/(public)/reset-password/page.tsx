import ResetPasswordClient from "@/components/ResetPasswordClient"
import { Suspense } from "react"

export const dynamic = "force-dynamic";

const ResetPassword = () => {
  return (
    <Suspense fallback={null}>
        <ResetPasswordClient />
    </Suspense>
  )
}

export default ResetPassword
