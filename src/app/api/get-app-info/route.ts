import { NextResponse } from 'next/server'
import { getAppInfo } from '@/server/services/apps/apps.helpers'
import { getUserFromCookie } from '@/server/common/session.helpers'
 
export async function GET(request: Request) {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.next({ status: 401 });
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.next({ status: 404 });
  }

  const app = getAppInfo(id)

  return NextResponse.json(app);
}
