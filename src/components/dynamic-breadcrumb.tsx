import { useLocation, Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbRoute {
  path: string
  label: string
}

const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  'usuarios': 'Usuarios',
}

export function DynamicBreadcrumb() {
  const location = useLocation()
  const pathSegments = location.pathname
    .split('/')
    .filter(Boolean)

  const breadcrumbs: BreadcrumbRoute[] = [
    { path: '/', label: 'Dashboard' },
  ]

  let currentPath = ''
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ path: currentPath, label })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <div key={crumb.path} className="flex items-center gap-2">
              <BreadcrumbItem className={isLast ? '' : 'hidden md:block'}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
