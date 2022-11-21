const BASE_URL = 'http://localhost:3000'

export const ApiMap = Object.freeze({
  GROUP: {
    CREATE: {
      url: `${BASE_URL}/auth/groups`,
      descripion: 'Create new group',
      method: 'post'
    },
    GET_LIST: {
      url: `${BASE_URL}/auth/groups`,
      descriptiion: 'Get list of all groups',
      method: 'get'
    }
  },
  PERMISSION: {
    ASSIGN: {
      url: `${BASE_URL}/auth/permissions`,
      description: 'Assign permissions to a group',
      method: 'post'
    },
    GET_LIST: {
      url: `${BASE_URL}/auth/permissions`,
      description: 'Get all group permissions',
      method: 'get'
    },
    SUBJECT_LIST: {
      url: `${BASE_URL}/auth/permissions/subjects`,
      description: 'Get all subjects',
      method: 'get'
    },
    REMOVE: {
      url: `${BASE_URL}/auth/permissions/`,
      description: 'Remove permission',
      method: 'patch'
    }
  }
})