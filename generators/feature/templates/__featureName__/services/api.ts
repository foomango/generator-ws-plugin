import { getHttpProxy } from '../../migration'
import { ProjectServerModel } from '../models/Project'

export type LoadProjectProjectsResponse = ProjectServerModel[]

export const loadProjects = async () => {
  const httpProxy = getHttpProxy()
  const response = await httpProxy.get<LoadProjectProjectsResponse>('/projects', { params: { fields: 'id,name' } })
  return response
}
